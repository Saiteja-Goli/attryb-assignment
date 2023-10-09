const express = require("express");
const inventoryModel = require("../models/inventoryModel");
const secHandCarRouter = express.Router();

// GET route to retrieve all inventory items along with matching OEM data
secHandCarRouter.get("/", async (req, res) => {
  try {
    // Use an aggregation pipeline to perform a lookup and match operation
    const secHandCars = await inventoryModel.aggregate([
      {
        $lookup: {
          from: "oem_specs", 
          localField: "carTitle", 
          foreignField: "modelName", 
          as: "oemData",
        },
      },
      {
        $unwind: "$oemData",
      },
    ]);

    res.json(secHandCars);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching inventory data." });
  }
});

module.exports = secHandCarRouter;
