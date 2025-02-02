import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create a Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

// Function to delete documents by type
async function deleteDocuments(documentType) {
  try {
    console.log(`Deleting all documents of type: ${documentType}`);
    const result = await client.delete({
      query: `*[_type == "${documentType}"]`,
    });
    console.log(`Deleted documents:`, result);
  } catch (error) {
    console.error('Error deleting documents:', error.message);
  }
}

// Call the function with the document type you want to delete
deleteDocuments('product'); // Replace 'product' with your document type