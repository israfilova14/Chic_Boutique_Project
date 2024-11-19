const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const calculateTotalSales = asyncHandler(async(req, res) => {
    try{
       const orders = await orderModel.find();
       const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
       res.json({totalSales});
    }
    catch(err){
       res.status(500).json({
        error: err.message
       })
    }
})

module.exports = calculateTotalSales