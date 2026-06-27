# Hướng Dẫn Triển Khai Ứng Dụng Sales Playbook Lên Internet (Online Deployment Plan)

Tài liệu này cung cấp kế hoạch chi tiết từng bước để đưa ứng dụng Sales Playbook (Node.js/Express + React + Tailwind) chạy trực tuyến trên môi trường internet, kết nối tên miền riêng và bảo mật mã nguồn cùng API Key.

---

## Tổng Quan Kiến Trúc Triển Khai

Ứng dụng hiện tại là một ứng dụng web kết hợp (Full-stack Monorepo):
1. **Frontend (Client):** Được biên dịch thành các file tĩnh (HTML, JS, CSS) trong thư mục `/dist`.
2. **Backend (Server):** Chạy liên tục bằng Node.js (`server.js`) để phục vụ các file tĩnh ở frontend và làm proxy bảo mật trung gian xử lý các cuộc gọi tới Gemini API.

Do đó, ứng dụng cần được triển khai trên một nền tảng hỗ trợ **Node.js Hosting** chạy liên tục 24/7 (không sử dụng các dịch vụ hosting tĩnh thông thường như GitHub Pages hay Netlify).

---

## Quy Trình Triển Khai 4 Bước

### Bước 1: Chuẩn Bị Mã Nguồn & Đẩy Lên GitHub

Để triển khai lên các dịch vụ đám mây, cách tốt nhất và an toàn nhất là quản lý mã nguồn bằng Git và đẩy lên GitHub.

1. **Khởi tạo Git trong thư mục dự án:**
   Mở terminal tại thư mục dự án (`c:\Users\Admin\Downloads\Antigravity`) và chạy các lệnh:
   ```bash
   git init
   ```
2. **Tạo file `.gitignore` để bảo mật:**
   Đảm bảo các file nhạy cảm không bị đẩy lên internet công cộng. Tạo file `.gitignore` trong thư mục gốc với nội dung:
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   ```
3. **Đẩy mã nguồn lên GitHub:**
   * Truy cập [GitHub.com](https://github.com) và tạo một **Repository mới**.
   * **QUAN TRỌNG:** Chọn chế độ **Private** (Riêng tư) để bảo mật mã nguồn doanh nghiệp của bạn.
   * Liên kết và đẩy code lên bằng các lệnh:
     ```bash
     git add .
     git commit -m "Initial commit - Technical Transition Completed"
     git branch -M main
     git remote add origin <đường-dẫn-repository-github-của-bạn>
     git push -u origin main
     ```

---

### Bước 2: Triển Khai Lên Nền Tảng Cloud (Khuyến Nghị: Render.com)

Render.com là nền tảng đám mây hiện đại, tối ưu và rất dễ sử dụng để chạy ứng dụng Node.js miễn phí hoặc chi phí cực thấp.

1. **Đăng ký tài khoản:** Truy cập [Render.com](https://render.com) và đăng ký tài khoản bằng cách liên kết với tài khoản GitHub của bạn.
2. **Tạo Web Service mới:**
   * Trên Dashboard của Render, chọn **New +** -> **Web Service**.
   * Chọn kho lưu trữ GitHub (Repository) chứa dự án của bạn đã đẩy lên ở Bước 1.
3. **Cấu hình thông số chạy dự án:**
   * **Name:** Đặt tên dự án (ví dụ: `sales-playbook-app`).
   * **Environment:** Chọn `Node`.
   * **Region:** Chọn khu vực gần Việt Nam nhất (ví dụ: `Singapore` hoặc `Oregon`).
   * **Branch:** `main`.
   * **Build Command:** Lệnh biên dịch frontend:
     ```bash
     npm run build
     ```
   * **Start Command:** Lệnh khởi chạy backend server:
     ```bash
     npm start
     ```
   * **Instance Type:** Chọn gói `Free` (miễn phí) để thử nghiệm, hoặc gói `Starter` ($7/tháng) để có tốc độ chạy ổn định, không bị ngủ đông khi không có người truy cập.
4. **Cấu hình Biến Môi Trường (Bảo mật API Key):**
   * Chuyển sang tab **Environment** trong cấu hình Web Service trên Render.
   * Thêm biến môi trường sau:
     * `KEY:` `GEMINI_API_KEY`
     * `VALUE:` `[Nhập mã API Key của bạn tại đây]`
     * *Lưu ý:* Không cần nhập biến `PORT` vì hệ thống Render sẽ tự động gán cổng phù hợp, hoặc mặc định chạy theo cấu hình của `server.js`.
5. **Kích hoạt triển khai:** Nhấp vào **Deploy Web Service**. Render sẽ tự động tải mã nguồn, cài đặt dependencies, biên dịch và cấp cho bạn một địa chỉ truy cập miễn phí có dạng: `https://ten-du-an.onrender.com`.

