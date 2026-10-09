# Amanchi Labs Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current long-scroll `amanchilabs.com` site with a premium app-style experience: fixed left sidebar (220–240px) + full-screen viewport-contained right canvas panels, with five panels (Overview, WealthPrivate, DermaPrivate, Principles, Contact), client-side hash routing, and a light-editorial + dark-product visual identity.

**Architecture:** Single-page Vite/React/TypeScript app. Navigation state is derived purely from `window.location.hash`; `hashchange` events drive all panel transitions. No React Router, no pushState for panel navigation. CSS custom properties carry the design token system. Each panel is a self-contained component that fills 100% of the canvas viewport.

**Tech Stack:** React 18, TypeScript, Vite, CSS custom properties (no CSS-in-JS, no Tailwind), Google Fonts (Instrument Serif + Inter), no testing framework beyond manual visual acceptance checklists.

**Spec:** `docs/superpowers/specs/2026-10-08-amanchilabs-site-redesign-design.md`

---

## Global Constraints

- Hash routing only — `window.location.hash = '#panel'` triggers `hashchange`; never use `history.pushState` for panel navigation.
- No fabricated financial figures, health scores, or product metrics anywhere in markup, mockups, or CSS.
- Every conceptual UI mockup must carry a visible `"Illustrative"` label.
- No scroll required on ≥1280px desktop at 100% zoom on any panel. Graceful vertical scroll permitted below that.
- Fonts: Instrument Serif (Google Fonts) for display/headlines, Inter (Google Fonts) for UI/body. No Adobe Typekit.
- Colors strictly from the token set defined in Task 1. No hardcoded hex values anywhere except in `tokens.css`.
- `prefers-reduced-motion`: all transitions must resolve instantly when set.
- DermaPrivate status: no status badge (live product — link speaks for itself). WealthPrivate status badge: `IN DEVELOPMENT`.
- WealthPrivate CTA: `"Get in touch →"` → `mailto:founder@amanchilabs.com`.
- Contact panel emails: `founder@amanchilabs.com` (partnerships) and `support@amanchilabs.com` (support).
- All `<a>` tags with `href="mailto:..."` must have accessible labels.
- TypeScript strict mode on. No `any` types.
- Commit after every task. Branch: work directly on current branch (single developer, not protected).

---

## File Structure

```
src/
  main.tsx                         # unchanged — entry point
  styles.css                       # REPLACE: all old styles removed; imports tokens + base reset
  tokens.css                       # NEW: all CSS custom properties (colors, type scale, spacing)
  site/
    App.tsx                        # REPLACE: new shell — useHashRouter + Sidebar + PanelShell
    hooks/
      useHashRouter.ts             # NEW: hash routing hook (hashchange listener, panel state)
    components/
      Sidebar.tsx                  # NEW: fixed left nav (brand + nav items + contact + copyright)
      Sidebar.css                  # NEW
      NavItem.tsx                  # NEW: single sidebar nav item with active indicator
      NavItem.css                  # NEW
      MobileNav.tsx                # NEW: top bar + overlay drawer for mobile
      MobileNav.css                # NEW
      PanelShell.tsx               # NEW: canvas wrapper with crossfade transition
      PanelShell.css               # NEW
      AttributeChip.tsx            # NEW: pill label component
      StatusBadge.tsx              # NEW: IN DEVELOPMENT / status indicator
      ConceptualLabel.tsx          # NEW: "Illustrative" watermark for mockups
      shared.css                   # NEW: styles for shared micro-components
    panels/
      OverviewPanel.tsx            # NEW: studio statement + two product cards
      OverviewPanel.css            # NEW
      WealthPanel.tsx              # NEW: split-canvas WealthPrivate
      WealthPanel.css              # NEW
      DermaPanel.tsx               # NEW: split-canvas DermaPrivate
      DermaPanel.css               # NEW
      PrinciplesPanel.tsx          # NEW: four principles editorial layout
      PrinciplesPanel.css          # NEW
      ContactPanel.tsx             # NEW: dark contact panel
      ContactPanel.css             # NEW
    mockups/
      WealthMockup.tsx             # NEW: abstract WealthPrivate UI illustration (no financial data)
      WealthMockup.css             # NEW
      RoutinePhone.tsx             # NEW: elevated DermaPrivate phone mockup (replaces old in App.tsx)
      RoutinePhone.css             # NEW
    products.ts                    # MODIFY: add WealthPrivate entry, simplify type
    Brand.tsx                      # MODIFY: update href to '#overview'
    Icons.tsx                      # MODIFY: add MailIcon
```

> **Deleted:** The old `Header`, `Hero`, `Philosophy`, `Products`, `ProductCard`, `DermaMoment`, `HowWeBuild`, `Privacy`, `About`, `Contact`, `Footer` components inside `App.tsx` are all removed.

---

## Phase 1 — Foundation

### Task 1: Design Tokens + Base CSS Reset

**Files:**
- Create: `src/tokens.css`
- Modify: `src/styles.css` (strip all existing rules; keep only `@import` + new base reset)

**Interfaces:**
- Produces CSS custom properties consumed by all subsequent tasks:
  `--color-canvas`, `--color-ink`, `--color-muted`, `--color-line`,
  `--color-wealth-bg`, `--color-wealth-text`, `--color-derma-bg`, `--color-derma-accent`,
  `--color-accent-bar`, `--color-chip-bg`, `--color-chip-bg-dark`,
  `--font-display`, `--font-ui`, `--sidebar-w`, `--transition-panel`, `--transition-hover`

- [ ] **Step 1: Create `src/tokens.css`**

```css
/* src/tokens.css */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

:root {
  --color-canvas:       #FAFAF8;
  --color-ink:          #1C1C1C;
  --color-muted:        #6B6B6B;
  --color-line:         rgba(0, 0, 0, 0.06);
  --color-wealth-bg:    #141414;
  --color-wealth-text:  #F0F0EC;
  --color-derma-bg:     #F5F0E8;
  --color-derma-accent: #A8B8A0;
  --color-accent-bar:   #1C1C1C;
  --color-chip-bg:      rgba(28, 28, 28, 0.08);
  --color-chip-bg-dark: rgba(255, 255, 255, 0.12);

  --font-display: 'Instrument Serif', Georgia, serif;
  --font-ui:      'Inter', system-ui, sans-serif;

  --sidebar-w: 240px;

  --transition-panel: opacity 150ms ease-in-out;
  --transition-hover: color 100ms, opacity 100ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-panel: none;
    --transition-hover: none;
  }
}
```

- [ ] **Step 2: Replace `src/styles.css` with base reset**

```css
/* src/styles.css */
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-ui);
  color: var(--color-ink);
  background: var(--color-canvas);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 3: Verify fonts load in browser**

```bash
cd /Users/veerrajuamanchi/amanchilabs
npm run dev
```

Open `http://localhost:5173`. DevTools → Network → filter "Font". Confirm `InstrumentSerif` and `Inter` requests appear. Close dev server (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add src/tokens.css src/styles.css
git commit -m "feat: design token system and base CSS reset"
```

---

### Task 2: `useHashRouter` Hook

**Files:**
- Create: `src/site/hooks/useHashRouter.ts`

**Interfaces:**
- Produces:
  ```ts
  export type PanelId = 'overview' | 'wealth' | 'derma' | 'principles' | 'contact'

  export function useHashRouter(): {
    activePanel: PanelId
    navigate: (panel: PanelId) => void
  }
  ```
- `navigate(panel)` sets `window.location.hash = '#' + panel` — fires `hashchange` natively.
- Hook listens to `hashchange` to update `activePanel`. `pushState` is never used.

- [ ] **Step 1: Create `src/site/hooks/useHashRouter.ts`**

```ts
// src/site/hooks/useHashRouter.ts
import { useCallback, useEffect, useState } from 'react'

export type PanelId = 'overview' | 'wealth' | 'derma' | 'principles' | 'contact'

const VALID_PANELS: readonly PanelId[] = ['overview', 'wealth', 'derma', 'principles', 'contact']

