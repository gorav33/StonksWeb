// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Needed for 'uploads' folder
const marketRoutes = require('./routes/markitRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Allow frontend access (adjust CORS if needed)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());

// ✅ Serve uploaded files (e.g., base64 saved as images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use('/api/market', marketRoutes);

// ✅ Bind to 0.0.0.0 for external access via port forwarding
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
