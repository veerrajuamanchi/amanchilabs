# Amanchi Labs Site Redesign — Design Spec
**Date:** 2026-10-08  
**Status:** Approved for implementation planning  
**Project:** amanchilabs.com — full visual and structural redesign

---

## 1. Summary

Replace the current long-scroll marketing page with a premium, app-style experience:  
**fixed left sidebar + full-screen, viewport-contained right canvas panels**.

The site must feel like a world-class software studio — light editorial foundation with dark immersive product showcases — and answer three questions within five seconds per view: *What is this? Why should I care? What can I do next?*

---

## 2. Design Principles

| Principle | Directive |
|---|---|
| **One screen. One message. One action.** | Each panel is self-contained in a single viewport at standard desktop sizes. No forced scrolling. |
| **Light editorial + dark premium hybrid** | Warm off-white foundation. Product panels are dark and immersive. |
| **Typography-first** | Strong type hierarchy does the heavy lifting. Copy is minimal, confident, and specific. |
| **No generic SaaS** | No excessive gradients, stock photography, feature-grid lists, or marketing jargon. |
| **Earned trust** | Privacy, local-first, user ownership are woven into the experience — not added as a footnote. |

---

## 3. Layout Architecture

### Desktop (≥1024px)

```
┌─────────────────┬──────────────────────────────────────────────┐
│  LEFT SIDEBAR   │                                              │
│  220–240px      │         RIGHT CONTENT CANVAS                │
│  Fixed          │         (fills remaining viewport)          │
│  warm off-white │         Full-screen per section              │
│                 │                                              │
│  [AMANCHI LABS] │         Active panel renders here            │
│                 │         Smooth crossfade transition          │
│  — Overview     │         on nav switch                       │
│  — WealthPrivate│                                              │
│  — DermaPrivate │                                              │
│  — Principles   │                                              │
│                 │                                              │
│  — Contact ↓   │                                              │
└─────────────────┴──────────────────────────────────────────────┘
```

### Mobile (< 768px)
- Left sidebar collapses into a top navigation bar.
- Hamburger or compact product switcher at top-right.
- Panels may scroll vertically within the viewport when content requires it at small screen sizes.
- Touch-friendly tap targets (min 44px).

### Tablet (768px–1023px)
- Sidebar may collapse to an icon-only rail (48px wide) or overlay on demand.
- Content canvas fills remaining space.

---

## 4. Left Sidebar Specification

**Width:** 220–240px (desktop)  
**Background:** Warm off-white (`#FAFAF8` or similar)  
**Position:** Fixed, full viewport height  
**Right border:** Subtle 1px separator (`rgba(0,0,0,0.06)`)

### Anatomy (top → bottom)

1. **Studio Brand** — `AMANCHI LABS` wordmark + mark, top section. Generous top padding. Not a link.
2. **Primary Navigation** — vertical stack with generous spacing:
   - Overview
   - WealthPrivate
   - DermaPrivate
   - Principles
3. **Contact** — pinned near bottom, subdued typographic treatment (not a nav item — a discreet link/button)
4. **Footer micro-copy** — optional: `© 2026 Amanchi Labs` in the smallest possible weight at the very bottom.

### Active State
- Active item: Charcoal text weight shift + a 2px left accent line or subtle background pill.
- No heavy borders, no chevrons, no nested sub-menus.

### Typography (Sidebar)
- Studio name: geometric sans, `11–12px`, tracked uppercase, charcoal.
- Nav items: refined sans, `14px`, medium weight, charcoal `#1C1C1C` (active) / muted `#999` (inactive).
- Hover: smooth opacity/color shift.

---

## 5. Navigation & Routing

| Concern | Solution |
|---|---|
| **URL state** | Each panel maps to a URL hash or path: `/`, `/wealth`, `/derma`, `/principles`, `/contact` |
| **Browser history** | `history.pushState` on panel switch so back/forward work naturally |
| **Keyboard navigation** | Tab order: sidebar links → content canvas. Arrow keys cycle sidebar items. |
| **Transitions** | Crossfade (`opacity` transition 150–200ms ease) on panel switch. No sliding. No page reload. |
| **Accessibility** | `role="navigation"`, `aria-current="page"` on active item. `role="main"` on canvas. Focus management on panel switch. |

---

## 6. Panel Specifications

### 6.1 Overview Panel (Default / Home)

**URL:** `/` or `/#overview`  
**Background:** Warm off-white (continuous with sidebar)  
**Purpose:** Studio identity and portfolio at a glance.

**Layout:**
- **Top-left block:** Studio name in editorial serif or geometric display type. Tagline below: *"Private by design. Intelligent by choice."* 
- **Centre/Right:** Two product cards side by side:
  - **WealthPrivate card:** Dark charcoal background, product name, one-line descriptor (*"Your financial life. Private. Organized. Understood."*), status badge, → link.
  - **DermaPrivate card:** Warm ivory/sage background, product name, one-line descriptor (*"Private skincare intelligence. Your routine. Your control."*), status badge, → link.
