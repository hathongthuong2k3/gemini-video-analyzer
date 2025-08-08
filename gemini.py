# api/gemini.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)

# CORS configuration cho production
CORS(app, origins=[
    os.environ.get('FRONTEND_URL', 'http://localhost:3000'),
    'https://your-frontend-domain.vercel.app'  # Thay bằng domain thực tế
])

GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

@app.route('/analyze', methods=['POST'])
def analyze_video():
    data = request.json or {}
    video_url = data.get('videoUrl')
    api_key = data.get('apiKey')

    if not api_key:
        return jsonify({"error": "apiKey is required"}), 400

    if not video_url:
        return jsonify({"error": "videoUrl is required"}), 400

    prompt = '''Bạn là một chuyên viên tư liệu của đài truyền hình Việt Nam, với con mắt tinh tường của một thám tử, chuyên ghi lại những chi tiết dù là nhỏ nhất.

**YÊU CẦU NGÔN NGỮ:**
**Toàn bộ kết quả đầu ra PHẢI được viết bằng TIẾNG VIỆT.**

---
**QUY TẮC PHÂN ĐOẠN TRỰC QUAN:**

Hình ảnh là yếu tố quyết định để tạo một phân đoạn mới.
1.  **TẠO PHÂN ĐOẠN MỚI KHI CÓ THAY ĐỔI LỚN VỀ HÌNH ẢNH:** Thay đổi rõ rệt về **địa điểm**, **chủ thể chính** và **hành động**.
2.  **QUY TẮC TỐI THƯỢNG:** Một **sự thay đổi lớn về hình ảnh** vẫn phải tạo ra một phân đoạn mới, kể cả khi chúng cùng minh họa cho một chủ đề trong lời bình.

---
**QUY TẮC VÀNG VỀ MÔ TẢ CHI TIẾT SÂU:**

Mô tả của bạn phải vừa mạch lạc, vừa không bỏ sót bất kỳ chi tiết nào có thể dùng để truy vấn.

1.  **DÙNG ÂM THANH LÀM KHUNG SƯỜN:** Bắt đầu mô tả bằng chủ đề hoặc mục đích của phân đoạn (suy ra từ lời bình) để thiết lập bối cảnh.
2.  **QUÉT CHI TIẾT NHƯ THÁM TỬ:** Ngay sau khi thiết lập bối cảnh, hãy "zoom" vào và mô tả cặn kẽ các chi tiết hình ảnh quan trọng. **Hãy tự hỏi:**
    *   **Có cá nhân nào nổi bật không?** (Trang phục, màu sắc, hành động đặc biệt).
    *   **Họ đang cầm hoặc tương tác với vật gì?** (Cuốn sổ, điện thoại, dụng cụ).
    *   **Vật đó có đặc điểm gì?** (Màu sắc, hình dạng, chất liệu).
    *   **Có văn bản nào đọc được không?** (Tên trên sổ, biển hiệu, tiêu đề). Ghi lại chính xác trong ngoặc kép **''**.
    *   **Các đối tượng nền quan trọng khác?** (Biển hiệu, máy móc, kiến trúc).
3.  **TÍCH HỢP TỰ NHIÊN:** Dệt tất cả những chi tiết này vào một đoạn văn liền mạch. **Tuyệt đối không** dùng các cụm từ tách biệt như "hình ảnh cho thấy..." hay "lời bình cho biết...".

---
**CHÍNH SÁCH LỌC NHIỄU TUYỆT ĐỐI:**

**TUYỆT ĐỐI KHÔNG** đề cập đến các yếu tố đồ họa của nhà đài (logo, đồng hồ, dòng chữ chạy ngang).

---
**Định dạng đầu ra:**
Trả về một mảng JSON. Mỗi object chứa `timestamp` và `content`.

**VÍ DỤ VỀ KẾT QUẢ XUẤT SẮC (Tích hợp & Siêu chi tiết):**
```json
[
  {
    "timestamp": "01:15 - 01:26",
    "content": "Phân đoạn nhấn mạnh việc giảm thủ tục và gánh nặng tài chính cho người bệnh, với hình ảnh toàn cảnh khu vực chờ của bệnh viện. Nhiều người dân đang ngồi trên ghế băng màu xám. **Trong số đó, có một người phụ nữ lớn tuổi, tóc ngắn, mặc áo màu hồng, đang cầm trên tay một cuốn sổ khám bệnh cũng màu hồng có ghi tên bệnh nhân trên bìa.** Cảnh quay cũng cho thấy các biển hiệu 'KHOA VẬT LÝ XẠ TRỊ' và 'KHU XẠ TRỊ KỸ THUẬT CAO CƠ SỞ TÂN TRIỀU'."
  },
  {
    "timestamp": "03:40 - 03:55",
    "content": "Trong phóng sự về một cuộc thi chó tại Mỹ, cảnh quay tập trung vào một chú chó giống Pug đội một chiếc mũ có hình dạng bánh hamburger. Bên cạnh là một chú chó khác giống Corgi đang đội một chiếc vương miện màu xanh dương."
  },
  {
    "timestamp": "05:10 - 05:25",
    "content": "Để minh họa cho thông tin về việc làm thủ tục, phóng sự chiếu cảnh một người phụ nữ đứng trước màn hình kiosk. Trên màn hình có một dòng cảnh báo màu đỏ và thông tin được chia thành ba cột. Sau đó, cảnh quay chuyển sang một tờ giấy có dải màu đen chứa nhiều ký tự, trong đó bốn ký tự cuối là '4990'."
  }
]
```
'''

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "fileData": {
                            "fileUri": video_url,
                            "mimeType": "video/youtube"
                        }
                    }
                ]
            }
        ]
    }

    headers = {'Content-Type': 'application/json'}
    response = requests.post(
        GEMINI_URL,
        headers=headers,
        params={'key': api_key},
        data=json.dumps(payload)
    )

    if response.status_code == 200:
        result = response.json()
        # Extract and format the response
        try:
            content = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({"result": content})
        except Exception:
            return jsonify({"error": "Failed to parse response"}), 500
    else:
        return jsonify({"error": response.text}), response.status_code

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK",
        "message": "Flask API is running",
        "timestamp": "2025-08-07T18:00:00Z"
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)