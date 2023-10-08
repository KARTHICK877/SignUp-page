require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Added '/' before 'api/auth'

const port = process.env.PORT || 8080; // Use uppercase 'PORT'
app.listen(port, () => console.log(`Listening on port ${port}...`));
