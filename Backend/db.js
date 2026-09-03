const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        // 🔗 UPDATED SOLUTION: Using a symbol-free, active system password string
       const connectionURL = "mongodb+srv://isaacogunmuko_db_user:EluxFashion2026@cluster0.qri3xfq.mongodb.net/elux_fashion?retryWrites=true&w=majority&appName=Cluster0";

        console.log("Opening cloud connection path...");
        await mongoose.connect(connectionURL);
        console.log('Connected to the database successfully!');
    } catch (err) {
        console.error(`Error connecting to the database:\n${err.message}`);
        process.exit(1); 
    }
};

module.exports = mongoDB;