- **Below cards (or integrated):** 4-word studio values in subdued uppercase tracking: `PRIVATE · LOCAL · INTENTIONAL · INDEPENDENT`

**Copy:**
- Headline: `"Two products. One clear principle."`  
- Sub: `"We build software for the most personal parts of your life — and we build it right."`  
- No primary CTA button on this panel; the product cards are the CTAs.

---

### 6.2 WealthPrivate Panel

**URL:** `/wealth` or `/#wealth`  
**Split-canvas layout:** Left 40% copy / Right 60% visual

**Left column — Copy:**
- Eyebrow: `WEALTHPRIVATE — IN DEVELOPMENT`
- **Headline (display type, 48–56px):**  
  `"Your financial life.`  
  `Private. Organized.`  
  `Understood."`
- **Value proposition (2 lines, 16px):**  
  `"Turn scattered financial documents into a private, source-backed history of your financial life. On your device."`
- **3 attribute chips:** `Local-first · Source-traced · Optional AI`
- **CTA:** `"Join the early access list →"` (links to email or waitlist)
- **Trust footnote:** `"WealthPrivate does not store your financial data on its servers. Your finances. Your device."`

**Right column — Visual:**
- Full-height dark panel: deep charcoal `#141414` or near-black.
- Conceptual UI mockup: a premium financial dashboard — net worth line graph, document list, financial timeline. Clearly marked as **"Conceptual preview"** in small text.
- Restrained metallic or slate accent lines (not gold — too flashy).
- Optional: floating "Financial Fact" card showing a traced document source, labeled as illustrative.

**Visual identity:**
- Dark charcoal + slate + white text
- Typeface: geometric or transitional serif for display, system/geometric sans for UI
- Tone: financial precision, privacy, intelligence

---

### 6.3 DermaPrivate Panel

**URL:** `/derma` or `/#derma`  
**Split-canvas layout:** Left 40% copy / Right 60% visual

**Left column — Copy:**
- Eyebrow: `DERMAPRIVATE — AVAILABLE NOW`
- **Headline (display type, 48–56px):**  
  `"Your skincare.`  
  `Organized. Understood.`  
  `Private."`
- **Value proposition (2 lines, 16px):**  
  `"Plan and understand your skincare routine with ingredient-aware intelligence. AI may assist — you decide what to keep."`
- **3 attribute chips:** `Routine planning · Ingredient-aware · Optional AI`
- **CTA:** `"Explore DermaPrivate →"` (links to `dermaprivate-website.onrender.com`)
- **Trust footnote:** `"Core planning is local-first. AI is optional and user-initiated."`

**Right column — Visual:**
- Full-height warm panel: warm ivory `#F5F0E8` or muted sage `#E8EDE8`.
- Elevated version of the existing phone mockup — larger, more spacious, with additional detail cards floating around it (morning routine card, ingredient note card).
- Warm sage and cream tones throughout.
- Clearly labeled as illustrative if any unreleased features are shown.

**Visual identity:**
- Warm ivory + muted sage + soft charcoal text
- Tone: calm, thoughtful, personal, trustworthy

---

### 6.4 Principles Panel

**URL:** `/principles` or `/#principles`  
**Background:** Warm off-white

**Purpose:** Studio philosophy — what Amanchi Labs believes about how software should be built.

**Layout:** Minimal, editorial. No section within this panel requires scrolling.
- **Headline:** `"Technology should work for you."`
- **4 principles in a 2×2 grid or clean vertical list** (whichever fits viewport cleanly):

| # | Title | Body |
|---|---|---|
| 01 | Private by design | Privacy belongs in the architecture from the first sketch, not in a policy paragraph at the end. |
| 02 | Intelligent by choice | AI should improve understanding and reduce effort — visible, optional, and never quietly in charge. |
| 03 | You stay in control | A suggestion is a starting point. People decide what to save, change, or leave behind. |
| 04 | Made for real life | Focused tools for ordinary moments — carefully made, useful, and easy to understand. |

- **Studio footnote:** `"Amanchi Labs builds products for the most personal parts of life — skincare, finances — where trust is earned, not assumed."`

---

### 6.5 Contact Panel

**URL:** `/contact` or `/#contact`  
**Background:** Very dark charcoal (`#141414`) for contrast/impact — an exception to the light editorial foundation, used intentionally here.

**Purpose:** Brief, human, confident. Not a form.

