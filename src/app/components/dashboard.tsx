// pages/dashboard.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs"; // Import useClerk for logout functionality
import { FaCar, FaHistory, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const { user, isLoaded } = useUser(); // Get user info from Clerk
  const { signOut } = useClerk(); // Use Clerk's signOut for logout
  const [activeTab, setActiveTab] = useState("overview");
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side

  // Check if we are on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !user && isClient) {
      // If the user is not authenticated, redirect to the login page
      window.location.href = "/sign-in"; // Redirect to the sign-in page if no user is found
    }
  }, [user, isLoaded, isClient]);

  const bookings = [
    {
      id: "1",
      car: "Toyota Corolla",
      pickupDate: "2025-01-25",
      dropoffDate: "2025-01-28",
      status: "Confirmed",
    },
    {
      id: "2",
      car: "Honda Civic",
      pickupDate: "2025-02-05",
      dropoffDate: "2025-02-10",
      status: "Pending",
    },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Sign the user out using Clerk
      window.location.href = "/sign-in"; // Redirect to sign-in after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isClient) {
    return null; // Prevent rendering on SSR until we're on the client
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="mt-40 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md p-6">
          <nav>
            <ul className="space-y-4">
              {[{ id: "overview", icon: <FaCar />, label: "Overview" },
                { id: "history", icon: <FaHistory />, label: "Order History" },
                { id: "profile", icon: <FaUser />, label: "Profile" },
              ].map((tab) => (
                <li
                  key={tab.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          {activeTab === "overview" && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">{booking.car}</h3>
                    <p className="text-gray-600">
                      <strong>Pickup:</strong> {booking.pickupDate}
                    </p>
                    <p className="text-gray-600">
                      <strong>Dropoff:</strong> {booking.dropoffDate}
                    </p>
                    <p
                      className={`text-sm mt-3 px-3 py-1 rounded-full inline-block ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "history" && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              <p className="text-gray-600">No order history available.</p>
            </section>
          )}

          {activeTab === "profile" && user && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p>
                  <strong>Name:</strong> {user.fullName || "No Name"}
                </p>
                <p>
                  <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress || "No Email"}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phoneNumbers[0]?.phoneNumber || "No Phone"}
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
