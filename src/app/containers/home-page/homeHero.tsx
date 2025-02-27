import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section>
      <div className="max-w-screen-xl m-auto pt-20 manrope bg-gray-200">
        <div className="grid md:grid-cols-2 max-w-screen-lg m-auto gap-5 py-10 px-4 min-h-[500px]">
          <div className="flex flex-col md:items-start items-center md:text-left text-center justify-center gap-2">
            <span className="text-lg">Classic Exclusive</span>
            <h1 className="montser text-5xl font-bold">Men&apos;s Collection</h1>
            <span className="uppercase">Upto 40% off</span>
            <Link href="/shop">
              <Button className="w-fit" size="lg" aria-label="Shop Men's Collection">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-white rounded-xl p-2 h-fit rotate-6 hover:scale-105 transition-all">
              <Image
                src="/images/heroImages/chairguy.png"
                alt="Model sitting on a chair showcasing Men's Collection"
                height={500}
                width={500}
                className="object-contain aspect-[3/4]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
            <div className="border-white border-8 rounded-xl p-2 h-fit rotate-[-6deg] hover:scale-105 transition-all">
              <Image
                src="/images/heroImages/box.png"
                alt="Box of Men's Fashion Items"
                height={500}
                width={500}
                className="object-contain aspect-[3/4]"
                loading="eager" // Avoid using priority for non-essential images
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
