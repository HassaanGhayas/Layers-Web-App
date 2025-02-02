"use client";
import React, { useState } from "react";
import { IoLayers } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
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
        <Link href={"/"}>
          <div className="flex items-center montser text-2xl gap-1">
            <IoLayers />
            Layers
          </div>
        </Link>

        {/* Middle navigation links */}
        <ul className="md:flex gap-3 hidden">
          {navbarLinksMid.map((val, index) => {
            const isActive = path.startsWith(val.link);
            return (
              <Link href={val.link} key={index}>
                <li className={isActive ? "underline" : ""}>{val.name}</li>
              </Link>
            );
          })}
        </ul>

        {/* Desktop icons and authentication */}
        <div className="md:flex items-center gap-3 text-xl hidden">
          <Link href={"/wishlist"}>
            <FaRegHeart />
          </Link>
          <Link href={"/cart"}>
            <IoBagHandleOutline />
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile hamburger icon */}
        <div
          className="md:hidden"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          {menu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <ul className="h-screen p-5 w-full bg-white max-w-[300px] absolute right-0 flex flex-col gap-3 md:hidden">
          {hamburgerLink.map((val, index) => {
            const isActive = path.startsWith(val.link);
            return (
              <Link href={val.link} key={index}>
                <li
                  className={`${
                    isActive ? "underline" : ""
                  } text-xl flex justify-between items-center`}
                >
                  {val.name} <FaChevronRight className="text-sm" />
                </li>
              </Link>
            );
          })}
          <div className="mt-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full">Sign In</Button>
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
