# Bài Lab: Git Flow, Unit Testing và CI/CD với GitHub Actions

**Môn học:** DevOps cơ bản  
**Thời lượng:** 90 – 120 phút  
**Hình thức nộp bài:** Pull Request trên GitHub

---

## 1. Mục tiêu bài lab

Sau khi hoàn thành bài lab, sinh viên có thể:

- Hiểu và áp dụng **Git Flow** cơ bản theo mô hình `feature/* → develop → main`
- Thực hành tạo **branch**, **commit** có ý nghĩa và mở **Pull Request** (PR)
- Viết **unit test** với Jest cho ứng dụng JavaScript
- Đọc hiểu pipeline **GitHub Actions** trong `.github/workflows/ci.yml`
- Trải nghiệm vòng lặp: viết code → test fail → CI chặn merge → fix → CI pass → merge

---

## 2. Yêu cầu trước khi bắt đầu

| Công cụ | Phiên bản tối thiểu |
|---------|---------------------|
| Git | 2.x trở lên |
| Node.js | 18 trở lên |
| npm | đi kèm Node.js |
| Tài khoản GitHub | Đã được cấp quyền truy cập repo `devops-lab-ci` |

Kiểm tra môi trường:

```bash
git --version
node --version
npm --version
```

---

## 3. Cấu trúc dự án

```text
devops-lab-ci/
├── src/
│   └── calculator.js          ← Mã nguồn các hàm tính toán
├── tests/
│   └── calculator.test.js     ← Unit test bằng Jest
├── .github/
│   └── workflows/
│       └── ci.yml             ← Pipeline CI GitHub Actions
├── package.json
└── LabReadme                  ← Tài liệu tham khảo cho giảng viên
```

### Mô hình nhánh trong repo

```
main          ← nhánh production
  └── develop ← nhánh tích hợp (merge feature vào đây)
        └── feature/<MSSV>-<tên>  ← nhánh cá nhân của sinh viên
```

---

## 4. Nội dung thực hành

---

### Bước 1 – Clone repo và chạy thử

```bash
git clone https://github.com/namph32/devops-lab-ci.git
cd devops-lab-ci
npm install
npm test
```

> **Kết quả mong đợi:** Tất cả test hiện có đều **PASS** (chữ xanh).  
> Nếu có lỗi ở bước này, báo ngay với giảng viên.

---

