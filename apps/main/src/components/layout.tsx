import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import { ChevronUpIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "cart/cart-store";
import dynamic from "next/dynamic";
import NextProgress from "next-progress";

export type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <Header />
      <main className="h-auto min-h-[calc(100%-160px)] py-8">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-10 p-3 text-white bg-black rounded-full shadow-lg bottom-6 right-6 hover:bg-gray-800"
    >
      <ChevronUpIcon className="w-6 h-6" />
    </button>
  );
};

const HeaderCart = () => {
  const { getCartItemsCount } = useCart();

  return (
    <span className="relative">
      <ShoppingCartIcon className="w-8 h-8" />{" "}
      <span className="absolute px-2 py-1 text-xs text-white bg-black rounded-full top-5 -right-2">
        {getCartItemsCount()}
      </span>
    </span>
  );
};

const LazyHeaderCart = dynamic(() => Promise.resolve(HeaderCart), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="p-8">
      <div className="container flex justify-between mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>
        <div>
          <Link href="/cart">
            <LazyHeaderCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-16 text-white bg-black">
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
};
