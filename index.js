const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dbConnect = require("./utils/dbConnect");
const inventoryRoutes = require("./routes/inventory.route.js");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

// Apply the rate limiting middleware to all requests
// app.use(limiter);

// app.use(viewCount);

dbConnect();

app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/test.html");
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "test",
    },
  });
});

app.all("*", (req, res) => {
  res.send("No route found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening to port", port);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
