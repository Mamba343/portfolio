# Ali Mohammed Abedi Syed — Personal Portfolio

Premium dark-themed developer portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no blog.

## Live source
https://github.com/Mamba343/portfolio

## Project structure

```
portfolio/
├── index.html              # Homepage (hero, featured projects, about, experience, skills, contact)
├── about.html              # About page
├── projects.html           # Projects listing
├── projects/petfeeder-v2.html   # PetFeeder v2 case study
├── 404.html                # Custom 404 page
├── favicon.svg             # Site icon
├── robots.txt              # Search engine directives
├── sitemap.xml             # Sitemap
├── css/main.css            # All styles (dark design tokens + components)
├── js/main.js              # Vanilla JavaScript (mobile menu, external links)
├── tests/                  # Playwright + axe-core accessibility tests
│   ├── portfolio.spec.js
│   └── a11y.spec.js
├── .gitignore
└── README.md               # This file
```

## Local development

There is no build step. Open any HTML file directly, or serve the folder with a static server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000/`.

## Testing

### Playwright browser tests
```bash
npx playwright test tests/portfolio.spec.js
```

### Accessibility (axe-core)
```bash
npx playwright test tests/a11y.spec.js
```

### Lighthouse
```bash
npx lighthouse http://localhost:8000/ --preset=desktop
```

## Deployment to Vercel (manual)

1. Push this repository to GitHub (already done: `github.com/Mamba343/portfolio`).
2. In Vercel, click **Add New → Project** and import `Mamba343/portfolio`.
3. Framework preset: **Other** (static HTML).
4. Build command: leave blank / none.
5. Output directory: the repository root (the site is already static HTML).
6. Install and confirm.
7. Add your custom domain in Vercel > Project > Settings > Domains if desired.
8. To redeploy after future changes, push to the connected branch — Vercel redeploys automatically.

The `404.html` at the root provides custom 404 handling on Vercel. All internal links are relative, so nested routes and page reloads work under static hosting.

## Scope & accuracy

- Portfolio-only: no blog, no article listings, no RSS feed.
- Dark theme by default; no light/dark toggle.
- No resume PDF is published as a downloadable file.
- No secrets or credentials are in source control.
- All project claims are traceable to the resume and public GitHub repositories; no fabricated metrics or testimonials.