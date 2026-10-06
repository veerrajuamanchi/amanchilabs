# Amanchi Labs

The Amanchi Labs company website is a responsive, single-page React and TypeScript site built with Vite. Product entries live separately from the presentation in `src/site/products.ts`; the current featured product is DermaPrivate.

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

## Deployment

The site is static and can be deployed to Render Static Sites, Vercel, Netlify, or GitHub Pages. On Render, create a Static Site connected to the repository and use the settings below.

- Build command: `npm run build`
- Publish directory: `dist`

For GitHub Pages, configure the Pages workflow to install dependencies, run `npm run build`, and publish `dist`. The Vite base is `/` for custom domains and root deployments; set `base` in `vite.config.ts` to the repository path if publishing under a project subpath.

## Updating the portfolio

Add product records in `src/site/products.ts`. The `Product` type includes name, category, description, status, URL, accent, and featured fields. Keep public product claims and availability accurate when adding a product.

The contact address is currently configured as `hello@amanchilabs.com` in `src/site/App.tsx`; update both mail links there to the address the studio monitors before launch. The Privacy footer link points to the studio's privacy principles. The Terms link opens a terms inquiry email until formal terms are published.
