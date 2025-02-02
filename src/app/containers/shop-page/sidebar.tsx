import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export interface SidebarProps {
  categories: string[];
  subcategories: string[];
  colors: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories = [],
  subcategories = [],
  colors = [],
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedColor,
  setSelectedColor,
  priceRange,
  setPriceRange,
}) => {
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedColor(null);
    setPriceRange([0, 500]);
  };

  return (
    <aside className="w-full p-4 border-[1px] bg-gray-100 text-black max-w-lg m-auto h-full rounded-xl">
      {/* Filters Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Dress Styles */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Dress Styles</h3>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`w-full text-left px-2 py-1 rounded-lg transition-all duration-200 ease-in-out ${
                  selectedCategory === category.toLowerCase()
                    ? "bg-gray-200 text-black font-bold shadow-md"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Subcategories</h3>
        <ul className="space-y-1">
          {subcategories.map((subcategory) => (
            <li key={subcategory}>
              <button
                className={`w-full text-left px-2 py-1 rounded-lg transition-all duration-200 ease-in-out ${
                  selectedSubcategory ===
                  subcategory.toLowerCase().replace("-", "")
                    ? "bg-gray-200 text-black font-bold shadow-md"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedSubcategory(
                    subcategory.toLowerCase().replace("-", "")
                  );
                  console.log(selectedSubcategory);
                }}
              >
                {subcategory}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full transition-all duration-200 ease-in-out border-[1px] border-black ${
                selectedColor === color.toLowerCase()
                  ? "ring-1 ring-black"
                  : "hover:ring-1 hover:ring-black"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Price Range</h3>
        <Slider
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Clear Filters Button */}
      <Button className="w-full" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </aside>
  );
};

export default Sidebar;
