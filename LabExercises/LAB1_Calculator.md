# Lab 1 — Tính toán và Kiểm thử (Calculator)

## Mục tiêu
- Hiểu cấu trúc dự án nhỏ `devops-lab-ci`.
- Thực hành thêm chức năng mới vào `src/calculator.js`.
- Viết và chạy unit tests với `jest`.
- Quản lý phiên bản: tạo branch, commit và push kết quả.

## Yêu cầu trước
- Node.js >= 16
- Git
- Đã clone repository `devops-lab-ci`

## Tập tin chính
- Mã nguồn: `src/calculator.js`
- Tests: `tests/calculator.test.js`

## Nhiệm vụ
1. Khám phá mã nguồn hiện có: mở `src/calculator.js` và `tests/calculator.test.js`.
2. Thêm hàm mới `modulo(a, b)` vào `src/calculator.js`:
   - Trả về phần dư `a % b`.
   - Nếu `b === 0` thì ném lỗi với thông báo `Cannot modulo by zero`.
3. Export hàm `modulo` từ module và cập nhật file test để import hàm mới.
4. Viết 2 test cho `modulo()` trong `tests/calculator.test.js`:
   - Trường hợp bình thường (ví dụ `modulo(10, 3) === 1`).
   - Trường hợp chia lấy dư cho 0 (mong muốn ném lỗi với thông báo trên).
5. Cài đặt dependency và chạy test locally:

   ```bash
   npm install
   npm test
   ```

6. Kiểm tra tất cả test pass. Nếu test failed, debug code và sửa.

## Lưu kết quả (gửi nộp)
- Tạo branch mới theo mẫu `lab1/<MSSV>-<Tên>` (ví dụ `lab1/20123456-NguyenA`).
- Commit các thay đổi (`src/calculator.js`, `tests/calculator.test.js`) với thông điệp rõ ràng.
- Push branch và mở Pull Request vào branch `main` (tiêu đề: `Lab1: Calculator - <MSSV> <Tên>`).
- Trong mô tả PR, dán kết quả output của `npm test` hoặc screenshot.

## Thử thách mở rộng (tùy chọn)
- Thêm kiểm tra cho các số âm.
- Viết test property-based đơn giản: `a === b * floor(a/b) + modulo(a,b)`.

## Gợi ý debug
- Dùng `console.log` tạm trong code để in tham số khi test thất bại.
- Chạy test cụ thể:

```bash
npm test -- tests/calculator.test.js -t "modulo"
```

---
Hoàn thành bài lab: nộp PR và thông báo trên hệ thống quản lý lớp.
