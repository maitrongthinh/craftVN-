# 🧠 CraftVN ⛏️

> **AI-Powered Minecraft Bot with Advanced LLM Integration**

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

**CraftVN** is a sophisticated AI agent framework that enables autonomous Minecraft gameplay through advanced language model integration. The system combines real-time environmental perception, task planning, and adaptive behavior to accomplish complex objectives.

### 📚 Documentation

- 📖 [Bot Guide](BOT_GUIDE.md) | [Hướng Dẫn Bot](BOT_GUIDE.md#tiếng-việt)
- ❓ [FAQ](FAQ.md) | [FAQs](FAQ.md#tiếng-việt)  
- 🎯 [MineCollab Benchmark](minecollab.md)
- ⚙️ [Configuration](settings.js)
- 📋 [Development Rules](AGENT_RULES.md)

> [!Caution]
> **Security Notice**: Do not connect to untrusted servers with `allow_insecure_coding: true`. Code execution is **disabled by default** for safety.

### ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure API keys
cp keys.example.json keys.json
# Edit keys.json with your LLM provider credentials

# 3. Start Minecraft on localhost:55916 (LAN)

# 4. Run the agent
node main.js
```

### 🎯 Features

- ✅ Support for 15+ LLM providers (OpenAI, Claude, Gemini, Groq, DeepSeek, Ollama, etc.)
- ✅ Multi-agent coordination with collaborative capabilities
- ✅ Persistent memory system with spatial awareness
- ✅ Vision-based environment perception (screenshot analysis)
- ✅ Web dashboard for real-time monitoring (localhost:3000)
- ✅ Docker containerization for safe sandbox execution
- ✅ Comprehensive task evaluation framework (MineCollab)
- ✅ Customizable bot profiles and personality configurations

### 🛠 Installation Requirements

- **Minecraft Java Edition** (v1.21.6 recommended)
- **Node.js** v18 or v20 LTS
- **LLM API Key** (OpenAI, Claude, Gemini, etc.)

For detailed setup instructions, see [Bot Guide](BOT_GUIDE.md).

---

## Tiếng Việt

**CraftVN** là một framework agent AI tinh vi cho phép chơi game Minecraft tự động thông qua tích hợp mô hình ngôn ngữ nâng cao. Hệ thống kết hợp nhận thức môi trường thời gian thực, lập kế hoạch nhiệm vụ và hành vi thích ứng.

### 📚 Tài Liệu

- 📖 [Hướng Dẫn Bot](BOT_GUIDE.md)
- ❓ [Câu Hỏi Thường Gặp](FAQ.md)
- 🎯 [MineCollab Benchmark](minecollab.md)
- ⚙️ [Cấu Hình](settings.js)
- 📋 [Quy Tắc Phát Triển](AGENT_RULES.md)

> [!Caution]
> **Cảnh Báo Bảo Mật**: Không kết nối với các server không được tin tưởng khi `allow_insecure_coding: true`. Thực thi code bị **tắt mặc định** vì an toàn.

### ⚡ Hướng Dẫn Nhanh

```bash
# 1. Cài đặt các phụ thuộc
npm install

# 2. Cấu hình khóa API
cp keys.example.json keys.json
# Chỉnh sửa keys.json với thông tin xác thực LLM của bạn

# 3. Khởi động Minecraft trên localhost:55916 (LAN)

# 4. Chạy agent
node main.js
```

### 🎯 Tính Năng

- ✅ Hỗ trợ 15+ nhà cung cấp LLM (OpenAI, Claude, Gemini, Groq, DeepSeek, Ollama, v.v.)
- ✅ Phối hợp đa agent với khả năng cộng tác
- ✅ Hệ thống bộ nhớ bền vững với nhận thức không gian
- ✅ Nhận thức môi trường dựa trên thị giác (phân tích ảnh chụp màn hình)
- ✅ Bảng điều khiển web để giám sát thời gian thực (localhost:3000)
- ✅ Containerization Docker cho thực thi sandbox an toàn
- ✅ Framework đánh giá tác vụ toàn diện (MineCollab)
- ✅ Configuration profile bot tùy chỉnh và tính cách

### 🛠 Yêu Cầu Cài Đặt

- **Minecraft Java Edition** (v1.21.6 được khuyên dùng)
- **Node.js** v18 hoặc v20 LTS
- **LLM API Key** (OpenAI, Claude, Gemini, v.v.)

Để biết hướng dẫn thiết lập chi tiết, xem [Hướng Dẫn Bot](BOT_GUIDE.md).
