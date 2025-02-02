import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
        *[_type == "product"] | order(createdAt desc){
            name,
            description,
            "images": images[].asset->url,
            price,
            discountPercent,
            subcategory,
            stock,
            sizes,
            colors,
            "slug": slug.current,
            reviews[],
            "discountedPrice": price - (price * discountPercent / 100),
            _id,
        }`;

    const products = await client.fetch(query, {}, { cache: "no-store" });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}