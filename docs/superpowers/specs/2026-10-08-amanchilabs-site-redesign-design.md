# Amanchi Labs Site Redesign — Design Spec
**Date:** 2026-10-08 (revised 2026-10-10 after screenshot approval)

**Status:** Option A layouts and scoped local implementation plan approved; implemented locally, final review and publication authorization pending
**Project:** amanchilabs.com — full visual and structural redesign

## Approved Overview And Products Revision (2026-10-10)

This revision supersedes conflicting earlier Overview, navigation, component, and scroll requirements. The existing product, Principles, and Contact panel designs remain unchanged. Production implementation is not authorized until the new implementation plan is approved. Merge, push, and deployment require separate authorization.

**Approved visual baselines:** revised Sequential Editorial Overview and two-product Products view, desktop and mobile:

- [Desktop Overview](../../reviews/a-revised-1440x900-full.png)
- [Mobile Overview](../../reviews/a-revised-375x812-full.png)
- [Desktop Products](../../reviews/products-revised-1440x900-full.png)
- [Mobile Products](../../reviews/products-revised-375x812-full.png)
- [Review prototype](../../reviews/overview-concepts.html) is a visual reference, not production architecture.

**Final approved refinements:** add Products to navigation; use the customer-facing Products disclosure specified below; clarify the diagram explanation as a design intention. These three refinements are approved text/navigation changes to the screenshot baselines, not permission for another redesign.

**Navigation:** four un-nested primary destinations in this order: Overview, Products, Principles, Contact. Contact retains its desktop footer position and icon. WealthPrivate and DermaPrivate remain full individual panels, discoverable through Products and their existing direct hashes. Do not add speculative products, nested menus, or duplicate top-level product entries.

**Routes:** `/#overview`, `/#products`, `/#wealth`, `/#derma`, `/#principles`, `/#contact`. The primary menu has four entries; the application has six valid panel routes. On individual product routes, style Products as the portfolio parent context but do not mark its link `aria-current="page"` because that exact route is not current. Provide product-page context through the existing heading and retain access to Products through navigation.

**Layout:** normal content-sized rows within the existing scrollable canvas. Overview intentionally scrolls on desktop and mobile; hero, supporting message, and primary action must fit in the initial requested desktop viewports at normal zoom. Products should fit naturally at 1440x900 and 1280x800 without artificial stretching; allow graceful scrolling at shorter heights, narrow widths, and zoom. Do not use fixed content heights, viewport-bottom card anchoring, or viewport-centered hero content. Keep 240px sidebar at widths of at least 1024px and the existing 56px top navigation below 1024px. Preserve approved mobile composition rather than its historical content height.

**Brand:** retain Instrument Serif, Inter, warm off-white, charcoal, restrained sage, and the existing wordmark, icons, focus styling, and reduced-motion behavior.

### Approved Overview Content

1. **Company vision:** eyebrow `AMANCHI LABS`; headline `Your life is personal. Your technology should respect that.`
2. **Belief:** `We believe useful software shouldn't require you to surrender control of your personal information.`
3. **Company positioning:** `Amanchi Labs builds thoughtful, local-first applications designed to keep more of your information on your own device — and put you in charge of what you choose to share.` This expresses design direction, not independently verified behavior of all products.
4. **Primary action:** `Explore our philosophy` opens `/#principles`.
5. **Distinct brand layers:** `Private by Design. Local by Default.` and `Your Data. Your Device. Your Control.` Preserve the nearby design-intention framing; neither is a security guarantee.
6. **Privacy problem:** `Your life is not a dataset.` Explain briefly that records, conversations, routines, and documents are parts of life, and using an app should not automatically turn them into another company's stored asset. Recognize connected-service benefits, increased exposure from unnecessary collection, breach notifications, and local security risks without fear-based messaging.
7. **Approach:** `Useful software. Less unnecessary exposure.` Present the remaining three ideas in a sequential editorial list: `Not everything needs the cloud.`, `Intelligence without unnecessary exposure.`, `Your information remains yours.` Local processing, optional transparent user-initiated AI, and control over access, retention, sharing, export, and deletion are design intentions. Retain the explicit intention framing from the approved prototype; do not present export or deletion as universally shipped capabilities.
8. **Architecture:** `Your information. Your decision.` Three prominent stages: You / Choose your information; Your device / Local storage and processing; Optional AI / Selected information, with permission / External provider. A solid local path and a dashed permission-dependent external transfer distinguish the normal workflow from an optional request. Mobile stacks these stages. Provide an equivalent accessible text description; do not rely on color or arrows alone.
9. **Final diagram explanation:** `Our design intention: your information remains on your device by default. When you choose to use an external AI feature, selected information may be sent to the provider. You should always know what is being shared and why.` Follow with `Illustrative design philosophy, not a verified representation of every Amanchi Labs product. Other transfers, including backups, integrations, or telemetry, vary by product.`
10. **Discovery:** `One philosophy. A family of personal applications.` Briefly envision tools for finances, personal routines, documents, and everyday life without naming or promising speculative applications. `Explore our products` opens `/#products`, never a same-page scroll or direct WealthPrivate redirect.

