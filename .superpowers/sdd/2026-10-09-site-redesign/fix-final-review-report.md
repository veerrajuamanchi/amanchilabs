# Final review fix round

## Changes

- Added a darker sage heading token and applied it to the DermaPrivate italic headline.
- Gave the Overview CTA a dark focus outline. Product card links retain their `currentColor` focus outlines.
- Raised product link height to 44px and let card rows grow with their content.
- Increased product-name and trust-text opacity to meet normal-text contrast requirements.

## Verification

- `npm run build` passed.
- Focused Chrome/Playwright check passed at 1440 × 900 and 375 × 812. The Browser plugin was unavailable.
- Derma headline contrast: **3.66:1** on the canvas (large-text target: 3:1).
- Product-name and trust-text contrast: **7.91:1** on the dark card, **5.54:1** on the light card (normal-text target: 4.5:1).
- Both product links measured **44px** tall at each viewport and did not overlap trust text.
- Overview CTA focus outline computed as solid 2px `rgb(28, 28, 28)`; card link focus outlines remained visible.
- Clicking the Overview CTA navigated to `#wealth`. No page errors were recorded.
