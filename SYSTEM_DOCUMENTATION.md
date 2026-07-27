# GAC Haatso App Documentation

## Project Overview

This repository is a React + Vite application for a church website and dashboard system. It includes:
- Public-facing pages: Home, About, Sermons, Events, Contact, Login, Register, Forgot Password, Reset Password
- A protected dashboard area with member management, leader management, attendance, resources, event management, messages, settings, and stats
- Authentication with token storage in `localStorage`
- Theme switching between light and dark modes using Tailwind CSS and CSS variables
- API integration via Axios with a request interceptor that adds a Bearer token from local storage
- Firebase initialization stubs for auth, Firestore, and storage access
- React Query as the client-state/query-layer provider

## Repository Structure

Root files:
- `package.json` - project dependencies and scripts
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript configuration


## Frontend Stack

- React 18
- Vite 5
- TypeScript 5
- React Router DOM 6
- Tailwind CSS 3
- PostCSS
- ESLint
- Firebase SDK
- Axios
- React Query
- Zod
- Zustand
- MUI and Emotion for UI support
- Framer Motion for animations
- React Player and React Paystack for media/payment use cases

## Scripts

From `package.json`:
- `npm run dev` - start the Vite development server
- `npm run build` - build production assets
- `npm run lint` - lint the codebase with ESLint
- `npm run preview` - preview the production build with Vite

## Vite Configuration

`vite.config.ts`:
- Uses `@vitejs/plugin-react`
- Excludes `lucide-react` from optimized dependencies

## Routing and Application Flow

`src/app/main.tsx`:
- Boots the React app with `StrictMode`
- Wraps the app with `QueryClientProvider` from React Query
- Imports the global app shell from the app bootstrap layer

`src/app/App.tsx`:
- Renders the application providers and router shell
- Uses the app-level route configuration from `src/app/routes.tsx`
- Keeps the public layout and dashboard route boundaries intact
- Protects `/dashboard/*` using `ProtectedRoute`

Public Routes:
- `/` -> HomePage
- `/about` -> AboutPage
- `/sermons` -> SermonsPage
- `/events` -> EventsPage
- `/events/:eventId` -> EventDetailPage
- `/contact` -> ContactPage
- `/login` -> LoginPage
- `/register` -> RegisterPage
- `/forgot-password` -> ForgotPasswordPage
- `/reset-password` -> ResetPasswordPage
- `*` -> NotFoundPage

Protected Dashboard Routes:
- `/dashboard/stats` -> StatsPage
- `/dashboard/members` -> MembersPage
- `/dashboard/members/add` -> AddMemberPage
- `/dashboard/members/edit/:id` -> MemberFormPage
- `/dashboard/leaders` -> LeadersPage
- `/dashboard/attendance` -> AttendancePage
- `/dashboard/resources` -> ResourcesPage
- `/dashboard/events` -> EventsPage
- `/dashboard/eventsdb` -> EventsDashboard
- `/dashboard/group` -> GroupPage
- `/dashboard/messages` -> MessagesPage
- `/dashboard/settings` -> SettingsPage

## Authentication

`src/contexts/AuthContext.tsx` handles authentication state and exposes:
- `signIn(email, password)`
- `register(payload)`
- `forgotPassword(email)`
- `resetPassword(payload)`
- `signOut()`

Auth state is persisted in `localStorage` under the key `gac_user`.

`src/features/auth/components/ProtectedRoute.tsx`:
- Shows a loading spinner while auth state initializes
- Redirects unauthenticated users to `/login`
- Preserves intended location in route state for post-login navigation

## Theme System

`src/contexts/ThemeContext.tsx` provides theme state for the app:
- Supports `light` and `dark` themes
- Stores theme selection in `localStorage` under `theme`
- Applies the `.dark` class to the document root on dark mode

`src/index.css` defines theme colors using CSS variables and supports smooth transitions.

## API Integration

`src/api/api.ts` configures Axios:
- Uses `VITE_API_BASE_URL` or fallback `https://gachaatso-backend.onrender.com/api/v1`
- Includes `Content-Type: application/json`
- Adds `Authorization: Bearer <token>` header when a valid token is stored in `localStorage`
- Sanitizes tokens to remove whitespace, newlines, and tabs before header insertion

Additional constant:
- `IMAGE_BASE_URL` is derived from `VITE_API_BASE_URL` origin or falls back to `https://gachaatso-backend.onrender.com`

## Endpoint Integration Audit