### Approved Products Content

- Eyebrow `AMANCHI LABS / PRODUCTS`; headline `Personal applications. A shared philosophy.`
- Supporting copy: `Explore the applications we're building for financial information and personal routines.`
- Equal-prominence two-column desktop presentation; single-column mobile; preserve approved spacing and typography. No Overview product cards or additional product mockups are required.
- WealthPrivate: `IN DEVELOPMENT`; development-oriented description; `Discover WealthPrivate` opens `/#wealth`.
- DermaPrivate: skincare/personal-routines description; no unverified availability badge; `Discover DermaPrivate` opens `/#derma`.
- Use the approved prototype's short product descriptions, not the older claim-heavy trust attributes from `products.ts`.
- Replace the engineering-style warning with: `Each Amanchi Labs application is designed with privacy in mind. Features and data-handling practices vary by product; explore each application to learn how it works.`
- `Back to Overview` opens `/#overview`.

### Claim Verification And Approval Gates

The website and mockups are not evidence of product data handling. Before publishing any product-specific assertion, independently inspect the actual product implementation and document product, platform, release/commit, workflow, evidence, limitations, and reviewer. Verify storage, optional AI payloads/consent/provider policies, encryption, integrations, logs/telemetry, backup/sync, accounts, retention, export, deletion, and user controls. Do not claim offline operation, unnecessary accounts, one-time purchases, AI masking, or zero server storage without evidence. Keep the detailed checklist in development documentation rather than public UI.

Existing product-page claims must be audited as well as new copy. Preserve product-page layout and working links; any required correction to their copy must be documented and approved before editing those panels. Missing product repositories or workflow evidence blocks claim sign-off and publication, not documentation planning. Do not infer verification from current marketing copy or a live landing page.

**Acceptance:** compare production implementation against the four approved screenshot baselines and final refinements at 1440x900, 1280x800, 1024x768, and 375x812; additionally check tablet transition, short heights, actual browser zoom 125%/200%, keyboard/drawer focus, all six hashes, Back/Forward, fonts/assets, reduced motion, no clipped content or horizontal overflow, and existing product/contact links. CSS zoom stress tests already performed on mockups do not replace actual browser-zoom verification. Build and TypeScript must pass; add a focused frontend regression suite because none currently exists. Final implementation review and publication authorization remain separate gates.

## Final Pre-Implementation Refinements (Approved 2026-10-09)

Historical refinements below remain applicable except where superseded by the 2026-10-10 revision: the Overview CTA now targets Products, and Overview is intentionally scrollable.

These four requirements are additions to the approved spec and must be reflected in the implementation plan:

1. **Routing sync:** Hash routing, React navigation state, and browser back/forward must remain synchronized at all times. Do not rely on `history.pushState` to trigger `hashchange`. The canonical approach: derive active panel purely from `window.location.hash`; update hash on nav click via `window.location.hash = '#panel'` (which fires `hashchange` natively); listen to `hashchange` for all state updates including browser back/forward. `pushState` must not be used for panel navigation.

