const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const getProductById = asyncHandler(async(req, res) => {
  try{
     const product = await productModel.findById(req.params.id);

     if(product){
       return res.json(product)
     }
     else{
       res.status(404);
       throw new Error("Product not found")
     }
  }
  catch(error){
    console.error(error);
    res.status(404).json(
      {
        error: "Product not found"
      }
    )
  }
})

module.exports = getProductById