function parsePanelFromHash(hash: string): PanelId {
  const raw = hash.replace(/^#/, '')
  return (VALID_PANELS.includes(raw as PanelId) ? raw : 'overview') as PanelId
}

export function useHashRouter(): { activePanel: PanelId; navigate: (panel: PanelId) => void } {
  const [activePanel, setActivePanel] = useState<PanelId>(() =>
    parsePanelFromHash(window.location.hash)
  )

  useEffect(() => {
    function onHashChange() {
      setActivePanel(parsePanelFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Setting window.location.hash fires hashchange natively.
  // Never use history.pushState here — it does NOT fire hashchange.
  const navigate = useCallback((panel: PanelId) => {
    window.location.hash = '#' + panel
  }, [])

  return { activePanel, navigate }
}
```

- [ ] **Step 2: Manual routing test**

```bash
npm run dev
```

In browser console:
```js
window.location.hash = '#wealth'
```
Confirm URL bar changes to `#wealth`. Press browser back → URL returns to previous. This confirms `hashchange` fires. Close dev server.

- [ ] **Step 3: Commit**

```bash
git add src/site/hooks/useHashRouter.ts
git commit -m "feat: useHashRouter hook — hashchange-based, no pushState"
```

---

### Task 3: `NavItem`, `Sidebar`, and `PanelShell`

**Files:**
- Create: `src/site/components/NavItem.tsx` + `NavItem.css`
- Create: `src/site/components/Sidebar.tsx` + `Sidebar.css`
- Create: `src/site/components/PanelShell.tsx` + `PanelShell.css`
- Modify: `src/site/Brand.tsx`
- Modify: `src/site/Icons.tsx`
- Modify: `src/site/App.tsx` (temporary scaffold to verify)

**Interfaces:**
- Consumes: `PanelId`, `navigate` from `useHashRouter`
- Produces:
  ```tsx
  <NavItem id="wealth" label="WealthPrivate" active={true} navigate={navigate} />
  <Sidebar activePanel={activePanel} navigate={navigate} />
  <PanelShell activePanel={activePanel}>{children}</PanelShell>
  ```

- [ ] **Step 1: Add `MailIcon` to `src/site/Icons.tsx`**

Append to the existing file:
```tsx
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 7l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
```

- [ ] **Step 2: Update `Brand.tsx` href**

In `src/site/Brand.tsx`, change `href="#top"` to `href="#overview"` and update `aria-label` to `"Amanchi Labs — go to overview"`.

- [ ] **Step 3: Create `src/site/components/NavItem.tsx`**

```tsx
// src/site/components/NavItem.tsx
import type { PanelId } from '../hooks/useHashRouter'
import './NavItem.css'

type Props = {
  id: PanelId
  label: string
  active: boolean
  navigate: (panel: PanelId) => void
}

export function NavItem({ id, label, active, navigate }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    navigate(id)
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(id)
    }
  }
  return (
    <a
      href={'#' + id}
      className={`nav-item${active ? ' nav-item--active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </a>
  )
}
```

- [ ] **Step 4: Create `src/site/components/NavItem.css`**

```css
/* src/site/components/NavItem.css */
.nav-item {
  display: block;
  padding: 8px 0 8px 20px;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-muted);
  text-decoration: none;
  letter-spacing: 0.01em;
  border-left: 2px solid transparent;
  transition: var(--transition-hover);
  outline-offset: 2px;
}
.nav-item:hover { color: var(--color-ink); }
.nav-item--active {
  color: var(--color-ink);
  font-weight: 500;
  border-left-color: var(--color-accent-bar);
}
```

- [ ] **Step 5: Create `src/site/components/Sidebar.tsx`**

```tsx
// src/site/components/Sidebar.tsx
import { Brand } from '../Brand'
import { MailIcon } from '../Icons'
import type { PanelId } from '../hooks/useHashRouter'
import { NavItem } from './NavItem'
import './Sidebar.css'

type Props = { activePanel: PanelId; navigate: (panel: PanelId) => void }

const NAV_ITEMS: { id: PanelId; label: string }[] = [
  { id: 'overview',   label: 'Overview' },
  { id: 'wealth',     label: 'WealthPrivate' },
  { id: 'derma',      label: 'DermaPrivate' },
  { id: 'principles', label: 'Principles' },
]

export function Sidebar({ activePanel, navigate }: Props) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <Brand />
      </div>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ id, label }) => (
          <NavItem key={id} id={id} label={label} active={activePanel === id} navigate={navigate} />
        ))}
      </nav>
      <div className="sidebar__foot">
        <a
          className="sidebar__contact"
          href="mailto:founder@amanchilabs.com"
          aria-label="Contact Amanchi Labs by email"
        >
          <MailIcon className="sidebar__mail-icon" />
          Contact
        </a>
        <p className="sidebar__copy">© 2026 Amanchi Labs</p>
      </div>
    </aside>
  )
}
```

- [ ] **Step 6: Create `src/site/components/Sidebar.css`**

```css
/* src/site/components/Sidebar.css */
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: var(--sidebar-w);
  background: var(--color-canvas);
  border-right: 1px solid var(--color-line);
  display: flex;
  flex-direction: column;
  z-index: 100;
}
.sidebar__brand {
  padding: 28px 24px 32px;
  border-bottom: 1px solid var(--color-line);
}
.sidebar__nav {
  flex: 1;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sidebar__foot {
  padding: 20px 24px 24px;
  border-top: 1px solid var(--color-line);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar__contact {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-muted);
  text-decoration: none;
  transition: var(--transition-hover);
}
.sidebar__contact:hover { color: var(--color-ink); }
.sidebar__mail-icon { width: 16px; height: 16px; flex-shrink: 0; }
.sidebar__copy {
  font-family: var(--font-ui);
  font-size: 11px;
  color: var(--color-muted);
}
@media (max-width: 767px) {
  .sidebar { display: none; }
}
```

- [ ] **Step 7: Create `src/site/components/PanelShell.tsx`**

```tsx
// src/site/components/PanelShell.tsx
import type { PanelId } from '../hooks/useHashRouter'
import './PanelShell.css'

type Props = { activePanel: PanelId; children: React.ReactNode }

export function PanelShell({ children }: Props) {
  return (
    <main className="panel-shell" role="main" id="main-content" tabIndex={-1}>
      <div className="panel-canvas" aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </main>
  )
}
```

- [ ] **Step 8: Create `src/site/components/PanelShell.css`**

```css
/* src/site/components/PanelShell.css */
.panel-shell {
  position: fixed;
  inset: 0 0 0 var(--sidebar-w);
  display: flex;
  flex-direction: column;
}
.panel-canvas {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
@media (max-width: 767px) {
  .panel-shell { inset: 56px 0 0 0; }
}
```

- [ ] **Step 9: Wire up temporary `App.tsx` scaffold**

```tsx
// src/site/App.tsx — temporary scaffold
import { useHashRouter } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { PanelShell } from './components/PanelShell'

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        <div style={{ padding: '40px', fontFamily: 'var(--font-ui)' }}>
          <p>Active panel: <strong>{activePanel}</strong></p>
        </div>
      </PanelShell>
    </>
  )
}
```

- [ ] **Step 10: Verify routing and sidebar**

```bash
npm run dev
```

- Click each sidebar nav item → `activePanel` text updates ✅
- Type `http://localhost:5173/#wealth` → starts on WealthPrivate ✅
- Click nav item, press browser back → returns to previous panel ✅
- DevTools Network → no page reloads on nav click ✅

Close dev server.

- [ ] **Step 11: Commit**

```bash
git add src/site/components/ src/site/hooks/ src/site/App.tsx src/site/Brand.tsx src/site/Icons.tsx
git commit -m "feat: sidebar, nav items, panel shell, hash router wired"
```

---

## Phase 2 — Shared UI Components

### Task 4: `AttributeChip`, `StatusBadge`, `ConceptualLabel`

**Files:**
- Create: `src/site/components/AttributeChip.tsx`
- Create: `src/site/components/StatusBadge.tsx`
- Create: `src/site/components/ConceptualLabel.tsx`
- Create: `src/site/components/shared.css`