2. **Overview CTA:** The `"Explore our products →"` CTA on the Overview panel must navigate the user directly to WealthPrivate (the first product panel) by updating the hash — not by scrolling down within the Overview panel. This keeps the no-forced-scroll principle intact.

3. **Visual acceptance testing:** Before production release, the following viewports and conditions must be visually verified against the design spec:
   - Desktop 1440×900 (standard) — no scroll on any panel
   - Laptop 1280×800 — no scroll on any panel
   - Smaller laptop 1024×768 — graceful scroll fallback if needed
   - Tablet 768px — sidebar collapsed, content readable
   - Mobile 375px — top nav, all panels accessible
   - Browser zoom 125% at 1440px — content must not clip or overflow hidden
   - Keyboard-only navigation — all panels reachable via Tab/Enter/Arrow
   - `prefers-reduced-motion` — transitions resolve instantly

4. **Contact panel review gate:** A dedicated visual review of the dark charcoal Contact panel (`#141414`) must occur before production release. Sign-off required before final deployment.

5. **Honesty requirements (§12):** All requirements in Section 12 are non-negotiable and must be preserved in full throughout implementation.

---

## Visual Reference

The image below is a **conceptual exploration only** — not an approved implementation design. The product screens and figures shown are illustrative and do not represent verified application functionality.

![Amanchi Labs reference concept](./AmanchiLabsMainScreen-reference.png)

**What to take from this image:**
- Editorial sidebar treatment and typography quality ✅
- Left sidebar structure: brand mark + nav items + contact at bottom ✅
- Overview panel with two side-by-side product cards at bottom ✅
- Strong Instrument Serif display type + generous whitespace ✅

**What to discard:**
- Large scenic hero photography — replaced by editorial panel architecture ❌
- Fabricated financial figures ("$1,328,450") — must not appear in implementation ❌
- "Skin Health Score: 92" — fabricated health metric, not to be used ❌
- WealthPrivate "Join the early access list" if no actual waitlist exists ❌
- Any product status label ("Available Now", etc.) that misrepresents actual readiness ❌

---

## 1. Summary

Replace the current long-scroll marketing page with a premium, app-style experience:  
**fixed left sidebar + full-screen, viewport-contained right canvas panels**.

The site must feel like a world-class software studio — light editorial foundation with dark immersive product showcases — and answer three questions within five seconds per view: *What is this? Why should I care? What can I do next?*

**Guiding principle:** One screen. One clear message. One meaningful action.

---

## 2. Design Principles

| Principle | Directive |
|---|---|
| **Clear narrative. Meaningful action.** | Overview uses the approved sequential scrollable narrative. Products is content-sized with graceful scroll fallback. Preserve the existing other-panel composition; never clip content to meet a single-screen target. |
| **Light editorial + dark premium hybrid** | Warm off-white foundation. Product panels are dark and immersive. |
| **Typography-first** | Strong type hierarchy does the heavy lifting. Copy is minimal, confident, and specific. |
| **Honest representation** | No fabricated product data, financial figures, health scores, or performance claims. Conceptual UI mockups must be clearly labeled as illustrative. |
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

**Smaller laptop / zoom fallback:** On viewports between 768px–1280px, or when browser zoom causes content overflow, panels may scroll vertically within the canvas. Content must never clip or overflow hidden. The sidebar remains fixed; the canvas becomes scrollable.

### Mobile (< 768px)
- Left sidebar collapses into a top navigation bar.
- Compact product switcher or hamburger at top-right.
- Panels scroll vertically. No horizontal scroll ever.
- Touch-friendly tap targets (min 44px).

### Tablet (768px–1023px)
- Sidebar collapses to an icon-only rail (48px) or overlays on demand.
- Canvas fills remaining space. Vertical scroll permitted.

---

## 4. Left Sidebar Specification

**Width:** 220–240px (desktop)  
**Background:** Warm off-white (`#FAFAF8`)  
**Position:** Fixed, full viewport height  
**Right border:** Subtle 1px separator (`rgba(0,0,0,0.06)`)

