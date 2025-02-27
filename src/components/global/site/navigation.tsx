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
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const pathname = usePathname();
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
      className={`fixed top-0 bg-[#C3DCAA] w-full py-2 transition-all lg:px-[200px] px-10 z-50 flex justify-between items-center duration-500 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center lg:gap-10 gap-5">
        <Link href="/">
          <Image src="/assets/logo.png" alt="Logo" width={80} height={80} />
        </Link>
        {/* Desktop Navigation */}
        <ul className="lg:flex hidden gap-5">
          {["/", "/about", "/products", "/blogs", "/contact-us"].map(
            (route, index) => (
              <li key={index}>
                <Link
                  className={`px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-[#251201] hover:text-white text-black transition-colors duration-300 text-sm ${
                    pathname === route
                      ? "bg-[#251201] text-white border-b-2 border-zinc-600"
                      : ""
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
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#C3DCAA] shadow-lg p-5">
            <ul className="flex flex-col gap-4">
              {["/", "/about", "/products", "/blogs", "/contact-us"].map(
                (route, index) => (
                  <li key={index}>
                    <Link
                      className={`flex items-center gap-2 py-2 text-black hover:text-white hover:bg-[#251201] px-4 rounded-lg transition-colors duration-300 ${
                        pathname === route ? "bg-[#251201] text-white" : ""
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
        <Button>Create an account</Button>
        <p className="mr-3 ml-5">|</p>
        <Button className="rounded-full" variant="default" size="icon">
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
