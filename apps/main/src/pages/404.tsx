import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="container flex flex-col items-center gap-4 mx-auto text-center">
      <span className="text-6xl font-bold">404</span>
      <p className="text-xl">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Back to home
        </Link>
        <Link href="/products" className="px-4 py-2 underline">
          Browse products
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
