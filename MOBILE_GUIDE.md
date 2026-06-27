# Hướng Dẫn Cài Đặt và Sử Dụng Trên Điện Thoại Di Động

Ứng dụng **Sales Playbook** đã được tối ưu hóa giao diện di động (Mobile Responsive) toàn diện và hỗ trợ công nghệ **PWA (Progressive Web App)**. Bạn có thể dễ dàng truy cập, sử dụng và cài đặt ứng dụng thành một "App" độc lập chạy trên cả điện thoại iPhone (iOS) và Android.

Dưới đây là hướng dẫn chi tiết từng bước thực hiện.

---

## 1. Cách Truy Cập Vào Ứng Dụng Từ Điện Thoại

Có hai cách để truy cập ứng dụng trên điện thoại di động tùy thuộc vào việc bạn đang chạy thử nghiệm (Local) hay đã đưa lên Internet (Production):

### Cách A: Truy cập chạy thử tại nhà (Cùng mạng Wi-Fi)
Áp dụng khi máy chủ (server) đang chạy trên máy tính của bạn và điện thoại kết nối chung một mạng Wi-Fi với máy tính đó.

1. **Tìm địa chỉ IP của máy tính:**
   - Trên máy tính, mở cửa sổ **PowerShell** hoặc **Command Prompt**.
   - Gõ lệnh: `ipconfig` rồi nhấn **Enter**.
   - Tìm dòng **`IPv4 Address`** thuộc mục mạng Wi-Fi hoặc Ethernet đang kết nối (thường có dạng `192.168.1.X` hoặc `10.0.0.X`, ví dụ: `192.168.1.15`).
2. **Truy cập từ điện thoại:**
   - Đảm bảo điện thoại đã kết nối vào cùng mạng Wi-Fi với máy tính.
   - Mở trình duyệt web trên điện thoại (Safari trên iPhone hoặc Chrome trên Android).
   - Gõ vào thanh địa chỉ: `http://<Địa_chỉ_IP_vừa_tìm>:3000` (Ví dụ: `http://192.168.1.15:3000`).

### Cách B: Truy cập trực tuyến (Khi đã triển khai lên mạng)
Áp dụng sau khi bạn đã mua tên miền và triển khai mã nguồn lên các dịch vụ hosting (như Render, Railway hoặc VPS) theo tài liệu hướng dẫn [DEPLOYMENT_PLAN.md](file:///c:/Users/Admin/Downloads/Antigravity/DEPLOYMENT_PLAN.md).

- Mở trình duyệt web trên điện thoại của bạn.
- Gõ trực tiếp địa chỉ tên miền của bạn (Ví dụ: `https://camnangsalesbds.com`).
- Hệ thống hoạt động trực tuyến 24/7 giúp bạn làm việc mọi lúc mọi nơi.

---

## 2. Hướng Dẫn Cài Đặt Thành "App" Trên Màn Hình Điện Thoại (PWA)

Để không phải gõ lại địa chỉ mỗi lần sử dụng và giúp ứng dụng hiển thị toàn màn hình (không có thanh địa chỉ của trình duyệt web), bạn hãy cài đặt ứng dụng theo hướng dẫn sau:

### Hướng dẫn dành cho điện thoại iPhone (iOS - Trình duyệt Safari)

1. Mở trình duyệt **Safari** và truy cập vào đường dẫn ứng dụng Sales Playbook của bạn.
2. Nhấn vào nút **Chia sẻ (Share)** ở thanh công cụ phía dưới màn hình (biểu tượng hình vuông có mũi tên chỉ lên).
3. Cuộn danh sách menu xuống phía dưới và nhấp chọn dòng **Thêm vào MH chính (Add to Home Screen)**.
4. Bạn có thể đổi tên hiển thị của ứng dụng (ví dụ: `Sales Playbook`) rồi nhấn nút **Thêm (Add)** ở góc trên bên phải.
5. Quay lại màn hình chính của iPhone, bạn sẽ thấy biểu tượng ứng dụng xuất hiện. Mỗi lần sử dụng, bạn chỉ cần nhấp vào biểu tượng này để mở ứng dụng ở chế độ toàn màn hình.

### Hướng dẫn dành cho điện thoại Android (Trình duyệt Google Chrome)

1. Mở trình duyệt **Chrome** và truy cập vào đường dẫn ứng dụng Sales Playbook của bạn.
2. Nhấn vào biểu tượng **3 dấu chấm đứng** ở góc trên bên phải màn hình.
3. Nhấp chọn dòng **Cài đặt ứng dụng (Install app)** hoặc **Thêm vào màn hình chính (Add to Home Screen)**.
4. Một hộp thoại xác nhận sẽ hiện ra, bạn nhấn **Cài đặt (Install)** hoặc **Thêm**.
5. Biểu tượng ứng dụng sẽ xuất hiện trên màn hình chính của điện thoại. Khi nhấp mở, ứng dụng sẽ hoạt động độc lập giống như một ứng dụng tải từ CH Play.

---

## 3. Các Tính Năng Đã Tối Ưu Cho Trải Nghiệm Di Động

Giao diện ứng dụng được tinh chỉnh tỉ mỉ để mang lại trải nghiệm mượt mà nhất trên màn hình cảm ứng:
* **Thanh điều hướng nhanh (Bottom Navigation):** Trên phiên bản di động, menu điều hướng sẽ chuyển xuống dưới cùng màn hình dạng tab bar giống như các ứng dụng di động phổ biến, giúp bạn dễ dàng chạm chuyển tab bằng một ngón tay.
* **Hộp thoại VietQR tự động:** Khi cần nâng cấp tài khoản trên điện thoại, mã QR thanh toán động sẽ tự hiển thị sắc nét. Bạn chỉ cần nhấn nút **Sao chép** số tài khoản hoặc nội dung chuyển khoản để dán vào ứng dụng ngân hàng mà không cần phải ghi nhớ hay nhập tay.
* **Phòng tập Gym Sales di động:** Bạn có thể trò chuyện, nhập câu thoại phản hồi trực tiếp với khách hàng AI thông qua bàn phím điện thoại một cách nhanh chóng và trực quan.
* **Sao chép kịch bản 1 chạm:** Mọi kết quả phản hồi từ trợ lý AI đều tích hợp sẵn nút sao chép nhanh để bạn gửi trực tiếp cho khách hàng qua Zalo/Viber trên điện thoại.
