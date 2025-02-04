import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/app/containers/home-page/newArrival";
import { Badge } from "./badge";

const ShopCard = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/shop/${product.slug}`}>
      <Card className="w-64 p-4 flex flex-col h-full border border-gray-300 hover:shadow-xl transition-all">
        {/* Product Image */}
        <CardHeader className="p-0 mb-4">
          <Image
            src={product.images?.[0] || "/placeholder-image.jpg"}
            alt={product.name || "Product"}
            className="w-full object-cover mix-blend-multiply bg-gray-100 aspect-square"
            height={300}
            width={300}
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-grow p-0">
          <CardTitle className="text-base font-semibold">
            {product.name
              ? product.name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
              : "Unnamed Product"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 pt-1">
            {product.subcategory
              ? product.subcategory.charAt(0).toUpperCase() +
              product.subcategory.slice(1)
              : "Unknown Category"}
          </CardDescription>
        </CardContent>

        {/* Price and Discount */}
        <div className="flex items-center mt-auto gap-2 pt-4">
          <span className="text-lg font-bold text-black">
            $
            {product.discountPercent <= 0
              ? product.price
              : (
                product.price -
                (product.price * product.discountPercent) / 100
              ).toFixed()}
          </span>
          {product.discountPercent > 0 && (
            <Badge
              variant="outline"
              className="border-red-500 text-red-700 bg-red-200"
            >
              -%{product.discountPercent}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ShopCard;
