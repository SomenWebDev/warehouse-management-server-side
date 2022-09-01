const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dbConnect = require("./utils/dbConnect");
const inventoryRoutes = require("./routes/inventory.route.js");
const viewCount = require("./middleware/viewCount");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Apply the rate limiting middleware to all requests
// app.use(limiter);

// app.use(viewCount);

dbConnect();

app.use("/api/inventory", inventoryRoutes);

async function run() {
  try {
    // await client.connect();
    // const inventoryCollection = client
    //   .db("inventoryShop")
    //   .collection("inventory");
    // app.get("/inventory", async (req, res) => {
    //   const query = {};
    //   const cursor = inventoryCollection.find(query);
    //   const inventories = await cursor.toArray();
    //   res.send(inventories);
    // });
    // app.get("/inventory/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const inventory = await inventoryCollection.findOne(query);
    //   res.send(inventory);
    // });
    // // Adding Products
    // app.post("/inventory", async (req, res) => {
    //   const newInventory = req.body;
    //   newInventory.quantity = parseInt(newInventory.quantity);
    //   const result = await inventoryCollection.insertOne(newInventory);
    //   res.send(result);
    // });
    // // Delete Product
    // app.delete("/inventory/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await inventoryCollection.deleteOne(query);
    //   res.send(result);
    // });
    // // updating product
    // app.put("/inventory/increase/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const quantity = parseInt(req.body.quantity);
    //   const query = { _id: ObjectId(id) };
    //   const inventory = await inventoryCollection.findOne(query);
    //   const newQuantity = quantity + inventory.quantity;
    //   const updateInventory = await inventoryCollection.updateOne(query, {
    //     $set: { quantity: newQuantity },
    //   });
    //   res.send(updateInventory);
    // });
    // app.put("/inventory/decrease/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const inventory = await inventoryCollection.updateOne(query, {
    //     $inc: { quantity: -1 },
    //   });
    //   res.send(inventory);
    // });
    // // app.get("/selectedItems", async (req, res) => {
    // //   const token = req.headers.token;
    // //   const { email } = jwt.verify(token, process.env.JWT_TOKEN);
    // //   const query = { email };
    // //   const cursor = inventoryCollection.find(query);
    // //   const inventories = await cursor.toArray();
    // //   res.send(inventories);
    // // });
    // // app.post("/login", async (req, res) => {
    // //   const token = jwt.sign(req.body, process.env.JWT_TOKEN);
    // //   res.send({ token });
    // // });
  } finally {
  }
}
run().catch(console.dir);

app.all("*", (req, res) => {
  res.send("No route found");
});

app.get("/", (req, res) => {
  res.send("getting connected");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
