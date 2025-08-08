# 🚀 Deployment Guide - Gemini Video Analyzer

Hướng dẫn deploy ứng dụng lên cloud services.

## 📋 Prerequisites

- GitHub account
- Vercel account (miễn phí)
- Railway account (miễn phí) hoặc Render account
- Google Gemini API Key

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Railway       │
│   Frontend      │───▶│   Backend       │───▶│   Flask API     │
│   (ReactJS)     │    │   (NodeJS)      │    │   (Python)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Step 1: Deploy Flask API (Python)

### Option A: Railway (Recommended)

1. **Tạo account Railway**
   - Truy cập: https://railway.app
   - Đăng ký với GitHub

2. **Deploy Flask API**
   ```bash
   # Fork/clone repository
   git clone https://github.com/your-username/gemini-video-analyzer.git
   cd gemini-video-analyzer
   
   # Push to GitHub
   git add .
   git commit -m "Add deployment config"
   git push origin main
   ```

3. **Railway Dashboard**
   - Tạo New Project
   - Chọn "Deploy from GitHub repo"
   - Chọn repository
   - Railway sẽ tự động detect Python và deploy

4. **Environment Variables**
   - Thêm `PORT=5000` (tự động)
   - Thêm `FRONTEND_URL=https://your-frontend.vercel.app`

5. **Get Flask API URL**
   - Railway sẽ cung cấp URL như: `https://your-app.railway.app`

### Option B: Render

1. **Tạo account Render**
   - Truy cập: https://render.com
   - Đăng ký với GitHub

2. **Deploy Web Service**
   - New Web Service
   - Connect GitHub repository
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python gemini.py`

## 🎯 Step 2: Deploy Backend NodeJS

### Railway (Recommended)

1. **Tạo new service trong Railway project**
   - Add Service → GitHub Repo
   - Chọn thư mục `backend`

2. **Environment Variables**
   ```
   PORT=3001
   FLASK_API_URL=https://your-flask-app.railway.app
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Get Backend URL**
   - URL sẽ là: `https://your-backend.railway.app`

## 🎯 Step 3: Deploy Frontend ReactJS

### Vercel (Recommended)

1. **Tạo account Vercel**
   - Truy cập: https://vercel.com
   - Đăng ký với GitHub

2. **Import Project**
   - New Project
   - Import Git Repository
   - Chọn repository
   - Framework Preset: Create React App

3. **Environment Variables**
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```

4. **Deploy**
   - Vercel sẽ tự động build và deploy
   - URL sẽ là: `https://your-app.vercel.app`

## 🔧 Configuration

### Frontend (.env.local)
```bash
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

### Backend (Railway Environment Variables)
```bash
PORT=3001
FLASK_API_URL=https://your-flask-app.railway.app
FRONTEND_URL=https://your-frontend.vercel.app
```

### Flask API (Railway Environment Variables)
```bash
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

## 🧪 Testing

### Test Flask API
```bash
curl https://your-flask-app.railway.app/health
```

### Test Backend
```bash
curl https://your-backend.railway.app/health
```

### Test Frontend
- Truy cập: https://your-frontend.vercel.app
- Nhập API Key và URL video để test

## 🔒 Security Notes

1. **API Keys**
   - Không commit API keys vào code
   - Sử dụng environment variables
   - Rotate keys regularly

2. **CORS**
   - Đã cấu hình CORS cho production
   - Chỉ cho phép frontend domain

3. **Rate Limiting**
   - Consider adding rate limiting for production
   - Monitor API usage

## 📊 Monitoring

### Railway Dashboard
- Monitor logs
- Check resource usage
- View deployments

### Vercel Dashboard
- Monitor performance
- Check deployments
- View analytics

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL environment variable
   - Ensure CORS is properly configured

2. **Connection Errors**
   - Verify all URLs are correct
   - Check if services are running

3. **Build Errors**
   - Check requirements.txt
   - Verify Node.js version

### Logs
```bash
# Railway logs
railway logs

# Vercel logs
vercel logs
```

## 📈 Scaling

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month
- **Railway**: $5 credit/month
- **Render**: 750 hours/month

### Upgrade Options
- **Vercel Pro**: $20/month
- **Railway**: Pay-as-you-use
- **Render**: $7/month

## 🎉 Success!

Sau khi deploy thành công:
1. Frontend: https://your-app.vercel.app
2. Backend: https://your-backend.railway.app  
3. Flask API: https://your-flask-app.railway.app

Truy cập frontend URL và test ứng dụng!
