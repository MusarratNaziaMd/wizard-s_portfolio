# Wizarding Academy Portfolio

A Next.js (App Router) portfolio crafted with TypeScript, Tailwind CSS, Three.js, React Three Fiber, and modern animation libraries (GSAP, Lenis, Framer Motion).

## Aesthetic & Theme
- **Theme**: Wizarding-academy inspired, scholarly, and inspirational with bespoke assets.
- **Palette**: Navy (`#0a0e1a`), Antique Gold (`#c9a24b`), Parchment Cream (`#f2e8cf`).
- **Typography**: Cinzel (Headings), Inter (Body), Cormorant Garamond (Accents).

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build & Production

```bash
npm run build
npm run start
```

## Project Structure
- `src/components/intro/`: Atmospheric 3D intro scene, overlay, and name reveal components.
- `src/components/sections/`: Hero, About, Projects, Skills, and Contact page sections.
- `src/components/three/`: Shared 3D components (floating candles, particles, embers).
- `src/components/ui/`: Reusable UI elements (buttons, custom cursor, navigation).
- `src/hooks/`: Utility hooks (`useReducedMotion`, `useWindowSize`).
- `src/lib/`: Common utility functions.
- `src/styles/`: Custom stylesheet tokens.
- `public/models/`, `public/textures/`, `public/fonts/`: Static 3D, texture, and font assets.
