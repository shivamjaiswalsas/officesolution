# React Flow Tasks (Vite + React)

This project is built with **Vite** and React. It covers 4 tasks:

1. **Task 1:** Fetch posts from API and display in a table with loader & error handling.
2. **Task 2:** Cache API responses (localStorage + React state) with refresh option.
3. **Task 3:** Search & filter cached posts with debounce.
4. **Task 4:** Dynamic React Flow editor (add nodes, drag, connect, clear canvas).

---

## 🚀 Setup (Vite)

### 1. Create Vite Project
```bash
npm create vite@latest my-app --template react
cd my-app
```

### 2. Install Dependencies
```bash
npm install
npm install @xyflow/react   # React Flow
```

(Optional) Install Tailwind for styling:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Add the Code
Replace `App.jsx` with the provided code (Tasks 1–4 + FlowEditorApp).

### 4. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173).

---

## 📚 Libraries
- **React** — UI framework
- **@xyflow/react** — React Flow library for building node-based editors
- **Tailwind CSS** (optional) — utility classes for styling

---

## 📝 Features
- Task 1: API fetch + loader + error + pagination
- Task 2: Cache posts in localStorage
- Task 3: Search & filter cached posts (debounced)
- Task 4: Flow editor (Add Node, drag/connect, clear canvas, optional post labels)

---

## 🛠 Notes
- Make sure to import CSS for React Flow:
  ```js
  import "@xyflow/react/dist/style.css";
  ```
- If Tailwind is not configured, replace Tailwind classes with normal CSS.

---

## 🎯 Next Ideas
- Custom node shapes or colors
- Export/import flow as JSON
- Node detail panel to edit labels
