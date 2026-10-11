# Overview And Products Implementation Plan

Date: 2026-10-10
Status: Approved for scoped local implementation on 2026-10-10; local implementation complete, final review pending. Publication remains blocked.

## Local Execution Record

The user approved Tasks 0-6 with three clarifications: product evidence must not block intention-based local layout work; all six direct routes/history/keyboard gates are mandatory; testing remains one lightweight Playwright suite. No branches, automatic commits, merge, push, or deployment are authorized.

Baselines captured before production edits; focused harness added; routing/navigation, Overview, and Products implemented. Nineteen browser checks pass across dev-mode runs and the complete production-preview run, including real browser zoom at 125%/200%. TypeScript and production build pass. The existing shell and four other panels remain unchanged; baseline panel captures are byte-identical at all four requested viewports. Long-panel full-content approval images use stitched canvas scroll slices, not clipped element screenshots.

The claim inventory is complete, but independent product evidence and product-owner sign-off remain unavailable. This is a publication blocker, not a local layout blocker. See [claim ledger](../../reviews/product-claim-verification.md) and [implementation results](../../reviews/2026-10-10-implementation-results.md). VoiceOver/manual screen-reader testing is still a final-review gap; automated accessible structure and keyboard checks are not represented as a full screen-reader audit.

The only extra layout adjustment is reducing Products bottom padding from 40px to 24px on desktop heights <=800px, removing 15px of surplus scroll caused by the final longer customer disclosure at 1280x800. Mobile composition and other-panel styling remain unchanged. Final user visual review is pending.

## Goal And Authority

Implement the screenshot-approved Option A Sequential Editorial Overview and the approved Products discovery view, incorporating the final navigation and customer-facing copy refinements. This plan supersedes the historical 2026-10-09 plan for this work; it does not authorize a rebuild of the site foundation.

Authority: [updated approved design specification](../specs/2026-10-08-amanchilabs-site-redesign-design.md), specifically its 2026-10-10 revision. [Review notes](../../reviews/overview-review.md) and [prototype](../../reviews/overview-concepts.html) are supporting references, not production code or a substitute for the specification.

Approved baselines: [Desktop Overview](../../reviews/a-revised-1440x900-full.png), [Mobile Overview](../../reviews/a-revised-375x812-full.png), [Desktop Products](../../reviews/products-revised-1440x900-full.png), [Mobile Products](../../reviews/products-revised-375x812-full.png). These precede the final three approved text/navigation refinements; compare layout against the baselines and copy/navigation against the updated specification.

## Scope And Decisions

- Primary navigation: Overview, Products, Principles, Contact, un-nested. Contact retains its desktop footer placement. WealthPrivate and DermaPrivate stay accessible through Products and existing direct hashes.
- Six valid panel routes, four primary navigation items. Add `#products`; preserve `#overview`, `#wealth`, `#derma`, `#principles`, `#contact`, empty/invalid hash fallback, and native hash history.
- On individual product pages, Products may carry a contextual portfolio style, but must not falsely have `aria-current="page"`; use that attribute only on the exact active primary destination.
- Retain existing fixed shell and scrollable canvas, 240px sidebar at >=1024px, 56px top bar below 1024px, fonts, colors, icon library, crossfade, focus management, and reduced-motion behavior.
- Overview scrolls deliberately. Products is content-sized. No fixed content heights, viewport-centered hero, bottom-pinned cards, global reset rewrite, or unrelated panel redesign.
- Keep only WealthPrivate and DermaPrivate publicly featured. No speculative product promises, unverified availability, feature claims, or fabricated mockup data.
- Website-only work. Product implementation inspection is read-only. Authentication, databases, analytics, payments, and product functionality are outside scope.
- No automatic commits, new branches, merge, push, or deployment. Preserve existing user changes. Approval of this plan authorizes scoped local implementation only, not publication.

## Evidence And Dependencies

Current website evidence:

- `useHashRouter.ts` owns the five-member `PanelId`, valid route list, native hash navigation, and invalid fallback.
- `App.tsx` selects the panel; `Sidebar.tsx` and `MobileNav.tsx` currently define their own navigation arrays.
- `PanelShell.tsx` owns canvas remounts, transition cleanup, outgoing `inert` content, and deferred main-focus transfer. Preserve it unless a targeted regression demonstrates a required repair.
- `MobileNav.tsx` owns focus trapping, Escape, main `inert`, focus restoration, closure on route change, and breakpoint cleanup.
- `OverviewPanel.css` currently expands the hero with `1fr` and bottom-aligns content above a fixed-height card strip. Replace this Overview-specific behavior, not the shared shell.
- `products.ts` is shared product metadata; its current descriptor/trust language is not independently verified evidence and must not be copied wholesale into new public copy.
- Existing scripts provide TypeScript through the build and Vite production build. No frontend test script/suite currently exists. React/Vite versions must be read from the installed lockfile, not assumed from the historical plan.

