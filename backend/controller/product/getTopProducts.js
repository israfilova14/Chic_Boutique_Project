const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const getTopProducts = asyncHandler(async(req, res) => {
   try{
     const products = await productModel.find({}).sort({rating: -1}).limit(4);
     console.log(products);
     
     res.json(products);
   }
   catch(error){
     console.error(error)
     res.status(400).json(error.message)
   }
})

module.exports = getTopProducts