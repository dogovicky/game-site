# Game Site Design Document

## 1. Document Purpose

This document describes the current design of Game Site: a React and TypeScript web application for discovering video games. It records the product intent, architecture, technology choices, project structure, user flows, quality practices, deployment model, and known follow-up work.

The document is written against the current repository implementation. Items marked as future work are not assumed to be complete.

## 2. Product Overview

Game Site is a responsive game discovery website. Users can browse a catalog of games, search by name, filter results, sort results, and move through authentication-related screens.

The product is intended to provide:

- A focused home experience for browsing popular and filtered games.
- Search and filtering by game name, genre, platform, date, and ordering.
- Reusable game cards, loading states, navigation, and form controls.
- Login, signup, logout, and password recovery flows.
- A lightweight production deployment that can be built and served as static assets.

The current authentication integration supports API requests when an auth backend is available and includes developer-safe fallback behavior for local development. It is not a production identity provider by itself.

## 3. Goals and Non-Goals

### Goals

- Make game discovery fast and easy to scan on desktop and mobile.
- Keep page-level screens and reusable UI components separate.
- Centralize authentication state and validation.
- Keep data fetching and game filter construction reusable.
- Provide repeatable lint, typecheck, test, build, container, and deployment commands.
- Ship a production image that serves the Vite output through Nginx.

### Non-Goals

- Implementing a complete backend, database, or production identity service in this frontend repository.
- Building social features, reviews, payments, or game ownership workflows.
- Treating local mock authentication as secure production authentication.
- Supporting server-side rendering; the current application is a client-side Vite SPA.

## 4. Users and Primary Journeys

### Visitor discovery journey

1. Open the home page.
2. Browse the game list and popular games.
3. Search or apply filters.
4. Inspect game cards and navigate through the application shell.

### Authentication journey

1. Open `/login`.
2. Submit credentials and receive a session state.
3. Navigate to `/signup` for account creation or `/forgot-password` for recovery.
4. Authenticated users are redirected away from auth screens to the home page.
5. Use logout to clear the session.

### Recovery journey

1. Open `/forgot-password`.
2. Submit a valid email address.
3. Send a recovery request to the configured auth endpoint when available.
4. Show the success or error state to the user.

## 5. Application Architecture

The application uses a client-side component architecture with route-based page composition.

```text
Browser
  |
  v
React entry point (main.tsx)
  |
  v
App.tsx + BrowserRouter
  |
  +-- Index page
  |     +-- navigation and sidebar
  |     +-- game filters
  |     +-- game list and cards
  |     +-- loading and error states
  |
  +-- Login page
  +-- Signup page
  +-- Forgot password page
        |
        v
AuthProvider
  +-- session state
  +-- login/signup/reset/logout actions
  +-- localStorage hydration and persistence

External services:
  +-- RAWG game API for game discovery
  +-- Optional auth API endpoints under /api/auth/*
```

### State management

- React state manages local form, filter, loading, and view state.
- `AuthContext` owns the shared authenticated user, token, loading, and error state.
- `useAuthContext` exposes the auth contract to pages and components.
- `useGameFilters` owns search/filter values and builds the RAWG query URL.
- `useFetch<T>` provides a small generic fetch lifecycle for data consumers.
- `localStorage` persists the current auth state under the `auth` key.

### Routing

Routes are defined in `src/App.tsx`:

| Route              | Screen         | Purpose                      |
| ------------------ | -------------- | ---------------------------- |
| `/`                | Index          | Game discovery home page     |
| `/login`           | Login          | Existing-user authentication |
| `/signup`          | Signup         | New-user registration        |
| `/forgot-password` | ForgotPassword | Password recovery            |

Nginx uses an SPA fallback to `index.html`, allowing direct navigation to client-side routes in production.

## 6. Repository Structure

```text
.
├── public/                  # Public files copied into the built application
├── src/
│   ├── assets/              # Application assets
│   ├── components/
│   │   ├── auth/            # Login and signup forms
│   │   ├── global/          # Shared navigation and sidebar
│   │   ├── home/            # Hero, game list, cards, and loading UI
│   │   └── ui/              # Reusable buttons, cards, inputs, selects, skeletons
│   ├── context/             # Auth and theme providers
│   ├── hooks/               # Auth, data-fetching, and filter hooks
│   ├── lib/                 # Constants, utilities, and validation modules
│   ├── pages/               # Route-level screens
│   ├── test/                # Layered unit, component, and integration tests
│   ├── types/               # Shared TypeScript domain types
│   ├── App.tsx              # Router and route composition
│   ├── main.tsx             # React application entry point
│   ├── App.css              # App-level styles
│   └── index.css            # Global styles and Tailwind configuration
├── scripts/
│   ├── clean.mjs            # Removes generated build and coverage artifacts
│   └── verify.mjs           # Runs the complete local quality gate
├── docs/                    # Project design and engineering documentation
├── Dockerfile               # Multi-stage production image definition
├── docker-compose.yml       # Local and production service definition
├── nginx.conf               # Static serving, SPA fallback, and asset caching
├── Jenkinsfile              # Jenkins CI/CD pipeline
├── index.html               # Vite HTML entry point
└── package.json             # Dependencies and automation commands
```

## 7. Tools and Technologies

### Runtime and framework

- React 19 for component-based UI.
- TypeScript 5.8 for static typing.
- Vite 7 for development server, bundling, and production builds.
- React Router for client-side navigation.

### Styling and UI

