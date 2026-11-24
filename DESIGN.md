# Design System & Guidelines

## 1. Aesthetic Vision & Theme
- **Theme**: Wizarding-Academy inspired, professional, scholarly, and inspirational.
- **Originality**: Strictly original assets and bespoke visual metaphors. Absolutely no official logos, copyrighted symbols, or trademarked film imagery.
- **Atmosphere**: Evoking quiet grand libraries, celestial observatories, illuminated manuscripts, and the scholarly pursuit of mastery.

---

## 2. Color Palette
| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| **Navy** | `#0a0e1a` | Deep nocturnal background, architectural canvas, night sky |
| **Antique Gold** | `#c9a24b` | Warm luminescent accents, gilded borders, interactive focus, starry embers |
| **Parchment Cream**| `#f2e8cf` | High-contrast readable typography, paper scrolls, organic highlights |

---

## 3. Typography
- **Headings & Sigils**: `Cinzel` (`var(--font-cinzel)`) — Classical Roman proportions, majestic academic authority.
- **Body & Information**: `Inter` (`var(--font-inter)`) — Modern, neutral, high-legibility sans-serif for deep reading.
- **Accents & Epigraphs**: `Cormorant Garamond` (`var(--font-cormorant)`) — Elegant, scholarly serif for quotes, subheadings, and poetic epigraphs.

---

## 4. Architectural Sections
1. **Intro**: Atmospheric prelude featuring the sanctum reveal, title presentation, and immersive transition.
2. **Hero**: Grand entry featuring the author's title, interactive 3D focal point, and call-to-action buttons.
3. **About**: Scholarly chronicle detailing engineering philosophy, core pillars, and creative background.
4. **Projects**: "The Great Works" — showcased codices and technical artifacts with live links and tag taxonomy.
5. **Skills**: "Disciplines of Mastery" — structured breakdown of visual computing, web architecture, and engineering principles.
6. **Contact**: "Send a Missive" — streamlined communication portal with direct contact links.

---

## 5. Engineering & Experience Rules
1. **3D Scope Boundaries**:
   - 3D rendering (Three.js / React Three Fiber / WebGL) is **strictly constrained to the Intro and Hero sections**.
   - Subsequent sections (About, Projects, Skills, Contact) must stay clean, lightweight, highly readable, and content-focused.
2. **Accessibility & Motion**:
   - Must strictly respect `prefers-reduced-motion: reduce`.
   - When reduced motion is enabled, disable particle drift, camera rotation, and custom cursors, providing immediate elegant static layouts.
3. **Responsive & Mobile Fallbacks**:
   - High-fidelity 2D graphic fallbacks and simplified canvas rendering for mobile viewports and low-power devices.
   - Touch devices revert automatically to native pointer interaction.