### Contact Messages
- `src/pages/ContactPage.tsx` uses `useSendMessage()` to invoke `POST /messages/send`.
- `src/pages/dashboard/subpages/MessagesPage.tsx` uses `GET /messages` and falls back to `GET /messages/{id}` for individual message detail views.
- Conclusion: Contact message endpoints are integrated; there is no dummy data in this flow.

### Events
- `src/pages/dashboard/subpages/EventsPage.tsx` uses `GET /event` to load public event listings.
- `src/pages/dashboard/subpages/EventsDashboard.tsx` uses the full event lifecycle endpoints:
  - `GET /event`
  - `GET /event/{eventId}`
  - `POST /event/create-event`
  - `PATCH /event/update-event/{eventId}`
  - `DELETE /event/delete-event/{eventId}`
- Conclusion: Events endpoints are integrated. The category filter values in `EventsPage.tsx` are local UI filter configuration, but the event data itself is loaded from the backend.

### Members
- `src/pages/dashboard/subpages/MembersPage.tsx` consumes backend members endpoints:
  - `GET /members`
  - `GET /members/{id}`
  - `PATCH /members/update-member/{id}`
  - `POST /members/create-member`
  - `DELETE /members/delete-member/{id}`
- `src/pages/dashboard/subpages/AddMemberPage.tsx` correctly submits to `POST /members/create-member`.
- `src/pages/dashboard/subpages/MemberFormPage.tsx` has a mismatch/incomplete integration:
  - It uses `GET /members/{id}` and `PATCH /members/update-member/{id}` for edit mode.
  - For create mode it posts to `/members/add-member`, which does not match the documented API endpoint `/members/create-member`.
  - This likely needs correction to align with backend expectations.
- Conclusion: Member listing and update flows are integrated, but the create flow in `MemberFormPage.tsx` appears to be using a non-documented endpoint.

### Administrator / Leaders
- `src/hooks/useLeaders.js` integrates administrator leader endpoints:
  - `GET /admin/pending-leaders`
  - `GET /admin/approved-leaders`
  - `PATCH /admin/approve/{userId}`
  - `PATCH /admin/reject/{userId}`
  - `DELETE /admin/delete/{userId}`
- `src/pages/dashboard/subpages/LeadersPage.tsx` uses this hook and renders approve/reject/delete actions.
- Conclusion: Administrator leader endpoints are integrated.

### Authentication
- `src/contexts/AuthContext.tsx` implements authentication endpoints:
  - `POST /auth/login`
  - `POST /auth/register`
  - `POST /auth/forgot-password`
  - `POST /auth/reset-password`
- Conclusion: Authentication endpoints are integrated.

## Firebase Integration

`src/lib/firebase.ts` initializes Firebase services using environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Exports:
- `auth`
- `db`
- `storage`

## Styling

Tailwind configuration is set in `tailwind.config.js`:
- `content` includes `index.html` and all source files under `src`
- `darkMode` uses the `class` strategy
- Custom color palette for `primary`, `secondary`, and theme semantic colors
- Custom font families: `Cinzel` for serif and `Inter` for sans
- Custom shadows and utility classes

PostCSS config enables Tailwind CSS and Autoprefixer.

## Environment Variables

The app depends on these environment variables at runtime:
- `VITE_API_BASE_URL`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Known Important Files

- `src/app/App.tsx` - app providers and router composition
- `src/app/main.tsx` - root app initialization
- `src/contexts/AuthContext.tsx` - auth provider and session persistence
- `src/contexts/ThemeContext.tsx` - theme provider and toggle logic
- `src/services/apiClient.ts` - Axios client and auth header injection
- `src/config/firebase.ts` - Firebase initialization
- `src/components/layout/Layout.tsx` - application shell layout
- `src/features/auth/components/ProtectedRoute.tsx` - dashboard protection logic
- `src/index.css` - theme variables and global styling

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Notes

- The public website uses a shared `Layout` wrapper with `Header` and `Footer`.
- Pages are lazy-loaded inside `App.tsx` for performance.
- The dashboard is guarded behind `ProtectedRoute` and requires the user token from `localStorage`.
- Theme switching is persistent and controlled via CSS variables.
- The app currently uses `axios` to call a backend API at `gachaatso-backend.onrender.com` by default.

---

This document is generated from the current project structure and configuration files in the repository. For more details, inspect the source files under `src/` and configuration files at the repository root.

# Project tree
Install the plugin, press Ctrl+Shift+P and enter Project Tree to activate the plugin. It will generate a tree structure of the project in the README.md file.