External dependency: actual WealthPrivate and DermaPrivate repositories or a reviewed evidence package identifying release/commit and workflows. Missing evidence blocks privacy-claim sign-off and publication. It must not be replaced by website copy, prototype labels, or claims from a live landing page.

## Task Sequence

### Task 0: Approval And Baseline Capture

Depends on: explicit approval of this plan.

- [ ] Record plan approval and any changes to the scope or navigation decision.
- [ ] Inspect applicable repo instructions, clean/dirty worktree state, scripts, lockfile, and current diagnostics; preserve unrelated changes.
- [ ] Capture current production-source views before edits: all five existing panels at 1440x900, 1280x800, 1024x768, 375x812. Save exact viewport and full canvas captures with fonts loaded.
- [ ] Record existing link targets, drawer/focus/history behavior, and product-page copy to establish regressions and the claim audit inventory.

Acceptance: baseline artifact index and reproducible commands exist; no production edit precedes approval.

### Task 1: Product Privacy Claim Audit

Depends on: Task 0 and product implementation evidence. Can proceed independently of test harness work once access exists.

- [ ] Inventory all new Overview/Products privacy statements and existing WealthPrivate/DermaPrivate claims, including shared product metadata and conceptual captions.
- [ ] Create a development-only evidence ledger in `docs/reviews/product-claim-verification.md`: statement, product/platform, repository/release/commit, workflow, source location or runtime evidence, exceptions, classification, reviewer, approval state.
- [ ] Trace local/server storage, encryption/key handling, AI consent/payload/provider retention, integrations, backups/sync, logs/crash/telemetry, authentication metadata, retention, export/deletion, and user control UI.
- [ ] Classify each claim as verified capability, explicit design intention, unsupported, or contradicted. Keep company philosophy separate from product guarantees.
- [ ] Obtain approval for any evidence-required copy correction in existing product panels before editing them; preserve their visual designs and working links.
- [ ] If evidence is unavailable, mark blocked explicitly. Only continue non-publishing local implementation with approved intention-based copy; no claim or publication sign-off.

Acceptance: every public capability assertion has independent evidence and exceptions, or an approved intention-based replacement. No unsupported encryption, offline, account, purchase, AI masking, export, or zero-server-storage promise remains in the publication candidate. Product-owner review required.

### Task 2: Focused Frontend Regression Harness

Depends on: Task 0. Requires approval of this plan's narrowly scoped test tooling changes.

- [ ] Add `@playwright/test` as a development dependency, a reproducible `test:e2e` script, and a minimal Playwright config with Vite web-server handling on an available port.
- [ ] Use one focused spec file, `tests/site-navigation.spec.ts`, for existing-route baseline tests and new route/navigation cases. Use stable accessible roles and panel selectors, not arbitrary sleeps.
- [ ] Configure screenshots and failure traces as ignored local artifacts; do not commit browser binaries, node_modules, generated build output, or approval screenshots as test snapshots without a deliberate baseline policy.
- [ ] Run existing-route checks before layout changes to distinguish pre-existing failures from regressions. Baseline failures must be documented; do not silently normalize them.

Acceptance: one-command repeatable browser tests pass for the existing site; TypeScript/build still pass. No unnecessary production dependency or broad testing framework rollout.

### Task 3: Products Route And Simple Navigation

Depends on: Tasks 0 and 2.

Files: `src/site/hooks/useHashRouter.ts`, `src/site/App.tsx`, `src/site/components/Sidebar.tsx`, `src/site/components/MobileNav.tsx`; a new Products panel placeholder may be used until Task 5.

- [ ] Add `products` to `PanelId` and valid hashes; preserve native `window.location.hash` and `hashchange`, without React Router or `pushState`.
- [ ] Register Products in `App.tsx`; retain all current product, Principles, and Contact cases.
- [ ] Replace top-level product entries with Products in both nav arrays; retain Contact placement, keyboard arrow wrapping, link semantics, and touch targets.
- [ ] Use exact-route `aria-current`, with optional parent-context styling separate from that attribute. Reuse `NavItem`; add no nested menu or new navigation abstraction unless needed to eliminate a demonstrated mismatch.
- [ ] Extend regression checks for six direct URLs, invalid/empty fallback, four nav items, menu selection, and Back/Forward synchronization.

