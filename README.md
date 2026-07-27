
```
GACHaatso-APP
├─ .bolt
│  ├─ config.json
│  └─ prompt
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ church-icon.svg
│  └─ _redirects
├─ README.md
├─ src
│  ├─ app
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  ├─ providers.tsx
│  │  └─ routes.tsx
│  ├─ assets
│  │  ├─ bethelLogo.svg
│  │  ├─ bgImg.webp
│  │  ├─ celebrate.webp
│  │  ├─ choir.webp
│  │  ├─ daddyImg.webp
│  │  ├─ IMG_6633-Recovered.jpg
│  │  ├─ inworship.webp
│  │  ├─ inworship1.webp
│  │  ├─ pastorpreaching.webp
│  │  └─ praying.webp
│  ├─ components
│  │  ├─ auth
│  │  ├─ common
│  │  │  ├─ LoadingSpinner.tsx
│  │  │  ├─ Logo.tsx
│  │  │  ├─ Pagination.tsx
│  │  │  └─ ProtectedImage.tsx
│  │  ├─ layout
│  │  │  ├─ DashboardShell.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Layout.tsx
│  │  │  ├─ NotificationDropdown.tsx
│  │  │  └─ Sidebar.tsx
│  │  └─ utils
│  │     └─ ScrollToTop.tsx
│  ├─ config
│  │  └─ firebase.ts
│  ├─ contexts
│  │  ├─ AuthContext.tsx
│  │  └─ ThemeContext.tsx
│  ├─ features
│  │  ├─ adminDashboard
│  │  │  ├─ admin
│  │  │  │  ├─ api
│  │  │  │  │  ├─ adminApi.ts
│  │  │  │  │  ├─ birthdaysApi.ts
│  │  │  │  │  └─ notificationsApi.ts
│  │  │  │  └─ pages
│  │  │  │     ├─ AdminDashboard.tsx
│  │  │  │     ├─ AdminMemberDashboard.tsx
│  │  │  │     ├─ AdminSettingsPage.tsx
│  │  │  │     ├─ Dashboard.tsx
│  │  │  │     └─ PendingUsersPage.tsx
│  │  │  ├─ events
│  │  │  │  ├─ api
│  │  │  │  │  └─ eventApi.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ DeleteConfirmModal.tsx
│  │  │  │  │  ├─ EventDetailModal.tsx
│  │  │  │  │  ├─ EventFormModal.tsx
│  │  │  │  │  └─ ModalBackdrop.tsx
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ EventDetailPage.tsx
│  │  │  │  │  ├─ EventsDashboard.tsx
│  │  │  │  │  └─ EventsPage.tsx
│  │  │  │  ├─ types
│  │  │  │  │  └─ event.ts
│  │  │  │  └─ utils
│  │  │  │     └─ eventUtils.ts
│  │  │  ├─ members
│  │  │  │  ├─ api
│  │  │  │  │  └─ members.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ AssignLeaderModal.tsx
│  │  │  │  │  ├─ DeleteMemberModal.tsx
│  │  │  │  │  ├─ MemberCard.tsx
│  │  │  │  │  ├─ MemberFormModal.tsx
│  │  │  │  │  ├─ MemberProfileDrawer.tsx
│  │  │  │  │  ├─ MembersTable.tsx
│  │  │  │  │  └─ MembersToolbar.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useMembers.ts
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ AddMemberPage.tsx
│  │  │  │  │  ├─ MemberFormPage.tsx
│  │  │  │  │  └─ MembersPage.tsx
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ messages
│  │  │  │  ├─ api
│  │  │  │  │  └─ messages.ts
│  │  │  │  ├─ components
│  │  │  │  │  └─ MessageDetailModal.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useMessages.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ pages
│  │  │  │  │  └─ MessagesPage.tsx
│  │  │  │  └─ types
│  │  │  └─ sermons
│  │  │     ├─ api
│  │  │     │  └─ sermons.ts
│  │  │     ├─ hooks
│  │  │     ├─ index.ts
│  │  │     ├─ pages
│  │  │     │  ├─ SermonDetailPage.tsx
│  │  │     │  └─ SermonsPage.tsx
│  │  │     └─ types
│  │  ├─ auth
│  │  │  ├─ api
│  │  │  ├─ components
│  │  │  │  └─ ProtectedRoute.tsx
│  │  │  ├─ hooks
│  │  │  │  └─ useHasRole.ts
│  │  │  ├─ index.ts
│  │  │  ├─ pages
│  │  │  │  ├─ ForgotPasswordPage.tsx
│  │  │  │  ├─ LoginPage.tsx
│  │  │  │  ├─ ProfilePage.tsx
│  │  │  │  ├─ RegisterPage.tsx
│  │  │  │  └─ ResetPasswordPage.tsx
│  │  │  └─ types
│  │  ├─ dashboard
│  │  ├─ leadersDashboard
│  │  │  ├─ api
│  │  │  │  └─ leaders.ts
│  │  │  ├─ hooks
│  │  │  │  └─ useLeaders.ts
│  │  │  ├─ index.ts
│  │  │  └─ pages
│  │  │     ├─ LeaderAttendancePage.tsx
│  │  │     ├─ LeaderDashboard.tsx
│  │  │     ├─ LeaderGroupPage.tsx
│  │  │     ├─ LeaderResourcesPage.tsx
│  │  │     └─ LeadersPage.tsx
│  │  └─ public
│  │     └─ pages
│  │        ├─ AboutPage.tsx
│  │        ├─ ContactPage.tsx
│  │        ├─ HomePage.tsx
│  │        └─ NotFoundPage.tsx
│  ├─ index.css
│  ├─ services
│  │  └─ apiClient.ts
│  └─ vite-env.d.ts
├─ SYSTEM_DOCUMENTATION.md
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```