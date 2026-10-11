# Overview Positioning Review

Date: 2026-10-10
Status: Design exploration only. Awaiting approval; not a production implementation.

## Content Revision 2

Option A and the shared mobile direction are approved conceptually. Final approval of this revised copy and composition is still pending. The sections below this revision describe the original comparison and its historical measurements, not the revised prototype.

- Retain the human headline; add the belief statement and local-first company positioning, explicitly describing design intentions rather than universal product capabilities.
- Separate the philosophy, "Private by Design. Local by Default.", from the intended customer benefit, "Your Data. Your Device. Your Control."
- Tell four ideas sequentially: "Your life is not a dataset" in the problem section, then local processing, optional transparent AI, and meaningful data control in the approach.
- Shorten the problem copy while retaining the benefits of connected services and the distinction between reducing exposure and guaranteeing security.
- Enlarge the three diagram stages: You, Your device, Optional AI. Use a solid local path and a dashed, permission-dependent external path. Label the entire diagram illustrative and disclose other possible transfers.
- Keep the future vision broad without naming speculative applications.
- Replace the original WealthPrivate-only discovery destination with a dedicated review-only Products view containing WealthPrivate and DermaPrivate. Keep the existing individual panel links in the sidebar. No production route or navigation changes are made.
- Preserve the mobile navigation and sequential composition; updated copy changes its content height intentionally.

Revised captures use the `a-revised-` and `products-revised-` prefixes; earlier A/B captures remain untouched. Desktop hero/action visibility, overflow, fonts, menu behavior, short-height resilience, and CSS-zoom stress sizing are checked separately from final visual approval. Product implementation privacy claims remain unverified; the verification checklist below is still required before publication.

## Recommendation

Choose **A: Sequential Editorial**. It establishes the company vision, explains why ownership matters, then introduces the approach and product discovery. The diagram has sufficient width for an explicit on-device boundary and external AI provider. Meaningful vertical scrolling is intentional.

**B: Parallel Editorial** places the problem and approach alongside one another beneath the same hero. It exposes the approach sooner and is shorter on large desktops, but creates a sparse lower-left column and gives the diagram less room. At narrower desktop widths it becomes sequential. Both alternatives share an identical mobile composition.

These are mockups, not replacements for the approved specification or implementation plan. Production source and existing mobile behavior remain unchanged. A future mobile content change requires approval too; the new copy cannot preserve the old Overview screenshot pixel-for-pixel.

## Current Layout Root Cause

- `src/site/components/PanelShell.css` fixes the canvas to the available viewport.
- `src/site/panels/OverviewPanel.css` sets the Overview minimum height to 100% and its rows to `minmax(0, 1fr) auto`.
- The hero uses `justify-content: flex-end`, aligning its content at the bottom of the expanding first row.
- The desktop product strip uses `height: 280px`. The expanding hero above it leaves the strip at the viewport bottom.
- Below 1199px the cards stack and become auto-height; below 768px both Overview rows become auto-sized. Those existing breakpoints explain why the mobile composition does not exhibit the same excess whitespace.

## Revised Messaging And Information Architecture

1. **Company vision:** "Your life is personal. Your technology should respect that."
2. **Supporting copy:** "We build thoughtful applications that put privacy, ownership, and control back where they belong - with you."
3. **Signature:** "Private by design. Intelligent by choice. Yours to control."
4. **Why it matters:** "Convenience shouldn't require surrendering control." Connected services offer real benefits, but uploads and integrations raise access and exposure questions. Breach notifications may reveal risks after the fact. Cloud services are not inherently unsafe; local storage does not remove all security risks.
5. **Our approach:** "Your information belongs to you. Not to the apps you use." Present local-by-default design, minimal collection, optional user-initiated AI, and user decisions about retention, sharing, and removal as guiding intentions.
6. **Architecture:** You -> personal application and information on your device -> optional transmission of selected information to an external AI provider. Clearly labeled conceptual, not verified functionality.
7. **Discovery:** "See these principles take shape." Followed by "Explore our products".

