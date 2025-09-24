// FILE: src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 text-center px-4">
      <ExclamationTriangleIcon className="w-16 h-16 text-mountain-tan mb-4" />
      <h1 className="text-4xl md:text-6xl font-bold text-ocean-blue mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
       Oops, seems like you got a little lost, lets help you get home.
      </p>
      <Link
        to="/"
        className="bg-ocean-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;