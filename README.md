# Wassim AHMED — Full Stack & Cloud Developer Portfolio

[![CI - Continuous Integration](https://github.com/wassimTech/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/wassimTech/portfolio/actions/workflows/ci.yml)
[![CD - Cloudflare Pages Deployment](https://github.com/wassimTech/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/wassimTech/portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-grade, trilingual (**Arabic, French & English**) developer portfolio web application built with **Next.js (App Router, Turbopack)**, **Tailwind CSS**, and **Cloudflare Edge Runtime**.

---

## 🌟 Key Features

- **Trilingual Internationalization (i18n)**: Seamless language toggle between Arabic (`ar` RTL), French (`fr` LTR), and English (`en` LTR) with automatic layout flipping.
- **Interactive Project Showcase**: Deep-dive modals, category filters, tech stack tags, and architecture summaries.
- **Interactive AI Portfolio Assistant**: Embedded chatbot and floating widget powered by local knowledge engine and optional Gemini LLM integration.
- **Dark & Light Mode**: Accessible theme tokens with glassmorphic aesthetic and WCAG 2.2 AA contrast compliance.
- **Cloudflare Edge Ready**: 100% Edge-compatible API routes and static asset optimization for Cloudflare Pages / Workers.
- **Enterprise CI/CD**: Automated GitHub Actions pipeline for linting, typechecking, test coverage reporting, and preview/production deployments.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), and [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/), [MSW](https://mswjs.io/), and V8 Coverage
- **Linting & Code Quality**: [ESLint](https://eslint.org/), `eslint-plugin-jsx-a11y`, [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) & GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/wassimTech/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live application.

---

## 🧪 Testing & Code Quality

```bash
# Run full local CI verification compound suite
npm run ci

# Run Vitest test suite
npm test

# Run tests with code coverage report
npm run test:coverage

# TypeScript strict type checking
npm run typecheck

# Linting with JSX accessibility rules
npm run lint

# Prettier format check
npm run format:check
```

---

## 📖 CI/CD & Deployment Guide

For full details on the GitHub Actions pipeline, secrets configuration (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`), and branch protection rules, refer to the [CI/CD Deployment Documentation](docs/CICD.md).

---

## 👤 Author

**Wassim AHMED**

- **Email**: [wassim.ahmed.tech@gmail.com](mailto:wassim.ahmed.tech@gmail.com)
- **LinkedIn**: [linkedin.com/in/-wassim-ahmed-](https://www.linkedin.com/in/-wassim-ahmed-/)
- **GitHub**: [github.com/wassimTech](https://github.com/wassimTech)