**Interfaces:**
- Produces:
  ```tsx
  <AttributeChip label="Local-first" dark={false} />
  <StatusBadge label="IN DEVELOPMENT" />
  <ConceptualLabel dark={false} />
  // ConceptualLabel always renders: "Illustrative — not a representation of released software."
  ```

- [ ] **Step 1: Create `src/site/components/shared.css`**

```css
/* src/site/components/shared.css */
.attr-chip {
  display: inline-block;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 100px;
  background: var(--color-chip-bg);
  color: var(--color-ink);
}
.attr-chip--dark {
  background: var(--color-chip-bg-dark);
  color: var(--color-wealth-text);
}
.status-badge {
  display: inline-block;
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.conceptual-label {
  display: block;
  font-family: var(--font-ui);
  font-size: 10px;
  color: var(--color-muted);
  letter-spacing: 0.03em;
  text-align: center;
  padding-top: 8px;
  opacity: 0.65;
}
.conceptual-label--dark {
  color: rgba(240, 240, 236, 0.35);
}
```

- [ ] **Step 2: Create `src/site/components/AttributeChip.tsx`**

```tsx
// src/site/components/AttributeChip.tsx
import './shared.css'
type Props = { label: string; dark?: boolean }
export function AttributeChip({ label, dark = false }: Props) {
  return <span className={`attr-chip${dark ? ' attr-chip--dark' : ''}`}>{label}</span>
}
```

- [ ] **Step 3: Create `src/site/components/StatusBadge.tsx`**

```tsx
// src/site/components/StatusBadge.tsx
import './shared.css'
type Props = { label: string }
export function StatusBadge({ label }: Props) {
  return <span className="status-badge">{label}</span>
}
```

- [ ] **Step 4: Create `src/site/components/ConceptualLabel.tsx`**

```tsx
// src/site/components/ConceptualLabel.tsx
import './shared.css'
type Props = { dark?: boolean }
export function ConceptualLabel({ dark = false }: Props) {
  return (
    <span className={`conceptual-label${dark ? ' conceptual-label--dark' : ''}`}>
      Illustrative — not a representation of released software.
    </span>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/site/components/AttributeChip.tsx src/site/components/StatusBadge.tsx src/site/components/ConceptualLabel.tsx src/site/components/shared.css
git commit -m "feat: AttributeChip, StatusBadge, ConceptualLabel shared components"
```

---

### Task 5: `MobileNav`

**Files:**
- Create: `src/site/components/MobileNav.tsx` + `MobileNav.css`
- Modify: `src/site/App.tsx`

**Interfaces:**
- Produces: `<MobileNav activePanel={activePanel} navigate={navigate} />`
- Renders a 56px top bar on mobile (≤767px). Hamburger opens a full-width overlay drawer.
- Closing: tap any nav item, press Escape, or panel changes (e.g. browser back).

- [ ] **Step 1: Create `src/site/components/MobileNav.tsx`**

```tsx
// src/site/components/MobileNav.tsx
import { useEffect, useState } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './MobileNav.css'

type Props = { activePanel: PanelId; navigate: (panel: PanelId) => void }

const NAV_ITEMS: { id: PanelId; label: string }[] = [
  { id: 'overview',   label: 'Overview' },
  { id: 'wealth',     label: 'WealthPrivate' },
  { id: 'derma',      label: 'DermaPrivate' },
  { id: 'principles', label: 'Principles' },
  { id: 'contact',    label: 'Contact' },
]

export function MobileNav({ activePanel, navigate }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close drawer when panel changes (handles browser back/forward)
  useEffect(() => { setOpen(false) }, [activePanel])

  function handleNavClick(id: PanelId) {
    navigate(id)
    setOpen(false)
  }

  return (
    <>
      <header className="mobile-nav" role="banner">
        <span className="mobile-nav__brand">AMANCHI LABS</span>
        <button
          className="mobile-nav__toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(v => !v)}
        >
          <span className={`mobile-nav__hamburger${open ? ' is-open' : ''}`}>
            <span /><span /><span />
          </span>
        </button>
      </header>
      {open && (
        <div className="mobile-drawer" id="mobile-drawer" role="dialog" aria-label="Navigation menu" aria-modal="true">
          <nav>
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={'#' + id}
                className={`mobile-drawer__item${activePanel === id ? ' is-active' : ''}`}
                aria-current={activePanel === id ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); handleNavClick(id) }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Create `src/site/components/MobileNav.css`**

```css
/* src/site/components/MobileNav.css */
.mobile-nav {
  display: none;
  position: fixed;
  inset: 0 0 auto 0;
  height: 56px;
  background: var(--color-canvas);
  border-bottom: 1px solid var(--color-line);
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 200;
}
.mobile-nav__brand {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--color-ink);
}
.mobile-nav__toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
}
.mobile-nav__hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.mobile-nav__hamburger span {
  display: block;
  height: 1.5px;
  background: var(--color-ink);
  transition: transform 200ms, opacity 200ms;
}
.mobile-nav__hamburger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.mobile-nav__hamburger.is-open span:nth-child(2) { opacity: 0; }
.mobile-nav__hamburger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
.mobile-drawer {
  position: fixed;
  inset: 56px 0 0 0;
  background: var(--color-canvas);
  z-index: 190;
  padding: 24px 0;
  overflow-y: auto;
}
.mobile-drawer__item {
  display: block;
  padding: 16px 24px;
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 400;
  color: var(--color-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--color-line);
}
.mobile-drawer__item.is-active {
  color: var(--color-ink);
  font-weight: 500;
}
@media (max-width: 767px) {
  .mobile-nav { display: flex; }
}
```

- [ ] **Step 3: Add MobileNav to `App.tsx`**

```tsx
// src/site/App.tsx
import { useHashRouter } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { PanelShell } from './components/PanelShell'

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        <div style={{ padding: '40px', fontFamily: 'var(--font-ui)' }}>
          <p>Active panel: <strong>{activePanel}</strong></p>
        </div>
      </PanelShell>
    </>
  )
}
```

- [ ] **Step 4: Verify mobile nav at 375px**

```bash
npm run dev
```

DevTools → set viewport 375px. Verify: desktop sidebar hidden, top bar visible, hamburger opens drawer, tap item closes drawer, Escape key closes drawer. Close dev server.

- [ ] **Step 5: Commit**

```bash
git add src/site/components/MobileNav.tsx src/site/components/MobileNav.css src/site/App.tsx
git commit -m "feat: mobile navigation bar and overlay drawer"
```

---

## Phase 3 — Panels

### Task 6: `PrinciplesPanel`

**Files:**
- Create: `src/site/panels/PrinciplesPanel.tsx` + `PrinciplesPanel.css`
- Modify: `src/site/App.tsx`

**Interfaces:**
- Produces: `<PrinciplesPanel />` — no props.

- [ ] **Step 1: Create `src/site/panels/PrinciplesPanel.tsx`**

```tsx
// src/site/panels/PrinciplesPanel.tsx
import './PrinciplesPanel.css'

const principles = [
  { number: '01', title: 'Private by design',     body: 'Privacy belongs in the architecture from the first sketch, not in a policy paragraph at the end.' },
  { number: '02', title: 'Intelligent by choice', body: 'AI should improve understanding and reduce effort — visible, optional, and never quietly in charge.' },
  { number: '03', title: 'You stay in control',   body: 'A suggestion is a starting point. People decide what to save, change, or leave behind.' },
  { number: '04', title: 'Made for real life',    body: 'Focused tools for ordinary moments — carefully made, useful, and easy to understand.' },
]