Acceptance: Products is discoverable from every panel; original product hashes still render their panels; no focus or history regression. Run focused navigation tests immediately after the first change, then TypeScript.

### Task 4: Sequential Editorial Overview

Depends on: Tasks 1's approved copy classification, 2, and 3. Missing capability evidence must not turn intentions into claims.

Files: `src/site/panels/OverviewPanel.tsx`, `src/site/panels/OverviewPanel.css`; only necessary additive tokens in `src/tokens.css`.

- [ ] Replace Overview product cards with the approved hero, two brand layers, privacy problem, three approach entries, diagram, and discovery action.
- [ ] Use the specification's exact approved copy and final diagram explanation. Keep short paragraphs and design-intention framing.
- [ ] Build the diagram as semantic HTML/CSS using existing icon utilities where appropriate; distinguish solid local flow from dashed permission-dependent external transfer. Include accessible equivalent text and visible illustrative label; avoid redundant screen-reader readings.
- [ ] Link philosophy to `#principles` and product discovery to `#products` through existing navigation.
- [ ] Use natural content height and height-responsive hero padding. Remove the Overview's `1fr` expansion, `flex-end` hero alignment, and fixed card strip. Scope selectors to Overview; remove only obsolete Overview-specific card/mockup overrides.
- [ ] Preserve approved 64px desktop/40px mobile horizontal inset pattern with existing narrower-desktop adaptations, 40px mobile hero type, mobile sequential diagram, and restrained sage accents. Do not force single-viewport narration.
- [ ] Add only missing sage/diagram tokens rather than changing shared palette or typography. Do not globally alter unrelated panels.

Acceptance: hero and action fit at the requested normal-zoom desktop sizes and 375x812; normal scroll exposes all content; four ideas are present; diagram clearly distinguishes external transmission; no speculative products or unsupported capabilities. Run focused Overview layout/CTA checks immediately after the first substantive edit.

### Task 5: Products Discovery Panel

Depends on: Tasks 1, 2, and 3; can follow Task 4 sequentially to keep validation local.

Files: new `src/site/panels/ProductsPanel.tsx` and `ProductsPanel.css`; `App.tsx` registration if not completed in Task 3.

- [ ] Implement approved two-column desktop and stacked mobile typography-led layout, with equal product prominence and normal content height.
- [ ] Use only WealthPrivate and DermaPrivate names/IDs from shared metadata where useful; keep the approved discovery descriptions in this panel rather than changing metadata consumed by unrelated product pages.
- [ ] WealthPrivate is `IN DEVELOPMENT`; DermaPrivate has no unverified availability badge. Link actions to their existing individual panel hashes.
- [ ] Replace internal verification warning with: `Each Amanchi Labs application is designed with privacy in mind. Features and data-handling practices vary by product; explore each application to learn how it works.`
- [ ] Include Back to Overview; retain understandable link labels, visible focus, 44px targets, and long-name/CTA wrapping at high zoom.

Acceptance: exactly two public products; correct status and route actions; no overflow/clipping, including long titles under zoom; no release promise or internal checklist displayed. Run focused Products route, content, and layout checks immediately after editing.

### Task 6: Integrated Regression And Visual Review

Depends on: Tasks 1-5, with claim audit blockers explicitly tracked.

- [ ] Run the complete focused frontend suite, `npm exec tsc -- -b`, and `npm run build`; verify the production build through a local preview as well as dev mode.
- [ ] Capture Overview and Products at all four requested viewports; save initial viewport and full scrollable-canvas screenshots. Do not assume browser `fullPage` captures the full content of the fixed canvas: verify dimensions and capture the active panel explicitly.
- [ ] Compare to approved review baselines and final refinements. Preserve mobile layout and typography; explain expected added text height and four-item menu differences rather than claiming byte-identical historical screenshots.
- [ ] Compare unchanged WealthPrivate, DermaPrivate, Principles, and Contact against Task 0 at desktop/mobile. Any approved claim corrections are text-only exceptions, not design permission.
- [ ] Perform the complete regression matrix below; resolve touched-slice defects with focused reruns, not unrelated cleanup.
- [ ] Export approval screenshots into Downloads with fresh filenames and provide the implementation diff/file list, results, claim ledger status, and residual risks.

