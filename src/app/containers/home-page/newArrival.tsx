import { FaFire } from "react-icons/fa";
import { client } from "@/sanity/lib/client"; // Direct database or CMS client
import ShopCard from "@/components/ui/shopCard";
import { SkeletonCard } from "../main-components/skeleton-card";
import { Suspense } from "react";

export interface IProduct {
  name: string;
  description: string;
  id: string;
  images: string[];
  category: string;
  subcategory: string;
  price: number;
  discountPercent: number;
  slug: string;
  discountedPrice: number;
  colors: string[];
  sizes: string[];
  stock: number;
  reviews: IReview[];
}

export interface IReview {
  user: string;
  rating: number;
  comment?: string;
}

// Directly fetch from the database or CMS
const fetchProducts = async (): Promise<IProduct[]> => {
  const query = `*[_type == "product"] | order(createdAt desc)[0...8] {
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
  const products = await client.fetch(query);
  return products;
};

const ProductList = async () => {
  const products = await fetchProducts();

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found!</p>;
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {products.map((product) => (
        <ShopCard key={product.slug} product={product} />
      ))}
    </div>
  );
};

const NewArrival = () => {
  return (
    <section>
      <div className="w-full max-w-screen-xl m-auto py-10 px-4 manrope space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl flex items-center justify-center gap-1">
            <FaFire /> Hot & New
          </h1>
          <p className="text-center w-full max-w-sm m-auto">
            Fresh looks for every season
          </p>
        </div>
        <Suspense
          fallback={
            <div className="w-full max-w-screen-xl m-auto flex flex-wrap gap-5 justify-center">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </section>
  );
};

export default NewArrival;