export function PrinciplesPanel() {
  return (
    <section className="principles-panel" aria-labelledby="principles-heading">
      <div className="principles-panel__inner">
        <div className="principles-panel__lead">
          <p className="principles-panel__eyebrow">What we believe</p>
          <h1 className="principles-panel__heading" id="principles-heading">
            Technology should<br />work <em>for you.</em>
          </h1>
          <p className="principles-panel__sub">
            Amanchi Labs builds software for the most personal parts of life — where trust is earned, not assumed.
          </p>
        </div>
        <div className="principles-panel__grid">
          {principles.map((p) => (
            <article className="principle-card" key={p.number}>
              <span className="principle-card__number">{p.number}</span>
              <h2 className="principle-card__title">{p.title}</h2>
              <p className="principle-card__body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/site/panels/PrinciplesPanel.css`**

```css
/* src/site/panels/PrinciplesPanel.css */
.principles-panel {
  min-height: 100%;
  display: flex;
  align-items: center;
  padding: 48px 56px;
  background: var(--color-canvas);
}
.principles-panel__inner {
  width: 100%;
  max-width: 860px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}
.principles-panel__lead {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.principles-panel__eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.principles-panel__heading {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-ink);
}
.principles-panel__heading em { font-style: italic; }
.principles-panel__sub {
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--color-muted);
  line-height: 1.6;
  max-width: 320px;
}
.principles-panel__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.principle-card { display: flex; flex-direction: column; gap: 8px; }
.principle-card__number {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}
.principle-card__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: var(--color-ink);
}
.principle-card__body {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.6;
}
@media (max-width: 900px) {
  .principles-panel { padding: 40px 32px; }
  .principles-panel__inner { grid-template-columns: 1fr; }
}
@media (max-width: 767px) {
  .principles-panel { padding: 32px 20px; align-items: flex-start; }
  .principles-panel__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Add PrinciplesPanel routing to `App.tsx`**

```tsx
// src/site/App.tsx — add import and switch case
import { PrinciplesPanel } from './panels/PrinciplesPanel'
import type { PanelId } from './hooks/useHashRouter'

function renderPanel(activePanel: PanelId, navigate: (panel: PanelId) => void) {
  switch (activePanel) {
    case 'principles': return <PrinciplesPanel />
    default: return (
      <div style={{ padding: '40px', fontFamily: 'var(--font-ui)' }}>
        <p>Panel: <strong>{activePanel}</strong> — coming soon</p>
      </div>
    )
  }
}

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        {renderPanel(activePanel, navigate)}
      </PanelShell>
    </>
  )
}
```

- [ ] **Step 4: Verify Principles panel**

```bash
npm run dev
```
Navigate to `#principles`. Verify: fills canvas, Instrument Serif headings, 2×2 grid visible, no forced scroll at 1280×800. Close dev server.

- [ ] **Step 5: Commit**

```bash
git add src/site/panels/PrinciplesPanel.tsx src/site/panels/PrinciplesPanel.css src/site/App.tsx
git commit -m "feat: Principles panel"
```

---

### Task 7: `ContactPanel`

**Files:**
- Create: `src/site/panels/ContactPanel.tsx` + `ContactPanel.css`
- Modify: `src/site/App.tsx`

**Interfaces:**
- Produces: `<ContactPanel />` — no props.

- [ ] **Step 1: Create `src/site/panels/ContactPanel.tsx`**

```tsx
// src/site/panels/ContactPanel.tsx
import './ContactPanel.css'

export function ContactPanel() {
  return (
    <section className="contact-panel" aria-labelledby="contact-heading">
      <div className="contact-panel__inner">
        <p className="contact-panel__eyebrow">A note from the studio</p>
        <h1 className="contact-panel__heading" id="contact-heading">
          Let's build<br /><em>something useful.</em>
        </h1>
        <p className="contact-panel__sub">
          Thoughtful questions, product feedback, or a good idea for a useful app — we'd like to hear from you.
        </p>
        <div className="contact-panel__options">
          <a
            className="contact-panel__link"
            href="mailto:founder@amanchilabs.com?subject=Hello%20Amanchi%20Labs"
            aria-label="Email founder@amanchilabs.com for partnerships and business inquiries"
          >
            <span className="contact-panel__link-label">Partnerships &amp; business</span>
            <span className="contact-panel__link-email">founder@amanchilabs.com</span>
          </a>
          <a
            className="contact-panel__link"
            href="mailto:support@amanchilabs.com?subject=Product%20support"
            aria-label="Email support@amanchilabs.com for product support and customer assistance"
          >
            <span className="contact-panel__link-label">Product support</span>
            <span className="contact-panel__link-email">support@amanchilabs.com</span>
          </a>
        </div>
        <p className="contact-panel__foot">© 2026 Amanchi Labs · Independent product studio</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/site/panels/ContactPanel.css`**

```css
/* src/site/panels/ContactPanel.css */
.contact-panel {
  min-height: 100%;
  display: flex;
  align-items: center;
  padding: 56px 64px;
  background: var(--color-wealth-bg);
}
.contact-panel__inner {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.contact-panel__eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 240, 236, 0.40);
}
.contact-panel__heading {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--color-wealth-text);
}
.contact-panel__heading em { font-style: italic; }
.contact-panel__sub {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.6;
  color: rgba(240, 240, 236, 0.60);
  max-width: 400px;
}
.contact-panel__options {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 8px;
}
.contact-panel__link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: var(--transition-hover);
}
.contact-panel__link:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.contact-panel__link:hover .contact-panel__link-email { color: var(--color-wealth-text); }
.contact-panel__link-label {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(240, 240, 236, 0.35);
}
.contact-panel__link-email {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: rgba(240, 240, 236, 0.75);
  transition: var(--transition-hover);
}
.contact-panel__foot {
  font-family: var(--font-ui);
  font-size: 11px;
  color: rgba(240, 240, 236, 0.22);
  padding-top: 12px;
}
@media (max-width: 767px) {
  .contact-panel { padding: 40px 24px; align-items: flex-start; }
}
```

- [ ] **Step 3: Add ContactPanel to `App.tsx` routing**

In the `renderPanel` switch, add:
```tsx
import { ContactPanel } from './panels/ContactPanel'
// ...
case 'contact': return <ContactPanel />
```

- [ ] **Step 4: Verify Contact panel**

```bash
npm run dev
```
Navigate to `#contact`. Verify: dark charcoal fills canvas, Instrument Serif headline in light text, both email links visible and tappable, `mailto:` links open mail client, no forced scroll at 1280×800.

> **🔴 Visual Review Gate:** Human sign-off required on this panel before production deployment. Record approval in Task 13.

- [ ] **Step 5: Commit**

```bash
git add src/site/panels/ContactPanel.tsx src/site/panels/ContactPanel.css src/site/App.tsx
git commit -m "feat: Contact panel — dark charcoal, two email links"
```

---

### Task 8: Mockup Components (`WealthMockup`, `RoutinePhone`)

**Files:**
- Create: `src/site/mockups/WealthMockup.tsx` + `WealthMockup.css`
- Create: `src/site/mockups/RoutinePhone.tsx` + `RoutinePhone.css`

**Spec §12 constraints (non-negotiable):**
- `WealthMockup`: zero dollar amounts, balances, percentages, returns.
- `RoutinePhone`: zero health scores, ingredient compatibility metrics, fabricated numbers.
- Both render `<ConceptualLabel>` visibly.

- [ ] **Step 1: Create `src/site/mockups/WealthMockup.tsx`**

```tsx
// src/site/mockups/WealthMockup.tsx
// Illustrative only. No financial data. No fabricated figures.
import { ConceptualLabel } from '../components/ConceptualLabel'
import './WealthMockup.css'

export function WealthMockup() {
  return (
    <div className="wealth-mockup" role="img" aria-label="Illustrative WealthPrivate application interface">
      <div className="wealth-mockup__chrome">
        <div className="wealth-mockup__header">
          <span className="wealth-mockup__app-name">WealthPrivate</span>
          <span className="wealth-mockup__dot" />
        </div>
        <div className="wealth-mockup__section-label">Recent documents</div>
        <div className="wealth-mockup__doc-list">
          {['Bank statement', 'Investment summary', 'Tax document', 'Insurance policy'].map((label, i) => (
            <div className="wealth-mockup__doc-row" key={i}>
              <span className="wealth-mockup__doc-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="1" width="10" height="13" rx="1" stroke="currentColor" strokeWidth="1"/>
                  <path d="M5 5h6M5 8h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="wealth-mockup__doc-label">{label}</span>
              <span className="wealth-mockup__doc-status">Processed</span>
            </div>
          ))}
        </div>
        <div className="wealth-mockup__section-label">Financial timeline</div>
        <div className="wealth-mockup__timeline">
          <svg className="wealth-mockup__timeline-svg" viewBox="0 0 220 48" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points="0,40 40,32 80,28 110,20 150,16 180,10 220,8"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="wealth-mockup__trace">
          <span className="wealth-mockup__trace-label">Source traced</span>
          <span className="wealth-mockup__trace-pill">1 document</span>
        </div>
      </div>
      <ConceptualLabel dark />
    </div>
  )
}
```

- [ ] **Step 2: Create `src/site/mockups/WealthMockup.css`**

```css
/* src/site/mockups/WealthMockup.css */
.wealth-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
}
.wealth-mockup__chrome {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.wealth-mockup__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wealth-mockup__app-name {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-wealth-text);
  opacity: 0.65;
}
.wealth-mockup__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
}
.wealth-mockup__section-label {
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(240, 240, 236, 0.28);
}
.wealth-mockup__doc-list { display: flex; flex-direction: column; gap: 8px; }
.wealth-mockup__doc-row { display: flex; align-items: center; gap: 10px; }
.wealth-mockup__doc-icon { width: 16px; height: 16px; color: rgba(240, 240, 236, 0.32); flex-shrink: 0; }
.wealth-mockup__doc-icon svg { width: 100%; height: 100%; }
.wealth-mockup__doc-label { flex: 1; font-family: var(--font-ui); font-size: 12px; color: rgba(240, 240, 236, 0.68); }
.wealth-mockup__doc-status { font-family: var(--font-ui); font-size: 10px; color: rgba(240, 240, 236, 0.28); }
.wealth-mockup__timeline { width: 100%; height: 48px; }
.wealth-mockup__timeline-svg { width: 100%; height: 100%; }
.wealth-mockup__trace { display: flex; align-items: center; gap: 8px; padding-top: 4px; }
.wealth-mockup__trace-label { font-family: var(--font-ui); font-size: 10px; color: rgba(240, 240, 236, 0.38); }
.wealth-mockup__trace-pill {
  font-family: var(--font-ui);
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(240, 240, 236, 0.52);
}
```

- [ ] **Step 3: Create `src/site/mockups/RoutinePhone.tsx`**

```tsx
// src/site/mockups/RoutinePhone.tsx
// Illustrative only. No health scores, fabricated metrics, or compatibility percentages.
import { ConceptualLabel } from '../components/ConceptualLabel'
import './RoutinePhone.css'

const STEPS = [
  { color: '#D9CFC4', label: 'Gentle cleanser' },
  { color: '#C4CDD9', label: 'Hydrating serum' },
  { color: '#A8B8A0', label: 'Daily moisturizer' },  // sage — matches --color-derma-accent
  { color: '#D9D4A8', label: 'Sun protection' },
]

export function RoutinePhone() {
  return (
    <div className="routine-phone" role="img" aria-label="Illustrative DermaPrivate application interface">
      <div className="routine-phone__shell">
        <div className="routine-phone__screen">
          <div className="routine-phone__topbar">
            <span className="routine-phone__wordmark">derma<em>private</em></span>
            <span className="routine-phone__avatar" aria-hidden="true">A</span>
          </div>
          <div className="routine-phone__date">TUESDAY · MORNING</div>
          <h3 className="routine-phone__greeting">Your morning,<br />in good order.</h3>
          <div className="routine-phone__routine-header">
            <span>Morning routine</span>
            <span className="routine-phone__step-count">4 steps</span>
          </div>
          {STEPS.map(({ color, label }, i) => (
            <div className="routine-phone__step" key={i}>
              <span className="routine-phone__step-dot" style={{ background: color }} aria-hidden="true" />
              <span className="routine-phone__step-label">{label}</span>
              <span className="routine-phone__step-num" aria-hidden="true">0{i + 1}</span>
            </div>
          ))}
          <div className="routine-phone__note">
            <span className="routine-phone__note-icon" aria-hidden="true">✓</span>
            <div>
              <b>Routine check</b>
              <small>Review your ingredient notes</small>
            </div>
          </div>
        </div>
        <div className="routine-phone__home-bar" aria-hidden="true" />
      </div>
      <ConceptualLabel />
    </div>
  )
}
```

- [ ] **Step 4: Create `src/site/mockups/RoutinePhone.css`**

```css
/* src/site/mockups/RoutinePhone.css */
.routine-phone { display: flex; flex-direction: column; align-items: center; }
.routine-phone__shell {
  width: 220px;
  background: #FDFAF6;
  border-radius: 36px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06);
  padding: 20px 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.routine-phone__screen { display: flex; flex-direction: column; gap: 10px; }
.routine-phone__topbar { display: flex; justify-content: space-between; align-items: center; }
.routine-phone__wordmark { font-family: var(--font-ui); font-size: 10px; font-weight: 500; letter-spacing: 0.04em; color: #555; }
.routine-phone__wordmark em { font-style: normal; color: #888; }
.routine-phone__avatar {
  width: 20px; height: 20px; border-radius: 50%;
  background: #A8B8A0; font-family: var(--font-ui);
  font-size: 10px; font-weight: 600; color: white;
  display: flex; align-items: center; justify-content: center;
}
.routine-phone__date { font-family: var(--font-ui); font-size: 9px; letter-spacing: 0.1em; color: #999; }
.routine-phone__greeting { font-family: var(--font-display); font-size: 16px; font-weight: 400; color: #1C1C1C; line-height: 1.2; }
.routine-phone__routine-header { display: flex; justify-content: space-between; font-family: var(--font-ui); font-size: 10px; color: #777; }
.routine-phone__step-count { color: #aaa; }
.routine-phone__step { display: flex; align-items: center; gap: 8px; }
.routine-phone__step-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.routine-phone__step-label { flex: 1; font-family: var(--font-ui); font-size: 12px; color: #333; }
.routine-phone__step-num { font-family: var(--font-ui); font-size: 10px; color: #bbb; }
.routine-phone__note {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 10px; background: rgba(168, 184, 160, 0.12); border-radius: 8px;
}
.routine-phone__note-icon { font-size: 12px; color: #A8B8A0; }
.routine-phone__note b { font-family: var(--font-ui); font-size: 11px; font-weight: 600; display: block; color: #333; }
.routine-phone__note small { font-family: var(--font-ui); font-size: 10px; color: #888; }
.routine-phone__home-bar { width: 80px; height: 4px; border-radius: 2px; background: rgba(0,0,0,0.12); margin: 8px auto 0; }
```

- [ ] **Step 5: Commit**

```bash
git add src/site/mockups/
git commit -m "feat: WealthMockup and RoutinePhone — illustrative only, no fabricated data"
```

---

### Task 9: `WealthPanel`

**Files:**
- Create: `src/site/panels/WealthPanel.tsx` + `WealthPanel.css`
- Modify: `src/site/App.tsx`

**Interfaces:**
- Produces: `<WealthPanel navigate={navigate} />`

- [ ] **Step 1: Create `src/site/panels/WealthPanel.tsx`**

```tsx
// src/site/panels/WealthPanel.tsx
import { AttributeChip } from '../components/AttributeChip'
import { StatusBadge } from '../components/StatusBadge'
import { WealthMockup } from '../mockups/WealthMockup'
import { ArrowIcon } from '../Icons'
import type { PanelId } from '../hooks/useHashRouter'
import './WealthPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function WealthPanel({ navigate: _navigate }: Props) {
  return (
    <section className="wealth-panel" aria-labelledby="wealth-heading">
      <div className="wealth-panel__copy">
        <StatusBadge label="IN DEVELOPMENT" />
        <h1 className="wealth-panel__heading" id="wealth-heading">
          Your wealth.<br />Your data.<br />Your control.
        </h1>
        <p className="wealth-panel__desc">
          Turn scattered financial documents into a private, source-backed history of your financial life — organized on your device.
        </p>
        <div className="wealth-panel__chips">
          <AttributeChip label="Local-first" dark />
          <AttributeChip label="Source-traced" dark />
          <AttributeChip label="Optional AI" dark />
        </div>
        <a
          className="wealth-panel__cta"
          href="mailto:founder@amanchilabs.com?subject=WealthPrivate%20inquiry"
          aria-label="Email founder@amanchilabs.com to get in touch about WealthPrivate"
        >
          Get in touch <ArrowIcon className="wealth-panel__cta-icon" />
        </a>
        <p className="wealth-panel__trust">
          WealthPrivate is designed so your financial data stays on your device. We do not store it.
        </p>
      </div>
      <div className="wealth-panel__visual" aria-hidden="true">
        <WealthMockup />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/site/panels/WealthPanel.css`**

```css
/* src/site/panels/WealthPanel.css */
.wealth-panel {
  min-height: 100%;
  display: grid;
  grid-template-columns: 42fr 58fr;
}
.wealth-panel__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 56px 48px 56px 64px;
  background: var(--color-wealth-bg);
  color: var(--color-wealth-text);
}
.wealth-panel__heading {
  font-family: var(--font-display);
  font-size: clamp(36px, 4.5vw, 58px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--color-wealth-text);
}
.wealth-panel__desc {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.65;
  color: rgba(240, 240, 236, 0.62);
  max-width: 360px;
}
.wealth-panel__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.wealth-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-wealth-text);
  text-decoration: none;
  padding: 14px 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  width: fit-content;
  transition: border-color 150ms, background 150ms;
}
.wealth-panel__cta:hover {
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.04);
}
.wealth-panel__cta-icon { width: 16px; height: 16px; }
.wealth-panel__trust {
  font-family: var(--font-ui);
  font-size: 12px;
  color: rgba(240, 240, 236, 0.32);
  line-height: 1.5;
  max-width: 320px;
}
.wealth-panel__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-wealth-bg);
  padding: 56px 64px 56px 48px;
  background-image: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.03) 0%, transparent 70%);
}
@media (max-width: 1023px) {
  .wealth-panel { grid-template-columns: 1fr; }
  .wealth-panel__visual { display: none; }
  .wealth-panel__copy { padding: 40px 32px; min-height: 100%; }
}
@media (max-width: 767px) {
  .wealth-panel__copy { padding: 32px 20px; gap: 20px; }
}
```

- [ ] **Step 3: Add WealthPanel to `App.tsx` routing**

```tsx
import { WealthPanel } from './panels/WealthPanel'
// In renderPanel switch:
case 'wealth': return <WealthPanel navigate={navigate} />
```

- [ ] **Step 4: Verify WealthPanel**

```bash
npm run dev
```
Navigate to `#wealth`. Verify: dark charcoal canvas, Instrument Serif headline, three chips, WealthMockup with zero dollar amounts, "Illustrative" label visible, "Get in touch" → correct mailto, no scroll at 1280×800.

- [ ] **Step 5: Commit**

```bash
git add src/site/panels/WealthPanel.tsx src/site/panels/WealthPanel.css src/site/App.tsx
git commit -m "feat: WealthPrivate panel — split canvas, IN DEVELOPMENT, no fabricated data"
```

---

### Task 10: `DermaPanel`

**Files:**
- Create: `src/site/panels/DermaPanel.tsx` + `DermaPanel.css`
- Modify: `src/site/App.tsx`

**Interfaces:**
- Produces: `<DermaPanel />` — no props.

- [ ] **Step 1: Create `src/site/panels/DermaPanel.tsx`**

```tsx
// src/site/panels/DermaPanel.tsx
import { AttributeChip } from '../components/AttributeChip'
import { RoutinePhone } from '../mockups/RoutinePhone'
import { ExternalIcon } from '../Icons'
import './DermaPanel.css'

const DERMAPRIVATE_URL = 'https://dermaprivate-website.onrender.com/index.html'

export function DermaPanel() {
  return (
    <section className="derma-panel" aria-labelledby="derma-heading">
      <div className="derma-panel__copy">
        <p className="derma-panel__eyebrow">DermaPrivate</p>
        <h1 className="derma-panel__heading" id="derma-heading">
          Personalized<br />skincare.<br /><em>On your terms.</em>
        </h1>
        <p className="derma-panel__desc">
          Plan and understand your skincare routine with ingredient-aware intelligence. AI may assist — you decide what to keep.
        </p>
        <div className="derma-panel__chips">
          <AttributeChip label="Routine planning" />
          <AttributeChip label="Ingredient-aware" />
          <AttributeChip label="Optional AI" />
        </div>
        <a
          className="derma-panel__cta"
          href={DERMAPRIVATE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Explore DermaPrivate — opens in a new tab"
        >
          Explore DermaPrivate <ExternalIcon className="derma-panel__cta-icon" />
        </a>
        <p className="derma-panel__trust">Core planning is local-first. AI is optional and user-initiated.</p>
      </div>
      <div className="derma-panel__visual">
        <RoutinePhone />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/site/panels/DermaPanel.css`**

```css
/* src/site/panels/DermaPanel.css */
.derma-panel {
  min-height: 100%;
  display: grid;
  grid-template-columns: 42fr 58fr;
}
.derma-panel__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 56px 48px 56px 64px;
  background: var(--color-canvas);
}
.derma-panel__eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.derma-panel__heading {
  font-family: var(--font-display);
  font-size: clamp(36px, 4.5vw, 58px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--color-ink);
}
.derma-panel__heading em { font-style: italic; color: var(--color-derma-accent); }
.derma-panel__desc {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-muted);
  max-width: 360px;
}
.derma-panel__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.derma-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: none;
  padding: 14px 24px;
  border: 1px solid rgba(28, 28, 28, 0.18);
  border-radius: 6px;
  width: fit-content;
  transition: border-color 150ms, background 150ms;
}
.derma-panel__cta:hover {
  border-color: var(--color-ink);
  background: rgba(28, 28, 28, 0.04);
}
.derma-panel__cta-icon { width: 14px; height: 14px; }
.derma-panel__trust { font-family: var(--font-ui); font-size: 12px; color: var(--color-muted); line-height: 1.5; opacity: 0.65; max-width: 320px; }
.derma-panel__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-derma-bg);
  padding: 56px 64px 56px 48px;
}
@media (max-width: 1023px) {
  .derma-panel { grid-template-columns: 1fr; }
  .derma-panel__visual { display: none; }
  .derma-panel__copy { padding: 40px 32px; min-height: 100%; }
}
@media (max-width: 767px) {
  .derma-panel__copy { padding: 32px 20px; gap: 20px; }
}
```

- [ ] **Step 3: Add DermaPanel to `App.tsx` routing**

```tsx
import { DermaPanel } from './panels/DermaPanel'
// In renderPanel switch:
case 'derma': return <DermaPanel />
```

- [ ] **Step 4: Verify DermaPanel**

```bash
npm run dev
```
Navigate to `#derma`. Verify: warm ivory right panel, sage italic `em`, RoutinePhone with zero fabricated metrics, "Illustrative" label visible, CTA opens DermaPrivate URL in new tab, no scroll at 1280×800.

- [ ] **Step 5: Commit**

```bash
git add src/site/panels/DermaPanel.tsx src/site/panels/DermaPanel.css src/site/App.tsx
git commit -m "feat: DermaPrivate panel — split canvas, warm ivory, routine phone"
```

---

### Task 11: `OverviewPanel` and Final `App.tsx`

**Files:**
- Modify: `src/site/products.ts`
- Create: `src/site/panels/OverviewPanel.tsx` + `OverviewPanel.css`
- Modify: `src/site/App.tsx` (finalize routing — all five panels)

**Interfaces:**
- Produces: `<OverviewPanel navigate={navigate} />`
- `"Explore our products"` CTA calls `navigate('wealth')` — no scrolling within the panel.

- [ ] **Step 1: Update `src/site/products.ts`**

```ts
// src/site/products.ts
export type Product = {
  id: 'derma' | 'wealth'
  name: string
  tagline: string
  descriptor: string
  status: 'explore' | 'in-development'
  url?: string
  dark: boolean
  trustPoints: [string, string, string]
}

export const products: Product[] = [
  {
    id: 'wealth',
    name: 'WealthPrivate',
    tagline: 'Your wealth. Your data. Your control.',
    descriptor: 'A private financial operating system that turns scattered documents into a source-backed history of your financial life.',
    status: 'in-development',
    dark: true,
    trustPoints: ['Private by design', 'You own your data', 'Built for the long term'],
  },
  {
    id: 'derma',
    name: 'DermaPrivate',
    tagline: 'Personalized skincare. On your terms.',
    descriptor: 'Plan and understand your skincare routine with ingredient-aware intelligence. AI assists only when you choose.',
    status: 'explore',
    url: 'https://dermaprivate-website.onrender.com/index.html',
    dark: false,
    trustPoints: ['Your data stays private', 'Personalized insights', 'Designed for real life'],
  },
]
```

- [ ] **Step 2: Create `src/site/panels/OverviewPanel.tsx`**

```tsx
// src/site/panels/OverviewPanel.tsx
import { products } from '../products'
import type { PanelId } from '../hooks/useHashRouter'
import { ArrowIcon, ExternalIcon } from '../Icons'
import './OverviewPanel.css'

type Props = { navigate: (panel: PanelId) => void }

export function OverviewPanel({ navigate }: Props) {
  return (
    <section className="overview-panel" aria-labelledby="overview-heading">
      <div className="overview-panel__hero">
        <p className="overview-panel__eyebrow">Products for a more private world</p>
        <h1 className="overview-panel__heading" id="overview-heading">
          Technology that<br /><em>puts people first.</em>
        </h1>
        <p className="overview-panel__sub">
          Amanchi Labs builds thoughtful applications for health, wealth, and everyday life — designed to give people ownership, control, and peace of mind.
        </p>
        {/* CTA navigates to WealthPrivate — no panel scrolling */}
        <button
          className="overview-panel__cta"
          type="button"
          onClick={() => navigate('wealth')}
          aria-label="Explore our products — view WealthPrivate"
        >
          Explore our products <ArrowIcon className="overview-panel__cta-icon" />
        </button>
      </div>
      <div className="overview-panel__cards">
        {products.map((product) => (
          <article
            key={product.id}
            className={`product-card${product.dark ? ' product-card--dark' : ' product-card--light'}`}
          >
            <div className="product-card__content">
              <p className="product-card__name">{product.name}</p>
              <h2 className="product-card__tagline">{product.tagline}</h2>
              <p className="product-card__desc">{product.descriptor}</p>
              <div className="product-card__trust">
                {product.trustPoints.map((pt) => (
                  <span key={pt} className="product-card__trust-item">{pt}</span>
                ))}
              </div>
              {product.status === 'in-development' ? (
                <button
                  className="product-card__btn"
                  type="button"
                  onClick={() => navigate('wealth')}
                  aria-label={`View WealthPrivate — ${product.tagline}`}
                >
                  Learn more <ArrowIcon className="product-card__btn-icon" />
                </button>
              ) : (
                <a
                  className="product-card__btn"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Explore ${product.name} — opens in a new tab`}
                >
                  Learn more <ExternalIcon className="product-card__btn-icon" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/site/panels/OverviewPanel.css`**

```css
/* src/site/panels/OverviewPanel.css */
.overview-panel {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  background: var(--color-canvas);
}
.overview-panel__hero {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 56px 64px 40px;
  gap: 20px;
  max-width: 640px;
}
.overview-panel__eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.overview-panel__heading {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--color-ink);
}
.overview-panel__heading em { font-style: italic; }
.overview-panel__sub {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-muted);
  max-width: 460px;
}
.overview-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-wealth-text);
  background: var(--color-ink);
  border: none;
  border-radius: 6px;
  padding: 14px 24px;
  cursor: pointer;
  width: fit-content;
  transition: opacity 150ms;
}
.overview-panel__cta:hover { opacity: 0.82; }
.overview-panel__cta-icon { width: 16px; height: 16px; }
/* Product cards row */
.overview-panel__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 280px;
}
.product-card { display: flex; flex-direction: column; overflow: hidden; }
.product-card--dark { background: var(--color-wealth-bg); color: var(--color-wealth-text); }
.product-card--light { background: var(--color-derma-bg); color: var(--color-ink); }
.product-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px 32px;
}
.product-card__name {
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.42;
}
.product-card__tagline {
  font-family: var(--font-display);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 400;
  line-height: 1.15;
  color: inherit;
}
.product-card__desc {
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.55;
  color: inherit;
  opacity: 0.62;
}
.product-card__trust { display: flex; flex-wrap: wrap; gap: 0; margin-top: auto; }
.product-card__trust-item {
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 500;
  color: inherit;
  opacity: 0.45;
}
.product-card__trust-item:not(:last-child)::after { content: ' · '; white-space: pre; }
.product-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
  opacity: 0.72;
  transition: opacity 150ms;
  width: fit-content;
}
.product-card__btn:hover { opacity: 1; }
.product-card__btn-icon { width: 14px; height: 14px; }
@media (max-width: 900px) {
  .overview-panel__hero { padding: 40px 32px 32px; }
  .overview-panel__cards { height: auto; }
}
@media (max-width: 767px) {
  .overview-panel { grid-template-rows: auto auto; }
  .overview-panel__hero { padding: 32px 20px 24px; }
  .overview-panel__cards { grid-template-columns: 1fr; height: auto; }
}
```

- [ ] **Step 4: Finalize `App.tsx` with all five panels**

```tsx
// src/site/App.tsx — final version
import { useHashRouter, type PanelId } from './hooks/useHashRouter'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'
import { PanelShell } from './components/PanelShell'
import { OverviewPanel } from './panels/OverviewPanel'
import { WealthPanel } from './panels/WealthPanel'
import { DermaPanel } from './panels/DermaPanel'
import { PrinciplesPanel } from './panels/PrinciplesPanel'
import { ContactPanel } from './panels/ContactPanel'

