"use client";
import React from "react";
import { useCart } from "../context/cartContext";
import BreadCrumb from "../containers/main-components/breadcrumb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-screen-xl m-auto min-h-screen py-20 px-4 space-y-8 manrope">
      <BreadCrumb />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded-lg p-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4"
                  >
                    {/* Product Image and Name */}
                    <div className="flex items-center mb-4 sm:mb-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: {item.color} | Size: {item.size}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Counter and Remove Button */}
                    <div className="flex items-center">
                      {/* Quantity Counter */}
                      <div className="flex items-center border border-black rounded-md w-fit">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-transparent hover:bg-gray-100"
                          onClick={() => {
                            if (item.quantity > 1) {
                              addToCart(item, -1);
                            } else {
                              removeFromCart(item.id, item.size, item.color);
                            }
                          }}
                        >
                          <AiOutlineMinus />
                        </Button>
                        {/* FIX: Added `w-8 text-center` to keep width consistent */}
                        <span className="px-3 py-2 text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-transparent hover:bg-gray-100"
                          onClick={() =>
                            addToCart(item, 1)
                          }
                        >
                          <AiOutlinePlus />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        className="ml-4"
                        onClick={() =>
                          removeFromCart(item.id, item.size, item.color)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary with ShadCN Card */}
            <Card className="h-fit max-lg:-order-1">
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    ${(totalPrice + 5).toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
