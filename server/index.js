require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const formData = require('express-form-data');
const connection = require("./db");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const passwordResetRoutes = require("./routes/passwordReset.js");
const formRoutes = require('./routes/formRoutes.js');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
// Error Handling Middleware:
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

// Additional middleware for handling form data
app.use(formData.parse())


app.use('/api', formRoutes);

app.get("/" , (req, res)=> {
  res.send("welcome to my sign-up page!")
})
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));