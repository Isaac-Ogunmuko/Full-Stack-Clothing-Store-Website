const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../Modals/contact'); // Respecting your 'Modals' directory structure

// Configure the email transporter with local TLS ignore options
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Isaac.Ogunmuko@gmail.com',
    pass: 'saoileecpkpvylos'
  },
  tls: {
    rejectUnauthorized: false // 🛡️ Bypasses local self-signed certificate errors during development
  }
});

// 📭 GET: Fetch all customer inquiries for the Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Newest inquiries first
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ success: false, error: "Server error while fetching messages." });
  }
});

// 📬 POST: Receive new customer message, save to DB, and email notification
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save contact message to MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // 2. Set up email options for notification (using replyTo so you can easily reply to the customer)
    const mailOptions = {
      from: '"Elux Fashion Contact" <Isaac.Ogunmuko@gmail.com>',
      replyTo: email,
      to: 'Isaac.Ogunmuko@gmail.com',
      subject: `New Customer Message from ${name} - ${subject || 'Elux Fashion'}`,
      text: `You have received a new contact message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    // 3. Send the notification email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      success: true, 
      message: "Message sent successfully and email notification dispatched!" 
    });

  } catch (err) {
    console.error("Error processing contact message:", err);
    res.status(500).json({ success: false, error: "Server error while sending message." });
  }
});

module.exports = router;