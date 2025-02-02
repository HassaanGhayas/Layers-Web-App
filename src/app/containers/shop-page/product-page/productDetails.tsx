"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IProduct } from "../../home-page/newArrival";
import { useCart } from "@/app/context/cartContext";
import {
  AiOutlineStar,
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import ProductDetailsSkeleton from "./skeleton";
import { useWishlist } from "@/app/context/wishlistContext";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const avgRating = product.reviews.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length
    : 0;
  const fullStars = Math.max(0, Math.floor(avgRating));
  const hasHalfStar = avgRating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const cartItem = {
    id: product.id, // Use Sanity's generated ID or create your own
    name: product.name,
    price: product.discountedPrice,
    color: selectedColor,
    size: selectedSize, // Ensure you handle selected size
    image: selectedImage,
    quantity: selectedQuantity, // Default quantity
  };

  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          {/* Image Section */}
          <div>
            <div className="bg-gray-100 p-2">
              <Image
                src={selectedImage}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg object-contain aspect-square w-full max-w-80 md:max-w-full m-auto"
                quality={100}
                placeholder="blur"
                blurDataURL={selectedImage}
              />
            </div>
            {/* Thumbnail Slider */}
            <div className="flex space-x-2 mt-2">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  width={80}
                  height={80}
                  className={`cursor-pointer rounded-md border aspect-square object-cover p-1 ${
                    selectedImage === img ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <h1 className="md:text-xl text-lg font-bold">{product.name}</h1>
                <Badge
                  className={`pointer-events-none ml-auto ${
                    product.stock > 1
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.stock > 1 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <span>
                {product.subcategory.charAt(0).toUpperCase() +
                  product.subcategory.slice(1)}
              </span>

              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-500" size={20} />
                ))}
                {hasHalfStar && (
                  <AiFillStar
                    className="text-yellow-500 opacity-50"
                    size={20}
                  />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <AiOutlineStar key={i} className="text-gray-700" size={20} />
                ))}
                <span className="ml-2 text-gray-600">
                  {avgRating.toFixed(1)}
                </span>
              </div>

              <div className="space-x-2">
                <span className="text-lg font-bold">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-sm">{product.description}</div>

            <div className="space-y-2">
              <span className="font-bold">Color:</span>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <Button
                    key={index}
                    className={`w-8 h-8 rounded-md border ${color == selectedColor ? "border-black" : "border-gray-400"} hover:border-black transition-all opacity-95`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold">Size:</span>
              <div className="flex space-x-2">
                {product.sizes.map((size, index) => (
                  <Button
                    key={index}
                    size={"sm"}
                    className={`border border-black ${size == selectedSize ? "bg-black text-white" : "bg-white text-black"} hover:bg-black hover:text-white `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex md:flex-row flex-col md:items-center gap-x-2 gap-y-3 md:gap-y-0 justify-center md:justify-start">
              <div className="flex items-center border border-black rounded-md w-fit">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-transparent hover:bg-gray-100"
                  onClick={() =>
                    setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                  }
                >
                  <AiOutlineMinus />
                </Button>
                {/* FIX: Added `w-8 text-center` to keep width consistent */}
                <span className="px-3 py-2 text-sm w-8 text-center">
                  {selectedQuantity}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-transparent hover:bg-gray-100"
                  onClick={() =>
                    setSelectedQuantity(
                      selectedQuantity < product.stock && selectedQuantity <= 20
                        ? selectedQuantity + 1
                        : selectedQuantity
                    )
                  }
                >
                  <AiOutlinePlus />
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Button
                  size={"lg"}
                  onClick={() => addToCart(cartItem, selectedQuantity)}
                  className="flex items-center gap-2 w-full"
                >
                  Add to Cart
                  <AiOutlineShoppingCart />
                </Button>

                <Button
                  variant={"secondary"}
                  className={`border border-black bg-transparent hover:bg-gray-100 ${
                    isInWishlist(cartItem.id) ? "text-red-500" : "text-black"
                  }`}
                  onClick={() =>
                    isInWishlist(cartItem.id)
                      ? removeFromWishlist(cartItem.id)
                      : addToWishlist(cartItem)
                  }
                >
                  {isInWishlist(cartItem.id) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ProductDetails;
