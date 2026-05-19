const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://clinicsite-eight.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

console.log("SERVER FILE LOAD HO GAYI ✅");

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://clinicAdmin:j34LAP2YdZvXaL5M@cluster0.q0tgxva.mongodb.net/clinic_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// Routes
app.get('/', (req, res) => {
  res.send('Clinic Backend API is Running 🚀');
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST - Create Appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, phone, date, time, message } = req.body;
    
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      message
    });

    await newAppointment.save();
    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully!',
      data: newAppointment 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to book appointment',
      error: error.message 
    });
  }
});

// GET - Get All Appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
