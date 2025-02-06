import { defineType } from "sanity";

const booking = defineType({
  name: "booking",
  title: "Bookings",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "town",
      title: "Town/City",
      type: "string",
    },
    {
      name: "rentalType",
      title: "Rental Type",
      type: "string",
    },
    {
      name: "pickUpLocation",
      title: "Pick-Up Location",
      type: "string",
    },
    {
      name: "pickUpDate",
      title: "Pick-Up Date",
      type: "datetime",
    },
    {
      name: "pickUpTime",
      title: "Pick-Up Time",
      type: "string",
    },
    {
      name: "dropOffLocation",
      title: "Drop-Off Location",
      type: "string",
    },
    {
      name: "dropOffDate",
      title: "Drop-Off Date",
      type: "datetime",
    },
    {
      name: "dropOffTime",
      title: "Drop-Off Time",
      type: "string",
    },
    {
      name: "amountPaid",
      title: "Amount Paid",
      type: "number",
      validation: (Rule) => Rule.min(0), // No explicit type needed
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["success", "failed"],
      },
    },
  ],
});

export default booking;
