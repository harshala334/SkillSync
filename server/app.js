const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the backend! 🎉");
});

// Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

module.exports = app;
