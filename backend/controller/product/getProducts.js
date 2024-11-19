const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const getProducts = asyncHandler(async(req, res) => {
   try{
     const pageSize = 6;
     const keyword = req.query.keyword 
     ? 
     {name: {$regex: req.query.keyword}, $options: "i"}
     :
     {}
     const count = await productModel.countDocuments({...keyword});
     const products = await productModel.find({...keyword}).limit(pageSize);
     res.json(
      {
        products, 
        page:1, 
        pages: Math.ceil(count / pageSize), 
        hasMore: false
      }
    );
   }
   catch(error){
     console.error(error);
     res.status(500).json(
      {
        error: "Server error"
      }
     )
   }
})

module.exports = getProducts