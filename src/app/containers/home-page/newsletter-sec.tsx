import React from "react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <div className="bg-gradient-to-tl from-black via-gray-900 to-black py-20 px-6 relative manrope">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-white text-4xl font-extrabold montser">
          Subscribe to Our Newsletter
        </h2>
        <div className="my-6">
          <p className="text-base text-gray-200">
            Subscribe to our newsletter and stay up to date with the latest
            news, updates, and exclusive offers. Get valuable insights. Join our
            community today!
          </p>
        </div>

        <div className="max-w-2xl left-0 right-0 mx-auto w-full flex md:flex-row flex-col gap-2 items-center shadow-lg rounded-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg bg-gray-100 py-3.5 px-4 text-gray-800 text-base focus:outline-none"
          />
          <Button className="text-base font-semibold tracking-wide py-3.5 px-6 focus:outline-none h-full ">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
