const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const markOrderAsPaid = asyncHandler(async(req, res) => {
  try{
     const order = await orderModel.findById(req.params.id);
     if(order){
      order.isPaid = true,
      order.paidAt = Date.now(),
      order.paymentResult = {
        id: req.body._id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }

      const updateOrder = await order.save();
      res.status(200).json(updateOrder)
     }
     else{
       res.status(404);
       throw new Error("Order not found !")
     }
  }
  catch(err){
     res.status(500).json({
       error: err.message
     })
  }
})
module.exports = markOrderAsPaid