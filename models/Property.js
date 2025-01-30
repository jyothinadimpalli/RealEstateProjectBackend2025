const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: { latitude: Number, longitude: Number, address: String },
  propertyType: { type: String, enum: ["Apartment", "Individual House"] },
  size: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  builderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [String],
  status: { type: String, enum: ["Available", "Sold"], default: "Available" }
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
