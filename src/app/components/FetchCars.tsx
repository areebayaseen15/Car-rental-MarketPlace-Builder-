import { client } from "@/sanity/lib/client";

export interface ProductData {
  tags: string[];
  name?: string;
  type: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
      current: string;
    };
  };
  slug: {
    current: string;
  };
}

export const fetchCars = async (): Promise<ProductData[]> => {
  try {
    const query = `*[_type == "car"]{name, tags, type, slug, image}`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};
