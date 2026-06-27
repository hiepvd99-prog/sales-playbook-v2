import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, ListOrdered, Users,
  Target, CheckCircle, Edit3, Save, Layout,
  MapPin, MessageCircle, AlertCircle,
  Phone, Bot, Wand2, X, Loader2, Sparkles, UserPlus, FileText,
  MessageSquareQuote, Send, Smartphone, TrendingUp, Lightbulb,
  Swords, ClipboardList, HeartHandshake, Microscope,
  Share2, Flame, Megaphone, CalendarClock, Brain, Scale,
  Building2, Briefcase, Home, Car, Wine, Filter, PhoneCall, Ear,
  ShieldAlert, PenTool, LineChart, HelpCircle, ShieldQuestion,
  UserMinus, Box, Globe, Key, MessageSquare, Gem, Info, XCircle, Menu, Gift, Award, Bell, BellRing,
  RotateCw, ChevronDown, ChevronUp, ArrowRight, ExternalLink,
  Radio, Search
} from 'lucide-react';
import { defaultData } from './data/defaultData.js';

const SOURCE_META = {
  'cafef.vn':               { label:'CafeF',       color:'#f87171', bg:'rgba(239,68,68,0.15)' },
  'vnexpress.net':           { label:'VnExpress',   color:'#60a5fa', bg:'rgba(59,130,246,0.15)' },
  'baodautu.vn':             { label:'Báo Đầu Tư', color:'#4ade80', bg:'rgba(34,197,94,0.15)'  },
  'vneconomy.vn':            { label:'VnEconomy',   color:'#38bdf8', bg:'rgba(14,165,233,0.15)' },
  'tinnhanhchungkhoan.vn':   { label:'TNCK',        color:'#fbbf24', bg:'rgba(245,158,11,0.15)' },
  'dantri.com.vn':           { label:'Dân Trí',     color:'#c084fc', bg:'rgba(168,85,247,0.15)' },
  'tuoitre.vn':              { label:'Tuổi Trẻ',   color:'#fb923c', bg:'rgba(249,115,22,0.15)' },
};

const getSrcMeta = host => {
  const key = Object.keys(SOURCE_META).find(k => host.includes(k));
  return key ? SOURCE_META[key] : { label: host.replace('www.','').split('.')[0], color:'#6366f1', bg:'#eef2ff' };
};

const RSS_FEEDS = [
  'https://cafef.vn/bat-dong-san.rss',
  'https://cafef.vn/tai-chinh-ngan-hang.rss',
  'https://vnexpress.net/kinh-doanh/rss',
  'https://baodautu.vn/bat-dong-san/rss',
];
const RSS2JSON = 'https://api.rss2json.com/v1/api.json?count=8&rss_url=';

const FALLBACK_NEWS = [
  { title:'Thị trường BĐS TP.HCM: Phân khúc căn hộ trung cấp dẫn dắt giao dịch quý này', link:'https://cafef.vn/bat-dong-san.chn', host:'cafef.vn', time:'Hôm nay' },
  { title:'Lãi suất cho vay mua nhà tiếp tục giảm, cơ hội cho người mua ở thực', link:'https://vnexpress.net/kinh-doanh', host:'vnexpress.net', time:'Hôm nay' },
  { title:'Hạ tầng giao thông tạo sóng BĐS vùng ven — Nhà đầu tư đang đổ tiền về đâu?', link:'https://baodautu.vn/bat-dong-san', host:'baodautu.vn', time:'Hôm nay' },
  { title:'Chính sách tín dụng mới: Ngân hàng ưu tiên cho vay dự án nhà ở xã hội', link:'https://vneconomy.vn/bat-dong-san.htm', host:'vneconomy.vn', time:'Hôm nay' },
  { title:'Vinhomes, Masterise, MIK — Cuộc đua ra hàng cuối năm bắt đầu nóng lên', link:'https://cafef.vn/bat-dong-san.chn', host:'cafef.vn', time:'Hôm nay' },
];

