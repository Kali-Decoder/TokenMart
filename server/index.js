const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

mongoose.connect(
  process.env.MONGODB, // Make sure you have your MongoDB URI in your .env file
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(express.json());

// Use the product routes
app.use("/api", productRoutes);

const port = process.env.PORT || 8000; // You can set the port in your .env file or use 8000 as a default

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
