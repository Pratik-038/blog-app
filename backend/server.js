const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/posts", require("./routes/postRoutes"));

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.log(err));