
                  4: Data Schema Design for our car-rental MarketPla: 

// User Schema

export default {
  name: 'user',
  type: 'document',
  fields: [
    { name: 'fullName', type: 'string', title: 'Full Name' },
    { name: 'email', type: 'string', title: 'Email Address' },
    { name: 'password', type: 'string', title: 'Password' },
    { name: 'contactNumber', type: 'string', title: 'Contact Number' },
    { name: 'userType', type: 'string', title: 'User Type', options: { list: ['Renter', 'Owner'] } }
  ]
};
// Car Schema

export default {
  name: 'car',
  type: 'document',
  fields: [
    { name: 'carName', type: 'string', title: 'Car Name' },
    { name: 'carBrand', type: 'string', title: 'Car Brand' },
    { name: 'carType', type: 'string', title: 'Car Type', options: { list: ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric'] } },
    { name: 'rentalPrice', type: 'number', title: 'Rental Price Per Day' },
    { name: 'availability', type: 'boolean', title: 'Availability' },
    { name: 'owner', type: 'reference', to: [{ type: 'user' }], title: 'Car Owner' }
  ]
};
// Booking Schema

export default {
  name: 'booking',
  type: 'document',
  fields: [
    { name: 'car', type: 'reference', to: [{ type: 'car' }], title: 'Car' },
    { name: 'renter', type: 'reference', to: [{ type: 'user' }], title: 'Renter' },
    { name: 'startDate', type: 'datetime', title: 'Start Date' },
    { name: 'endDate', type: 'datetime', title: 'End Date' },
    { name: 'totalCost', type: 'number', title: 'Total Cost' }
  ]
};

// Review Schema

export default {
  name: 'review',
  type: 'document',
  fields: [
    { name: 'car', type: 'reference', to: [{ type: 'car' }], title: 'Car' },
    { name: 'user', type: 'reference', to: [{ type: 'user' }], title: 'User' },
    { name: 'rating', type: 'number', title: 'Rating (1-5)' },
    { name: 'comment', type: 'text', title: 'Comment' }
  ]
};

// Payment Schema

export default {
  name: 'payment',
  type: 'document',
  fields: [
    { name: 'booking', type: 'reference', to: [{ type: 'booking' }], title: 'Booking' },
    { name: 'amount', type: 'number', title: 'Amount' },
    { name: 'paymentDate', type: 'datetime', title: 'Payment Date' },
    { name: 'paymentMethod', type: 'string', title: 'Payment Method', options: { list: ['Credit Card', 'Debit Card', 'PayPal', 'Cash'] } }
  ]
};


                                simple Entity-Relationship Diagram (ERD)

Entities:
User
Attributes: Full Name, Email, Password, Contact Number, User Type (Renter/Owner)

Car
Attributes: Car Name, Car Brand, Car Type, Rental Price, Availability
Relationship: Belongs to one User (Owner)

Booking
Attributes: Start Date, End Date, Total Cost
Relationships:

Refers to one Car
Refers to one User (Renter)
Review
Attributes: Rating, Comment
Relationships:

Refers to one Car
Refers to one User (Reviewer)
Payment
Attributes: Amount, Payment Date, Payment Method
Relationship: Refers to one Booking

(diagram is provided to show the relation between entities in our marketplace)