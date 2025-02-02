import React from "react";
import { client } from "@/sanity/lib/client";
import { IProduct } from "@/app/containers/home-page/newArrival";
import ShopCard from "@/components/ui/shopCard";

const SimilarProducts = async ({
  subcategory,
  currentSlug,
}: {
  subcategory: string;
  currentSlug: string;
}) => {
  const query = `
    *[_type == "product" && subcategory == $subcategory && slug.current != $slug][0...4] | order(_createdAt desc) {
      name,
    description,
    "images": images[].asset->url,
    price,
    _id,
    discountPercent,
    subcategory,
    stock,
    sizes,
    colors,
    "slug": slug.current,
    reviews[],
    "discountedPrice": price - (price * discountPercent / 100)
    }`;

  const products: IProduct[] = await client.fetch(
    query,
    { subcategory, slug: currentSlug },
    { cache: "no-cache" }
  );

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">No similar products found!</p>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl text-center">You Might Also Like</h2>
      <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
          <ShopCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
