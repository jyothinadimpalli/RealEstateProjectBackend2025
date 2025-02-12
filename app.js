const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Property = require("./models/Property");
const Booking = require("./models/Booking");
const propertyRoutes = require("./routes/property");
const userRoutes = require("./routes/auth"); 
require("dotenv").config();

const app = express();
app.use(cors());
//app.use(cors({
  //origin: "http://localhost:4200" // or your frontend's URL
//}));
app.use(express.json());
app.use("/api/auth", userRoutes);  
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    //seedDatabase();  // Seed the database after connecting
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Setup routes
app.use("/api/properties", propertyRoutes);
app.get("/", (req, res) => {
  res.send("Real Estate API is running...");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
