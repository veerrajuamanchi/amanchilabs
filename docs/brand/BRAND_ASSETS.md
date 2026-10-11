# Brand Asset Inventory

All 13 originals are byte-preserved; SHA-256 hashes and full alpha counts are in asset-inventory.json. RGB beneath transparent pixels is not a visible black background. Corner samples characterize the background, not the entire image. Original dimensions must never be inferred from filenames.

| Original | Dimensions | Bytes | Alpha | Corner RGBA | Intended use / suitability |
| --- | --- | --- | --- | --- | --- |
| Amanchi_Labs_Logo.png | 1983x793 | 1095243 | No; opaque | 253, 251, 248, 255 | Complete horizontal master; opaque off-white, fine tagline. Preserve; not readable as-is at sidebar size. |
| Amanchi_Labs_Stacked_Vertical_Logo.png | 1254x1254 | 546418 | Yes; 1245558 clear, 324735 partial pixels | 0, 0, 0, 1 | Transparent stacked artwork; isolate symbol for compact derivatives. Full stacked version for presentations. |
| Amanchi_Labs_Wordmark_Name_Only.png | 2172x724 | 273095 | Yes; 1437966 clear, 130356 partial pixels | 0, 0, 0, 0 | Transparent dark serif wordmark; trim empty canvas and use in compact lockup. |
| Amanchi_Labs_Footer_Logo.png | 2172x724 | 1033204 | No; opaque | 253, 252, 250, 255 | Opaque off-white footer artwork with copyright and dark type. Reference only; use high-contrast compact derivative on charcoal. |
| Amanchi_Labs_Favicon.png | 1536x1024 | 1185390 | No; opaque | 252, 251, 249, 255 | Opaque presentation sheet with size labels; never publish whole sheet as a favicon. |
| Amanchi_Labs_Favicon_16px.png | 1254x1254 | 1008101 | No; opaque | 253, 255, 254, 255 | Opaque symbol on large near-white canvas; reference for small-size visual checks, not a true 16px export. |
| Amanchi_Labs_Apple_Touch_Icon.png | 1254x1254 | 1433145 | No; opaque | 254, 255, 254, 255 | Opaque rounded-square illustration and shadow; reference only. Production tile derives from isolated approved symbol. |
| Amanchi_Labs_PWA_Icon_192_×_192.png | 1254x1254 | 1525049 | No; opaque | 255, 255, 254, 255 | Opaque tile with name/tagline; too detailed at small sizes. Retain for reference; use symbol-only derivative. |
| Amanchi_Labs_PWA_Icon_512_×_512.png | 1254x1254 | 1503820 | No; opaque | 254, 255, 254, 255 | Opaque tile with name/tagline and decorative lighting. Retain for reference; use symbol-only derivative. |
| Amanchi_Labs_Social_Sharing_Image.png | 1733x907 | 1832574 | No; opaque | 218, 221, 221, 255 | Scenic branded social artwork; resize to 1200x630. Not used as website hero imagery. |
| Amanchi_Labs_Square_Social_Profile_Avatar.png | 1254x1254 | 1553356 | No; opaque | 243, 241, 235, 255 | Opaque stacked logo on light background; future social profile artwork, not live website UI. |
| Amanchi_Labs_Email_Signature_Logo.png | 2172x724 | 265457 | Yes; 1466271 clear, 103304 partial pixels | 0, 0, 0, 0 | Transparent horizontal full lockup with fine tagline; future email signature reference. |
| Amanchi_Labs_Native_App_Icon_ArtWork.png | 1254x1254 | 1693819 | No; opaque | 253, 253, 255, 255 | Opaque rounded-square native artwork and shadows; future reference, not a change to individual app icons. |

## Production Derivatives

| File in public/brand | Dimensions | Bytes |
| --- | --- | --- |
| apple-touch-icon.png | 180x180 | 13928 |
| brandmark.png | 512x337 | 147421 |
| favicon-16x16.png | 16x16 | 493 |
| favicon-32x32.png | 32x32 | 1402 |
| favicon.ico | 16x16 and 32x32 PNG entries | 1933 |
| logo-footer.png | 640x100 | 13596 |
| logo-header.png | 640x100 | 32007 |
| og-image.png | 1200x630 | 275966 |
| pwa-192x192.png | 192x192 | 15422 |
| pwa-512x512.png | 512x512 | 76568 |

Compact header: isolate the stacked A (crop x160 y225, 930x620), trim transparency and combine with trimmed wordmark in a 640x100 transparent canvas. Tagline deliberately omitted at compact size; master retained unchanged. Footer: same lockup recolored off-white RGB 240,240,236 with original alpha, excluding embedded copyright. Symbol colors/proportions remain unchanged in header/icons. Icons remove text, tile artwork, shadows and size labels by using the isolated symbol; Apple/PWA have an intentional opaque off-white square. PWA derivatives are future-use exports only, not a manifest or installability claim; no maskable designation. Social artwork is center-cropped minimally to 1200x630, quantized at high quality, not stretched or used as a website hero. No new vector master/SVG is claimed. Legacy public/favicon.svg and public/og-image.svg are retained unchanged but no longer referenced.

Reproduce from repo root using Node and Sharp (image tooling only): SHARP_MODULE=/absolute/path/to/sharp/dist/index.mjs node docs/brand/prepare-assets.mjs /path/to/original-directory. Sharp is not a site dependency.
