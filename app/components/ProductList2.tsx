"use client";

import { useEffect, useState } from "react";
import Cards from "./Cards";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface Car {
  oldPrice?: string;
  newPrice?: string;
  model?: string;
  pricePerDay?: string;
  name?: string;
  seatingCapacity: string;
  fuelCapacity?: string;
  transmission?: string;
  title?: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
      current: "string";
    };
  };
  type: string;
  quantity?: number;
  slug: {
    current: string;
  };
  description?: string;
  brand: string;
  _type?: "product";
  _id?: string;
  availability: {
    locations: string[];
    availableDates: string[];
    availableTimes: string[];
  } | null;
}

interface ProductListingProps {
  pickup?: string;
  dropoff?: string;
}

const getAllCars = async (): Promise<Car[]> => {
  const fetchData = await client.fetch(
    `*[_type == "car"]{
      _id,
      image,
      pricePerDay,
      name,
      seatingCapacity,
      fuelCapacity,
      type,
      slug,
      location,
      brand,
      availability {
        locations,
        availableDates,
        availableTimes
      }
    }`
  );
  return fetchData;
};

const ProductListing = ({ pickup = "", dropoff = "" }: ProductListingProps) => {
  const [data, setData] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [PopularCars, setPopularCars] = useState<Car[]>([]);
  const [RecommendedCars, setRecommendedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllCars();
        setData(fetchedData);
        setFilteredCars(fetchedData);
        setPopularCars(fetchedData.slice(0, 4));
        setRecommendedCars(fetchedData.slice(4, 12));
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering cars based on pickup or dropoff location
  useEffect(() => {
    if (pickup || dropoff) {
      const filtered = data.filter(
        (car) =>
          car.availability?.locations?.some(
            (location) =>
              location.toLowerCase().includes(pickup.toLowerCase()) || location.toLowerCase().includes(dropoff.toLowerCase())
          )
      );
      setFilteredCars(filtered);
      setPopularCars(filtered.slice(0, 4));
      setRecommendedCars(filtered.slice(4, 12));
    } else {
      setFilteredCars(data);
      setPopularCars(data.slice(0, 4));
      setRecommendedCars(data.slice(4, 12));
    }
  }, [pickup, dropoff, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const loadMoreCars = () => {
    const nextVisibleCars = filteredCars.slice(0, RecommendedCars.length + 4);
    setRecommendedCars(nextVisibleCars);
  };

  return (
    <div>
      {/* Popular Cars */}
      <div className="mt-10 mx-4 sm:mx-8 lg:mx-12 max-w-[1312px] text-[#90A3BF]">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg lg:text-2xl">Popular Car</h3>
          <Link href="/all-cars">
            <p className="font-medium text-lg lg:text-xl hover:text-blue-500 cursor-pointer">View All</p>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PopularCars.length > 0 ? (
            PopularCars.map((item, i) => <Cards key={i} item={item} />)
          ) : (
            <p className="text-gray-500">No popular cars available for this location.</p>
          )}
        </div>
      </div>

      {/* Recommended Cars */}
      <div className="mt-10 mx-4 sm:mx-8 lg:mx-12 max-w-[1312px] text-[#90A3BF]">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg lg:text-2xl">Recommendation Car</h3>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {RecommendedCars.length > 0 ? (
            RecommendedCars.map((item, i) => <Cards key={i} item={item} />)
          ) : (
            <p className="text-gray-500">No recommended cars available for this location.</p>
          )}
        </div>

        {/* Show More Button */}
        {RecommendedCars.length < filteredCars.length && (
          <div className="flex justify-center mt-8">
            <button
            className="bg-[#3563E9] hover:bg-[#213c8f] rounded-[4px]
 text-white p-[20px] font-[600] text-[16px] mx-w-[156px] mx-h-[44px]"
           onClick={loadMoreCars} >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
