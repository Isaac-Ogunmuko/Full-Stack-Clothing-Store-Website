require('dotenv').config(); 
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const mongoDB = require('./db');


mongoDB();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/products', require("./Routes/addProduct"));
app.use('/api/orders', require("./Routes/orderRoutes")); 

app.use('/api/auth', require("./Routes/authRoutes")); 


const contactRoutes = require('./Routes/contactRoutes');
app.use('/api/contact', contactRoutes);


app.get('/', (req, res) => {
  res.send('Clothing Store Backend is Running!');
});


app.listen(port, () => {
  console.log(`Your server is started and running on port no ${port}`);
});