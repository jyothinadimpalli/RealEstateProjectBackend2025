const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Property = require("./models/Property");
const Booking = require("./models/Booking");
const propertyRoutes = require("./routes/property");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sample Data
const users = [
  { name: "John Doe", email: "johndoe@example.com", password: "password123", role: "Admin", phoneNumber: "123-456-7890" },
  { name: "Jane Smith", email: "janesmith@example.com", password: "password123", role: "Buyer", phoneNumber: "987-654-3210" },
  { name: "Emily Brown", email: "emilybrown@example.com", password: "password123", role: "Builder", phoneNumber: "555-555-5555" }
];

const properties = [
  { title: "Modern 2 BHK Apartment", description: "A beautiful modern 2 BHK apartment in a prime location.", price: 5000000, location: { latitude: 17.385044, longitude: 78.486671, address: "Hyderabad, Telangana" }, propertyType: "Apartment", size: 1200, bedrooms: 2, bathrooms: 2, amenities: ["Swimming Pool", "Gym", "Parking"], builderId: null },
  { title: "Spacious Independent House", description: "A spacious 3 BHK house with a large backyard.", price: 7500000, location: { latitude: 17.425000, longitude: 78.367000, address: "Hyderabad, Telangana" }, propertyType: "Individual House", size: 2500, bedrooms: 3, bathrooms: 3, amenities: ["Garden", "Parking", "Security"], builderId: null }
];

const bookings = [
  { userId: null, propertyId: null, status: "Pending", bookingDate: new Date() }
];

// Function to Seed Data
async function seedDatabase() {
  try {
    // Remove all existing data to ensure fresh data is inserted
    await User.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();

    // Insert Users
    const insertedUsers = await User.insertMany(users);
    console.log("Users inserted");

    // Link builderId for properties with the actual Builder User
    properties[0].builderId = insertedUsers[2]._id; // Assign builder to the first property
    properties[1].builderId = insertedUsers[2]._id; // Assign builder to the second property

    // Insert Properties
    const insertedProperties = await Property.insertMany(properties);
    console.log("Properties inserted");

    // Link propertyId and userId for booking
    bookings[0].userId = insertedUsers[1]._id; // Assign Buyer to booking
    bookings[0].propertyId = insertedProperties[0]._id; // Assign Property to booking

    // Insert Bookings
    await Booking.insertMany(bookings);
    console.log("Bookings inserted");

  } catch (error) {
    console.log("Error inserting data:", error);
  }
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    seedDatabase();  // Seed the database after connecting
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Setup routes
app.use("/properties", propertyRoutes);
app.get("/", (req, res) => {
  res.send("Real Estate API is running...");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
