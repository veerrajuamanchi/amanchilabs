# Local Brand Integration Plan

Date: 2026-10-11. Status: local review only; no merge, push, or deployment authorized.

All 13 originals are accessible. The nominal 16px, Apple, PWA, avatar and native sources are actually 1254x1254. The favicon master is a presentation sheet, not a usable icon. The primary logo's tagline becomes unreadable in the existing 240px sidebar. Footer artwork includes dark lettering, an opaque light background, and copyright unsuitable for insertion in the dark Contact footer.

1. Preserve originals unchanged and hash-verify copies in `originals/`; generate the metadata inventory. Visually inspect alpha edges, backgrounds and small-size derivatives.
2. Use the transparent stacked A symbol and wordmark to compose a compact lockup without a tiny tagline. Preserve all master elements in the library. Document crop/recomposition and the off-white monochrome footer variant.
3. Produce optimized validated PNG and multi-size ICO derivatives. Icons use the isolated symbol, not labels or presentation shadows. Produce opaque off-white Apple/PWA tiles, but do not add a manifest, service worker, or maskable claim. Resize the supplied social image to 1200x630 with minimal aspect-ratio crop, not distortion.
4. Replace only branding in existing Brand/mobile header/drawer and Contact footer. Preserve sidebar width, 56px mobile height, navigation, controls, fonts, content, and existing routes. Keep legacy public assets unchanged; update branding metadata references only.
5. Validate original hashes, derivative dimensions/alpha, built asset URLs, existing TypeScript/Playwright/build gates, and screenshots at all four required sizes. Export small-size logo/favicon, Apple, OG, sidebar/mobile/footer previews to Downloads and refresh port 5175 for user review.

No SVG master exists; do not invent one. All future-use originals stay out of public. Existing website color tokens remain unchanged. Unsuitable originals and derivative adjustments must be recorded, not silently substituted.