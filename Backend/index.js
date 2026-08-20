const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./db');

// 1. Connect to MongoDB database
mongoDB();

// 2. CORS and Body Parsing Middleware (Must be placed BEFORE routes)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());

// 3. API Routes
app.use('/api/products', require("./Routes/productRoutes")); 
app.use('/api/orders', require("./Routes/orderRoutes")); 

// 4. Test Route
app.get('/', (req, res) => {
  res.send('Clothing Store Backend is Running!');
});

// 5. Start Server
app.listen(port, () => {
  console.log(`Your server is started and running on port no ${port}`);
});