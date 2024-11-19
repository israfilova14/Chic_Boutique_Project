const mongoose = require("mongoose");

const connectDB = async () => {
    try{
       await mongoose.connect(process.env.DATABASE_URI);
       console.log(`Successfully connected to database`);
       
    }
    catch(error){
      console.error(`Error: ${error.message}`)
    }
} 

module.exports = connectDB