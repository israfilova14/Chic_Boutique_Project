const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const getUserOrders = asyncHandler(async(req, res) => {
    try{
      const orders = await orderModel.find({user: req.user._id});
      res.json(orders)
    }
    catch(error){
      res.status(500).json({
        error: error.message
      })
    }
})

module.exports = getUserOrders