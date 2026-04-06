# 🧪 LAB 07 – GitHub Workflow, Pull Request, CI & Branch Protection

---

## 🎯 1. Mục tiêu bài lab

Sau khi hoàn thành, sinh viên có thể:

* Sử dụng Git theo workflow thực tế:

  * branch
  * commit
  * pull request
* Làm việc trên GitHub:

  * tạo repo
  * tạo PR
  * review code
* Hiểu và quan sát:

  * GitHub Actions (CI)
  * test pass/fail
* Cấu hình:

  * 🔒 Branch Protection (main branch)

---

## 📚 2. Kiến thức nền

Sinh viên cần biết:

* Git cơ bản (clone, commit, push)
* JavaScript cơ bản
* Node.js

---

## 🏗️ 3. Tạo repository

### 🔹 Bước 1: Tạo repo trên GitHub

1. Truy cập: [https://github.com](https://github.com)
2. Chọn **New repository**
3. Điền:

   * Repository name: `devops-lab-01`
   * Chọn: Public
   * Tick: ✅ Add README
4. Nhấn **Create repository**

---

### 🔹 Bước 2: Clone repo về máy

```bash
git clone https://github.com/<username>/devops-lab-01.git
cd devops-lab-01
```

---

## ⚙️ 4. Setup project Node.js

### 🔹 Tạo file package.json

```bash
npm init -y
```

---

### 🔹 Cài Jest

```bash
npm install --save-dev jest
```

---

### 🔹 Sửa package.json

```json
"scripts": {
  "test": "jest"
}
```

---

### 🔹 Tạo cấu trúc

```bash
mkdir src tests
touch src/calculator.js
touch tests/calculator.test.js
```

---

## 🧮 5. Viết code

### 📄 src/calculator.js

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
```

---

## 🧪 6. Viết unit test

### 📄 tests/calculator.test.js

```javascript
const { add, subtract, multiply, divide } = require("../src/calculator");

test("add", () => {
  expect(add(2, 3)).toBe(5);
});

test("subtract", () => {
  expect(subtract(5, 3)).toBe(2);
});

test("multiply", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("divide", () => {
  expect(divide(6, 3)).toBe(2);
});

test("divide by zero", () => {
  expect(() => divide(5, 0)).toThrow();
});
```

---

### 🔹 Chạy test

```bash
npm test
```

👉 Kết quả: ✅ PASS

---

## 🌿 7. Git Workflow (Branching)

### 🔹 Commit ban đầu

```bash
git add .
git commit -m "init: setup calculator project with tests"
git push origin main
```

---

### 🔹 Tạo branch develop

```bash
git checkout -b develop
git push origin develop
```

---

### 🔹 Tạo feature branch

```bash
git checkout -b feature/add-logging
```

---

## ✍️ 8. Thay đổi code (simulate feature)

Sửa file:

```javascript
function add(a, b) {
  console.log("Adding:", a, b);
  return a + b;
}
```

---

### Commit

```bash
git add .
git commit -m "feat: add logging to add()"
git push origin feature/add-logging
```

---

## 🔁 9. Tạo Pull Request (trên GitHub UI)

### 🔹 Bước thực hiện

1. Vào repo trên GitHub
2. Chọn tab **Pull requests**
3. Nhấn **New Pull Request**
4. Chọn:

   * base: `develop`
   * compare: `feature/add-logging`

---

### 🔹 Điền thông tin PR

**Title:**

```
feat: add logging to calculator
```

**Description:**

```md
## Summary
Add console logging to add function

## Changes
- update add() function

## How to test
Run npm test
```

---

### 🔹 Tạo PR

👉 Nhấn **Create Pull Request**

---

## 🤖 10. Thêm GitHub Actions (CI)

### 🔹 Tạo file:

```
.github/workflows/ci.yml
```

---

### 📄 Nội dung:

```yaml
name: Node CI

on:
  pull_request:
  push:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

---

### 🔹 Commit

```bash
git add .
git commit -m "ci: add github actions"
git push
```

---

## 👀 11. Xem GitHub Actions

### 🔹 Trên GitHub:

* Vào tab **Actions**
* Chọn workflow

👉 Quan sát:

* 🟡 Running
* ✅ Success
* ❌ Failed

---

## ❌ 12. Mô phỏng CI fail

### 🔹 Sửa code sai

```javascript
return a + b + 10;
```

---

### Commit

```bash
git commit -am "bug: break add function"
git push
```

---

### 🔹 Quan sát

* Vào **Actions**
* ❌ Test FAIL

---

## 🔒 13. Protect branch main

### 🔹 Bước thực hiện (UI)

1. Vào **Settings**
2. Chọn **Branches**
3. Click **Add rule**

---

### 🔹 Cấu hình

**Branch name:**

```
main
```

---

### Tick các option:

* ✅ Require pull request before merging
* ✅ Require approvals (1)
* ✅ Require status checks to pass
* ✅ Require conversation resolution
* ❌ Allow force push
* ❌ Allow deletion

---

👉 Nhấn **Save**

---

## 🚫 14. Kiểm tra bảo vệ branch

### 🔹 Thử push trực tiếp

```bash
git checkout main
git commit --allow-empty -m "test push"
git push
```

👉 Kết quả:
❌ Bị từ chối

---

## 🔄 15. Fix bug và merge

### 🔹 Sửa lại code đúng

```javascript
return a + b;
```

---

### Commit

```bash
git commit -am "fix: correct add function"
git push
```

---

### 🔹 Trên GitHub

* CI → ✅ PASS
* PR → nút **Merge** được mở

👉 Click **Merge Pull Request**

---

## 📋 16. Câu hỏi đánh giá

1. Pull Request dùng để làm gì?
2. Tại sao không nên push trực tiếp vào main?
3. CI giúp phát hiện lỗi như thế nào?
4. Khi CI fail, chuyện gì xảy ra?
5. Branch protection giúp gì cho team?

---

## 🧠 17. Tổng kết

Sinh viên đã thực hiện:

* ✔ Tạo repo
* ✔ Viết code + test
* ✔ Tạo branch
* ✔ Tạo PR
* ✔ Quan sát CI
* ✔ Fix lỗi
* ✔ Protect branch

