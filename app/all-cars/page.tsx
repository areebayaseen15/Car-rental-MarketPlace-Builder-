"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards, { ProductData } from "../components/Cards";
import { client } from "@/sanity/lib/client";
import { FiX } from "react-icons/fi";

// Fetch all cars from Sanity
const getAllCars = async () => {
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
      transmission
    }`
  );
  return fetchData;
};

export default function AllCars() {
  
  // States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<string>("100");
  const [allCars, setAllCars] = useState<ProductData[]>([]);
  const [filteredCars, setFilteredCars] = useState<ProductData[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false); 

  
  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getAllCars();
      setAllCars(cars);
      setFilteredCars(cars); 
    };
    fetchCars();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let filteredData = [...allCars];

    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter((car) => car.type && selectedTypes.includes(car.type));
    }

    if (selectedCapacities.length > 0) {
      filteredData = filteredData.filter((car) =>
        selectedCapacities.some(
          (capacity) =>
            capacity.toLowerCase() === String(car.seatingCapacity).toLowerCase()
        )
      );
    }

    filteredData = filteredData.filter(
      (car) => car.pricePerDay !== undefined && String(car.pricePerDay) <= String(maxPrice)
    );

    setFilteredCars(filteredData);
  }, [selectedTypes, selectedCapacities, maxPrice, allCars]);

  // Toggle Sidebar
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  // Render the UI
  return (
    <div>
      <Navbar />
      <div className=" mt-32 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={` mt-28 lg:mt-0 fixed lg:static inset-0 lg:inset-auto bg-black lg:bg-transparent bg-opacity-50 z-20 lg:z-auto transition-transform transform ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="w-[200px] xl:w-[300px] bg-white shadow-lg h-full p-5 lg:p-10">
            {/* Close Button (small screens only) */}
            <button
              onClick={toggleSidebar}
              className="absolute top-5 right-5 text-xl lg:hidden"
            >
              <FiX />
            </button>

            {/* Type Filter */}
            <div className="flex flex-col gap-5">
              <h1 className="text-[#90A3BF] text-lg font-semibold">Type</h1>
              {["Sport", "SUV", "MPV", "Sedan", "Coup", "Hatchback", "Electric", "Hybrid", "Gasoline", "Diesel"].map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    value={type}
                    onChange={(e) => {
                      const updatedTypes = e.target.checked
                        ? [...selectedTypes, type]
                        : selectedTypes.filter((t) => t !== type);
                      setSelectedTypes(updatedTypes);
                      setSidebarVisible(false); // Close sidebar after filter (small screens)
                    }}
                    className="w-5 h-5"
                  />
                  <p>{type}</p>
                </div>
              ))}
            </div>

            {/* Capacity Filter */}
            <div className="flex flex-col gap-5 mt-10">
              <h1 className="text-[#90A3BF] text-lg font-semibold">Capacity</h1>
              {["2 People", "4 People", "6 People", "8 or More"].map((capacity) => (
                <div key={capacity} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    value={capacity}
                    onChange={(e) => {
                      const updatedCapacities = e.target.checked
                        ? [...selectedCapacities, capacity]
                        : selectedCapacities.filter((c) => c !== capacity);
                      setSelectedCapacities(updatedCapacities);
                      setSidebarVisible(false); // Close sidebar after filter (small screens)
                    }}
                    className="w-5 h-5"
                  />
                  <p>{capacity}</p>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-5 mt-10">
              <h1 className="text-[#90A3BF] text-lg font-semibold">Price</h1>
              <input
                type="range"
                min="$70"
                step="10"
                max="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(String(e.target.value))}
                className="w-full"
              />
              <p>Max. {maxPrice}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button  */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-10 left-5 p-3 mt-24 rounded-full shadow-md"
        >
        Filter Cars
        </button>

        {/* Main Content */}
        <div className="flex-1 mx-5 lg:mx-10 bg-[#F6F7F9]">
              {/* 🚗 Pickup and Drop-off Cards with Arrow Button in Between */}
         
          
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((item: ProductData, i: number) => (
                <Cards key={i} item={item} />
              ))
            ) : (
              <p>No cars match your selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
