# Sevenfive — E-commerce Storefront

A Next.js storefront project for commercial kitchen equipment, organized around product discovery, brands, categories, and comparison.

**Focus:** E-commerce website development  
**ภาษาไทย:** โปรเจกต์เว็บไซต์สินค้าอุปกรณ์ครัวเชิงพาณิชย์ เน้นการค้นหาและจัดหมวดหมู่สินค้า พร้อมโครงสร้างรองรับหลายภาษา

## Project overview

The repository contains localized routes for the home page, brands, categories, product details, search, comparison, blog, and solutions.

This project demonstrates how a product-oriented website can be organized with shared components, contexts, and localized routes. Live catalog coverage, payment completion, and production deployment are not asserted by this documentation.

## Stack

| Layer | Technology |
| --- | --- |
| Application | Next.js 16 / React 19 |
| Language | TypeScript |
| Interface | Tailwind CSS 4, Radix UI, shadcn-style components |
| Localization | next-intl |
| Tooling | pnpm, ESLint, Prettier, Husky |

See [package.json](package.json) for exact versions and scripts.

## Run locally

Use Node.js 22+ and pnpm 10+ as the project setup baseline.

```bash
git clone https://github.com/Sonthep/v0-ecommerce-redesign-sevenfive.git
cd v0-ecommerce-redesign-sevenfive
pnpm install
cp .env.example .env.local
pnpm dev
```

Review [.env.example](.env.example) and supply the settings required for the integrations you use. Open http://localhost:3000.

## Source guide

| Location | Responsibility |
| --- | --- |
| [app/](app/) | App Router pages, layouts, and API routes |
| [components/](components/) | Shared interface and feature components |
| [contexts/](contexts/) | Shared client state |
| [hooks/](hooks/) | Reusable hooks |
| [i18n/](i18n/) | Localization configuration |
| [messages/](messages/) | Translation messages |
| [lib/](lib/) | Shared utilities |
| [public/](public/) | Static assets |

Localized pages live under `app/[locale]/`.

## Development commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the development server |
| `pnpm lint` | Run ESLint with no warnings allowed |
| `pnpm type-check` | Check TypeScript |
| `pnpm format:check` | Check formatting |
| `pnpm format` | Apply formatting |
| `pnpm build` | Build the application |
| `pnpm start` | Start the production build |

Run lint, type checking, formatting checks, and a production build before proposing application changes. Listing these commands does not imply that they have passed on the current checkout.

## Portfolio walkthrough

Review the category, search, product, and comparison routes to understand the product-discovery structure. When presenting this work, use screenshots from the running application and identify the specific components and integrations you contributed.

## Contributing

Create a focused branch from the current default branch. Explain the behavior being changed and include the relevant validation results in the pull request. Use Conventional Commit prefixes such as `feat:`, `fix:`, or `docs:`.

## Rights

© SevenFive Co., Ltd. All rights reserved, as stated in the existing project documentation. Public source visibility does not grant reuse rights to company branding or assets.
