"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "../containers/main-components/breadcrumb";
import Sidebar from "../containers/shop-page/sidebar";
import ShopCard from "@/components/ui/shopCard";
import { IProduct } from "../containers/home-page/newArrival";
import { Button } from "@/components/ui/button";
import { FaSort } from "react-icons/fa";
import { SkeletonCard } from "../containers/main-components/skeleton-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ShopAccordion from "../containers/shop-page/shopAccordion";

function Shop() {
  const [products, setProducts] = useState<IProduct[]>([]); // All products
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // Filtered products
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [position, setPosition] = useState<string>("lowtohigh");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch the Products");

        const fetchedProducts: IProduct[] = await response.json();
        setProducts(fetchedProducts); // Save all products
        setFilteredProducts(fetchedProducts); // Initial load: no filters applied
      } catch (error) {
        setError("Product fetching request failed. Please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to apply filters and sorting
  useEffect(() => {
    if (!products) return;

    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.subcategory.toLowerCase() ===
          selectedSubcategory.toLowerCase()
      );
    }

    // Filter by color
    if (selectedColor) {
      updatedProducts = updatedProducts.filter((product) =>
        product.colors.includes(selectedColor)
      );
    }

    // Filter by price range
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.discountedPrice >= priceRange[0] &&
        product.discountedPrice <= priceRange[1]
    );

    // Apply sorting
    if (position === "lowtohigh") {
      updatedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (position === "hightolow") {
      updatedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (position === "discounted") {
      updatedProducts.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    // Update the filtered products state
    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page
  }, [
    products,
    selectedCategory,
    selectedSubcategory,
    selectedColor,
    priceRange,
    position,
  ]);

  // Pagination setup
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSort = (value: string) => {

    setPosition(value); // Sorting triggers `useEffect` to apply sorting
  };

  return (
    <div className="w-full min-h-screen max-w-screen-xl m-auto py-20 px-4 manrope">
      <BreadCrumb additional={selectedSubcategory? selectedSubcategory : "All Products"} />
      <div className="pt-10 grid md:grid-cols-4 grid-cols-1 gap-5">
        <div className="hidden md:block">
          <Sidebar
            categories={[
              "Formal",
              "Casual",
              "Sports",
              "Festive",
              "Western",
              "Kids",
            ]}
            subcategories={["Shirt", "T-Shirt", "Hoodie", "Jeans", "Short"]}
            colors={["Red", "Blue", "Green", "Black", "White", "Yellow"]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        <div className="md:col-span-3 space-y-8">
          <div>
            <div className="flex justify-between items-center">
              <div className="md:text-xl text-sm">
                {selectedSubcategory
                  ? selectedSubcategory.lastIndexOf("s") ===
                    selectedSubcategory.length - 1
                    ? "Showing results for " +
                      selectedSubcategory.split("")[0].toUpperCase() +
                      selectedSubcategory.slice(1)
                    : "Showing Results for " +
                      selectedSubcategory.split("")[0].toUpperCase() +
                      selectedSubcategory.slice(1) +
                      "s"
                  : "All Products"}
              </div>
              <DropdownMenuRadioGroupDemo
                handleSort={handleSort}
                position={position}
                setPosition={setPosition}
              />
            </div>
            <ShopAccordion
              categories={[
                "Formal",
                "Casual",
                "Sports",
                "Festive",
                "Western",
                "Kids",
              ]}
              subcategories={["Shirt", "T-Shirt", "Hoodie", "Jeans", "Short"]}
              colors={["Red", "Blue", "Green", "Black", "White", "Yellow"]}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {loading ? (
              <div className="w-full max-w-screen-xl m-auto flex flex-wrap gap-5 justify-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-red-500 manrope p-4">{error}</p>
            ) : filteredProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <ShopCard key={index} product={product} />
              ))
            ) : (
              <p className="text-center text-red-500 manrope p-4">
                No products match the selected filters.
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  isActive={currentPage === 1}
                  className="cursor-pointer"
                />
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  isActive={currentPage === totalPages}
                  className="cursor-pointer"
                />
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;

export function DropdownMenuRadioGroupDemo({
  position,
  setPosition,
  handleSort,
}: {
  position: string;
  setPosition: (position: string) => void;
  handleSort: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          Sort by
          <FaSort />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => {
            setPosition(value);
            handleSort(value);
          }}
        >
          <DropdownMenuLabel>Price</DropdownMenuLabel>
          <DropdownMenuRadioItem value="lowtohigh">
            Lowest to Highest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="hightolow">
            Highest to Lowest
          </DropdownMenuRadioItem>
          <DropdownMenuLabel>Other</DropdownMenuLabel>
          <DropdownMenuRadioItem value="discounted">
            Discounted
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
