const express = require('express'); 
const router = express.Router(); 
const User = require('../Modals/user'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

// 🔒 Admin Login Endpoint
router.post('/login', async (req, res) => { 
  try { 
    const { email, password } = req.body; 
    const cleanEmail = email ? email.toLowerCase().trim() : "";
    const cleanPassword = password ? password.trim() : "";

    console.log("--- LOGIN ATTEMPT ---");
    console.log("Attempting email lookup for:", JSON.stringify(cleanEmail));
    console.log("Raw password received from frontend:", JSON.stringify(password));
    console.log("Cleaned password being compared:", JSON.stringify(cleanPassword));

    // 1. Locate the admin record by email
    const admin = await User.findOne({ email: cleanEmail }); 
    if (!admin) {
        console.log("❌ User not found in database!");
        return res.status(401).json({ message: "Invalid credentials" }); 
    }

    console.log("✅ User found in database:", admin.email);
    console.log("User Role in DB:", admin.role);

    // 2. Validate the encrypted password 
    const isMatch = await bcrypt.compare(cleanPassword, admin.password); 
    console.log("Password match result:", isMatch);

    if (!isMatch) {
        console.log("❌ Password comparison failed!");
        return res.status(401).json({ message: "Invalid credentials" }); 
    }

    const userRole = admin.role || 'admin';

    const token = jwt.sign( 
      { id: admin._id, role: userRole }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '1d' } 
    ); 

    console.log("🎉 Login successful! Token issued with role:", userRole);
    res.json({ 
      token, 
      message: "Welcome back to your dashboard!", 
      admin: { name: admin.name, email: admin.email, role: userRole } 
    }); 
  } catch (error) { 
    console.error("Login server error:", error);
    res.status(500).json({ error: error.message }); 
  } 
});

// 🔑 MASTER ADMIN SEED GATEWAY
router.get('/register-master-admin', async (req, res) => {
    try {
        const adminEmail = "Isaac.Ogunmuko@gmail.com".toLowerCase().trim();
        const plainTextPassword = "Password123!";

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

        // Explicitly delete any potential duplicate/messy records first
        await User.deleteMany({ email: adminEmail });

        // Create fresh clean master admin document
        await User.create({
            name: "Isaac Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        res.send("<h2>🎉 SUCCESS! Master Admin account freshly wiped and re-created in MongoDB! Go log in now using Password123!</h2>");
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;