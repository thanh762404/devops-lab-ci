# LAB NÂNG CAO – ReactJS Todo Priority App với Test, Pull Request, GitHub Actions và Branch Protection

## 1. Mục tiêu bài lab

Sau khi hoàn thành bài lab này, sinh viên có thể:

* tạo và chạy một ứng dụng ReactJS đơn giản
* xây dựng giao diện nhập và hiển thị dữ liệu
* tách logic xử lý ra file utility để dễ test
* viết unit test cho các hàm xử lý dữ liệu
* dùng GitHub theo quy trình thực tế:

  * tạo branch
  * commit
  * push
  * mở Pull Request
  * review
* cấu hình GitHub Actions để chạy lint và test
* cấu hình branch protection cho `main` và `develop`
* hiểu cách CI fail sẽ chặn merge

---

## 2. Mô tả bài toán

Xây dựng ứng dụng **Todo Priority App**.

Ứng dụng cho phép người dùng:

* thêm công việc mới
* đánh dấu hoàn thành
* lọc công việc theo trạng thái
* sắp xếp theo độ ưu tiên
* xem số lượng công việc đã hoàn thành và chưa hoàn thành

Ứng dụng này đơn giản hơn app quản lý sinh viên, nhưng phần quy trình phát triển sẽ nâng cao hơn một chút.

---

## 3. Chức năng cần làm

### 3.1. Chức năng giao diện React

Sinh viên cần làm các chức năng sau:

* nhập tên công việc
* chọn mức ưu tiên: `high`, `medium`, `low`
* thêm công việc vào danh sách
* hiển thị danh sách công việc
* bấm nút để đánh dấu hoàn thành
* lọc theo:

  * all
  * completed
  * pending
* hiển thị thống kê:

  * tổng số việc
  * số việc đã hoàn thành
  * số việc chưa hoàn thành

---

### 3.2. Các hàm xử lý dữ liệu cần viết

Tạo file `src/utils/todoUtils.js` và cài đặt các hàm sau:

```javascript
validateTodo(todo)
addTodo(list, todo)
toggleTodoStatus(list, id)
filterTodos(list, status)
sortTodosByPriority(list)
getTodoStats(list)
```

---

## 4. Yêu cầu chi tiết các hàm

### `validateTodo(todo)`

Kiểm tra dữ liệu đầu vào:

* `todo` phải là object
* `title` không được rỗng
* `priority` chỉ nhận một trong ba giá trị:

  * `high`
  * `medium`
  * `low`

Nếu không hợp lệ thì throw error.

---

### `addTodo(list, todo)`

* nhận danh sách hiện tại và một todo mới
* validate dữ liệu trước khi thêm
* trả về mảng mới có thêm todo
* không được sửa trực tiếp mảng cũ

---

### `toggleTodoStatus(list, id)`

* tìm todo theo `id`
* đảo trạng thái `completed`
* trả về mảng mới

---

### `filterTodos(list, status)`

* `status = "all"`: trả toàn bộ
* `status = "completed"`: trả các todo đã hoàn thành
* `status = "pending"`: trả các todo chưa hoàn thành

---

### `sortTodosByPriority(list)`

Sắp xếp độ ưu tiên theo thứ tự:

```text
high > medium > low
```

Trả về mảng mới.

---

### `getTodoStats(list)`

Trả về object:

```javascript
{
  total: ...,
  completed: ...,
  pending: ...
}
```

---

## 5. Cấu trúc thư mục yêu cầu

```text
todo-priority-app/
├─ src/
│  ├─ components/
│  │  ├─ TodoForm.jsx
│  │  ├─ TodoList.jsx
│  │  └─ TodoStats.jsx
│  ├─ utils/
│  │  └─ todoUtils.js
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ App.css
│  └─ index.css
├─ tests/
│  └─ todoUtils.test.js
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ eslint.config.js
├─ package.json
└─ README.md
```

---

## 6. Phần A – Tạo project ReactJS

### Bước 1: Tạo repository trên GitHub

Trên giao diện GitHub:

1. chọn **New repository**
2. đặt tên: `todo-priority-app`
3. chọn `Public`
4. tick `Add a README file`
5. nhấn **Create repository**