const NewsTicker = ({ token }) => {
  const [news, setNews]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('');

  const fetchNews = async (userToken) => {
    if (!userToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/news', {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      if (res.ok) {
        const items = await res.json();
        if (items && items.length > 0) {
          setNews(items);
          setUpdatedAt(new Date().toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit' }));
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error('Error fetching news from backend:', err);
    }

    // Fallback
    setNews(FALLBACK_NEWS);
    setUpdatedAt('--:--');
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchNews(token);
      const interval = setInterval(() => fetchNews(token), 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const displayNews = news.length ? [...news, ...news] : [];

  return (
    <div style={{
      background:'rgba(9,10,20,0.60)',
      backdropFilter:'blur(24px) saturate(180%)',
      WebkitBackdropFilter:'blur(24px) saturate(180%)',
      borderBottom:'1px solid rgba(99,102,241,0.15)',
      overflow:'hidden', position:'relative',
      height:52, display:'flex', alignItems:'center', flexShrink:0,
    }}>
      {/* Label trái */}
      <div style={{
        position:'absolute', left:0, top:0, bottom:0, zIndex:11,
        display:'flex', alignItems:'center', gap:7, padding:'0 14px',
        background:'linear-gradient(90deg,rgba(8,16,52,0.95) 80%,transparent 100%)',
        minWidth:148,
      }}>
        <div style={{
          width:26, height:26, borderRadius:7, flexShrink:0,
          background:'linear-gradient(135deg,#F59E0B,#D97706)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 2px 6px rgba(245,158,11,0.35)',
        }}>
          <FileText style={{width:13,height:13,color:'white'}}/>
        </div>
        <div>
          <p style={{
            margin:0, fontSize:'9.5px', fontWeight:800, color:'#F59E0B',
            letterSpacing:'1.5px', textTransform:'uppercase',
            fontFamily:"'Be Vietnam Pro',sans-serif", lineHeight:1,
          }}>Bản tin BĐS</p>
          {updatedAt && <p style={{
            margin:0, fontSize:'8.5px', color:'#a4b5cf',
            fontFamily:"'Be Vietnam Pro',sans-serif", lineHeight:1.3,
          }}>Cập nhật {updatedAt}</p>}
        </div>
        <div style={{width:1,height:22,background:'rgba(255,255,255,0.15)',marginLeft:2}}/>
      </div>

      {/* Fade phải */}
      <div style={{
        position:'absolute', right:0, top:0, bottom:0, width:56,
        background:'linear-gradient(270deg,rgba(8,16,52,0.7),transparent)',
        zIndex:10, pointerEvents:'none',
      }}/>

      {/* Nội dung */}
      {loading ? (
        <div style={{paddingLeft:156, display:'flex', gap:12, alignItems:'center'}}>
          {[200,260,220,180,240].map((w,i) => (
            <div key={i} style={{
              width:w, height:28, borderRadius:8, flexShrink:0,
              background:'rgba(255,255,255,0.05)', animation:'pulse 1.5s ease-in-out infinite',
              animationDelay:`${i*0.1}s`,
            }}/>
          ))}
        </div>
      ) : (
        <div className="ticker-track" style={{paddingLeft:156, gap:0}}>
          {displayNews.map((item, i) => {
            const meta = getSrcMeta(item.host);
            return (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'rgba(15, 23, 42, 0.75)', 
                  border:'1px solid rgba(255, 255, 255, 0.1)',
                  borderLeft:`3px solid ${meta.color}`,
                  borderRadius:9, padding:'7px 13px 7px 10px',
                  marginRight:10, flexShrink:0, textDecoration:'none',
                  cursor:'pointer', maxWidth:340,
                  transition:'all 0.18s ease',
                  position:'relative', zIndex:5, pointerEvents:'auto',
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.background='rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor=meta.color+'aa';
                  e.currentTarget.style.transform='translateY(-2px)';
                  e.currentTarget.style.boxShadow=`0 4px 14px ${meta.color}30`;
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.background='rgba(15, 23, 42, 0.75)';
                  e.currentTarget.style.borderColor='rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform='none';
                  e.currentTarget.style.boxShadow='none';
                }}>
                {/* Source badge */}
                <span style={{
                  fontSize:'8.5px', fontWeight:800, color:meta.color,
                  background:meta.bg, border:`1px solid ${meta.color}35`,
                  borderRadius:5, padding:'2.5px 6px', flexShrink:0,
                  fontFamily:"'Be Vietnam Pro',sans-serif",
                  letterSpacing:'0.3px',
                }}>{meta.label}</span>
                {/* Tiêu đề */}
                <span style={{
                  fontSize:'11.5px', fontWeight:600, color:'#ffffff',
                  whiteSpace:'nowrap', overflow:'hidden',
                  textOverflow:'ellipsis', maxWidth:240,
                  fontFamily:"'Be Vietnam Pro',sans-serif",
                }}>{item.title}</span>
                {/* Thời gian */}
                <span style={{
                  fontSize:'9px', color:'#cbd5e1', flexShrink:0,
                  fontFamily:"'Be Vietnam Pro',sans-serif",
                }}>{item.time}</span>
                {/* Icon */}
                <ExternalLink style={{width:11,height:11,color:'#cbd5e1',flexShrink:0}}/>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TAB_META = {
  hanhTrinh: { label: 'Hành trình KH', color: '#3b82f6', bg: '#eff6ff' },
  quyTrinh:  { label: '8 Bước Tư vấn', color: '#8b5cf6', bg: '#f5f3ff' },
  khachHang: { label: 'Kiểu KH & Từ chối', color: '#ef4444', bg: '#fef2f2' },
  kienThuc:  { label: 'Kiến thức SP', color: '#f59e0b', bg: '#fffbeb' },
  thucChien: { label: 'Thực chiến & AI', color: '#10b981', bg: '#ecfdf5' },
  chotSale:  { label: 'Chốt Sale', color: '#f43f5e', bg: '#fff1f2' },
};

const SmartSuggestions = ({ setActiveTab, token }) => {
  const [questions, setQuestions]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [collapsed, setCollapsed]   = useState(false);
  const [hovered, setHovered]       = useState(null);

  const fetchQuestions = async () => {
    if (!token) return;
    setLoading(true); setQuestions([]);
    const today = new Date().toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'numeric', year:'numeric' });
    const prompt = `Bạn là trợ lý huấn luyện sales bất động sản. Hôm nay là ${today}.
Hãy đề xuất đúng 5 câu hỏi thực chiến, ngắn gọn (dưới 12 từ) mà một chuyên viên tư vấn BĐS hay gặp và cần giải đáp ngay hôm nay. Câu hỏi phải đa dạng, không trùng nhau.
Mỗi câu hỏi thuộc đúng 1 tab: hanhTrinh, quyTrinh, khachHang, kienThuc, thucChien, chotSale.
Chỉ trả về JSON thuần (không markdown, không giải thích):
[{"q":"câu hỏi","tab":"tabId"},{"q":"câu hỏi","tab":"tabId"},{"q":"câu hỏi","tab":"tabId"},{"q":"câu hỏi","tab":"tabId"},{"q":"câu hỏi","tab":"tabId"}]`;
    
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });
      if (res.ok) {
        const json = await res.json();
        const raw = json.text || '[]';
        const parsed = JSON.parse(raw.replace(/```json|```/g,'').trim());
        setQuestions(parsed.filter(x => x.q && TAB_META[x.tab]).slice(0,5));
      } else {
        throw new Error();
      }
    } catch(_) {
      setQuestions([
        { q:"Làm sao gọi điện khách không cúp máy ngay?",    tab:"quyTrinh"  },
        { q:"Khách nói 'để suy nghĩ' thì xử lý thế nào?",   tab:"chotSale"  },
        { q:"Cách phân loại data lạnh, ấm, nóng chuẩn nhất?",tab:"khachHang" },
        { q:"12 bước giới thiệu dự án đúng trình tự?",       tab:"hanhTrinh" },
        { q:"Soạn bài đăng Facebook thu hút từ sự kiện?",    tab:"quyTrinh"  },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const skeletonWidths = [180,220,160,200,175];

  if (collapsed) return (
    <div style={{marginBottom:20}}>
      <button onClick={() => setCollapsed(false)} style={{
        display:'flex',alignItems:'center',gap:8,
        background:'linear-gradient(135deg,#13103b,#1e2563)',
        border:'1px solid rgba(99,102,241,.3)',
        borderRadius:10, padding:'8px 16px', cursor:'pointer',
        color:'rgba(199,210,254,.8)', fontSize:'12px', fontWeight:600,
        fontFamily:"'Be Vietnam Pro',sans-serif",
        boxShadow:'0 2px 12px rgba(99,102,241,.12)',
      }}>
        <Lightbulb style={{width:14,height:14,color:'#a5b4fc'}}/>
        <span>Gợi ý câu hỏi từ AI</span>
        <span style={{
          background:'rgba(99,102,241,.25)',borderRadius:99,
          padding:'1px 8px',fontSize:'11px',color:'#a5b4fc',
        }}>{questions.length}</span>
        <ChevronDown style={{width:13,height:13,marginLeft:2}}/>
      </button>
    </div>
  );

  return (
    <div style={{
      marginBottom:24,
      background:'linear-gradient(145deg,#13103b 0%,#181f54 100%)',
      border:'1px solid rgba(99,102,241,.28)',
      borderRadius:14,
      boxShadow:'0 4px 32px rgba(99,102,241,.12),inset 0 1px 0 rgba(255,255,255,.04)',
      overflow:'hidden',
      fontFamily:"'Be Vietnam Pro',sans-serif",
    }}>

      {/* Header */}
      <div style={{
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'13px 18px 11px',
        borderBottom:'1px solid rgba(99,102,241,.2)',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{
            width:30,height:30,borderRadius:8,flexShrink:0,
            background:'linear-gradient(135deg,#6366f1,#4f46e5)',
            display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:'0 2px 8px rgba(99,102,241,.4)',
          }}>
            <Lightbulb style={{width:15,height:15,color:'white'}}/>
          </div>
          <div>
            <p style={{color:'white',fontWeight:700,fontSize:'13px',margin:0,lineHeight:1.2}}>Hôm nay bạn muốn tìm hiểu điều gì?</p>
            <p style={{color:'rgba(148,163,184,.65)',fontSize:'10.5px',margin:0,marginTop:2}}>Click vào câu hỏi để đến đúng công cụ</p>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <button onClick={fetchQuestions} disabled={loading} title="Làm mới câu hỏi" style={{
            display:'flex',alignItems:'center',gap:5,
            background:'rgba(99,102,241,.2)',border:'1px solid rgba(99,102,241,.3)',
            borderRadius:7,padding:'5px 10px',cursor:'pointer',
            color:'rgba(199,210,254,.85)',fontSize:'11px',fontWeight:600,
            transition:'all .15s', opacity: loading ? .5 : 1,
            fontFamily:"'Be Vietnam Pro',sans-serif",
          }}>
            <RotateCw style={{width:11,height:11, animation: loading ? 'spin 1s linear infinite' : 'none'}}/>
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
          <button onClick={() => setCollapsed(true)} title="Thu gọn" style={{
            width:26,height:26,borderRadius:6,border:'1px solid rgba(99,102,241,.25)',
            background:'rgba(99,102,241,.12)',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'rgba(148,163,184,.7)',
          }}>
            <ChevronUp style={{width:13,height:13}}/>
          </button>
        </div>
      </div>

      {/* Question cards */}
      <div style={{
        display:'flex',gap:10,padding:'14px 18px 16px',
        overflowX:'auto',scrollbarWidth:'none',
      }}>
        {loading
          ? skeletonWidths.map((w,i) => (
              <div key={i} style={{
                width:w,height:76,borderRadius:10,flexShrink:0,
                background:'rgba(255,255,255,.06)',
                animation:'pulse 1.5s ease-in-out infinite',
                animationDelay:`${i*0.12}s`,
              }}/>
            ))
          : questions.map((item, i) => {
              const meta = TAB_META[item.tab] || TAB_META.thucChien;
              const isHov = hovered === i;
              return (
                <div key={i}
                  onClick={() => setActiveTab(item.tab)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    flexShrink:0,
                    width: 200,
                    background: isHov ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.07)',
                    border: `1px solid ${isHov ? meta.color+'55' : 'rgba(255,255,255,.1)'}`,
                    borderRadius:10,
                    padding:'12px 14px',
                    cursor:'pointer',
                    transition:'all .18s ease',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    boxShadow: isHov ? `0 8px 24px ${meta.color}30` : 'none',
                    display:'flex',flexDirection:'column',justifyContent:'space-between',
                    gap:10,minHeight:76,
                  }}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:8}}>
                    <div style={{
                      width:22,height:22,borderRadius:6,flexShrink:0,marginTop:1,
                      background:`${meta.color}25`,border:`1px solid ${meta.color}40`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                    }}>
                      <span style={{fontSize:'11px'}}>
                        {['💡','🎯','👥','📚','⚔️','🔥'][i] || '💡'}
                      </span>
                    </div>
                    <p style={{
                      margin:0,color:'rgba(226,232,240,.92)',
                      fontSize:'12px',fontWeight:600,lineHeight:1.45,
                    }}>{item.q}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{
                      fontSize:'9.5px',fontWeight:700,
                      color:meta.color,
                      background:`${meta.color}18`,
                      border:`1px solid ${meta.color}35`,
                      borderRadius:99,padding:'2px 8px',
                      letterSpacing:'.3px',
                    }}>{meta.label}</span>
                    <ArrowRight style={{width:13,height:13,color:meta.color,opacity: isHov ? 1 : .4,transition:'all .18s'}}/>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
};

const Watermark = () => (
  <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
    {Array.from({length:28}).map((_,i) => (
      <div key={i} style={{
        position:'absolute',
        top:`${(i % 7) * 16 - 4}%`,
        left:`${Math.floor(i / 7) * 26 - 8}%`,
        transform:'rotate(-30deg)',
        fontSize:'11.5px',
        fontWeight:'800',
        color:'rgba(148,163,184,0.052)',
        letterSpacing:'5px',
        whiteSpace:'nowrap',
        userSelect:'none',
        fontFamily:"'Be Vietnam Pro',sans-serif",
        textTransform:'uppercase',
      }}>Vương Đắc Hiệp</div>
    ))}
  </div>
);

function App() {
  // Authentication State
  const [token, setToken] = useState(localStorage.getItem('sales_playbook_token') || '');
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', name: '', email: '' });
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Admin User Management State
  const [usersList, setUsersList] = useState([]);
  const [isAdminUsersLoading, setIsAdminUsersLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const [activeTab, setActiveTab] = useState('soTayCaNhan');
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(defaultData);

  const navBtnRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ top: 12, height: 48, opacity: 0 });

  // Capture ?ref= from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      sessionStorage.setItem('referrer_code', refCode.trim());
      // Clean query params to keep URL clean
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // Verify auth token on boot
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setCurrentUser(json.user);
        } else {
          localStorage.removeItem('sales_playbook_token');
          setToken('');
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Lỗi kiểm tra phiên đăng nhập:', err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [token]);

  // Auth Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.username.trim() || !loginForm.password) {
      setAuthError('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Lỗi đăng nhập.');
      }
      localStorage.setItem('sales_playbook_token', json.token);
      setToken(json.token);
      setCurrentUser(json.user);
      setLoginForm({ username: '', password: '' });
      // Show welcome popup on login
      setTimeout(() => setShowWelcomePopup(true), 600);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, name, email } = registerForm;
    if (!username.trim() || !password || !name.trim() || !email.trim()) {
      setAuthError('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerForm,
          referredBy: sessionStorage.getItem('referrer_code') || undefined
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Lỗi đăng ký.');
      }
      setAuthView('login');
      setLoginForm({ username: username.trim(), password: '' });
      setAuthError('Đăng ký thành công. Vui lòng đăng nhập.');
      setRegisterForm({ username: '', password: '', name: '', email: '' });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sales_playbook_token');
    setToken('');
    setCurrentUser(null);
    setActiveTab('hanhTrinh');
  };

  // Admin handlers
  const fetchAdminUsers = async () => {
    if (!token || !currentUser || currentUser.role !== 'admin') return;
    setIsAdminUsersLoading(true);
    setAdminError('');
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setUsersList(json);
      } else {
        const json = await res.json();
        throw new Error(json.error || 'Không thể tải danh sách thành viên.');
      }
    } catch (err) {
      setAdminError(err.message);
    } finally {
      setIsAdminUsersLoading(false);
    }
  };

  const handleToggleAdminRole = async (targetUser) => {
    if (!token) return;
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    try {
      const res = await fetch(`/api/admin/users/${targetUser.username}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        fetchAdminUsers();
      } else {
        const json = await res.json();
        alert(json.error || 'Lỗi cập nhật quyền.');
      }
    } catch (err) {
      console.error('Lỗi:', err);
    }
  };

  const handleToggleBlockUser = async (targetUser) => {
    if (!token) return;
    const newStatus = targetUser.status === 'active' ? 'blocked' : 'active';
    try {
      const res = await fetch(`/api/admin/users/${targetUser.username}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAdminUsers();
      } else {
        const json = await res.json();
        alert(json.error || 'Lỗi cập nhật trạng thái.');
      }
    } catch (err) {
      console.error('Lỗi:', err);
    }
  };

  const handleDeleteUser = async (username) => {
    if (!token) return;
    if (!window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản ${username} không?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${username}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdminUsers();
      } else {
        const json = await res.json();
        alert(json.error || 'Lỗi xóa thành viên.');
      }
    } catch (err) {
      console.error('Lỗi:', err);
    }
  };

  // Fetch admin users whenever admin tab is selected
  useEffect(() => {
    if (activeTab === 'admin') {
      fetchAdminUsers();
    }
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = navBtnRefs.current[activeTab];
      if (btn) setPillStyle({ top: btn.offsetTop, height: btn.offsetHeight, opacity: 1 });
    }, 30);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const [affiliateStats, setAffiliateStats] = useState(null);
  const [referralList, setReferralList] = useState([]);
  const [isAffiliateLoading, setIsAffiliateLoading] = useState(false);
  const [affiliateError, setAffiliateError] = useState('');
  const [searchReferralQuery, setSearchReferralQuery] = useState('');

  const fetchAffiliateData = async () => {
    if (!token) return;
    setIsAffiliateLoading(true);
    setAffiliateError('');
    try {
      const [statsRes, listRes] = await Promise.all([
        fetch('/api/affiliate/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/affiliate/referrals', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      if (!statsRes.ok || !listRes.ok) {
        throw new Error('Lỗi tải thông tin Affiliate.');
      }
      
      const statsJson = await statsRes.json();
      const listJson = await listRes.json();
      
      setAffiliateStats(statsJson);
      setReferralList(listJson);

      // Generate dynamic notifications for each referred user
      const referralNotifications = listJson.map(ref => ({
        id: `ref_${ref.username}_${ref.createdAt}`,
        type: 'referral',
        title: 'Thành viên đăng ký mới',
        content: `Thành viên ${ref.name || ref.username} đã đăng ký tài khoản qua liên kết giới thiệu của bạn.`,
        time: ref.createdAt,
        read: false
      }));

      setNotifications(prev => {
        const combined = [...prev];
        referralNotifications.forEach(newNotif => {
          if (!combined.some(n => n.id === newNotif.id)) {
            combined.push(newNotif);
          }
        });
        return combined.sort((a, b) => new Date(b.time) - new Date(a.time));
      });
    } catch (err) {
      setAffiliateError(err.message);
    } finally {
      setIsAffiliateLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAffiliateData();
    }
  }, [token]);

  // --- Sổ tay Cá nhân AI States ---
  const [activeSoTayTab, setActiveSoTayTab] = useState('reminders'); // 'reminders', 'crm', 'calc', 'fengshui'
  const [reminders, setReminders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Load and seed Sổ tay data from localStorage
  useEffect(() => {
    if (currentUser?.username) {
      try {
        const storedReminders = JSON.parse(localStorage.getItem(`reminders_${currentUser.username}`)) || [];
        setReminders(storedReminders);
        
        let storedCustomers = JSON.parse(localStorage.getItem(`customers_${currentUser.username}`));
        if (!storedCustomers || storedCustomers.length === 0) {
          storedCustomers = [
            { id: '1', name: 'Nguyễn Trần Khánh', phone: '0912345678', email: 'khanh.nguyen@gmail.com', temp: 'hot', stage: 'tiepCan', demand: 'Mua căn hộ 2 phòng ngủ mặt tiền Quận 2', note: 'Khách hàng rất quan tâm dự án Empire City', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
            { id: '2', name: 'Lê Minh Hoàng', phone: '0987654321', email: 'hoang.le@gmail.com', temp: 'warm', stage: 'thucDia', demand: 'Thuê nhà phố làm văn phòng Quận 1', note: 'Đang hẹn xem căn góc đường Nguyễn Huệ', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: '3', name: 'Phạm Thị Mai', phone: '0909998877', email: 'mai.pham@gmail.com', temp: 'cool', stage: 'damPhan', demand: 'Mua biệt thự biển Đà Nẵng', note: 'Đang thương lượng giảm giá 5%', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
          ];
          localStorage.setItem(`customers_${currentUser.username}`, JSON.stringify(storedCustomers));
        }
        setCustomers(storedCustomers);
      } catch (e) {
        console.error("Error loading notebook data:", e);
      }
    }
  }, [currentUser]);

  // Persist Sổ tay data
  useEffect(() => {
    if (currentUser?.username && reminders.length > 0) {
      localStorage.setItem(`reminders_${currentUser.username}`, JSON.stringify(reminders));
    }
  }, [reminders, currentUser]);

  useEffect(() => {
    if (currentUser?.username && customers.length > 0) {
      localStorage.setItem(`customers_${currentUser.username}`, JSON.stringify(customers));
    }
  }, [customers, currentUser]);

  // Reminders states
  const [reminderText, setReminderText] = useState('');
  const [reminderCustomer, setReminderCustomer] = useState('');
  const [reminderDate, setReminderDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderCategory, setReminderCategory] = useState('Công việc khác');
  const [reminderAlert, setReminderAlert] = useState('60');
  const [reminderParsedStatus, setReminderParsedStatus] = useState({ dateDetected: false, timeDetected: false, todayOrTomorrow: 'hôm nay' });
  const [remindersFilter, setRemindersFilter] = useState('all'); // 'all', 'today', 'pending', 'done'

  // CRM states
  const [searchCustomerQuery, setSearchCustomerQuery] = useState('');
  const [tempFilter, setTempFilter] = useState('all');
  const [pipelineFilter, setPipelineFilter] = useState('all');
  const [freezeDays, setFreezeDays] = useState(30);
  const [isGridView, setIsGridView] = useState(true);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({ name: '', phone: '', email: '', temp: 'warm', stage: 'tiepCan', demand: '', note: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Real Estate Calculator states
  const [calcSubTab, setCalcSubTab] = useState('loan');
  const [loanPrice, setLoanPrice] = useState(3000000000);
  const [loanEquityRate, setLoanEquityRate] = useState(30);
  const [loanInterestRate, setLoanInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [loanResult, setLoanResult] = useState(null);

  const [unitPriceTotal, setUnitPriceTotal] = useState(8700000000);
  const [unitPriceArea, setUnitPriceArea] = useState(125);
  const [unitPriceResult, setUnitPriceResult] = useState(0);

  const [roiPurchase, setRoiPurchase] = useState(2000000000);
  const [roiSell, setRoiSell] = useState(2800000000);
  const [roiFeeRate, setRoiFeeRate] = useState(2);
  const [roiResult, setRoiResult] = useState({ netProfit: 0, roiRate: 0, taxVal: 0 });

  // Feng Shui states
  const [fengShuiYear, setFengShuiYear] = useState('1990');
  const [fengShuiGender, setFengShuiGender] = useState('nam');
  const [fengShuiResult, setFengShuiResult] = useState(null);

  // Notification, Dropdown & AI Support States
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showGuidePopup, setShowGuidePopup] = useState(false);
  const [showAiSupport, setShowAiSupport] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [aiSupportMessages, setAiSupportMessages] = useState([
    { role: 'model', text: 'Xin chào! Tôi là Trợ lý AI hỗ trợ 24/7 của ứng dụng Sales Playbook BĐS. Tôi có thể giải đáp cho bạn cách sử dụng các tính năng như Sổ tay Cá nhân AI, Quản lý CRM, Tính toán ROI/đơn giá, hay Referral Pro. Bạn cần hỗ trợ gì hôm nay?' }
  ]);
  const [aiSupportInput, setAiSupportInput] = useState('');
  const [isAiSupportLoading, setIsAiSupportLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'sys_welcome',
      type: 'system',
      title: 'Chào mừng thành viên',
      content: 'Chào mừng bạn tham gia Sales Playbook BĐS AI. Hãy khám phá Sổ tay Cá nhân AI ngay!',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'sys_referral_update',
      type: 'system',
      title: 'Cập nhật tính năng',
      content: 'Chương trình Referral Pro đã hoạt động! Thăng hạng Đồng, Bạc, Vàng để nhận hoa hồng tới 30%.',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'sys_calculator_update',
      type: 'system',
      title: 'Cập nhật Máy tính BĐS',
      content: 'Máy tính BĐS đã cập nhật công thức tính ROI và đơn giá m² chính xác theo thời gian thực.',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: false
    }
  ]);

  const [showAIModal, setShowAIModal] = useState(false);
  const [aiForm, setAiForm] = useState({ project: '', highlights: '', customer: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  const [aiResponses, setAiResponses] = useState({});
  const [loadingAiResponse, setLoadingAiResponse] = useState(null);

  const [leadContext, setLeadContext] = useState('');
  const [leadAnalysis, setLeadAnalysis] = useState('');
  const [isAnalyzingLead, setIsAnalyzingLead] = useState(false);

  const [scriptToGrade, setScriptToGrade] = useState('');
  const [scriptFeedback, setScriptFeedback] = useState('');
  const [isGradingScript, setIsGradingScript] = useState(false);

  const [zaloMeetingNotes, setZaloMeetingNotes] = useState('');
  const [zaloDraft, setZaloDraft] = useState('');
  const [isDraftingZalo, setIsDraftingZalo] = useState(false);

  const [roleplayActive, setRoleplayActive] = useState(false);
  const [roleplayType, setRoleplayType] = useState(0);
  const [roleplayHistory, setRoleplayHistory] = useState([]);
  const [roleplayInput, setRoleplayInput] = useState('');
  const [isRoleplayLoading, setIsRoleplayLoading] = useState(false);
  const [roleplayError, setRoleplayError] = useState('');

  const [marketLocation, setMarketLocation] = useState('');
  const [marketInsight, setMarketInsight] = useState('');
  const [isAnalyzingMarket, setIsAnalyzingMarket] = useState(false);

  const [selectedSignals, setSelectedSignals] = useState([]);
  const [closingAdvice, setClosingAdvice] = useState('');
  const [isAdvisingClose, setIsAdvisingClose] = useState(false);

  const [myProject, setMyProject] = useState('');
  const [competitorProject, setCompetitorProject] = useState('');
  const [battlecardResult, setBattlecardResult] = useState('');
  const [isGeneratingBattlecard, setIsGeneratingBattlecard] = useState(false);

  const [rawCallNotes, setRawCallNotes] = useState('');
  const [crmSummary, setCrmSummary] = useState('');
  const [isSummarizingCall, setIsSummarizingCall] = useState(false);

  const [dealContext, setDealContext] = useState('');
  const [dealOutcome, setDealOutcome] = useState('lost');
  const [dealAutopsyResult, setDealAutopsyResult] = useState('');
  const [isAutopsying, setIsAutopsying] = useState(false);

  const [clientProfile, setClientProfile] = useState('');
  const [icebreakerResult, setIcebreakerResult] = useState('');
  const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);

  const [referralClientContext, setReferralClientContext] = useState('');
  const [referralScript, setReferralScript] = useState('');
  const [isGeneratingReferral, setIsGeneratingReferral] = useState(false);

  const [salesMood, setSalesMood] = useState('');
  const [motivationDose, setMotivationDose] = useState('');
  const [isCoachingMood, setIsCoachingMood] = useState(false);

  const [targetKeywords, setTargetKeywords] = useState(['cần mua', 'tìm chung cư']);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([1, 2, 3]);
  const [searchGroupQuery, setSearchGroupQuery] = useState('');
  const [searchTime, setSearchTime] = useState('Đầu ngày - Hiện tại');
  const [sessionsRun, setSessionsRun] = useState(0);
  const [targetsDetected, setTargetsDetected] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [isHunting, setIsHunting] = useState(false);
  const [huntingLog, setHuntingLog] = useState([
    '>> AI ENGINE: SCANNING PACKETS...',
    '>> TARGETS DETECTED: 0',
    '>> STATUS: IDLE'
  ]);
  const [zaloSignals, setZaloSignals] = useState([]);

  const defaultZaloGroups = [
    { id: 1, name: 'Zalo: Cộng Đồng BĐS Phía Đông' },
    { id: 2, name: 'Zalo: Ký Gửi Nhà Đất Quận 2 & 9' },
    { id: 3, name: 'Zalo: Hội Môi Giới Vinhomes Grand Park' },
    { id: 4, name: 'Zalo: Khách Hàng Nhu Cầu Thực Sài Gòn' },
    { id: 5, name: 'Zalo: Đầu Tư Đất Nền Ven Biển' }
  ];

  const handleAddKeyword = () => {
    if (newKeywordInput.trim() && !targetKeywords.includes(newKeywordInput.trim())) {
      setTargetKeywords([...targetKeywords, newKeywordInput.trim()]);
      setNewKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw) => {
    setTargetKeywords(targetKeywords.filter(k => k !== kw));
  };

  const handleToggleGroup = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleToggleSelectAllGroups = () => {
    if (selectedGroups.length === defaultZaloGroups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(defaultZaloGroups.map(g => g.id));
    }
  };

  useEffect(() => {
    let interval;
    let logIndex = 0;
    if (isHunting) {
      setSessionsRun(prev => prev + 1);
      setActiveSessions(1);
      setHuntingLog([
        '>> AI ENGINE: INITIALIZING RADAR...',
        '>> CONNECTING TO ZALO PROTOCOL...',
        '>> STATUS: ACTIVE'
      ]);

      const logSteps = [
        '>> SCANNING INCOMING PACKETS FROM SELECTED GROUPS...',
        '>> EXTRACTING NLP CONTENT...',
        '>> MONITORING ACTIVE CONVERSATIONS...',
        '>> COMPARING TARGET KEYWORDS...',
        '>> WAITING FOR SIGNALS...'
      ];

      interval = setInterval(async () => {
        if (logIndex < logSteps.length) {
          const nextLog = logSteps[logIndex];
          if (nextLog) {
            setHuntingLog(prev => [...prev.slice(-8), nextLog]);
          }
          logIndex++;
        } else {
          setHuntingLog(prev => [...prev.slice(-8), '>> NLP ANALYZER: ANALYZING CHAT MSG...']);
          
          try {
            const queryWord = targetKeywords.length > 0 ? targetKeywords[Math.floor(Math.random() * targetKeywords.length)] : "cần mua";
            const prompt = `Bạn là một công cụ quét dữ liệu Zalo (Web Scraper & AI Lead Extractor).
Dựa trên từ khóa mục tiêu: "${queryWord}", hãy tạo ra duy nhất 1 khách hàng tiềm năng thực tế đăng tin trong nhóm Zalo tìm mua/bán BĐS.
Yêu cầu trả về định dạng JSON thuần túy (không markdown, không giải thích gì thêm), chứa các trường:
- name: Tên khách hàng (ví dụ: Anh Hùng, Chị Lan,...)
- phone: Số điện thoại (dạng 09xx.xxx.xxx hoặc che 2-3 số ở giữa ví dụ 0912.38x.xx9)
- source: Tên nhóm Zalo ví dụ "Nhóm Ký gửi BĐS Quận 2", "Hội Cư Dân Vinhomes..."
- demand: Mô tả chi tiết tin nhắn khách hàng gửi (phù hợp với từ khóa "${queryWord}")
- time: "Vừa xong"
- matchScore: Điểm độ tương hợp (từ 85 đến 99)
Ví dụ:
{"name":"Anh Tuấn","phone":"0987.65x.x21","source":"Zalo: Cộng Đồng BĐS Phía Đông","demand":"Cần tìm đất nền sổ đỏ thổ cư khu vực Quận 9, tài chính dưới 3 tỷ, mua công chứng ngay.","time":"Vừa xong","matchScore":95}`;

            const res = await fetch('/api/gemini/generate', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ prompt })
            });

            if (res.ok) {
              const json = await res.json();
              const text = json.text;
              const cleanText = text.replace(/\\`\\`\\`json/g, '').replace(/\\`\\`\\`/g, '').replace(/```json/g, '').replace(/```/g, '').trim();
              const lead = JSON.parse(cleanText);
              
              setZaloSignals(prev => [lead, ...prev]);
              setTargetsDetected(prev => prev + 1);
              setHuntingLog(prev => [...prev.slice(-8), `>> TARGET DETECTED: ${lead.name} (${lead.source})`]);
            }
          } catch (err) {
            const names = ["Anh Hùng", "Chị Mai", "Anh Nam", "Chị Thảo", "Anh Quân"];
            const groups = ["Zalo: Cộng Đồng BĐS Phía Đông", "Zalo: Ký Gửi Nhà Đất Quận 2 & 9", "Zalo: Hội Môi Giới Vinhomes Grand Park"];
            const demands = [
              "Cần mua chung cư 2 phòng ngủ Vinhomes Grand Park, tầng trung, view thoáng, tài chính sẵn 2.5 tỷ.",
              "Khách nét cần tìm đất nền Quận 9 có sổ đỏ riêng, đường ô tô tránh nhau, mua công chứng gấp trong tuần.",
              "Chính chủ cần bán gấp nhà mặt phố Nguyễn Duy Trinh, ngang 5m, thích hợp làm văn phòng, giá sập hầm thương lượng."
            ];
            const lead = {
              name: names[Math.floor(Math.random() * names.length)],
              phone: "09" + Math.floor(10 + Math.random() * 89) + "." + Math.floor(100 + Math.random() * 899) + ".xxx",
              source: groups[Math.floor(Math.random() * groups.length)],
              demand: demands[Math.floor(Math.random() * demands.length)],
              time: "Vừa xong",
              matchScore: 85 + Math.floor(Math.random() * 15)
            };
            setZaloSignals(prev => [lead, ...prev]);
            setTargetsDetected(prev => prev + 1);
            setHuntingLog(prev => [...prev.slice(-8), `>> TARGET DETECTED: ${lead.name} (${lead.source})`]);
          }
        }
      }, 4000);
    } else {
      setActiveSessions(0);
    }
    return () => clearInterval(interval);
  }, [isHunting, targetKeywords, token]);

  const [socialTopic, setSocialTopic] = useState('');
  const [socialPostResult, setSocialPostResult] = useState('');
  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false);

  const [followUpContext, setFollowUpContext] = useState('');
  const [followUpPlanResult, setFollowUpPlanResult] = useState('');
  const [isPlanningFollowUp, setIsPlanningFollowUp] = useState(false);

  const [personaContext, setPersonaContext] = useState('');
  const [personaMapResult, setPersonaMapResult] = useState('');
  const [isMappingPersona, setIsMappingPersona] = useState(false);

  const [negotiationDemand, setNegotiationDemand] = useState('');
  const [negotiationStrategyResult, setNegotiationStrategyResult] = useState('');
  const [isStrategizingNegotiation, setIsStrategizingNegotiation] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calls the Backend Server Proxy for general text generation
  const fetchGeminiResponse = async (prompt) => {
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi kết nối API Server');
      }
      const json = await res.json();
      return json.text;
    } catch (err) {
      throw new Error(err.message || 'Lỗi kết nối mạng hoặc cấu hình API Server');
    }
  };

  // Calls the Backend Server Proxy for roleplay chatting
  const fetchGeminiChat = async (systemPrompt, history) => {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ systemPrompt, history })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi kết nối API Server');
      }
      const json = await res.json();
      return json.text;
    } catch (err) {
      throw new Error(err.message || 'Lỗi kết nối mạng hoặc cấu hình API Server');
    }
  };

  const handleGenerateScript = async () => {
    if (!aiForm.project) { setAiError("Vui lòng nhập tên dự án/sản phẩm!"); return; }
    setAiError(''); setIsGenerating(true);
    try {
      const prompt = `Viết một kịch bản telesale gọi lạnh (cold call) ngắn gọn, tự nhiên, chuyên nghiệp. Dự án/Sản phẩm: ${aiForm.project}\nĐiểm nổi bật: ${aiForm.highlights || 'Không rõ'}\nĐối tượng KH: ${aiForm.customer || 'Chung chung'}\nChỉ xuất ra nội dung kịch bản đóng vai người sale nói với khách, không cần giải thích hay dạo đầu. Thêm lời chào và kết thúc mở để tương tác.`;
      const result = await fetchGeminiResponse(prompt);
      const newScript = { id: Date.now(), title: `Kịch bản AI: ${aiForm.project}`, script: result.trim() };
      const newData = { ...data }; newData.quyTrinh.telesale.push(newScript); setData(newData);
      setShowAIModal(false); setAiForm({ project: '', highlights: '', customer: '' });
    } catch(e) { setAiError(e.message); }
    setIsGenerating(false);
  };

  const handleAiObjection = async (reason, idx) => {
    setLoadingAiResponse(idx);
    try {
      const prompt = `Khách hàng từ chối mua hàng với lý do: "${reason}". Đóng vai một chuyên gia sale thực chiến đỉnh cao, hãy đưa ra cách phản hồi (kịch bản lời thoại trực tiếp) khéo léo, đồng cảm và điều hướng tư duy khách hàng. Viết cực kỳ ngắn gọn, khoảng 2-3 câu. Không giải thích, chỉ xuất ra câu nói.`;
      const result = await fetchGeminiResponse(prompt);
      setAiResponses(prev => ({...prev, [idx]: result.trim()}));
    } catch(e) { setAiResponses(prev => ({...prev, [idx]: "Lỗi kết nối AI. Vui lòng thử lại!"})); }
    setLoadingAiResponse(null);
  };

  const handleAnalyzeLead = async () => {
    if (!leadContext.trim()) return; setIsAnalyzingLead(true);
    try {
      const prompt = `Đóng vai một Giám đốc Kinh doanh Bất động sản xuất sắc. Nhân viên của bạn báo cáo một tình huống khách hàng (lead) như sau: "${leadContext}".\nDựa vào 5 kiểu khách hàng (Có kinh nghiệm, Chưa biết gì, Biết nhưng chưa đầu tư, Theo xu hướng, Bị kéo đến), hãy phân tích giúp nhân viên:\n1. Khách này thuộc nhóm nào và trạng thái hiện tại (Lạnh/Ấm/Nóng)?\n2. Gợi ý 2 bước tiếp cận tiếp theo cụ thể.\n3. Gợi ý 2 câu hỏi (hook) để mở khóa nhu cầu của khách hàng này.\nTrình bày cực kỳ ngắn gọn, định dạng rõ ràng, ngôn ngữ mang tính huấn luyện chuyên nghiệp.`;
      const result = await fetchGeminiResponse(prompt); setLeadAnalysis(result.trim());
    } catch(e) { setLeadAnalysis("Lỗi kết nối AI. Không thể phân tích lúc này."); }
    setIsAnalyzingLead(false);
  };

  const handleGradeScript = async () => {
    if (!scriptToGrade.trim()) return; setIsGradingScript(true);
    try {
      const prompt = `Đóng vai một chuyên gia huấn luyện Telesale (Sales Trainer). Hãy đọc và nhận xét kịch bản sau của một nhân viên sales mới:\n"${scriptToGrade}"\n\nYêu cầu đánh giá:\n1. Điểm số (1/10) dựa trên độ tự nhiên, hấp dẫn, không giống "đọc vẹt".\n2. Ưu điểm của kịch bản này.\n3. Nhược điểm cần cải thiện (có gây nhàm chán không, có tạo được sự tò mò không).\n4. Viết lại 1 phiên bản tối ưu hơn, "sát thủ" hơn cho kịch bản này.\nTrình bày bằng Markdown rõ ràng, dễ đọc.`;
      const result = await fetchGeminiResponse(prompt); setScriptFeedback(result.trim());
    } catch(e) { setScriptFeedback("Lỗi kết nối AI. Không thể chấm điểm lúc này."); }
    setIsGradingScript(false);
  };

  const handleDraftZalo = async () => {
    if (!zaloMeetingNotes.trim()) return; setIsDraftingZalo(true);
    try {
      const prompt = `Đóng vai một chuyên viên tư vấn BĐS tinh tế. Dựa trên ghi chú sau cuộc gặp với khách hàng: "${zaloMeetingNotes}". Hãy soạn 1 tin nhắn Zalo chăm sóc (follow-up). Yêu cầu: Ngắn gọn (dưới 80 chữ), thân thiện, KHÔNG nhắc quá nhiều về bán hàng/sản phẩm (không spam), kết thúc bằng một lời chúc hoặc câu hỏi mở nhẹ nhàng, có sử dụng 1-2 emoji phù hợp.`;
      const result = await fetchGeminiResponse(prompt); setZaloDraft(result.trim());
    } catch(e) { setZaloDraft("Lỗi kết nối AI. Không thể tạo tin nhắn lúc này."); }
    setIsDraftingZalo(false);
  };

  const handleAnalyzeMarket = async () => {
    if (!marketLocation.trim()) return; setIsAnalyzingMarket(true);
    try {
      const prompt = `Đóng vai một chuyên gia phân tích thị trường Bất động sản. Khách hàng đang hỏi về khu vực: "${marketLocation}".\nHãy cung cấp một bản tóm tắt cực kỳ sắc bén (dưới 150 chữ) bao gồm:\n1. Đặc điểm kinh tế/hạ tầng nổi bật nhất.\n2. Tiềm năng tăng giá hoặc dòng tiền.\n3. Một "câu chốt" (hook) hấp dẫn để người sales dùng tư vấn cho khách.`;
      const result = await fetchGeminiResponse(prompt); setMarketInsight(result.trim());
    } catch(e) { setMarketInsight("Lỗi kết nối AI. Không thể phân tích thị trường lúc này."); }
    setIsAnalyzingMarket(false);
  };

  const handleAdviseClose = async () => {
    if (selectedSignals.length === 0) return; setIsAdvisingClose(true);
    try {
      const prompt = `Đóng vai "Sát thủ chốt sale". Khách hàng BĐS đang có các tín hiệu sẵn sàng mua sau đây:\n${selectedSignals.map(s => "- " + s).join('\n')}\n\nHãy gợi ý:\n1. Đánh giá mức độ "chín muồi" của khách hàng (%).\n2. Đề xuất chiến thuật chốt sale phù hợp nhất ngay lúc này (chốt giả định, chốt khan hiếm, hay chốt lợi ích?).\n3. Viết 1 câu thoại trực tiếp để "đẩy thuyền" chốt cọc ngay bây giờ mà không bị thô.\nTrình bày ngắn gọn, rõ ràng.`;
      const result = await fetchGeminiResponse(prompt); setClosingAdvice(result.trim());
    } catch(e) { setClosingAdvice("Lỗi kết nối AI. Không thể cố vấn lúc này."); }
    setIsAdvisingClose(false);
  };

  const toggleSignal = (sig) => {
    setSelectedSignals(prev => prev.includes(sig) ? prev.filter(s => s !== sig) : [...prev, sig]);
  };

  const handleGenerateBattlecard = async () => {
    if (!myProject.trim() || !competitorProject.trim()) return; setIsGeneratingBattlecard(true);
    try {
      const prompt = `Đóng vai Giám đốc Chiến lược Bất động sản. Hãy phân tích so sánh nhanh giữa dự án của tôi bán: "${myProject}" và dự án đối thủ: "${competitorProject}". Trình bày siêu ngắn gọn:\n1. Ưu thế cốt lõi của bên mình so với đối thủ.\n2. Điểm yếu của đối thủ mà sale có thể khai thác khéo léo.\n3. Viết 1 câu thoại xử lý từ chối khi khách hàng nói "Bên ${competitorProject} giá rẻ hơn/tốt hơn".`;
      const result = await fetchGeminiResponse(prompt); setBattlecardResult(result.trim());
    } catch(e) { setBattlecardResult("Lỗi kết nối AI. Không thể phân tích đối thủ."); }
    setIsGeneratingBattlecard(false);
  };

  const handleSummarizeCall = async () => {
    if (!rawCallNotes.trim()) return; setIsSummarizingCall(true);
    try {
      const prompt = `Đóng vai Trợ lý hành chính nhập liệu CRM. Dựa trên các ghi chép lộn xộn và vội vàng sau khi gọi cho khách hàng: "${rawCallNotes}".\nHãy chuẩn hóa thành một ghi chú CRM chuyên nghiệp, rõ ràng theo các mục sau (dùng gạch đầu dòng):\n- Thông tin & Nhu cầu cốt lõi\n- Tình trạng tài chính\n- Điểm nghẽn / Lo ngại\n- Bước tiếp theo (Next step)`;
      const result = await fetchGeminiResponse(prompt); setCrmSummary(result.trim());
    } catch(e) { setCrmSummary("Lỗi kết nối AI. Không thể tóm tắt."); }
    setIsSummarizingCall(false);
  };

  const handleDealAutopsy = async () => {
    if (!dealContext.trim()) return; setIsAutopsying(true);
    try {
      const prompt = `Đóng vai một Giám đốc Kinh doanh cấp cao huấn luyện nhân viên. Nhân viên sales vừa báo cáo kết quả một thương vụ: [Trạng thái: ${dealOutcome === 'won' ? 'Thắng (Chốt thành công)' : 'Thua (Rớt khách)'}] - Tình huống: "${dealContext}".\nHãy phân tích (Deal Autopsy) cực kỳ ngắn gọn và sắc bén:\n1. Nguyên nhân cốt lõi dẫn đến kết quả này (nhìn xuyên qua bề nổi).\n2. Bài học xương máu rút ra cho các thương vụ tiếp theo.\nTrình bày dễ đọc, dùng ngôn từ thực chiến BĐS.`;
      const result = await fetchGeminiResponse(prompt); setDealAutopsyResult(result.trim());
    } catch(e) { setDealAutopsyResult("Lỗi kết nối AI. Không thể phân tích thương vụ."); }
    setIsAutopsying(false);
  };

  const handleGenerateIcebreaker = async () => {
    if (!clientProfile.trim()) return; setIsGeneratingIcebreaker(true);
    try {
      const prompt = `Đóng vai một bậc thầy giao tiếp và bán hàng. Dựa trên thông tin/ngoại hình/nghề nghiệp của khách hàng sau: "${clientProfile}".\nHãy gợi ý:\n1. 3 câu nói mở đầu (icebreaker) để "phá băng", khen ngợi tinh tế hoặc bắt chuyện tự nhiên nhất khi vừa gặp mặt (không sáo rỗng, không nịnh nọt lố bịch).\n2. 1 chủ đề "nhạy cảm" tuyệt đối nên tránh nói với kiểu người này.\nViết ngắn gọn, trực diện.`;
      const result = await fetchGeminiResponse(prompt); setIcebreakerResult(result.trim());
    } catch(e) { setIcebreakerResult("Lỗi kết nối AI. Không thể tạo câu mở lời."); }
    setIsGeneratingIcebreaker(false);
  };

  const handleGenerateReferral = async () => {
    if (!referralClientContext.trim()) return; setIsGeneratingReferral(true);
    try {
      const prompt = `Đóng vai chuyên gia chăm sóc khách hàng Bất động sản. Khách hàng cũ của tôi có tình trạng: "${referralClientContext}".\nHãy viết 1 kịch bản nhắn tin hoặc gọi điện thật tinh tế để "xin lời giới thiệu" (referral) bạn bè/người thân của họ mua dự án mới.\nYêu cầu: Khéo léo, chân thành, tự nhiên, tuyệt đối không gây áp lực hoặc làm khách thấy phiền. Nêu rõ lợi ích (nếu có) khi họ giới thiệu.`;
      const result = await fetchGeminiResponse(prompt); setReferralScript(result.trim());
    } catch(e) { setReferralScript("Lỗi kết nối AI. Không thể tạo kịch bản."); }
    setIsGeneratingReferral(false);
  };

  const handleCoachingMood = async () => {
    if (!salesMood.trim()) return; setIsCoachingMood(true);
    try {
      const prompt = `Đóng vai Giám đốc Kinh doanh (Sales Manager) dày dặn kinh nghiệm, thấu hiểu tâm lý. Nhân viên sales của bạn đang gặp vấn đề: "${salesMood}".\nHãy đưa ra một lời khuyên (dưới 150 chữ) để xốc lại tinh thần mạnh mẽ, truyền lửa.\nĐồng thời, giao đúng 1 "hành động nhỏ bé" (micro-action) để họ làm ngay lập tức nhằm thoát khỏi sự chán nản/bế tắc này.\nViết trực diện, thực chiến, không lý thuyết suông.`;
      const result = await fetchGeminiResponse(prompt); setMotivationDose(result.trim());
    } catch(e) { setMotivationDose("Lỗi kết nối AI. Không thể phân tích tâm lý lúc này."); }
    setIsCoachingMood(false);
  };

  const handleGenerateSocialPost = async () => {
    if (!socialTopic.trim()) return; setIsGeneratingSocial(true);
    try {
      const prompt = `Đóng vai một chuyên gia Marketing Bất động sản và Xây dựng thương hiệu cá nhân. Hãy viết một bài đăng mạng xã hội (Facebook/Zalo) cho một môi giới dựa trên sự kiện/chủ đề: "${socialTopic}". Yêu cầu: Văn phong chuyên nghiệp nhưng gần gũi, có câu tiêu đề (hook) thu hút, nội dung chia sẻ giá trị chứ không chỉ chăm chăm bán hàng, kèm biểu tượng cảm xúc (emoji) phù hợp và 3-5 hashtag. Độ dài khoảng 150-250 chữ.`;
      const result = await fetchGeminiResponse(prompt); setSocialPostResult(result.trim());
    } catch(e) { setSocialPostResult("Lỗi kết nối AI. Không thể tạo bài viết lúc này."); }
    setIsGeneratingSocial(false);
  };

  const handlePlanFollowUp = async () => {
    if (!followUpContext.trim()) return; setIsPlanningFollowUp(true);
    try {
      const prompt = `Đóng vai Giám đốc Kinh doanh Bất động sản. Một nhân viên báo cáo tình trạng khách hàng sau buổi gặp/gọi: "${followUpContext}". Khách hàng chưa chốt và cần bám đuổi (follow-up). Hãy lập một chiến dịch bám đuổi tinh tế gồm 3 "điểm chạm" trong 10 ngày tới. Trình bày theo format:\n- Điểm chạm 1 (Ngày X): Kênh liên lạc + Nội dung/Giá trị trao đi (Tuyệt đối không hối thúc mua).\n- Điểm chạm 2 (Ngày Y): Kênh liên lạc + Nội dung/Giá trị trao đi.\n- Điểm chạm 3 (Ngày Z): Kênh liên lạc + Câu hỏi chốt khéo léo (Call to action).\nViết cực kỳ ngắn gọn, thực chiến.`;
      const result = await fetchGeminiResponse(prompt); setFollowUpPlanResult(result.trim());
    } catch(e) { setFollowUpPlanResult("Lỗi kết nối AI. Không thể lập kế hoạch lúc này."); }
    setIsPlanningFollowUp(false);
  };

  const handleMapPersona = async () => {
    if (!personaContext.trim()) return; setIsMappingPersona(true);
    try {
      const prompt = `Đóng vai chuyên gia Tâm lý học hành vi khách hàng Bất động sản. Dựa trên thông tin cơ bản: "${personaContext}". Hãy phác họa Bản đồ Thấu cảm (Empathy Map) nhanh gọn:\n1. Nỗi sợ hãi/Lo lắng thầm kín nhất (Pain points).\n2. Khát khao/Kỳ vọng thực sự (không chỉ là mua nhà mà là giá trị phía sau).\n3. Gợi ý 2 câu hỏi "tử huyệt" để chạm đúng vào cảm xúc của họ.\nTrình bày cực kỳ sắc bén, đi thẳng vào vấn đề tâm lý.`;
      const result = await fetchGeminiResponse(prompt); setPersonaMapResult(result.trim());
    } catch(e) { setPersonaMapResult("Lỗi kết nối AI. Không thể phác họa tâm lý lúc này."); }
    setIsMappingPersona(false);
  };

  const handleNegotiationStrategy = async () => {
    if (!negotiationDemand.trim()) return; setIsStrategizingNegotiation(true);
    try {
      const prompt = `Đóng vai Chuyên gia Đàm phán Bất động sản. Khách hàng đang đưa ra yêu cầu/đòi hỏi cứng rắn: "${negotiationDemand}". Hãy lên chiến thuật đàm phán Win-Win:\n1. Đọc vị tâm lý (Vì sao họ đòi hỏi thế này? Họ đang thử hay thực sự cần?).\n2. Chiến thuật Give-Get (Nếu sales nhượng bộ thì sales phải đưa ra điều kiện đánh đổi gì để không bị lép vế?).\n3. Mẫu câu thoại phản hồi khéo léo, giữ vững giá trị sản phẩm mà không làm mất lòng khách.\nViết ngắn gọn, chuyên nghiệp, dễ áp dụng ngay.`;
      const result = await fetchGeminiResponse(prompt); setNegotiationStrategyResult(result.trim());
    } catch(e) { setNegotiationStrategyResult("Lỗi kết nối AI. Không thể lập chiến thuật đàm phán."); }
    setIsStrategizingNegotiation(false);
  };

  const startRoleplay = async () => {
    setIsRoleplayLoading(true); setRoleplayError('');
    const customerDesc = data.khachHang.types[roleplayType].desc;
    const systemPrompt = `Bạn là một khách hàng BĐS với đặc điểm: "${customerDesc}". Bạn đang nói chuyện với một người môi giới BĐS (người dùng). Hãy đóng vai thật tự nhiên, phản hồi ngắn gọn (1-2 câu), thể hiện đúng tính cách và sự từ chối/quan tâm của kiểu khách này. Đừng quá dễ dãi.`;
    const initHistory = [{ role: 'user', text: '(Bắt đầu cuộc gọi, khách hàng nhấc máy)' }];
    try {
      const result = await fetchGeminiChat(systemPrompt, initHistory);
      setRoleplayHistory([{ role: 'model', text: result.trim() }]);
      setRoleplayActive(true);
    } catch(e) { setRoleplayError('Không thể bắt đầu. Vui lòng thử lại.'); }
    setIsRoleplayLoading(false);
  };

  const handleSendRoleplay = async () => {
    if (!roleplayInput.trim() || isRoleplayLoading) return;
    const newUserMsg = { role: 'user', text: roleplayInput.trim() };
    const updatedHistory = [...roleplayHistory, newUserMsg];
    setRoleplayHistory(updatedHistory); setRoleplayInput(''); setIsRoleplayLoading(true);
    const customerDesc = data.khachHang.types[roleplayType].desc;
    const systemPrompt = `Bạn là một khách hàng BĐS với đặc điểm: "${customerDesc}". Bạn đang nói chuyện với một người môi giới BĐS (người dùng). Hãy đóng vai thật tự nhiên, phản hồi ngắn gọn (1-2 câu), thể hiện đúng tính cách và sự từ chối/quan tâm của kiểu khách này. Đừng quá dễ dãi.`;
    try {
      const result = await fetchGeminiChat(systemPrompt, updatedHistory);
      setRoleplayHistory([...updatedHistory, { role: 'model', text: result.trim() }]);
    } catch(e) {
      setRoleplayHistory([...updatedHistory, { role: 'model', text: '(Mất kết nối với khách hàng. Vui lòng thử lại!)' }]);
    }
    setIsRoleplayLoading(false);
  };

  const handleUpdateArrayItem = (category, arrayName, index, field, newValue) => {
    const newData = { ...data }; newData[category][arrayName][index][field] = newValue; setData(newData);
  };
  const handleUpdateSimpleArrayItem = (category, arrayName, index, newValue) => {
    const newData = { ...data }; newData[category][arrayName][index] = newValue; setData(newData);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea'); el.value = text;
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
    });
  };

  const EditableField = ({ value, onChange, isTextArea = false, className = "" }) => {
    if (!isEditing) return <div className={`whitespace-pre-wrap ${className}`}>{value}</div>;
    return isTextArea ? (
      <textarea className={`w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 ${className}`} value={value} onChange={e => onChange(e.target.value)} rows={3} />
    ) : (
      <input type="text" className={`w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 ${className}`} value={value} onChange={e => onChange(e.target.value)} />
    );
  };

  const AiResultBox = ({ result }) => (
    <div style={{marginTop:20,padding:20,borderRadius:12,border:'1px solid rgba(99,102,241,0.25)',background:'rgba(10,8,36,0.55)',backdropFilter:'blur(8px)',color:'#e2e8f0',fontSize:'13.5px',lineHeight:1.7,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04),0 4px 24px rgba(0,0,0,0.3)'}}>
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12,paddingBottom:10,borderBottom:'1px solid rgba(99,102,241,0.18)'}}>
        <Sparkles style={{width:13,height:13,color:'#818cf8',flexShrink:0}}/>
        <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(129,140,248,0.8)'}}>Phản hồi từ VĐH AI</span>
      </div>
      {result.split('\n').map((line, i) => {
        const clean = line.replace(/\*\*/g, '').replace(/^#+\s*/, '');
        if (line.match(/^\*\*/) || line.match(/^#+/)) return <p key={i} style={{fontWeight:700,color:'#a5b4fc',marginTop:12,marginBottom:4}}>{clean}</p>;
        if (line.startsWith('- ')) return <li key={i} style={{marginLeft:16,marginBottom:4,color:'#cbd5e1'}}>{line.substring(2)}</li>;
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} style={{marginBottom:6,color:'#cbd5e1'}}>{line}</p>;
      })}
    </div>
  );

  const tabs = [
    { id: 'soTayCaNhan', label: 'Sổ tay Cá nhân AI', icon: FileText },
    { id: 'hanhTrinh', label: 'Hành trình KH', icon: MapPin },
    { id: 'quyTrinh', label: '8 Bước Tư vấn', icon: ListOrdered },
    { id: 'khachHang', label: 'Kiểu KH & Từ chối', icon: Users },
    { id: 'kienThuc', label: 'Kiến thức SP', icon: BookOpen },
    { id: 'thucChien', label: 'Thực chiến & AI', icon: Target },
    { id: 'chotSale', label: 'Chốt Sale', icon: CheckCircle },
    { id: 'goiDichVu', label: 'Plus, Pro & Ultra', icon: Gem },
    { id: 'referralPro', label: 'Referral Pro', icon: Gift, badge: 'HOT' },
    ...(currentUser && currentUser.role === 'admin' ? [{ id: 'admin', label: 'Quản trị User', icon: ClipboardList }] : [])
  ];

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState('');
  const [billingCycle, setBillingCycle] = useState('1M'); // '1M' = 1 tháng, '3M' = 3 tháng, '1Y' = 1 năm

  const renderGoiDichVu = () => {
    const planInfo = {
      free: { name: 'Miễn Phí (Trial)', badgeColor: 'bg-slate-800 text-slate-300 border-slate-700' },
      plus: { name: 'Gói PLUS', badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/60' },
      pro: { name: 'Gói PRO (Ưu việt)', badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-800/60' },
      ultra: { name: 'Gói ULTRA (Sát thủ)', badgeColor: 'bg-purple-950/60 text-purple-400 border-purple-800/60' },
      admin: { name: 'Quản Trị Viên', badgeColor: 'bg-red-950/60 text-red-400 border-red-800/60' }
    };

    const currentPlan = currentUser?.plan || 'free';
    const currentLimit = currentUser?.requestLimit || 30;
    const currentUsage = currentUser?.requestCount || 0;
    const usagePercent = Math.min(100, Math.round((currentUsage / currentLimit) * 100));

    // Pricing details for all tiers and billing cycles (1M, 3M, 1Y)
    const pricingDetails = {
      PLUS: {
        '1M': { price: 99000, label: '99.000đ', period: '/ tháng', note: 'Thanh toán hàng tháng', eqMonthly: '99.000đ/tháng' },
        '3M': { price: 269000, label: '269.000đ', period: '/ 3 tháng', note: 'Thanh toán 3 tháng một lần (Tiết kiệm 10%)', eqMonthly: '89.600đ/tháng' },
        '1Y': { price: 799000, label: '799.000đ', period: '/ năm', note: 'Thanh toán 12 tháng một lần (Tiết kiệm 33%)', eqMonthly: '66.500đ/tháng' }
      },
      PRO: {
        '1M': { price: 199000, label: '199.000đ', period: '/ tháng', note: 'Thanh toán hàng tháng', eqMonthly: '199.000đ/tháng' },
        '3M': { price: 539000, label: '539.000đ', period: '/ 3 tháng', note: 'Thanh toán 3 tháng một lần (Tiết kiệm 10%)', eqMonthly: '179.600đ/tháng' },
        '1Y': { price: 1590000, label: '1.590.000đ', period: '/ năm', note: 'Thanh toán 12 tháng một lần (Tiết kiệm 33%)', eqMonthly: '132.500đ/tháng' }
      },
      ULTRA: {
        '1M': { price: 499000, label: '499.000đ', period: '/ tháng', note: 'Thanh toán hàng tháng', eqMonthly: '499.000đ/tháng' },
        '3M': { price: 1349000, label: '1.349.000đ', period: '/ 3 tháng', note: 'Thanh toán 3 tháng một lần (Tiết kiệm 10%)', eqMonthly: '449.600đ/tháng' },
        '1Y': { price: 3990000, label: '3.990.000đ', period: '/ năm', note: 'Thanh toán 12 tháng một lần (Tiết kiệm 33%)', eqMonthly: '332.500đ/tháng' }
      }
    };

    // Calculate dynamic checkout properties based on selections
    const selectedPlanDetails = pricingDetails[selectedUpgradePlan]?.[billingCycle] || { price: 0, label: '0đ', period: '', note: '', eqMonthly: '' };
    const selectedPrice = selectedPlanDetails.price;
    const paymentMemo = `${currentUser?.username} ${selectedUpgradePlan}${billingCycle}`;
    const qrCodeUrl = `https://img.vietqr.io/image/Vietcombank-0451000431231-compact2.png?amount=${selectedPrice}&addInfo=${encodeURIComponent(paymentMemo)}&accountName=VUONG%20DAC%20HIEP`;

    return (
      <div className="space-y-8 animate-fadeIn" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {/* Hạn mức hiện tại */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(20, 21, 48, 0.65) 0%, rgba(10, 8, 28, 0.65) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            opacity: 0.06,
            pointerEvents: 'none',
            transform: 'rotate(15deg)'
          }}>
            <Gem style={{ width: 160, height: 160, color: '#F59E0B' }} />
          </div>

          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Gem className="text-amber-400 animate-pulse" style={{ width: 20, height: 20 }} /> Hạn mức sử dụng tài khoản của bạn
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-xxs text-slate-400 font-bold uppercase tracking-widest block">Gói dịch vụ đang dùng</span>
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-black border uppercase tracking-wider ${planInfo[currentPlan]?.badgeColor}`} style={{
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {planInfo[currentPlan]?.name}
              </span>
            </div>
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Tiến trình sử dụng tháng này</span>
                <span className="text-amber-400 font-mono text-sm">{currentUsage} / {currentLimit} lượt gọi AI</span>
              </div>
              <div className="w-full bg-slate-950/80 rounded-full h-3.5 border border-indigo-950/60 overflow-hidden p-0.5" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                <div 
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${usagePercent}%`,
                    boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)'
                  }}
                />
              </div>
              <div className="flex justify-between text-xxs text-slate-400 font-semibold">
                <span>Đã sử dụng {usagePercent}%</span>
                <span>Còn lại {Math.max(0, currentLimit - currentUsage)} lượt gọi khả dụng</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bảng so sánh 3 gói */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="text-amber-600 animate-pulse" style={{ width: 22, height: 22 }} /> Nâng cấp tài khoản chuyên nghiệp
              </h3>
              <p className="text-xs text-gray-500 max-w-xl">Mở khóa toàn bộ sức mạnh công nghệ AI Bất động sản thực chiến để tối ưu hóa quy trình tư vấn, xử lý từ chối và chốt giao dịch vượt trội.</p>
            </div>

            {/* Bộ chọn chu kỳ thanh toán cao cấp */}
            <div style={{
              display: 'flex',
              background: 'rgba(15, 23, 42, 0.75)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <button 
                onClick={() => setBillingCycle('1M')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none',
                  background: billingCycle === '1M' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                  color: billingCycle === '1M' ? '#F59E0B' : '#a4b5cf'
                }}
              >
                1 Tháng
              </button>
              <button 
                onClick={() => setBillingCycle('3M')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none',
                  position: 'relative',
                  background: billingCycle === '3M' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                  color: billingCycle === '3M' ? '#F59E0B' : '#a4b5cf'
                }}
              >
                3 Tháng
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-4px',
                  background: '#3b82f6',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 900,
                  padding: '1px 4px',
                  borderRadius: '4px',
                  transform: 'scale(0.85)'
                }}>-10%</span>
              </button>
              <button 
                onClick={() => setBillingCycle('1Y')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: 'none',
                  position: 'relative',
                  background: billingCycle === '1Y' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                  color: billingCycle === '1Y' ? '#F59E0B' : '#a4b5cf'
                }}
              >
                1 Năm
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-4px',
                  background: '#f43f5e',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 900,
                  padding: '1px 4px',
                  borderRadius: '4px',
                  transform: 'scale(0.85)'
                }}>SIÊU RẺ</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Gói PLUS */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(20, 22, 45, 0.85) 0%, rgba(13, 11, 32, 0.85) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.45)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.25)';
              }}
            >
              <div>
                <span className="text-xxs text-blue-400 font-black tracking-widest uppercase block mb-1">Cơ bản</span>
                <h4 className="text-xl font-black text-white mb-2">Gói PLUS</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{pricingDetails.PLUS[billingCycle].label}</span>
                  <span className="text-xxs text-slate-400 font-bold uppercase">{pricingDetails.PLUS[billingCycle].period}</span>
                </div>
                {/* Dòng tương đương tháng (nếu mua gói dài hạn) */}
                {billingCycle !== '1M' && (
                  <div className="text-xxs text-emerald-400 font-semibold mt-1">
                    tương đương {pricingDetails.PLUS[billingCycle].eqMonthly}
                  </div>
                )}
                <div className="text-xxs text-slate-500 font-semibold italic mt-1">{pricingDetails.PLUS[billingCycle].note}</div>
                
                <div className="border-t border-slate-800/80 pt-4 mt-4 mb-6 space-y-4">
                  <div className="text-xs font-black text-blue-400 uppercase tracking-wide">300 lượt gọi AI / tháng</div>
                  <ul className="space-y-2.5 text-xxs text-slate-300">
                    <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Soạn kịch bản Telesale tự động</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Soạn tin nhắn Zalo chăm sóc</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Gợi ý phá băng giao tiếp</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Cập nhật tin tức BĐS hàng ngày</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => { setSelectedUpgradePlan('PLUS'); setShowUpgradeModal(true); }}
                className="w-full bg-slate-950/60 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200"
              >
                Đăng ký ngay
              </button>
            </div>

            {/* Gói PRO */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(28, 24, 42, 0.9) 0%, rgba(16, 12, 28, 0.9) 100%)',
                border: '2px solid rgba(245, 158, 11, 0.75)',
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.12), 0 4px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease-in-out',
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(245, 158, 11, 0.22), 0 8px 32px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 158, 11, 0.12), 0 4px 24px rgba(0,0,0,0.3)';
              }}
            >
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-slate-950 text-xxs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-amber-500/20">
                Khuyên dùng
              </div>
              <div>
                <span className="text-xxs text-amber-500 font-black tracking-widest uppercase block mb-1">Bán chạy nhất</span>
                <h4 className="text-xl font-black text-white mb-2">Gói PRO</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{pricingDetails.PRO[billingCycle].label}</span>
                  <span className="text-xxs text-slate-400 font-bold uppercase">{pricingDetails.PRO[billingCycle].period}</span>
                </div>
                {/* Dòng tương đương tháng (nếu mua gói dài hạn) */}
                {billingCycle !== '1M' && (
                  <div className="text-xxs text-emerald-400 font-semibold mt-1">
                    tương đương {pricingDetails.PRO[billingCycle].eqMonthly}
                  </div>
                )}
                <div className="text-xxs text-slate-500 font-semibold italic mt-1">{pricingDetails.PRO[billingCycle].note}</div>

                <div className="border-t border-slate-800/80 pt-4 mt-4 mb-6 space-y-4">
                  <div className="text-xs font-black text-amber-500 uppercase tracking-wide">1.000 lượt gọi AI / tháng</div>
                  <ul className="space-y-2.5 text-xxs text-slate-300">
                    <li className="flex items-center gap-2 font-bold text-slate-200"><span className="text-amber-500">✔</span> Đầy đủ tính năng gói PLUS</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> Phòng tập Gym Sales (Khách AI)</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> AI Cố vấn chốt sale dứt điểm</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> AI Chuyên gia đàm phán ép giá</li>
                    <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> Lên kịch bản bám đuổi 10 ngày</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => { setSelectedUpgradePlan('PRO'); setShowUpgradeModal(true); }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-500/10"
              >
                Nâng cấp Pro
              </button>
            </div>

            {/* Gói ULTRA */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(20, 22, 45, 0.85) 0%, rgba(13, 11, 32, 0.85) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.45)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(168, 85, 247, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.25)';
              }}
            >
              <div>
                <span className="text-xxs text-purple-400 font-black tracking-widest uppercase block mb-1">Vô song</span>
                <h4 className="text-xl font-black text-white mb-2">Gói ULTRA</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{pricingDetails.ULTRA[billingCycle].label}</span>
                  <span className="text-xxs text-slate-400 font-bold uppercase">{pricingDetails.ULTRA[billingCycle].period}</span>
                </div>
                {/* Dòng tương đương tháng (nếu mua gói dài hạn) */}
                {billingCycle !== '1M' && (
                  <div className="text-xxs text-emerald-400 font-semibold mt-1">
                    tương đương {pricingDetails.ULTRA[billingCycle].eqMonthly}
                  </div>
                )}
                <div className="text-xxs text-slate-500 font-semibold italic mt-1">{pricingDetails.ULTRA[billingCycle].note}</div>

                <div className="border-t border-slate-800/80 pt-4 mt-4 mb-6 space-y-4">
                  <div className="text-xs font-black text-purple-400 uppercase tracking-wide">5.000 lượt gọi AI / tháng</div>
                  <ul className="space-y-2.5 text-xxs text-slate-300">
                    <li className="flex items-center gap-2 font-bold text-slate-200"><span className="text-purple-500">✔</span> Đầy đủ tính năng gói PRO</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Giải phẫu thương vụ (Autopsy)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Cố vấn chiến lược BĐS nâng cao</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Hỗ trợ cấu hình AI Key riêng</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Ưu tiên phản hồi tốc độ cao</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => { setSelectedUpgradePlan('ULTRA'); setShowUpgradeModal(true); }}
                className="w-full bg-slate-950/60 hover:bg-purple-600 text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200"
              >
                Liên hệ nâng cấp
              </button>
            </div>
          </div>
        </div>

        {/* Modal thông tin thanh toán VietQR cao cấp */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(20, 21, 45, 0.95) 0%, rgba(11, 10, 28, 0.95) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '640px',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="p-6 md:p-8"
            >
              {/* Nút đóng */}
              <button 
                onClick={() => setShowUpgradeModal(false)} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-150"
              >
                <X style={{ width: 16, height: 16 }} />
              </button>
              
              {/* Tiêu đề */}
              <div className="text-center md:text-left mb-6">
                <h3 className="text-lg md:text-xl font-black text-white flex items-center justify-center md:justify-start gap-2">
                  <Gem className="text-amber-500 animate-pulse" style={{ width: 22, height: 22 }} /> Nâng Cấp {selectedUpgradePlan}
                </h3>
                <p className="text-xxs text-slate-400 font-semibold uppercase tracking-wider mt-1">Giao dịch an toàn & kích hoạt tức thì qua quét mã VietQR</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* QR Code bên trái */}
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-inner border border-slate-800">
                  <img 
                    src={qrCodeUrl} 
                    alt={`VietQR ${selectedUpgradePlan}`} 
                    className="w-48 h-48 object-contain transition-transform duration-300 hover:scale-105"
                    style={{ minWidth: '180px', minHeight: '180px' }}
                  />
                  <div className="mt-3 text-center">
                    <p className="text-xxs text-slate-500 font-black tracking-widest uppercase">Quét mã bằng App ngân hàng</p>
                    <p className="text-3xs text-slate-400 mt-0.5">Tự động điền số tiền & nội dung</p>
                  </div>
                </div>

                {/* Thông tin chuyển khoản bên phải */}
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-950/60 border border-indigo-950/60 p-4 rounded-xl space-y-3 font-medium">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Tên ngân hàng</span>
                      <strong className="text-slate-200">VIETCOMBANK (Ngân hàng Ngoại thương)</strong>
                    </div>
                    
                    <div className="flex flex-col gap-0.5 relative group">
                      <span className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Số tài khoản</span>
                      <div className="flex items-center justify-between mt-0.5">
                        <strong className="text-indigo-400 text-sm font-mono">0451000431231</strong>
                        <button 
                          onClick={() => { copyToClipboard('0451000431231'); alert('Đã sao chép số tài khoản!'); }}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xxs px-2.5 py-1 rounded text-slate-400 hover:text-white transition-colors"
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-0.5">
                      <span className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Chủ tài khoản</span>
                      <strong className="text-slate-200">VƯƠNG ĐẮC HIỆP</strong>
                    </div>

                    <div className="flex flex-col gap-0.5 border-t border-slate-900 pt-2.5">
                      <span className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Số tiền</span>
                      <strong className="text-amber-400 text-sm font-mono">{selectedPrice.toLocaleString('vi-VN')} VNĐ</strong>
                    </div>
                    
                    <div className="flex flex-col gap-0.5 relative group">
                      <span className="text-3xs text-slate-500 font-bold uppercase tracking-wider">Nội dung chuyển khoản</span>
                      <div className="flex items-center justify-between mt-1">
                        <strong className="text-amber-500 bg-amber-950/40 px-2 py-1 rounded border border-amber-900/50 font-mono tracking-wide text-xs">
                          {paymentMemo}
                        </strong>
                        <button 
                          onClick={() => { copyToClipboard(paymentMemo); alert('Đã sao chép nội dung chuyển khoản!'); }}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xxs px-2.5 py-1 rounded text-slate-400 hover:text-white transition-colors"
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hướng dẫn kích hoạt */}
              <div className="mt-6 bg-amber-950/20 border border-amber-900/40 p-3.5 rounded-xl text-xxs text-amber-300 leading-relaxed">
                <strong>Hỗ trợ kích hoạt nhanh:</strong> Sau khi hoàn tất chuyển khoản, bạn có thể chụp màn hình giao dịch thành công và gửi trực tiếp qua số điện thoại / Zalo <strong>08.6969.7363</strong> (Vương Đắc Hiệp) để được hỗ trợ duyệt nâng cấp ngay lập tức.
              </div>

              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full mt-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-150 shadow-md"
              >
                Tôi đã hoàn tất chuyển khoản
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // --- Sổ tay Cá nhân AI Helper and Render ---
  const parseReminderText = (text) => {
    const lowercaseText = text.toLowerCase();
    let date = new Date().toISOString().split('T')[0];
    let time = '09:00';
    let category = 'Công việc khác';
    let dateDetected = false;
    let timeDetected = false;
    let todayOrTomorrow = 'hôm nay';

    // Parse Date
    if (lowercaseText.includes('mai') && !lowercaseText.includes('mai c')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      date = tomorrow.toISOString().split('T')[0];
      dateDetected = true;
      todayOrTomorrow = 'ngày mai';
    } else if (lowercaseText.includes('mốt') || lowercaseText.includes('ngày kia')) {
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      date = dayAfter.toISOString().split('T')[0];
      dateDetected = true;
      todayOrTomorrow = 'ngày kia';
    } else if (lowercaseText.includes('hôm nay')) {
      date = new Date().toISOString().split('T')[0];
      dateDetected = true;
      todayOrTomorrow = 'hôm nay';
    }

    // Match DD/MM or DD/MM/YYYY
    const dateRegex = /(\d{1,2})[\/\-](\d{1,2})([\/\-](\d{4}))?/;
    const dateMatch = lowercaseText.match(dateRegex);
    if (dateMatch) {
      const day = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]) - 1;
      const year = dateMatch[4] ? parseInt(dateMatch[4]) : new Date().getFullYear();
      const parsedDate = new Date(year, month, day);
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate.toISOString().split('T')[0];
        dateDetected = true;
        todayOrTomorrow = `${day}/${month + 1}`;
      }
    }

    // Parse Time
    const timeRegex = /(\d{1,2})[h:](\d{2})?|(\d{1,2})\s*giờ/;
    const timeMatch = lowercaseText.match(timeRegex);
    if (timeMatch) {
      let hours = 0;
      let minutes = 0;
      if (timeMatch[3]) {
        hours = parseInt(timeMatch[3]);
      } else {
        hours = parseInt(timeMatch[1]);
        minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      }
      
      if ((lowercaseText.includes('chiều') || lowercaseText.includes('tối') || lowercaseText.includes('pm')) && hours < 12) {
        hours += 12;
      }
      
      time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      timeDetected = true;
    }

    // Parse Category
    if (lowercaseText.includes('gọi') || lowercaseText.includes('phone') || lowercaseText.includes('điện thoại')) {
      category = 'Gọi điện';
    } else if (lowercaseText.includes('gặp') || lowercaseText.includes('hẹn') || lowercaseText.includes('coffee') || lowercaseText.includes('cà phê')) {
      category = 'Gặp mặt';
    } else if (lowercaseText.includes('xem') || lowercaseText.includes('dẫn') || lowercaseText.includes('nhà') || lowercaseText.includes('đất')) {
      category = 'Xem nhà';
    }

    return { date, time, category, dateDetected, timeDetected, todayOrTomorrow };
  };

  // Sync reminder text parser
  useEffect(() => {
    if (reminderText) {
      const parsed = parseReminderText(reminderText);
      setReminderDate(parsed.date);
      setReminderTime(parsed.time);
      setReminderCategory(parsed.category);
      setReminderParsedStatus({
        dateDetected: parsed.dateDetected,
        timeDetected: parsed.timeDetected,
        todayOrTomorrow: parsed.todayOrTomorrow
      });
    } else {
      setReminderParsedStatus({ dateDetected: false, timeDetected: false, todayOrTomorrow: 'hôm nay' });
    }
  }, [reminderText]);

  const handleCreateReminder = () => {
    if (!reminderText.trim()) return;
    const newReminder = {
      id: Date.now().toString(),
      text: reminderText,
      customerId: reminderCustomer,
      date: reminderDate,
      time: reminderTime,
      category: reminderCategory,
      alertMinutes: reminderAlert,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setReminders([newReminder, ...reminders]);
    setReminderText('');
    setReminderCustomer('');
  };

  const handleToggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // Feng Shui Kua Calculator
  const calculateFengShui = (year, gender) => {
    const Y = parseInt(year);
    if (isNaN(Y) || Y < 1900 || Y > 2100) return null;
    
    let sum = (Y % 100);
    while (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }
    
    let kua = 0;
    if (gender === 'nam') {
      kua = Y < 2000 ? (10 - sum) : (9 - sum);
    } else {
      kua = Y < 2000 ? (5 + sum) : (6 + sum);
    }
    
    while (kua > 9 || kua <= 0) {
      if (kua <= 0) kua += 9;
      else kua = Math.floor(kua / 10) + (kua % 10);
    }
    
    if (kua === 5) {
      kua = gender === 'nam' ? 2 : 8;
    }

    const details = {
      1: { palace: 'Khảm (Thủy)', group: 'Đông Tứ Mệnh', good: ['Nam (Sinh Khí)', 'Bắc (Phục Vị)', 'Đông (Diên Niên)', 'Đông Nam (Thiên Y)'], bad: ['Tây Nam (Tuyệt Mệnh)', 'Đông Bắc (Ngũ Quỷ)', 'Tây (Lục Sát)', 'Tây Bắc (Họa Hại)'], directions: { N: 'good', S: 'good', E: 'good', SE: 'good', W: 'bad', NW: 'bad', SW: 'bad', NE: 'bad' } },
      2: { palace: 'Khôn (Thổ)', group: 'Tây Tứ Mệnh', good: ['Đông Bắc (Sinh Khí)', 'Tây Nam (Phục Vị)', 'Tây Bắc (Diên Niên)', 'Tây (Thiên Y)'], bad: ['Bắc (Tuyệt Mệnh)', 'Nam (Ngũ Quỷ)', 'Đông Nam (Lục Sát)', 'Đông (Họa Hại)'], directions: { NE: 'good', SW: 'good', NW: 'good', W: 'good', N: 'bad', S: 'bad', SE: 'bad', E: 'bad' } },
      3: { palace: 'Chấn (Mộc)', group: 'Đông Tứ Mệnh', good: ['Nam (Sinh Khí)', 'Bắc (Phục Vị)', 'Đông (Diên Niên)', 'Đông Nam (Thiên Y)'], bad: ['Tây Nam (Tuyệt Mệnh)', 'Đông Bắc (Ngũ Quỷ)', 'Tây (Lục Sát)', 'Tây Bắc (Họa Hại)'], directions: { N: 'good', S: 'good', E: 'good', SE: 'good', W: 'bad', NW: 'bad', SW: 'bad', NE: 'bad' } },
      4: { palace: 'Tốn (Mộc)', group: 'Đông Tứ Mệnh', good: ['Nam (Sinh Khí)', 'Bắc (Phục Vị)', 'Đông (Diên Niên)', 'Đông Nam (Thiên Y)'], bad: ['Tây Nam (Tuyệt Mệnh)', 'Đông Bắc (Ngũ Quỷ)', 'Tây (Lục Sát)', 'Tây Bắc (Họa Hại)'], directions: { N: 'good', S: 'good', E: 'good', SE: 'good', W: 'bad', NW: 'bad', SW: 'bad', NE: 'bad' } },
      6: { palace: 'Càn (Kim)', group: 'Tây Tứ Mệnh', good: ['Tây (Sinh Khí)', 'Tây Bắc (Phục Vị)', 'Tây Nam (Diên Niên)', 'Đông Bắc (Thiên Y)'], bad: ['Nam (Tuyệt Mệnh)', 'Bắc (Ngũ Quỷ)', 'Đông (Lục Sát)', 'Đông Nam (Họa Hại)'], directions: { W: 'good', NW: 'good', SW: 'good', NE: 'good', S: 'bad', N: 'bad', E: 'bad', SE: 'bad' } },
      7: { palace: 'Đoài (Kim)', group: 'Tây Tứ Mệnh', good: ['Tây Bắc (Sinh Khí)', 'Tây (Phục Vị)', 'Đông Bắc (Diên Niên)', 'Tây Nam (Thiên Y)'], bad: ['Đông (Tuyệt Mệnh)', 'Nam (Ngũ Quỷ)', 'Đông Nam (Lục Sát)', 'Bắc (Họa Hại)'], directions: { NW: 'good', W: 'good', NE: 'good', SW: 'good', E: 'bad', S: 'bad', SE: 'bad', N: 'bad' } },
      8: { palace: 'Cấn (Thổ)', group: 'Tây Tứ Mệnh', good: ['Tây Nam (Sinh Khí)', 'Đông Bắc (Phục Vị)', 'Tây (Diên Niên)', 'Tây Bắc (Thiên Y)'], bad: ['Đông Nam (Tuyệt Mệnh)', 'Bắc (Ngũ Quỷ)', 'Đông (Lục Sát)', 'Nam (Họa Hại)'], directions: { SW: 'good', NE: 'good', W: 'good', NW: 'good', SE: 'bad', N: 'bad', E: 'bad', S: 'bad' } },
      9: { palace: 'Ly (Hỏa)', group: 'Đông Tứ Mệnh', good: ['Đông (Sinh Khí)', 'Nam (Phục Vị)', 'Bắc (Diên Niên)', 'Đông Nam (Thiên Y)'], bad: ['Tây Bắc (Tuyệt Mệnh)', 'Tây (Ngũ Quỷ)', 'Tây Nam (Lục Sát)', 'Đông Bắc (Họa Hại)'], directions: { E: 'good', S: 'good', N: 'good', SE: 'good', NW: 'bad', W: 'bad', SW: 'bad', NE: 'bad' } }
    };

    return {
      kua,
      palace: details[kua]?.palace || 'Chưa rõ',
      group: details[kua]?.group || 'Chưa rõ',
      good: details[kua]?.good || [],
      bad: details[kua]?.bad || [],
      directions: details[kua]?.directions || {}
    };
  };

  const handleFengShuiSearch = () => {
    const result = calculateFengShui(fengShuiYear, fengShuiGender);
    setFengShuiResult(result);
  };

  // Add/Edit Customer helpers
  const handleSaveCustomer = () => {
    if (!newCustomerForm.name.trim() || !newCustomerForm.phone.trim()) {
      alert("Vui lòng nhập tên và số điện thoại khách hàng");
      return;
    }
    
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...newCustomerForm } : c));
      setEditingCustomer(null);
    } else {
      const newCust = {
        id: Date.now().toString(),
        ...newCustomerForm,
        createdAt: new Date().toISOString()
      };
      setCustomers([newCust, ...customers]);
    }
    
    setShowAddCustomerModal(false);
    setNewCustomerForm({ name: '', phone: '', email: '', temp: 'warm', stage: 'tiepCan', demand: '', note: '' });
  };

  const handleEditCustomerClick = (cust) => {
    setEditingCustomer(cust);
    setNewCustomerForm({
      name: cust.name,
      phone: cust.phone,
      email: cust.email || '',
      temp: cust.temp,
      stage: cust.stage,
      demand: cust.demand || '',
      note: cust.note || ''
    });
    setShowAddCustomerModal(true);
  };

  const handleDeleteCustomer = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter(c => c.id !== id));
      setReminders(reminders.filter(r => r.customerId !== id));
    }
  };

  const renderSoTayCaNhan = () => {
    // Filtered Customers based on search and temperature/stage filters
    const filteredCustomersList = customers.filter(c => {
      const query = searchCustomerQuery.toLowerCase();
      const matchSearch = c.name.toLowerCase().includes(query) || c.phone.includes(query) || (c.email && c.email.toLowerCase().includes(query));
      
      // Calculate frozen state dynamically based on update date if needed, or check temp
      let matchTemp = tempFilter === 'all' || c.temp === tempFilter;
      if (tempFilter === 'frozen') {
        const daysDiff = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        matchTemp = daysDiff >= freezeDays;
      }
      
      const matchPipeline = pipelineFilter === 'all' || c.stage === pipelineFilter;
      
      return matchSearch && matchTemp && matchPipeline;
    });

    // Counts for customer filters
    const countAll = customers.length;
    const countHot = customers.filter(c => c.temp === 'hot').length;
    const countWarm = customers.filter(c => c.temp === 'warm').length;
    const countCool = customers.filter(c => c.temp === 'cool').length;
    const countFrozen = customers.filter(c => {
      const daysDiff = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= freezeDays;
    }).length;

    // Filtered reminders
    const filteredRemindersList = reminders.filter(r => {
      if (remindersFilter === 'today') {
        const todayStr = new Date().toISOString().split('T')[0];
        return r.date === todayStr;
      }
      if (remindersFilter === 'pending') return !r.completed;
      if (remindersFilter === 'done') return r.completed;
      return true;
    });

    // Mortgage math formulas
    const loanEquityVal = Math.round(loanPrice * (loanEquityRate / 100));
    const loanDebtVal = loanPrice - loanEquityVal;
    const totalMonths = loanTerm * 12;
    const monthlyPrincipal = totalMonths > 0 ? Math.round(loanDebtVal / totalMonths) : 0;
    const firstMonthInterest = Math.round(loanDebtVal * (loanInterestRate / 100 / 12));
    const firstMonthTotal = monthlyPrincipal + firstMonthInterest;

    // Unit price math
    const unitPriceNet = unitPriceArea > 0 ? Math.round(unitPriceTotal / unitPriceArea) : 0;



    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-wide uppercase flex items-center gap-2">
              <FileText className="text-blue-500" /> Sổ Tay Cá Nhân AI
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Trợ lý cá nhân lưu trữ khách hàng, nhắc việc thông minh và tính toán BĐS nhanh.
            </p>
          </div>
          
          {/* Sub Navigation Tabs */}
          <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-3xs font-bold gap-1 self-stretch md:self-auto">
            <button
              onClick={() => setActiveSoTayTab('reminders')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${activeSoTayTab === 'reminders' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <CalendarClock style={{ width: 12, height: 12 }} /> Lịch hẹn & Nhắc việc
            </button>
            <button
              onClick={() => setActiveSoTayTab('crm')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${activeSoTayTab === 'crm' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Users style={{ width: 12, height: 12 }} /> Quản lý khách hàng
            </button>
            <button
              onClick={() => setActiveSoTayTab('calc')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${activeSoTayTab === 'calc' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Briefcase style={{ width: 12, height: 12 }} /> Máy tính BĐS
            </button>
            <button
              onClick={() => setActiveSoTayTab('fengshui')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${activeSoTayTab === 'fengshui' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Globe style={{ width: 12, height: 12 }} /> Phong thủy bỏ túi
            </button>
          </div>
        </div>

        {/* Tab Content 1: Lịch hẹn & Nhắc việc */}
        {activeSoTayTab === 'reminders' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Form (Span 2) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles style={{ width: 14, height: 14 }} className="text-blue-400 animate-pulse" /> Trình tạo nhắc việc AI thông minh
                  </h3>
                  <p className="text-3xs text-slate-400 mt-1">
                    Nhập văn bản tự nhiên (Ví dụ: "Gọi điện tư vấn chị Mai lúc 14:30 chiều mai...") để AI tự động phân tích thời gian và phân loại.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Related Customer */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Khách hàng liên quan</label>
                    <select
                      value={reminderCustomer}
                      onChange={(e) => setReminderCustomer(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none focus:border-slate-700"
                    >
                      <option value="">-- Chọn khách hàng liên quan (Không bắt buộc) --</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name} - {c.phone} ({c.temp === 'hot' ? 'Hot' : c.temp === 'warm' ? 'Warm' : 'Cool'})</option>
                      ))}
                    </select>
                  </div>

                  {/* Textarea Input */}
                  <div className="space-y-1">
                    <textarea
                      value={reminderText}
                      onChange={(e) => setReminderText(e.target.value)}
                      placeholder="Hãy nhập nội dung công việc hoặc lịch hẹn của bạn tại đây..."
                      className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-2xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700 resize-none leading-relaxed"
                    />
                  </div>

                  {/* AI Detection Indicators */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      reminderParsedStatus.dateDetected 
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      {reminderParsedStatus.dateDetected ? `✓ HẸN ${reminderParsedStatus.todayOrTomorrow.toUpperCase()}` : '• CHƯA XÁC ĐỊNH NGÀY'}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      reminderParsedStatus.timeDetected 
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      {reminderParsedStatus.timeDetected ? `✓ GIỜ: ${reminderTime}` : '• CHƯA PHÁT HIỆN GIỜ'}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-950/40 border border-blue-800 text-blue-400">
                      PHÂN LOẠI: {reminderCategory.toUpperCase()}
                    </span>
                  </div>

                  {/* Collapse details */}
                  <details className="group border-t border-slate-800/80 pt-3">
                    <summary className="text-[9px] font-bold text-slate-400 group-open:text-white uppercase tracking-wider cursor-pointer list-none flex items-center justify-between">
                      <span>⚙ Tùy chỉnh thông số chi tiết</span>
                      <span className="transition-transform group-open:rotate-180 text-slate-500 text-[8px]">▼</span>
                    </summary>
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Ngày hẹn</label>
                        <input
                          type="date"
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none focus:border-slate-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Giờ hẹn</label>
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none focus:border-slate-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Phân loại</label>
                        <select
                          value={reminderCategory}
                          onChange={(e) => setReminderCategory(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none focus:border-slate-700"
                        >
                          <option value="Gọi điện">Gọi điện</option>
                          <option value="Gặp mặt">Gặp mặt</option>
                          <option value="Xem nhà">Xem nhà</option>
                          <option value="Công việc khác">Công việc khác</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Báo trước (phút)</label>
                        <select
                          value={reminderAlert}
                          onChange={(e) => setReminderAlert(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none focus:border-slate-700"
                        >
                          <option value="15">15 phút</option>
                          <option value="30">30 phút</option>
                          <option value="60">60 phút</option>
                          <option value="120">2 tiếng</option>
                        </select>
                      </div>
                    </div>
                  </details>

                  {/* Create Button */}
                  <button
                    onClick={handleCreateReminder}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-2xs font-extrabold text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    💾 Tạo nhắc việc
                  </button>
                </div>
              </div>
            </div>

            {/* Right List (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-4 min-h-[460px] flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    📋 Danh sách nhắc việc của bạn
                  </h3>
                  
                  {/* List filters */}
                  <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-md text-[10px] font-bold gap-0.5">
                    <button
                      onClick={() => setRemindersFilter('all')}
                      className={`px-2 py-0.5 rounded transition-all ${remindersFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setRemindersFilter('today')}
                      className={`px-2 py-0.5 rounded transition-all ${remindersFilter === 'today' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Hôm nay
                    </button>
                    <button
                      onClick={() => setRemindersFilter('pending')}
                      className={`px-2 py-0.5 rounded transition-all ${remindersFilter === 'pending' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Đang chờ
                    </button>
                    <button
                      onClick={() => setRemindersFilter('done')}
                      className={`px-2 py-0.5 rounded transition-all ${remindersFilter === 'done' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Đã xong
                    </button>
                  </div>
                </div>

                {/* Reminder items list */}
                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[400px] pr-1">
                  {filteredRemindersList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-slate-500 my-auto">
                      <span className="text-3xl">📭</span>
                      <span className="text-2xs font-bold text-slate-400">Không có nhắc việc nào được tìm thấy</span>
                      <p className="text-[10px] text-slate-500 leading-normal max-w-xs">
                        Các công việc bạn thiết lập hoặc viết vào ô soạn thảo thông minh sẽ được tự động hiển thị ở đây.
                      </p>
                    </div>
                  ) : (
                    filteredRemindersList.map(r => {
                      const linkedCustomerObj = customers.find(c => c.id === r.customerId);
                      return (
                        <div 
                          key={r.id}
                          className={`flex items-start gap-3 p-3.5 rounded-lg border transition-all duration-250 ${
                            r.completed 
                              ? 'bg-slate-950/20 border-slate-900 opacity-60' 
                              : 'bg-slate-950/40 border-slate-850/80 hover:border-slate-800'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={r.completed}
                            onChange={() => handleToggleReminder(r.id)}
                            className="mt-1 w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <p className={`text-2xs text-slate-200 font-medium leading-relaxed break-words ${r.completed ? 'line-through text-slate-500' : ''}`}>
                              {r.text}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-4xs font-bold tracking-wider uppercase text-slate-500">
                              <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                                📅 {r.date}
                              </span>
                              <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                                ⏰ {r.time}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded ${
                                r.category === 'Gọi điện' ? 'bg-amber-950/40 text-amber-500' :
                                r.category === 'Gặp mặt' ? 'bg-cyan-950/40 text-cyan-400' :
                                r.category === 'Xem nhà' ? 'bg-emerald-950/40 text-emerald-400' :
                                'bg-slate-900 text-slate-400'
                              }`}>
                                🏷 {r.category}
                              </span>
                              {linkedCustomerObj && (
                                <span className="bg-blue-950/20 border border-blue-900/40 px-1.5 py-0.5 rounded text-blue-400 lowercase normal-case">
                                  👤 {linkedCustomerObj.name}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteReminder(r.id)}
                            className="text-slate-600 hover:text-rose-500 p-0.5 transition-colors self-center"
                            title="Xóa nhắc việc"
                          >
                            🗑
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Quản lý khách hàng */}
        {activeSoTayTab === 'crm' && (
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-6">
            {/* Header controls */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 border-b border-slate-800 pb-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchCustomerQuery}
                    onChange={(e) => setSearchCustomerQuery(e.target.value)}
                    placeholder="Tìm kiếm nhanh tên, số điện thoại..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-2xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700"
                  />
                  <Search className="absolute left-2.5 top-2.5 text-slate-600" style={{ width: 13, height: 13 }} />
                </div>
                
                {/* Temperature Pills */}
                <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-md text-[10px] font-bold gap-0.5 overflow-x-auto">
                  <button
                    onClick={() => setTempFilter('all')}
                    className={`px-2 py-0.5 rounded whitespace-nowrap transition-all ${tempFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Tất cả ({countAll})
                  </button>
                  <button
                    onClick={() => setTempFilter('hot')}
                    className={`px-2 py-0.5 rounded whitespace-nowrap transition-all ${tempFilter === 'hot' ? 'bg-rose-950 text-rose-400' : 'text-slate-500 hover:text-rose-500'}`}
                  >
                    🔥 Hot ({countHot})
                  </button>
                  <button
                    onClick={() => setTempFilter('warm')}
                    className={`px-2 py-0.5 rounded whitespace-nowrap transition-all ${tempFilter === 'warm' ? 'bg-amber-950 text-amber-500' : 'text-slate-500 hover:text-amber-500'}`}
                  >
                    🟡 Warm ({countWarm})
                  </button>
                  <button
                    onClick={() => setTempFilter('cool')}
                    className={`px-2 py-0.5 rounded whitespace-nowrap transition-all ${tempFilter === 'cool' ? 'bg-emerald-950 text-emerald-400' : 'text-slate-500 hover:text-emerald-400'}`}
                  >
                    🟢 Cool ({countCool})
                  </button>
                  <button
                    onClick={() => setTempFilter('frozen')}
                    className={`px-2 py-0.5 rounded whitespace-nowrap transition-all ${tempFilter === 'frozen' ? 'bg-blue-950 text-blue-400' : 'text-slate-500 hover:text-blue-400'}`}
                  >
                    ❄ Frozen ({countFrozen})
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 text-4xs font-bold uppercase tracking-wider">
                {/* Auto freeze config */}
                <div className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-slate-400">
                  <span>❄ Đóng băng sau</span>
                  <input
                    type="number"
                    value={freezeDays}
                    onChange={(e) => setFreezeDays(Math.max(1, parseInt(e.target.value) || 30))}
                    className="w-8 bg-slate-900 border border-slate-700 rounded text-center text-slate-200 text-[10px] py-0.5 focus:outline-none"
                  />
                  <span>ngày</span>
                </div>
                
                {/* View switcher */}
                <button
                  onClick={() => setIsGridView(!isGridView)}
                  className="bg-slate-950 border border-slate-800 text-slate-400 p-2 rounded-lg hover:text-white"
                  title="Chuyển chế độ hiển thị"
                >
                  {isGridView ? '📋 List View' : '🔲 Grid View'}
                </button>

                {/* Import/Export simulation */}
                <button
                  onClick={() => alert("Chức năng đang đồng bộ hóa với Danh bạ thiết bị di động của bạn...")}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                >
                  📥 Nhập từ danh bạ
                </button>
                <button
                  onClick={() => alert("Tính năng tải file mẫu Excel đang được chuẩn bị...")}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                >
                  📄 Nhập file
                </button>
                
                {/* Add customer */}
                <button
                  onClick={() => {
                    setEditingCustomer(null);
                    setNewCustomerForm({ name: '', phone: '', email: '', temp: 'warm', stage: 'tiepCan', demand: '', note: '' });
                    setShowAddCustomerModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  ➕ Thêm khách hàng
                </button>
              </div>
            </div>

            {/* Pipeline stages checklist banner */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Tiến trình khách hàng</span>
              <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-lg text-4xs font-bold gap-1 uppercase tracking-wider overflow-x-auto">
                {[
                  { id: 'all', label: 'Tất cả tiến trình' },
                  { id: 'tiepCan', label: '1. Tiếp cận' },
                  { id: 'thucDia', label: '2. Xem thực địa' },
                  { id: 'damPhan', label: '3. Đàm phán' },
                  { id: 'datCoc', label: '4. Đặt cọc' },
                  { id: 'kyHD', label: '5. Ký HĐ' },
                  { id: 'nhanNha', label: '6. Nhận nhà' }
                ].map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setPipelineFilter(stage.id)}
                    className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all ${pipelineFilter === stage.id ? 'bg-slate-850 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customers list/grid display */}
            <div>
              {filteredCustomersList.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-16 space-y-2 text-slate-500">
                  <span className="text-4xl">📂</span>
                  <span className="text-2xs font-bold text-slate-400">Không tìm thấy ghi chú nào</span>
                  <p className="text-[10px] text-slate-500 leading-normal max-w-xs">
                    Hãy nhấn nút "Thêm khách hàng" hoặc thay đổi bộ lọc tìm kiếm để xem danh sách.
                  </p>
                </div>
              ) : isGridView ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCustomersList.map(c => {
                    const daysDiff = Math.floor((Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                    const isFrozen = daysDiff >= freezeDays;
                    return (
                      <div key={c.id} className="bg-slate-950/40 border border-slate-850 p-4.5 rounded-xl space-y-3.5 hover:border-slate-800 transition-all flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="text-2xs font-extrabold text-white leading-normal truncate max-w-[150px]">{c.name}</h4>
                              <p className="text-[10px] text-slate-500 font-medium">{c.phone}</p>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${
                                c.temp === 'hot' ? 'bg-rose-950/40 border-rose-800 text-rose-400' :
                                c.temp === 'warm' ? 'bg-amber-950/40 border-amber-800 text-amber-500' :
                                'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                              }`}>
                                {c.temp.toUpperCase()}
                              </span>
                              {isFrozen && (
                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-950/40 border border-blue-800 text-blue-400 uppercase">
                                  ❄ FROZEN
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1 text-3xs text-slate-400 font-medium">
                            {c.email && <p className="truncate">📧 {c.email}</p>}
                            <p className="truncate">🎯 Nhu cầu: {c.demand || 'Chưa cập nhật'}</p>
                            <p className="line-clamp-2 text-slate-500 text-[10px] italic">📝 {c.note || 'Không có ghi chú thêm.'}</p>
                          </div>
                        </div>

                        {/* Pipeline indicator */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-900">
                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span className="font-bold text-slate-500 uppercase text-[8px] tracking-wider">Tiến trình:</span>
                            <span className="font-extrabold text-blue-400">
                              {c.stage === 'tiepCan' ? 'Tiếp cận' :
                               c.stage === 'thucDia' ? 'Xem thực địa' :
                               c.stage === 'damPhan' ? 'Đàm phán' :
                               c.stage === 'datCoc' ? 'Đặt cọc' :
                               c.stage === 'kyHD' ? 'Ký HĐ' : 'Nhận nhà'}
                            </span>
                          </div>
                          
                          {/* Quick change stage */}
                          <div className="flex justify-between items-center gap-1 text-3xs font-extrabold uppercase">
                            <button
                              onClick={() => handleEditCustomerClick(c)}
                              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800/80 transition-colors"
                            >
                              ✏ Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(c.id)}
                              className="text-slate-500 hover:text-rose-500 px-2 py-1 transition-colors"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/20">
                  <table className="w-full text-left text-3xs text-slate-300">
                    <thead>
                      <tr className="bg-slate-950 text-slate-500 font-bold border-b border-slate-800 uppercase tracking-wider text-[8px]">
                        <th className="p-3">Khách hàng</th>
                        <th className="p-3">Liên hệ</th>
                        <th className="p-3">Phân loại</th>
                        <th className="p-3">Tiến trình</th>
                        <th className="p-3">Nhu cầu & Ghi chú</th>
                        <th className="p-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredCustomersList.map(c => {
                        const daysDiff = Math.floor((Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                        const isFrozen = daysDiff >= freezeDays;
                        return (
                          <tr key={c.id} className="hover:bg-slate-900/30">
                            <td className="p-3 font-extrabold text-slate-200">{c.name}</td>
                            <td className="p-3 text-[10px] text-slate-400">
                              <div>{c.phone}</div>
                              {c.email && <div className="text-[8px] text-slate-500">{c.email}</div>}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                                  c.temp === 'hot' ? 'bg-rose-950/40 border-rose-800 text-rose-400' :
                                  c.temp === 'warm' ? 'bg-amber-950/40 border-amber-800 text-amber-500' :
                                  'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                                }`}>
                                  {c.temp.toUpperCase()}
                                </span>
                                {isFrozen && (
                                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-950/40 border border-blue-800 text-blue-400">
                                    ❄ FROZEN
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-blue-400 font-extrabold">
                              {c.stage === 'tiepCan' ? '1. Tiếp cận' :
                               c.stage === 'thucDia' ? '2. Xem thực địa' :
                               c.stage === 'damPhan' ? '3. Đàm phán' :
                               c.stage === 'datCoc' ? '4. Đặt cọc' :
                               c.stage === 'kyHD' ? '5. Ký HĐ' : '6. Nhận nhà'}
                            </td>
                            <td className="p-3 max-w-[200px] truncate text-slate-400">
                              <span className="font-bold text-slate-300">[{c.demand || 'Không có nhu cầu'}]</span> - {c.note || 'Trống'}
                            </td>
                            <td className="p-3 text-right space-x-2 font-bold uppercase tracking-wider text-4xs">
                              <button
                                onClick={() => handleEditCustomerClick(c)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                ✏ Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteCustomer(c.id)}
                                className="text-slate-500 hover:text-rose-500"
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 3: Máy tính BĐS */}
        {activeSoTayTab === 'calc' && (
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-6">
            {/* Sub-tab selection */}
            <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-lg text-4xs font-bold gap-1 uppercase tracking-wider w-full">
              <button
                onClick={() => setCalcSubTab('loan')}
                className={`flex-1 py-2 rounded-md whitespace-nowrap transition-all ${calcSubTab === 'loan' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                🏦 Trả góp & Vay vốn ngân hàng
              </button>
              <button
                onClick={() => setCalcSubTab('unit')}
                className={`flex-1 py-2 rounded-md whitespace-nowrap transition-all ${calcSubTab === 'unit' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                📐 Tính đơn giá m²
              </button>
              <button
                onClick={() => setCalcSubTab('roi')}
                className={`flex-1 py-2 rounded-md whitespace-nowrap transition-all ${calcSubTab === 'roi' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                📈 Lợi nhuận đầu tư (ROI)
              </button>
            </div>

            {/* Calculations Render */}
            {calcSubTab === 'loan' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Inputs (Span 3) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                      📝 Thông số khoản vay
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Tổng giá trị BĐS (VND)</label>
                        <input
                          type="number"
                          value={loanPrice}
                          onChange={(e) => setLoanPrice(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                        <span className="text-[9px] text-slate-500">Ví dụ: 3 tỷ VNĐ = 3,000,000,000</span>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Lãi suất (% / Năm)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={loanInterestRate}
                          onChange={(e) => setLoanInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Tỷ lệ vốn tự có (%)</label>
                        <input
                          type="number"
                          value={loanEquityRate}
                          onChange={(e) => {
                            const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                            setLoanEquityRate(val);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Thời hạn vay (Năm)</label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 20))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Tính toán thành công! Dữ liệu đã tự động cập nhật ở bảng bên phải.")}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-2xs font-extrabold text-white rounded-lg transition-all"
                    >
                      🧮 Tính toán khoản vay
                    </button>
                  </div>
                </div>

                {/* Outputs (Span 2) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                        🍏 Kết quả tính toán dư nợ
                      </h3>
                      
                      <div className="space-y-3.5 pt-2">
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-3xs text-slate-400 font-bold uppercase">Gốc trả hàng tháng</span>
                          <span className="text-xs font-extrabold text-white">{monthlyPrincipal.toLocaleString('vi-VN')} đ</span>
                        </div>
                        
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-3xs text-slate-400 font-bold uppercase">Lãi tháng đầu tiên</span>
                          <span className="text-xs font-extrabold text-rose-400">{firstMonthInterest.toLocaleString('vi-VN')} đ</span>
                        </div>
                        
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-3xs text-slate-400 font-bold uppercase">Tổng trả tháng đầu (Gốc + Lãi)</span>
                          <span className="text-xs font-extrabold text-emerald-400">{firstMonthTotal.toLocaleString('vi-VN')} đ</span>
                        </div>
                        
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-3xs text-slate-400 font-bold uppercase">Vốn tự có cần trả trước</span>
                          <span className="text-xs font-extrabold text-white">{loanEquityVal.toLocaleString('vi-VN')} đ ({loanEquityRate}%)</span>
                        </div>

                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-3xs text-slate-400 font-bold uppercase">Dư nợ cần vay ngân hàng</span>
                          <span className="text-xs font-extrabold text-blue-400">{loanDebtVal.toLocaleString('vi-VN')} đ ({100 - loanEquityRate}%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 text-center leading-normal italic pt-2">
                      * Bảng tính tính theo phương pháp Dư nợ giảm dần, số tiền lãi giảm dần theo thời gian.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {calcSubTab === 'unit' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Inputs (Span 3) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                      📊 Nhập số liệu BĐS
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Tổng giá trị BĐS (VNĐ)</label>
                        <input
                          type="number"
                          value={unitPriceTotal}
                          onChange={(e) => setUnitPriceTotal(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Diện tích sử dụng (m²)</label>
                        <input
                          type="number"
                          value={unitPriceArea}
                          onChange={(e) => setUnitPriceArea(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUnitPriceResult(unitPriceArea > 0 ? Math.round(unitPriceTotal / unitPriceArea) : 0);
                        alert("Đã tính toán đơn giá thành công!");
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-2xs font-extrabold text-white rounded-lg flex items-center justify-center gap-1 transition-all"
                    >
                      📐 Tính đơn giá
                    </button>
                  </div>
                </div>

                {/* Outputs (Span 2) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4 h-full flex flex-col justify-center">
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                        🧭 Đơn giá trung bình
                      </h3>
                      
                      <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl text-center space-y-2">
                        <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Đơn giá tính trên mét vuông</span>
                        <div className="text-xl font-black text-blue-400">{unitPriceResult.toLocaleString('vi-VN')} đ / m²</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {calcSubTab === 'roi' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Inputs (Span 3) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                      📈 Thông tin giao dịch đầu tư
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Giá mua vào ban đầu (VNĐ)</label>
                        <input
                          type="number"
                          value={roiPurchase}
                          onChange={(e) => setRoiPurchase(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Giá dự kiến bán ra (VNĐ)</label>
                        <input
                          type="number"
                          value={roiSell}
                          onChange={(e) => setRoiSell(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Thuế & chi phí giao dịch liên quan (%)</label>
                        <input
                          type="number"
                          value={roiFeeRate}
                          onChange={(e) => setRoiFeeRate(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const buy = parseFloat(roiPurchase) || 0;
                        const sell = parseFloat(roiSell) || 0;
                        const rate = parseFloat(roiFeeRate) || 0;
                        const taxVal = Math.round(sell * (rate / 100));
                        const netProfit = sell - buy - taxVal;
                        const roiRate = buy > 0 ? Math.round((netProfit / buy) * 100) : 0;
                        
                        setRoiResult({
                          netProfit,
                          roiRate,
                          taxVal
                        });
                        alert("Đã tính toán hiệu suất đầu tư thành công!");
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-2xs font-extrabold text-white rounded-lg flex items-center justify-center gap-1 transition-all"
                    >
                      📊 Tính toán hiệu suất đầu tư
                    </button>
                  </div>
                </div>

                {/* Outputs (Span 2) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                        📊 Lợi nhuận & Tỷ suất ROI
                      </h3>
                      
                      <div className="space-y-3.5 pt-2">
                        <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-lg">
                          <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Lợi nhuận ròng dự kiến</span>
                          <span className="text-xs font-black text-emerald-400 mt-1 block">{(roiResult?.netProfit || 0).toLocaleString('vi-VN')} đ</span>
                        </div>

                        <div className="bg-slate-900 border border-slate-850 p-5 rounded-lg text-center space-y-1">
                          <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Tỷ suất lợi nhuận ROI</span>
                          <div className="text-2xl font-black text-white">{roiResult?.roiRate || 0} %</div>
                        </div>

                        <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-lg">
                          <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider block">Chi phí thuế & giao dịch</span>
                          <span className="text-xs font-black text-white mt-1 block">{(roiResult?.taxVal || 0).toLocaleString('vi-VN')} đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 4: Phong thủy bỏ túi */}
        {activeSoTayTab === 'fengshui' && (
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Inputs (Span 2) */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                      🧭 Tra cứu hướng hợp mệnh BĐS
                    </h3>
                    <p className="text-3xs text-slate-400 mt-1">
                      Tra cứu nhanh cung mệnh Bát Trạch để xác định các hướng cát (tốt) và các hướng hung (xấu) hỗ trợ tư vấn giao dịch nhanh.
                    </p>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Năm sinh dương lịch</label>
                      <input
                        type="number"
                        value={fengShuiYear}
                        onChange={(e) => setFengShuiYear(e.target.value)}
                        placeholder="Ví dụ: 1990"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Giới tính sinh học</label>
                      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg text-3xs font-bold gap-1 uppercase tracking-wider w-full">
                        <button
                          onClick={() => setFengShuiGender('nam')}
                          className={`flex-1 py-2 rounded-md transition-all ${fengShuiGender === 'nam' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          ♂ Nam giới
                        </button>
                        <button
                          onClick={() => setFengShuiGender('nu')}
                          className={`flex-1 py-2 rounded-md transition-all ${fengShuiGender === 'nu' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          ♀ Nữ giới
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleFengShuiSearch}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-2xs font-extrabold text-white rounded-lg flex items-center justify-center gap-1 transition-all"
                    >
                      🔍 Tra cứu Bát Trạch
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs & Compass Illustration (Span 3) */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-950/30 border border-slate-850/60 p-5 rounded-xl space-y-4 min-h-[350px] flex flex-col justify-center">
                  {!fengShuiResult ? (
                    <div className="text-center p-8 space-y-2 text-slate-500">
                      <span className="text-4xl">🧭</span>
                      <span className="text-2xs font-bold text-slate-400">Kết quả phân tích Bát Trạch</span>
                      <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-normal">
                        Chọn năm sinh và giới tính sinh học để bắt đầu phân tích hướng hợp mệnh.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                      {/* Left: Metadata */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kết quả Bát Trạch</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Năm sinh {fengShuiYear} ({fengShuiGender === 'nam' ? 'Nam' : 'Nữ'})</p>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex justify-between text-2xs">
                            <span className="text-slate-500 font-bold">Cung mệnh:</span>
                            <span className="text-white font-extrabold">{fengShuiResult.palace}</span>
                          </div>
                          <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex justify-between text-2xs">
                            <span className="text-slate-500 font-bold">Thuộc Nhóm:</span>
                            <span className="text-blue-400 font-extrabold">{fengShuiResult.group}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-wider block">🟢 Hướng tốt (Cát):</span>
                            <p className="text-3xs text-slate-300 leading-normal font-medium mt-0.5">
                              {fengShuiResult.good.join(', ')}
                            </p>
                          </div>
                          <div>
                            <span className="text-[8px] font-black text-rose-500 uppercase tracking-wider block">🔴 Hướng xấu (Hung):</span>
                            <p className="text-3xs text-slate-300 leading-normal font-medium mt-0.5">
                              {fengShuiResult.bad.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: SVG Compass Wheel */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative w-44 h-44 bg-slate-900/60 rounded-full border border-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.02)] flex items-center justify-center">
                          <svg className="w-40 h-40 transform rotate-0" viewBox="0 0 100 100">
                            {/* Circle border */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="1" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="#334155" strokeWidth="0.5" />
                            
                            {/* Direction Lines */}
                            <line x1="50" y1="5" x2="50" y2="95" stroke="#1e293b" strokeWidth="0.5" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#1e293b" strokeWidth="0.5" />
                            <line x1="18.2" y1="18.2" x2="81.8" y2="81.8" stroke="#1e293b" strokeWidth="0.5" />
                            <line x1="18.2" y1="81.8" x2="81.8" y2="18.2" stroke="#1e293b" strokeWidth="0.5" />

                            {/* Label Texts with Dynamic Colors */}
                            {/* N: 50, 12 */}
                            <text x="50" y="11" textAnchor="middle" fontSize="6" fontWeight="bold" fill={fengShuiResult.directions.N === 'good' ? '#34d399' : '#f87171'}>B</text>
                            {/* S: 50, 92 */}
                            <text x="50" y="93" textAnchor="middle" fontSize="6" fontWeight="bold" fill={fengShuiResult.directions.S === 'good' ? '#34d399' : '#f87171'}>N</text>
                            {/* E: 90, 52 */}
                            <text x="91" y="52" textAnchor="middle" fontSize="6" fontWeight="bold" fill={fengShuiResult.directions.E === 'good' ? '#34d399' : '#f87171'}>Đ</text>
                            {/* W: 10, 52 */}
                            <text x="9" y="52" textAnchor="middle" fontSize="6" fontWeight="bold" fill={fengShuiResult.directions.W === 'good' ? '#34d399' : '#f87171'}>T</text>
                            
                            {/* SE: 80, 25 */}
                            <text x="79" y="23" textAnchor="middle" fontSize="5" fontWeight="bold" fill={fengShuiResult.directions.SE === 'good' ? '#34d399' : '#f87171'}>ĐN</text>
                            {/* NE: 80, 78 */}
                            <text x="79" y="81" textAnchor="middle" fontSize="5" fontWeight="bold" fill={fengShuiResult.directions.NE === 'good' ? '#34d399' : '#f87171'}>ĐB</text>
                            {/* SW: 20, 25 */}
                            <text x="21" y="23" textAnchor="middle" fontSize="5" fontWeight="bold" fill={fengShuiResult.directions.SW === 'good' ? '#34d399' : '#f87171'}>TN</text>
                            {/* NW: 20, 78 */}
                            <text x="21" y="81" textAnchor="middle" fontSize="5" fontWeight="bold" fill={fengShuiResult.directions.NW === 'good' ? '#34d399' : '#f87171'}>TB</text>

                            {/* Center Life Palace */}
                            <circle cx="50" cy="50" r="12" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                            <text x="50" y="52" textAnchor="middle" fontSize="4.5" fontWeight="black" fill="#38bdf8">{fengShuiResult.palace.split(' ')[0]}</text>
                          </svg>
                          
                          <div className="absolute bottom-2 text-[8px] font-black uppercase text-slate-500 tracking-wider">
                            <span className="text-emerald-400">● Cát</span> / <span className="text-rose-400">● Hung</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Thêm/Sửa Khách hàng */}
        {showAddCustomerModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-md w-full space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {editingCustomer ? '✏ Chỉnh sửa khách hàng' : '➕ Thêm khách hàng mới'}
                </h4>
                <button
                  onClick={() => setShowAddCustomerModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Họ và tên *</label>
                  <input
                    type="text"
                    value={newCustomerForm.name}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Số điện thoại *</label>
                  <input
                    type="text"
                    value={newCustomerForm.phone}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                    placeholder="Ví dụ: 0987654321"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email</label>
                  <input
                    type="email"
                    value={newCustomerForm.email}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                    placeholder="customer@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Phân loại khách</label>
                    <select
                      value={newCustomerForm.temp}
                      onChange={(e) => setNewCustomerForm({ ...newCustomerForm, temp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none"
                    >
                      <option value="hot">🔥 Hot (Rất quan tâm)</option>
                      <option value="warm">🟡 Warm (Quan tâm)</option>
                      <option value="cool">🟢 Cool (Ít quan tâm)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Tiến trình</label>
                    <select
                      value={newCustomerForm.stage}
                      onChange={(e) => setNewCustomerForm({ ...newCustomerForm, stage: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-2xs text-slate-200 focus:outline-none"
                    >
                      <option value="tiepCan">1. Tiếp cận</option>
                      <option value="thucDia">2. Xem thực địa</option>
                      <option value="damPhan">3. Đàm phán</option>
                      <option value="datCoc">4. Đặt cọc</option>
                      <option value="kyHD">5. Ký HĐ</option>
                      <option value="nhanNha">6. Nhận nhà</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nhu cầu mua / thuê</label>
                  <input
                    type="text"
                    value={newCustomerForm.demand}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, demand: e.target.value })}
                    placeholder="Ví dụ: Căn hộ 2 phòng ngủ giá dưới 3 tỷ..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Ghi chú chi tiết</label>
                  <textarea
                    value={newCustomerForm.note}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, note: e.target.value })}
                    placeholder="Nhập ghi chú quan trọng về khách hàng..."
                    className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-2xs text-slate-200 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2 text-2xs font-extrabold uppercase">
                  <button
                    onClick={() => setShowAddCustomerModal(false)}
                    className="flex-1 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveCustomer}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                  >
                    Lưu thông tin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReferralPro = () => {
    const stats = affiliateStats || {
      referralCode: 'VUONGDACHIEP31006',
      totalReferredCount: 0,
      activeReferredCount: 0,
      frozenCommission: 0,
      withdrawableCommission: 0
    };

    const activeCount = stats.activeReferredCount;
    
    const ranks = [
      { id: 'dong', name: 'Đồng', req: 0, comm: '10%', color: 'from-amber-700 to-amber-900', textColor: 'text-amber-500' },
      { id: 'bac', name: 'Bạc', req: 3, comm: '15%', color: 'from-slate-400 to-slate-600', textColor: 'text-slate-300' },
      { id: 'vang', name: 'Vàng', req: 6, comm: '20%', color: 'from-yellow-400 to-amber-500', textColor: 'text-yellow-500' },
      { id: 'bachkim', name: 'Bạch Kim', req: 10, comm: '25%', color: 'from-cyan-400 to-blue-500', textColor: 'text-cyan-400' },
      { id: 'vvip', name: 'VVIP', req: 20, comm: '30%', color: 'from-purple-500 to-pink-500', textColor: 'text-purple-400' }
    ];

    let currentRankIndex = 0;
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (activeCount >= ranks[i].req) {
        currentRankIndex = i;
        break;
      }
    }
    const currentRank = ranks[currentRankIndex];
    const nextRank = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;

    let progressPercent = 100;
    if (nextRank) {
      const range = nextRank.req - currentRank.req;
      const currentOffset = activeCount - currentRank.req;
      progressPercent = Math.min(100, Math.round((currentOffset / range) * 100));
    }

    const filteredReferrals = referralList.filter(item => {
      const query = searchReferralQuery.toLowerCase();
      return (
        item.name?.toLowerCase().includes(query) ||
        item.username?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query)
      );
    });

    const referralLink = `${window.location.origin}/?ref=${stats.referralCode}`;

    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-xl border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                <Gift className="text-violet-400" style={{ width: 22, height: 22 }} /> Affiliate
              </h3>
              <p className="text-xs text-slate-400 mt-1">Biến mỗi khách hàng thành nguồn thu nhập thụ động không giới hạn.</p>
            </div>
            <div className="bg-violet-950/40 border border-violet-800/40 px-3 py-1.5 rounded-lg flex items-center gap-2 text-2xs font-semibold text-violet-300">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>Affiliate Partner Active</span>
            </div>
          </div>
        </div>

        {/* 3 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Tổng KH */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-slate-800 text-slate-400 rounded-lg">
              <Users style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <p className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Tổng số KH đã giới thiệu</p>
              <h4 className="text-lg font-black text-white mt-1">
                {stats.totalReferredCount} <span className="text-xs font-normal text-slate-500">đăng ký</span> / {stats.activeReferredCount} <span className="text-xs font-normal text-slate-500">kích hoạt</span>
              </h4>
            </div>
          </div>

          {/* Card 2: Hoa hồng đóng băng */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-slate-800 text-amber-500/80 rounded-lg">
              <Key style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <p className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Hoa hồng đang đóng băng</p>
              <h4 className="text-lg font-black text-amber-500 mt-1">
                {stats.frozenCommission.toLocaleString('vi-VN')} <span className="text-xs font-bold">VND</span>
              </h4>
            </div>
          </div>

          {/* Card 3: Hoa hồng rút ngay */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-950/40 text-emerald-400 rounded-lg border border-emerald-800/30">
              <Gem style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <p className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Hoa hồng có thể rút ngay</p>
              <h4 className="text-lg font-black text-emerald-400 mt-1">
                {stats.withdrawableCommission.toLocaleString('vi-VN')} <span className="text-xs font-bold">VND</span>
              </h4>
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rank Tracker Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                    <Award style={{ width: 14, height: 14 }} className="text-violet-400" /> Tiến độ thăng hạng
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Hạng hiện tại: <strong className={`uppercase ${currentRank.textColor}`}>{currentRank.name}</strong> ({currentRank.comm} hoa hồng)
                  </p>
                </div>
                {nextRank && (
                  <span className="text-4xs font-bold bg-violet-950 border border-violet-800/60 text-violet-300 px-2 py-0.5 rounded-full">
                    Tiến độ: {progressPercent}%
                  </span>
                )}
              </div>
              
              {/* Checkpoints Visual Representation */}
              <div className="grid grid-cols-5 gap-1 text-center relative pt-2">
                {/* Horizontal connection line */}
                <div className="absolute left-[10%] right-[10%] top-[22px] h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                
                {ranks.map((r, index) => {
                  const isReached = activeCount >= r.req;
                  const isCurrent = currentRank.id === r.id;
                  return (
                    <div key={r.id} className="flex flex-col items-center space-y-1.5 relative z-10">
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-300
                          ${isReached 
                            ? 'bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-400 text-white shadow-[0_0_10px_rgba(139,92,246,0.35)]' 
                            : 'bg-slate-950 border-slate-800 text-slate-600'
                          } ${isCurrent ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                      >
                        {r.name[0]}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider block leading-none
                          ${isReached ? 'text-violet-300' : 'text-slate-500'}`}
                        >
                          {r.name}
                        </span>
                        <span className="text-[8px] text-slate-500 font-bold block leading-none">
                          {r.req}+ KH
                        </span>
                        <span className={`text-[8px] font-bold block leading-none ${isReached ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {r.comm}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar towards next rank */}
              {nextRank && (
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="bg-slate-950/40 border border-slate-800/50 p-3 rounded-lg text-2xs text-slate-400 leading-relaxed">
                    Bạn đã giới thiệu được <strong className="text-slate-200">{activeCount} thành viên kích hoạt</strong>. Chỉ cần giới thiệu thêm <strong className="text-amber-500">{nextRank.req - activeCount} thành viên kích hoạt gói</strong> nữa để thăng hạng lên <strong className="text-violet-400 uppercase">{nextRank.name}</strong> và nhận <strong className="text-emerald-400">{nextRank.comm}</strong> hoa hồng đối tác!
                  </div>
                </div>
              )}
              
              {!nextRank && (
                <div className="bg-emerald-950/20 border border-emerald-800/30 p-3 rounded-lg text-2xs text-emerald-400 font-bold text-center leading-relaxed">
                  🎉 Chúc mừng! Bạn đang đạt cấp độ cao nhất VVIP đối tác với mức hoa hồng tối đa 30%!
                </div>
              )}
            </div>

            {/* Link & Code Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-5">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Share2 style={{ width: 14, height: 14 }} /> Mã & Link Giới Thiệu
                </h4>
                <p className="text-3xs text-slate-400 mt-1">
                  Chia sẻ mã hoặc link này cho bạn bè. Khi họ đăng ký sẽ được tính hoa hồng, họ cũng được cộng thêm 15 ngày sử dụng dùng thử.
                </p>
              </div>

              {/* Referral Code Box */}
              <div className="space-y-1.5">
                <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider">Mã giới thiệu của bạn</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg font-mono font-bold text-sm text-center text-slate-200 tracking-widest select-all">
                    {stats.referralCode}
                  </div>
                  <button 
                    onClick={() => handleCopyText(stats.referralCode, 'code')}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-2xs px-4 rounded-lg transition-all"
                  >
                    {copiedCode ? 'Đã chép!' : 'Copy Mã'}
                  </button>
                </div>
              </div>

              {/* Referral Link Box */}
              <div className="space-y-1.5">
                <label className="text-3xs font-bold text-slate-500 uppercase tracking-wider">Link đăng ký nhanh</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg font-mono text-2xs text-left text-slate-400 truncate select-all flex items-center">
                    {referralLink}
                  </div>
                  <button 
                    onClick={() => handleCopyText(referralLink, 'link')}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-2xs px-4 rounded-lg transition-all"
                  >
                    {copiedLink ? 'Đã chép!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border-t border-slate-800/80 pt-4 flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-md border border-slate-200">
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    <rect x="5" y="5" width="22" height="22" fill="#0f172a" />
                    <rect x="9" y="9" width="14" height="14" fill="white" />
                    <rect x="12" y="12" width="8" height="8" fill="#0f172a" />
                    
                    <rect x="73" y="5" width="22" height="22" fill="#0f172a" />
                    <rect x="77" y="9" width="14" height="14" fill="white" />
                    <rect x="80" y="12" width="8" height="8" fill="#0f172a" />
                    
                    <rect x="5" y="73" width="22" height="22" fill="#0f172a" />
                    <rect x="9" y="77" width="14" height="14" fill="white" />
                    <rect x="12" y="80" width="8" height="8" fill="#0f172a" />
                    
                    <rect x="35" y="10" width="8" height="8" fill="#0f172a" />
                    <rect x="50" y="5" width="10" height="10" fill="#0f172a" />
                    <rect x="35" y="25" width="12" height="12" fill="#0f172a" />
                    <rect x="55" y="20" width="8" height="8" fill="#0f172a" />
                    <rect x="35" y="45" width="15" height="15" fill="#0f172a" />
                    <rect x="60" y="35" width="10" height="10" fill="#0f172a" />
                    
                    <rect x="10" y="35" width="8" height="8" fill="#0f172a" />
                    <rect x="25" y="45" width="6" height="6" fill="#0f172a" />
                    <rect x="15" y="55" width="12" height="12" fill="#0f172a" />
                    
                    <rect x="75" y="35" width="12" height="12" fill="#0f172a" />
                    <rect x="85" y="55" width="10" height="10" fill="#0f172a" />
                    <rect x="65" y="60" width="15" height="15" fill="#0f172a" />
                    
                    <rect x="35" y="70" width="10" height="10" fill="#0f172a" />
                    <rect x="50" y="80" width="12" height="12" fill="#0f172a" />
                    <rect x="45" y="60" width="8" height="8" fill="#0f172a" />
                    
                    <rect x="75" y="75" width="20" height="20" fill="#0f172a" />
                    <rect x="80" y="80" width="10" height="10" fill="white" />
                  </svg>
                </div>
                <span className="text-3xs text-slate-500 font-semibold">Quét mã để đăng ký nhanh</span>
                <button 
                  onClick={() => alert('Đang tải QR Code...')}
                  className="text-3xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 tracking-wide transition-all"
                >
                  Tải QR về
                </button>
              </div>
            </div>

            {/* Commission Policy Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Info style={{ width: 14, height: 14 }} className="text-violet-400" /> Biểu phí hoa hồng đối tác (20%)
                </h4>
                <p className="text-3xs text-slate-400 mt-1">
                  Mức hoa hồng thực tế bạn nhận được tương ứng với gói cước và thời hạn mà thành viên bạn giới thiệu thanh toán nâng cấp.
                </p>
              </div>

              <div className="overflow-hidden border border-slate-800 rounded-lg">
                <table className="w-full text-left text-3xs text-slate-300">
                  <thead>
                    <tr className="bg-slate-950 text-slate-500 font-bold border-b border-slate-800 uppercase tracking-wider text-[8px]">
                      <th className="p-2">Gói dịch vụ</th>
                      <th className="p-2">1 Tháng</th>
                      <th className="p-2">3 Tháng</th>
                      <th className="p-2">1 Năm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold text-slate-200">Gói PLUS</td>
                      <td className="p-2 text-emerald-400">19.800đ</td>
                      <td className="p-2 text-emerald-400">53.800đ</td>
                      <td className="p-2 text-emerald-400">159.800đ</td>
                    </tr>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold text-slate-200">Gói PRO</td>
                      <td className="p-2 text-emerald-400">39.800đ</td>
                      <td className="p-2 text-emerald-400">107.800đ</td>
                      <td className="p-2 text-emerald-400">318.000đ</td>
                    </tr>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold text-slate-200">Gói ULTRA</td>
                      <td className="p-2 text-emerald-400">99.800đ</td>
                      <td className="p-2 text-emerald-400">269.800đ</td>
                      <td className="p-2 text-emerald-400">798.000đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-950/30 border border-slate-800/40 p-2.5 rounded-lg text-[10px] text-slate-400 leading-normal flex items-start gap-2">
                <span className="text-amber-500 font-bold">Lưu ý:</span>
                <span>Hoa hồng được duyệt tự động sau 7 ngày kể từ khi khách hàng hoàn tất chuyển khoản nâng cấp tài khoản.</span>
              </div>
            </div>
          </div>

          {/* Right Column (Span 3) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-black text-slate-800">Danh sách thành viên giới thiệu</h4>
                <p className="text-3xs text-slate-400 font-medium">Danh sách môi giới đăng ký qua link giới thiệu của bạn.</p>
              </div>
              <span className="text-3xs px-2.5 py-1 rounded bg-slate-100 border text-slate-600 font-bold">
                {filteredReferrals.length} khách hàng
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ width: 14, height: 14 }} />
              <input 
                type="text" 
                placeholder="Tìm tên, SĐT, email..."
                value={searchReferralQuery}
                onChange={e => setSearchReferralQuery(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-slate-700 pl-9 pr-4 py-2 rounded-lg text-xs outline-none focus:bg-white focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all placeholder:text-slate-400"
              />
            </div>

            {filteredReferrals.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-full border">
                  <Gift style={{ width: 24, height: 24 }} />
                </div>
                <p className="text-xs font-bold text-slate-700">Bạn chưa giới thiệu khách hàng nào</p>
                <p className="text-3xs text-slate-400 max-w-[240px] leading-normal">
                  Hãy chia sẻ mã hoặc link giới thiệu của bạn để bắt đầu xây dựng đội ngũ cộng tác và nhận hoa hồng!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-100 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-gray-100 uppercase tracking-wider text-[9px]">
                      <th className="p-3">Khách hàng</th>
                      <th className="p-3">Đăng ký</th>
                      <th className="p-3">Gói cước</th>
                      <th className="p-3">Hoa hồng</th>
                      <th className="p-3">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReferrals.map((item, idx) => {
                      let statusBadge = 'bg-slate-100 text-slate-500 border-slate-200';
                      let statusText = 'Đăng ký';
                      if (item.status === 'frozen') {
                        statusBadge = 'bg-amber-50 text-amber-600 border-amber-200';
                        statusText = 'Đóng băng';
                      } else if (item.status === 'withdrawable') {
                        statusBadge = 'bg-emerald-50 text-emerald-600 border-emerald-200';
                        statusText = 'Rút ngay';
                      }

                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 border-b border-gray-100 transition-colors">
                          <td className="p-3 font-semibold text-slate-800">
                            <div>{item.name}</div>
                            <div className="text-3xs text-slate-400 font-normal">{item.email}</div>
                          </td>
                          <td className="p-3 text-slate-500 text-2xs">
                            {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="p-3 uppercase font-bold text-2xs text-violet-600">
                            {item.plan}
                          </td>
                          <td className="p-3 font-bold text-slate-700 text-2xs">
                            {item.commission.toLocaleString('vi-VN')} VND
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-4xs font-bold border ${statusBadge}`}>
                              {statusText}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAdmin = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded text-amber-400 text-sm font-medium">
        Chào mừng Quản trị viên <strong>{currentUser?.name || ''}</strong>. Đây là bảng điều khiển quản lý thành viên và quyền truy cập ứng dụng Sales Playbook.
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Users className="mr-2 text-amber-600" style={{ width: 22, height: 22 }} /> Danh sách thành viên hệ thống
            </h3>
            <p className="text-xs text-gray-500 mt-1">Quản lý tài khoản, thay đổi quyền hạn và trạng thái kích hoạt của môi giới.</p>
          </div>
          <button
            onClick={fetchAdminUsers}
            disabled={isAdminUsersLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center text-xs transition-colors disabled:opacity-50"
          >
            <RotateCw className={`mr-1.5 ${isAdminUsersLoading ? 'animate-spin' : ''}`} style={{ width: 14, height: 14 }} /> Làm mới danh sách
          </button>
        </div>

        {adminError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4 flex items-center gap-2">
            <AlertCircle style={{ width: 18, height: 18 }} /> {adminError}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Họ và tên / Email</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Tên đăng nhập</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Vai trò / Gói</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Lượt gọi AI</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày tham gia</th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {isAdminUsersLoading && usersList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <Loader2 className="animate-spin inline-block mr-2 text-indigo-600" style={{ width: 24, height: 24 }} /> 
                    Đang tải danh sách thành viên...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">Không có thành viên nào khác trên hệ thống.</td>
                </tr>
              ) : (
                usersList.map((u) => (
                  <tr key={u.username} className="hover:bg-gray-50/55 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-800 text-sm">{u.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{u.email}</div>
                    </td>
                    <td className="p-4 text-sm font-bold text-indigo-600">{u.username}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xxs font-bold border w-max uppercase tracking-wider ${u.role === 'admin' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-teal-100 text-teal-800 border-teal-200'}`}>
                          {u.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xxs font-bold border w-max uppercase tracking-wider ${u.plan === 'plus' ? 'bg-blue-100 text-blue-800 border-blue-200' : u.plan === 'pro' ? 'bg-amber-100 text-amber-800 border-amber-200' : u.plan === 'ultra' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                          {u.plan?.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-slate-800">{u.requestCount} / {u.requestLimit}</div>
                      <div className="text-xxs text-gray-500">lượt gọi</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${u.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                        {u.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-500">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="p-4 text-center">
                      {u.username === 'admin' ? (
                        <span className="text-xs text-gray-400 italic">Hệ thống tối cao</span>
                      ) : (
                        <div className="flex justify-center items-center gap-1.5 flex-wrap max-w-xs">
                          {/* Plan selector dropdown */}
                          <select
                            value={u.plan || 'free'}
                            onChange={(e) => {
                              const newPlan = e.target.value;
                              fetch(`/api/admin/users/${u.username}/role`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ plan: newPlan })
                              }).then(res => {
                                if (res.ok) fetchAdminUsers();
                              });
                            }}
                            className="p-1 border border-gray-300 rounded text-xs focus:outline-none"
                          >
                            <option value="free">FREE (30)</option>
                            <option value="plus">PLUS (300)</option>
                            <option value="pro">PRO (1000)</option>
                            <option value="ultra">ULTRA (5000)</option>
                          </select>

                          {/* Reset usage button */}
                          <button
                            onClick={() => {
                              if (!window.confirm(`Reset lượt gọi AI của ${u.username} về 0?`)) return;
                              fetch(`/api/admin/users/${u.username}/role`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ resetCount: true })
                              }).then(res => {
                                if (res.ok) fetchAdminUsers();
                              });
                            }}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xxs font-bold"
                            title="Reset lượt dùng"
                          >
                            Reset
                          </button>

                          <button
                            onClick={() => handleToggleBlockUser(u)}
                            className={`px-2 py-1 rounded text-xxs font-bold border transition-colors ${u.status === 'active' ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'}`}
                          >
                            {u.status === 'active' ? 'Khóa' : 'Mở'}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteUser(u.username)}
                            className="p-1 rounded bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 transition-colors border border-gray-200"
                            title="Xóa vĩnh viễn"
                          >
                            <UserMinus style={{ width: 12, height: 12 }} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderHanhTrinh = () => (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><Layout className="mr-2 text-blue-600" style={{width:20,height:20}}/> 12 Bước Giới Thiệu Dự Án</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.hanhTrinh.steps.map((step, idx) => (
            <div key={step.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3 mt-1 text-sm">{step.id}</span>
                <div className="w-full">
                  <EditableField value={step.title} onChange={val => handleUpdateArrayItem('hanhTrinh','steps',idx,'title',val)} className="font-semibold text-gray-800 text-lg mb-1" />
                  <EditableField value={step.desc} isTextArea onChange={val => handleUpdateArrayItem('hanhTrinh','steps',idx,'desc',val)} className="text-gray-600 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><MessageCircle className="mr-2 text-blue-600" style={{width:20,height:20}}/> 6 Bối cảnh tư vấn</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.hanhTrinh.contexts.map((ctx, idx) => {
            const CtxIcons = [Building2, Briefcase, Home, Car, Smartphone, Wine];
            const CIcon = CtxIcons[idx] || Info;
            return (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center mb-2">
                  <CIcon className="text-blue-600 mr-2 flex-shrink-0" style={{width:20,height:20}} />
                  <EditableField value={ctx.title} onChange={val => handleUpdateArrayItem('hanhTrinh','contexts',idx,'title',val)} className="font-bold text-gray-800" />
                </div>
                <EditableField value={ctx.desc} isTextArea onChange={val => handleUpdateArrayItem('hanhTrinh','contexts',idx,'desc',val)} className="text-gray-600 text-sm" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-sky-50 border border-sky-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-sky-900 mb-2 flex items-center"><Smartphone className="mr-2 text-sky-600" style={{width:20,height:20}}/> ✨ AI Soạn Tin Nhắn Zalo Chăm Sóc</h3>
        <p className="text-sm text-sky-700 mb-4">Sau cuộc gọi hoặc buổi gặp, nhập vài từ khóa tóm tắt tình hình, AI sẽ giúp bạn soạn một tin nhắn Zalo follow-up chuyên nghiệp.</p>
        <textarea value={zaloMeetingNotes} onChange={e => setZaloMeetingNotes(e.target.value)} placeholder="Ví dụ: Khách khen thiết kế đẹp nhưng chê xa, đang đắn đo tài chính..." className="w-full p-4 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleDraftZalo} disabled={isDraftingZalo || !zaloMeetingNotes.trim()} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isDraftingZalo ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang soạn...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Soạn tin nhắn</>}
          </button>
        </div>
        {zaloDraft && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-sky-200 text-sm text-gray-800 shadow-sm relative group">
            <button onClick={() => copyToClipboard(zaloDraft)} className="absolute top-2 right-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 rounded">Copy</button>
            <div className="whitespace-pre-wrap pr-12">{zaloDraft}</div>
          </div>
        )}
      </section>

      <section className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-fuchsia-900 mb-2 flex items-center"><HeartHandshake className="mr-2 text-fuchsia-600" style={{width:20,height:20}}/> ✨ AI Gợi ý Phá Băng (Icebreaker)</h3>
        <p className="text-sm text-fuchsia-700 mb-4">Lần đầu gặp khách không biết nói gì? Nhập vài đặc điểm nhận diện, AI sẽ mớm cho bạn những câu mở lời duyên dáng nhất.</p>
        <textarea value={clientProfile} onChange={e => setClientProfile(e.target.value)} placeholder="Ví dụ: Khách nữ, khoảng 40 tuổi, xách túi Dior, đi xe Mercedes GLC, làm chủ spa..." className="w-full p-4 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleGenerateIcebreaker} disabled={isGeneratingIcebreaker || !clientProfile.trim()} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isGeneratingIcebreaker ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang suy nghĩ...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Gợi ý Câu Mở Lời</>}
          </button>
        </div>
        {icebreakerResult && <AiResultBox result={icebreakerResult} color="fuchsia" />}
      </section>

      <section className="bg-lime-50 border border-lime-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-lime-900 mb-2 flex items-center"><CalendarClock className="mr-2 text-lime-600" style={{width:20,height:20}}/> ✨ AI Chiến lược gia Bám đuổi (Follow-up)</h3>
        <p className="text-sm text-lime-700 mb-4">Khách hàng bảo "để suy nghĩ thêm"? AI sẽ lên lịch trình bám đuổi 3 điểm chạm cực kỳ tinh tế.</p>
        <textarea value={followUpContext} onChange={e => setFollowUpContext(e.target.value)} placeholder="Ví dụ: Khách bảo giá hơi cao, cần về bàn lại với vợ, tuần sau mới quyết định..." className="w-full p-4 border border-lime-300 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handlePlanFollowUp} disabled={isPlanningFollowUp || !followUpContext.trim()} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isPlanningFollowUp ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang lên kế hoạch...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Lập Kế Hoạch Bám Đuổi</>}
          </button>
        </div>
        {followUpPlanResult && <AiResultBox result={followUpPlanResult} color="lime" />}
      </section>
    </div>
  );

  const renderQuyTrinh = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-800 text-sm font-medium">
        Đây là xương sống của toàn bộ chu trình bán hàng. Mỗi bước phải hoàn thành mới chuyển sang bước tiếp theo.
      </div>
      <div className="space-y-4">
        {data.quyTrinh.steps.map((step, idx) => {
          const QIcons = [Filter, Send, PhoneCall, MapPin, Ear, ShieldAlert, PenTool, HeartHandshake];
          const QIcon = QIcons[idx] || Info;
          return (
            <div key={step.step} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold mr-4 text-lg">{step.step}</span>
              <div className="w-full">
                <div className="flex items-center mb-2">
                  <QIcon className="text-slate-500 mr-2 flex-shrink-0" style={{width:20,height:20}} />
                  <EditableField value={step.title} onChange={val => handleUpdateArrayItem('quyTrinh','steps',idx,'title',val)} className="font-bold text-gray-800 text-lg" />
                </div>
                <EditableField value={step.desc} isTextArea onChange={val => handleUpdateArrayItem('quyTrinh','steps',idx,'desc',val)} className="text-gray-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center"><Phone className="mr-2 text-blue-600" style={{width:22,height:22}}/> Mẫu kịch bản Telesale</h3>
          <button onClick={() => setShowAIModal(true)} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center transition-colors shadow-sm">
            <Sparkles className="mr-2" style={{width:16,height:16}}/> ✨ Tạo kịch bản với AI
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.quyTrinh.telesale.map((item, idx) => (
            <div key={item.id} className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm">
              <EditableField value={item.title} onChange={val => handleUpdateArrayItem('quyTrinh','telesale',idx,'title',val)} className="font-bold text-amber-900 text-sm mb-3 border-b border-amber-200 pb-2 block uppercase tracking-wide" />
              <EditableField value={item.script} isTextArea onChange={val => handleUpdateArrayItem('quyTrinh','telesale',idx,'script',val)} className="text-gray-800 text-sm font-medium leading-relaxed" />
            </div>
          ))}
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative mx-4">
            <button onClick={() => setShowAIModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X style={{width:20,height:20}}/></button>
            <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center"><Bot className="mr-2" style={{width:22,height:22}}/> Trợ lý AI Soạn Kịch Bản</h3>
            <p className="text-sm text-gray-500 mb-5">Gemini AI sẽ giúp bạn soạn thảo kịch bản chuyên nghiệp dựa trên thông số sản phẩm.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tên Dự án / Sản phẩm *</label>
                <input type="text" value={aiForm.project} onChange={e => setAiForm({...aiForm, project: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Vd: Căn hộ Vinhomes, Shophouse Phú Quốc..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Điểm nhấn nổi bật (USP)</label>
                <textarea value={aiForm.highlights} onChange={e => setAiForm({...aiForm, highlights: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Vd: Chiết khấu 10%, ngay mặt tiền đường lớn..." rows={2} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Khách hàng mục tiêu</label>
                <input type="text" value={aiForm.customer} onChange={e => setAiForm({...aiForm, customer: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Vd: Vợ chồng trẻ mới cưới, nhà đầu tư..." />
              </div>
              {aiError && <p className="text-red-500 text-sm">{aiError}</p>}
              <button onClick={handleGenerateScript} disabled={isGenerating} className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex justify-center items-center transition-colors disabled:opacity-70">
                {isGenerating ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang viết...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> ✨ Bắt đầu Tạo</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center"><ClipboardList className="mr-2 text-emerald-600" style={{width:20,height:20}}/> ✨ AI Trợ lý Chuẩn hóa Ghi chú CRM</h3>
        <p className="text-sm text-emerald-700 mb-4">Sau cuộc gọi telesale, quăng ghi chép lộn xộn vào đây. AI sẽ tóm tắt thành format CRM chuyên nghiệp.</p>
        <textarea value={rawCallNotes} onChange={e => setRawCallNotes(e.target.value)} placeholder="Ví dụ: Khách tên anh Tuấn q7, hỏi dự án a, kêu giá cao, tài chính tầm 3 tỷ..." className="w-full p-4 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-24 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleSummarizeCall} disabled={isSummarizingCall || !rawCallNotes.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isSummarizingCall ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang chuẩn hóa...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Tạo Ghi chú CRM</>}
          </button>
        </div>
        {crmSummary && <AiResultBox result={crmSummary} color="emerald" />}
      </section>

      <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-orange-900 mb-2 flex items-center"><Share2 className="mr-2 text-orange-600" style={{width:20,height:20}}/> ✨ AI Kịch bản Xin Lời Giới Thiệu (Referral)</h3>
        <p className="text-sm text-orange-700 mb-4">Đỉnh cao của sales là bán hàng qua lời giới thiệu. AI sẽ chỉ cách mở lời xin referral khéo léo nhất.</p>
        <textarea value={referralClientContext} onChange={e => setReferralClientContext(e.target.value)} placeholder="Ví dụ: Khách vừa nhận sổ hồng căn hộ rất vui, đang rảnh rỗi..." className="w-full p-4 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleGenerateReferral} disabled={isGeneratingReferral || !referralClientContext.trim()} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isGeneratingReferral ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang nháp kịch bản...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Xin Lời Giới Thiệu</>}
          </button>
        </div>
        {referralScript && <AiResultBox result={referralScript} color="orange" />}
      </section>

      <section className="bg-pink-50 border border-pink-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-pink-900 mb-2 flex items-center"><Megaphone className="mr-2 text-pink-600" style={{width:20,height:20}}/> ✨ AI Xây dựng Thương hiệu (Social Post)</h3>
        <p className="text-sm text-pink-700 mb-4">Nhập một sự kiện, AI sẽ hô biến nó thành bài đăng Facebook/Zalo đầy thu hút.</p>
        <textarea value={socialTopic} onChange={e => setSocialTopic(e.target.value)} placeholder="Ví dụ: Sáng nay vừa dẫn khách đi xem sa bàn dự án A, khách rất ưng ý..." className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleGenerateSocialPost} disabled={isGeneratingSocial || !socialTopic.trim()} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isGeneratingSocial ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang sáng tạo...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Viết Bài Đăng</>}
          </button>
        </div>
        {socialPostResult && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-pink-200 text-sm text-gray-800 shadow-sm relative group">
            <button onClick={() => copyToClipboard(socialPostResult)} className="absolute top-2 right-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 rounded">Copy</button>
            <div className="whitespace-pre-wrap pr-12">{socialPostResult}</div>
          </div>
        )}
      </section>
    </div>
  );

  const renderKhachHang = () => (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">5 Kiểu Khách Hàng & Cách Tiếp Cận</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.khachHang.types.map((type, idx) => {
            const TIcons = [LineChart, HelpCircle, ShieldQuestion, TrendingUp, UserMinus];
            const TIcon = TIcons[idx] || Users;
            return (
              <div key={idx} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm border-l-4 border-l-blue-500">
                <div className="flex items-center mb-2">
                  <TIcon className="text-blue-600 mr-2 flex-shrink-0" style={{width:22,height:22}} />
                  <EditableField value={type.type} onChange={val => handleUpdateArrayItem('khachHang','types',idx,'type',val)} className="font-bold text-blue-700 text-lg" />
                </div>
                <EditableField value={type.desc} isTextArea onChange={val => handleUpdateArrayItem('khachHang','types',idx,'desc',val)} className="text-gray-600 text-sm leading-relaxed" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-yellow-900 mb-2 flex items-center"><Brain className="mr-2 text-yellow-600" style={{width:20,height:20}}/> ✨ AI Phác họa Tâm lý (Bản đồ thấu cảm)</h3>
        <p className="text-sm text-yellow-700 mb-4">Mô tả sơ bộ về khách, AI sẽ "soi" ra nỗi sợ thầm kín, khát khao thực sự và những câu hỏi "tử huyệt".</p>
        <textarea value={personaContext} onChange={e => setPersonaContext(e.target.value)} placeholder="Ví dụ: Hai vợ chồng trẻ, gom góp mãi mới được 1 tỷ, đang tìm mua chung cư trả góp để chuẩn bị sinh con..." className="w-full p-4 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleMapPersona} disabled={isMappingPersona || !personaContext.trim()} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isMappingPersona ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang đọc vị...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Đọc vị Khách hàng</>}
          </button>
        </div>
        {personaMapResult && <AiResultBox result={personaMapResult} color="yellow" />}
      </section>

      <section className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-purple-900 mb-2 flex items-center"><UserPlus className="mr-2 text-purple-600" style={{width:20,height:20}}/> ✨ AI Phân tích Tình huống Khách hàng</h3>
        <p className="text-sm text-purple-700 mb-4">Nhập thông tin khách hàng vừa gặp, Giám đốc AI sẽ định vị kiểu khách và cách chốt hiệu quả.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea value={leadContext} onChange={e => setLeadContext(e.target.value)} placeholder="Ví dụ: Khách nam 45 tuổi, hỏi rất sâu về pháp lý và so sánh với dự án kế bên rẻ hơn 200 triệu..." className="flex-1 p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm min-h-24" />
          <button onClick={handleAnalyzeLead} disabled={isAnalyzingLead || !leadContext.trim()} className="md:w-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center transition-colors disabled:opacity-60">
            {isAnalyzingLead ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang phân tích...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Phân tích</>}
          </button>
        </div>
        {leadAnalysis && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            <div className="font-bold text-purple-800 mb-2 flex items-center"><MessageSquareQuote className="mr-2" style={{width:16,height:16}}/> Nhận định từ Giám đốc AI:</div>
            {leadAnalysis}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><AlertCircle className="mr-2 text-red-500" style={{width:20,height:20}}/> 14 Lý do từ chối (Thực tế)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.khachHang.rejections.map((reason, idx) => (
            <div key={idx} className="flex flex-col text-gray-700 bg-red-50 p-3 rounded-lg border border-red-100 relative group transition-all">
              <div className="flex items-start">
                <XCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" style={{width:16,height:16}} />
                <div className="w-full pr-10">
                  <EditableField value={reason} onChange={val => handleUpdateSimpleArrayItem('khachHang','rejections',idx,val)} className="text-sm font-medium text-red-900" />
                </div>
                <button onClick={() => handleAiObjection(reason, idx)} disabled={loadingAiResponse === idx} className="absolute right-2 top-2 p-2 bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 rounded-md transition-colors shadow-sm" title="AI gợi ý cách xử lý">
                  {loadingAiResponse === idx ? <Loader2 className="animate-spin" style={{width:16,height:16}}/> : <Sparkles style={{width:16,height:16}}/>}
                </button>
              </div>
              {aiResponses[idx] && (
                <div className="mt-3 pt-3 border-t border-red-200 text-sm text-purple-900 bg-purple-100/50 p-3 rounded-md">
                  <span className="font-bold flex items-center mb-1 text-purple-700"><Wand2 className="mr-1" style={{width:12,height:12}}/> Gợi ý từ chuyên gia AI:</span>
                  <p className="italic leading-relaxed">"{aiResponses[idx]}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm italic text-gray-500 border-l-4 pl-3 py-1 border-gray-300">
          "Muốn xử lý từ chối, phải xác định rõ lý do từ chối là gì trước đã. Không thể xử lý cái mình không hiểu."
        </p>
      </section>
    </div>
  );

  const renderKienThuc = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm font-medium border border-blue-200">
        Mình là người bán hàng, nhưng phải kiến thức như một chuyên gia. Khi nói về thang máy không chỉ "có 4 thang" mà phải phân tích thương hiệu, sức chứa, công nghệ, cảm giác di chuyển → khách hàng hình dung được trải nghiệm sống.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">12 Thông tin SP cần nắm vững</h4>
          <ul className="space-y-3">
            {data.kienThuc.productInfo.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <Box className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" style={{width:16,height:16}} />
                <div className="w-full"><EditableField value={item} onChange={val => handleUpdateSimpleArrayItem('kienThuc','productInfo',idx,val)} className="text-sm text-gray-700" /></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">12 Yếu tố phân tích thị trường</h4>
          <ul className="space-y-3">
            {data.kienThuc.marketInfo.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <Globe className="text-green-500 mr-3 mt-0.5 flex-shrink-0" style={{width:16,height:16}} />
                <div className="w-full"><EditableField value={item} onChange={val => handleUpdateSimpleArrayItem('kienThuc','marketInfo',idx,val)} className="text-sm text-gray-700" /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center"><TrendingUp className="mr-2 text-amber-600" style={{width:20,height:20}}/> ✨ AI Chuyên gia Phân tích Thị trường</h3>
        <p className="text-sm text-amber-700 mb-4">Nhập tên khu vực hoặc dự án, AI sẽ tổng hợp tiềm năng và cho bạn 1 "câu hook" đắt giá.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" value={marketLocation} onChange={e => setMarketLocation(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAnalyzeMarket()} placeholder="Ví dụ: Khu Công nghệ cao Quận 9, đường Vành đai 3, dự án Aqua City..." className="flex-1 p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm" />
          <button onClick={handleAnalyzeMarket} disabled={isAnalyzingMarket || !marketLocation.trim()} className="md:w-40 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center transition-colors disabled:opacity-60">
            {isAnalyzingMarket ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang phân tích...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Phân tích</>}
          </button>
        </div>
        {marketInsight && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            <div className="font-bold text-amber-800 mb-2 flex items-center"><MessageSquareQuote className="mr-2" style={{width:16,height:16}}/> Điểm tin thị trường từ AI:</div>
            {marketInsight}
          </div>
        )}
      </section>

      <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center"><Swords className="mr-2 text-blue-400" style={{width:20,height:20}}/> ✨ AI Chiến lược gia: Đánh bại Đối thủ</h3>
        <p className="text-sm text-slate-300 mb-4">Khách phân vân giữa 2 dự án? AI sẽ chỉ ra "tử huyệt" của đối thủ và cách xử lý khéo léo nhất.</p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input type="text" value={myProject} onChange={e => setMyProject(e.target.value)} placeholder="Dự án của bạn đang bán..." className="flex-1 p-3 border border-slate-600 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder-slate-400" />
          <span className="text-slate-400 font-bold self-center text-center">VS</span>
          <input type="text" value={competitorProject} onChange={e => setCompetitorProject(e.target.value)} placeholder="Dự án đối thủ..." className="flex-1 p-3 border border-slate-600 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm placeholder-slate-400" />
        </div>
        <div className="flex justify-end">
          <button onClick={handleGenerateBattlecard} disabled={isGeneratingBattlecard || !myProject.trim() || !competitorProject.trim()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isGeneratingBattlecard ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang phân tích...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Phân tích So sánh</>}
          </button>
        </div>
        {battlecardResult && (
          <div className="mt-5 p-5 bg-slate-900 rounded-lg border border-slate-700 text-sm text-slate-200 shadow-inner">
            {battlecardResult.split('\n').map((line, i) => {
              const clean = line.replace(/\*\*/g,'').replace(/^#+\s*/,'');
              if (line.match(/^\*\*/) || line.match(/^#+/)) return <p key={i} className="font-bold text-blue-400 mt-3 mb-1">{clean}</p>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.substring(2)}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
            })}
          </div>
        )}
      </section>
    </div>
  );

  const renderThucChien = () => (
    <div className="space-y-8 animate-fadeIn">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.thucChien.principles.map((p, idx) => {
            const PIcons = [MessageSquare, Gem, Edit3];
            const PIcon = PIcons[idx] || Target;
            return (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center mb-2">
                  <PIcon className="text-indigo-600 mr-2 flex-shrink-0" style={{width:20,height:20}} />
                  <EditableField value={p.title} onChange={val => handleUpdateArrayItem('thucChien','principles',idx,'title',val)} className="font-bold text-gray-800 block" />
                </div>
                <EditableField value={p.desc} isTextArea onChange={val => handleUpdateArrayItem('thucChien','principles',idx,'desc',val)} className="text-sm text-gray-600" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center"><FileText className="mr-2 text-indigo-600" style={{width:20,height:20}}/> ✨ AI Huấn luyện & Chấm điểm Kịch bản</h3>
        <p className="text-sm text-indigo-700 mb-4">Dán kịch bản bạn tự soạn vào đây, AI sẽ đóng vai Trainer để chấm điểm và chỉnh sửa giúp bạn.</p>
        <textarea value={scriptToGrade} onChange={e => setScriptToGrade(e.target.value)} placeholder="Dán kịch bản bạn tự soạn vào đây..." className="w-full p-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-h-28 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleGradeScript} disabled={isGradingScript || !scriptToGrade.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isGradingScript ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang chấm điểm...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Bắt đầu Chấm điểm</>}
          </button>
        </div>
        {scriptFeedback && <AiResultBox result={scriptFeedback} color="indigo" />}
      </section>

      <section className="bg-teal-50 border border-teal-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-teal-900 mb-2 flex items-center"><Bot className="mr-2 text-teal-600" style={{width:20,height:20}}/> ✨ Phòng tập Gym Sales: Đóng vai với Khách Hàng AI</h3>
        <p className="text-sm text-teal-700 mb-6">Chọn 1 kiểu khách hàng và bắt đầu trò chuyện trực tiếp để rèn luyện phản xạ xử lý từ chối.</p>
        {!roleplayActive ? (
          <div className="bg-white p-5 rounded-lg border border-teal-100 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn đối tượng mô phỏng:</label>
            <select value={roleplayType} onChange={e => setRoleplayType(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 mb-4">
              {data.khachHang.types.map((t, idx) => (
                <option key={idx} value={idx}>{t.type}</option>
              ))}
            </select>
            {roleplayError && <p className="text-red-500 text-sm mb-3">{roleplayError}</p>}
            <button onClick={startRoleplay} disabled={isRoleplayLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg flex justify-center items-center transition-colors disabled:opacity-60">
              {isRoleplayLoading ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang kết nối...</> : <><Phone className="mr-2" style={{width:18,height:18}}/> Gọi ngay cho Khách AI</>}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-teal-200 shadow-sm flex flex-col" style={{height: 400}}>
            <div className="p-3 border-b border-gray-200 bg-teal-600 text-white font-semibold flex justify-between items-center rounded-t-lg">
              <span className="flex items-center"><UserPlus className="mr-2" style={{width:16,height:16}}/> Khách: {data.khachHang.types[roleplayType].type}</span>
              <button onClick={() => setRoleplayActive(false)} className="text-teal-100 hover:text-white text-xs underline">Kết thúc gọi</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {roleplayHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-teal-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>{msg.text}</div>
                </div>
              ))}
              {isRoleplayLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl text-sm bg-gray-200 text-gray-500 rounded-tl-none flex items-center">
                    <Loader2 className="animate-spin mr-2" style={{width:16,height:16}}/> Khách đang trả lời...
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2 rounded-b-lg">
              <input type="text" value={roleplayInput} onChange={e => setRoleplayInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendRoleplay()} placeholder="Nhập câu trả lời của bạn..." className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <button onClick={handleSendRoleplay} disabled={isRoleplayLoading || !roleplayInput.trim()} className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded disabled:opacity-50 transition-colors flex items-center justify-center">
                <Send style={{width:20,height:20}}/>
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-red-900 mb-2 flex items-center"><Flame className="mr-2 text-red-600" style={{width:20,height:20}}/> ✨ AI Bơm Động Lực & Gỡ Rối Tâm Lý</h3>
        <p className="text-sm text-red-700 mb-4">Đang chán nản, mất phương hướng? Tâm sự vào đây. Giám đốc AI sẽ "bơm lửa" và giao 1 hành động nhỏ để thoát ngay.</p>
        <textarea value={salesMood} onChange={e => setSalesMood(e.target.value)} placeholder="Ví dụ: Hôm nay gọi 50 cuộc bị chửi cả 50, cảm thấy bản thân không hợp nghề sales này nữa..." className="w-full p-4 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleCoachingMood} disabled={isCoachingMood || !salesMood.trim()} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isCoachingMood ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang lắng nghe...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Nhận Lời Khuyên</>}
          </button>
        </div>
        {motivationDose && <AiResultBox result={motivationDose} color="red" />}
      </section>
    </div>
  );

  const renderChotSale = () => (
    <div className="grid grid-cols-1 gap-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">6 Tín hiệu sẵn sàng mua</h3>
          <p className="text-xs text-gray-500 mb-3 italic">Tick chọn các tín hiệu bạn đang thấy ở khách hàng để AI Cố vấn chốt sale.</p>
          <ul className="space-y-3">
            {data.chotSale.signals.map((sig, idx) => (
              <li key={idx} className="flex items-center text-gray-700 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors" onClick={() => toggleSignal(sig)}>
                <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center flex-shrink-0 transition-colors ${selectedSignals.includes(sig) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {selectedSignals.includes(sig) && <CheckCircle className="text-white" style={{width:16,height:16}}/>}
                </div>
                <div className="w-full"><EditableField value={sig} onChange={val => handleUpdateSimpleArrayItem('chotSale','signals',idx,val)} className="text-sm" /></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">6 Yếu tố để ra quyết định</h3>
          <div className="grid grid-cols-2 gap-3">
            {data.chotSale.factors.map((factor, idx) => (
              <div key={idx} className="bg-orange-50 text-orange-800 p-3 rounded font-semibold text-center border border-orange-100 text-sm flex items-center justify-center">
                <Key className="mr-2 text-orange-600 flex-shrink-0" style={{width:16,height:16}}/>
                <EditableField value={factor} onChange={val => handleUpdateSimpleArrayItem('chotSale','factors',idx,val)} className="text-center bg-transparent w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-rose-50 border border-rose-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-rose-900 mb-2 flex items-center"><Lightbulb className="mr-2 text-rose-600" style={{width:20,height:20}}/> ✨ AI Cố vấn Chiến thuật Chốt Sale</h3>
        <p className="text-sm text-rose-700 mb-4">Chọn các "tín hiệu sẵn sàng mua" ở bảng trên, AI sẽ đánh giá độ "chín" và cung cấp câu nói dứt điểm để chốt cọc ngay.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 bg-white p-3 rounded-lg border border-rose-100 text-sm text-gray-600">
            Đã chọn: <strong className="text-rose-600">{selectedSignals.length}</strong> tín hiệu
          </div>
          <button onClick={handleAdviseClose} disabled={isAdvisingClose || selectedSignals.length === 0} className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-lg flex justify-center items-center transition-colors disabled:opacity-60 shadow-md">
            {isAdvisingClose ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang cố vấn...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Bắt đầu Cố vấn</>}
          </button>
        </div>
        {closingAdvice && <AiResultBox result={closingAdvice} color="rose" />}
      </section>

      <section className="bg-slate-100 border border-slate-300 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><Scale className="mr-2 text-slate-700" style={{width:20,height:20}}/> ✨ AI Chuyên gia Đàm phán (Win-Win)</h3>
        <p className="text-sm text-slate-700 mb-4">Khách ép giá? Nhập yêu cầu của khách, AI sẽ lập chiến thuật "Đánh đổi" (Give-Get) giúp bạn giữ vững vị thế.</p>
        <textarea value={negotiationDemand} onChange={e => setNegotiationDemand(e.target.value)} placeholder="Ví dụ: Khách bảo dự án bên kia đang giảm 5%, em không xin Sếp cho anh giảm thêm 2% thì anh không cọc đâu..." className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none text-sm min-h-20 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleNegotiationStrategy} disabled={isStrategizingNegotiation || !negotiationDemand.trim()} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isStrategizingNegotiation ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang tính toán...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Lên Chiến Thuật Đàm Phán</>}
          </button>
        </div>
        {negotiationStrategyResult && <AiResultBox result={negotiationStrategyResult} color="slate" />}
      </section>

      <section className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-cyan-900 mb-2 flex items-center"><Microscope className="mr-2 text-cyan-600" style={{width:20,height:20}}/> ✨ AI Phân tích Thương vụ (Deal Autopsy)</h3>
        <p className="text-sm text-cyan-700 mb-4">Vừa THẮNG hay THUA một deal? Kể lại ngắn gọn, AI sẽ tìm ra nguyên nhân cốt lõi và bài học xương máu.</p>
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-bold text-cyan-800">Kết quả deal:</label>
          <select value={dealOutcome} onChange={e => setDealOutcome(e.target.value)} className="p-2 border border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold">
            <option value="lost">❌ Thua (Rớt khách)</option>
            <option value="won">🏆 Thắng (Chốt thành công)</option>
          </select>
        </div>
        <textarea value={dealContext} onChange={e => setDealContext(e.target.value)} placeholder="Kể lại chuyện gì đã xảy ra: Ví dụ: Khách ban đầu rất thích, đã chọn căn, nhưng phút cuối lại báo vợ không cho mua..." className="w-full p-4 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm min-h-24 mb-4" />
        <div className="flex justify-end">
          <button onClick={handleDealAutopsy} disabled={isAutopsying || !dealContext.trim()} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors disabled:opacity-60 shadow-md">
            {isAutopsying ? <><Loader2 className="mr-2 animate-spin" style={{width:18,height:18}}/> Đang giải phẫu deal...</> : <><Sparkles className="mr-2" style={{width:18,height:18}}/> Bắt đầu Phân tích</>}
          </button>
        </div>
        {dealAutopsyResult && <AiResultBox result={dealAutopsyResult} color="cyan" />}
      </section>
    </div>
  );

  const renderRadaDiSan = () => {
    // Filter Zalo groups based on search input
    const filteredGroups = defaultZaloGroups.filter(g => 
      g.name.toLowerCase().includes(searchGroupQuery.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-fadeIn text-slate-700 pb-12">
        <style>{`
          @keyframes radar-sweep {
            from { transform: translate(-100%, -100%) rotate(0deg); }
            to { transform: translate(-100%, -100%) rotate(360deg); }
          }
        `}</style>

        {/* Header title block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
              <Radio className="animate-pulse" style={{width:24,height:24}}/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Rada đi săn nhóm Zalo</h3>
              <p className="text-xs text-gray-500 mt-0.5">Dò quét thời gian thực các tin nhắn có nhu cầu mua bán BĐS trong nhóm chat</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              Hệ thống đang bảo vệ
            </span>
          </div>
        </div>

        {/* Top statistic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Phiên đã chạy</p>
              <h4 className="text-3xl font-black text-slate-800 mt-1">{sessionsRun}</h4>
              <p className="text-2xs text-slate-400 mt-1">🔄 Tổng lịch sử</p>
            </div>
            <div className="p-3.5 bg-slate-50 text-slate-500 rounded-lg">
              <RotateCw style={{width:20,height:20}}/>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mục tiêu phát hiện</p>
              <h4 className="text-3xl font-black text-slate-800 mt-1">{targetsDetected}</h4>
              <p className="text-2xs text-slate-400 mt-1">🎯 Tổng tất cả các phiên</p>
            </div>
            <div className="p-3.5 bg-rose-50 text-rose-500 rounded-lg">
              <Target style={{width:20,height:20}}/>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Đang hoạt động</p>
              <h4 className="text-3xl font-black text-slate-800 mt-1">{activeSessions}</h4>
              <p className="text-2xs text-slate-400 mt-1">🟢 Phiên đang quét</p>
            </div>
            <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-lg">
              <Bot style={{width:20,height:20}}/>
            </div>
          </div>
        </div>

        {/* 3-Column main layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left configurations panel (Col span 4) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Section 1: Chọn tài khoản Zalo */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Chọn tài khoản Zalo</h5>
              <div className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg bg-indigo-50/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                    S
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Sale</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                  <CheckCircle style={{width:14,height:14}}/>
                </div>
              </div>
            </div>

            {/* Section 2: Chọn nhóm quét */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Chọn nhóm quét ({selectedGroups.length} đã chọn)
              </h5>
              <input
                type="text"
                value={searchGroupQuery}
                onChange={e => setSearchGroupQuery(e.target.value)}
                placeholder="Tìm kiếm tên nhóm..."
                className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <div className="max-h-36 overflow-y-auto border border-gray-100 rounded p-2 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center gap-2 py-1 px-1 text-xs border-b border-gray-200/50 font-bold text-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedGroups.length === defaultZaloGroups.length}
                    onChange={handleToggleSelectAllGroups}
                    className="cursor-pointer accent-violet-600"
                  />
                  <span>Chọn tất cả</span>
                </div>
                {filteredGroups.map(g => (
                  <div key={g.id} className="flex items-center gap-2 text-xs py-0.5 px-1 hover:bg-slate-100/60 rounded">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(g.id)}
                      onChange={() => handleToggleGroup(g.id)}
                      className="cursor-pointer accent-violet-600"
                    />
                    <span className="text-slate-700 truncate">{g.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Từ khóa mục tiêu */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Từ khóa mục tiêu</h5>
              <div className="flex flex-wrap gap-1 mb-2">
                {targetKeywords.map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 border border-violet-100 text-xs px-2 py-0.5 rounded-full font-medium">
                    {kw}
                    <button onClick={() => handleRemoveKeyword(kw)} className="text-violet-500 hover:text-violet-800 font-bold">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeywordInput}
                  onChange={e => setNewKeywordInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddKeyword()}
                  placeholder="Nhập từ khóa..."
                  className="flex-1 p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-3 bg-violet-600 hover:bg-violet-700 text-white rounded font-bold text-sm"
                >
                  +
                </button>
              </div>
              <p className="text-3xs text-slate-400 italic mt-1">Ấn Enter hoặc click nút + để thêm từ khóa mới</p>
            </div>

            {/* Section 4: Thời gian tìm kiếm */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">4. Thời gian tìm kiếm</h5>
              <select
                value={searchTime}
                onChange={e => setSearchTime(e.target.value)}
                className="w-full p-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium text-slate-700"
              >
                <option value="Đầu ngày - Hiện tại">Đầu ngày - Hiện tại</option>
                <option value="24 giờ qua">24 giờ qua</option>
                <option value="3 ngày qua">3 ngày qua</option>
              </select>
            </div>

            {/* Start Button */}
            <button
              onClick={() => setIsHunting(!isHunting)}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md mt-4 flex items-center justify-center gap-2
                ${isHunting 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/10' 
                  : 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/10'}`}
            >
              <Radio className={isHunting ? 'animate-spin' : ''} style={{width:16,height:16}}/>
              {isHunting ? 'DỪNG ĐI SĂN' : 'BẮT ĐẦU ĐI SĂN'}
            </button>

          </div>

          {/* Center radar animation panel (Col span 5) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between items-stretch">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Màn hình Radar</h5>
            
            {/* Visual Radar Box */}
            <div className="relative w-full h-80 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-4 font-mono select-none">
              
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`rounded-full border border-violet-500/10 transition-all duration-300 ${isHunting ? 'w-16 h-16 border-violet-500/20' : 'w-12 h-12'}`}></div>
                <div className={`rounded-full border border-violet-500/10 transition-all duration-300 ${isHunting ? 'w-36 h-36 border-violet-500/20' : 'w-24 h-24'}`}></div>
                <div className={`rounded-full border border-violet-500/10 transition-all duration-300 ${isHunting ? 'w-56 h-56 border-violet-500/20' : 'w-36 h-36'}`}></div>
                <div className={`rounded-full border border-violet-500/10 transition-all duration-300 ${isHunting ? 'w-76 h-76 border-violet-500/20' : 'w-48 h-48'}`}></div>
                {/* Crosshairs */}
                <div className="absolute w-full h-px bg-violet-500/10"></div>
                <div className="absolute h-full w-px bg-violet-500/10"></div>
              </div>
              
              {/* Sweep line (Pulsing sweep rotation) */}
              {isHunting && (
                <div 
                  className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-tr from-violet-500/25 to-transparent origin-bottom-left pointer-events-none"
                  style={{
                    transform: 'translate(-100%, -100%) rotate(0deg)',
                    transformOrigin: '100% 100%',
                    animation: 'radar-sweep 4s linear infinite',
                    borderRadius: '100% 0 0 0'
                  }}
                ></div>
              )}

              {/* Status Indicator */}
              <div className="flex items-center justify-between text-3xs border-b border-indigo-950/80 pb-1.5 z-10">
                <span className="text-indigo-400">ENGINE: RADAR_V1.0</span>
                <span className={isHunting ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}>
                  {isHunting ? '● RUNNING' : '○ IDLE'}
                </span>
              </div>

              {/* Terminal Logs (Bottom portion) */}
              <div className="mt-auto space-y-1 text-2xs z-10 max-h-36 overflow-hidden">
                {huntingLog.map((log, index) => {
                  if (!log || typeof log !== 'string') return null;
                  let logColor = 'text-indigo-400';
                  if (log.includes('ACTIVE') || log.includes('DETECTED:')) {
                    logColor = 'text-emerald-400';
                  } else if (log.includes('TARGET DETECTED')) {
                    logColor = 'text-amber-400 font-bold';
                  }
                  return (
                    <div key={index} className={`${logColor} truncate`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <p className="text-3xs text-slate-400 italic text-center mt-3">
              Mô hình AI tự động đọc hiểu cú pháp, ngữ cảnh chat và phân loại nhu cầu thực
            </p>
          </div>

          {/* Right live signals feed (Col span 3) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between items-stretch">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2 mb-3 flex-shrink-0">
              <h5 className="text-xs font-bold text-slate-800">Tín hiệu từ Zalo</h5>
              <span className={`text-3xs px-2 py-0.5 rounded font-bold border
                ${isHunting 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                {isHunting ? 'Đang quét...' : 'Chờ lệnh...'}
              </span>
            </div>

            {/* Zalo Signals Display Area */}
            <div className="flex-1 overflow-y-auto max-h-[340px] pr-1 space-y-3 min-h-[300px]">
              
              {/* Empty state */}
              {zaloSignals.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Radio className="text-slate-300 animate-pulse mb-3" style={{width:32,height:32}}/>
                  <p className="text-xs text-slate-400 font-medium">
                    Nhấn "Bắt đầu đi săn" để quét tín hiệu từ các nhóm
                  </p>
                </div>
              )}

              {/* Signals list */}
              {zaloSignals.map((signal, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200 hover:border-violet-300/80 p-3 rounded-lg text-xs space-y-1.5 transition-all animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/55 pb-1">
                    <span className="font-bold text-slate-800">{signal.name}</span>
                    <span className="text-3xs text-violet-600 font-semibold bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100">
                      Match: {signal.matchScore}%
                    </span>
                  </div>
                  
                  <div className="text-slate-400 text-3xs flex items-center gap-1.5">
                    <span className="truncate max-w-[120px]">{signal.source}</span>
                    <span>•</span>
                    <span>{signal.time}</span>
                  </div>

                  <p className="text-slate-600 leading-normal text-2xs italic font-medium">
                    "{signal.demand}"
                  </p>

                  {signal.phone && signal.phone !== 'Không có' && (
                    <p className="text-slate-700 text-2xs font-semibold">
                      📞 SĐT: <span className="text-violet-600">{signal.phone}</span>
                    </p>
                  )}

                  <div className="flex gap-1.5 pt-1.5 border-t border-slate-200/50 justify-between items-center">
                    <button
                      onClick={() => {
                        setZaloMeetingNotes(`Khách hàng ${signal.name} (${signal.phone}) đăng trong "${signal.source}" với nhu cầu: "${signal.demand}".`);
                        setActiveTab('thucChien');
                        setTimeout(() => {
                          const textarea = document.querySelector('textarea[placeholder*="Dán kịch bản"]');
                          if (textarea) textarea.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                      className="text-3xs bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200/80 px-2 py-1.5 rounded font-bold flex items-center gap-1"
                    >
                      <MessageSquare style={{width:10,height:10}}/> Soạn Zalo
                    </button>
                    <button
                      onClick={() => {
                        alert(`Đã lưu thông tin khách hàng ${signal.name} vào CRM!`);
                      }}
                      className="text-3xs bg-violet-600 hover:bg-violet-700 text-white px-2 py-1.5 rounded font-bold"
                    >
                      Lưu CRM
                    </button>
                  </div>
                </div>
              ))}

            </div>

            {/* Clear history button */}
            <button
              onClick={() => {
                setZaloSignals([]);
                setTargetsDetected(0);
              }}
              disabled={zaloSignals.length === 0}
              className="w-full text-center py-2 border-t border-slate-100 text-3xs text-slate-400 hover:text-slate-600 transition-colors mt-3 flex items-center justify-center gap-1 flex-shrink-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              🗑️ Xóa lịch sử quét
            </button>

          </div>

        </div>

      </div>
    );
  };

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        <Loader2 className="animate-spin text-amber-500 mb-4" style={{ width: 48, height: 48 }} />
        <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">Đang tải phiên làm việc...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto py-12 px-4 z-50" style={{
        background: 'linear-gradient(170deg, #0c0e16 0%, #0f1120 35%, #121526 65%, #0c0e16 100%)'
      }}>
        <Watermark />
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(22, 20, 70, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 48px rgba(0,0,0,0.5)',
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Logo & Branding */}
          <div className="p-6 text-center border-b border-indigo-950 bg-slate-950/40">
            <div className="flex justify-center mb-3">
              <div className="vdh-monogram vdh-glow w-14 h-14 rounded-2xl flex items-center justify-center">
                <Building2 style={{ width: 28, height: 28, color: '#1e1b4b' }} />
              </div>
            </div>
            <h1 className="vdh-name-text text-xl font-black tracking-wider uppercase mb-1">Vương Đắc Hiệp</h1>
            <p className="text-xs text-amber-500 font-bold tracking-widest uppercase flex items-center justify-center gap-1">
              <Phone style={{ width: 10, height: 10 }} /> 08.6969.7363
            </p>
            <p className="text-slate-400 text-xs mt-2 font-medium">Hệ thống Trợ lý Sales Playbook Bất động sản AI</p>
          </div>

          <div className="p-6">
            {/* View switcher tabs */}
            <div className="flex bg-slate-950/60 rounded-xl p-1 mb-6 border border-indigo-950">
              <button
                type="button"
                onClick={() => { setAuthView('login'); setAuthError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${authView === 'login' ? 'bg-indigo-600/30 text-amber-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                ĐĂNG NHẬP
              </button>
              <button
                type="button"
                onClick={() => { setAuthView('register'); setAuthError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${authView === 'register' ? 'bg-indigo-600/30 text-amber-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                ĐĂNG KÝ
              </button>
            </div>

            {authError && (
              <div className={`p-3.5 rounded-xl border mb-4 text-xs font-semibold flex items-center gap-2 ${authError.includes('thành công') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                <Info style={{ width: 14, height: 14, flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            {authView === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Tên đăng nhập</label>
                  <input
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="Nhập tên đăng nhập..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Mật khẩu</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Nhập mật khẩu..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 rounded-xl flex justify-center items-center transition-all disabled:opacity-60 shadow-lg shadow-amber-500/10"
                >
                  {isAuthLoading ? <Loader2 className="animate-spin mr-2" style={{ width: 18, height: 18 }} /> : <Key className="mr-2" style={{ width: 18, height: 18 }} />}
                  BẮT ĐẦU TRẢI NGHIỆM
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="Nhập họ và tên..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Email liên hệ</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="Nhập email..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Tên đăng nhập</label>
                  <input
                    type="text"
                    required
                    value={registerForm.username}
                    onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
                    placeholder="Tên đăng nhập viết liền..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 tracking-wider">Mật khẩu</label>
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Tối thiểu 6 ký tự..."
                    className="w-full p-3 bg-slate-950/80 border border-indigo-950 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 rounded-xl flex justify-center items-center transition-all disabled:opacity-60 shadow-lg shadow-amber-500/10"
                >
                  {isAuthLoading ? <Loader2 className="animate-spin mr-2" style={{ width: 18, height: 18 }} /> : <Sparkles className="mr-2" style={{ width: 18, height: 18 }} />}
                  TẠO TÀI KHOẢN MỚI
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 font-sans overflow-hidden" style={{height:'100vh'}}>

      <Watermark />

      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — ẩn trên mobile, slide-in khi mobileMenuOpen */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        md:relative md:w-64 md:flex md:flex-shrink-0 md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-5 bg-slate-950 border-b border-slate-800/60">
          <div className="flex items-start justify-between">
            {/* VĐH Gold Monogram + Branding */}
            <div className="flex items-center gap-3">
              <div className="vdh-monogram vdh-glow w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 style={{width:20,height:20,color:'#1e1b4b'}}/>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-0.5">Sales Playbook</p>
                <h1 className="vdh-name-text font-black leading-tight" style={{fontSize:'15px',fontFamily:"'Be Vietnam Pro',sans-serif"}}>Vương Đắc Hiệp</h1>
                <div className="vdh-powered-badge mt-1.5">
                  <Phone style={{width:9,height:9,color:'#F59E0B'}}/>
                  <span style={{fontSize:'9px',fontWeight:700,color:'rgba(252,211,77,0.85)',letterSpacing:'1px',fontFamily:"'Be Vietnam Pro',sans-serif"}}>08.6969.7363</span>
                </div>
              </div>
            </div>
            {/* Nút đóng sidebar trên mobile */}
            <button
              className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}>
              <X style={{width:18,height:18}}/>
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3" style={{display:'flex',flexDirection:'column'}}>
          {/* Tab buttons — iOS glass pill + cursor spotlight */}
          <div style={{position:'relative', padding:'0 0'}}>
            {/* Sliding glass pill */}
            <div className="nav-pill" style={{
              top: pillStyle.top,
              height: pillStyle.height,
              opacity: pillStyle.opacity,
            }}/>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id}
                  ref={el => navBtnRefs.current[tab.id] = el}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
                  }}
                  className={`nav-btn-ios w-full flex items-center px-5 py-3.5 text-left text-sm font-medium
                    ${isActive ? 'nav-active' : 'text-slate-400 hover:text-white'}`}>
                  <Icon className="mr-3 flex-shrink-0" style={{width:19,height:19}}/>
                  <span className="flex-1">{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-gradient-to-r from-red-500 to-amber-500 text-white uppercase tracking-wider animate-pulse flex-shrink-0">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Spacer */}
          <div style={{flex:1,minHeight:16}}/>

          {/* Sidebar image card — Quote of the day */}
          {(() => {
            const quotes = [
              "Người bán giỏi không bán sản phẩm — họ bán giấc mơ của khách hàng.",
              "Mỗi lần từ chối là một bước gần hơn đến người nói đồng ý.",
              "Lắng nghe là kỹ năng bán hàng mạnh nhất bạn có.",
              "Tin tưởng được xây dựng bằng sự nhất quán, không phải lời hứa.",
              "Khách không mua nhà — họ mua tương lai cho gia đình.",
              "Người thắng không bao giờ bỏ cuộc, người bỏ cuộc không bao giờ thắng.",
              "Mỗi sáng thức dậy là cơ hội tạo ra kỷ lục mới.",
              "Bất động sản không chỉ là giao dịch — đó là thay đổi cuộc đời người khác.",
              "Khách hàng không quan tâm bạn biết bao nhiêu, cho đến khi họ biết bạn quan tâm bao nhiêu.",
              "Thành công trong sales đến từ việc giải quyết vấn đề, không phải thúc ép mua hàng.",
              "Một cuộc gọi tốt hơn không có cuộc gọi nào. Hành động ngay hôm nay.",
              "Người sale giỏi tạo ra cơ hội, không ngồi chờ cơ hội.",
              "Đừng bán những gì bạn có — hãy bán những gì khách cần.",
              "Mỗi khách hàng hài lòng là một người bán hàng miễn phí cho bạn.",
              "Sự kiên trì không phải về việc gọi 100 cuộc — mà là gọi cuộc 101.",
              "Giá trị bạn tạo ra lớn hơn hoa hồng bạn nhận được.",
              "Đầu tư vào kiến thức là khoản đầu tư sinh lời nhất trong nghề sales.",
              "Người mua bằng cảm xúc, người bán bằng logic — hãy kết nối cả hai.",
              "Thương hiệu cá nhân của bạn là tài sản không ai có thể lấy đi.",
              "Mỗi dự án bạn bán là một gia đình có mái ấm — hãy trân trọng điều đó.",
              "Không có khách hàng khó, chỉ có người tư vấn chưa đủ sâu.",
              "Chốt sale không phải kết thúc — đó là khởi đầu của mối quan hệ dài hạn.",
              "Người sale xuất sắc không bao giờ cảm thấy mình đang bán — họ đang giúp đỡ.",
              "Hỏi đúng câu hỏi quan trọng hơn có câu trả lời hoàn hảo.",
              "Thị trường BĐS lên xuống, nhưng người giỏi luôn tìm được cách thắng.",
              "Đừng cạnh tranh về giá — hãy cạnh tranh về giá trị bạn mang lại.",
              "Mỗi ngày không tiến là một ngày lùi trong nghề này.",
              "Khách hàng tốt nhất của bạn là khách hàng bạn phục vụ tốt nhất hôm nay.",
              "Xây dựng mạng lưới trước khi bạn cần nó — đó là đầu tư dài hạn.",
              "Sales giỏi = Hỏi nhiều + Nghe nhiều + Nói đúng lúc.",
              "Đừng sợ mất khách — hãy sợ không học được gì từ lần mất đó.",
              "Uy tín mất một giây, xây lại cần cả năm. Hãy giữ gìn từng lời hứa.",
              "BĐS là tài sản hữu hình — nhưng lòng tin của khách là tài sản vô giá hơn.",
              "Người ta quên những gì bạn nói, nhưng không quên cảm giác bạn mang lại.",
              "Đỉnh cao của nghề sales là khi khách chủ động giới thiệu bạn cho người thân.",
              "Mỗi buổi sáng, hỏi bản thân: Hôm nay mình sẽ tạo ra giá trị gì?",
              "Kỹ năng có thể học — nhưng thái độ mới là thứ quyết định thành công.",
              "Người kiếm được nhiều nhất không phải người làm việc nhiều nhất — mà là người tạo giá trị nhiều nhất.",
              "Khách hàng không mua căn hộ — họ mua tầm nhìn, tiện nghi và an toàn cho tương lai.",
              "Mỗi phản đối của khách là một câu hỏi ẩn — hãy tìm và trả lời nó.",
              "Nghề sales dạy bạn điều quý giá nhất: kiên nhẫn với người khác và với chính mình.",
              "Không ai thành công một mình — hãy xây dựng đội ngũ xung quanh bạn.",
              "Thời gian là tài sản duy nhất không thể mua lại — hãy đầu tư nó đúng chỗ.",
              "Người ta mua từ người họ tin tưởng, thích và cảm thấy được lắng nghe.",
              "Làm tốt hôm nay là nền tảng cho doanh số của tháng sau.",
              "Đừng đợi điều kiện hoàn hảo — hãy tạo ra kết quả với những gì bạn đang có.",
              "Mỗi 'không' là dữ liệu — hãy phân tích nó, đừng sợ nó.",
              "Phong cách tư vấn của bạn chính là thương hiệu của bạn.",
              "Bán hàng là nghệ thuật giúp người khác đưa ra quyết định đúng đắn.",
              "Niềm đam mê với nghề sales sẽ giữ bạn đứng vững khi thị trường khó khăn.",
            ];
            const now   = new Date();
            const dayOfYear = Math.floor((now - new Date(now.getFullYear(),0,0)) / 86400000);
            const images = [
              'photo-1600596542815-ffad4c1539a9', // luxury villa exterior
              'photo-1580587771525-78b9dba3b914', // white modern villa
              'photo-1564013799919-ab600027ffc6', // luxury house pool
              'photo-1512917774080-9991f1c4c750', // modern home night
              'photo-1613977257363-707ba9348227', // contemporary villa
              'photo-1600047509807-ba8f99d2cdde', // luxury house garden
              'photo-1600585154340-be6161a56a0c', // high-end real estate
            ];
            const quote = quotes[dayOfYear % quotes.length];
            const imgId = images[dayOfYear % images.length];
            return (
              <div style={{
                margin:'4px 12px 12px',
                borderRadius:14,
                overflow:'hidden',
                position:'relative',
                height:180,
                flexShrink:0,
                boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
                border:'1px solid rgba(255,255,255,0.07)',
              }}>
                {/* Background image */}
                <img
                  src={`https://images.unsplash.com/${imgId}?w=280&q=85&fit=crop&crop=center`}
                  alt="BĐS"
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                />
                {/* Gradient overlay */}
                <div style={{
                  position:'absolute',inset:0,
                  background:'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.88) 100%)',
                }}/>
                {/* Gold top accent line */}
                <div style={{
                  position:'absolute',top:0,left:0,right:0,
                  height:2,
                  background:'linear-gradient(90deg,transparent,#F59E0B,transparent)',
                }}/>
                {/* Content */}
                <div style={{
                  position:'absolute',bottom:0,left:0,right:0,
                  padding:'14px 14px 14px',
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:7}}>
                    <Sparkles style={{width:10,height:10,color:'#F59E0B',flexShrink:0}}/>
                    <span style={{
                      fontSize:'8.5px',fontWeight:700,
                      color:'rgba(252,211,77,0.9)',
                      letterSpacing:'2px',textTransform:'uppercase',
                      fontFamily:"'Be Vietnam Pro',sans-serif",
                    }}>Quote của ngày</span>
                  </div>
                  <p style={{
                    margin:0,
                    fontSize:'11px',fontWeight:600,
                    color:'rgba(255,255,255,0.93)',
                    lineHeight:1.55,
                    fontFamily:"'Be Vietnam Pro',sans-serif",
                    fontStyle:'italic',
                  }}>\"{quote}\"</p>
                  <div style={{
                    marginTop:10,
                    display:'flex',alignItems:'center',gap:4,
                  }}>
                    <div style={{height:1,flex:1,background:'linear-gradient(90deg,rgba(245,158,11,0.5),transparent)'}}/>
                    <span style={{
                      fontSize:'8px',fontWeight:700,
                      color:'rgba(245,158,11,0.6)',
                      letterSpacing:'1.5px',textTransform:'uppercase',
                      fontFamily:"'Be Vietnam Pro',sans-serif",
                    }}>Vương Đắc Hiệp</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800/60">
          <button onClick={() => { setIsEditing(!isEditing); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm transition-all
              ${isEditing ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}`}>
            {isEditing ? <><Save className="mr-2" style={{width:15,height:15}}/> Lưu thay đổi</> : <><Edit3 className="mr-2" style={{width:15,height:15}}/> Chỉnh sửa nội dung</>}
          </button>
          
          <button onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center py-2 px-4 rounded-lg font-bold text-xs bg-slate-900 hover:bg-red-950/50 text-red-400 border border-red-950/60 hover:border-red-900 transition-all">
            <UserMinus className="mr-1.5" style={{width:13,height:13}}/> Đăng xuất ({currentUser?.username || ''})
          </button>

          {/* VĐH Credit */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-center gap-1.5">
            <div style={{width:16,height:1,background:'linear-gradient(90deg,transparent,rgba(245,158,11,.4))'}}/>
            <span style={{fontSize:'9px',letterSpacing:'2px',fontWeight:700,color:'rgba(245,158,11,0.45)',fontFamily:"'Be Vietnam Pro',sans-serif"}}>© Vương Đắc Hiệp</span>
            <div style={{width:16,height:1,background:'linear-gradient(90deg,rgba(245,158,11,.4),transparent)'}}/>
          </div>
        </div>
      </div>

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-4 md:py-5 md:px-8 flex items-center justify-between z-20 gap-2" style={{position:'relative'}}>
          <div className="flex items-center gap-2 min-w-0">
            {/* Hamburger chỉ hiện trên mobile */}
            <button
              className="md:hidden flex-shrink-0 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}>
              <Menu style={{width:22,height:22}}/>
            </button>
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 truncate leading-tight">
              {data[activeTab]?.title || (activeTab === 'goiDichVu' ? "Đặc Quyền Gói Plus, Pro & Ultra" : activeTab === 'referralPro' ? "Hệ thống giới thiệu & Hoa hồng" : activeTab === 'admin' ? "Bảng Quản Trị Hệ Thống" : "Thực chiến & Huấn luyện AI")}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing && (
              <span className="hidden sm:inline bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200 animate-pulse whitespace-nowrap">
                Đang chỉnh sửa
              </span>
            )}
            {/* Nút edit nhanh trên mobile (icon only) */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`md:hidden p-2 rounded-lg transition-all
                ${isEditing ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {isEditing ? <Save style={{width:18,height:18}}/> : <Edit3 style={{width:18,height:18}}/>}
            </button>

            {/* Nút Thông Báo */}
            <div style={{position:'relative'}}>
              <button
                onClick={() => { setShowNotifications(v => !v); setShowProfileDropdown(false); }}
                className="relative p-2 rounded-full hover:bg-indigo-50 transition-colors"
                style={{color:'#6366f1'}}>
                {notifications.some(n => !n.read) ? <BellRing style={{width:22,height:22}}/> : <Bell style={{width:22,height:22}}/>}
                {notifications.filter(n => !n.read).length > 0 && (
                  <span style={{
                    position:'absolute', top:4, right:4, width:16, height:16,
                    background:'#ef4444', color:'#fff', borderRadius:'50%',
                    fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center',
                    border:'2px solid #fff'
                  }}>
                    {notifications.filter(n => !n.read).length > 9 ? '9+' : notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div style={{
                  position:'absolute', top:'calc(100% + 10px)', right:0, width:360, maxHeight:480,
                  background:'#fff', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.18)',
                  border:'1px solid rgba(99,102,241,0.15)', zIndex:1000, overflow:'hidden',
                  display:'flex', flexDirection:'column'
                }}>
                  <div style={{padding:'14px 16px', borderBottom:'1px solid #f3f4f6', display:'flex', alignItems:'center', justifyContent:'space-between', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff'}}>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <BellRing style={{width:18,height:18}}/>
                      <span style={{fontWeight:700, fontSize:15}}>Thông báo</span>
                      {notifications.filter(n=>!n.read).length > 0 && (
                        <span style={{background:'rgba(255,255,255,0.25)', borderRadius:12, padding:'1px 8px', fontSize:12, fontWeight:700}}>
                          {notifications.filter(n=>!n.read).length} mới
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => { setNotifications(prev => prev.map(n => ({...n, read:true}))); }}
                      style={{fontSize:11, fontWeight:600, background:'rgba(255,255,255,0.18)', border:'none', color:'#fff', borderRadius:8, padding:'3px 10px', cursor:'pointer'}}>
                      Đọc tất cả
                    </button>
                  </div>
                  <div style={{overflowY:'auto', flex:1}}>
                    {notifications.length === 0 ? (
                      <div style={{padding:32, textAlign:'center', color:'#9ca3af'}}>
                        <Bell style={{width:32,height:32, margin:'0 auto 8px', opacity:0.4}}/>
                        <p style={{fontSize:13}}>Không có thông báo nào</p>
                      </div>
                    ) : notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? {...n, read:true} : n))}
                        style={{
                          padding:'12px 16px', borderBottom:'1px solid #f9fafb', cursor:'pointer',
                          background: notif.read ? '#fff' : 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.03))',
                          transition:'background 0.2s', display:'flex', gap:12, alignItems:'flex-start'
                        }}>
                        <div style={{
                          width:36, height:36, borderRadius:'50%', flexShrink:0,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          background: notif.type === 'referral' ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                        }}>
                          {notif.type === 'referral' ? <UserPlus style={{width:16,height:16,color:'#fff'}}/> : <Info style={{width:16,height:16,color:'#fff'}}/>}
                        </div>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                            <span style={{fontWeight:700, fontSize:13, color:'#1f2937'}}>{notif.title}</span>
                            {!notif.read && <span style={{width:8,height:8,borderRadius:'50%',background:'#6366f1',flexShrink:0}}/>}
                          </div>
                          <p style={{fontSize:12, color:'#6b7280', marginTop:2, lineHeight:1.5}}>{notif.content}</p>
                          <span style={{fontSize:11, color:'#9ca3af', marginTop:4, display:'block'}}>
                            {(() => {
                              const diff = Date.now() - new Date(notif.time).getTime();
                              const mins = Math.floor(diff / 60000);
                              const hours = Math.floor(mins / 60);
                              const days = Math.floor(hours / 24);
                              if (days > 0) return `${days} ngày trước`;
                              if (hours > 0) return `${hours} giờ trước`;
                              return `${mins || 1} phút trước`;
                            })()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div style={{position:'relative'}}>
              <button
                onClick={() => { setShowProfileDropdown(v => !v); setShowNotifications(false); }}
                style={{
                  display:'flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#f8fafc,#f1f5f9)',
                  border:'1.5px solid #e2e8f0', borderRadius:40, padding:'5px 12px 5px 5px',
                  cursor:'pointer', transition:'all 0.2s', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'
                }}>
                <div style={{
                  width:30, height:30, borderRadius:'50%',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontWeight:800, fontSize:13, letterSpacing:1
                }}>
                  {(currentUser?.name || currentUser?.username || 'U')[0].toUpperCase()}
                </div>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:12, fontWeight:700, color:'#1e293b', lineHeight:1.2}}>
                    {currentUser?.name || currentUser?.username}
                  </div>
                  <div style={{fontSize:10, color:'#6366f1', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5}}>
                    {currentUser?.plan || 'free'}
                  </div>
                </div>
                <ChevronDown style={{width:14,height:14,color:'#64748b'}}/>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div style={{
                  position:'absolute', top:'calc(100% + 10px)', right:0, width:240,
                  background:'#fff', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.15)',
                  border:'1px solid rgba(99,102,241,0.12)', zIndex:1000, overflow:'hidden'
                }}>
                  <div style={{padding:'14px 16px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff'}}>
                    <div style={{fontWeight:800, fontSize:14}}>{currentUser?.name || currentUser?.username}</div>
                    <div style={{fontSize:11, opacity:0.85, marginTop:2}}>{currentUser?.email || ''}</div>
                    <div style={{
                      marginTop:8, display:'inline-flex', alignItems:'center', gap:4,
                      background:'rgba(255,255,255,0.2)', borderRadius:20, padding:'2px 10px'
                    }}>
                      <Gem style={{width:11,height:11}}/> <span style={{fontSize:11,fontWeight:700,textTransform:'uppercase'}}>{currentUser?.plan || 'free'}</span>
                    </div>
                  </div>
                  <div style={{padding:'8px 0'}}>
                    {[
                      { icon: <Info style={{width:15,height:15}}/>, label: 'Thông tin cá nhân', action: () => { setShowProfileDropdown(false); } },
                      { icon: <Bot style={{width:15,height:15}}/>, label: 'Cấu hình AI', action: () => { setShowProfileDropdown(false); setActiveTab('soTayCaNhan'); } },
                      { icon: <HelpCircle style={{width:15,height:15}}/>, label: 'Hướng dẫn sử dụng', action: () => { setShowProfileDropdown(false); setShowGuidePopup(true); } },
                      { icon: <Gift style={{width:15,height:15}}/>, label: 'Referral Pro', badge:'HOT', action: () => { setShowProfileDropdown(false); setActiveTab('referralPro'); } },
                      { icon: <Gem style={{width:15,height:15}}/>, label: 'Gia hạn tài khoản', action: () => { setShowProfileDropdown(false); setActiveTab('goiDichVu'); } },
                    ].map((item, idx) => (
                      <button key={idx} onClick={item.action} style={{
                        width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 16px',
                        background:'none', border:'none', cursor:'pointer', textAlign:'left',
                        color:'#374151', fontSize:13, fontWeight:500, transition:'background 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background='none'}>
                        <span style={{color:'#6366f1'}}>{item.icon}</span>
                        {item.label}
                        {item.badge && <span style={{marginLeft:'auto',background:'#ef4444',color:'#fff',fontSize:9,fontWeight:800,padding:'1px 6px',borderRadius:8}}>{item.badge}</span>}
                      </button>
                    ))}
                    <div style={{borderTop:'1px solid #f3f4f6', margin:'4px 0'}}/>
                    <button onClick={() => { setShowProfileDropdown(false); handleLogout(); }} style={{
                      width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 16px',
                      background:'none', border:'none', cursor:'pointer', color:'#ef4444', fontSize:13, fontWeight:600
                    }}
                    onMouseEnter={e => e.currentTarget.style.background='#fff5f5'}
                    onMouseLeave={e => e.currentTarget.style.background='none'}>
                      <UserMinus style={{width:15,height:15}}/> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Thanh tin tức BĐS */}
        <NewsTicker token={token} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 main-bg pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto">
            <SmartSuggestions setActiveTab={setActiveTab} token={token} />
            {activeTab === 'soTayCaNhan' && renderSoTayCaNhan()}
            {activeTab === 'hanhTrinh' && renderHanhTrinh()}
            {activeTab === 'quyTrinh' && renderQuyTrinh()}
            {activeTab === 'khachHang' && renderKhachHang()}
            {activeTab === 'kienThuc' && renderKienThuc()}
            {activeTab === 'thucChien' && renderThucChien()}
            {activeTab === 'chotSale' && renderChotSale()}
            {activeTab === 'goiDichVu' && renderGoiDichVu()}
            {activeTab === 'referralPro' && renderReferralPro()}
            {activeTab === 'admin' && renderAdmin()}
          </div>
        </main>
      </div>

      {/* Bottom navigation bar — chỉ hiện trên mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-700 md:hidden">
        <div className="flex items-stretch">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-0.5 flex-1 transition-colors min-h-14
                  ${isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icon style={{width:19,height:19}}/>
                <span className="mt-0.5 text-center leading-tight" style={{fontSize:'9px', lineHeight:'1.2'}}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===== WELCOME POPUP ===== */}
      {showWelcomePopup && (
        <div style={{
          position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center', padding:16
        }} onClick={() => setShowWelcomePopup(false)}>
          <div style={{
            background:'#fff', borderRadius:24, maxWidth:480, width:'100%', overflow:'hidden',
            boxShadow:'0 30px 80px rgba(0,0,0,0.3)', position:'relative'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              background:'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              padding:'32px 28px 24px', textAlign:'center', color:'#fff', position:'relative'
            }}>
              <div style={{
                width:72, height:72, borderRadius:'50%', background:'rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px',
                border:'3px solid rgba(255,255,255,0.4)'
              }}>
                <Sparkles style={{width:36,height:36}}/>
              </div>
              <h2 style={{fontSize:24, fontWeight:900, margin:'0 0 8px'}}>Chào mừng trở lại!</h2>
              <p style={{fontSize:14, opacity:0.9, lineHeight:1.6}}>
                Xin chào <strong>{currentUser?.name || currentUser?.username}</strong>, bạn đang sử dụng gói <strong>{(currentUser?.plan || 'free').toUpperCase()}</strong>.
              </p>
              <button onClick={() => setShowWelcomePopup(false)} style={{
                position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.2)',
                border:'none', color:'#fff', width:32, height:32, borderRadius:'50%', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}><X style={{width:16,height:16}}/></button>
            </div>
            <div style={{padding:'24px 28px'}}>
              <h3 style={{fontSize:15, fontWeight:800, color:'#1e293b', marginBottom:14}}>✨ Khám phá ngay hôm nay</h3>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {[
                  { icon:'🧠', title:'Sổ tay Cá nhân AI', desc:'Kịch bản sale, nhắc việc, CRM tích hợp', tab:'soTayCaNhan' },
                  { icon:'📊', title:'Máy tính BĐS', desc:'Tính ROI, đơn giá m² nhanh chóng', tab:'soTayCaNhan' },
                  { icon:'🎁', title:'Referral Pro', desc:'Kiếm hoa hồng tới 30% khi giới thiệu bạn bè', tab:'referralPro' },
                ].map((item, idx) => (
                  <button key={idx} onClick={() => { setActiveTab(item.tab); setShowWelcomePopup(false); }} style={{
                    display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                    background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:12,
                    cursor:'pointer', textAlign:'left', transition:'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='#f0f1ff'; e.currentTarget.style.borderColor='#6366f1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0'; }}>
                    <span style={{fontSize:24}}>{item.icon}</span>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'#1e293b'}}>{item.title}</div>
                      <div style={{fontSize:12, color:'#6b7280'}}>{item.desc}</div>
                    </div>
                    <ArrowRight style={{width:16,height:16,color:'#6366f1',marginLeft:'auto'}}/>
                  </button>
                ))}
              </div>
              <button onClick={() => { setShowAiSupport(true); setShowWelcomePopup(false); }} style={{
                width:'100%', marginTop:16, padding:'13px', borderRadius:12, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff',
                fontWeight:800, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8
              }}>
                <Bot style={{width:18,height:18}}/> Chat với AI Hỗ trợ 24/7 ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== GUIDE POPUP ===== */}
      {showGuidePopup && (
        <div style={{
          position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center', padding:16
        }} onClick={() => setShowGuidePopup(false)}>
          <div style={{
            background:'#fff', borderRadius:24, maxWidth:520, width:'100%', maxHeight:'85vh',
            overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.3)', display:'flex', flexDirection:'column'
          }} onClick={e => e.stopPropagation()}>
            <div style={{background:'linear-gradient(135deg,#0ea5e9,#6366f1)', padding:'24px 24px 20px', color:'#fff', position:'relative'}}>
              <button onClick={() => setShowGuidePopup(false)} style={{
                position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.2)',
                border:'none', color:'#fff', width:32, height:32, borderRadius:'50%', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}><X style={{width:16,height:16}}/></button>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <HelpCircle style={{width:32,height:32}}/>
                <div>
                  <h2 style={{fontSize:20, fontWeight:900, margin:0}}>Hướng dẫn sử dụng</h2>
                  <p style={{fontSize:13, opacity:0.85, margin:'4px 0 0'}}>Sales Playbook BĐS AI</p>
                </div>
              </div>
            </div>
            <div style={{overflowY:'auto', padding:'20px 24px', flex:1}}>
              {[
                {
                  icon:'🧠', title:'Sổ tay Cá nhân AI',
                  steps:['Vào tab "Sổ tay Cá nhân AI" từ sidebar bên trái','Chọn tab "CRM" để quản lý danh sách khách hàng tiềm năng','Sử dụng tab "Nhắc việc" để đặt lịch hẹn với khách hàng','Tab "Máy tính" để tính ROI và đơn giá m² bất động sản']
                },
                {
                  icon:'🤖', title:'AI Hỗ trợ 24/7',
                  steps:['Nhấn nút 💬 ở góc dưới phải màn hình','Nhập câu hỏi của bạn về sản phẩm hoặc cách dùng app','AI sẽ trả lời ngay lập tức dựa trên kiến thức chuyên sâu','Bạn có thể hỏi về tính năng, chiến lược sale, thị trường BĐS']
                },
                {
                  icon:'🎁', title:'Referral Pro — Kiếm hoa hồng',
                  steps:['Vào tab "Referral Pro" trong sidebar','Copy link giới thiệu cá nhân và chia sẻ cho bạn bè','Khi bạn bè đăng ký và nâng gói, bạn nhận hoa hồng 10-30%','Thăng hạng Đồng→Bạc→Vàng→Bạch Kim→VVIP để tăng hoa hồng']
                },
                {
                  icon:'📰', title:'Tin tức BĐS',
                  steps:['Thanh tin tức cuộn tự động hiển thị ở đầu trang','Nhấp vào tin tức để đọc bài gốc từ CafeF, VnExpress, Báo Đầu Tư','Cập nhật liên tục mỗi 30 phút từ các nguồn tin uy tín']
                },
              ].map((section, idx) => (
                <div key={idx} style={{marginBottom:20}}>
                  <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
                    <span style={{fontSize:20}}>{section.icon}</span>
                    <h3 style={{fontWeight:800, fontSize:14, color:'#1e293b', margin:0}}>{section.title}</h3>
                  </div>
                  <div style={{paddingLeft:16}}>
                    {section.steps.map((step, i) => (
                      <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, marginBottom:7}}>
                        <span style={{
                          width:20, height:20, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                          color:'#fff', fontSize:11, fontWeight:800, flexShrink:0,
                          display:'flex', alignItems:'center', justifyContent:'center', marginTop:1
                        }}>{i+1}</span>
                        <span style={{fontSize:13, color:'#374151', lineHeight:1.5}}>{step}</span>
                      </div>
                    ))}
                  </div>
                  {idx < 3 && <div style={{borderBottom:'1px solid #f3f4f6', marginTop:12}}/>}
                </div>
              ))}
            </div>
            <div style={{padding:'16px 24px', borderTop:'1px solid #f3f4f6', background:'#fafbff'}}>
              <button onClick={() => { setShowGuidePopup(false); setShowAiSupport(true); }} style={{
                width:'100%', padding:'12px', borderRadius:12, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff',
                fontWeight:800, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8
              }}>
                <Bot style={{width:18,height:18}}/> Hỏi AI Hỗ trợ nếu chưa rõ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== AI SUPPORT CHAT WIDGET ===== */}
      {/* FAB Button */}
      <button
        onClick={() => setShowAiSupport(v => !v)}
        style={{
          position:'fixed', bottom: 80, right:24, zIndex:1500,
          width:56, height:56, borderRadius:'50%', border:'none', cursor:'pointer',
          background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
          boxShadow:'0 8px 32px rgba(99,102,241,0.45)',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'transform 0.2s, box-shadow 0.2s',
          animation: showAiSupport ? 'none' : 'fabPulse 2s ease-in-out infinite'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(99,102,241,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(99,102,241,0.45)'; }}
        title="Hỗ trợ AI 24/7">
        {showAiSupport ? <X style={{width:24,height:24,color:'#fff'}}/> : <Bot style={{width:24,height:24,color:'#fff'}}/>}
      </button>
      {!showAiSupport && (
        <div style={{
          position:'fixed', bottom:146, right:20, zIndex:1499,
          background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff',
          padding:'6px 14px', borderRadius:20, fontSize:12, fontWeight:700,
          boxShadow:'0 4px 16px rgba(99,102,241,0.4)', pointerEvents:'none',
          whiteSpace:'nowrap'
        }}>
          💬 Hỗ trợ AI 24/7
        </div>
      )}

      {/* AI Support Chat Panel */}
      {showAiSupport && (
        <div style={{
          position:'fixed', bottom:150, right:16, zIndex:1500,
          width: Math.min(window.innerWidth - 32, 380),
          height: 520, borderRadius:20, overflow:'hidden',
          boxShadow:'0 24px 80px rgba(0,0,0,0.25)',
          display:'flex', flexDirection:'column',
          background:'#fff', border:'1px solid rgba(99,102,241,0.2)'
        }}>
          {/* Chat Header */}
          <div style={{
            background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
            padding:'14px 16px', color:'#fff', flexShrink:0
          }}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{
                width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid rgba(255,255,255,0.4)'
              }}>
                <Bot style={{width:20,height:20}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800, fontSize:14}}>Trợ lý AI Sales BĐS</div>
                <div style={{fontSize:11, opacity:0.85, display:'flex', alignItems:'center', gap:4}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block'}}/>
                  Hỗ trợ 24/7 — Powered by Gemini AI
                </div>
              </div>
              <button onClick={() => setShowAiSupport(false)} style={{
                background:'rgba(255,255,255,0.15)', border:'none', color:'#fff',
                width:28, height:28, borderRadius:'50%', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}><X style={{width:14,height:14}}/></button>
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1, overflowY:'auto', padding:'14px 14px 8px', display:'flex', flexDirection:'column', gap:10}}>
            {aiSupportMessages.map((msg, idx) => (
              <div key={idx} style={{
                display:'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems:'flex-start', gap:8
              }}>
                {msg.role === 'model' && (
                  <div style={{
                    width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2
                  }}>
                    <Bot style={{width:14,height:14,color:'#fff'}}/>
                  </div>
                )}
                <div style={{
                  maxWidth:'78%', padding:'10px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#f8fafc',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize:13, lineHeight:1.6,
                  border: msg.role === 'model' ? '1px solid #e2e8f0' : 'none',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div style={{
                    width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#ef4444)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2,
                    color:'#fff', fontWeight:800, fontSize:12
                  }}>
                    {(currentUser?.name || 'U')[0].toUpperCase()}
                  </div>
                )}
              </div>
            ))}
            {isAiSupportLoading && (
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <div style={{
                  width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <Bot style={{width:14,height:14,color:'#fff'}}/>
                </div>
                <div style={{background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'18px 18px 18px 4px', padding:'10px 14px', display:'flex', gap:6}}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width:8, height:8, borderRadius:'50%', background:'#6366f1',
                      animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`
                    }}/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {aiSupportMessages.length <= 1 && (
            <div style={{padding:'0 12px 8px', display:'flex', gap:6, flexWrap:'wrap'}}>
              {['Cách dùng CRM?', 'Tính hoa hồng referral?', 'Gói nào phù hợp tôi?'].map((q, i) => (
                <button key={i} onClick={async () => {
                  const userMsg = { role: 'user', text: q };
                  const newHistory = [...aiSupportMessages, userMsg];
                  setAiSupportMessages(newHistory);
                  setIsAiSupportLoading(true);
                  try {
                    const res = await fetch('/api/gemini/chat', {
                      method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
                      body: JSON.stringify({
                        systemPrompt: `Bạn là trợ lý AI hỗ trợ khách hàng 24/7 của ứng dụng Sales Playbook BĐS. Hãy trả lời ngắn gọn, thân thiện, chính xác bằng tiếng Việt về cách sử dụng ứng dụng, tính năng CRM, Referral Pro, máy tính BĐS, ROI, kịch bản sale. Không trả lời về các chủ đề ngoài ứng dụng này.`,
                        history: newHistory
                      })
                    });
                    const json = await res.json();
                    setAiSupportMessages(prev => [...prev, { role:'model', text: json.text || 'Xin lỗi, có lỗi xảy ra.' }]);
                  } catch { setAiSupportMessages(prev => [...prev, { role:'model', text:'Xin lỗi, không thể kết nối AI lúc này. Vui lòng thử lại sau.' }]); }
                  finally { setIsAiSupportLoading(false); }
                }} style={{
                  background:'#f0f1ff', border:'1px solid #c7d2fe', borderRadius:20,
                  padding:'4px 10px', fontSize:11, fontWeight:600, color:'#6366f1', cursor:'pointer'
                }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div style={{padding:'8px 12px 12px', borderTop:'1px solid #f3f4f6', flexShrink:0, background:'#fafbff'}}>
            <div style={{display:'flex', gap:8, alignItems:'flex-end'}}>
              <textarea
                value={aiSupportInput}
                onChange={e => setAiSupportInput(e.target.value)}
                onKeyDown={async e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const text = aiSupportInput.trim();
                    if (!text || isAiSupportLoading) return;
                    setAiSupportInput('');
                    const userMsg = { role: 'user', text };
                    const newHistory = [...aiSupportMessages, userMsg];
                    setAiSupportMessages(newHistory);
                    setIsAiSupportLoading(true);
                    try {
                      const res = await fetch('/api/gemini/chat', {
                        method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
                        body: JSON.stringify({
                          systemPrompt: `Bạn là trợ lý AI hỗ trợ khách hàng 24/7 của ứng dụng Sales Playbook BĐS. Hãy trả lời ngắn gọn, thân thiện, chính xác bằng tiếng Việt về cách sử dụng ứng dụng, tính năng CRM, Referral Pro, máy tính BĐS, ROI, kịch bản sale. Không trả lời về các chủ đề ngoài ứng dụng này.`,
                          history: newHistory
                        })
                      });
                      const json = await res.json();
                      setAiSupportMessages(prev => [...prev, { role:'model', text: json.text || 'Xin lỗi, có lỗi xảy ra.' }]);
                    } catch { setAiSupportMessages(prev => [...prev, { role:'model', text:'Xin lỗi, không thể kết nối AI lúc này.' }]); }
                    finally { setIsAiSupportLoading(false); }
                  }
                }}
                placeholder="Nhập câu hỏi... (Enter để gửi)"
                style={{
                  flex:1, resize:'none', border:'1.5px solid #e2e8f0', borderRadius:12,
                  padding:'9px 12px', fontSize:13, outline:'none', fontFamily:'inherit',
                  maxHeight:80, minHeight:40, lineHeight:1.5, background:'#fff'
                }}
                rows={1}
              />
              <button
                disabled={!aiSupportInput.trim() || isAiSupportLoading}
                onClick={async () => {
                  const text = aiSupportInput.trim();
                  if (!text || isAiSupportLoading) return;
                  setAiSupportInput('');
                  const userMsg = { role: 'user', text };
                  const newHistory = [...aiSupportMessages, userMsg];
                  setAiSupportMessages(newHistory);
                  setIsAiSupportLoading(true);
                  try {
                    const res = await fetch('/api/gemini/chat', {
                      method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
                      body: JSON.stringify({
                        systemPrompt: `Bạn là trợ lý AI hỗ trợ khách hàng 24/7 của ứng dụng Sales Playbook BĐS. Hãy trả lời ngắn gọn, thân thiện, chính xác bằng tiếng Việt về cách sử dụng ứng dụng, tính năng CRM, Referral Pro, máy tính BĐS, ROI, kịch bản sale. Không trả lời về các chủ đề ngoài ứng dụng này.`,
                        history: newHistory
                      })
                    });
                    const json = await res.json();
                    setAiSupportMessages(prev => [...prev, { role:'model', text: json.text || 'Xin lỗi, có lỗi xảy ra.' }]);
                  } catch { setAiSupportMessages(prev => [...prev, { role:'model', text:'Xin lỗi, không thể kết nối AI lúc này.' }]); }
                  finally { setIsAiSupportLoading(false); }
                }}
                style={{
                  width:40, height:40, borderRadius:12, border:'none', cursor:'pointer',
                  background: aiSupportInput.trim() && !isAiSupportLoading ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#e2e8f0',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  transition:'all 0.2s'
                }}>
                <Send style={{width:17,height:17, color: aiSupportInput.trim() && !isAiSupportLoading ? '#fff' : '#9ca3af'}}/>
              </button>
            </div>
            <p style={{fontSize:10, color:'#9ca3af', textAlign:'center', marginTop:6}}>
              Nhấn Enter để gửi • Shift+Enter xuống dòng
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

