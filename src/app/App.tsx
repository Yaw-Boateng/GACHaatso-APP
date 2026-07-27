// src/App.tsx
import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ThemeProvider } from '../contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-theme-bg">
            <LoadingSpinner size="large" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;