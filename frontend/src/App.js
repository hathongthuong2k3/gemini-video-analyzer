import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

// Sử dụng environment variable hoặc fallback về localhost
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleRevealDown = (e) => {
    e.preventDefault();
    setIsApiKeyVisible(true);
  };

  const handleRevealUp = (e) => {
    e.preventDefault();
    setIsApiKeyVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Vui lòng nhập Gemini API Key');
      return;
    }

    if (!videoUrl.trim()) {
      setError('Vui lòng nhập URL video YouTube');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/analyze`, {
        videoUrl: videoUrl.trim(),
        apiKey: apiKey.trim()
      });

      setResult(response.data.result);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Có lỗi xảy ra khi phân tích video');
    } finally {
      setIsLoading(false);
    }
  };

  const formatResult = (resultText) => {
    try {
      // Thử parse JSON nếu có
      const jsonMatch = resultText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1]);
        return jsonData;
      }
      return resultText;
    } catch (e) {
      return resultText;
    }
  };

  const renderResult = (result) => {
    const formattedResult = formatResult(result);
    
    if (Array.isArray(formattedResult)) {
      return (
        <div className="result-container">
          <h3>Kết quả phân tích video:</h3>
          {formattedResult.map((item, index) => (
            <div key={index} className="result-item">
              <div className="timestamp">{item.timestamp}</div>
              <div className="content">{item.content}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="result-container">
        <h3>Kết quả phân tích:</h3>
        <pre className="result-text">{formattedResult}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎥 Gemini Video Analyzer</h1>
        <p>Phân tích video YouTube với AI Gemini</p>
      </header>

      <main className="App-main">
        <form onSubmit={handleSubmit} className="analyzer-form">
          <div className="input-group">
            <label htmlFor="apiKey">Gemini API Key:</label>
            <div className="input-with-button">
              <input
                type={isApiKeyVisible ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Nhập API Key của bạn"
                disabled={isLoading}
              />
              <button
                type="button"
                className="reveal-btn"
                onMouseDown={handleRevealDown}
                onMouseUp={handleRevealUp}
                onMouseLeave={handleRevealUp}
                onTouchStart={handleRevealDown}
                onTouchEnd={handleRevealUp}
                disabled={isLoading}
                aria-label={isApiKeyVisible ? 'Ẩn API key' : 'Hiện API key'}
                title="Nhấn và giữ để hiện API key"
              >
                {isApiKeyVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="videoUrl">URL Video YouTube:</label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !videoUrl.trim() || !apiKey.trim()}
            className="analyze-btn"
          >
            {isLoading ? '🔄 Đang phân tích...' : '🔍 Phân tích Video'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Đang phân tích video, vui lòng chờ...</p>
          </div>
        )}

        {result && !isLoading && renderResult(result)}
      </main>

      <footer className="App-footer">
        <p>Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
