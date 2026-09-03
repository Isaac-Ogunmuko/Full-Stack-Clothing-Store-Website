const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Modals/user'); 

async function createAdmin() {
    try {
        console.log("Connecting directly to the database...");

        // 🔗 HARDCODED SOLUTION: Type your password strictly inside this raw string block.
        // REMOVE 'YOUR_PASSWORD' AND PUT YOUR ACTUAL TEXT PASSWORD HERE.
        // Ensure there are no spaces or < > brackets around it!
        const directURI = "mongodb+srv://isaacogunmuko_db_user:EluxFashion2026@cluster0.qri3xfq.mongodb.net/elux_fashion?retryWrites=true&w=majority&appName=Cluster0";

        await mongoose.connect(directURI);
        console.log("Successfully connected!");

        const adminEmail = "parents-email@gmail.com"; 
        const plainTextPassword = "SuperSecurePassword123!"; 

        const existingUser = await User.findOne({ email: adminEmail.toLowerCase() });
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

        if (existingUser) {
            existingUser.password = hashedPassword;
            await existingUser.save();
            console.log("\n🔄 Admin password successfully reset!");
            console.log(`Log in credentials:\nEmail: ${adminEmail}\nPassword: ${plainTextPassword}\n`);
            process.exit(0);
        }

        console.log("Creating administrative user document...");
        await User.create({
            name: "Admin Parent",
            email: adminEmail,
            password: hashedPassword, 
            role: "admin"
        });

        console.log("\n🎉 SUCCESS! Your first admin account has been safely injected into your MongoDB Cloud Cluster!");
        console.log(`Log in credentials:\nEmail: ${adminEmail}\nPassword: ${plainTextPassword}\n`);
        
        process.exit(0); 
    } catch (error) {
        console.error("❌ Fatal error executing the database seed script:", error);
        process.exit(1);
    }
}

createAdmin();