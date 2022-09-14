const express = require("express");
const inventoryControllers = require("../controllers/inventories.controler");
const limiter = require("../middleware/limeter");
const viewCount = require("../middleware/viewCount");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("inventory found");
// });

// router.post("/inventory", (req, res) => {
//   res.send("inventory added");
// });

router
  .route("/")
  .get(inventoryControllers.getInventories)
  .post(inventoryControllers.saveInventory);

router
  .route("/:id")
  .get(viewCount, limiter, inventoryControllers.getInventoryDetail)
  .patch(inventoryControllers.updateInventory)
  .delete(inventoryControllers.deleteInventory);

module.exports = router;
