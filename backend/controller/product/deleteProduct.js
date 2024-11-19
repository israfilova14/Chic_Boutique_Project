const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const deleteProduct = asyncHandler(async(req, res) => {
   try{
     const deletedProduct  = await productModel.findByIdAndDelete(req.params.id);
     res.json(deletedProduct)
   }
   catch(error){
     console.error(error);
     res.status(500).json({error: "Server error"})
   }
})
module.exports = deleteProduct