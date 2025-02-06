const Car = {
  name: "car",
  type: "document",
  title: "Car",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Car Name",
    },
    {
      name: "brand",
      type: "string",
      title: "Brand",
      description: "Brand of the car (e.g., Nissan, Tesla, etc.)",
    },
    {
      name: "type",
      type: "string",
      title: "Car Type",
      description: "Type of the car (e.g., Sport, Sedan, SUV, etc.)",
    },
    {
      name: "fuelCapacity",
      type: "string",
      title: "Fuel Capacity",
      description: "Fuel capacity or battery capacity (e.g., 90L, 100kWh)",
    },
    {
      name: "transmission",
      type: "string",
      title: "Transmission",
      description: "Type of transmission (e.g., Manual, Automatic)",
    },
    {
      name: "seatingCapacity",
      type: "string",
      title: "Seating Capacity",
      description: "Number of seats (e.g., 2 People, 4 seats)",
    },
    {
      name: "pricePerDay",
      type: "string",
      title: "Price Per Day",
      description: "Rental price per day",
    },
    {
      name: "originalPrice",
      type: "string",
      title: "Original Price",
      description: "Original price before discount (if applicable)",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags for categorization (e.g., popular, recommended)",
    },
    {
      name: "image",
      type: "image",
      title: "Car Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
    },
    {
      name: "description",
      type: "text",
      title: "Car Description",
      description: "Detailed description about the car, features, and specifications.",
    },
    {
      name: "availability",
      title: "Availability",
      type: "object",
      fields: [
        {
          name: "locations",
          title: "Available Locations",
          type: "array",
          of: [{ type: "string" }],
          description: "Locations where this car is available (e.g., Sadar, Clifton).",
        },
        {
          name: "availableDates",
          title: "Available Dates",
          type: "array",
          of: [{ type: "string" }],
          description: "Dates when the car is available (e.g., '2025-02-10', '2025-02-15').",
        },
        {
          name: "availableTimes",
          title: "Available Times",
          type: "array",
          of: [{ type: "string" }],
          description: "Times when the car is available (e.g., '08:00 AM', '12:00 PM').",
        },
      ],
    },
  ],
};

export default Car;
