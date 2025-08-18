const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the backend! 🎉");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