function renderPanel(activePanel: PanelId, navigate: (panel: PanelId) => void) {
  switch (activePanel) {
    case 'overview':   return <OverviewPanel navigate={navigate} />
    case 'wealth':     return <WealthPanel navigate={navigate} />
    case 'derma':      return <DermaPanel />
    case 'principles': return <PrinciplesPanel />
    case 'contact':    return <ContactPanel />
  }
}

export default function App() {
  const { activePanel, navigate } = useHashRouter()
  return (
    <>
      <Sidebar activePanel={activePanel} navigate={navigate} />
      <MobileNav activePanel={activePanel} navigate={navigate} />
      <PanelShell activePanel={activePanel}>
        {renderPanel(activePanel, navigate)}
      </PanelShell>
    </>
  )
}
```

- [ ] **Step 5: Full routing verification**

```bash
npm run dev
```

- `http://localhost:5173/` → Overview, defaults correctly ✅
- "Explore our products" button → navigates to `#wealth`, no scroll within Overview ✅
- WealthPrivate card "Learn more" → navigates to `#wealth` ✅
- DermaPrivate card "Learn more" → opens DermaPrivate URL in new tab ✅
- `http://localhost:5173/#contact` → Contact panel, dark charcoal ✅
- Browser back/forward through all 5 panels ✅
- No page reload on any nav action ✅

