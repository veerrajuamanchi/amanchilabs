# Brand, Navigation And Messaging Results

Date: 2026-10-11. Completed locally; final visual approval pending. No commit, merge, push, or deployment performed.

## Requirement Coverage

| Requested work | Result |
| --- | --- |
| Preserve all 13 originals | Byte-identical copies in `docs/brand/originals`; SHA-256 and metadata inventory recorded. Actual dimensions, sizes, alpha counts, corner colors, use and suitability documented in BRAND_ASSETS.md / asset-inventory.json. |
| Consistent desktop/mobile branding | Transparent compact original A-plus-wordmark derivative replaces geometric placeholder. Existing 240px sidebar and 56px mobile header retained; header/drawer logo links to Overview. |
| Footer branding | Off-white monochrome derivative on existing charcoal Contact panel; existing contacts/copyright retained without embedded artwork copyright duplication. |
| Icon/platform/social assets | Validated 16/32px PNGs and two-entry ICO, 180px Apple tile, 192/512px future-use PWA exports, 1200x630 social PNG. No invented SVG/vector master, no manifest/service worker or maskable claim. Legacy public SVG files preserved unmodified and no longer referenced. |
| Future-use artwork | Stacked, avatar, email, native artwork retained in originals, not published wholesale. Individual product app icons untouched. |
| Overview section navigation | Non-sticky secondary row: Our Vision, Why It Matters, Our Approach, Products, Contact. Explicit `#overview/vision`, `#overview/why`, `#overview/approach` route parsing; all six original panel routes preserved. Native hash history, heading focus and canvas scrolling checked. |
| Requested landing-page text | Emotional headline retained. Hero now identifies intelligent local-first applications and on-device processing as the design goal, avoiding ambiguous collection/sharing wording. Our Approach includes AI on your terms; app-managed optional AI, external providers and retention are explained. |
| Related messaging | Principles, Products and product trust footnotes aligned with intention-based local-first/optional-AI wording. Product layout, statuses and links retained; no accounts/encryption/zero-storage guarantees added. |
| Metadata/company identity | Software-studio title/description, canonical, Organization JSON-LD, brand/favicon/Apple metadata and absolute Open Graph/Twitter PNG URL. No invented addresses, certifications, social identities, or product capability structured data. |
| Crawlers/public information | Visible no-JavaScript company summary, website-only privacy notice, robots and sitemap. Sitemap lists actual HTTP pages, not hash fragments. No hidden keyword stuffing or architecture rebuild. |
| Corporate classification | Deferred by owner. Official review paths documented, no reliable independent category result claimed, no requests/accounts submitted, no corporate restrictions bypassed. |

## Verification

- Final built preview at `http://127.0.0.1:5175/#overview` rebuilt and shared browser refreshed.
- **23/23 Playwright checks pass** against the built preview: six panel routes/reloads, invalid fallback, history, keyboard navigation, mobile drawer/focus/cleanup, reduced motion, actual Chrome zoom 125%/200%, responsive geometry, section direct loads/reload/Back/Forward/focus, fonts/runtime/assets, metadata/privacy/crawler endpoints, and visible no-JavaScript company content.
- Focused post-copy validation: 11/11 narrative/responsive/section checks passed. Explicit `npm exec tsc -- -b` and `npm run build` pass. Editor diagnostics checked; no reported new errors. `git diff --check` passes.
- All 13 original files hash-verified and compared byte-for-byte with Downloads. Every PNG derivative's actual dimensions checked; platform/favicon tiles have no nonopaque pixels even where PNG metadata advertises alpha. Header/footer and brandmark retain transparency. ICO directory contains 16px and 32px entries.
- Production `dist/brand` includes only 10 derivatives, not originals. No manifest or service worker introduced. Built asset endpoints, robots, sitemap, privacy page and logo/favicon/social references return HTTP 200 in the existing test suite. Absolute social URLs become available publicly only after an authorized deployment.
- Exact viewport screenshots at 1440x900, 1280x800, 1024x768 and 375x812 for all six panels. Full Overview/Contact captures stitched from real canvas scroll slices; initial views explicitly reset scrollTop to zero. Desktop/sidebar, mobile/header, dark footer, Apple, OG and 16px symbol visually inspected. Mobile section links wrap without a second permanent bar.
- Header is displayed at 179.2x28 CSS pixels; proportional scaling prevents stretching. Existing editorial typography, palette and shared shell remain intact. New product/Principles copy changes content height intentionally; full 6-panel zoom/routes checks still pass.

## Review Package

```text
/Users/veerrajuamanchi/Downloads/Amanchi-Labs-Brand-Review-2026-10-11
```

`overview-WIDTHxHEIGHT.png`, `products-WIDTHxHEIGHT.png`, `contact-WIDTHxHEIGHT.png`, and the other panel captures show initial views. Overview/Contact `-full.png` captures show all scrollable content. `mobile-navigation.png` shows the drawer. The logo, favicon 16/32px, Apple and OG files are copied for direct inspection; `favicon-actual-size.png` shows the 16px image in a browser, not browser-chrome UI. A screenshot of the physical browser tab is not claimed. `implementation.diff` and this report provide changes and verification for review.

## Remaining Review Points

Review compact logo/recomposition and monochrome footer as derivatives, plus wording and increased AI-section text height. Social source's central logo survives normal cropping, but edge decorative words may be lost in square previews; square profile artwork remains the separate future-use source. No vector master is available. Manual VoiceOver/screen-reader spot testing and native Apple home-screen installation were not performed; accessible keyboard/text and image dimension checks are not a substitute for those platform checks.

The earlier product-owner confirmation of app-agent requirements is recorded separately from independent verification. This task does not inspect actual WealthPrivate/DermaPrivate repositories or prove their detailed server routing/provider behavior. New statements remain explicit intentions; no claim that all AI traffic stays local or that providers never retain submissions. Corporate categories remain deferred/unconfirmed. Final user visual review and separate publication authorization are required.

## Changed Surfaces

Brand component/CSS, Sidebar branding CSS, MobileNav header/drawer branding, Contact footer/CSS, hash-router section parsing/App forwarding, Overview section-nav/CSS/copy, related product/Principles copy, HTML metadata/no-JavaScript summary, new static privacy/robots/sitemap, existing focused browser tests, and brand docs/originals/derivatives. No dependency change, new runtime library, authentication, database, product functionality, payments, global reset or shared shell rewrite. Image generation uses temporary Sharp tooling and a documented script; Sharp is not a site dependency.