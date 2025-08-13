import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SermonsPage = lazy(() => import('./pages/SermonsPage'));
const SermonDetailPage = lazy(() => import('./pages/SermonDetailPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const GivingPage = lazy(() => import('./pages/GivingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/auth/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="sermons" element={<SermonsPage />} />
            <Route path="sermons/:id" element={<SermonDetailPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="giving" element={<GivingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;