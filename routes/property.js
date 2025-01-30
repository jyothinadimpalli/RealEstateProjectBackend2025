const express = require("express");
const Property = require("../models/Property");

const router = express.Router();

// Add a new property
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get single property`
router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
});

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
