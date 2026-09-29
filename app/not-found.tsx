import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-[1500px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-lg">
        We can't seem to find the page you're looking for. It might have been removed or the link is incorrect.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-airbnb text-white rounded-xl hover:bg-rose-600 transition font-bold"
      >
        Return Home
      </Link>
    </main>
  );
}
