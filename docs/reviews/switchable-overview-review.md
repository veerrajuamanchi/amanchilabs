# Switchable Overview Design Review

Date: 2026-10-11. Status: mockup only, awaiting visual approval. No production changes made for this interaction revision; prior in-progress brand/navigation/copy work remains intact. Existing approved spec and implementation plan are not revised yet.

## Recommendation

Latest app refinement: both WealthPrivate and DermaPrivate introductions use the same charcoal content foundation (`#202629`), with slate accents for WealthPrivate and sage accents for DermaPrivate. Shared company header and live-text footer remain consistent. DermaPrivate is labeled **IN TESTING** in both its introduction and Products listing, based on the owner's status update. No October release date or availability promise is published. Four viewport/status/return-link checks pass; sampled DermaPrivate text/action contrast exceeds 9.6:1. Product screenshots, portable HTML, and verification were refreshed in the existing product review Downloads folder. Production remains unchanged.

Product-discovery refinement: Discover WealthPrivate and Discover DermaPrivate now open internal `#wealth` and `#derma` mockup states, retaining the common introduction, top navigation and live-text brand footer. Products is visually marked as the parent without falsely declaring its link the exact current location. WealthPrivate uses charcoal/slate accents and an in-development email action; DermaPrivate uses sage and the existing real external website for Explore DermaPrivate. No speculative WealthPrivate website URL is added. Both have Back to Products. This supersedes the earlier notes that product-detail links leave the prototype.

The mobile-only hamburger now opens an Applications shortcut menu with exactly WealthPrivate and DermaPrivate, rather than repeating company-section links already visible above the headline. Escape restores focus; selecting an app closes the dialog. Production navigation remains unchanged.

Product review exports: `/Users/veerrajuamanchi/Downloads/Amanchi-Labs-Product-Mockups-2026-10-11`. Includes both product states and Products at all four requested viewport sizes, expanded mobile captures, a mobile-menu preview, portable `product-mockup.html`, and validation measurements. Internal navigation, header/footer preservation, no horizontal overflow, Back/return/reload, and menu focus checks pass. Sampled product text contrast exceeds 4.5:1. Product-specific feature descriptions remain design-intention review copy, not independently verified functionality. No production code, approved spec, or implementation plan changed for this refinement.

Latest refinement: the top row is Our Vision, Why It Matters, Our Approach, Principles, Products, Contact. Next-step actions follow Vision -> Why -> Approach -> Principles -> Products -> Vision. Principles, Products and Contact now each have their own selected-content view under the same persistent introduction in this prototype. Products returns to `#overview` within the mockup, not the older production page. Individual product-detail links still open the existing port-5175 product panels. This supersedes the external-company-panel links described in the original review notes below; it does not implement a production shared-shell change. Contact uses the shared light review shell; its production dark panel remains unchanged pending approval of this broader presentation.

Use a compact persistent introduction and section navigation with exactly one selected content article. Preserve the emotional headline in the introduction, and use "Your app. Your device. Your information." as the Our Vision content heading. This avoids repeating a large hero twice, emphasizes ownership/independence/optional AI, and fits all three states on the requested desktop screens.

The supplied Navigation.html and Visual_Concept.html are saved conversation pages rather than standalone production components. Their relevant content was extracted without executing their embedded scripts. The prototype adopts the interaction idea, not the saved chat interface.

## Review Prototype

Local interactive review: `http://127.0.0.1:5173/docs/reviews/switchable-overview.html#overview`.

Portable HTML and images for all six selected states are in:

```text
/Users/veerrajuamanchi/Downloads/Amanchi-Labs-Switchable-Overview-2026-10-11
```

Open `switchable-overview.html` there to compare states. Logo and local styles are embedded; web fonts still require a network connection. Company destination links stay inside the mockup; only individual product-detail links open port 5175. Each destination renders its own content once beneath the shared header. The main site at port 5175 still has its existing long-document Overview until implementation is approved.

## State And Navigation

- `#overview`: Our Vision; `#overview/vision` remains a compatible alias.
- `#overview/why`: privacy problem and meaningful independence.
- `#overview/approach`: local workflow, optional external AI diagram, provider-policy and design-intention distinctions.
- Principles, Products and Contact use their own prototype hashes and retain the common header. Existing production routes are untouched.
- Section switches replace one article without calling scrollIntoView/scrollTo. Introduction/navigation position stays stable. Heading focus uses preventScroll and a short status announcement. Native hash changes support direct load/reload and Back/Forward.
- Navigation links use current-location semantics; Left/Right moves focus among the three section choices, with Enter activation. They are route links, not a misleading mixed tablist containing external panel destinations.
- Selected content has a subtle 150ms fade-in disabled for reduced motion. This is a prototype transition, not a fully validated outgoing/incoming React crossfade implementation.

## Responsive Behavior

The current 240px sidebar and 56px mobile bar are preserved. Introduction/navigation use content-sized rows. Only the selected content scrolls where required; no hidden-content fixed-height panel.

All three desktop states fit without content scrolling at 1440x900, 1280x800 and 1024x768. Mobile uses the same compact introduction for all states instead of changing hero height on selection; this avoids layout jumps and keeps navigation in place. At 375x812, selected content scrolls, especially the stacked Approach diagram. Below 450px viewport height, the mockup falls back to whole-document scrolling to preserve accessibility; keeping the introduction permanently pinned is intentionally secondary to making all content reachable. Actual browser-zoom and full React accessibility regressions remain implementation gates, not claimed from these mockup checks.

## Messaging Boundary

The new request proposes account-free, cloud-free and offline independence. Those capabilities have not been independently verified in actual product implementations. The mockup therefore says "Our goal" and explicitly notes product-specific requirements, rather than promising all applications work without accounts, cloud storage, or connectivity. External AI may need a network connection and provider account; no contrary guarantee is made. Server non-involvement is an intended architecture; the app still handles AI requests/responses and provider retention policies apply.

## Captures And Checks

- `vision-1440x900.png`, `why-1440x900.png`, `approach-1440x900.png`: desktop states. The same three prefixes are captured at 1280x800, 1024x768, 375x812.
- Mobile `*-375x812-expanded.png`: complete selected content shown in expanded document flow for review, not a claim that the full diagram fits within the pinned mobile viewport.
- `verification.json`: exact viewport/content geometry and history/focus check summary.
- Checks passed: one selected article, persistent introduction position, no automatic switch scrolling from initial view, no horizontal overflow, all three direct states, Back/Forward/reload, keyboard activation/arrow focus, drawer Escape focus restoration, fonts, reduced motion, short-height samples (1280x600, 720x450, 375x600, 375x400).
- First mobile captures exposed scroll restoration and arrow-selector issues; final captures explicitly reset selected-content scroll and the mobile diagram hides the desktop local arrow. Initial screenshots omit focus outlines only for visual comparison; keyboard focus styling remains available.

## Approval Gate

Review the three desktop and mobile states, compact persistent introduction, independently scrollable selected content, and intention-based copy. After visual approval, update the design specification and prepare a scoped implementation plan for replacing the current Overview scroll effect with selected-state rendering in the existing hash router. Do not implement, merge, push, or deploy from this prototype alone.