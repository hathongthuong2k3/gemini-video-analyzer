# Backend NodeJS Proxy Server

Backend proxy server để forward request từ frontend ReactJS đến Flask API (gemini.py).

## Cài đặt

```bash
npm install
```

## Chạy server

```bash
npm start
```

Server sẽ chạy trên port 3001.

## Endpoints

- `POST /analyze` - Forward request đến Flask API để phân tích video
- `GET /health` - Health check endpoint

## Yêu cầu

- Flask API (gemini.py) phải đang chạy trên port 5000
- Node.js và npm đã được cài đặt

## Cấu trúc

```
backend/
├── index.js          # Main server file
├── package.json      # Dependencies và scripts
└── README.md         # Hướng dẫn này
```
