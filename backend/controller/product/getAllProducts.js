const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const getAllProducts = asyncHandler(async(req, res) => {
   try{
     const allProducts = await productModel.find({})
     .populate('category')
     .sort({createdAt: -1});

     res.json(allProducts)
     
   }
   catch(error){
     console.error(error);
     res.status(500).json({error: "Server Errorr"})
   }
})

module.exports = getAllProducts