### Anatomy (top → bottom)

1. **Studio Brand** — `AMANCHI LABS` wordmark + geometric mark. Generous top padding. Not a link (clicking logo navigates to Overview).
2. **Primary Navigation** — vertical stack with generous spacing and clear active-state indicator:
  - Overview
  - Products
  - Principles
3. **Contact** — pinned near bottom with a subtle mail icon, discreet typographic treatment.
4. **Footer micro-copy** — `© 2026 Amanchi Labs` at very bottom in smallest possible weight.

### Active State
- Active item: charcoal text + 2px left accent bar (as shown in reference image).
- Inactive items: muted `#999`, no decoration.
- Hover: smooth opacity shift, 100ms.
- No heavy borders, chevrons, nested sub-menus, or badge counts.

### Typography (Sidebar)
- Studio name: geometric sans, `11–12px`, tracked uppercase, charcoal.
- Nav items: Inter, `14px`, medium weight for active, regular for inactive.

---

## 5. Navigation & Routing

| Concern | Solution |
|---|---|
| **URL state** | Hash routing: `/#overview`, `/#products`, `/#wealth`, `/#derma`, `/#principles`, `/#contact` |
| **Browser history** | Set `window.location.hash`; `hashchange` drives panel state and Back/Forward. Never use `history.pushState` for panel navigation. |
| **Direct links** | Sharing `/#wealth` opens directly to WealthPrivate panel |
| **Keyboard navigation** | Tab order: sidebar links → canvas content. Arrow keys cycle sidebar items. |
| **Transitions** | Crossfade (`opacity` 150–200ms ease-in-out). No sliding. No page reload. |
| **Accessibility** | `role="navigation"`, `aria-current="page"` on active item, `role="main"` on canvas, focus management on panel switch |
| **`prefers-reduced-motion`** | All transitions instantly resolved — panels appear without animation |

---

## 6. Panel Specifications

### 6.1 Overview Panel (Default / Home)

**Superseded historical design:** the product-card composition below is retained for context only. Implement the Approved Overview Content and layout at the top of this specification instead.

**URL:** `/#overview`  
**Background:** Warm off-white (continuous with sidebar)  
**Purpose:** Studio identity and product portfolio at a glance.

**Layout (two zones):**

**Top zone — Studio statement:**
- Eyebrow: `PRODUCTS FOR A MORE PRIVATE WORLD` (small, tracked uppercase, muted)
- **Headline (Instrument Serif, large):** `"Technology that puts people first."` — or similar owned studio voice
- **Body (2 sentences max):** `"Amanchi Labs builds thoughtful applications for health, wealth, and everyday life — designed to give people ownership, control, and peace of mind."`
- **Primary CTA:** `"Explore our products →"` — scrolls/focuses to the product cards below

**Bottom zone — Product cards (side by side):**

| WealthPrivate card | DermaPrivate card |
|---|---|
| Dark charcoal background | Warm ivory / muted sage background |
| Eyebrow: `WEALTHPRIVATE` (spaced uppercase) | Eyebrow: `DERMAPRIVATE` (spaced uppercase) |
| Headline: `"Your wealth. Your data. Your control."` | Headline: `"Personalized skincare. On your terms."` |
| 2-line descriptor | 2-line descriptor |
| CTA: see §6.2 | CTA: `"Learn more →"` |
| Conceptual UI mockup (right side of card) — **no fabricated financial figures** | Conceptual UI mockup (right side of card) — **no fabricated health scores** |
| 3 trust attributes at bottom: `Private by design · You own your data · Built for the long term` | 3 trust attributes at bottom: `Your data stays private · Personalized insights · Designed for real life` |

> **Important:** The reference image shows specific financial numbers and a health score. These must **not** appear in the implementation. Mockups must use abstract visualizations (line shapes, placeholders, generic UI chrome) clearly labeled "Illustrative."

---

### 6.2 WealthPrivate Panel

