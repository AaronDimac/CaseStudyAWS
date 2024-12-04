const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static("public")); // Serve static files from 'public'

// Serve users.json
app.get("/users.json", (req, res) => {
  res.sendFile(__dirname + "/users.json");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