**Layout:**
- **Studio mark** centered or anchored top-left.
- **Headline:** `"Let's build something useful."`
- **Body (2 sentences max):** `"Thoughtful questions, product feedback, or a good idea for a useful app — we'd like to hear from you."`
- **CTA:** `hello@amanchilabs.com` as a mailto link, styled as a large, clean typographic link (not a button).
- **Below:** `© 2026 Amanchi Labs · Independent product studio`

---

## 7. Typography System

| Role | Typeface | Notes |
|---|---|---|
| Display / headlines | Instrument Serif *or* Playfair Display (self-hosted/Google) | For editorial impact. Alternately: DM Serif Display. |
| Body / UI | Inter *or* Geist (Google/Vercel open) | Clean geometric sans. Currently used in most premium software sites. |
| Sidebar nav | Inter / Geist, medium | 14px, generous letter-spacing for nav items |
| Monospace accents | JetBrains Mono | Optional for status badges or code-like UI elements |

> **Note:** Font choice must be confirmed before implementation. Fonts must be either self-hosted or loaded from Google Fonts/Bunny Fonts for performance. No Adobe Typekit.

---

## 8. Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#FAFAF8` | Main background, sidebar |
| `--color-ink` | `#1C1C1C` | Primary text, headings |
| `--color-muted` | `#6B6B6B` | Secondary text, inactive nav |
| `--color-line` | `rgba(0,0,0,0.06)` | Sidebar border, dividers |
| `--color-wealth-bg` | `#141414` | WealthPrivate panel right, Contact panel |
| `--color-wealth-text` | `#F0F0EC` | Text on dark panels |
| `--color-derma-bg` | `#F5F0E8` | DermaPrivate panel right |
| `--color-derma-accent` | `#A8B8A0` | Sage accent for DermaPrivate |
| `--color-accent-line` | `#1C1C1C` | Active sidebar indicator |

---

## 9. Transitions & Motion

- **Panel switch:** `opacity` crossfade, 150ms ease-in-out. No sliding — prevents motion sickness and keeps it premium.
- **Sidebar hover:** `color` and `opacity` shift only, 100ms.
- **Active indicator:** Immediate, no animation.
- **`prefers-reduced-motion`:** All transitions disabled when user has this set. Panels appear instantly.
- **No entrance animations, no parallax, no scroll-triggered effects.** They are all banned in this design for quality control.

---

## 10. Mobile & Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `≥ 1024px` | Full desktop layout: fixed 240px sidebar + full canvas |
| `768px – 1023px` | Sidebar collapses to icon-only rail (48px) or disappears behind a top hamburger menu. Canvas fills viewport. |
| `< 768px` | Top navigation bar with studio name left, menu right. Tap opens an overlay menu listing all panels. Panels may scroll vertically if content exceeds viewport. |

---

## 11. URL & Routing Strategy

Use **client-side hash routing** (no server config needed, works with static hosting/Vite):
- `/#overview` → Overview panel
- `/#wealth` → WealthPrivate panel  
- `/#derma` → DermaPrivate panel
- `/#principles` → Principles panel
- `/#contact` → Contact panel

On load, read `window.location.hash` to set initial active panel. Update hash on nav click. Listen for `hashchange` to support browser back/forward. No page reloads.

---

## 12. Component Inventory

| Component | Description |
|---|---|
| `Sidebar` | Fixed nav: brand + nav items + contact link |
| `NavItem` | Individual sidebar nav item with active state |
| `PanelShell` | Full-screen canvas wrapper with crossfade transition |
| `OverviewPanel` | Studio intro + 2 product cards |
| `ProductCard` | Mini card used in Overview (dark or light variant) |
| `WealthPanel` | Split-canvas WealthPrivate panel |
| `DermaPanel` | Split-canvas DermaPrivate panel |
| `PrinciplesPanel` | Principles editorial panel |
| `ContactPanel` | Dark contact panel |
| `MobileNav` | Top nav bar + overlay menu for mobile |
| `ConceptualMockup` | WealthPrivate UI illustration (financial dashboard) |
| `RoutinePhone` | Elevated DermaPrivate phone mockup (from existing code) |
| `AttributeChip` | Small pill label: "Local-first", "Optional AI", etc. |

---

## 13. Out of Scope

- No blog or article system.
- No analytics or tracking scripts (privacy-first studio — no cookies or tracking pixels).
- No contact form (email link only).
- No e-commerce or payment flows.
- No user accounts or authentication.
- No backend; this remains a static Vite/React site deployed as before.

---

## 14. Success Criteria

A viewer landing on the site should be able to:

1. Understand what Amanchi Labs does in **< 5 seconds** on the Overview panel.
2. Navigate to WealthPrivate or DermaPrivate and understand each product in **< 5 seconds**.
3. Find the contact email without any searching.
4. Experience zero forced scrolling on a standard 1440×900 desktop viewport.
5. Use the site fully on a 375px mobile screen.
6. Navigate entirely via keyboard.
7. Share a direct URL to a specific product panel.
