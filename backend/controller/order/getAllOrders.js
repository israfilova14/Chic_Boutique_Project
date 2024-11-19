const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const getAllOrders = asyncHandler(async(req, res) => {
   try{
     const orders = await orderModel.find({}).populate('user', "id", "username");
     res.json(orders)
   }catch(error){
     res.status(500).json({error: error.message})
   }
})

module.exports = getAllOrders;