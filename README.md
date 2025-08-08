# 🎥 Gemini Video Analyzer

Ứng dụng web phân tích video YouTube sử dụng Google Gemini AI với kiến trúc 3 tầng: ReactJS Frontend, NodeJS Backend Proxy, và Flask API.

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ReactJS       │    │   NodeJS        │    │   Flask API     │
│   Frontend      │───▶│   Backend       │───▶│   (gemini.py)   │
│   (Port 3000)   │    │   (Port 3001)   │    │   (Port 5000)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Cách chạy toàn bộ hệ thống

### 1. Chạy Flask API (gemini.py)
```bash
# Cài đặt Python dependencies (nếu chưa có)
& "C:\Users\NganHa\AppData\Local\Programs\Python\Python312\python.exe" -m pip install flask requests

# Chạy Flask API
& "C:\Users\NganHa\AppData\Local\Programs\Python\Python312\python.exe" gemini.py
```
Flask API sẽ chạy trên http://localhost:5000

### 2. Chạy Backend NodeJS Proxy
```bash
cd backend
npm install
npm start
```
Backend sẽ chạy trên http://localhost:3001

### 3. Chạy Frontend ReactJS
```bash
cd frontend
npm install
npm start
```
Frontend sẽ chạy trên http://localhost:3000

## 📁 Cấu trúc project

```
gemini-video-analyzer/
├── gemini.py              # Flask API với Gemini AI
├── backend/               # NodeJS Proxy Server
│   ├── index.js
│   ├── package.json
│   └── README.md
├── frontend/              # ReactJS Frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md              # File này
```

## 🎯 Tính năng

### Frontend (ReactJS)
- ✅ Giao diện đẹp và modern với gradient background
- ✅ Form nhập URL video YouTube
- ✅ Loading state với spinner animation
- ✅ Hiển thị kết quả phân tích chi tiết
- ✅ Responsive design cho mobile
- ✅ Real-time error handling

### Backend (NodeJS)
- ✅ Proxy server để forward requests
- ✅ CORS handling
- ✅ Error handling và logging
- ✅ Health check endpoint

### API (Flask + Gemini)
- ✅ Tích hợp Google Gemini AI
- ✅ Phân tích video YouTube chi tiết
- ✅ Trả về kết quả có cấu trúc JSON
- ✅ Prompt engineering cho tiếng Việt

## 🔧 Yêu cầu hệ thống

- **Python 3.12+** với Flask và requests
- **Node.js** với npm
- **Google Gemini API Key** (đã có trong gemini.py)

## 📖 Cách sử dụng

1. **Mở trình duyệt** và truy cập http://localhost:3000
2. **Nhập URL video YouTube** vào form
3. **Nhấn nút "Phân tích Video"**
4. **Chờ kết quả** từ AI (có thể mất 10-30 giây)
5. **Xem kết quả** với timestamp và nội dung chi tiết

## 🛠️ Development

### Test Backend
```bash
# Health check
curl http://localhost:3001/health

# Test analyze endpoint
curl -X POST http://localhost:3001/analyze \
  -H "Content-Type: application/json" \
  -d '{"videoUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

### Test Flask API
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"videoUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

## 🎨 Screenshots

Ứng dụng có giao diện đẹp với:
- Gradient background tím-xanh
- Glass morphism effect
- Modern button design
- Responsive layout
- Loading animations

## 🔒 Bảo mật

- API key được lưu trong gemini.py (nên move ra environment variables cho production)
- CORS được cấu hình cho development
- Input validation trên cả frontend và backend

## 📝 License

MIT License - Tự do sử dụng và modify.
