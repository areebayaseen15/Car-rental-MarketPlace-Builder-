"use client";

import { useState,  } from "react";
import { useUser, useClerk, RedirectToSignIn } from "@clerk/nextjs"; // Importing useUser and RedirectToSignIn from Clerk
import { FaCar, FaHistory, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const { user, isLoaded } = useUser(); // isLoaded helps ensure user data is ready before rendering
  const { signOut } = useClerk(); // Get the signOut method from useClerk
  const [activeTab, setActiveTab] = useState("overview");

  // Booking data (static example)
  const bookings = [
    { id: "1", car: "Toyota Corolla", pickupDate: "2025-01-25", dropoffDate: "2025-01-28", status: "Confirmed" },
    { id: "2", car: "Honda Civic", pickupDate: "2025-02-05", dropoffDate: "2025-02-10", status: "Pending" },
  ];

  // If the user data is still loading, show a loading message
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <RedirectToSignIn />;
  }

  const handleLogout = async () => {
    try {
      await signOut(); // Log out the user
      window.location.href = "/sign-in"; // Redirect to sign-in page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className=" bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout} // Call handleLogout when clicked
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
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${activeTab === tab.id ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
                  onClick={() => setActiveTab(tab.id)}
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
                  <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{booking.car}</h3>
                    <p className="text-gray-600"><strong>Pickup:</strong> {booking.pickupDate}</p>
                    <p className="text-gray-600"><strong>Dropoff:</strong> {booking.dropoffDate}</p>
                    <p className={`text-sm mt-3 px-3 py-1 rounded-full inline-block ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {booking.status}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "history" && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Renatl History</h2>
              <p className="text-gray-600">No order history available.</p>
            </section>
          )}

          {activeTab === "profile" && user && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>Name:</strong> {user.fullName || "No Name"}</p>
                <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress || "No Email"}</p>
                <p><strong>Phone:</strong> {user.phoneNumbers[0]?.phoneNumber || "No Phone"}</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
