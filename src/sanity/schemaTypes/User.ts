const user= {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "clerkId",
      type: "string",
      title: "Clerk ID",
    },
    {
      name: "wishlist",
      type: "array",
      title: "Wishlist",
      of: [{ type: "reference", to: [{ type: "car" }] }],
    },
  ],
};

export default user