Full proposed copy is in the HTML prototype. No product cards appear in either proposed Overview.

## Navigation Recommendation

Keep Overview, WealthPrivate, DermaPrivate, Principles, and Contact. "Explore our philosophy" opens `/#principles`; "Explore our products" opens `/#wealth`. Both products remain visible in the existing navigation. A sixth Products panel would duplicate navigation for only two products, so it is not recommended now.

The prototype links to the existing product panels for review. It does not change production routing, transitions, focus management, or browser history.

## Mockups

Open `http://127.0.0.1:5173/docs/reviews/overview-concepts.html?layout=a` or change `layout=a` to `layout=b`. The preview requires the running local Vite server.

| Viewport | Current | A | B |
| --- | --- | --- | --- |
| 1440 x 900 | [Current](current-1440x900.png) | [A](a-1440x900.png) | [B](b-1440x900.png) |
| 1280 x 800 | [Current](current-1280x800.png) | [A](a-1280x800.png) | [B](b-1280x800.png) |
| 1024 x 768 | [Current](current-1024x768.png) | [A](a-1024x768.png) | [B](b-1024x768.png) |
| 375 x 812 | [Current](current-375x812.png) | [Shared mobile](a-375x812.png) | [Identical mobile](b-375x812.png) |

Full-page designs: [Desktop A](a-1440x900-full.png), [Desktop B](b-1440x900-full.png), [Mobile](a-375x812-full.png). Additional full-page captures are alongside these files.

## Technical Claim Verification Before Publication

Actual WealthPrivate and DermaPrivate implementation repositories were not inspected. Existing marketing copy is not proof of behavior. All product-specific claims remain unverified.

- [ ] For each product, record repository, commit, release, platform, and reviewed workflows.
- [ ] Trace storage locations and defaults; identify any server-side copies, caches, synchronization, and offline limitations.
- [ ] Verify encryption at rest and in transit, key ownership and handling; avoid unsupported encryption or security guarantees.
- [ ] Trace AI request payloads, consent UI, selected context, provider retention and training policies, cancellation, and non-AI workflows.
- [ ] Inspect authentication, account metadata, uploaded files, and access controls without changing those systems.
- [ ] Inventory integrations, third-party SDKs, analytics, crash reports, logging, and telemetry, including default settings and sensitive fields.
- [ ] Verify backups, exports, synchronization, operating-system cloud backups, deletion behavior, and retention limits.
- [ ] Confirm users can understand when information leaves the device and can meaningfully control each optional transfer.
- [ ] Distinguish released capabilities, development goals, conceptual diagrams, and platform-specific exceptions.
- [ ] Obtain product-owner approval for every product-specific privacy claim and its exceptions before publication.

## Verification

- Exact-resolution standalone Chrome/Playwright captures at all four requested viewports for the current page and both concepts.
- No measured horizontal overflow or out-of-viewport content in those captures.
- Instrument Serif and Inter loaded; no browser page errors observed.
- At 1440 x 900, the headline top moves from about 279px in the current page to about 93px in the concepts. At 1280 x 800 it moves from about 179px to about 87px.
- Product cards are absent from the concepts; content follows normal document flow rather than viewport-bottom alignment.
- Vertical scrolling is deliberate: at 1440px wide, A is about 1750px tall and B about 1523px tall. No single-screen acceptance claim is made for this new narrative.
- Both proposed mobile viewport PNGs are byte-identical. Production mobile is unchanged, not replaced by these mockups.
- Mobile menu opens, Escape closes it, and focus returns to the toggle.
- `npm exec tsc -- -b` and `npm run build` pass. No configured frontend test script or existing test suite was found; browser checks are not represented as an existing unit-test suite.
- The prototype has no editor diagnostics.

Machine-readable capture measurements: [verification.json](verification.json).

## Approval Gate

Select A or B and approve the copy and mobile direction first. Only after that approval should the existing specification and implementation plan be revised. Implementation, final production accessibility and routing regression checks, and any publishing steps require their applicable approvals. No production code changes, merge, push, or deployment have been performed.