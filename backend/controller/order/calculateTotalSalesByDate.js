const asyncHandler = require("../../middleware/asyncHandler");
const orderModel = require("../../models/orderModel");

const calculateTotalSalesByDate = asyncHandler(async(req, res) => {
  try{
    const salesByDate  = await orderModel.aggregate([
      {
        $match: {
          isPaid: true
        }
      },
      {
        $group: {
          _id: {
            $datToString: {
              format: '%Y-%m-%d',
              date: '$paidAt'
            }
          },
          totalSales: {
            $sum: "$totalPrice"
          }
        }
      }
    ]);
    res.json(salesByDate)
  }
  catch(err){
    console.error(err)
  }
})

module.exports = calculateTotalSalesByDate