**URL:** `/#wealth`  
**Split-canvas layout:** Left ~40% copy / Right ~60% visual  
**Status label:** `IN DEVELOPMENT` (not "Available Now", not "Coming Soon" — honest, non-promissory)

**Left column — Copy:**
- Eyebrow: `WEALTHPRIVATE` (spaced uppercase, muted)
- **Status badge:** `IN DEVELOPMENT` (small, neutral)
- **Headline (Instrument Serif, 48–56px, white on dark left half):**  
  `"Your wealth.`  
  `Your data.`  
  `Your control."`
- **Value proposition (2 lines, 16px):**  
  `"Turn scattered financial documents into a private, source-backed history of your financial life — organized on your device."`
- **3 attribute chips:** `Local-first · Source-traced · Optional AI`
- **CTA:** `"Get in touch →"` → links to `founder@amanchilabs.com`  
  *(No "Join waitlist" unless a working waitlist exists. Email CTA is honest and direct.)*
- **Trust footnote:** `"WealthPrivate is designed so your financial data stays on your device. We do not store it."`

**Right column — Visual:**
- Full-height dark panel: deep charcoal `#141414`
- **Abstract conceptual mockup** of a financial dashboard: clean document list, a simplified timeline or graph shape (no specific dollar amounts), source-trace UI element
- Clearly labeled `"Illustrative — not a representation of released software"`
- Restrained slate/white accents — no gold, no green ticker effects

**Visual identity:**
- Deep charcoal + slate + white text
- Instrument Serif headlines, Inter body
- Tone: financial precision, privacy, intelligence, long-term trust

---

### 6.3 DermaPrivate Panel

**URL:** `/#derma`  
**Split-canvas layout:** Left ~40% copy / Right ~60% visual  
**Status label:** Use actual honest status — if publicly available, say so; if not, omit "Available Now"

**Left column — Copy:**
- Eyebrow: `DERMAPRIVATE` (spaced uppercase, muted)
- **Status badge:** Use actual current status (confirm before shipping)
- **Headline (Instrument Serif, 48–56px):**  
  `"Personalized`  
  `skincare.`  
  `On your terms."`
- **Value proposition (2 lines, 16px):**  
  `"Plan and understand your skincare routine with ingredient-aware intelligence. AI may assist — you decide what to keep."`
- **3 attribute chips:** `Routine planning · Ingredient-aware · Optional AI`
- **CTA:** `"Explore DermaPrivate →"` (links to `dermaprivate-website.onrender.com`)
- **Trust footnote:** `"Core planning is local-first. AI is optional and user-initiated."`

**Right column — Visual:**
- Full-height warm panel: warm ivory `#F5F0E8` transitioning to muted sage
- Elevated phone mockup (built from existing `RoutinePhone` component, redesigned to match editorial quality)
- Use actual product UI where available; label any additional illustrative screens clearly
- Warm sage and cream tones, soft natural feel

**Visual identity:**
- Warm ivory + muted sage + charcoal text
- Tone: calm, personal, thoughtful, trustworthy

---

### 6.4 Principles Panel

**URL:** `/#principles`  
**Background:** Warm off-white  
**Purpose:** Studio philosophy — what Amanchi Labs believes about software.

**Layout:** Editorial. No panel-level scroll required on ≥1280px at 100% zoom.

- **Headline (Instrument Serif):** `"Technology should work for you."`
- **4 principles in a 2×2 grid or clean vertical list:**

| # | Title | Body |
|---|---|---|
| 01 | Private by design | Privacy belongs in the architecture from the first sketch, not in a policy paragraph at the end. |
| 02 | Intelligent by choice | AI should improve understanding and reduce effort — visible, optional, and never quietly in charge. |
| 03 | You stay in control | A suggestion is a starting point. People decide what to save, change, or leave behind. |
| 04 | Made for real life | Focused tools for ordinary moments — carefully made, useful, and easy to understand. |

- **Studio footnote:** `"Amanchi Labs builds software for the most personal parts of life — where trust is earned, not assumed."`

---

### 6.5 Contact Panel

**URL:** `/#contact`  
**Background:** Deep charcoal `#141414`  
**Purpose:** Direct, human, confident. No form. No friction.

