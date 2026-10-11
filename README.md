# Amanchi Labs

The Amanchi Labs company website is a responsive React and TypeScript site built with Vite. `src/site/CompanyView.tsx` is the single active presentation: shared introduction, six company navigation links, selected content, and live-text footer. Our Vision, Why It Matters, Our Approach, Principles, Products, Contact, WealthPrivate, and DermaPrivate all render in this layout. The mobile hamburger contains the two application shortcuts. Native hash routing preserves `/#overview`, `/#overview/why`, `/#overview/approach`, `/#principles`, `/#products`, `/#contact`, `/#wealth`, and `/#derma` (`/#overview/vision` is also supported).

The former stacked Overview, old product panels, and PanelShell were removed. HTML in `docs/reviews` is historical design-review material, not application code or a production entry point. Deploying the Vite build now serves the switchable color design directly.

## Local development

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local development URL. To create and inspect a production build:

```sh
npm run build
npm run preview
```

## Browser regression checks

One focused Playwright suite covers routing, history, keyboard navigation, the mobile drawer, responsive layouts, fonts, and real browser zoom. Install Chromium once, then run:

```sh
npx playwright install chromium
npm run test:e2e
```

To use an existing Google Chrome installation instead:

```sh
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

To check a running production preview, set `SITE_TEST_URL` to its URL. Without that variable, the test config starts Vite on port 5174. Screenshots and traces in `test-results` are ignored.

## Deployment

The site is static and can be deployed to Render Static Sites, Vercel, Netlify, or GitHub Pages. On Render, create a Static Site connected to the repository and use the settings below.

- Build command: `npm run build`
- Publish directory: `dist`

For GitHub Pages, configure the Pages workflow to install dependencies, run `npm run build`, and publish `dist`. The Vite base is `/` for custom domains and root deployments; set `base` in `vite.config.ts` to the repository path if publishing under a project subpath.

## Updating the portfolio

Public discovery and individual product introduction copy live in `src/site/CompanyView.tsx`. Only WealthPrivate and DermaPrivate are featured. DermaPrivate is IN TESTING; WealthPrivate is IN DEVELOPMENT. Do not advertise speculative products or infer privacy capabilities from marketing copy. New capability statements are framed as design intentions; see `docs/reviews/product-claim-verification.md`.

The Contact panel links to `founder@amanchilabs.com` and `support@amanchilabs.com`. Local implementation approval does not authorize merge, push, or deployment.
