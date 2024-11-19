// PACKAGES
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// UTILITIES
const connectDB = require('./configuration/db.js');  
const app = express();
const userRouter = require('./routes/userRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js')
const productRouter = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

// CORS CONFIGURATION
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',   
  credentials: true,   
};

app.use(cors(corsOptions));   

// MIDDLEWARES
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));   
app.use(cookieParser());   

// ROUTES
app.use("/api", userRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
   res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})
// SERVER SETUP
const PORT = process.env.PORT || 5050;
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
   });
});