**Layout:**
- **Headline (Instrument Serif, large, white):** `"Let's build something useful."`
- **Supporting copy:** `"Thoughtful questions, product feedback, or a good idea for a useful app — we'd like to hear from you."`

**Two contact options (understated, typographic links — not buttons):**

| Context | Email | Label |
|---|---|---|
| Partnerships & business | `founder@amanchilabs.com` | `Partnerships and business inquiries` |
| Product support | `support@amanchilabs.com` | `Product support and customer assistance` |

- **Footer:** `© 2026 Amanchi Labs · Independent product studio`
- No social media icons unless accounts actively maintained.
- No contact form.

---

## 7. Typography System

| Role | Typeface | Size | Notes |
|---|---|---|---|
| Display / headlines | **Instrument Serif** | 40–64px | Editorial impact. Load from Google Fonts. |
| Body / UI | **Inter** | 14–16px | Clean geometric sans. Google Fonts or Bunny Fonts. |
| Sidebar nav | Inter, medium | 14px | Generous letter-spacing for tracked items |
| Eyebrows / labels | Inter, regular | 11–12px | Uppercase, tracked `0.12em` |
| Monospace accents | JetBrains Mono | 12px | Optional: status badges, code-like elements |

**Font loading:** Self-host or load from Google Fonts / Bunny Fonts. No Adobe Typekit. Preload critical display font to prevent FOUT.

---

## 8. Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#FAFAF8` | Main background, sidebar, light panels |
| `--color-ink` | `#1C1C1C` | Primary text, headings |
| `--color-muted` | `#6B6B6B` | Secondary text, inactive nav, eyebrows |
| `--color-line` | `rgba(0,0,0,0.06)` | Sidebar border, dividers |
| `--color-wealth-bg` | `#141414` | WealthPrivate right panel, Contact panel |
| `--color-wealth-text` | `#F0F0EC` | Text on dark panels |
| `--color-derma-bg` | `#F5F0E8` | DermaPrivate right panel |
| `--color-derma-accent` | `#A8B8A0` | Sage accent for DermaPrivate |
| `--color-accent-bar` | `#1C1C1C` | Active sidebar left indicator (2px bar) |
| `--color-chip-bg` | `rgba(28,28,28,0.08)` | Attribute chip background on light panels |
| `--color-chip-bg-dark` | `rgba(255,255,255,0.12)` | Attribute chip background on dark panels |

---

## 9. Transitions & Motion

- **Panel switch:** `opacity` crossfade 150–200ms ease-in-out. No sliding.
- **Sidebar hover:** `color` and `opacity` only, 100ms.
- **Active indicator:** Immediate, no animation.
- **`prefers-reduced-motion`:** All transitions disabled — panels appear instantly.
- **Banned:** entrance animations, parallax, scroll-triggered effects, auto-playing video, loading spinners on the main experience.

---

## 10. Mobile & Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `≥ 1280px` | Full desktop: existing 240px sidebar + canvas. Overview intentionally scrolls; Products scrolls only when content needs it. |
| `1024px – 1279px` | Retain existing 240px sidebar. Canvas panels may scroll as needed. |
| `768px – 1023px` | Existing 56px top bar and hamburger drawer. Canvas fills remaining height. Scroll permitted. |
| `< 768px` | Top bar: studio name left, menu button right. Overlay drawer for nav. Panels scroll freely. |

---

## 11. URL & Routing Strategy

**Client-side hash routing** (static hosting compatible, no server config required):

| Hash | Panel |
|---|---|
| `/#overview` | Overview (default) |
| `/#products` | Products (portfolio discovery) |
| `/#wealth` | WealthPrivate |
| `/#derma` | DermaPrivate |
| `/#principles` | Principles |
| `/#contact` | Contact |

On load: read `window.location.hash` → set initial active panel. On nav click: set `window.location.hash`. Listen for `hashchange` for all navigation, including back/forward. Preserve the existing empty/invalid hash fallback to Overview.

---

## 12. Honesty & Representation Requirements

