require('dotenv').config(); 
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8000;
const mongoDB = require('./db');

// 1. Connect to MongoDB database
mongoDB();

// 2. CORS and Body Parsing Middleware (Must be placed BEFORE routes)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

// 3. Serve Uploaded Files Publicly (Crucial for displaying product images/videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. API Routes
app.use('/api/products', require("./Routes/productRoutes"));
app.use('/api/orders', require("./Routes/orderRoutes")); 

//  5. Admin Authentication Route Gateway
app.use('/api/auth', require("./Routes/authRoutes")); 

// 6. Contact Routes
const contactRoutes = require('./Routes/contactRoutes');
app.use('/api/contact', contactRoutes);

// 7. Test Route
app.get('/', (req, res) => {
  res.send('Clothing Store Backend is Running!');
});

// 8. Start Server
app.listen(port, () => {
  console.log(`Your server is started and running on port no ${port}`);
});