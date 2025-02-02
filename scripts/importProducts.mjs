import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-08-31",
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get(
      "https://template1-neon-nu.vercel.app/api/products"
    );
    const products = response.data;
    console.log(`Fetched ${products.length} products`);
    for (const product of products) {
      console.log(`Processing product: ${product.title}`);
      const imageUrls = Array.isArray(product.imageUrl)
        ? product.imageUrl
        : [product.imageUrl];

      const baseSlug = slugify(product.name, { lower: true, strict: true });
      const slug = `${baseSlug}-${uuidv4()}`.slice(0, 90);

      let imageRefs = [];

      for (const imageUrl of imageUrls) {
        if (imageUrl) {
          const imageRef = await uploadImageToSanity(imageUrl);
          imageRefs.push({
            asset: {
              _ref: imageRef,
            },
            _key: uuidv4(),
          });
        }
      }

      const sanityProduct = {
        _type: "product",
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercent: product.discountPercent,
        price: product.price,
        sizes: product.sizes,
        colors: product.colors,
        subcategory: product.category,
        images: imageRefs,
        stock: Math.round(Math.random()*30)+1,
        slug: { current: slug },
        reviews: [],
      };
      console.log("Uploading product to Sanity:", sanityProduct.name);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }
    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}
importData();