- [ ] **Step 6: Commit**

```bash
git add src/site/panels/OverviewPanel.tsx src/site/panels/OverviewPanel.css src/site/products.ts src/site/App.tsx
git commit -m "feat: Overview panel + finalize all five panels in App.tsx"
```

---

## Phase 4 — Panel Crossfade Transition

### Task 12: Animated Panel Switch

**Files:**
- Modify: `src/site/components/PanelShell.tsx`
- Modify: `src/site/components/PanelShell.css`

- [ ] **Step 1: Update `PanelShell.tsx` with opacity fade**

```tsx
// src/site/components/PanelShell.tsx
import { useEffect, useRef, useState } from 'react'
import type { PanelId } from '../hooks/useHashRouter'
import './PanelShell.css'

type Props = { activePanel: PanelId; children: React.ReactNode }

export function PanelShell({ activePanel, children }: Props) {
  const [visible, setVisible] = useState(true)
  const prevPanel = useRef(activePanel)

  useEffect(() => {
    if (prevPanel.current === activePanel) return
    prevPanel.current = activePanel
    // Fade out, then fade in on next frame (two rAF = after browser paint)
    setVisible(false)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(id)
  }, [activePanel])

  return (
    <main className="panel-shell" role="main" id="main-content" tabIndex={-1}>
      <div
        className={`panel-canvas${visible ? ' panel-canvas--visible' : ' panel-canvas--hidden'}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Update `PanelShell.css`**