---

### Bước 3: Mua & Cấu Hình Tên Miền Riêng (Custom Domain)

Sau khi ứng dụng đã chạy online ổn định với tên miền mặc định của Render, bạn có thể kết nối với tên miền thương hiệu riêng của mình.

1. **Mua tên miền:** Đăng ký tên miền tại các nhà cung cấp uy tín (như Tenten, Mắt Bão, Nhân Hòa, PA Việt Nam, Namecheap, GoDaddy).
2. **Thêm tên miền vào Render:**
   * Trong trang cấu hình Web Service trên Render, kéo xuống mục **Settings** -> **Custom Domains**.
   * Nhấp **Add Custom Domain** và nhập tên miền của bạn (ví dụ: `playbook.yourcompany.com` hoặc `yourdomain.com`).
3. **Cấu hình bản ghi DNS (Domain Name System):**
   Đăng nhập vào trang quản trị tên miền nơi bạn đã mua tên miền, tìm phần cấu hình bảng DNS và thêm bản ghi theo hướng dẫn của Render:
   * **Nếu sử dụng tên miền phụ (Subdomain - Khuyên dùng):** ví dụ `playbook.domain.com`
     * **Type:** `CNAME`
     * **Host/Name:** `playbook`
     * **Value/Target:** Địa chỉ mặc định Render cấp cho bạn (ví dụ: `sales-playbook-app.onrender.com`).
   * **Nếu sử dụng tên miền chính (Root domain):** ví dụ `yourdomain.com`
     * **Type:** `A`
     * **Host/Name:** `@`
     * **Value/IP Address:** Nhập địa chỉ IP do Render hiển thị trong hướng dẫn cấu hình của họ.
4. **Xác minh:** Chờ hệ thống DNS cập nhật (thường từ 5 phút đến tối đa 24 giờ). Render sẽ tự động cấp chứng chỉ SSL (HTTPS bảo mật) miễn phí cho tên miền riêng của bạn.

---

### Bước 4: Kiểm Tra & Nghiệm Thu Hệ Thống Online

Sau khi hoàn tất cấu hình, truy cập thử tên miền riêng của bạn trên trình duyệt để kiểm tra:
1. Giao diện tải nhanh, các chuyển động của thanh tin tức chạy chữ hoạt động mượt mà.
2. Bản tin bất động sản hiển thị đầy đủ tin tức cập nhật từ CafeF, VnExpress, Báo Đầu Tư và có thể click trực tiếp để đọc báo.
3. Thử nghiệm các tính năng AI (chấm điểm kịch bản, chat nhập vai Gym Sales, phân tích thương vụ) hoạt động trơn tru và trả kết quả chính xác.

---

## Phương Án Dự Phòng: Triển Khai Lên VPS Linux Riêng

Nếu lượng người dùng truy cập lớn (hàng trăm nhân viên cùng lúc) hoặc bạn muốn đóng gói bán thương mại dưới dạng sản phẩm độc lập (SaaS) có tính bảo mật cao nhất, bạn nên thuê một VPS riêng (Ubuntu Server):

1. **Chuẩn bị máy chủ:** Thuê VPS từ Vietnix, Tencent Cloud, DigitalOcean hoặc Vultr (cấu hình tối thiểu: 1 vCPU, 2GB RAM).
2. **Cài đặt môi trường:** Cài đặt Node.js (phiên bản >= 20), Git và trình quản lý tiến trình chạy ngầm PM2:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm git
   sudo npm install -g pm2
   ```
3. **Tải mã nguồn và cài đặt:**
   ```bash
   git clone <đường-dẫn-repo-private>
   cd Antigravity
   npm install
   npm run build
   ```
4. **Cấu hình bảo mật:**
   Tạo file `.env` trên VPS và nhập khóa bảo mật:
   ```bash
   nano .env
   # Nhập:
   # PORT=3000
   # GEMINI_API_KEY=AIzaSy...
   ```
5. **Khởi chạy ứng dụng chạy ngầm bằng PM2:**
   ```bash
   pm2 start server.js --name "sales-playbook"
   pm2 startup
   pm2 save
   ```
6. **Cài đặt Nginx làm Reverse Proxy & Cấp SSL miễn phí:**
   Cài đặt Nginx để chuyển tiếp các cổng truy cập từ cổng 80/443 sang cổng 3000 của Node.js và sử dụng `Certbot` để cấp SSL bảo mật HTTPS miễn phí từ Let's Encrypt.
