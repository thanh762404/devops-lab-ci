Dưới đây là cách **protect (bảo vệ) nhánh `main` trên GitHub** để tránh bị push hoặc merge bừa:

---

## 🔒 Cách bật bảo vệ nhánh `main`

### Bước 1: Vào repository

* Mở repo trên GitHub
* Chọn tab **Settings**

---

### Bước 2: Vào Branch protection

* Trong menu bên trái → chọn **Branches**
* Ở phần **Branch protection rules** → bấm **Add rule**

---

### Bước 3: Cấu hình rule cho `main`

Ở ô **Branch name pattern**:

```
main
```

Sau đó bật các option quan trọng:

---

## ⚙️ Các thiết lập nên bật

### ✅ 1. Require pull request before merging

👉 Bắt buộc phải tạo PR, không cho push trực tiếp

* Tick:

  * ✔ Require pull request before merging
  * ✔ Require approvals (chọn số người review, ví dụ: 1 hoặc 2)

---

### ✅ 2. Require status checks to pass

👉 Chỉ cho merge khi CI/CD pass

* Tick:

  * ✔ Require status checks to pass before merging
  * Chọn các checks (CI, test, build...)

---

### ✅ 3. Require conversation resolution

👉 Phải resolve hết comment trong PR

---

### ✅ 4. Require linear history (optional)

👉 Giữ lịch sử commit sạch (không merge commit)

---

### ✅ 5. Restrict who can push to matching branches

👉 Chỉ cho một số người push

* Chọn user/team được phép push (nếu cần)

---

### ✅ 6. Do not allow force pushes

👉 Ngăn force push (RẤT QUAN TRỌNG)

---

### ✅ 7. Do not allow deletions

👉 Không cho xóa nhánh `main`

---

## 💾 Bước cuối

* Nhấn **Create** hoặc **Save changes**

---

## 🔥 Best practice (khuyên dùng)

Cấu hình chuẩn cho team:

* ❌ Không cho push trực tiếp vào `main`
* ✅ Bắt buộc PR + review
* ✅ CI phải pass
* ✅ Không force push
* ✅ Không xóa branch

---

## 🎯 Kết quả

Sau khi bật:

* Dev **không thể push trực tiếp** vào `main`
* Phải:

  ```
  branch mới → PR → review → merge
  ```

---

Nếu bạn muốn, mình có thể:

* Gợi ý config chuẩn cho team nhỏ / team lớn
* Hoặc setup workflow Git (Git Flow / trunk-based) phù hợp 👍
