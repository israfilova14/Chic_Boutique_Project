const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const filterProducts = asyncHandler(async(req, res) => {
  try{
    const {checked, radio} = req.body;
    let args = {};
    if(checked.length > 0){
       args.category = checked
    }
    if(radio.length){
      args.price = {$gte: radio[0], $lte: radio[1]}
    }

    const products = await productModel.find(args);
    res.json(products);
  }catch(err){
    console.error(err);
    res.status(500).json({error: "Server Error"})
  }
})

module.exports = filterProducts