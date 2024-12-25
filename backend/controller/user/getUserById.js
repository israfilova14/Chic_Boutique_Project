const asyncHandler = require("../../middleware/asyncHandler")
const userModel = require("../../models/userModel")

const getUserById = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.params.id).select('-password')
   if(user){
      res.json(user)
   }
   else{
     res.status(404);
     throw new Error("User not found")
   }
})

module.exports = getUserById