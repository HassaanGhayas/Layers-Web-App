"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CategoryCard from "@/components/ui/categoryCard";

const HomeCategory = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  const categories = [
    { image: "/images/categories/casual-wear.png", name: "Casual Wear" },
    { image: "/images/categories/western-wear.png", name: "Western Wear" },
    { image: "/images/categories/sports-wear.png", name: "Sports Wear" },
    { image: "/images/categories/festive-wear.png", name: "Festive Wear" },
    { image: "/images/categories/kids-wear.png", name: "Kids Wear" },
    { image: "/images/categories/formal-wear.png", name: "Formal Wear" }
  ];

  return (
    <section>
      <div className="max-w-screen-xl w-full m-auto py-20 manrope px-4 space-y-8">
        <div className="md:text-3xl text-xl flex items-center">
          Shop By Categories
          <div className="flex ml-auto text-sm gap-2">
            <Button variant="outline" size="sm" onClick={scrollLeft} aria-label="Scroll left">
              <FaArrowLeft />
            </Button>
            <Button variant="outline" size="sm" onClick={scrollRight} aria-label="Scroll right">
              <FaArrowRight />
            </Button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex gap-5 overflow-x-scroll scrollbar-hide rounded-xl">
          {categories.map((val, index) => (
            <CategoryCard key={index} image={val.image} name={val.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategory;
