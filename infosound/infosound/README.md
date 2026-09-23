# InfoSound

Giao diện frontend cho một nền tảng chia sẻ và nghe nhạc cộng đồng, viết bằng **ReactJS** (Vite + React Router).
Bài tập thực hành 1, học phần Lập trình Web (INT1434).

Điểm nhấn của giao diện là **dạng sóng tương tác**: bấm vào dạng sóng để tua, di chuột để xem trước thời điểm,
và bình luận của người nghe được gắn theo từng giây, hiện thành các chấm vàng dưới dạng sóng.

## Chạy dự án

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # build bản production vào thư mục dist/
```

Yêu cầu Node.js 20 trở lên.

## Các trang

| # | Trang | Đường dẫn | Nội dung chính |
|---|-------|-----------|----------------|
| 1 | Trang chủ | `/` | Bài nổi bật với dạng sóng lớn, bảng xếp hạng lọc theo thể loại, thể loại, playlist, nghệ sĩ |
| 2 | Bảng tin | `/feed` | Bài đăng và đăng lại từ người đang theo dõi, gợi ý theo dõi, nghe gần đây |
| 3 | Tìm kiếm | `/search?q=` | Tìm không dấu, lọc thể loại, tab Bài hát / Nghệ sĩ / Playlist, trạng thái trống |
| 4 | Chi tiết bài hát | `/track/:id` | Dạng sóng có bình luận theo thời gian, viết bình luận tại giây đang nghe, bài liên quan |
| 5 | Hồ sơ nghệ sĩ | `/artist/:id` | Ảnh bìa dạng sóng, thống kê, theo dõi, tab bài hát / nổi bật / playlist / đăng lại |
| 6 | Playlist | `/playlist/:id` | Phát tất cả, trộn bài, lưu vào thư viện, danh sách bài |
| 7 | Thư viện | `/library` | Tổng quan, đã thích, playlist đã lưu, đang theo dõi, lịch sử nghe |
| 8 | Tải lên | `/upload` | Kéo thả tệp, kiểm tra định dạng và dung lượng, biểu mẫu thông tin bài hát |
| 9 | Đăng nhập / Đăng ký | `/auth` | Chuyển đổi hai chế độ, kiểm tra dữ liệu nhập, ẩn hiện mật khẩu |
| 10 | Cài đặt | `/settings` | Hồ sơ, giao diện sáng / tối / theo hệ thống, thông báo, quyền riêng tư |
| + | Trang 404 | bất kỳ | Đường dẫn không tồn tại |

## Cấu trúc thư mục

```
src/
  components/   Các thành phần dùng lại: Header, PlayerBar, Waveform, TrackRow, TrackTile, ...
  context/      PlayerContext (trình phát giả lập), LibraryContext (thích, theo dõi, giao diện)
  data/         mock.js: dữ liệu giả lập (nghệ sĩ, bài hát, playlist, bình luận)
  pages/        10 trang + NotFound
  styles/       tokens.css (màu, font, bo góc), base.css, components.css, pages.css
  utils/        format.js: định dạng thời gian, số lượt nghe, sinh dạng sóng theo seed
```

## Ghi chú kỹ thuật

- **Trình phát giả lập**: không phát âm thanh thật, tiến độ chạy theo `setInterval` để dạng sóng và thanh phát phản hồi như thật.
- **Ảnh bìa và dạng sóng** được sinh từ id bằng bộ sinh số ngẫu nhiên có seed, nên không cần ảnh bên ngoài và luôn giống nhau mỗi lần tải.
- **Trạng thái người dùng** (bài đã thích, nghệ sĩ đang theo dõi, chế độ sáng tối) lưu trong `localStorage`.
- Dùng `HashRouter` để deploy lên GitHub Pages không bị lỗi 404 khi tải lại trang.
- Responsive từ điện thoại (390px) đến desktop, có điều hướng bằng bàn phím và tôn trọng `prefers-reduced-motion`.
- Nghệ sĩ và bài hát là EDM có thật (Martin Garrix, Kygo, Gryffin, DEAMN, Alan Walker, Avicii, ILLENIUM, Zedd); lượt nghe, lượt thích là số giả lập. Người dùng demo: Chử Đức Anh.

## Thiết kế

- Màu: xanh ultramarine `#2E3BFF` cho tín hiệu (đang phát, nút chính), vàng băng cassette `#FFC53D` cho bình luận và điểm nhấn, nền xám lam `#ECEEF6`.
- Font: Bricolage Grotesque cho tiêu đề, Be Vietnam Pro cho nội dung.
- Bố cục tham khảo nhiều mẫu thiết kế nền tảng âm nhạc trên Figma Community và các dịch vụ nghe nhạc trực tuyến, sau đó thiết kế lại với nhận diện riêng.
