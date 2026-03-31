# 🤖 CraftVN Bot Guide

**Professional documentation for CraftVN configuration and usage**

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### Installation & Setup

#### Quick Start

```bash
npm install
cp keys.example.json keys.json
# Edit keys.json with your LLM API credentials
node main.js
```

#### Prerequisites

- **Minecraft Java Edition** v1.21.6
- **Node.js** v18+ LTS
- **LLM API Key** (OpenAI, Claude, Gemini, Groq, etc.)

For Windows Node installation issues, ensure you select **"Automatically install necessary tools"** during setup.

### Configuration

Main settings file: `settings.js`

#### Server Connection

```javascript
"host": "127.0.0.1",        // Minecraft server IP
"port": 55916,              // Minecraft server port
"minecraft_version": "auto" // Auto-detect or specify "1.21.6"
```

#### LLM & AI Configuration

```javascript
"profiles": [
  "./profiles/andy.json"    // Bot profile(s) to load
],
"allow_insecure_coding": false,  // Enable autonomous code execution
"allow_vision": false,           // Enable screenshot vision
"max_messages": 15               // Context window size
```

#### Web UI

```javascript
"mindserver_port": 8080,    // Web dashboard port
"render_bot_view": true     // Enable camera view at localhost:3000
```

### Bot Profiles

Create bot personalities in `profiles/` directory. Each JSON file defines an agent:

```json
{
  "name": "MyBot",
  "model": "gpt-4o",
  "max_tokens": 8000,
  "modes": {
    "self_defense": true,
    "hunting": true
  },
  "prefixes": ["!", "/"]
}
```

### Docker Deployment

```bash
docker-compose up --build

# Or manual Docker command
docker build -t craftVN . && docker run -it \
  -p 3000-3003:3000-3003 \
  -p 8080:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v $(pwd)/keys.json:/app/keys.json \
  craftVN
```

### Troubleshooting

**Cannot connect to server**:
- Ensure Minecraft is open to LAN on port 55916
- Verify `host` and `port` in settings.js match your server
- Clear `node_modules` and run `npm install` again

**API errors**:
- Check `keys.json` has correct API key
- Verify rate limits haven't been exceeded
- Confirm model name is valid for the provider

**npm install fails**:
- On macOS: `sudo ln -s $(which python3) /usr/local/bin/python`
- On Windows with Node v24+: Downgrade to Node v20 LTS

### Advanced Features

#### Vision System

Enable environment perception:

```javascript
"allow_vision": true,
"vision_model": {
  "api": "openai",
  "model": "gpt-4-vision"
}
```

#### Task Execution

```bash
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs
```

#### Multiple Bots

```bash
node main.js --profiles ./profiles/bot1.json ./profiles/bot2.json
```

---

## Tiếng Việt

### Cài Đặt & Thiết Lập

#### Bắt Đầu Nhanh

```bash
npm install
cp keys.example.json keys.json
# Chỉnh sửa keys.json với thông tin xác thực LLM
node main.js
```

#### Yêu Cầu Trước Đó

- **Minecraft Java Edition** v1.21.6
- **Node.js** v18+ LTS
- **LLM API Key** (OpenAI, Claude, Gemini, Groq, v.v.)

Khi cài Node trên Windows, hãy chắc chắn chọn **"Automatically install necessary tools"** trong quá trình thiết lập.

### Cấu Hình

File cấu hình chính: `settings.js`

#### Kết Nối Server

```javascript
"host": "127.0.0.1",        // IP server Minecraft
"port": 55916,              // Cổng server Minecraft
"minecraft_version": "auto" // Tự động phát hiện hoặc chỉ định "1.21.6"
```

#### Cấu Hình LLM & AI

```javascript
"profiles": [
  "./profiles/andy.json"    // Profile(s) bot để tải
],
"allow_insecure_coding": false,  // Bật thực thi code tự động
"allow_vision": false,           // Bật thị giác ảnh chụp màn hình
"max_messages": 15               // Kích thước cửa sổ ngữ cảnh
```

#### Web UI

```javascript
"mindserver_port": 8080,    // Cổng bảng điều khiển web
"render_bot_view": true     // Bật chế độ xem camera tại localhost:3000
```

### Profile Bot

Tạo tính cách bot trong thư mục `profiles/`. Mỗi tệp JSON định nghĩa một agent:

```json
{
  "name": "MyBot",
  "model": "gpt-4o",
  "max_tokens": 8000,
  "modes": {
    "self_defense": true,
    "hunting": true
  },
  "prefixes": ["!", "/"]
}
```

### Triển Khai Docker

```bash
docker-compose up --build

# Hoặc lệnh Docker thủ công
docker build -t craftVN . && docker run -it \
  -p 3000-3003:3000-3003 \
  -p 8080:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v $(pwd)/keys.json:/app/keys.json \
  craftVN
```

### Khắc Phục Sự Cố

**Không thể kết nối với server**:
- Đảm bảo Minecraft mở cho LAN trên cổng 55916
- Xác minh `host` và `port` trong settings.js khớp với server của bạn
- Xóa `node_modules` và chạy `npm install` lại

**Lỗi API**:
- Kiểm tra `keys.json` có khóa API chính xác
- Xác minh giới hạn tốc độ chưa bị vượt quá
- Xác nhận tên mô hình hợp lệ cho nhà cung cấp

**npm install thất bại**:
- Trên macOS: `sudo ln -s $(which python3) /usr/local/bin/python`
- Trên Windows với Node v24+: Hạ cấp xuống Node v20 LTS

### Tính Năng Nâng Cao

#### Hệ Thống Thị Giác

Bật nhận thức môi trường:

```javascript
"allow_vision": true,
"vision_model": {
  "api": "openai",
  "model": "gpt-4-vision"
}
```

#### Thực Thi Nhiệm Vụ

```bash
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs
```

#### Nhiều Bot

```bash
node main.js --profiles ./profiles/bot1.json ./profiles/bot2.json
```
