import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'
import type { Image } from "sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


const builder = imageUrlBuilder(client);

// Function to generate image URLs
export const urlFor = (source: Image) => builder.image(source);