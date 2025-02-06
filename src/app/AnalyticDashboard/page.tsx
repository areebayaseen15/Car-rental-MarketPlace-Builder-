
import React from 'react'
import { FaHome, FaCar, FaChartBar, FaEnvelope, FaCalendarAlt, FaCog, FaQuestionCircle } from "react-icons/fa";
import { BsMoonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import Image from "next/image"
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
        <Navbar/>
    <div className="mt-32 max-w-[1440px] mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-[#F6F7F9]">
      {/* Sidebar/Main Menu */}
      <div className="lg:w-[286px] w-full bg-white p-4 rounded-lg flex flex-col justify-between shadow-md">
        <div> 
          <h2 className="text-sm font-semibold text-[#94A7CB] opacity-40 mb-4">MAIN MENU</h2>
          <ul className="space-y-6 font-medium text-base text-[#94A7CB]">
            <li className="flex items-center gap-4 bg-[#3563E9] text-white px-4 py-2 rounded-md">
              <FaHome />
              <Link href="/Dashboard">Dashboard</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
              <FaCar />
              <Link href="/">Car Rent</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
              <FaChartBar />
              <Link href="#">Insight</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
              <FaEnvelope />
              <Link href="#">Inbox</Link>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
              <FaCalendarAlt />
              <Link href="#">Calendar</Link>
            </li>
          </ul>
        </div>

      {/* Preferences */}
      <div className="mt-10">
      <h2 className="text-sm font-semibold text-[#94A7CB] opacity-40 mb-4">PREFERENCE</h2>
        <ul className="space-y-8 font-medium text-base text-[#94A7CB]">
          <li className="flex items-center gap-4 hover:text-[#3B82F6]">
            <FaCog />
            <span>Settings</span>
          </li>
          <li className="flex items-center gap-4 hover:text-[#3B82F6]">
            <FaQuestionCircle />
            <span>Help & Center</span>
          </li>
          <li className="flex items-center justify-between hover:text-[#3B82F6]">
            <div className="flex items-center gap-4">
              <BsMoonFill />
              <span>Dark Mode</span>
            </div>
            <div className="flex gap-2">
              <div className="bg-[#3B82F6] w-4 h-4 rounded-full"></div>
              <div className="bg-gray-200 w-4 h-4 rounded-full"></div>
            </div>
          </li>
        </ul>
      </div>

      {/* Log Out  */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 text-[#94A7CB] hover:text-[#3B82F6]">
        <CiLogout />
          <span>Log Out</span>
        </button>
      </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6  ">
        {/* Details Rental */}
        <div className="flex-1  p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold mb-4">Details Rental</h2>
          <Image
          src="/Assets/Maps.png"
          alt="Car"
          width={486}
          height={272}
          className="w-full h-auto lg:w-[446px] lg:h-[272x] "
        />

          <div className="mt-4 flex items-center gap-4">
          <Image
          src="/Assets/Look.png"
          alt="Car"
          width={132}
          height={72}
          className="w-[116px] h-[40px] lg:w-[132px] lg:h-[72px] rounded-lg bg-blue-200"
        />
            <div>
              <span className="text-base font-semibold">Nissan GT-R</span>
              <span className="text-sm text-gray-500 mt-2 lg:ml-40 xl:ml-40">#9761</span>
              <p className="text-sm text-gray-500">Sport Car</p>
            </div>
          </div>
         

          {/* Pickup and Drop-off Sections */}
          <div className="mt-6 space-y-4">
  {["Pick-Up", "Drop-Off"].map((label, index) => (
    <div key={index}>
      <div className="flex items-center gap-2">
        <input type="radio" name="trip"  />
        <h3 className="text-sm font-semibold">{label}</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        {["Locations", "Date", "Time"].map((field, index) => (
          <div key={index} className="flex-1">
            <label className="block text-xs text-[16px] leading-[24px] tracking-[-2%] font-bold text-black">{field}</label>
            <select className="w-full bg-white border-r-2 p-2 text-sm text-[#90A3BF]">
              {field === "Locations" && (
                <>
                  <option>Kota Semarang</option>
                  <option>Kota Jakarta</option>
                  <option>Kota Surabaya</option>
                </>
              )}
              {field === "Date" && (
                <>
                  <option>20 July 2022</option>
                  <option>21 July 2022</option>
                  <option>22 July 2022</option>
                </>
              )}
              {field === "Time" && (
                <>
                  <option>07:00 </option>
                  <option>02:00 </option>
                  <option>01:00 </option>
                </>
              )}
            </select>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

<div className="border-t mt-10 lg:mt-20">
        <div className='flex  relative flex-col'><h4 className="text-sm xl:text-[20px] font-bold leading-[30px] text-[#1A202C] mb-2">Total Rental Price</h4>
        
        <p className="text-sm lg:text-[14px] leading-[21px] tracking-[-3%] text-[#90A3BF]">Overall price and includes rental discount</p>
        <p className="absolute bottom-5 right-4 flex lg:bottom-10 xl:bottom-5  text-[24px] xl:text-[32px] leading-[40.32px] font-bold text-[#1A202C]">$80.00</p></div>
        
      </div>

   
          </div>
        </div>

        {/* Sections 3 */}
        

 <div className='right-section flex flex-col gap-5'>
 <div className=" bg-white w-full h-auto  lg:w-[450px] xl:w-[524px]  lg:h-[324px] rounded-lg shadow-md p-3">
      <Image src="/Assets/rentalFrame.png" alt="rental-image" width={524} height={324}
      className='md:ml-20 lg:ml-0'/>
</div>
<div>
  <div className="w-full h-auto  lg:w-[450px] xl:w-[524px] md:h-[480px] bg-white rounded-xl shadow-md p-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold text-gray-800">Recent Transaction</h2>
    <a href="#" className="text-sm text-blue-500 hover:underline">
      View All
    </a>
  </div>
  {/* Transactions */}
  <ul>
    {/* Transaction 1 */}
    <li className="flex justify-between  items-center py-3 border-b border-gray-200 last:border-none">
      <div className="md:flex  ">
        <Image
          src="/Assets/car (19).png"
          alt="Nissan GT – R"
          width={114}
          height={36}
          className= "w-full h-auto md:w-[114px] md:h-[36px] rounded-md object-cover mr-4"
        />

        <div>
          <p className="text-sm font-medium text-gray-800">Nissan GT – R</p>
          <p className="text-sm text-gray-500">Sport Car</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">20 July</p>
        <p className="text-sm font-medium text-gray-800">$80.00</p>
      </div>
    </li>
    {/* Transaction 2 */}
    <li className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
      <div className="md:flex items-center">
        <Image
          src="/Assets/Car (20).png"
          alt="Koenigsegg"
          width={114}
          height={36}
          className="w-full h-auto md:w-[114px] md:h-[36px] rounded-md object-cover mr-4"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">Koenigsegg</p>
          <p className="text-sm text-gray-500">Sport Car</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">19 July</p>
        <p className="text-sm font-medium text-gray-800">$99.00</p>
      </div>
    </li>
    {/* Transaction 3 */}
    <li className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
      <div className="md:flex items-center">
        <Image
          src="/Assets/car (21).png"
          alt="Rolls – Royce"
          width={114}
          height={36}
          className="w-full h-auto md:w-[114px] md:h-[36px] rounded-md object-cover mr-4"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">Rolls – Royce</p>
          <p className="text-sm text-gray-500">Sport Car</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">18 July</p>
        <p className="text-sm font-medium text-gray-800">$96.00</p>
      </div>
    </li>
    {/* Transaction 4 */}
    <li className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
      <div className="md:flex items-center">
        <Image
          src="/Assets/car (22).png"
          alt="CR - V"
          width={114}
          height={36}
          className="w-full h-auto md:w-[114px] md:h-[36px] rounded-md object-cover mr-4"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">CR - V</p>
          <p className="text-sm text-gray-500">SUV</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">17 July</p>
        <p className="text-sm font-medium text-gray-800">$80.00</p>
      </div>
    </li>
  </ul>
</div>
</div>
 </div>
  
</div>
</div>

  );
}
