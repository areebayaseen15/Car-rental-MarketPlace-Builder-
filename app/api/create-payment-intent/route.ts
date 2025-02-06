import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QlGnBPn0CTwbz2rWtmfpz6Ddc0cd7uPAqdm5xdCTm4fZWE9VdZLpYr85MUSljfqtmXOsyKUkoQSbDuBCeG3ykFv000uvFVcVN", {
});

export async function POST(request: NextRequest) {
  try {
    // Request se necessary details ko extract kar rahe hain
    const {
      amount,
      userId,
      carId,
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffLocation,
      dropoffDate,
      dropoffTime,
    } = await request.json();

    // Payment Intent create karte waqt metadata pass kar rahe hain
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        carId,
        pickupLocation,
        pickupDate,
        pickupTime,
        dropoffLocation,
        dropoffDate,
        dropoffTime,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
