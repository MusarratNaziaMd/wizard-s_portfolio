# Design System & Guidelines

## 1. Aesthetic Vision & Theme
- **Theme**: Wizarding-Academy inspired, professional, scholarly, and inspirational.
- **Originality**: Strictly original assets and bespoke visual metaphors. Absolutely no official logos, copyrighted symbols, or trademarked film imagery.
- **Atmosphere**: Evoking quiet grand libraries, celestial observatories, illuminated manuscripts, and the scholarly pursuit of mastery.

---

## 2. Color Palette
| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| **Navy** | `#0a0e1a` | Deep nocturnal foundation, core background |
| **Midnight** | `#0b1030` | Atmospheric night sky gradient, deep celestial backdrop |
| **Antique Gold** | `#c9a24b` | Primary gilded accents, borders, interactive focus, stars |
| **Parchment Cream**| `#f2e8cf` | Primary high-contrast readable typography, scrolls |
| **Burgundy** | `#4a0e1f` | Scholarly robes, wax-seal badges, warm section accents |
| **Forest** | `#0f3d2e` | Ancient herbology & astronomy accents, subtle depth |
| **Candle Amber** | `#ffb347` | Floating candle flames, warm volumetric radiance |
| **Moon Silver** | `#cfd8ff` | Cool celestial ceiling, starlight highlights, lunar glow |

---

## 3. Typography
- **Headings & Sigils**: `Cinzel` (`var(--font-cinzel)`) — Classical Roman proportions, majestic academic authority.
- **Body & Information**: `Inter` (`var(--font-inter)`) — Modern, neutral, high-legibility sans-serif for deep reading.
- **Accents & Epigraphs**: `Cormorant Garamond` (`var(--font-cormorant)`) — Elegant, scholarly serif for quotes, subheadings, and poetic epigraphs.

---

## 4. Architectural Sections
1. **Intro**: Atmospheric prelude featuring the sanctum reveal, title presentation, and immersive transition.
2. **Hero**: The Great Hall — floating candles, distant castle silhouette, starry ceiling, and call-to-action buttons.
3. **About**: Scholarly chronicle detailing engineering philosophy, core pillars, and creative background.
4. **Projects**: "The Quests" — showcased codices with wax seals and torn-edge borders.
5. **Skills**: "Disciplines of Mastery" — structured breakdown of visual computing, web architecture, and engineering principles.
6. **Experience**: "The Apprenticeship" — vertical timeline with glowing guild nodes.
7. **Contact**: "The Owl Post" — streamlined communication portal with direct contact links.

---

## 5. Engineering & Experience Rules
1. **3D Scope Boundaries**:
   - 3D rendering (Three.js / React Three Fiber / WebGL) is **strictly constrained to the Intro and Hero sections**.
   - Subsequent sections (About, Projects, Skills, Experience, Contact) must stay clean, lightweight, highly readable, and content-focused.
2. **Accessibility & Motion**:
   - Must strictly respect `prefers-reduced-motion: reduce`.
   - When reduced motion is enabled, disable particle drift, camera rotation, and custom cursors, providing immediate elegant static layouts.
3. **Responsive & Mobile Fallbacks**:
   - High-fidelity 2D graphic fallbacks and simplified canvas rendering for mobile viewports and low-power devices.
   - Touch devices revert automatically to native pointer interaction.
