import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

interface WebhookData {
  name: string;
  address: string;
  phone: string;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffLocation: string;
  totalAmount: number;
  paymentStatus: "success" | "failed"; // Restricting to possible values
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for POST request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data: WebhookData = req.body; // Strongly typed request body

    console.log("Webhook Data:", data); // Log incoming data for debugging

    // Check if payment is successful
    if (data.paymentStatus === "success") {
      // Add data to Sanity
      await client.create({
        _type: "booking", // Define the document type in Sanity
        ...data, // Spread operator to add all properties
      });

      // Respond with a success message
      return res.status(200).json({ message: "Data successfully saved to Sanity" });
    } else {
      return res.status(400).json({ message: "Payment failed or invalid status" });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
