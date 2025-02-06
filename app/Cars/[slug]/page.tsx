import { client } from '@/sanity/lib/client';
import React from 'react'
import SideMenue from "@/app/components/sideMenue";
import Image from "next/image";
import { IoIosStarOutline } from "react-icons/io";
import { IoHeart, IoStarSharp } from "react-icons/io5";
import Link from "next/link";
import { urlFor } from '@/sanity/lib/image';
import ProductListing from '@/app/components/ProductList2';
import Navbar from '@/app/components/Navbar';
import Reviews from '@/app/components/Reviews';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await Promise.resolve(params);// Ensure params is correctly extracted
  const query = `*[_type == "car" && slug.current == $slug][0]`;
  const car = await client.fetch(query, { slug });
  return (
    <div>
      <Navbar />

      <div className="mt-0 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="mt-32 hidden lg:flex lg:w-[200px]  xl:w-[300px]  bg-white shadow-lg">
          <SideMenue />
        </div>

        <div className="mt-40 flex flex-col items-center justify-center bg-[#F6F7F9]">
          <div className="products">
            <div className="xl:mx-10 flex flex-col items-center lg:flex-row lg:justify-center  lg:gap-10 ">
              <div className="flex flex-col justify-between gap-2 lg:gap-5 ">

                <div className="bg-blue-600 rounded-lg shadow-lg p-6 md:p-8 max-w-md mx-auto">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                    Sports car with the best design and acceleration
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base mb-6">
                    Safety and comfort while driving a futuristic and elegant sports car
                  </p>
                  <div className="relative w-full ">
                    <Image
                      src={urlFor(car?.image).url()}
                      alt="Sports Car"
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                <div className="flex justifty-between gap-5 ">
                  <Image
                    src={urlFor(car?.image).url()}
                    alt="car"
                    width={148}
                    height={124}
                    className="w-[96px] h-[64px] lg:w-[148px] lg:h-[124px]"
                  />
                  <Image
                    src="/Assets/view03.png"
                    alt="Profile"
                    width={100}
                    height={10}
                  />
                  <Image
                    src="/Assets/view04.png"
                    alt="car"
                    width={148}
                    height={124}
                    className="w-[96px] h-[64px] lg:w-[148px] lg:h-[124px]"
                  />
                </div>
              </div>

              <div className=" w-[327px]  lg:w-[400px]  xl:w-[492px] lg:h-[508px] rounded-[10px] bg-[#FFFFFF]">
                <div className="card p-2  xl:p-5 text-[32px] font-bold leading-[48px] tracking-[-3%]">
                  <div className="flex  justify-between">
                    <h1>{car?.name}</h1>
                    <IoHeart className="text-[#ED3F3F] text-3xl" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex mt-3">
                      <IoStarSharp className="text-yellow-500  text-2xl" />
                      <IoStarSharp className="text-yellow-500  text-2xl" />
                      <IoStarSharp className="text-yellow-500  text-2xl" />
                      <IoStarSharp className="text-yellow-500  text-2xl" />
                      <IoIosStarOutline className="text-2xl" />
                    </div>
                    <p className="text-[16px] ">440+ Reviewer</p>
                  </div>

                  <p className="mt-3 text-[14px] font-normal leading-[40px] tracking-[-2%] text-[#596780]">
                    NISMO has become the embodiment of Nissan&apos;s outstanding
                    performance, inspired by the most unforgiving proving
                    ground, the &quot;race track&quot;.
                  </p>

                  <div className="flex flex-col lg:flex-row text-[20px] leading-[30px] justify-between gap-5 lg:gap-10 tracking-[-2%] ">
                    <div className="flex flex-col text-[18px] leading-[30px] tracking-[-2%] ">
                      <div className="flex gap-10 mt-5">
                        <span className="text-[#90A3BF]">Type Car</span>
                        <span>{car?.type}</span>
                      </div>
                      <div className="flex gap-10">
                        <span className="text-[#90A3BF]">Steering</span>
                        <span>{car?.transmission}</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-[18px] leading-[30px] tracking-[-2%] ">
                      <div className="flex gap-10 mt-5">
                        <span className="text-[#90A3BF]">Capacity</span>
                        <span>{car?.seatingCapacity}</span>
                      </div>

                      <div className="flex gap-10">
                        <span className="text-[#90A3BF]">Gasoline</span>
                        <span>{car?.fuelCapacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-10">
                    <div>
                      <span className="text-[20px] font-bold leading-[25.2px] text-[#1A202C]">
                        {car?.pricePerDay}
                      </span>
                      <span className="text-[14px]">days</span>
                      <h3 className="line-through text-[14px]">{car?.oldPrice}</h3>
                    </div>

                    <Link href={`/Page3/${car?.slug.current}/billing`}>
                      <button className="bg-[#3563E9] hover:bg-[#213c8f] w-[140px] h-[56px] text-white  #3563E9  p-3  text-[16px] leading-[24px]">
                        Rent Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Reviews />
        </div>
      </div>

      <ProductListing />
    </div>
  );
};

export default Page;
