"use client";

import {
  Cake,
  FileText,
  Home,
  Images,
  PhoneCall,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import useCart from "@/hooks/use-cart";

const Navigation = () => {
  const { items } = useCart();
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current && scrollTop > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 bg-[#0F2A1D] w-full py-2 transition-all px-4 sm:px-6 md:px-10 lg:px-[200px] z-50 flex justify-between items-center duration-500 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ paddingBottom: isMenuOpen ? "200px" : undefined }}
    >
      <div className="flex items-center gap-4 md:gap-5 lg:gap-10">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-4 xl:gap-5">
          {["/", "/about-us", "/products", "/blogs", "/contact-us"].map(
            (route, index) => (
              <li key={index}>
                <Link
                  className={`px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 hover:bg-[#C3DCAA] rounded-lg hover:text-black transition-colors duration-300 text-xs sm:text-sm ${
                    pathname === route
                      ? "text-black bg-[#C3DCAA]"
                      : "text-white"
                  }`}
                  href={route}
                >
                  {index === 0 && <Home className="size-3 md:size-4" />}
                  {index === 1 && <FileText className="size-3 md:size-4" />}
                  {index === 2 && <Cake className="size-3 md:size-4" />}
                  {index === 3 && <Images className="size-3 md:size-4" />}
                  {index === 4 && <PhoneCall className="size-3 md:size-4" />}
                  <span>
                    {
                      ["Home", "About", "Products", "Blogs", "Contact Us"][
                        index
                      ]
                    }
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-5 sm:size-6 text-white" />
            ) : (
              <Menu className="size-5 sm:size-6 text-white" />
            )}
          </button>
        </div>

        {/* Buttons - Always visible */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/" showName />
            </div>
          ) : (
            <Button
              className="bg-[#C3DCAA] hover:bg-[#C3DCAA]/80 text-black text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4"
              onClick={() => router.push("/sign-up")}
            >
              Create account
            </Button>
          )}
          <span className="text-white hidden sm:block">|</span>
          <Button
            onClick={() => router.push("/cart")}
            className="rounded-full bg-[#C3DCAA] hover:bg-[#C3DCAA]/80 text-black relative size-7 sm:size-9"
            variant="default"
            size="icon"
          >
            <p className="absolute -top-1 text-[8px] -right-1 bg-red-600 text-white rounded-full size-4 flex items-center justify-center">
              {items.length}
            </p>
            <ShoppingCart className="size-3 sm:size-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-full left-0 w-full bg-[#0F2A1D] shadow-lg p-4 sm:p-5 z-40">
          <ul className="flex flex-col gap-3">
            {["/", "/about-us", "/products", "/blogs", "/contact-us"].map(
              (route, index) => (
                <li key={index}>
                  <Link
                    className={`flex items-center gap-3 text-sm sm:text-base hover:bg-[#C3DCAA] py-2 px-3 rounded-lg hover:text-black transition-colors duration-300 ${
                      pathname === route
                        ? "text-black bg-[#C3DCAA]"
                        : "text-white"
                    }`}
                    href={route}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {index === 0 && <Home className="size-4" />}
                    {index === 1 && <FileText className="size-4" />}
                    {index === 2 && <Cake className="size-4" />}
                    {index === 3 && <Images className="size-4" />}
                    {index === 4 && <PhoneCall className="size-4" />}
                    <span>
                      {
                        ["Home", "About", "Products", "Blogs", "Contact Us"][
                          index
                        ]
                      }
                    </span>
                  </Link>
                </li>
              )
            )}
            {/* Mobile User Button */}
            <li className="mt-3">
              {user ? (
                <div className="flex items-center gap-3 text-white py-2 px-3">
                  <UserButton showName afterSignOutUrl="/" />
                  <span>Account</span>
                </div>
              ) : (
                <Button
                  className="w-full bg-[#C3DCAA] hover:bg-[#C3DCAA]/80 text-black mt-2"
                  onClick={() => {
                    router.push("/sign-up");
                    setIsMenuOpen(false);
                  }}
                >
                  Create an account
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
