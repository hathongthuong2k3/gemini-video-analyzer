# Frontend ReactJS - Gemini Video Analyzer

Frontend ReactJS cho ứng dụng phân tích video YouTube sử dụng Google Gemini AI.

## Tính năng

- 🎥 Giao diện đẹp và modern
- 📝 Form nhập URL video YouTube
- 🔄 Loading state với spinner
- 📊 Hiển thị kết quả phân tích chi tiết
- 📱 Responsive design cho mobile
- ⚡ Real-time error handling

## Cài đặt

```bash
npm install
```

## Chạy development server

```bash
npm start
```

Ứng dụng sẽ chạy trên http://localhost:3000

## Build cho production

```bash
npm run build
```

## Yêu cầu

- Backend NodeJS phải đang chạy trên port 3001
- Flask API (gemini.py) phải đang chạy trên port 5000

## Cấu trúc

```
frontend/
├── src/
│   ├── App.js          # Component chính
│   ├── App.css         # Styles
│   └── index.js        # Entry point
├── public/             # Static files
└── package.json        # Dependencies
```

## Cách sử dụng

1. Nhập URL video YouTube vào form
2. Nhấn nút "Phân tích Video"
3. Chờ kết quả phân tích từ AI
4. Xem kết quả chi tiết với timestamp và nội dung
