const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const getNewProduct = asyncHandler(async(req, res) => {
   try{
     const newProducts = await productModel.find().sort({_id: -1}).limit(5);
     res.json(newProducts);
   }
   catch(error){
     console.error(error);
     res.status(400).json(error.message)
   }
})

module.exports = getNewProduct