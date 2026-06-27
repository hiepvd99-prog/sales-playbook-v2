export const defaultData = {
  hanhTrinh: {
    title: "Hành trình khách hàng — Trước khi tele",
    steps: [
      { id: 1, title: "Tên & Vị trí dự án", desc: "Địa chỉ chính xác, tọa độ trên bản đồ, khoảng cách đến trung tâm/tiện ích chính" },
      { id: 2, title: "Chủ đầu tư", desc: "Lịch sử phát triển, các dự án đã bàn giao, uy tín thương hiệu, năng lực tài chính" },
      { id: 3, title: "Tổng diện tích & số sản phẩm", desc: "Quy mô tổng thể, mật độ xây dựng, tỷ lệ cây xanh/tiện ích" },
      { id: 4, title: "Phân khu & số căn", desc: "Từng phân khu có bao nhiêu tòa, bao nhiêu căn, đặc điểm từng phân khu" },
      { id: 5, title: "Phong cách & kiến trúc", desc: "Phong cách thiết kế chủ đạo, vật liệu hoàn thiện, đặc điểm nhận diện" },
      { id: 6, title: "Đường nội khu & ngoại khu", desc: "Hạ tầng kết nối, cung đường di chuyển thực tế đến trung tâm/sân bay/KCN" },
      { id: 7, title: "Pháp lý dự án", desc: "Sổ đỏ/sổ hồng, tình trạng pháp lý hiện tại, tiến độ cấp phép, bảo lãnh ngân hàng" },
      { id: 8, title: "Giá bán & Chính sách ưu đãi", desc: "Giá từ-đến theo từng loại SP, chiết khấu, hỗ trợ lãi suất, quà tặng" },
      { id: 9, title: "Hỏi cảm nhận KH", desc: "Sau khi giới thiệu sơ bộ, dừng lại hỏi — đừng nói một mình 10 phút" },
      { id: 10, title: "Hỏi nhu cầu & mục đích", desc: "Để ở hay đầu tư? Ngân sách? Thời điểm dự kiến quyết định?" },
      { id: 11, title: "Tiện ích liên kề & hạ tầng", desc: "Bệnh viện, trường học, siêu thị, công viên trong bán kính 2km" },
      { id: 12, title: "Lắng nghe & hỏi đáp nhanh", desc: "Xử lý thắc mắc, tóm tắt lại nhu cầu KH, đề xuất bước tiếp theo" }
    ],
    contexts: [
      { title: "Tại dự án", desc: "Cho KH cảm nhận thực tế — dẫn đi, chỉ tay, kể chuyện bằng không gian. Không đọc brochure." },
      { title: "Tại công ty", desc: "Môi trường chuyên nghiệp — dùng màn hình, sơ đồ, sa bàn để thuyết phục." },
      { title: "Tại nhà KH", desc: "Thân mật, sâu hơn — KH dễ chia sẻ nhu cầu thật. Chú ý quan sát gia đình, ngôi nhà họ đang ở." },
      { title: "Trên xe", desc: "Đã bàn từ đây rồi — thời gian vàng để tạo mối quan hệ, kể chuyện, đặt câu hỏi khéo." },
      { title: "Online / Zalo", desc: "Nhắn tin phải khéo léo — ngắn gọn, có hook, kèm hình ảnh đẹp. Không spam brochure." },
      { title: "Bàn nhậu", desc: "Phải biết tửu lượng bàn — không ép mua mà tạo tin tưởng, thả nhẹ thông tin giá trị." }
    ]
  },
  quyTrinh: {
    title: "Quy trình tư vấn — 8 bước từ data đến chăm sóc",
    steps: [
      { step: 1, title: "Tiếp nhận Data / Nguồn khách hàng", desc: "Xây dựng thương hiệu cá nhân để tạo luồng KH chủ động tìm đến. Phân loại data: Lạnh - Ấm - Nóng." },
      { step: 2, title: "Gửi thông tin — Tạo ấn tượng đầu tiên", desc: "Tin nhắn ngắn, trực tiếp. Kết thúc bằng 1 câu hỏi. Không gửi 1 file tài liệu dày 50 trang." },
      { step: 3, title: "Telesale / Trao đổi — Khai thác nhu cầu", desc: "Xác định rõ mục đích đầu tư. Điều chỉnh phong cách nói chuyện theo từng kiểu KH." },
      { step: 4, title: "Hẹn gặp / Trải nghiệm dự án", desc: "Không bắt đầu bán ngay từ xe — phải giới thiệu 12 bước trực tiếp theo đúng quy trình." },
      { step: 5, title: "Lắng nghe — Phân tích — Tư vấn sản phẩm", desc: "Tư vấn = Hỏi và đáp. Không độc thoại. Phân tích theo trải nghiệm sống của KH." },
      { step: 6, title: "Xử lý từ chối — Chốt sale đúng thời điểm", desc: "Hiểu rõ lý do từ chối trước khi xử lý. Chốt khi KH đang vui vẻ, thiện chí." },
      { step: 7, title: "Đặt cọc — Ký HĐMB", desc: "Cạnh tranh không phải chỉ về sản phẩm — mà còn cạnh tranh ai bán cho KH sản phẩm đó." },
      { step: 8, title: "Chăm sóc sau bán — Khai thác & Bán thêm", desc: "Cam kết đồng hành dài hạn với KH: hỗ trợ pháp lý, thông tin thị trường, khai thác referral." }
    ],
    telesale: [
      { id: 1, title: "Kịch bản Data Lạnh (Chưa biết dự án)", script: "Chào anh/chị [Tên], em là [Tên] — chuyên viên tư vấn BĐS khu vực [X].\n\nEm vừa có thông tin về dự án [Tên dự án] — vị trí đẹp ngay [Mô tả ngắn]. Anh/chị có quan tâm đến hướng [để ở / đầu tư] không ạ?" },
      { id: 2, title: "Kịch bản Data Ấm (Đã nhận tài liệu)", script: "Chào anh/chị [Tên], hôm trước em có gửi thông tin dự án [Tên dự án].\n\nTrong các tài liệu em gửi, anh/chị đang quan tâm nhất đến vấn đề nào ạ? (Giá, Pháp lý, hay Vị trí?)" },
      { id: 3, title: "Kịch bản Chốt hẹn", script: "Để anh/chị dễ hình dung thực tế, [Thứ 7] hay [Chủ nhật] tuần này em mời anh/chị qua xem trực tiếp sa bàn dự án nhé. Anh/chị tiện khung giờ sáng hay chiều ạ?" }
    ]
  },
  khachHang: {
    title: "5 Kiểu khách hàng & 14 Lý do từ chối",
    types: [
      { type: "Có kinh nghiệm đầu tư", desc: "Hỏi thẳng, không vòng vo. Thích số liệu cụ thể. Tiếp cận: Thẳng thắn, minh bạch, sâu." },
      { type: "Chưa biết gì về BĐS", desc: "Cần thời gian & dẫn dắt. Hỏi nhiều. Khó thuyết phục ngay. Tiếp cận: Chăm sóc nhiệt tình, dẫn dắt từng bước." },
      { type: "Biết BĐS chưa đầu tư", desc: "Đắn đo, tính toán. Cẩn thận, sợ rủi ro. Cần thời gian. Tiếp cận: Kiên nhẫn, phân tích rõ, dẫn dắt." },
      { type: "KH theo xu hướng", desc: "Đang follow SP/thị trường. Dễ bị ảnh hưởng bởi đám đông. Tiếp cận: Tạo cảm giác hot, khan hiếm." },
      { type: "KH bị kéo đến", desc: "Không có nhu cầu thật. Khó convert. Tiếp cận: Tạo nhu cầu, đừng bán — hãy giáo dục trước." }
    ],
    rejections: [
      "Tài chính vượt khả năng đầu tư", "Kỳ vọng lợi nhuận quá cao", "Chưa hiểu rõ tiềm năng dự án",
      "Bị tác động bởi người khác", "Dự án xa, chưa rõ kỹ trường", "Lo lắng rủi ro pháp lý",
      "Đang follow SP/thị trường khác", "Không so sánh được với SP khác", "Không ấn tượng với người tư vấn",
      "Đòi hỏi điều kiện quá cao", "Đang tìm hiểu, chưa có nhu cầu thật", "Chưa rõ về giá trị tăng trưởng",
      "Quá nhiều sự lựa chọn so sánh", "Thiếu kiến thức, sợ đầu tư sai"
    ]
  },
  kienThuc: {
    title: "Kiến thức sản phẩm — Nền tảng để tư vấn có chiều sâu",
    productInfo: [
      "Chủ đầu tư — đơn vị vận hành", "Pháp lý dự án", "Vị trí dự án", "Phong cách, thiết kế",
      "Chất lượng xây dựng", "Kết nối hạ tầng, khu vực", "Tiện ích nội — ngoại khu", "Điểm nổi bật, khác biệt",
      "Giá trị sử dụng, khai thác", "Chính sách bán hàng, cam kết", "Tiềm năng dự án", "Quy hoạch tương lai"
    ],
    marketInfo: [
      "Vị trí và kết nối", "Quy hoạch tương lai", "Kinh tế đặc trưng", "Thời tiết, khí hậu",
      "GDP thu nhập trung bình", "Hạ tầng, địa danh nổi bật", "Mật độ dân số", "Tốc độ thay đổi hạ tầng",
      "Giá trị BĐS trước & hiện tại", "Thu hút vốn FDI", "Tiềm năng phát triển", "Hệ thống giao thông"
    ]
  },
  thucChien: {
    title: "Kỹ năng thực chiến — Vì sao tư vấn giỏi vẫn không bán được?",
    principles: [
      { title: "Tư vấn = Hỏi & Đáp", desc: "Mình hỏi + KH trả lời. Không độc thoại 1 chiều." },
      { title: "Bán = Bán trải nghiệm sống", desc: "Bán trải nghiệm sống thực tế, không chỉ bán thông tin. KH mua cảm xúc, mua giấc mơ." },
      { title: "Muốn bán hay -> Viết hay", desc: "Viết ra để học, để thuộc, để suy nghĩ. Viết kịch bản, phân tích, xử lý từ chối." }
    ],
    system: [
      "Viết ra từng thứ tự chi tiết của dự án",
      "Điền thành tích theo dự án",
      "Luyện tập mỗi ngày, quay video tự kiểm tra",
      "Dùng ChatGPT để viết bài hay hơn, làm giàu kịch bản",
      "Tạo ngân hàng câu hỏi từ KH thực tế"
    ]
  },
  chotSale: {
    title: "Chốt sale — Đọc tín hiệu, ra quyết định đúng lúc",
    signals: [
      "Hỏi nhiều và cảm xúc thiện chí", "Chủ động liên hệ lại với bạn", "Sau khi khảo sát & cảm nhận dự án",
      "Dành lời khen về dự án", "Hẹn gặp lần tiếp theo", "Nhờ bạn tư vấn & chọn căn"
    ],
    factors: [
      "Đúng NHU CẦU", "Đúng THỜI ĐIỂM", "Đúng TÀI CHÍNH",
      "Đúng CAM KẾT", "Đúng KỲ VỌNG", "Đúng GU SẢN PHẨM"
    ],
    values: [
      "Sự UY TÍN", "Sự KHÁC BIỆT", "Sự TẦM NHÌN", "GIÁ TRỊ SỐNG",
      "Sự LỢI NHUẬN", "CƠ HỘI", "Sự AN TOÀN", "Sự PHÁT TRIỂN"
    ]
  }
};
