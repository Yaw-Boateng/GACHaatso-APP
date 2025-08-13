import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-serif font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
          Page Not Found
        </h2>
        <p className="text-lg text-neutral-700 mb-8 max-w-xl mx-auto">
          The page you're looking for doesn't seem to exist. It might have been moved, deleted, or never existed in the first place.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;