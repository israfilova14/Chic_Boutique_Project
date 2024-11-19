const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const countTotalOrders = asyncHandler(async(req, res) => {
   try{
     const totalOrders = await orderModel.countDocuments();
     res.json({totalOrders})
   }
   catch(err){
    res.status(500).json({
      error: err.message
    })
   }
})

module.exports = countTotalOrders