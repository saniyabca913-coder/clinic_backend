const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log("SERVER FILE LOAD HO GAYI ✅");

// MongoDB URL - Apna password wala URL daal
const MONGO_URL = 'mongodb+srv://clinicAdmin:j34LAP2YdZwXaL5M@cluster0.q0tgxvm.mongodb.net/clinic_db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB Atlas Connected ✅ Permanent DB'))
  .catch(err => console.log('DB Error:', err.message));

// Schema
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  date: { type: String, required: true },
  time: { type: String, required: true },
  service: String // service kiya, message nahi
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API: Naya appointment book karna
app.post('/api/appointment', async (req, res) => {
  console.log("ROUTE HIT HUA 🔥🔥🔥"); 
  try {
    console.log('Data aaya:', req.body);
    
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    
    console.log('DB me save ho gaya ✅');
    res.json({ success: true, message: 'Appointment booked successfully!' });
    
  } catch (err) {
    console.log('Error aaya:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Server Start
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});