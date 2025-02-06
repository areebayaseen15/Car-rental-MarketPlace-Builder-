"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import Cards from "./Cards";
import { fetchCars, ProductData } from "./FetchCars";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const cars = await fetchCars();
      setProducts(cars);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  return (
    <div className="fixed top-5 left-0 w-[300px] mx-10 lg:w-full z-50">
      <div className="relative flex items-center gap-4 mx-auto mt-16 lg:mt-5 px-4 py-2 rounded-full border border-gray-300 max-w-[492px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.42-1.42l4.58 4.59a1 1 0 11-1.42 1.42l-4.58-4.59zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search car by name, tag, or type"
          className="bg-transparent w-full text-sm outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <IoMdClose
            onClick={() => setSearchQuery("")}
            className="text-accent/50 hoverEffect hover:text-lightRed cursor-pointer absolute right-12 top-3"
          />
        )}
        <Image
          src="/Assets/filter.png"
          alt="Filter"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>

      {searchQuery && (
        <div className="mt-5 mr-20 bg-white pb-5 px-5 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          {filteredProducts.length > 0 ? (
            <div className="flex gap-4">
              {filteredProducts.map((product, index) => (
                <div key={index} className="flex-none w-[300px]">
                  <Cards item={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No products found for &quot;{searchQuery}&quot;.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
