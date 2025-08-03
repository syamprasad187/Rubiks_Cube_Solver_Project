# 🧩 Rubik's Cube Solver Project

A 3D interactive Rubik's Cube simulator and solver built using **Three.js** (JavaScript) and a **Python-based solving engine**. This project allows users to enter scramble sequences, visualize the cube in 3D, and animate the solving process directly in the browser.

---

## 📌 Features

- Fully interactive 3D Rubik's Cube using Three.js
- User-defined scramble input
- Real-time solving animation on button click
- Handles normal (e.g., R), prime (e.g., R'), and double (e.g., R2) moves
- Inverse solution generated automatically from scramble
- Clean UI and intuitive interaction
- Works entirely in the browser

---

## 🚀 How It Works

1. You open `index.html` in your browser.
2. Enter any scramble (e.g., `R U R' U' R' F R2 U'`).
3. Click `Apply Scramble` — the cube visually scrambles.
4. Click `Solve Cube` — the cube animates back to the solved state.

---

## 🧠 Technologies Used

- 🧠 **Python** – Handles logic for solving (can be extended later)
- 🎨 **JavaScript (Three.js)** – Handles 3D rendering and animation
- 🧾 **HTML/CSS** – User interface

---

## 📂 Folder Structure
```bash
Rubiks_Cube_Solver_Project/
│
├── index.html # Main HTML interface
├── app.js # Cube creation, animation, scramble & solve logic
├── style.css # (Optional) Add styling here if needed
├── solver.py # Python script for solving logic
├── .gitignore # Git ignore rules for Python and Web
└── README.md # Project documentation
```


---

## 🎮 How to Use

1. Open the project folder.
2. Run `index.html` in your browser.
3. In the input box, paste a scramble sequence like: ``R U R' U' R' F R2 U'``

4. Click `Apply Scramble`.
5. Then click `Solve Cube` to see the solution animate automatically.

---

## 📷 Demo Preview



https://github.com/user-attachments/assets/a4fb3889-1e06-46f9-9d12-8c70dcdc9a4c



---

## 🙋‍♂️ Author

Developed by **Uppu Syam Prasad** as part of **AeroHack 2025 - CS (Design Dexterity Challenge)** using **Three.js** and **Python**.

