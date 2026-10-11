# Switchable Design Integrated Into The App

Date: 2026-10-11. Status: locally implemented and verified; user review pending.

## Root Cause

Commit 4754b07 contained the approved HTML prototype in docs/reviews but App.tsx still imported the former stacked Overview and old panel components. Vite builds its React entry point, not review HTML. Render therefore correctly served that committed older presentation rather than the prototype.

## Changes

App now renders CompanyView as its only company presentation. Native hash routing selects one view beneath the persistent company introduction and top navigation. The shared text footer, view palettes, consistent next-step actions, internal product introductions, charcoal app backgrounds, testing/development labels and mobile two-app drawer are integrated into actual React code. Links, external product destination, email targets, brand assets, SEO/crawler information and website privacy notice remain available.

Removed all obsolete panel TSX/CSS files, unused PanelShell, previous product-screen mockups/helpers and stale products metadata. Replaced old `.panel-canvas` tests with one focused company-navigation suite. Review HTML and original artwork remain documentation, not alternate application entry points. There is no runtime design selector or legacy render path.

## Verification

- Explicit TypeScript and Vite production build pass; no new editor diagnostics.
- 15/15 tests pass against the built preview: routes/reloads/fallback, single selected rendering/header/footer, sequential links, product discovery, history, keyboard/skip/sidebar, mobile focus trapping and cleanup, responsive reachability, status/links, fonts/runtime/assets, metadata/no-JavaScript content, actual Chrome zoom 125%/200%.
- All eight views fit normal desktop content areas at 1440x900, 1280x800 and 1024x768. Small height/mobile/zoom content can scroll without horizontal overflow. Our Approach's shorter-desktop spacing was tightened to accommodate its caption and signature rather than clipping them.
- Real-app screenshots captured at 1440x900, 1280x800, 1024x768 and 375x812 for all eight views. Expanded mobile images show complete content rather than claiming it fits within the pinned viewport.
- The built preview at http://127.0.0.1:5175/ now serves the new design; these are not screenshots of review HTML.

## Review Package

```text
/Users/veerrajuamanchi/Downloads/Amanchi-Labs-Final-App-2026-10-11
```

Contains viewport screenshots, expanded mobile views, mobile app-menu capture, geometry metadata and implementation diff. Review documents retained in the repository are historical references. No commit, push, merge, or deployment was performed during integration; the remote/live site will not change until the new implementation is committed, pushed and separately deployed.

New capability copy remains design-intention language; no independent product-code audit or manual screen-reader audit is claimed. Corporate categorization is deferred by owner. Final visual review remains required before publication.