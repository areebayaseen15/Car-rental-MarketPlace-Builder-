import React from "react";
import Image from "next/image";

const SideMenu = () => {
  return (
    <div className="w-full max-w-[360px] lg:w-[300px] h-auto lg:h-[1300px] p-5 lg:p-10 bg-white">
      <div className="w-full lg:w-[176px] h-auto">
        {/* Type Section */}
        <div className="mt-0 h-auto flex flex-col gap-5">
          <h1 className="text-[#90A3BF] text-lg md:text-xl font-semibold">
            Type
          </h1>
          {["Sport", "SUV", "MPV", "Sedan", "Coup", "Hatchback"].map(
            (type, index) => (
              <div
                key={type}
                className="flex items-center gap-3 text-base md:text-lg leading-6 tracking-[-2%]"
              >
                <input
                  type="checkbox"
                  name={`check-${index}`}
                  id={`check-${index}`}
                  className="w-5 h-5 rounded-xl border-gray-300 border focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-black">{type}</p>
                <span className="text-[#90A3BF]">(10)</span>
              </div>
            )
          )}
        </div>

        {/* Capacity Section */}
        <div className="h-auto flex flex-col gap-5 mt-10">
          <h1 className="text-[#90A3BF] text-lg md:text-xl font-semibold">
            Capacity
          </h1>
          {["2 Persons", "4 Persons", "6 Persons", "8 or More"].map(
            (capacity, index) => (
              <div
                key={capacity}
                className="flex items-center gap-3 text-base md:text-lg leading-6 tracking-[-2%]"
              >
                <input
                  type="checkbox"
                  name={`capacity-${index}`}
                  id={`capacity-${index}`}
                  className="w-5 h-5 rounded-xl border-gray-300 border focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-black">{capacity}</p>
                <span className="text-[#90A3BF]">(10)</span>
              </div>
            )
          )}
        </div>

        {/* Price Section */}
        <div className="h-auto flex flex-col gap-5 mt-10">
          <h1 className="text-[#90A3BF] text-lg md:text-xl font-semibold">
            Price
          </h1>
          <Image
            src="/Assets/range.png"
            alt="Range Slider"
            width={296}
            height={20}
            className="w-full"
          />
          <p className="text-[#90A3BF] text-base md:text-lg font-semibold">
            Max. $100.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
