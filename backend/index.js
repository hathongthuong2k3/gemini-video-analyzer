const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration cho production
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://gemini-video-analyzer-r13j.vercel.app',
  'https://gemini-video-analyzer.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Proxy endpoint để forward request đến Flask API
app.post('/analyze', async (req, res) => {
    try {
        const { videoUrl, apiKey } = req.body;
        
        if (!videoUrl) {
            return res.status(400).json({ error: 'videoUrl is required' });
        }

        if (!apiKey) {
            return res.status(400).json({ error: 'apiKey is required' });
        }

        // Sử dụng environment variable cho Flask API URL
        const flaskUrl = process.env.FLASK_API_URL || 'http://localhost:5000';
        
        // Forward request đến Flask API
        const flaskResponse = await axios.post(`${flaskUrl}/analyze`, {
            videoUrl: videoUrl,
            apiKey: apiKey
        });

        // Trả về kết quả từ Flask API
        res.json(flaskResponse.data);
        
    } catch (error) {
        console.error('Error forwarding request to Flask API:', error.message);
        
        if (error.response) {
            // Flask API trả về lỗi
            res.status(error.response.status).json({
                error: error.response.data.error || 'Flask API error'
            });
        } else {
            // Lỗi kết nối đến Flask API
            res.status(500).json({
                error: 'Cannot connect to Flask API. Make sure Flask server is running.'
            });
        }
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'NodeJS proxy server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`NodeJS proxy server running on port ${PORT}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`Flask API URL: ${process.env.FLASK_API_URL || 'http://localhost:5000'}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});
