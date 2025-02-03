"use client";
import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useCart } from "../context/cartContext";
import BreadCrumb from "../containers/main-components/breadcrumb";
import Image from "next/image";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-screen-xl m-auto min-h-screen py-20 px-4 space-y-8 manrope">
      <BreadCrumb />
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <Card key={item.id + item.image} className=" shadow-md">
                <CardContent className="flex sm:flex-row flex-col items-center justify-between p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      height={16}
                      width={16}
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size={"sm"}
                      onClick={() => addToCart(item, 1)}
                    >
                      <AiOutlineShoppingCart />
                    </Button>
                    <Button
                      variant="destructive"
                      size={"sm"}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                </CardContent>
                <Separator />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