These are non-negotiable requirements that must be verified before any panel ships:

1. **No fabricated financial figures** — no dollar amounts, portfolio totals, account balances, or returns in any mockup, conceptual or otherwise.
2. **No fabricated health or skincare scores** — no skin health scores, ingredient compatibility percentages, or similar metrics that do not reflect actual software output.
3. **All conceptual UI must be labeled** — any mockup that is not a direct screenshot of the shipped product must include a small, visible label: `"Illustrative — not a representation of released software."`
4. **Product status must be honest and current:**
   - WealthPrivate: `IN DEVELOPMENT` — no waitlist CTA unless one exists
   - DermaPrivate: actual status only — do not state "Available Now" until independently verified
5. **CTA targets must be working** — no links to 404 pages, placeholder URLs, or broken waitlists.
6. **Email addresses must be live** — `founder@amanchilabs.com` and `support@amanchilabs.com` must be receiving before the site goes live.

---

## 13. Component Inventory

| Component | Description |
|---|---|
| `Sidebar` | Fixed nav: brand mark + nav items + contact link + copyright |
| `NavItem` | Sidebar item with active indicator bar |
| `PanelShell` | Full-screen canvas wrapper with crossfade transition logic |
| `OverviewPanel` | Approved sequential company narrative and conceptual ownership diagram |
| `ProductsPanel` | Approved two-product discovery layout; links to individual panels |
| `WealthPanel` | Split-canvas WealthPrivate panel |
| `DermaPanel` | Split-canvas DermaPrivate panel |
| `PrinciplesPanel` | Principles editorial panel |
| `ContactPanel` | Dark contact panel with two email links |
| `MobileNav` | Top nav bar + overlay drawer for mobile |
| `AttributeChip` | Small pill: "Local-first", "Optional AI", etc. |
| `StatusBadge` | In-development / status indicator |
| `ConceptualLabel` | Small "Illustrative" watermark for mockup panels |
| `RoutinePhone` | Elevated DermaPrivate phone mockup (from existing code, restyled) |
| `WealthMockup` | Abstract WealthPrivate UI illustration (no financial data) |

---

## 14. Out of Scope

- No blog or article system.
- No analytics or tracking scripts (privacy-first studio — no cookies or tracking pixels without consent).
- No contact form — email links only.
- No e-commerce or payment flows.
- No user accounts or authentication.
- No backend — remains a static Vite/React site.
- No stock photography or scenic hero images in the implementation.

---

## 15. Decisions Log

| Area | Decision |
|---|---|
| Founder contact | `founder@amanchilabs.com` for partnerships and business |
| Product support | `support@amanchilabs.com` for customer assistance |
| Typography | Instrument Serif (display) + Inter (UI/body) |
| WealthPrivate visuals | Original abstract conceptual mockups — no financial data |
| DermaPrivate visuals | Actual product UI where available; abstract + labeled otherwise |
| Contact panel | Dark charcoal `#141414` background — evaluate visually before final ship |
| Reference image | Conceptual reference only — architecture, scenic photo, and fabricated data not adopted |
| Scroll policy | Overview intentionally scrolls; Products and other panels use graceful content-driven fallback without clipping |
| WealthPrivate CTA | `"Get in touch →"` → `founder@amanchilabs.com` (no fake waitlist) |
| Status language | `IN DEVELOPMENT` for WealthPrivate; verified actual status for DermaPrivate |

---

## 16. Success Criteria

A viewer landing on the site must be able to:

1. Understand what Amanchi Labs does in **< 5 seconds** on the Overview panel.
2. Navigate to WealthPrivate or DermaPrivate and understand each product in **< 5 seconds**.
3. Find both contact email addresses without any searching.
4. See the Overview mission and primary action in the initial desktop viewport; scroll its narrative naturally without clipping or artificially bottom-aligned content.
5. Use the site fully on a **375px mobile screen**.
6. Navigate entirely via **keyboard**.
7. Share a **direct URL** to a specific product panel and land on it correctly.
8. Confirm that **no fabricated product data** appears anywhere on the site.
