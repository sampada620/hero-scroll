# Scroll-Driven Hero Section Animation

A scroll-driven hero section where a car drives across the screen as you scroll, leaving a glowing trail behind it.

🔗 **Live Demo:** https://sampada620.github.io/hero-scroll/

## Tech Stack
- React (Vite)
- Tailwind CSS
- GSAP (ScrollTrigger)

## Features
- Staggered headline reveal and animated stat cards on page load
- Number count-up animation for stats
- Scroll-linked car movement using GSAP ScrollTrigger (`scrub` + `pin`)
- Neon trail that grows with scroll progress
- Parallax motion on stat cards
- Transform-only animations for smooth performance
- Responsive layout

## Run Locally
```bash
npm install
npm run dev
```

Then open http://localhost:5173/hero-scroll/

## Deploy
```bash
npm run deploy
```

## Inspiration
Recreated from the [car scroll animation](https://paraschaturvedi.github.io/car-scroll-animation) reference with a custom neon night-drive design.
