"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import Link from "next/link";
import ProductListing from "./ProductList2";

export default function Hero() {
  const [pickup, setPickup] = useState({ location: "", date: "", time: "" });
  const [dropoff, setDropoff] = useState({ location: "", date: "", time: "" });

  const cities = ["Select City", "Garden", "Bahria Town", "Sadar", "Clifton", "Defence", "North Nazimabad"];

  return (
    <div className="overflow-hidden w-full mt-10 lg:mt-0 bg-[#F6F7F9]">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-auto gap-4 p-8">
        {/* First Card */}
        <div className="bg-[#54A6FF] max-w-[640px] h-[360px] text-white rounded-[10px] flex flex-col items-start justify-between p-5 relative">
          <div className="flex-1">
            <h1 className="mb-4 font-medium text-[32px] leading-10 tracking-tight text-left">
              The Best Platform <br /> for Car Rental
            </h1>
            <p className="mb-4 text-base font-medium tracking-tight">
              Ease of doing car rental safely and <br /> reliably. Of course at a low price.
            </p>
            <Link href="/Payment">
              <button className="bg-[#3563E9] w-[120px] h-11 text-base font-medium tracking-tight hover:bg-[#54A6FF] text-white px-5 rounded-[4px]">
                Rental Car
              </button>
            </Link>
          </div>
          <div className="absolute bottom-4 left-4">
            <Image src="/Assets/car-01.png" alt="Car 1" height={400} width={500} className="lg:ml-0 xl:ml-28" />
          </div>
        </div>

        {/* Second Card */}
        <div className="hidden md:flex bg-[#3563E9] max-w-[640px] h-[360px] text-white rounded-[10px] flex-col items-start justify-between p-5 relative">
          <div className="flex-1">
            <h1 className="mb-4 font-medium text-[32px] leading-10 tracking-tight text-left">
              Easy way to rent a <br /> car at a low price
            </h1>
            <p className="mb-4 text-base font-medium tracking-[-3%]">
              Providing cheap car rental services <br /> and safe and comfortable facilities.
            </p>
            <Link href="/Payment">
              <button className="bg-[#54A6FF] w-[120px] h-11 text-base font-medium tracking-tight hover:bg-blue-700 text-white px-5 rounded-[4px]">
                Rental Car
              </button>
            </Link>
          </div>
          <div className="absolute bottom-4 right-40">
            <Image src="/Assets/car-2.png" alt="Car 1" height={450} width={560} className="lg:ml-10 xl:ml-28" />
          </div>
        </div>
      </div>

      {/* 🚗 Pickup and Drop-off Cards with Arrow Button in Between */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-6 md:mt-10 mt-0 mx-auto">
        {/* Pick-Up Card */}
        <div className="lg:items-start md:w-[500px] md:items-center mx-20 w-[400px] lg:mx-w-[600px] xl:mx-w-[582px] lg:mr-10 bg-white rounded-[10px] shadow-xl px-4 py-4">
          <div className="flex gap-3">
            <Image src="/Assets/mark.png" alt="mark" width={20} height={20} />
            <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800">Pick-Up</h3>
          </div>
          <div className="mt-5 flex flex-row justify-between items-center">
            {/* Location Input */}
            <div>
              <h1 className="text-[#1A202C] font-extrabold text-[16px] leading-[24px]">Location</h1>
              <select
                className="w-full p-2 border-r rounded-md text-[#90A3BF] font-bold"
                value={pickup.location}
                onChange={(e) => setPickup({ ...pickup, location: e.target.value })}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div>
              <h1 className="text-[#1A202C] font-extrabold text-[16px] leading-[24px]">Date</h1>
              <input
                type="date"
                value={pickup.date}
                onChange={(e) => setPickup({ ...pickup, date: e.target.value })}
                className="w-full p-2 border-r rounded-md text-[#90A3BF] font-bold"
              />
            </div>

            {/* Time Input */}
            <div>
              <h1 className="text-[#1A202C] font-extrabold text-[16px] leading-[24px]">Time</h1>
              <input
                type="time"
                value={pickup.time}
                onChange={(e) => setPickup({ ...pickup, time: e.target.value })}
                className="w-full p-2 border-r rounded-md text-[#90A3BF] font-bold"
              />
            </div>
          </div>
        </div>

        {/* Arrow Button Between Cards */}
        <div className="flex justify-center items-center lg:flex-col">
          <div className="flex bg-[#3563E9] w-[64px] h-[64px] hover:bg-[#2b4699] justify-center items-center rounded-xl">
            <IoArrowUp className="text-white text-3xl" />
            <IoArrowDown className="text-white text-3xl" />
          </div>
        </div>

        {/* Drop-Off Card */}
        <div className="lg:items-start md:w-[500px] md:items-center mx-20 w-[400px] lg:mx-w-[600px] xl:mx-w-[582px] lg:mr-10 bg-white rounded-[10px] shadow-xl px-4 py-4">
          <div className="flex gap-3">
            <Image src="/Assets/mark.png" alt="mark" width={20} height={20} />
            <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800">Drop-Off</h3>
          </div>
          <div className="mt-5 flex flex-row justify-between items-center">
            {/* Location Input */}
            <div>
              <h1 className="text-[#1A202C] font-extrabold text-[16px] leading-[24px]">Location</h1>
              <select
                className="w-full p-2 border-r rounded-md text-[#90A3BF] font-bold"
                value={dropoff.location}
                onChange={(e) => setDropoff({ ...dropoff, location: e.target.value })}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div>
              <h1 className="text-[#1A202C] font-extrabold text-[16px] leading-[24px]">Date</h1>
              <input
                type="date"
                value={dropoff.date}
                onChange={(e) => setDropoff({ ...dropoff, date: e.target.value })}
                className="w-full p-2 border-r rounded-md text-[#90A3BF] font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🚘 Filtered Product Listing */}
      <ProductListing pickup={pickup.location} dropoff={dropoff.location} />
    </div>
  );
}
