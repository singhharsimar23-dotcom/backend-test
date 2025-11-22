// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables from .env file for local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// --- Configuration ---
const app = express();
const PORT = process.env.PORT || 5000;
// Use MONGODB_URI from environment variables (either .env or Vercel config)
const MONGODB_URI = process.env.MONGODB_URI; 

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Body parser for JSON requests

// --- Database Connection ---
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set. Cannot connect to database.');
} else {
    mongoose.connect(MONGODB_URI)
      .then(() => console.log('✅ MongoDB Connected'))
      .catch(err => console.error('❌ MongoDB Connection Error:', err));
}


// --- Routes ---
app.use('/api/tasks', taskRoutes);

// Simple root route for Vercel/health check
app.get('/', (req, res) => {
  res.send('Task List API is running!');
});

// --- Server Start ---
// Only listen on a port if running locally (not as a Vercel serverless function)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running locally on http://localhost:${PORT}`));
}

module.exports = app; // Export the app for Vercel to use as a serverless function