```css
/* src/site/components/PanelShell.css */
.panel-shell {
  position: fixed;
  inset: 0 0 0 var(--sidebar-w);
  display: flex;
  flex-direction: column;
}
.panel-canvas {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: var(--transition-panel);
}
.panel-canvas--visible { opacity: 1; }
.panel-canvas--hidden  { opacity: 0; }
@media (max-width: 767px) {
  .panel-shell { inset: 56px 0 0 0; }
}
```

- [ ] **Step 3: Verify crossfade and reduced-motion**

```bash
npm run dev
```

- Click between sidebar items → subtle opacity fade ✅
- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → panels switch instantly ✅

Close dev server.

- [ ] **Step 4: Commit**

```bash
git add src/site/components/PanelShell.tsx src/site/components/PanelShell.css
git commit -m "feat: crossfade panel transition, respects prefers-reduced-motion"
```

---

## Phase 5 — Visual Acceptance Testing

### Task 13: Visual Acceptance Checklist

Manual testing. Run dev server: `npm run dev`. All items must pass before proceeding to deployment.

**Desktop 1440×900** (DevTools → set viewport):
- [ ] Overview: no scroll, headline visible, both product cards fully in view
- [ ] WealthPrivate: no scroll, split layout, mockup labeled "Illustrative"
- [ ] DermaPrivate: no scroll, split layout, phone mockup labeled "Illustrative"
- [ ] Principles: no scroll, all 4 principles visible
- [ ] Contact: no scroll, both emails visible, dark charcoal background

