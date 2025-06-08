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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
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

  return (
    <nav
      className={`fixed top-0 bg-[#0F2A1D] w-full py-2 transition-all lg:px-[200px] px-10 z-50 flex justify-between items-center duration-500 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center lg:gap-10 gap-5">
        <div className="relative lg:size-16 size-12">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="w-full h-full"
            />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <ul className="lg:flex hidden gap-5">
          {["/", "/about-us", "/products", "/blogs", "/contact-us"].map(
            (route, index) => (
              <li key={index}>
                <Link
                  className={`px-4 flex items-center gap-2 hover:bg-[#C3DCAA] py-2 rounded-lg hover:text-black transition-colors duration-300 text-sm ${
                    pathname === route
                      ? "text-black bg-[#C3DCAA]"
                      : "text-white"
                  }`}
                  href={route}
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
        </ul>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="size-6 text-white" />
            ) : (
              <Menu className="size-6 text-white" />
            )}
          </button>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0F2A1D] shadow-lg p-5">
            <ul className="flex flex-col gap-4">
              {["/", "/about-us", "/products", "/blogs", "/contact-us"].map(
                (route, index) => (
                  <li key={index}>
                    <Link
                      className={`flex items-center gap-2 text-black hover:bg-[#C3DCAA] py-2 rounded-lg hover:text-black px-4 transition-colors duration-300 ${
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
            </ul>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center">
        {user ? (
          <UserButton />
        ) : (
          <Button
            className="bg-[#C3DCAA] hover:bg-[#C3DCAA]/80 text-black"
            onClick={() => router.push("/sign-up")}
          >
            Create an account
          </Button>
        )}
        <p className="mr-3 ml-5 text-white">|</p>
        <Button
          onClick={() => router.push("/cart")}
          className="rounded-full bg-[#C3DCAA] hover:bg-[#C3DCAA]/80 text-black relative"
          variant="default"
          size="icon"
        >
          <p className="absolute -top-1 text-[8px] -right-1 bg-red-600 text-white rounded-full size-4 flex items-center justify-center">
            {items.length}
          </p>
          <ShoppingCart className="size-2" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
