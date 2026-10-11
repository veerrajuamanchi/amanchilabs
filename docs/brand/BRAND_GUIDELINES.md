# Amanchi Labs Brand Guidelines

Date: 2026-10-11. Initial artwork library; production derivatives await visual approval.

## Identity

Company: Amanchi Labs. Philosophy: **Private by Design. Local by Default.** Intended customer benefit: **Your Data. Your Device. Your Control.** A premium, understated software studio expressing privacy, independence, intelligence, and trust through an architectural A, sage/forest greens, charcoal, and warm off-white.

Keep Instrument Serif display type and Inter body/UI type in the website. Artwork lettering is part of the supplied logo; do not replace the site's typography with it. Representative artwork colors are sage and forest green; existing site references include off-white `#FAFAF8`, charcoal `#1C1C1C`, sage `#A8B8A0`, and forest `#52684B`. These are practical reference colors, not a claim of exact uniform colors in raster gradients. Do not automatically recolor site tokens from artwork.

## Logo Usage

- Full primary horizontal artwork: company presentations or sufficiently large display where its tagline can be read. Preserve the original unchanged.
- Stacked artwork: centered presentation or promotional use. Do not squeeze into the sidebar.
- Compact horizontal lockup: isolated original stacked A plus trimmed original wordmark, with the fine tagline omitted for legibility. Generated `logo-header.png` is 640x100; normal site display is 179.2x28 CSS pixels. This is a documented raster recomposition, not a new vector master.
- Wordmark-only source: compact text branding where the symbol is not needed; preserve original proportions.
- Standalone mark: favicons/platform tiles and future product-family identity. Never substitute it for individual WealthPrivate/DermaPrivate app icons in this task.
- Footer: compact lockup converted to off-white for charcoal. Original footer artwork has an opaque light background, dark lettering and copyright; do not insert that entire illustration into the dark panel. Keep copyright as live text once.

## Space And Size

Proposed initial minimum lockup width: 160 CSS pixels; standard 179.2px. Smaller uses should use the standalone mark instead of shrinking letters/taglines. Keep surrounding clear space at least half the symbol's displayed height. Existing sidebar padding and mobile 56px header provide the approved site fit. Preserve aspect ratio with automatic height; never stretch, skew, rotate, add shadows, or crop meaningful logo elements.

At 16px use the symbol-only derivative: no wordmark, tagline, presentation labels, or ornamental rounded-square shadows. Inspect favicon at actual size, not only an enlarged preview. Apple icon is 180x180; PWA exports are 192x192 and 512x512. These use opaque off-white tiles with the original symbol. No maskable designation or installability is claimed; no manifest/service worker is introduced. Any future maskable export requires its own circular safe-area check and approval.

## Background And Accessibility

Use transparent colored header artwork on warm off-white. Use the off-white footer variant on charcoal; never dark text on dark background. No artificial black flattening of transparent artwork. The lockup is an Overview link with a meaningful accessible name; its image uses empty alt because the link already names it. Avoid announcing the brand twice. Retain visible focus and mobile touch targets; selecting the drawer logo must close the drawer, including same-route selection.

## Preservation And Review

All 13 originals remain in `originals/`, verified by SHA-256 against supplied Downloads files. Do not publish originals wholesale; expose only the documented derivatives. Future-use stacked, avatar, email, and native artwork stays in the library. No editable vector master exists or is claimed. Production raster crops/recomposition, footer monochrome adjustment, and social-image center crop are recorded in BRAND_ASSETS.md and the generator.

No new hero imagery, speculative products, typography/palette redesign, or PWA behavior. Review desktop sidebar, mobile header/drawer, dark footer, actual-size favicon, Apple tile, and social cropping before release. Merge, push, and deployment require separate approval.