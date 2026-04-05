# DebtHydra

A production-grade financial education and debt management website built with Next.js 14, TypeScript, and Tailwind CSS. Deployed at [debthydra.com](https://debthydra.com).

## What's included

- **4 calculators**: Debt Snowball, Debt Avalanche, Auto Loan, Emergency Fund
- **5 guides**: Plain-English articles about debt payoff strategies
- **SEO**: sitemap.xml, robots.txt, per-page meta tags, Open Graph
- **Tests**: Unit tests (Vitest) for all calculator logic + Playwright E2E tests
- **CI**: GitHub Actions workflow for lint, type check, unit tests, and E2E on every PR

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run E2E tests (requires dev server running)
npm run test:e2e

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout (header, footer)
│   ├── globals.css          # Global styles + prose
│   ├── sitemap.ts           # XML sitemap (auto-generated)
│   ├── robots.ts            # robots.txt
│   ├── tools/               # Calculator pages
│   │   ├── debt-snowball-calculator/
│   │   ├── debt-avalanche-calculator/
│   │   ├── auto-loan-calculator/
│   │   └── emergency-fund-calculator/
│   └── guides/              # Blog/guide pages
│       └── [slug]/          # Dynamic MDX guide rendering
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Button, Card, FormField
│   ├── calculators/         # Calculator UI components (client)
│   └── guides/              # GuideCard component
├── content/
│   └── guides/              # MDX guide files
├── lib/
│   ├── calculators.ts       # Core financial math (pure functions)
│   ├── guides.ts            # MDX guide loading
│   └── metadata.ts          # SEO metadata helpers
├── tests/
│   ├── unit/                # Vitest unit tests
│   └── e2e/                 # Playwright E2E tests
└── types/
    └── index.ts             # Shared TypeScript types
```

---

## Calculator Implementation

All calculator logic lives in `src/lib/calculators.ts` as **pure TypeScript functions** — no React dependencies, no side effects. This keeps them easy to test and reuse.

### Key functions

| Function | Description |
|----------|-------------|
| `calculateSnowball(debts, extra)` | Debt snowball payoff schedule (smallest balance first) |
| `calculateAvalanche(debts, extra)` | Debt avalanche payoff schedule (highest rate first) |
| `calculateAutoLoan(principal, rate, term)` | Standard amortising auto loan |
| `calculateEmergencyFund(target, monthly, rate, initial)` | Compound savings growth |

### Adding a new calculator

1. Add the calculation function to `src/lib/calculators.ts`
2. Add types to `src/types/index.ts` if needed
3. Create a UI component in `src/components/calculators/`
4. Create a page at `src/app/tools/[your-calculator-name]/page.tsx`
5. Add the URL to the sitemap in `src/app/sitemap.ts`
6. Add unit tests in `src/tests/unit/calculators.test.ts`

---

## Adding a New Guide

1. Create a `.mdx` file in `src/content/guides/` with this frontmatter:

```mdx
---
title: "Your Guide Title"
description: "SEO description, 150-160 characters"
publishedAt: "2024-12-31"
tags: ["debt payoff", "strategy"]
relatedTools: ["/tools/debt-snowball-calculator"]
---

Your content here...
```

2. The guide will automatically appear on `/guides`, get a page at `/guides/your-slug`, and be added to the sitemap.

---

## Environment Variables

No environment variables are required for development or production. All calculations are client-side; there's no database or external API.

---

## Deployment

The site is deployed on Vercel via GitHub integration. Every push to `main` triggers a production deployment. PRs get preview deployments automatically.

Production URL: [https://debthydra.com](https://debthydra.com)

---

## Future Work

Suggested next calculators:
- **Mortgage payoff calculator** — extra payments, refinancing break-even
- **Student loan repayment** — IDR vs standard plan comparison
- **Debt consolidation calculator** — should you consolidate at rate X?
- **Net worth tracker** — assets vs liabilities snapshot

Content clusters worth building:
- Debt consolidation guides
- Credit score improvement
- Negotiating with creditors / hardship programs
- Budgeting for specific life events (medical debt, divorce, job loss)
