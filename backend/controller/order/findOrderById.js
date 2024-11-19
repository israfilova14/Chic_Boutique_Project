// const asyncHandler = require("../../middleware/asyncHandler");
// const orderModel = require("../../models/orderModel");

// const findOrderById = asyncHandler(async(req, res) => {
//   try{
//     const order = await orderModel.findById(req.params.id).populate("user", "username", "email");

//     if(order){
//       res.json(order)
//     }
//     else{
//       res.status(404)
//       throw new Error("Order not found")
//     }
//   }
//   catch(err){
//     res.status(500).json({
//       error: err.message
//     })
//   }
// })

// module.exports = findOrderById
const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const findOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "username email"); // Düzgün yazılmış user schema
    console.log(req?.params?.id);
    
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = findOrderById;
