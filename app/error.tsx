'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can log the error to an error reporting service here
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-[1500px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8">We encountered an unexpected error while loading this page.</p>

      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-airbnb text-white rounded-xl hover:bg-rose-600 transition"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-900 rounded-xl hover:bg-gray-100 transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
