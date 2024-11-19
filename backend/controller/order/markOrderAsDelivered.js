const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const markOrderAsDelivered = asyncHandler(async(req, res) => {
  try{
    const order = await orderModel.findById(req.params.id);
    if(order){
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder)
    }
    else{
      res.status(404);
      throw new Error("Order not found")
    }
  }
  catch(err){
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = markOrderAsDelivered