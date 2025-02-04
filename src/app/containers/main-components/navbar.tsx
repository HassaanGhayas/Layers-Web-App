"use client";
import React, { useState } from "react";
import { IoLayers, IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton 
} from "@clerk/clerk-react";

const Navbar = () => {
  const navbarLinksMid = [
    { name: "Shop", link: "/shop" },
    { name: "Our Story", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const hamburgerLink = [
    { name: "Shop", link: "/shop" },
    { name: "Our Story", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Wishlist", link: "/wishlist" },
    { name: "Cart", link: "/cart" },
  ];

  const [menu, setMenu] = useState(false);
  const path = usePathname();

  return (
    <nav className="manrope fixed w-full bg-white z-50 shadow-md">
      <div className="w-full max-w-screen-lg m-auto flex justify-between items-center p-4">
        <Link href="/" aria-label="Go to homepage">
          <div className="flex items-center montser text-2xl gap-1">
            <IoLayers aria-hidden="true" />
            Layers
          </div>
        </Link>

        {/* Middle navigation links */}
        <ul className="md:flex gap-3 hidden">
          {navbarLinksMid.map((val, index) => {
            const isActive = path.startsWith(val.link);
            return (
              <li key={index}>
                <Link href={val.link} className={isActive ? "underline" : ""} aria-label={`Go to ${val.name}`}>
                  {val.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop icons and authentication */}
        <div className="md:flex items-center gap-3 text-xl hidden">
          <Link href="/wishlist" aria-label="Go to wishlist">
            <FaRegHeart aria-hidden="true" />
          </Link>
          <Link href="/cart" aria-label="Go to cart">
            <IoBagHandleOutline aria-hidden="true" />
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <Button aria-label="Sign in to your account">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile hamburger icon */}
        <button 
          className="md:hidden" 
          onClick={() => setMenu(!menu)} 
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <ul className="h-screen p-5 w-full bg-white max-w-[300px] absolute right-0 flex flex-col gap-3 md:hidden">
          {hamburgerLink.map((val, index) => {
            const isActive = path.startsWith(val.link);
            return (
              <li key={index}>
                <Link href={val.link} className={`${isActive ? "underline" : ""} text-xl flex justify-between items-center`} aria-label={`Go to ${val.name}`}>
                  {val.name} <FaChevronRight className="text-sm" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
          <div className="mt-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full" aria-label="Sign in to your account">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
