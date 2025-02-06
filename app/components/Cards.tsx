"use client";

import { RiPokerHeartsLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { FaGasPump } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { urlFor } from "@/sanity/lib/image";
import { useUser } from "@clerk/clerk-react"; // Clerk user info
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { IoHeart } from "react-icons/io5";

export interface ProductData {
  oldPrice?: string;
  newPrice?: string;
  model?: string;
  pricePerDay?: string;
  name?: string;
  seatingCapacity?: string;
  fuelCapacity?: string;
  transmission?: string;
  title?: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
      current?: string;
    };
  };
  type?: string;
  quantity?: number;
  slug?: {
    current?: string;
  };
  description?: string;
  brand?: string;
  _type?: "product";
  _id?: string;
}

const Cards = ({ item }: { item: ProductData }) => {
  const { user } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Add to wishlist function
  const addToWishlist = async (carId?: string) => {
    if (!carId) return;
    if (!user) {
      alert("You need to log in first!");
      return;
    }

    const userId = user.id;

    try {
      // Check if user exists in Sanity
      const userDoc = await client.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: userId }
      );

      if (userDoc) {
        // Update existing user document
        await client
          .patch(userDoc._id)
          .setIfMissing({ wishlist: [] })
          .insert("after", "wishlist[-1]", [{ _type: "reference", _ref: carId }])
          .commit();
      } else {
        // Create new user document
        await client.create({
          _type: "user",
          clerkId: userId,
          wishlist: [{ _type: "reference", _ref: carId }],
        });
      }

      setIsInWishlist(true);
      alert("Car added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add car to wishlist. Please try again.");
    }
  };

  // Remove from wishlist function
  const removeFromWishlist = async (carId?: string) => {
    if (!carId) return;
    if (!user) {
      alert("You need to log in first!");
      return;
    }

    const userId = user.id;

    try {
      // Check if user exists in Sanity
      const userDoc = await client.fetch(
        `*[_type == "user" && clerkId == $clerkId][0]`,
        { clerkId: userId }
      );

      if (userDoc) {
        // Remove car from the wishlist
        await client
          .patch(userDoc._id)
          .unset([`wishlist[_ref == "${carId}"]`])
          .commit();

        setIsInWishlist(false);
        alert("Car removed from wishlist!");
      } else {
        alert("User not found!");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove car from wishlist. Please try again.");
    }
  };

  return (
    <div className="flex flex-col transform transition-transform duration-300 hover:scale-105 bg-white shadow-lg border border-gray-200 rounded-lg p-5 max-w-[350px] lg:max-w-[400px]">
      {/* Title and Model */}
      <div className="flex justify-between">
        <div className="flex-col">
          <h1 className="text-[16px] leading-[24px] lg:text-[20px] text-[#1A202C] lg:leading-[30px] tracking-[-2%] font-bold">
            {item?.name}
          </h1>
          <p className="text-[12px] leading-[15.12px] text-[#90A3BF] lg:text-[14px] lg:leading-[21px] tracking-[-2%] font-bold">
            {item?.type}
          </p>
        </div>

        {/* Heart Icon */}
        <div className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]">
          {isInWishlist ? (
            <IoHeart
              className="text-[#ED3F3F] text-3xl cursor-pointer"
              onClick={() => removeFromWishlist(item?._id)}
            />
          ) : (
            <RiPokerHeartsLine
              className="text-2xl cursor-pointer text-[#90A3BF] hover:text-red-500"
              onClick={() => addToWishlist(item?._id)}
            />
          )}
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-4">
        <Link href={item?.slug?.current ? `/Cars/${item.slug.current}` : "#"}>
          {item?.image ? (
            <Image
              src={urlFor(item?.image).url()}
              alt={`${item?.name} image`}
              width={256}
              height={196}
              className="object-cover"
            />
          ) : (
            <div className="w-[256px] h-[196px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </Link>
      </div>

      {/* Features */}
      <div className="flex flex-col lg:flex-row justify-between md:justify-start md:gap-4 lg:gap-0 xl:gap-3 mb-4">
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <FaGasPump className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <TbSteeringWheel className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.transmission}</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <FaUserGroup className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.seatingCapacity}</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-base md:text-lg lg:text-xl font-bold text-[#1A202C]">
            {item?.pricePerDay}
          </span>
          {item?.oldPrice && (
            <h3 className="text-xs md:text-sm line-through text-gray-500">
              {item?.oldPrice}
            </h3>
          )}
        </div>
        <Link href={item?.slug?.current ? `/Cars/${item.slug.current}/Billing` : "#"}>
          <button className="bg-[#3563E9] hover:bg-[#213c8f] transition-all duration-300 rounded-lg px-4 py-2 md:px-5 md:py-3 text-white text-sm md:text-[16px] xl:text-lg font-semibold">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