### Bước 2 – Tạo nhánh làm việc riêng

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<MSSV>-add-modulo
```

> **Ví dụ:** `feature/20123456-add-modulo`  
> Đặt tên nhánh đúng mẫu – đây là tiêu chí chấm điểm.

---

### Bước 3 – Thêm hàm mới vào `src/calculator.js`

Mở `src/calculator.js`, thêm hàm `modulo` **phía dưới** hàm `divide`:

```js
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot modulo by zero');
  }
  return a % b;
}
```

Cập nhật dòng `module.exports` để export hàm mới:

```js
module.exports = { add, subtract, multiply, divide, modulo };
```

---

### Bước 4 – Viết unit test trong `tests/calculator.test.js`

Thêm `modulo` vào dòng `require` đầu file:

```js
const { add, subtract, multiply, divide, modulo } = require('../src/calculator');
```

Thêm `describe` block mới vào **cuối**, ngay trước dấu `}` đóng của `describe('Calculator', ...)`:

```js
  describe('modulo()', () => {
    test('Lấy phần dư của 10 chia 3 là 1', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('Lấy phần dư của 9 chia 3 là 0', () => {
      expect(modulo(9, 3)).toBe(0);
    });

    test('Ném lỗi khi chia lấy dư cho 0', () => {
      expect(() => modulo(5, 0)).toThrow('Cannot modulo by zero');
    });
  });
```

Chạy test để kiểm tra:

```bash
npm test
```

> **Tất cả test phải PASS** trước khi chuyển bước tiếp theo.

---

### Bước 5 – Commit và push

```bash
git add src/calculator.js tests/calculator.test.js
git commit -m "feat: add modulo function with unit tests"
git push origin feature/<MSSV>-add-modulo
```

---

### Bước 6 – Mở Pull Request vào `develop`

1. Truy cập trang GitHub của repo.
2. Nhấn **"Compare & pull request"** cho nhánh vừa push.
3. Đặt **base branch** là `develop`.
4. Điền thông tin theo mẫu sau:

**Tiêu đề PR:**
```
feat: add modulo – <MSSV> <Họ và tên>
```

**Mô tả PR:**
```md
## Tóm tắt
- Thêm hàm `modulo(a, b)` vào `src/calculator.js`
- Thêm 3 unit test cho hàm `modulo()`

## Thay đổi
- `src/calculator.js`: thêm hàm `modulo`, cập nhật exports
- `tests/calculator.test.js`: thêm describe block `modulo()`

## Kiểm tra
- Chạy `npm test` local: tất cả PASS
- CI GitHub Actions: xem kết quả tại tab Checks
```

---

### Bước 7 – Quan sát CI chạy tự động

Sau khi tạo PR, vào tab **Checks** trên GitHub:

- ✅ Tất cả test pass → CI **xanh** → PR sẵn sàng để merge
- ❌ Có test fail → CI **đỏ** → PR **bị chặn**, không thể merge

---

### Bước 8 – Mô phỏng CI fail và fix (bắt buộc)

**Mục đích:** Quan sát cơ chế CI bảo vệ nhánh chính khi có lỗi.

**a. Tạo lỗi cố ý:**

Sửa hàm `add()` trong `src/calculator.js`:

```js
function add(a, b) {
  return a + b + 1;  // Lỗi cố ý
}
```

Commit và push:

```bash
git commit -am "test: simulate CI fail"
git push origin feature/<MSSV>-add-modulo
```

Trên GitHub → tab **Checks**: CI sẽ chuyển sang **đỏ**, nút "Merge pull request" bị khoá.  
**Chụp màn hình** trạng thái này để nộp bài.

**b. Fix lỗi:**

```js
function add(a, b) {
  return a + b;  // Đã sửa
}
```

```bash
git commit -am "fix: restore correct add function"
git push origin feature/<MSSV>-add-modulo
```

CI sẽ chạy lại và chuyển sang **xanh**. PR có thể merge.

---

## 5. Yêu cầu nộp bài

| Hạng mục | Chi tiết |
|----------|----------|
| **Pull Request** | Mở PR từ `feature/<MSSV>-add-modulo` → `develop` |
| **CI pass** | Tab Checks trên PR hiển thị ✅ xanh |
| **Screenshot CI fail** | Đính kèm vào phần mô tả PR (Bước 8a) |
| **Tiêu đề PR** | Đúng mẫu: `feat: add modulo – <MSSV> <Họ tên>` |
| **Link PR** | Nộp link PR trên hệ thống quản lý lớp |

---

## 6. Thang điểm

| Tiêu chí | Điểm |
|----------|------|
| Tạo đúng nhánh theo mẫu `feature/<MSSV>-add-modulo` | 1 |
| Hàm `modulo()` hoạt động đúng (kết quả + xử lý lỗi) | 2 |
| Đủ 3 test case, tất cả PASS | 3 |
| PR đúng định dạng tiêu đề & mô tả, CI xanh | 2 |
| Screenshot CI fail đính kèm trong mô tả PR | 2 |
| **Tổng** | **10** |

---

## 7. Câu hỏi tự kiểm tra

1. Tại sao cần tạo nhánh `feature` thay vì commit thẳng lên `main` hoặc `develop`?
2. File `ci.yml` được kích hoạt ở sự kiện nào?
3. Khi CI fail, GitHub Actions làm gì với nút "Merge pull request"?
4. `npm test` thực ra chạy lệnh gì? Tìm trong file nào?
5. Sự khác biệt giữa nhánh `develop` và `main` trong mô hình Git Flow là gì?

---

## 8. Tài liệu tham khảo

- [Git Flow – A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- [Jest – Getting Started](https://jestjs.io/docs/getting-started)
- [GitHub Actions – Quickstart](https://docs.github.com/en/actions/quickstart)
- [About pull requests – GitHub Docs](https://docs.github.com/en/pull-requests)
