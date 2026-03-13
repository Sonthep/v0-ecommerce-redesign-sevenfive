# SevenFive — Professional Kitchen Equipment

> Thailand's trusted partner for commercial kitchen equipment. 30,000+ products from world-leading brands.

[![CI](https://github.com/your-org/v0-ecommerce-redesign-sevenfive/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/v0-ecommerce-redesign-sevenfive/actions/workflows/ci.yml)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, SSG/SSR)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Package Manager:** pnpm 10

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-org/v0-ecommerce-redesign-sevenfive.git
cd v0-ecommerce-redesign-sevenfive

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in values in .env.local

# 4. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `pnpm dev`          | Start development server  |
| `pnpm build`        | Production build          |
| `pnpm start`        | Start production server   |
| `pnpm lint`         | Run ESLint                |
| `pnpm lint:fix`     | Auto-fix ESLint errors    |
| `pnpm format`       | Format code with Prettier |
| `pnpm format:check` | Check formatting          |
| `pnpm type-check`   | TypeScript type checking  |

## Project Structure

```
app/                  # Next.js App Router pages
  api/                # Route Handlers
  (routes)/           # Page files
components/
  ui/                 # shadcn/ui base components
  *.tsx               # Feature components
contexts/             # React Context providers
lib/                  # Utilities & shared helpers
public/               # Static assets
.github/
  workflows/          # CI/CD (GitHub Actions)
  ISSUE_TEMPLATE/     # Bug report & feature request templates
```

## Branch Strategy

```
main        ← production (protected, deploy on push)
develop     ← staging integration branch
feat/*      ← new features
fix/*       ← bug fixes
chore/*     ← maintenance
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add product comparison page
fix: correct price formatting for THB
docs: update README setup steps
refactor: extract ProductCard to separate file
perf: lazy load below-fold images
chore: upgrade next.js to 16.x
```

## Contributing

1. Fork the repo & create a branch from `develop`
2. Make changes & ensure `pnpm lint`, `pnpm type-check`, and `pnpm build` pass
3. Open a Pull Request using the provided template
4. Request review from at least one team member

## License

Private — © SevenFive Co., Ltd. All rights reserved.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/Sonthep/v0-ecommerce-redesign-sevenfive" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
