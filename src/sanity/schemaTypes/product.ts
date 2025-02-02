import { defineField, defineType, Rule } from "sanity";
import { createClient } from "next-sanity";
import { v4 as uuidv4 } from "uuid";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-08-31",
  token: process.env.SANITY_API_TOKEN,
});

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Product Description",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Product Images",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discountPercent",
      title: "Discount Percent",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Casual Wear", value: "casual-wear" },
          { title: "Western Wear", value: "western-wear" },
          { title: "Sports Wear", value: "sports-wear" },
          { title: "Festive Wear", value: "festive-wear" },
          { title: "Kids Wear", value: "kids-wear" },
          { title: "Formal Wear", value: "formal-wear" },
        ],
      },
    }),
    defineField({
      name: "subcategory",
      type: "string",
      title: "Subcategory",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Product Stock",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) => {
          const slugSuffix = uuidv4();
          const baseSlug = input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "");
          return `${baseSlug}-${slugSuffix}`.slice(0, 96);
        },
      },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) {
            return "Slug is required and must be defined.";
          }

          // Get current document ID (if exists)
          const { document } = context;
          const id = document?._id?.replace(/^drafts\./, ""); // Remove draft prefix

          // Query for existing slugs excluding current document
          const existing = await client.fetch(
            `*[_type == "product" && slug.current == $slug && _id != $id]`,
            { slug: slug.current, id: id || "" }
          );

          return existing.length === 0 || "Slug must be unique.";
        }),
    }),

    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        defineField({
          name: "review",
          title: "Review",
          type: "object",
          fields: [
            defineField({
              name: "userName",
              title: "User Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "comment",
              title: "Comment",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .max(5)
                  .error("Rating must be between 1 and 5."),
            }),
            defineField({
              name: "date",
              title: "Review Date",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
