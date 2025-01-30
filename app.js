const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");  // Adjust path if necessary
const Property = require("./models/Property");  // Adjust path if necessary
const PORT = process.env.PORT || 5000;
const propertyRoutes = require("./routes/property");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();


app.use("/properties", propertyRoutes);
app.get("/", (req, res) => {
  res.send("Real Estate API is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    seedDatabase();
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Sample Data to Insert
const sampleUsers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",  // You should hash this password in real use
    role: "Admin",
    phoneNumber: "1234567890"
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "password123",
    role: "Buyer",
    phoneNumber: "9876543210"
  }
];

const sampleProperties = [
  {
    title: "Luxury Apartment in City Center",
    description: "A luxurious 2BHK apartment with all modern amenities.",
    price: 8000000,
    location: { latitude: 17.385044, longitude: 78.486671, address: "Hyderabad, Telangana" },
    propertyType: "Apartment",
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Gym", "Pool", "Parking", "Security"],
    builderId: null,  // We'll set this later, after inserting Users
    status: "Available"
  }
];

// Function to Seed Data
async function seedDatabase() {
  try {
    // Remove all existing data (to ensure fresh data is inserted)
    await User.deleteMany();
    await Property.deleteMany();

    // Insert new sample data
    const users = await User.insertMany(sampleUsers);
    console.log("Users Inserted: ", users);

    // Set builderId to one of the inserted users (example: using the first user)
    sampleProperties[0].builderId = users[0]._id;

    const properties = await Property.insertMany(sampleProperties);
    console.log("Properties Inserted: ", properties);

    // Close the connection
  //  mongoose.connection.close();
  } catch (error) {
    console.log("Error inserting data:", error);
   // mongoose.connection.close();
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));