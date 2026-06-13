# Daynest 🪺
**A Daily Task Manager with Calendar — Arabic & English UI**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-Persistent-4CAF50?style=flat)

---

## 🔗 Live Demo
[**→ View Live Project**]( https://ili1iml.github.io/Daynest/)

---


## 💡 About

**Daynest** is a bilingual daily planner that combines a task manager with an interactive calendar in one clean glassmorphism UI. Tasks persist across sessions using localStorage — no backend or database needed.

This is my third front-end project, built to practice real interactivity: data persistence, dynamic DOM rendering, filtering, and state management — all with Vanilla JavaScript.

---

## ✨ Features

- **Add / Edit / Delete Tasks** — Full CRUD without page reloads
- **Priority Levels** — High 🔴, Medium 🟡, Low 🟢 with auto-sort
- **Priority Filter** — Filter task list by priority in real time
- **Progress Bar** — Live completion percentage that updates on every action
- **localStorage Persistence** — Tasks survive page refreshes and browser closes
- **Interactive Calendar** — Navigate months, select dates, highlights today
- **Dark Mode Toggle** — Smooth theme switch with CSS variables
- **Live Clock** — Real-time clock in the status bar
- **Inline Editing** — Double-click any task to edit it in place
- **Custom Badge / Tag** — Label tasks with emoji categories (📚, 🛒, etc.)
- **Responsive Design** — Stacks to single column on mobile

---

## 🛠️ Built With

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Glassmorphism UI, CSS variables, dark mode, animations |
| Vanilla JavaScript | Full app logic — rendering, state, events, persistence |
| localStorage API | Client-side data persistence |
| Font Awesome 6 | Icons |
| Google Fonts (Inter) | Clean modern typeface |

---

## 📂 Project Structure

```
daynest/
├── index.html      # App layout and markup
├── style.css       # Full styling — glassmorphism, dark mode, responsive
├── script.js       # All app logic — tasks, calendar, localStorage, dark mode
└── README.md       # You are here
```

---

## 🚀 Getting Started

No installation or dependencies required.

```bash
# Clone the repository
git clone (https://github.com/ili1iml/Daynest.git)

# Navigate into the folder
cd daynest

# Open in your browser
open index.html
```

---

## 🧠 What I Learned

- Managing **application state** as a JavaScript array and syncing it to the DOM on every change
- Using **localStorage** to persist data across sessions without a backend
- Building a **dynamic calendar** from scratch — calculating first-day offsets, days-in-month, and prev/next month overflow cells
- Implementing **inline editing** with focus management and keyboard (`Enter` to save)
- Using **CSS custom properties** (`--variables`) to power a full dark/light mode switch with a single class toggle
- Applying **glassmorphism** styling with `backdrop-filter: blur()` and layered transparency
- Wrapping the entire script in an **IIFE** `(function() { ... })()` to avoid polluting the global scope

---

## 🗺️ Roadmap

- [ ] Add due dates and time to individual tasks
- [ ] Link tasks to specific calendar dates
- [ ] Add drag-and-drop task reordering
- [ ] Export tasks as a PDF or text file
- [ ] Rebuild with React — extract Calendar and TaskList as components
- [ ] Add sound or notification when a task is completed

---

## 👩‍💻 Author

**MOUAI ALOTAIBI**  
*Front-end developer in training — one project at a time*
---

> *Part of my front-end learning portfolio — building real projects to grow as a developer.*
