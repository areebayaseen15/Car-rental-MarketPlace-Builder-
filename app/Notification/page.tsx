"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Notifications = () => {
  interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
  }

  interface FetchedNotification {
    _id: string;
    title: string;
    message: string;
    date: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data: FetchedNotification[] = await client.fetch(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date
        }`
      );

      const formattedData: Notification[] = data.map((notification) => ({
        id: notification._id,
        title: notification.title,
        message: notification.message,
        time: new Date(notification.date).toLocaleString(),
      }));

      setNotifications(formattedData);
    };

    fetchNotifications();

    // GROQ Subscription for real-time updates
    const subscription = client
      .listen<FetchedNotification>(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date
        }`
      )
      .subscribe((update) => {
        if (update.result) {
          const newNotification: Notification = {
            id: update.result._id,
            title: update.result.title,
            message: update.result.message,
            time: new Date(update.result.date).toLocaleString(),
          };
          setNotifications((prev) => [newNotification, ...prev]);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications ({notifications.length})
            </h2>
          </div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="px-6 py-4 hover:bg-gray-50">
                <p className="font-semibold text-gray-700">{notification.title}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