---

### Bước 2: Clone repo về máy

```bash
git clone https://github.com/<username>/todo-priority-app.git
cd todo-priority-app
```

---

### Bước 3: Khởi tạo React app bằng Vite

```bash
npm create vite@latest . -- --template react
npm install
```

---

### Bước 4: Cài công cụ test và lint

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

---

## 7. Phần B – Cấu hình package.json

Cập nhật phần scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "preview": "vite preview"
  }
}
```

---

## 8. Phần C – Viết utility functions

## File `src/utils/todoUtils.js`

```javascript
const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
};

export function validateTodo(todo) {
  if (!todo || typeof todo !== "object") {
    throw new Error("Todo must be an object");
  }

  if (!todo.title || todo.title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!["high", "medium", "low"].includes(todo.priority)) {
    throw new Error("Invalid priority");
  }

  return true;
}

export function addTodo(list, todo) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  validateTodo(todo);
  return [...list, todo];
}

export function toggleTodoStatus(list, id) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  return list.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function filterTodos(list, status) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  if (status === "completed") {
    return list.filter((todo) => todo.completed);
  }

  if (status === "pending") {
    return list.filter((todo) => !todo.completed);
  }

  return list;
}

export function sortTodosByPriority(list) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  return [...list].sort(
    (a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
  );
}

