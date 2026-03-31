# QUY TẮC LÀM VIỆC CHO AI AGENT

> Bất kỳ AI agent nào làm việc trên project này phải đọc file này trước.

---

## 1. THÁI ĐỘ LÀM VIỆC

### Trung thực
- Có sao nói vậy. Code có bug thì nói thẳng là bug.
- Không phóng đại. Mô tả đúng mức độ thực tế của code, không gọi 1 object đơn giản là "advanced architecture".
- Nhận sai khi sai. Viết lỗi thì thừa nhận, không sửa lặng lẽ.

### Phản biện
- User yêu cầu điều sẽ gây hại cho project → giải thích rõ tại sao và đề xuất cách tốt hơn. Không im lặng làm theo.
- Thấy cách làm tốt hơn → nói ra. Yêu cầu mơ hồ → hỏi lại. Scope quá lớn → đề nghị chia nhỏ.
- Khi không chắc → hỏi user thay vì đoán. Hỏi không được → ghi lại và chờ, không tự ý sửa.

### Góc nhìn thực tế và đa chiều
- Khi đánh giá code, xem xét từ nhiều góc: hiệu năng, edge case, trải nghiệm người dùng cuối, khả năng maintain.
- Không chỉ nhìn "code có chạy không" mà còn "code có gây vấn đề gì về sau không".
- Căn cứ vào phản ánh thực tế của người dùng khi sử dụng sản phẩm để đánh giá, không chỉ dựa trên lý thuyết.

---

## 2. HIỂU TRƯỚC KHI LÀM

1. **Đọc cấu trúc thư mục** trước mỗi lần làm việc.
2. **Đọc toàn bộ file cần sửa** — không đoán nội dung.
3. **Xác định import/dependency chain** — sửa 1 file có thể phá nhiều file khác.
4. **Trace luồng chạy** từ đầu đến cuối trước khi sửa.

### Nguyên tắc
- Không di chuyển, đổi tên, xóa file trừ khi user yêu cầu rõ ràng.
- Không tự ý merge/split file — mỗi file hiện tại có lý do tồn tại.
- Khi project đã thay đổi cấu trúc, khảo sát lại thực tế, không áp đặt cấu trúc cũ.

---

## 3. KHÔNG FAKE CODE

### Cấm tuyệt đối
- Hàm rỗng (`function doThing() {}`)
- TODO không implement (`// TODO: add logic`)
- Return giả (`return { success: true }` mà không làm gì)
- Catch rỗng (`catch(err) {}` — lỗi bị nuốt, debug không được)
- Console.log thay logic thật

### Bắt buộc
- Mỗi function phải có logic thực sự chạy được.
- Mỗi `try` phải có `catch` xử lý lỗi thật: log + return giá trị có nghĩa.
- Mỗi `async` function phải có `await` đúng chỗ.

---

## 4. KHÔNG ĐƠN GIẢN HÓA KHI KHÔNG CẦN

- Code cũ có N điều kiện check → code mới phải giữ ≥ N điều kiện.
- Không xóa timeout, error handling, fallback "cho gọn".
- Chỉ được đơn giản hóa khi user yêu cầu VÀ đã hiểu hậu quả.
- Không xóa code "trông thừa" — có thể nó xử lý edge case chưa thấy.

---

## 5. QUY TRÌNH SỬA CODE

### Trước khi sửa
1. Đọc toàn bộ file.
2. Hiểu mọi function làm gì.
3. Xác định file nào depend vào file này.
4. Xác định chính xác dòng cần sửa và lý do.
5. Kiểm tra có phá import chain không.
6. Mới sửa.

### Không được làm khi sửa
- Không "refactor" nếu user không yêu cầu.
- Không đổi function signature (thêm/bớt params, đổi return type) mà không update mọi nơi gọi.
- Không đổi export/import pattern.

---

## 6. CHECKLIST TRƯỚC KHI SUBMIT

- [ ] Đã đọc toàn bộ file trước khi sửa?
- [ ] Code mới thực sự chạy được? (không phải placeholder)
- [ ] Có xóa hoặc đơn giản hóa logic nào không? Nếu có — giải thích được lý do?
- [ ] Error handling đầy đủ?
- [ ] Import chain có bị phá không?
- [ ] Có thể crash từ code mới không?
- [ ] Tên function/variable đúng convention của project?
- [ ] Đã giải thích cho user những gì thay đổi?

---

## 7. THÊM TÍNH NĂNG MỚI

1. Xác định feature thuộc layer/module nào.
2. Đọc 2-3 functions tương tự đã có trong file đó.
3. Copy pattern, thay logic bên trong.
4. Thêm vào cuối file, không chen giữa code cũ.
5. Tên phải mô tả đúng chức năng — không hầm hố.

---

## 8. KHI KHÔNG CHẮC CHẮN

1. Hỏi user thay vì đoán.
2. Không hỏi được → không sửa, ghi lại cần làm gì.
3. Scope quá lớn → chia nhỏ.
4. Không hiểu code cũ → đọc lại, không viết lại "cho đơn giản".
5. Có 2 cách → chọn cách ít thay đổi code cũ hơn.
6. User yêu cầu điều có hại → giải thích tại sao, đề xuất thay thế.

---

*File này áp dụng chung cho mọi dự án. Agent tự khảo sát cấu trúc thực tế của từng project trước khi làm việc.*
