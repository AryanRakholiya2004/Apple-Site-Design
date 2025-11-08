# Apple_Site — Frontend (Vue 3 + Vite)

Hey — this is the frontend part of my Apple-inspired landing demo. It's a small, component-driven UI built with Vue 3, Vite and Tailwind, meant to look polished and be easy to run for quick demos.

---

## Preview
<video controls playsinline style="max-width:100%; height:auto;">
    <source src="https://github.com/user-attachments/assets/9960cf77-7b7a-4537-8e23-b1789c7a39c7" type="video/mp4">
    Your browser does not support the video element. Download the video: [MP4](https://github.com/user-attachments/assets/9960cf77-7b7a-4537-8e23-b1789c7a39c7)
</video>

[Open the live demo ↗](http://aryanrakholiya.me/Apple-Site-Design/)

Notes:
- Recommended formats: MP4 (H.264) and WebM for broader browser support.
- Use a small poster image (poster="/hero-poster.jpg") if you want a preview frame.
- For in-app usage (Vue), import the asset inside a component instead of using public/.

## TL;DR
A clean, responsive demo frontend that highlights:
- Hero + product detail sections
- Camera / design / ports showcases
- Timeline/progress visual
- Embedded 3D model component placeholder
- Built with Vue 3, Vite and Tailwind for snappy dev feedback

---

## What this project is about / purpose
I built this to demonstrate frontend fundamentals and product-focused layouts:
- Component architecture and composition
- Responsive, mobile-first design
- Smooth, portfolio-ready visuals (and a 3D model placeholder to hint at advanced UI)
It’s a demo app — not a full product — because i am still learning this '3D' stuff 😅 !!

---

## Features (what you can brag about)
- Navbar, Hero, multiple Design sections, Performance and Footer components
- Model_3d.vue — placeholder for a 3D viewer (swap in model-viewer or Three.js)
- Time-line-bar.vue — simple interactive timeline / progress bar


---

## Tech & tools
- Vue 3 (SFCs)
- Vite (fast dev + bundling)
- Tailwind CSS + PostCSS
- Standard dev setup: index.html, main.js, App.vue

---

## Project structure (high-level)
```bash

Apple-Site-Design/
├── 📄 README.md
├── 📄 postcss.config.js
├── 📄 package-lock.json
├── 📄 tailwind.config.js
├── 📄 vite.config.js
├── 📄 package.json
├── 📄 index.html
├── 📁 src
│   ├── 📄 coordinates of apple site design.xlsx
│   ├── 📄 style.css
│   ├── 📄 index.css
│   ├── 📄 main.js
│   ├── 📄 App.vue
│   ├── 📁 components
│   │   ├── 📄 PerformanceSection.vue
│   │   ├── 📄 Design-Body-Section.vue
│   │   ├── 📄 Design-Camera-Section.vue
│   │   ├── 📄 DesignSection.vue
│   │   ├── 📄 Design-Ports-Section.vue
│   │   ├── 📄 Model_3d.vue
│   │   ├── 📄 FooterSection.vue
│   │   ├── 📄 Navbar.vue
│   │   ├── 📄 HeroSection.vue
│   │   └── 📄 Time-line-bar.vue
│   └── 📁 assets
│       ├── 📄 iphone-17-pro_overview__er68vecct16q_og.png
│       ├── 📄 apple-logo.png
│       ├── 📄 [CITYPNG.COM]Orange iPhone 17 Pro in Back View - 4000x4000.png
│       ├── 📄 Deep_Blue.png
│       ├── 📄 [CITYPNG.COM]Orange iPhone 17 Pro Top Back View - 4000x4000.png
│       ├── 📄 Silver.png
│       ├── 📄 vue.svg
│       ├── 📄 cosmic_orange.jpg
│       ├── 📄 icons8-apple.svg
│       └── 📄 iPhone_model.glb
└── 📁 public
    └── 📄 vite.svg


```

---

## Quick start (run it locally)
1. ``` cd frontend```
2. ``` npm install```
3. ``` npm run dev```
4. ``` Open the URL Vite prints (usually http://localhost:3000)```

(Check package.json if scripts differ.)

---

## Tips & next steps
- Replace Model_3d.vue with model-viewer / Three.js for real 3D
- Add unit/component tests (Vitest/Jest)
- Connect to an API to show dynamic rendering
- Add Lighthouse checks and ARIA improvements for accessibility

---

## What this shows about me
- Comfortable with modern frontend tooling (Vue + Vite) 😌.
- Builds reusable components and clean layouts 🤔.
- Cares about visuals and UX details (3D, timeline, responsive) 🧐.
- Can prepare demos that are easy to run for interviews 😅.

---