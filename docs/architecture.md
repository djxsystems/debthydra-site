# DebtHydra — Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Content | MDX files via next-mdx-remote |
| Testing | Vitest (unit) + Playwright (E2E) |
| CI | GitHub Actions |
| Hosting | Vercel |

## Key Design Decisions

### Separation of logic and UI
All financial math lives in `src/lib/calculators.ts` as pure functions. Calculator UI components (`src/components/calculators/`) import these functions and handle state. This means calculator logic can be unit-tested without any React infrastructure.

### MDX for content
Guides are `.mdx` files in `src/content/guides/`. Frontmatter (gray-matter) provides metadata; next-mdx-remote renders the MDX server-side. Adding a guide requires no code changes — just drop in a file.

### Static + Server hybrid
- Tool pages: static shell with client-side interactivity (all calculations in browser)
- Guide pages: server-rendered MDX for SEO
- Homepage: server component that reads guide metadata at build time

### SEO architecture
- Each page exports `metadata` with unique title, description, OG tags
- `src/app/sitemap.ts` auto-generates sitemap from static pages + all MDX guides
- `src/app/robots.ts` serves robots.txt
- Keyword-aware URL slugs under `/tools/` and `/guides/`

## Data Flow

```
User input → Calculator component (React state)
           → lib/calculators.ts (pure math)
           → Results rendered in component
```

```
MDX file → gray-matter (parse frontmatter)
         → next-mdx-remote (render content)
         → Guide page (server component)
```

## File Naming Conventions

- Pages: `page.tsx` inside route segment folder
- Components: PascalCase (`SnowballCalculator.tsx`)
- Lib utilities: camelCase (`calculators.ts`)
- MDX guides: kebab-case slug matching URL (`debt-snowball-vs-avalanche.mdx`)
