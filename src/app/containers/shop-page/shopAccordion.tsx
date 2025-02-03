import React from "react";
import { SidebarProps } from "./sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const ShopAccordion: React.FC<SidebarProps> = ({
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
    <Accordion type="single" collapsible className="md:hidden block">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base">Filters</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Categories Accordion */}
            <AccordionItem value="categories">
              <AccordionTrigger>Dress Styles</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`w-full text-left px-2 py-1 rounded-lg transition-all duration-200 ease-in-out ${
                          selectedCategory === category.toLowerCase()
                            ? "bg-gray-200 text-black font-bold shadow-md"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          setSelectedCategory(category.toLowerCase())
                        }
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Subcategories Accordion */}
            <AccordionItem value="subcategories">
              <AccordionTrigger>Subcategories</AccordionTrigger>
              <AccordionContent>
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
                        onClick={() =>
                          setSelectedSubcategory(
                            subcategory.toLowerCase().replace("-", "")
                          )
                        }
                      >
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Colors Accordion */}
            <AccordionItem value="colors">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            {/* Price Range Accordion */}
            <AccordionItem value="price-range">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            {/* Clear Filters Button */}
            <div className="mt-4">
              <Button className="w-full" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ShopAccordion;
