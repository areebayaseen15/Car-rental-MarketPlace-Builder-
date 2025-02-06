import { client } from "./lib/client";

export interface BookingData {
  carId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: "Cash" | "Credit Card" | "Debit Card"; // Adjust according to your payment methods
  price: number;
  rentalPeriod: string;
  pickupDetails: string;
  dropOffDetails: string;
}

export const submitBooking = async (userData: BookingData) => {
  try {
    const result = await client.create({
      _type: "booking",
      car: { _type: "reference", _ref: userData.carId }, // Ensuring carId is a string
      user: {
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
      },
      paymentMethod: userData.paymentMethod,
      price: userData.price,
      bookingDate: new Date().toISOString(),
      rentalPeriod: userData.rentalPeriod,
      pickupDetails: userData.pickupDetails,
      dropOffDetails: userData.dropOffDetails,
      status: "Pending", // Initial status
    });
    console.log("Booking saved successfully:", result);
  } catch (error) {
    console.error("Error saving booking:", error);
  }
};
