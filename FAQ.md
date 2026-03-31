# FAQ - Frequently Asked Questions

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### Common Issues

#### Connection Problems
- **`Error: connect ECONNREFUSED`**: Your bot cannot connect to Minecraft server
  - Verify Minecraft is open to LAN in game settings
  - Ensure LAN port matches `settings.js` (default: 55916)
  - Check Minecraft version matches `minecraft_version` setting
  - Try restarting Minecraft in LAN mode

#### Installation Issues
- **`ERR_MODULE_NOT_FOUND`**: Missing npm packages
  - Run `npm install` to install dependencies
  
- **`npm install` fails with Python/C++ errors**:
  - **macOS/Linux**: `sudo ln -s $(which python3) /usr/local/bin/python`
  - **Windows Node v24+**: Use Node v20 LTS instead
    ```bash
    nvm install 20
    nvm use 20
    rm -rf node_modules package-lock.json
    npm install
    ```
  - **Skip optional packages**: `npm install --no-optional`

#### API & Model Issues
- **`My brain disconnected`**: LLM API connection failed
  - Verify API key in `keys.json` is correct
  - Check rate limits haven't been exceeded
  - Confirm LLM provider status/uptime
  - Review error logs for specific details

- **API key not found**:
  - Ensure `keys.json` exists (not `keys.example.json`)
  - Save file after editing (`Ctrl+S` in VS Code)
  - Verify correct syntax (valid JSON format)

- **Model not supported**:
  - Check provider documentation for correct model name format
  - Verify provider is in supported APIs list
  - Use format: `provider/model-name` for custom models

#### Runtime Issues
- **`I'm stuck!` - Bot not moving**:
  - Mineflayer pathfinder has limitations
  - Ensure no obstacles block path
  - Try restarting bot with `node main.js`
  - Move bot manually and resume

- **Out-of-date patches**: Clear and reinstall
  - `rm -rf node_modules` (or delete folder manually)
  - `npm install`

### Compatibility

**Mods**: Only client-side mods (Optifine, Sodium) are partially supported. Gameplay-changing mods are not compatible.

**Texture Packs**: May cause connection issues. Try disabling if experiencing problems.

**Baritone**: Different tool, not directly integrated with CraftVN.

**Java Version**: Minecraft Java Edition only. Bedrock Edition not supported.

---

## Tiếng Việt

### Vấn Đề Phổ Biến

#### Vấn Đề Kết Nối
- **`Error: connect ECONNREFUSED`**: Bot không thể kết nối với server Minecraft
  - Xác minh Minecraft mở cho LAN trong cài đặt game
  - Đảm bảo cổng LAN khớp với `settings.js` (mặc định: 55916)
  - Kiếm Minecraft version khớp với cài đặt `minecraft_version`
  - Thử khởi động lại Minecraft ở chế độ LAN

#### Vấn Đề Cài Đặt
- **`ERR_MODULE_NOT_FOUND`**: Thiếu npm packages
  - Chạy `npm install` để cài đặt dependencies

- **`npm install` thất bại với lỗi Python/C++**:
  - **macOS/Linux**: `sudo ln -s $(which python3) /usr/local/bin/python`
  - **Windows Node v24+**: Sử dụng Node v20 LTS thay thế
    ```bash
    nvm install 20
    nvm use 20
    rm -rf node_modules package-lock.json
    npm install
    ```
  - **Bỏ qua các packages tùy chọn**: `npm install --no-optional`

#### Vấn Đề API & Mô Hình
- **`My brain disconnected`**: Kết nối LLM API thất bại
  - Xác minh khóa API trong `keys.json` chính xác
  - Kiểm tra giới hạn tốc độ chưa bị vượt quá
  - Xác nhận trạng thái/thời gian hoạt động nhà cung cấp LLM
  - Xem xét chi tiết error logs

- **Không tìm thấy khóa API**:
  - Đảm bảo `keys.json` tồn tại (không phải `keys.example.json`)
  - Lưu tệp sau khi chỉnh sửa (`Ctrl+S` trong VS Code)
  - Xác minh cú pháp chính xác (định dạng JSON hợp lệ)

- **Mô hình không được hỗ trợ**:
  - Kiểm tra tài liệu nhà cung cấp để xác định định dạng tên mô hình chính xác
  - Xác minh nhà cung cấp nằm trong danh sách API được hỗ trợ
  - Sử dụng định dạng: `provider/model-name` cho các mô hình tùy chỉnh

#### Vấn Đề Runtime
- **`I'm stuck!` - Bot không di chuyển**:
  - Mineflayer pathfinder có những hạn chế
  - Đảm bảo không có chướng ngại vật chặn đường
  - Thử khởi động lại bot với `node main.js`
  - Di chuyển bot thủ công và tiếp tục

- **Patches lỗi thời**: Xóa và cài đặt lại
  - `rm -rf node_modules` (hoặc xóa thư mục thủ công)
  - `npm install`

### Tính Tương Thích

**Mods**: Chỉ các mods phía client (Optifine, Sodium) được hỗ trợ một phần. Các mods thay đổi gameplay không tương thích.

**Texture Packs**: Có thể gây ra vấn đề kết nối. Thử tắt nếu gặp vấn đề.

**Baritone**: Công cụ khác, không được tích hợp trực tiếp với CraftVN.

**Phiên Bản Java**: Chỉ Minecraft Java Edition. Bedrock Edition không được hỗ trợ.
