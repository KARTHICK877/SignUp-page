const mongoose = require("mongoose");

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

module.exports = () => {
    const connectionParam = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.DB, connectionParam);

    mongoose.connection.on("connected", () => {
        console.log('Connected to the database successfully');
    });

    mongoose.connection.on("error", (err) => {
        console.error('Error connecting to the database:', err);
    });
};
