import React from "react";

export default function NotFoundPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-7xl font-extrabold">404</h1>
          <p className="text-2xl font-medium mt-6">Oops! Page not found</p>
          <p className="mt-4 mb-8 text-base">The page you're looking for doesn't exist or has been moved.</p>
          <a
            href="/"
            className="inline-block bg-black text-white font-semibold rounded-full px-6 py-2 hover:bg-gray-700 transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
