const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  bookingDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
