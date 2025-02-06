import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-40 lg:mt-20">
      <footer className="bg-[#F6F7F9]  lg:bg-[#FFFFFF] lg:mx-w-[1440px]">
        <div className=" w-full max-w-screen-xl p-4 lg:p-5">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <h1 className="h-11 me-3"></h1>
                <span className="self-center text-[24px] lg:text-[32px] font-bold whitespace-nowrap text-[#3563E9]">
                  MORENT
                </span>
              </div>
              <p className="font-medium text-sm lg:text-base text-[#131313] opacity-60 pl-1 pt-3 lg:pl-3 lg:pt-5">
                Our vision is to provide convenience
                <br />
                and help increase your sales business.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 leading-6">
              <div>
                <h2 className="mb-4 text-lg lg:text-xl font-semibold text-[#1A202C]">
                  About
                </h2>
                <ul className="text-[#131313] opacity-60 font-medium text-sm lg:text-base">
                  <li className="mb-2 hover:underline">How it works</li>
                  <li className="mb-2 hover:underline">Featured</li>
                  <li className="mb-2 hover:underline">Partnership</li>
                  <li className="mb-2 hover:underline">Business Relation</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-lg lg:text-xl font-semibold text-[#1A202C]">
                  Community
                </h2>
                <ul className="text-[#131313] opacity-60 font-medium text-sm lg:text-base">
                  <li className="mb-2 hover:underline">Events</li>
                  <li className="mb-2 hover:underline">Blog</li>
                  <li className="mb-2 hover:underline">Podcast</li>
                  <li className="mb-2 hover:underline">Invite a friend</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-lg lg:text-xl font-semibold text-[#1A202C]">
                  Socials
                </h2>
                <ul className="text-[#131313] opacity-60 font-medium text-sm lg:text-base">
                  <li className="mb-2 hover:underline">Discord</li>
                  <li className="mb-2 hover:underline">Instagram</li>
                  <li className="mb-2 hover:underline">Twitter</li>
                  <li className="mb-2 hover:underline">Facebook</li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 sm:mx-auto bg-[#131313] opacity-60 lg:my-8 border border-gray-300" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm lg:text-base font-bold text-[#1A202C] sm:text-center">
              © 2022{" "}
              <Link href="#" className="hover:underline">
                MORENT
              </Link>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4 lg:gap-11 font-semibold text-sm lg:text-base text-[#1A202C]">
              <p className="hover:underline">Privacy Policy</p>
              <p className="hover:underline">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
