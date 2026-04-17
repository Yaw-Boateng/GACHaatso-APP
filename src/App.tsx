import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Providers & Utils
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ScrollToTop } from "./components/utils/ScrollToTop";

// Components
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import RegisterPage from "./pages/auth/RegisterPage";
import AddMemberPage from "./pages/dashboard/subpages/AddMemberPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute"; // Import here

// --- LAZY LOADED PAGES ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SermonsPage = lazy(() => import("./pages/SermonsPage"));
const GivingPage = lazy(() => import("./pages/GivingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Dashboard Sub-pages
const StatsPage = lazy(() => import("./pages/dashboard/subpages/StatsPage"));
const MembersPage = lazy(() => import("./pages/dashboard/subpages/MembersPage"));
const FinancesPage = lazy(() => import("./pages/dashboard/subpages/FinancesPage"));
const AttendancePage = lazy(() => import("./pages/dashboard/subpages/AttendancePage"));
const ResourcesPage = lazy(() => import("./pages/dashboard/subpages/ResourcesPage"));
const EventsPage = lazy(() => import("./pages/dashboard/subpages/EventsPage"));
const GroupPage = lazy(() => import("./pages/dashboard/subpages/GroupPage"));
const MessagesPage = lazy(() => import("./pages/dashboard/subpages/MessagesPage"));
const NotificationsPage = lazy(() => import("./pages/dashboard/subpages/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/subpages/SettingsPage"));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-theme-bg">
              <LoadingSpinner size="large" />
            </div>
          }
        >
          <Routes>
            {/* GROUP 1: PUBLIC WEBSITE */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="sermons" element={<SermonsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="giving" element={<GivingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* GROUP 2: DASHBOARD SYSTEM (Protected) */}
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="stats" element={<StatsPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="members/add" element={<AddMemberPage />} />
              <Route path="finances" element={<FinancesPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="group" element={<GroupPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;