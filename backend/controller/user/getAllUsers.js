const asyncHandler = require("../../middleware/asyncHandler")
const userModel = require("../../models/userModel.js")

const getAllUsers = asyncHandler(async(req, res) => {
   const users = await userModel.find({});
   res.json(users)
})

module.exports = getAllUsers