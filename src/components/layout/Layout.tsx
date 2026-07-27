import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';import Footer from './Footer';
import { ScrollToTop } from '../utils/ScrollToTop';
import Header from './Header';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-bg text-theme-text">
      <ScrollToTop />
      
      <Header />

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="py-20 flex items-center justify-center">
              <LoadingSpinner size={32} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;