import { Plus_Jakarta_Sans } from "next/font/google";
import { FaHeart } from "react-icons/fa";
import { AiFillBell } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
 

  return (
    <div className="bg-white fixed top-0 left-0 w-full z-50 mb-[800px] shadow-md">
      <div className="xl:mx-10 max-w-[1440px] h-[124px] flex flex-col gap-2 sm:flex-row items-center sm:justify-between px-4 py-4 mx-auto">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            href="./"
            className={`${plusJakartaSans.className} lg:ml-[50px] text-[24px] md:text-[32px] leading-[48px] tracking-[-3%] font-bold text-blue-500`}
          >
            MORENT
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

{/* Mobile Profile Image */}
<div className=" relative bottom-[50px] left-36 rounded-full md:hidden w-20 h-20 border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[7px] py-[7px]">

<Link href="/AnalyticDashboard">
          {/* <Profile/> */}
        </Link>
</div>

        {/* Profile and Notification */}
        <div className="hidden sm:flex items-center space-x-4">
          
        <Link href="/Wishlist">
          <div className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
            <FaHeart className="text-gray-600 w-6 h-6 hover:text-red-500 cursor-pointer" />
          </div>
          </Link>

          <Link href="/Notification">
          <div className=" relative w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
              <AiFillBell className="  text-gray-600 w-6 h-6 hover:text-red-500 cursor-pointer"  />
              <span className="absolute top-2 right-2  bg-red-500 w-2 h-2 rounded-full"></span>
            </div>
          </Link>

          <div className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
            <IoIosSettings className="text-gray-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
          </div>

          <div className="w-12 h-12 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[7px] py-[7px]">
            <Link href="/AnalyticDashboard">
            <Profile/>

            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