export function getTodoStats(list) {
  if (!Array.isArray(list)) {
    throw new Error("List must be an array");
  }

  const completed = list.filter((todo) => todo.completed).length;
  const total = list.length;

  return {
    total,
    completed,
    pending: total - completed,
  };
}
```

---

## 9. Phần D – Viết giao diện ReactJS

## File `src/components/TodoForm.jsx`

```javascript
import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Tên công việc không được để trống");
      return;
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      priority,
      completed: false,
    });

    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Thêm công việc</h2>

      <input
        type="text"
        placeholder="Nhập tên công việc"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Thêm</button>
    </form>
  );
}
```

---

## File `src/components/TodoList.jsx`

```javascript
export default function TodoList({ todos, onToggle }) {
  return (
    <div className="card">
      <h2>Danh sách công việc</h2>

      {todos.length === 0 ? (
        <p>Chưa có công việc nào.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div>
                <strong>{todo.title}</strong>
                <p>
                  Priority: {todo.priority} | Status:{" "}
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <button onClick={() => onToggle(todo.id)}>
                {todo.completed ? "Bỏ hoàn thành" : "Hoàn thành"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## File `src/components/TodoStats.jsx`

```javascript
export default function TodoStats({ stats }) {
  return (
    <div className="stats-grid">
      <div className="card">
        <h3>Tổng công việc</h3>
        <p>{stats.total}</p>
      </div>
      <div className="card">
        <h3>Đã hoàn thành</h3>
        <p>{stats.completed}</p>
      </div>
      <div className="card">
        <h3>Chưa hoàn thành</h3>
        <p>{stats.pending}</p>
      </div>
    </div>
  );
}
```

---

## File `src/App.jsx`

```javascript
import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import {
  addTodo,
  filterTodos,
  getTodoStats,
  sortTodosByPriority,
  toggleTodoStatus,
} from "./utils/todoUtils";
import "./App.css";

const initialTodos = [
  { id: 1, title: "Học React", priority: "high", completed: false },
  { id: 2, title: "Làm bài lab GitHub", priority: "medium", completed: true },
  { id: 3, title: "Viết test", priority: "high", completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");

  function handleAdd(todo) {
    setTodos((prev) => addTodo(prev, todo));
  }

  function handleToggle(id) {
    setTodos((prev) => toggleTodoStatus(prev, id));
  }

  const displayedTodos = useMemo(() => {
    return sortTodosByPriority(filterTodos(todos, filter));
  }, [todos, filter]);

  const stats = useMemo(() => getTodoStats(todos), [todos]);

  return (
    <div className="app-container">
      <h1>Todo Priority App</h1>
      <p>Ứng dụng ReactJS dùng để thực hành GitHub Flow, Test và CI.</p>

      <TodoForm onAdd={handleAdd} />

      <div className="filter-box">
        <label>Lọc công việc: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="completed">Đã hoàn thành</option>
          <option value="pending">Chưa hoàn thành</option>
        </select>
      </div>

      <TodoStats stats={stats} />
      <TodoList todos={displayedTodos} onToggle={handleToggle} />
    </div>
  );
}
```

---

## 10. Phần E – Viết test

## File `tests/todoUtils.test.js`

```javascript
import {
  validateTodo,
  addTodo,
  toggleTodoStatus,
  filterTodos,
  sortTodosByPriority,
  getTodoStats,
} from "../src/utils/todoUtils";

describe("todoUtils", () => {
  const sampleTodos = [
    { id: 1, title: "Task A", priority: "medium", completed: false },
    { id: 2, title: "Task B", priority: "high", completed: true },
    { id: 3, title: "Task C", priority: "low", completed: false },
  ];

  test("validateTodo should accept valid todo", () => {
    expect(
      validateTodo({
        id: 1,
        title: "Learn Vitest",
        priority: "high",
        completed: false,
      })
    ).toBe(true);
  });

  test("validateTodo should throw if title is empty", () => {
    expect(() =>
      validateTodo({
        id: 1,
        title: "",
        priority: "high",
        completed: false,
      })
    ).toThrow();
  });

  test("addTodo should add new todo", () => {
    const newTodo = {
      id: 4,
      title: "Task D",
      priority: "medium",
      completed: false,
    };

    const result = addTodo(sampleTodos, newTodo);
    expect(result).toHaveLength(4);
    expect(result[3].title).toBe("Task D");
  });

  test("toggleTodoStatus should change completed state", () => {
    const result = toggleTodoStatus(sampleTodos, 1);
    expect(result[0].completed).toBe(true);
  });

  test("filterTodos should return completed todos", () => {
    const result = filterTodos(sampleTodos, "completed");
    expect(result).toHaveLength(1);
  });

  test("sortTodosByPriority should put high first", () => {
    const result = sortTodosByPriority(sampleTodos);
    expect(result[0].priority).toBe("high");
  });

  test("getTodoStats should return correct stats", () => {
    const result = getTodoStats(sampleTodos);
    expect(result).toEqual({
      total: 3,
      completed: 1,
      pending: 2,
    });
  });
});
```

---

## 11. Phần F – Chạy app và test local

### Chạy app

```bash
npm run dev
```

### Chạy lint

```bash
npm run lint
```

### Chạy test

```bash
npm test
```

Sinh viên cần chụp màn hình hoặc ghi nhận kết quả:

* app chạy thành công
* lint pass
* test pass

---

## 12. Phần G – Quy trình GitHub nâng cao hơn một chút

## Bước 1: Commit lần đầu

```bash
git add .
git commit -m "init: setup todo priority app"
git push origin main
```

---

## Bước 2: Tạo branch `develop`

```bash
git checkout -b develop
git push origin develop
```

---

## Bước 3: Tạo feature branch để phát triển chức năng mới

Ví dụ:

```bash
git checkout -b feature/add-filter-and-stats
```

---

## Bước 4: Code tiếp trên branch feature

Ví dụ sinh viên thêm:

* filter completed/pending
* thống kê số việc hoàn thành

Sau đó commit:

```bash
git add .
git commit -m "feat: add filter and todo statistics"
git push origin feature/add-filter-and-stats
```

---

## 13. Phần H – Tạo Pull Request trên GitHub

Trên giao diện GitHub:

1. vào tab **Pull requests**
2. chọn **New pull request**
3. chọn:

   * base: `develop`
   * compare: `feature/add-filter-and-stats`

### Nội dung PR gợi ý

**Title**

```text
feat: add filter and todo statistics
```

**Description**

```md
## Summary
Add filter feature and todo statistics

## Changes
- add filter by status
- add stats component
- add utility tests

## How to test
- run npm install
- run npm test
- run npm run lint
- run npm run dev
```

---

## 14. Phần I – Cấu hình GitHub Actions

Tạo file `.github/workflows/ci.yml`

```yaml
name: React CI

on:
  push:
    branches:
      - main
      - develop
      - feature/**
  pull_request:
    branches:
      - main
      - develop

jobs:
  test-and-lint:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build app
        run: npm run build
```

---

## 15. Phần J – Xem Actions trên GitHub

Trên giao diện GitHub:

1. vào tab **Actions**
2. chọn workflow vừa chạy
3. quan sát các bước:

   * checkout
   * setup node
   * install
   * lint
   * test
   * build

Sinh viên cần mô tả:

* bước nào chạy trước
* bước nào fail nếu code lỗi
* CI có pass hay không

---

## 16. Phần K – Mô phỏng lỗi CI

Đây là phần nâng cao hơn một chút so với lab cơ bản.

### Cách 1: Tạo lỗi test

Sửa hàm `getTodoStats` sai logic, ví dụ:

```javascript
pending: total - completed - 1
```

Commit:

```bash
git commit -am "test: simulate wrong stats logic"
git push
```

Kết quả mong đợi:

* test fail
* GitHub Actions fail
* PR không được merge nếu branch protection đã bật

---

### Cách 2: Tạo lỗi lint

Ví dụ thêm biến không dùng:

```javascript
const unusedValue = 123;
```

Commit và push lại.

Kết quả mong đợi:

* lint fail
* CI fail
* PR bị chặn

---

## 17. Phần L – Cấu hình Branch Protection

### 17.1. Protect branch `main`

Trên GitHub:

1. vào **Settings**
2. chọn **Branches**
3. chọn **Add rule** hoặc **Add branch protection rule**
4. nhập tên branch:

```text
main
```

### Chọn các option:

* Require a pull request before merging
* Require approvals: 1
* Require status checks to pass before merging
* Require conversation resolution before merging
* Do not allow force pushes
* Do not allow deletions

Lưu cấu hình.

---

### 17.2. Protect branch `develop`

Thêm một rule khác cho:

```text
develop
```

Chọn tương tự, nhưng có thể yêu cầu nhẹ hơn hoặc bằng `main`.

Khuyến nghị:

* bắt buộc PR
* bắt buộc CI pass
* cấm force push

---

## 18. Phần M – Kiểm tra branch protection

### Thử push trực tiếp vào `main`

```bash
git checkout main
git commit --allow-empty -m "test direct push to main"
git push origin main
```

Kết quả mong đợi:

* GitHub từ chối push trực tiếp

---

### Thử merge khi CI fail

Sinh viên cần chụp hoặc mô tả:

* PR đang có trạng thái fail
* nút merge bị khóa hoặc không nên được phép merge

---

## 19. Phần N – Yêu cầu nâng cao thêm một chút

Ngoài các chức năng chính, sinh viên cần làm thêm **ít nhất 1 trong 2 yêu cầu sau**:

### Lựa chọn A

Thêm bộ lọc theo mức độ ưu tiên:

* all
* high
* medium
* low

### Lựa chọn B

Thêm nút “Xóa công việc” và viết thêm test cho hàm xóa.

Ví dụ hàm mới:

```javascript
removeTodo(list, id)
```

---

## 20. Câu hỏi thảo luận

1. Vì sao nên tách logic xử lý dữ liệu sang file utility thay vì viết hết trong component?
2. Vì sao CI nên chạy cả `lint`, `test` và `build`?
3. Pull Request có lợi gì hơn so với push trực tiếp lên `main`?
4. Branch protection giúp nhóm phát triển tránh những rủi ro nào?
5. Nếu test pass ở máy cá nhân nhưng fail trên GitHub Actions thì có thể do những nguyên nhân gì?

---

## 21. Tiêu chí hoàn thành bài lab

Sinh viên được xem là hoàn thành khi có đủ:

* app ReactJS chạy được bằng `npm run dev`
* có thể thêm công việc và hiển thị danh sách
* có filter theo trạng thái
* có thống kê công việc
* có file utility riêng
* có test cho các hàm utility
* test pass
* lint pass
* build pass
* có workflow GitHub Actions
* có ít nhất 1 Pull Request
* đã cấu hình protect branch `main`
* mô phỏng được ít nhất 1 lần CI fail


