const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Root endpoint (optional message)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Handle empty date parameter
  if (!date) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),    // Current Unix timestamp in milliseconds
      utc: currentDate.toUTCString(), // Current UTC string
    });
  }

  // Parse the date (handling Unix timestamp or valid date string)
  let parsedDate;
  if (!isNaN(date)) {
    // If the date is a Unix timestamp
    parsedDate = new Date(parseInt(date));
  } else {
    // Otherwise, treat it as a date string
    parsedDate = new Date(date);
  }

  // Check if the date is invalid
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the response with both Unix and UTC values
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
