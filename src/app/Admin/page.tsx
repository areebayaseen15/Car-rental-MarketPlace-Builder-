"use client"

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    newCustomers: 0,
    topCategory: "",
  });

  interface Order {
    item: string;
    price: number;
  }

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock API call 
    const fetchData = async () => {
      try {
        setLoading(true);
      
        const response = await fetch("https://api.example.com/dashboard");

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Validate the structure of the data
        if (data && data.totalRevenue !== undefined && data.newCustomers !== undefined && data.topCategory !== undefined) {
          setAnalytics({
            totalRevenue: data.totalRevenue,
            newCustomers: data.newCustomers,
            topCategory: data.topCategory,
          });
        } else {
          throw new Error("Data structure is invalid");
        }

        // Set recent orders if available
        if (Array.isArray(data.recentOrders)) {
          setRecentOrders(data.recentOrders);
        } else {
          setRecentOrders([]);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || error) {
    // UI showing while loading or if there's an error
    return (
      <div className="max-w-[1440px] mx-auto p-4 bg-[#F6F7F9]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-[286px] w-full bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">MAIN MENU</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
                Dashboard
              </li>
              <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
                Products
              </li>
              <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
                Orders
              </li>
              <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
                Users
              </li>
              <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
                Categories
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-6">
            {/* Analytics Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">New Customers</h3>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Top Category</h3>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
            </section>

            {/* Recent Orders */}
            <section className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
              <ul className="divide-y divide-gray-200">
                <li className="flex justify-between py-2">
                  <span>.</span>
                  <span>$0.00</span>
                </li>
              </ul>
            </section>
          </main>

          {/* Admin Profile Card */}
          <aside className="lg:w-[286px] w-full bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-5xl text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Admin Name</h3>
              <p className="text-sm text-gray-600">Administrator</p>
              <p className="text-xs text-gray-500 mt-2">Last Login: 20 Jan 2025</p>
            </div>
            <button className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600">
              <FiLogOut />
              <span>Log Out</span>
            </button>
          </aside>
        </div>
      </div>
    );
  }

  // UI after data is fetched successfully
  return (
    <div className="max-w-[1440px] mx-auto p-4 bg-[#F6F7F9]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-[286px] w-full bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">MAIN MENU</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
              Dashboard
            </li>
            <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
              Products
            </li>
            <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
              Orders
            </li>
            <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
              Users
            </li>
            <li className="flex items-center gap-2 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer">
              Categories
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Analytics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${analytics.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">New Customers</h3>
              <p className="text-2xl font-bold text-green-600">
                {analytics.newCustomers}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Top Category</h3>
              <p className="text-2xl font-bold text-purple-600">
                {analytics.topCategory}
              </p>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <ul className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{order.item}</span>
                  <span>${order.price}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* Admin Profile Card */}
        <aside className="lg:w-[286px] w-full bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-5xl text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Admin Name</h3>
            <p className="text-sm text-gray-600">Administrator</p>
            <p className="text-xs text-gray-500 mt-2">Last Login: 20 Jan 2025</p>
          </div>
          <button className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600">
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </aside>
      </div>
    </div>
  );
}