- Tailwind CSS 4 for utility-based styling and design tokens.
- Radix UI primitives for accessible interaction foundations.
- `lucide-react` and `react-icons` for iconography.
- Framer Motion for interface animation where used.
- `class-variance-authority`, `clsx`, and `tailwind-merge` for composable class names.

### Forms, validation, and data

- React Hook Form for form state and submission handling.
- Zod for shared authentication validation schemas.
- Axios for authentication API requests.
- Fetch-based `useFetch` for game data retrieval.
- RAWG API for game discovery data.

### Quality and delivery

- ESLint 9 with TypeScript and React plugins.
- Vitest with Testing Library, jsdom, and user-event.
- Docker multi-stage builds using Node 20 Alpine and Nginx Alpine.
- Docker Compose for repeatable local container operations.
- Jenkins Declarative Pipeline for CI/CD.

## 8. Design and UI Principles

- Use responsive layouts so game browsing and auth flows remain usable on small screens.
- Prefer reusable UI primitives over repeated page-specific controls.
- Preserve semantic labels and input associations for accessibility and reliable automated tests.
- Show loading, empty, error, and success states for asynchronous operations.
- Keep discovery surfaces scannable through cards, headings, filters, and predictable navigation.
- Keep authentication feedback close to the relevant form action.
- Avoid exposing implementation credentials or relying on client-side secrets for production security.

## 9. Data and API Contracts

### Game discovery

The filter hook composes a RAWG games URL from the following optional values:

- `search`
- `genres`
- `platforms`
- `dates`
- `ordering`
- `page_size=32`

The API response is consumed by the game list and card components through typed game models where applicable.

### Authentication

The frontend expects these optional endpoints:

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/forgot-password`

Successful login and signup responses are expected to contain a `user` object and `token`. The client stores that pair in the auth context and persists it locally.

### Configuration and security

API configuration is supplied through `VITE_RAWG_API_KEY` and `VITE_RAWG_API_BASE_URL` in a local environment file. Client-exposed Vite variables are not secrets because they are included in the browser bundle. A production deployment should proxy or protect third-party API access through a backend where credentials must remain private.

The repository contains `.env.example` as a safe configuration template. Real `.env` and `.env.*` files are ignored by Git. Credentials must never be added to design documents, source control, generated artifacts, or build logs.

## 10. Testing Strategy

The project uses three behavioral layers plus the aggregate verification script:

- Layer 1 validates login, signup, and password-reset schemas.
- Layer 2 validates form rendering, accessible controls, validation, and successful component submissions.
- Layer 3 validates routing and auth-related navigation and submission flows.

The standard quality gate is:

```bash
npm run check
```

This runs, in order:

1. ESLint.
2. TypeScript typecheck.
3. Vitest in CI mode with verbose reporting.
4. Production Vite build.

Other useful commands include `npm run test:watch`, `npm run clean`, and `npm run preview`.

## 11. Deployment Design

### Container build

The Dockerfile uses two stages:

1. A Node 20 Alpine builder installs locked dependencies with `npm ci` and creates `dist` with `npm run build`.
2. An Nginx Alpine runtime serves the generated static files.

Nginx provides:

- SPA fallback to `/index.html`.
- Long-lived immutable caching for `/assets/`.
- Gzip compression for common text and SVG responses.

### Compose service

The `app` service builds the production image and maps container port 80 to host port 8080. It uses `restart: unless-stopped` and sets `NODE_ENV=production`.

Useful operations:

```bash
npm run docker:build
npm run docker:up
npm run docker:deploy
npm run docker:logs
npm run docker:down
```

### Jenkins pipeline

The Jenkinsfile performs:

1. Locked dependency installation.
2. The shared `npm run check` quality gate.
3. Production Docker image build.
4. Production deployment on the `main` branch only.
5. Container log collection and workspace cleanup in the post-build step.

The Jenkins agent requires Node.js/npm, Docker, Docker Compose, and permission to access the Docker daemon. Production deployments also require the relevant registry, host, credentials, and network configuration to be supplied by Jenkins infrastructure.

## 12. Operational Concerns and Risks

- The frontend currently contains developer-safe auth fallbacks; these must not be treated as a production authentication system.
- Browser-persisted tokens in `localStorage` require a security review before handling real accounts.
- Third-party API keys embedded in a Vite client bundle are publicly recoverable.
- The current production image is static and does not include a backend API service.
- The Vite build reports a large JavaScript chunk; code splitting should be considered as the application grows.
- Container health checks, image registry publishing, rollback strategy, and runtime observability should be added for a hardened production platform.

## 13. Future Work

Prioritized follow-up work:

1. Proxy RAWG API access through a backend so the API key is not shipped to browsers.
2. Integrate a real backend authentication service with secure token handling.
3. Add game details, favorites, reviews, pagination, and/or infinite scrolling.
4. Add container health checks and a deployment smoke test.
5. Publish versioned images to a registry from Jenkins.
6. Add rollback and release approval steps for production.
7. Split large frontend bundles and measure page performance.
8. Expand accessibility, responsive visual, and end-to-end browser coverage.

## 14. Design Decisions

- **Vite SPA:** chosen for fast local development and a simple static production artifact.
- **Context for auth:** keeps the authentication contract available to route-level screens without introducing unnecessary global state complexity.
- **Shared npm verification script:** keeps local and Jenkins quality checks identical.
- **Nginx runtime image:** serves static assets efficiently and supports client-side route fallback.
- **Docker Compose deployment:** provides a repeatable single-service deployment surface while the project remains frontend-focused.
