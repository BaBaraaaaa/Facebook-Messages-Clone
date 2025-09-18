# Facebook Messages Clone

Dự án này là một ứng dụng chat realtime mô phỏng Facebook Messenger, gồm 2 phần:
- **backend/**: Node.js, Express, MongoDB, Socket.IO
- **frontend/**: React, Redux Toolkit, Material UI, Vite

## 1. Chức năng chính
- Đăng ký, đăng nhập, xác thực JWT
- Tìm kiếm, thêm bạn bè, tạo cuộc trò chuyện nhóm/cá nhân
- Gửi/nhận tin nhắn realtime (Socket.IO)
- Hiển thị danh sách cuộc trò chuyện, tin nhắn, trạng thái online
- Thông báo số tin nhắn chưa đọc
- Chỉnh sửa trang cá nhân, đăng xuất

## 2. Cấu trúc thư mục
```
backend/
  controllers/      // Xử lý logic API
  models/           // Mongoose models
  routes/           // Định nghĩa API
  sockets/          // Socket.IO server
  middlewares/      // Xác thực, bảo vệ route
  services/         // Logic nghiệp vụ
  utils/            // Tiện ích chung
  config/           // Kết nối DB, cấu hình
  server.ts         // Điểm khởi động server
frontend/
  src/
    components/     // UI components (ChatList, MessageList...)
    pages/          // Các trang (Login, Chat...)
    redux/          // Redux slices, store
    services/       // Gọi API
    layouts/        // Layout tổng thể
    router/         // Định tuyến React Router
    types/          // Định nghĩa type TS
    validation/     // Validate form
  public/           // Ảnh, favicon
  index.html, main.tsx, ...
```

## 3. Cài đặt & chạy thử
### Backend
```bash
cd backend
npm install
npm run dev
```
- Mặc định chạy ở http://localhost:5000
- Cần MongoDB (có thể dùng local hoặc Atlas)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
- Mặc định chạy ở http://localhost:5173

## 4. Công nghệ sử dụng
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT
- **Frontend:** React, Redux Toolkit, Material UI, Vite, Axios

## 5. Ghi chú
- Để chat realtime, cần chạy cả backend và frontend đồng thời.
- Cấu hình biến môi trường backend: `.env` (MONGO_URI, JWT_SECRET...)
- Có thể mở rộng thêm: gửi file, emoji, thông báo trình duyệt, ...

## 6. Tác giả
- Facebook Messages Clone - 2025
- Dev: BaBaraaaaa