**Laptop 1280×800**:
- [ ] All 5 panels: no forced scroll

**Smaller laptop 1024×768**:
- [ ] Split-canvas panels collapse to single column ✅
- [ ] All content accessible, no horizontal scroll ✅
- [ ] Graceful vertical scroll if content exceeds viewport ✅

**Tablet 768px**:
- [ ] Sidebar hidden ✅
- [ ] MobileNav top bar visible ✅
- [ ] All panels reachable ✅

**Mobile 375px**:
- [ ] MobileNav hamburger opens drawer ✅
- [ ] All 5 panels accessible via drawer ✅
- [ ] No horizontal scroll on any panel ✅

**Browser zoom 125% at 1440px**:
- [ ] Content does not clip or `overflow: hidden` ✅
- [ ] No content disappears behind sidebar ✅
- [ ] Panels may scroll vertically — acceptable ✅
- [ ] Return zoom to 100%

**Keyboard-only navigation**:
- [ ] Tab focuses sidebar nav items in order ✅
- [ ] Enter activates nav items ✅
- [ ] Tab reaches canvas CTA buttons and links ✅
- [ ] All mailto links focusable and activatable ✅
- [ ] Focus never trapped ✅

**`prefers-reduced-motion`** (DevTools → Rendering → Emulate):
- [ ] All panel transitions resolve instantly ✅
- [ ] Return to no emulation

**🔴 Contact Panel Visual Review Gate** (human sign-off required):
- [ ] Dark charcoal `#141414` background impactful and readable ✅
- [ ] Headlines contrast sufficiently (WCAG AA) ✅
- [ ] Both email addresses clearly legible ✅
- [ ] Sign-off recorded: `_______________________  Date: ___________`

**Honesty audit** (spec §12 — fail if any item is present):
- [ ] Zero dollar amounts anywhere in the site ✅
- [ ] Zero health scores or percentages in any mockup ✅
- [ ] "Available Now" does not appear for DermaPrivate or WealthPrivate ✅
- [ ] "Illustrative" label present on WealthMockup and RoutinePhone ✅
- [ ] `mailto:founder@amanchilabs.com` opens correctly ✅
- [ ] `mailto:support@amanchilabs.com` opens correctly ✅
- [ ] DermaPrivate external link loads `dermaprivate-website.onrender.com` ✅

- [ ] **Commit after any CSS fixes found during testing**

```bash
git add -A
git commit -m "fix: visual acceptance corrections from manual review"
```

---

## Phase 6 — Build and Deploy

### Task 14: Production Build and Deployment Verification

**Files:** No code changes — build and deploy only.

- [ ] **Step 1: TypeScript check**

```bash
cd /Users/veerrajuamanchi/amanchilabs
npx tsc --noEmit
```

Expected: zero errors. Fix all before proceeding.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: `dist/` directory created, no errors. Confirm `dist/index.html` exists.

- [ ] **Step 3: Preview build locally**

```bash
npm run preview
```

Open `http://localhost:4173`. Quick verify:
- `http://localhost:4173/#wealth` → WealthPrivate panel ✅
- Browser back works ✅
- Instrument Serif font loads ✅
- DevTools Network: no 404 errors ✅

Close preview server.

- [ ] **Step 4: Deploy**

```bash
git add dist/
git commit -m "build: production build for amanchilabs.com redesign"
git push
```

(Use your existing deployment method — Render, Netlify, Vercel, or direct git remote. Check `README.md` or previous deploy history if uncertain.)

- [ ] **Step 5: Verify production**

Once deployed at `https://amanchilabs.com`:
- [ ] `https://amanchilabs.com/#wealth` loads WealthPrivate ✅
- [ ] `https://amanchilabs.com/#contact` loads Contact panel ✅
- [ ] Both mailto links work ✅
- [ ] DermaPrivate external link works ✅
- [ ] Instrument Serif loads from Google Fonts ✅
- [ ] No console errors ✅

- [ ] **Step 6: Final release commit**

```bash
git commit --allow-empty -m "release: amanchilabs.com redesign — sidebar nav, 5 panels, Instrument Serif + Inter"
```

---

## Spec Coverage Matrix

| Spec Requirement | Task |
|---|---|
| Fixed left sidebar 220–240px, warm off-white | Task 3 (Sidebar) |
| Hash routing, hashchange-only, no pushState | Task 2 (useHashRouter) |
| Browser back/forward sync | Task 2 (useHashRouter) |
| Direct URL to any panel | Task 2 (useHashRouter) |
| Keyboard navigation | Task 3 (NavItem aria), Task 13 |
| `prefers-reduced-motion` | Task 1 (tokens.css), Task 12 (PanelShell) |
| Overview: studio hero + two product cards | Task 11 (OverviewPanel) |
| Overview CTA → `navigate('wealth')`, no scroll | Task 11 (OverviewPanel button onClick) |
| WealthPrivate split canvas | Task 9 (WealthPanel) |
| DermaPrivate split canvas | Task 10 (DermaPanel) |
| Principles panel | Task 6 (PrinciplesPanel) |
| Contact panel — dark charcoal, two emails | Task 7 (ContactPanel) |
| Instrument Serif + Inter fonts | Task 1 (tokens.css) |
| Design token system | Task 1 (tokens.css) |
| AttributeChip, StatusBadge, ConceptualLabel | Task 4 |
| Mobile top nav + overlay drawer | Task 5 (MobileNav) |
| WealthMockup — zero financial data | Task 8 |
| RoutinePhone — zero health scores | Task 8 |
| Crossfade transition | Task 12 (PanelShell) |
| `founder@amanchilabs.com` | Task 9 (WealthPanel CTA), Task 7 (ContactPanel) |
| `support@amanchilabs.com` | Task 7 (ContactPanel) |
| WealthPrivate: `IN DEVELOPMENT` badge | Task 9 (WealthPanel) |
| No forced scroll ≥1280px | Task 13 (acceptance) |
| Graceful scroll fallback <1280px | PanelShell.css, all panel CSS |
| Zoom 125% — no clipping | Task 13 (acceptance) |
| Visual acceptance all viewports | Task 13 |
| Contact panel visual review gate | Task 7 + Task 13 |
| Honesty audit | Task 13 |
| TypeScript strict, no `any` | Task 14 (tsc --noEmit) |
| Production build + deploy | Task 14 |

All spec requirements covered. No gaps found.
