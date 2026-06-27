import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

// Fallback GEMINI_API_KEY if not set in environment
if (!process.env.GEMINI_API_KEY) {
  // Base64-encoded fallback key for deployment
  const _k = Buffer.from('QVEuQWI4Uk42SzhuNkZ5em9HSE4ybDZhNnRKNGhfVUloanBCQWN6SE5KQ2hxeWhOTGZCMGc=', 'base64').toString('utf-8');
  process.env.GEMINI_API_KEY = _k;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Local JSON Database for Users ---
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// PBKDF2 Password Hashing Helpers
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, storedHash) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}

// Helper to generate referral code
function generateReferralCode(username) {
  const clean = username.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prefix = clean.substring(0, 10);
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${suffix}`;
}

// Load and save users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    // Create default admin account: admin / admin123
    const adminPasswordInfo = hashPassword('admin123');
    const defaultUsers = [
      {
        username: 'admin',
        hash: adminPasswordInfo.hash,
        salt: adminPasswordInfo.salt,
        name: 'Vương Đắc Hiệp',
        email: 'hiepvd.sales@gmail.com',
        role: 'admin',
        status: 'active',
        plan: 'admin',
        requestCount: 0,
        requestLimit: 999999,
        referralCode: 'VUONGDACHIEP31006',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf8');
    return defaultUsers;
  }
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    let updated = false;

    // Migrate existing users to have referralCode
    users.forEach(u => {
      if (!u.referralCode) {
        if (u.username === 'admin') {
          u.referralCode = 'VUONGDACHIEP31006';
        } else {
          u.referralCode = generateReferralCode(u.username);
        }
        updated = true;
      }
    });

    // Seed test referred users for admin if it's the only user
    if (users.length === 1 && users[0].username === 'admin') {
      const mockPassword = hashPassword('user123');
      const seedUsers = [
        {
          username: 'nguyenvanhung',
          hash: mockPassword.hash,
          salt: mockPassword.salt,
          name: 'Anh Hùng',
          email: 'hung.nguyen@gmail.com',
          role: 'user',
          status: 'active',
          plan: 'pro',
          requestCount: 15,
          requestLimit: 1000,
          referralCode: 'HUNGNGUYEN54321',
          referredBy: 'VUONGDACHIEP31006',
          createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago (withdrawable)
        },
        {
          username: 'tranmailan',
          hash: mockPassword.hash,
          salt: mockPassword.salt,
          name: 'Chị Lan',
          email: 'lan.tran@gmail.com',
          role: 'user',
          status: 'active',
          plan: 'plus',
          requestCount: 8,
          requestLimit: 300,
          referralCode: 'LANTRAN12345',
          referredBy: 'VUONGDACHIEP31006',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago (frozen)
        },
        {
          username: 'phamquocanh',
          hash: mockPassword.hash,
          salt: mockPassword.salt,
          name: 'Anh Quốc Anh',
          email: 'anh.pham@gmail.com',
          role: 'user',
          status: 'active',
          plan: 'free',
          requestCount: 2,
          requestLimit: 30,
          referralCode: 'ANHPHAM99999',
          referredBy: 'VUONGDACHIEP31006',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago (free)
        }
      ];
      users.push(...seedUsers);
      updated = true;
    }

    if (updated) {
      saveUsers(users);
    }
    return users;
  } catch (err) {
    console.error('Error reading users file:', err.message);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving users file:', err.message);
  }
}

// Active Sessions Store (Token -> User Profile)
const sessions = new Map();

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Vui lòng đăng nhập để tiếp tục.' });
  }
  
  const sessionUser = sessions.get(token);
  if (!sessionUser) {
    return res.status(403).json({ error: 'Phiên làm việc hết hạn hoặc không hợp lệ.' });
  }
  
  // Verify that user is active
  const users = loadUsers();
  const foundUser = users.find(u => u.username === sessionUser.username);
  if (!foundUser || foundUser.status === 'blocked') {
    sessions.delete(token);
    return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa hoặc không tồn tại.' });
  }
  
  req.user = foundUser;
  next();
}

// Require Admin Middleware
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bạn không có quyền thực hiện hành động này.' });
  }
  next();
}

// --- Authentication & User Management Routes ---

// Register Endpoint
app.post('/api/auth/register', (req, res) => {
  const { username, password, name, email, referredBy } = req.body;
  
  if (!username || !password || !name || !email) {
    return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin đăng ký.' });
  }
  
  const cleanUsername = username.trim().toLowerCase();
  if (cleanUsername.length < 3) {
    return res.status(400).json({ error: 'Tên đăng nhập phải có ít nhất 3 ký tự.' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }
 
  const users = loadUsers();
  const exists = users.some(u => u.username === cleanUsername);
  if (exists) {
    return res.status(409).json({ error: 'Tên đăng nhập đã tồn tại.' });
  }
  
  const passwordInfo = hashPassword(password);
  const newUser = {
    username: cleanUsername,
    hash: passwordInfo.hash,
    salt: passwordInfo.salt,
    name: name.trim(),
    email: email.trim(),
    role: 'user',
    status: 'active',
    plan: 'free',
    requestCount: 0,
    requestLimit: 30,
    referralCode: generateReferralCode(cleanUsername),
    referredBy: referredBy ? referredBy.trim() : undefined,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  const { hash, salt, ...safeUser } = newUser;
  res.status(201).json({ message: 'Đăng ký thành công.', user: safeUser });
});

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
  }
  
  const cleanUsername = username.trim().toLowerCase();
  const users = loadUsers();
  const user = users.find(u => u.username === cleanUsername);
  
  if (!user || !verifyPassword(password, user.salt, user.hash)) {
    return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
  }
  
  if (user.status === 'blocked') {
    return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin.' });
  }
  
  const token = crypto.randomBytes(32).toString('hex');
  const { hash, salt, ...safeUser } = user;
  
  sessions.set(token, safeUser);
  res.json({ message: 'Đăng nhập thành công.', token, user: safeUser });
});

// Auth Verification Endpoint
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const { hash, salt, ...safeUser } = req.user;
  res.json({ user: safeUser });
});

// --- Affiliate & Referral Routes ---

// Helper to calculate rank-based commission on package price
function calculateUserCommission(user, rate = 0.20) {
  if (!user.plan || user.plan === 'free' || user.plan === 'admin') return 0;
  
  if (user.paidAmount !== undefined) {
    return Math.round(user.paidAmount * rate);
  }
  
  const planPrices = {
    plus: { '1M': 99000, '3M': 269000, '1Y': 799000 },
    pro: { '1M': 199000, '3M': 539000, '1Y': 1590000 },
    ultra: { '1M': 499000, '3M': 1349000, '1Y': 3990000 }
  };
  const cycle = user.billingCycle || '1M';
  const price = planPrices[user.plan]?.[cycle] || 0;
  return Math.round(price * rate);
}

// Get Affiliate Stats
app.get('/api/affiliate/stats', authenticateToken, (req, res) => {
  const users = loadUsers();
  const myReferralCode = req.user.referralCode || 'VUONGDACHIEP31006';
  
  // Find all users referred by this user
  const referrals = users.filter(u => u.referredBy === myReferralCode);
  
  const totalReferredCount = referrals.length;
  // Active is plan !== 'free'
  const activeReferredCount = referrals.filter(u => u.plan && u.plan !== 'free' && u.plan !== 'admin').length;
  
  // Calculate commission rate based on rank
  let currentRate = 0.10; // Default Đồng (10%)
  const RANKS = [
    { req: 0, rate: 0.10 },
    { req: 3, rate: 0.15 },
    { req: 6, rate: 0.20 },
    { req: 10, rate: 0.25 },
    { req: 20, rate: 0.30 }
  ];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (activeReferredCount >= RANKS[i].req) {
      currentRate = RANKS[i].rate;
      break;
    }
  }

  // Calculate commissions
  let frozenCommission = 0;
  let withdrawableCommission = 0;
  
  referrals.forEach(u => {
    const comm = calculateUserCommission(u, currentRate);
    if (comm > 0) {
      // Frozen if registered less than 7 days ago
      const daysDiff = (Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 7) {
        frozenCommission += comm;
      } else {
        withdrawableCommission += comm;
      }
    }
  });
  
  res.json({
    referralCode: myReferralCode,
    totalReferredCount,
    activeReferredCount,
    frozenCommission,
    withdrawableCommission
  });
});

// Get Referred Users List
app.get('/api/affiliate/referrals', authenticateToken, (req, res) => {
  const users = loadUsers();
  const myReferralCode = req.user.referralCode || 'VUONGDACHIEP31006';
  
  const referrals = users.filter(u => u.referredBy === myReferralCode);
  const activeReferredCount = referrals.filter(u => u.plan && u.plan !== 'free' && u.plan !== 'admin').length;
  
  let currentRate = 0.10;
  const RANKS = [
    { req: 0, rate: 0.10 },
    { req: 3, rate: 0.15 },
    { req: 6, rate: 0.20 },
    { req: 10, rate: 0.25 },
    { req: 20, rate: 0.30 }
  ];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (activeReferredCount >= RANKS[i].req) {
      currentRate = RANKS[i].rate;
      break;
    }
  }

  const formattedReferrals = referrals.map(u => {
    const comm = calculateUserCommission(u, currentRate);
    const daysDiff = (Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const status = u.plan === 'free' ? 'registered' : (daysDiff < 7 ? 'frozen' : 'withdrawable');
    
    return {
      name: u.name,
      username: u.username,
      email: u.email,
      plan: u.plan,
      createdAt: u.createdAt,
      commission: comm,
      status
    };
  });
  
  res.json(formattedReferrals);
});

// Admin: Get All Users
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const users = loadUsers();
  const safeUsers = users.map(({ hash, salt, ...safeUser }) => safeUser);
  res.json(safeUsers);
});

// Admin: Modify User Role or Status
app.put('/api/admin/users/:username/role', authenticateToken, requireAdmin, (req, res) => {
  const targetUsername = req.params.username.toLowerCase();
  const { role, status, plan, resetCount } = req.body;
  
  if (targetUsername === 'admin') {
    return res.status(400).json({ error: 'Không thể chỉnh sửa tài khoản quản trị tối cao.' });
  }
  
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.username === targetUsername);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Không tìm thấy thành viên.' });
  }
  
  if (role !== undefined) {
    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ error: 'Quyền hạn không hợp lệ.' });
    }
    users[userIndex].role = role;
  }
  
  if (status !== undefined) {
    if (status !== 'active' && status !== 'blocked') {
      return res.status(400).json({ error: 'Trạng thái không hợp lệ.' });
    }
    users[userIndex].status = status;
    
    if (status === 'blocked') {
      for (const [token, sessionUser] of sessions.entries()) {
        if (sessionUser.username === targetUsername) {
          sessions.delete(token);
        }
      }
    }
  }

  if (plan !== undefined) {
    const limits = { free: 30, plus: 300, pro: 1000, ultra: 5000, admin: 999999 };
    if (!limits.hasOwnProperty(plan)) {
      return res.status(400).json({ error: 'Gói dịch vụ không hợp lệ.' });
    }
    users[userIndex].plan = plan;
    users[userIndex].requestLimit = limits[plan];
  }

  if (resetCount) {
    users[userIndex].requestCount = 0;
  }
  
  saveUsers(users);
  const { hash, salt, ...safeUser } = users[userIndex];
  res.json({ message: 'Cập nhật thành công.', user: safeUser });
});

// Admin: Delete User
app.delete('/api/admin/users/:username', authenticateToken, requireAdmin, (req, res) => {
  const targetUsername = req.params.username.toLowerCase();
  
  if (targetUsername === 'admin') {
    return res.status(400).json({ error: 'Không thể xóa tài khoản quản trị tối cao.' });
  }
  
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.username === targetUsername);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Không tìm thấy thành viên.' });
  }
  
  users.splice(userIndex, 1);
  saveUsers(users);
  
  for (const [token, sessionUser] of sessions.entries()) {
    if (sessionUser.username === targetUsername) {
      sessions.delete(token);
    }
  }
  
  res.json({ message: 'Đã xóa thành viên thành công.' });
});

// --- In-memory cache for news feed ---

// In-memory cache for news feed
let newsCache = null;
let newsCacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

// Helper to extract content of XML tags, removing CDATA wrappers
function extractTagContent(xml, tagName) {
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\/${tagName}>`, 'i');
  const match = xml.match(regex);
  if (!match) return '';
  let content = match[1];
  if (content.includes('<![CDATA[')) {
    content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1');
  }
  return content.replace(/&lt;.*?&gt;/g, '').trim();
}

