import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./card";
import { Button } from "./button";

const CategoryCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <Card className="w-full max-w-64 aspect-[3/4] bg-gray-100 flex-shrink-0">
      <CardContent className="w-full h-full flex relative">
        <h2 className="absolute text-5xl montser font-semibold text-gray-300 text-center w-full max-w-56 opacity-100 pt-5">
          {name.split(" ")[0]}
        </h2>
        <Image
          src={image}
          height={300}
          width={300}
          alt={`${name} category`}
          className="h-auto w-auto max-w-full max-h-full object-contain z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
          priority={false}
        />
        <Button
          className="absolute bottom-5 w-full max-w-[200px] z-10"
          variant="outline"
          aria-label={`View ${name} category`}
        >
          {name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
