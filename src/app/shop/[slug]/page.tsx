import React from "react";
import { client } from "@/sanity/lib/client";
import { IProduct } from "@/app/containers/home-page/newArrival";
import BreadCrumb from "@/app/containers/main-components/breadcrumb";
import ProductDetails from "@/app/containers/shop-page/product-page/productDetails";
import ProductTabs from "@/app/containers/shop-page/product-page/product-tabs";
import SimilarProducts from "@/app/containers/shop-page/product-page/similar-products";

const fetchProduct = async (slug: string) => {
  const query = `
    *[_type == "product" && slug.current == $slug] {
      name,
      description,
      "images": images[].asset->url,
      price,
      discountPercent,
      subcategory,
      stock,
      sizes,
      colors,
      reviews,
      "slug": slug.current,
      "discountedPrice": price - (price * discountPercent / 100),
      _id,
    }`;

  try {
    const products: IProduct[] = await client.fetch(
      query,
      { slug },
      { cache: "no-cache" }
    );
    return products[0] || null;
  } catch {
    return null;
  }
};

const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return (
      <div className="py-20 text-center text-gray-600">Product not found!</div>
    );
  }

  return (
    <div className="w-full min-h-screen max-w-screen-xl m-auto py-20 px-4 manrope space-y-8">
      <BreadCrumb />
      <ProductDetails product={product} />
      <ProductTabs reviews={product.reviews} />
      <SimilarProducts
        subcategory={product.subcategory}
        currentSlug={product.slug}
      />
    </div>
  );
};

export default Product;