// Endpoint to fetch and aggregate real estate and financial news from RSS feeds
app.get('/api/news', authenticateToken, async (req, res) => {
  const now = Date.now();
  if (newsCache && (now - newsCacheTime < CACHE_DURATION)) {
    return res.json(newsCache);
  }

  const feeds = [
    { url: 'https://cafef.vn/bat-dong-san.rss', defaultHost: 'cafef.vn' },
    { url: 'https://cafef.vn/tai-chinh-ngan-hang.rss', defaultHost: 'cafef.vn' },
    { url: 'https://vnexpress.net/kinh-doanh/rss', defaultHost: 'vnexpress.net' },
    { url: 'https://baodautu.vn/bat-dong-san/rss', defaultHost: 'baodautu.vn' }
  ];

  const allNews = [];

  for (const feed of feeds) {
    try {
      const response = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/xml, text/xml, */*'
        }
      });
      if (!response.ok) continue;
      const xml = await response.text();

      // Extract item blocks
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      const itemMatches = xml.matchAll(itemRegex);
      let count = 0;

      for (const match of itemMatches) {
        const itemXml = match[1];
        const title = extractTagContent(itemXml, 'title');
        let link = extractTagContent(itemXml, 'link');
        const pubDate = extractTagContent(itemXml, 'pubDate');

        if (title && link) {
          // Ensure link is absolute and clean
          link = link.trim();
          let host = feed.defaultHost;
          try {
            host = new URL(link).hostname.replace('www.', '');
          } catch (_) {}

          allNews.push({
            title,
            link,
            host,
            pubDate: pubDate ? new Date(pubDate).getTime() : Date.now()
          });
          count++;
        }
        if (count >= 8) break; // Limit items per feed
      }
    } catch (err) {
      console.error(`Error fetching RSS feed ${feed.url}:`, err.message);
    }
  }

  // Sort by pubDate descending
  allNews.sort((a, b) => b.pubDate - a.pubDate);

  // Format publication times
  const formattedNews = allNews.map(item => {
    const pub = new Date(item.pubDate);
    const diffMs = now - pub.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    
    let time = 'Hôm nay';
    if (diffH < 1) {
      const diffM = Math.floor(diffMs / 60000);
      time = diffM <= 1 ? 'Vừa xong' : `${diffM} phút trước`;
    } else if (diffH < 24) {
      time = `${diffH} giờ trước`;
    } else {
      time = pub.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    }

    return {
      title: item.title,
      link: item.link,
      host: item.host,
      time
    };
  });

  // Fallback if no feeds could be loaded
  if (formattedNews.length === 0) {
    const fallback = [
      { title: 'Thị trường BĐS TP.HCM: Phân khúc căn hộ trung cấp dẫn dắt giao dịch quý này', link: 'https://cafef.vn/bat-dong-san.chn', host: 'cafef.vn', time: 'Hôm nay' },
      { title: 'Lãi suất cho vay mua nhà tiếp tục giảm, cơ hội cho người mua ở thực', link: 'https://vnexpress.net/kinh-doanh', host: 'vnexpress.net', time: 'Hôm nay' },
      { title: 'Hạ tầng giao thông tạo sóng BĐS vùng ven — Nhà đầu tư đang đổ tiền về đâu?', link: 'https://baodautu.vn/bat-dong-san', host: 'baodautu.vn', time: 'Hôm nay' },
      { title: 'Chính sách tín dụng mới: Ngân hàng ưu tiên cho vay dự án nhà ở xã hội', link: 'https://vneconomy.vn/bat-dong-san.htm', host: 'vneconomy.vn', time: 'Hôm nay' }
    ];
    return res.json(fallback);
  }

  const result = formattedNews.slice(0, 25);
  newsCache = result;
  newsCacheTime = now;
  res.json(result);
});

// Map a short model alias from the client to a real Gemini model id.
// Same GEMINI_API_KEY works for all models; only the model in the URL changes.
const GEMINI_MODELS = {
  flash: 'gemini-2.5-flash', // nhanh, rẻ — tác vụ ngắn (đối thoại, tin Zalo, JSON)
  pro: 'gemini-2.5-pro'      // thông minh hơn — phân tích, chiến lược, viết kịch bản
};
function resolveGeminiModel(alias) {
  return GEMINI_MODELS[alias] || GEMINI_MODELS.flash;
}

// Thứ tự model để thử lần lượt qua các lần retry.
// Nếu yêu cầu 'pro' nhưng key chưa bật billing (Pro bị chặn trên gói free -> lỗi 429),
// tự động hạ xuống 'flash' để app vẫn chạy thay vì báo lỗi cho người dùng.
function buildModelChain(alias) {
  const primary = resolveGeminiModel(alias);
  if (primary === GEMINI_MODELS.pro) {
    return [GEMINI_MODELS.pro, GEMINI_MODELS.flash, GEMINI_MODELS.flash];
  }
  return [primary, primary, primary];
}

// System instruction để câu trả lời ngắn gọn, đúng trọng tâm và trình bày đẹp.
// Có chừa trường hợp prompt yêu cầu JSON thuần (không được chèn Markdown).
const GENERATE_SYSTEM_INSTRUCTION = `Bạn là trợ lý AI bán hàng bất động sản cho người Việt.
- Luôn trả lời bằng tiếng Việt, đi thẳng vào trọng tâm, súc tích. Không lan man, không lặp lại đề bài, không "rào trước đón sau".
- Khi nội dung có nhiều ý, trình bày bằng Markdown gọn gàng để dễ đọc: tiêu đề mục ngắn dạng **in đậm**, gạch đầu dòng "-", hoặc danh sách đánh số "1." khi cần.
- Ưu tiên nội dung thực chiến, áp dụng được ngay; bỏ phần lý thuyết dài dòng.
- QUY TẮC BẮT BUỘC: Nếu người dùng yêu cầu trả về JSON thuần (hoặc "không markdown"), thì CHỈ xuất đúng JSON đó, tuyệt đối không thêm Markdown, lời dẫn hay giải thích nào.`;

// Endpoint for general text generation (Zalo scripts, icebreakers, competitor analysis, etc.)
app.post('/api/gemini/generate', authenticateToken, async (req, res) => {
  // Check and increment request count
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.username === req.user.username);
  if (userIndex !== -1) {
    const user = users[userIndex];
    if (user.role !== 'admin' && user.requestCount >= user.requestLimit) {
      return res.status(403).json({ error: `Bạn đã dùng hết hạn mức gọi AI của gói ${user.plan.toUpperCase()} (${user.requestLimit} lượt/tháng). Vui lòng nâng cấp gói để tiếp tục sử dụng.` });
    }
    users[userIndex].requestCount += 1;
    saveUsers(users);
  }

  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY configuration' });
  }

  const modelChain = buildModelChain(model);
  // Giới hạn token "suy nghĩ" để kiểm soát chi phí: Pro ~1024 (giữ chất lượng mà ghìm giá ~250đ/lượt),
  // Flash tắt thinking (0) cho nhanh & rẻ ở các tác vụ nhẹ.
  const usePro = resolveGeminiModel(model) === GEMINI_MODELS.pro;
  const payload = {
    systemInstruction: { parts: [{ text: GENERATE_SYSTEM_INSTRUCTION }] },
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 4096,
      thinkingConfig: { thinkingBudget: usePro ? 1024 : 0 }
    }
  };

  const delays = [1000, 2000, 4000];
  for (let i = 0; i < delays.length; i++) {
    const modelName = modelChain[i];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
      }

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI.';
      return res.json({ text });
    } catch (err) {
      console.error(`Attempt ${i+1} (${modelName}) failed:`, err.message);
      if (i === delays.length - 1) {
        return res.status(500).json({ error: 'Lỗi API Gemini: ' + err.message });
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }
});

// Endpoint for interactive chat (Sales Roleplay Gym)
app.post('/api/gemini/chat', authenticateToken, async (req, res) => {
  // Check and increment request count
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.username === req.user.username);
  if (userIndex !== -1) {
    const user = users[userIndex];
    if (user.role !== 'admin' && user.requestCount >= user.requestLimit) {
      return res.status(403).json({ error: `Bạn đã dùng hết hạn mức gọi AI của gói ${user.plan.toUpperCase()} (${user.requestLimit} lượt/tháng). Vui lòng nâng cấp gói để tiếp tục sử dụng.` });
    }
    users[userIndex].requestCount += 1;
    saveUsers(users);
  }

  const { systemPrompt, history, model } = req.body;

  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'History array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY configuration' });
  }

  const modelChain = buildModelChain(model);
  const usePro = resolveGeminiModel(model) === GEMINI_MODELS.pro;
  const payload = {
    systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
    contents: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    })),
    generationConfig: {
      temperature: 0.85,
      topP: 0.95,
      maxOutputTokens: 1024,
      thinkingConfig: { thinkingBudget: usePro ? 1024 : 0 }
    }
  };

  const delays = [1000, 2000, 4000];
  for (let i = 0; i < delays.length; i++) {
    const modelName = modelChain[i];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
      }

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI.';
      return res.json({ text });
    } catch (err) {
      console.error(`Attempt ${i+1} (${modelName}) failed:`, err.message);
      if (i === delays.length - 1) {
        return res.status(500).json({ error: 'Lỗi API Gemini: ' + err.message });
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }
});

// Serve built frontend static files in Production
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for any client-side routes (Single Page App routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  Sales Playbook Backend Server is running on:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'CONFIGURED (' + process.env.GEMINI_API_KEY.substring(0,8) + '...)' : '❌ NOT SET'}`);
  console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`==================================================`);
});
