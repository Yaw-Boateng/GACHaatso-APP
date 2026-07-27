// src/routes/index.tsx
import { lazy, Suspense, Component, ReactNode } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

// Core Layouts
import Layout from "../components/layout/Layout";
import DashboardShell from "../components/layout/DashboardShell";
import LoadingSpinner from "../components/common/LoadingSpinner";

// Error Boundary for handling dynamic import failures gracefully
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AsyncErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-md">
            <h3 className="text-lg font-bold text-red-500 mb-1">Failed to load view</h3>
            <p className="text-xs text-theme-muted mb-4">
              {this.state.error?.message || "There was a problem dynamically loading this page."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 transition-all shadow-md cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy-loaded Public Pages
const HomePage = lazy(() => import("../features/public/pages/HomePage"));
const AboutPage = lazy(() => import("../features/public/pages/AboutPage"));
const SermonsPage = lazy(() => import("../features/adminDashboard/sermons/pages/SermonsPage"));
const EventsPage = lazy(() => import("../features/adminDashboard/events/pages/EventsPage"));
const EventDetailPage = lazy(() => import("../features/adminDashboard/events/pages/EventDetailPage"));
const ContactPage = lazy(() => import("../features/public/pages/ContactPage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../features/auth/pages/ResetPasswordPage"));
const NotFoundPage = lazy(() => import("../features/public/pages/NotFoundPage"));

// Lazy-loaded Dashboard Pages
const AdminDashboard = lazy(() => import("../features/adminDashboard/admin/pages/AdminDashboard"));
const EventsDashboard = lazy(() => import("../features/adminDashboard/events/pages/EventsDashboard"));
const ResourcesPage = lazy(() => import("../features/leadersDashboard/pages/LeaderResourcesPage"));
const GroupPage = lazy(() => import("../features/leadersDashboard/pages/LeaderGroupPage"));
const MessagesPage = lazy(() => import("../features/adminDashboard/messages/pages/MessagesPage"));
const SettingsPage = lazy(() => import("../features/adminDashboard/admin/pages/AdminSettingsPage"));
const MembersPage = lazy(() => import("../features/adminDashboard/members/pages/MembersPage"));
const AddMembersPage = lazy(() => import("../features/adminDashboard/members/pages/AddMemberPage"));
const AttendancePage = lazy(() => import("../features/leadersDashboard/pages/LeaderAttendancePage"));
const LeadersPage = lazy(() => import("../features/leadersDashboard/pages/LeadersPage"));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <LoadingSpinner size="medium" />
  </div>
);

const LazyLoad = ({ children }: { children: ReactNode }) => (
  <AsyncErrorBoundary>
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
  </AsyncErrorBoundary>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        /* PUBLIC & MEMBER ACCESSIBLE ROUTES */
        element: <Layout />,
        children: [
          { index: true, element: <LazyLoad><HomePage /></LazyLoad> },
          { path: "about", element: <LazyLoad><AboutPage /></LazyLoad> },
          { path: "sermons", element: <LazyLoad><SermonsPage /></LazyLoad> },
          { path: "events", element: <LazyLoad><EventsPage /></LazyLoad> },
          { path: "events/:eventId", element: <LazyLoad><EventDetailPage /></LazyLoad> },
          { path: "contact", element: <LazyLoad><ContactPage /></LazyLoad> },
          { path: "login", element: <LazyLoad><LoginPage /></LazyLoad> },
          { path: "register", element: <LazyLoad><RegisterPage /></LazyLoad> },
          { path: "forgot-password", element: <LazyLoad><ForgotPasswordPage /></LazyLoad> },
          { path: "reset-password", element: <LazyLoad><ResetPasswordPage /></LazyLoad> },
          { path: "*", element: <LazyLoad><NotFoundPage /></LazyLoad> },
        ],
      },
      {
        /* DASHBOARD: RESTRICTED TO ADMIN, PASTOR, LEADER ONLY */
        path: "dashboard",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "PASTOR",
              "PASTORS",
              "LEADER",
              "admin",
              "pastor",
              "pastors",
              "leader",
            ]}
          />
        ),
        children: [
          {
            element: <DashboardShell />,
            children: [
              /* Main Admin Entry point rendering tabbed UI */
              { index: true, element: <LazyLoad><AdminDashboard /></LazyLoad> },
              { path: "eventsdb", element: <LazyLoad><EventsDashboard /></LazyLoad> },
              { path: "messages", element: <LazyLoad><MessagesPage /></LazyLoad> },
              { path: "settings", element: <LazyLoad><SettingsPage /></LazyLoad> },

              {
                element: (
                  <ProtectedRoute allowedRoles={["LEADER", "leader"]} />
                ),
                children: [
                  { path: "group", element: <LazyLoad><GroupPage /></LazyLoad> },
                  { path: "attendance", element: <LazyLoad><AttendancePage /></LazyLoad> },
                  { path: "resources", element: <LazyLoad><ResourcesPage /></LazyLoad> },
                ],
              },

              {
                element: (
                  <ProtectedRoute
                    allowedRoles={["ADMIN", "PASTOR", "PASTORS", "admin", "pastor", "pastors"]}
                  />
                ),
                children: [
                  { path: "members", element: <LazyLoad><MembersPage /></LazyLoad> },
                  { path: "members/add", element: <LazyLoad><AddMembersPage /></LazyLoad> },
                  { path: "members/edit/:id", element: <LazyLoad><AddMembersPage /></LazyLoad> },
                ],
              },

              {
                element: <ProtectedRoute allowedRoles={["ADMIN", "admin"]} />,
                children: [
                  { path: "leaders", element: <LazyLoad><LeadersPage /></LazyLoad> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);