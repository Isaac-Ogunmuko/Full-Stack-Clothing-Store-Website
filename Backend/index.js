const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./db');

mongoDB();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// Updated routes for your clothing store
app.use('/api/products', require("./Routes/productRoutes")); 
app.use('/api/orders', require("./Routes/orderRoutes"));     

app.get('/', (req, res) => {
  res.send('Clothing Store Backend is Running!');
})

app.listen(port, () => {
  console.log(`Your server is started and running on port no ${port}`);
})