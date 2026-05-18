const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected ✅'))
  .catch((err) => console.log('MongoDB Error:', err));

// Test Route - Root
app.get("/", (req, res) => {
  res.json({ 
    message: "Clinic Backend API is Running 🚀",
    status: "Live",
    version: "1.0.0"
  });
});

// Get All Appointments
app.get("/api/appointments", async (req, res) => {
  try {
    res.json([]); // Abhi empty array bhej rahe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Appointment 
app.post("/api/appointments", async (req, res) => {
  try {
    const newAppointment = req.body;
    console.log("New appointment:", newAppointment);
    res.status(201).json({ message: "Appointment created", data: newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
