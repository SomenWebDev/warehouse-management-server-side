const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihwth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client
      .db("inventoryShop")
      .collection("inventory");

    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventories = await cursor.toArray();
      res.send(inventories);
    });

    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const inventory = await inventoryCollection.findOne(query);
      res.send(inventory);
    });

    // Adding Product

    app.post("/inventory", async (req, res) => {
      const newInventory = req.body;
      newInventory.quantity = parseInt(newInventory.quantity);
      const result = await inventoryCollection.insertOne(newInventory);
      res.send(result);
    });

    // Delete Product

    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

    // updating product

    app.put("/inventory/increase/:id", async (req, res) => {
      const id = req.params.id;
      const quantity = parseInt(req.body.quantity);
      const query = { _id: ObjectId(id) };
      const inventory = await inventoryCollection.findOne(query);
      const newQuantity = quantity + inventory.quantity;
      const updateInventory = await inventoryCollection.updateOne(query, {
        $set: { quantity: newQuantity },
      });

      res.send(updateInventory);
    });

    app.put("/inventory/decrease/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const inventory = await inventoryCollection.updateOne(query, {
        $inc: { quantity: -1 },
      });

      res.send(inventory);
    });

    // app.get("/selectedItems", async (req, res) => {
    //   const token = req.headers.token;
    //   const { email } = jwt.verify(token, process.env.JWT_TOKEN);
    //   const query = { email };
    //   const cursor = inventoryCollection.find(query);
    //   const inventories = await cursor.toArray();
    //   res.send(inventories);
    // });

    // app.post("/login", async (req, res) => {
    //   const token = jwt.sign(req.body, process.env.JWT_TOKEN);
    //   res.send({ token });
    // });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("getting connected");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
