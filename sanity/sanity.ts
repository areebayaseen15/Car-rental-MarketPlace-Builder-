import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,                
  apiVersion:  "2023-01-01",
  token: process.env.SANITY_API_TOKEN,
});

export default client;