Acceptance: functional gates pass and visual deltas are limited to the approved designs and refinements; no silent failures. Final user review required before publication. Do not merge, push, or deploy.

## Regression Matrix

| Area | Required checks | Pass condition |
| --- | --- | --- |
| Hash routes | Empty, invalid, `#overview`, `#products`, `#wealth`, `#derma`, `#principles`, `#contact`; direct load/reload | Correct panel, URL and state agree; invalid/empty resolve to Overview without history rewrite |
| History | Overview -> Products -> wealth -> Products -> derma; Back/Forward; external hash change; same-route selection; rapid switching | Correct settled panel/URL, no stale outgoing interactive content or focus errors; no duplicate history entry on same hash |
| Desktop navigation | Four items, click/Enter/Space, ArrowUp/Down wrapping including Contact, brand, skip link | All destinations reachable, exact-route current semantics, portfolio context not falsely current |
| Mobile drawer | Open, initial focus, Tab/Shift+Tab trap, Escape, selection, same-route selection, Back/Forward while open, resize past 1024px | Main inert only while open; cleanup completes; focus restores or transfers to main as appropriate; `aria-expanded` correct |
| Focus and transitions | Panel main focus after navigation, outgoing `aria-hidden`/`inert`, rapid route changes, reduced motion | Only active content actionable; correct accessible panel heading; no lingering transition or drawer state |
| Overview content | Headline, belief, brand layers, all four ideas, final diagram text, philosophy/discovery actions | Approved sequence and copy; no product cards; local and optional external flow distinct in visual and accessible descriptions |
| Products content | Exactly two entries, status, descriptions, disclosure, individual links, Back to Overview | No speculative products or unsupported status; all actions resolve correctly |
| Viewport layout | 1440x900, 1280x800, 1024x768, 375x812; 768px tablet and 1023/1024px breakpoint | Hero/action initially visible at normal zoom; no horizontal overflow or clipped content; deliberate Overview scroll, no gratuitous Products scroll |
| Height and zoom | 1280x600 and 1024x600; actual browser zoom 125% and 200%; mobile text enlargement | All content/actions reachable through expected vertical canvas scroll, no hidden overflow, long product names/buttons wrap; CSS zoom alone is insufficient evidence |
| Existing links | Product panels, DermaPrivate external URL, founder/support mailto, brand | Original targets/labels preserved; external target responds and opens safely; mailto values correct; inbox receipt only if independently confirmed |
| Assets and runtime | Dev and built preview, fonts loaded before capture, console/page errors, failed requests | Instrument Serif/Inter render; no broken assets or new errors; third-party request failures reported rather than hidden |
| Accessibility | Landmarks/headings, contrast of sage/text, non-color flow meaning, touch targets, screen-reader spot check | One active main/heading hierarchy, keyboard complete, readable text, clear conceptual label and optional external transfer |
| Claim audit | New statements plus existing product pages and metadata | No unsupported capability assertion; evidence limitations recorded; unresolved evidence blocks publication |

## Verification Method And Change Budget

Use the smallest behavior-scoped check immediately after each substantive edit. Existing browser checks in the review notes are mockup evidence only, not production acceptance. Automated overflow assertions must inspect the active panel and canvas scroll dimensions as well as the document because the global shell hides document overflow.

Expected production changes are limited to Overview, new Products panel, route registration/types, both navigation arrays, any necessary contextual nav styling, and additive design tokens. Shared shell, global reset, existing product mockups, product panels, Principles, and Contact remain unchanged unless a demonstrated regression or approved evidence correction requires a narrowly documented edit. Test-only changes are limited to package scripts/dev dependency/lockfile, Playwright config, one focused spec, and ignored artifacts. Review/verification documents may be updated as results become available.

No plan approval implies permission to change product functionality or to publish an unverified claim. If the approved layout cannot be reproduced within the current shell without a shared change, document the exact blocker and obtain approval before widening the implementation scope.

## Approval Checklist

- [ ] User approves this implementation plan, including four-item navigation and focused test tooling.
- [ ] Product evidence access and claim-review owner confirmed, or missing-evidence publication blocker explicitly accepted for local implementation.
- [ ] Local implementation and regression results reviewed against approved designs.
- [ ] Claim ledger signed off before publication; corrections to existing product copy separately approved where needed.
- [ ] User separately authorizes any merge, push, or deployment. No release commands belong to this plan.