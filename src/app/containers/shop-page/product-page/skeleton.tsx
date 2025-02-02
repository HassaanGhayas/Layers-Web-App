import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ProductDetailsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
      {/* Image Section */}
      <div>
        <Skeleton className="w-full max-w-80 md:max-w-full h-96 rounded-lg" />
        <div className="flex space-x-2 mt-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-20 h-20 rounded-md" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-20 h-6 ml-auto" />
          </div>
          <Skeleton className="w-32 h-4" />

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-full" />
            ))}
            <Skeleton className="w-10 h-5" />
          </div>

          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-16 h-4" />
        </div>

        <Skeleton className="h-16 w-full" />

        <div className="space-y-2">
          <Skeleton className="w-20 h-6" />
          <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="w-8 h-8 rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="w-20 h-6" />
          <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="w-12 h-8 rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:items-center gap-x-2 gap-y-3 md:gap-y-0 justify-center md:justify-start">
          <div className="flex items-center border border-black rounded-md w-fit">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
          <div className="flex items-center gap-2 w-full">
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
