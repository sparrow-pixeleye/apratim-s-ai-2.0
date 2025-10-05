# APRATIM'S AI 2.0

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) ![React 18.2](https://img.shields.io/badge/React-18.2-blue) ![Vite 4.3](https://img.shields.io/badge/Vite-4.3-purple) ![TailwindCSS 3.3](https://img.shields.io/badge/TailwindCSS-3.3-cyan)

> **The World's Most Advanced Browser-Based AI Assistant** — A self-contained, offline-first chatbot with context awareness, advanced math, psychological analysis, and predictive reasoning. Designed to run in the browser with zero external runtime dependencies.

Live demo: [https://sparrow-pixeleye.github.io/apratim-s-ai-2.0](https://sparrow-pixeleye.github.io/apratim-s-ai-2.0)

---

## 🚀 Highlights

* **Context-aware multi-turn conversations** with local persistence (LocalStorage).
* **Deep reasoning engine** optimized for chained prompts and analysis.
* **Mathematical mastery**: algebra, geometry, calculus, statistics, and finance helpers.
* **Psychological / sentiment analysis** to adapt tone and suggestions.
* **Predictive analytics**: trend summaries and data-driven forecasting helpers.
* **Modern UI** inspired by Gemini with dark/light modes, responsive layout, and shadcn/ui components.

---

## ✅ What I improved in this README

1. Clear, actionable sections: Quick start, Development, Production, Testing.
2. Opinionated suggestions for CI, code quality, and deployment.
3. Sample GitHub Actions workflows and recommended `package.json` scripts.
4. Contribution & community guidelines to encourage safe PRs.
5. Roadmap and ideas for incremental enhancements.

---

## 📦 Tech Stack (summary)

* **Frontend:** React 18 + Hooks (optionally TypeScript)
* **Build:** Vite 4
* **Styling:** TailwindCSS 3.x + shadcn/ui
* **Icons:** lucide-react
* **Storage:** Browser LocalStorage (optionally IndexedDB for scale)
* **Deploy:** GitHub Pages (current) — alternatives: Netlify, Vercel

---

## 🛠 Quick Start

```bash
# clone
git clone https://github.com/sparrow-pixeleye/apratim-s-ai-2.0.git
cd apratim-s-ai-2.0

# install
npm install
# or
# yarn

# dev server
npm run dev

# build for production
npm run build

# deploy (if you have setup GH Pages script)
npm run deploy
```

---

## 🔧 Recommended `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx src",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\"",
    "test": "vitest",
    "typecheck": "tsc --noEmit",
    "deploy": "gh-pages -d dist"
  }
}
```

> Tip: add Husky pre-commit hooks for linting & formatting to keep PRs clean.

---

## 🧩 Suggested repository structure (expanded)

```
apratim-s-ai-2.0/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/             # shadcn/ui + custom shared components
│   │   ├── ChatBubble.jsx
│   │   ├── ChatInput.jsx
│   │   ├── Sidebar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── features/
│   │   ├── math/           # math engine, utils & tests
│   │   ├── sentiment/      # sentiment and psychological analysis
│   │   └── predict/        # forecasting helpers
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/
│   ├── workflows/          # CI (lint, test, build, deploy)
│   └── ISSUE_TEMPLATE.md
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ✅ Improvements & features you can implement (priority list)

### Must-have / High impact

* **TypeScript migration** (Gradual: add `--jsx` allow and convert core files first)
* **Unit tests** for the math engine (Vitest + testing-library)
* **E2E tests** for flows (Playwright or Cypress)
* **CI workflow**: lint, test, build on PRs and merges
* **Prettier + ESLint + Husky** for consistent code style
* **Accessibility audit** (a11y): keyboard navigation, aria labels, color contrast
* **Security review**: ensure no secret keys, safe eval usage, sandbox math parser (avoid `eval`)

### Medium impact

* **IndexedDB** for larger chat histories and search
* **Export/import** chat history (JSON / markdown)
* **Offline-first PWA**: add a service worker and manifest for offline usage
* **Math visualizations**: render steps with LaTeX (KaTeX) and interactive graphs (recharts)
* **Theme editor**: user-customizable themes & font sizes

### Nice-to-have

* **Voice I/O** (Web Speech API) with privacy-first, local-only pipeline
* **Multi-language UI** (i18n) start with English + one additional language
* **Plugin architecture** for special skills (code execution sandbox, dataset upload)

---

## 🔁 Sample GitHub Actions workflows

### 1) `ci.yml` (lint, test, build)

```yaml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2 # or use node setup
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test --if-present
      - run: npm run build
```

### 2) `deploy.yml` (optional) — deploy to GitHub Pages

```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🧪 Testing

* Use **Vitest** for unit tests and **@testing-library/react** for component tests.
* Add test coverage and enforce a minimum threshold in CI.

Example test command:

```bash
npm run test -- --coverage
```

---

## 🔒 Security & Privacy notes

* This project is **client-only** and stores data locally by design. Do not add any secrets or server keys to the repo.
* If you later add server-side features (APIs), store secrets in GitHub Secrets and never commit them.
* Avoid `eval`. For math expression parsing, use a safe parser (e.g., [mathjs] or implement a small recursive descent parser).

---

## ♿ Accessibility checklist

* Keyboard accessible controls (all interactive elements focusable)
* Proper `aria-*` attributes for chat roles and messages
* High-contrast themes and adjustable font sizes
* Screen-reader friendly labels for chat inputs and history

---

## 📁 Contributing

Please follow these guidelines:

1. Fork the repo and create a branch named `feature/<short-name>` or `fix/<short-name>`.
2. Write tests for new features/bug fixes.
3. Run `npm run lint` and `npm run format` before commit.
4. Create a PR with a clear description and link to any related issues.

Consider adding a small `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` (I can create templates if you want).

---

## 🧭 Roadmap (short-term)

* [ ] Add unit tests for the math engine
* [ ] Add CI with lint/test/build steps
* [ ] Replace `eval` usage with a safe math parser
* [ ] Add export/import chat history
* [ ] Implement basic PWA support

---

## 📌 Useful dev utilities & libs (suggested)

* `vitest`, `@testing-library/react` — testing
* `eslint`, `prettier`, `eslint-config-prettier` — lint & formatting
* `husky`, `lint-staged` — pre-commit hooks
* `mathjs` or a small parser for math expressions
* `localforage` — IndexedDB wrapper if you move from LocalStorage

---

## 📣 Final notes

This README focuses on making the repository approachable to contributors and maintainers while adding the infrastructure needed to ship reliable releases. If you'd like, I can also:

* scaffold `/.github/workflows/ci.yml` and `deploy.yml` for you,
* add a `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `ISSUE_TEMPLATE.md`,
* convert the project to TypeScript incrementally,
* implement unit tests for the math module,
* or create a sample `vite.config.js` + `tailwind.config.js` tuned for production.

Tell me which of the above you'd like me to create next and I will add it directly into the repo files.
