# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CLAUDE.md

## Quick Reference

### Requirements

- **Node.js**: >= 20
- **Package Manager**: npm
- **Framework**: React Router v7 (formerly Remix)
- **React**: 19.2+
- **TypeScript**: 5.9+

## Development Commands

```bash
# Development server
npm run dev          # Start development server (port 3000)

# Build and deployment
npm run build        # Production build
npm start           # Run production build

# Code quality
npm run typecheck   # Type checking + route generation
npm run lint        # ESLint check
npm run lint-fix    # ESLint with auto-fix
```

## Architecture Overview

This is a **React Router v7** (Remix successor) application for Codante.io, a Brazilian programming education platform. The project uses:

- **Framework**: React Router v7 with Vite
- **Styling**: TailwindCSS v4 with custom design system
- **UI Components**: Radix UI primitives + custom components
- **Animations**: Framer Motion with custom motion components
- **State Management**: React contexts (ColorModeProvider, auth via outlet context)
- **Backend Integration**: Axios with server-side session management
- **Authentication**: Server-side sessions with GitHub/Discord OAuth

## Route Architecture

The application uses a sophisticated routing structure with multiple layouts:

### Layout Patterns

- `_layout-app/` - Main application layout (authenticated users)
- `_layout-raw/` - Minimal layout for players and demos
- `_landing-page/` - Landing page specific components
- `_api/` - API routes

### Key Route Groups

- **Authentication**: Login, register, OAuth callbacks under auth layout
- **Content**: Mini-projetos (challenges), workshops, trilhas (tracks)
- **User Areas**: Dashboard, minha-conta, certificados
- **Player**: Video/lesson player with minimal UI
- **Subscription**: Payment and plan management

## Component Architecture

```
app/components/
├── _layouts/        # Layout components (navbar, footer, root-layout)
├── features/        # Feature-specific components (auth, comments, reactions)
└── ui/             # Reusable UI components (button, dialog, cards)
```

## Data and Services

### Models (`app/lib/models/`)

Server-side models for challenges, workshops, users, subscriptions, etc. Each model exports TypeScript types and server functions.

### Services (`app/lib/services/`)

- `auth.server.ts` - Authentication with session management
- `discord-auth.server.ts` / `github-auth.server.ts` - OAuth providers
- `axios.server.ts` - API client configuration

### Environment Configuration

Environment variables are validated using Zod schema in `app/lib/models/environment.ts`. Required variables include:

- `SESSION_SECRET`, `API_HOST`, `BASE_URL`
- GitHub OAuth: `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_CALLBACK_URL`
- Discord OAuth: `DISCORD_APP_CLIENT_ID`, `DISCORD_APP_SECRET`
- reCAPTCHA: `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`

## Authentication Patterns

- User data passed via outlet context: `const { user } = useOutletContext<{ user: User }>()`
- Protected routes use `requireAuth()` in loaders
- Guest-only routes use `requireGuest()`
- Session management with cookie-based storage

## Styling Conventions

- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Dark mode via `ColorModeProvider` context and CSS custom properties
- Component variants using `class-variance-authority`
- Background patterns: `bg-grainy`, gradient classes
- Responsive design: mobile-first with Tailwind breakpoints

## Key Development Patterns

### Data Loading

- Server-side data loading in route `loader` functions
- Environment variables via `environment()` helper with Zod validation
- API calls using configured Axios instance with auth headers
- Prefetch optimization with cache headers

### UI Components

- Radix UI primitives for accessibility
- Custom motion components in `app/components/ui/motion/`
- Loading states via `LoadingBar` component
- Toast notifications via `react-hot-toast`

### File Organization

- Server-only code in `.server.ts` files
- Route configuration in `app/route-config.ts` (organized by feature)
- Custom hooks in `app/lib/hooks/`
- Utility functions in `app/lib/utils/`

## External Integrations

- **GitHub/Discord OAuth** for authentication
- **Vimeo player** for video content
- **reCAPTCHA** for form protection
- **Crisp** for customer support
- **Google Tag Manager** for analytics
- **Stripe** (implied by payment flows)

## Performance Considerations

- Image optimization with WebP formats and lazy loading
- Code splitting via route-based chunks
- SSR-safe components with suppressHydrationWarning patterns
- Motion components respect reduced motion preferences
- Development UI debugger shows current Tailwind breakpoint
