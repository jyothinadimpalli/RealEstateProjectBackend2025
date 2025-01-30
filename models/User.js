const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "Buyer", "Builder"], default: "Buyer" },
  phoneNumber: String,
  savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
