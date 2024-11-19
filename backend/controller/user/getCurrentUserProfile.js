const asyncHandler = require("../../middleware/asyncHandler");
const userModel = require("../../models/userModel.js");

const getCurrentUserProfile = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.user._id);
   if(user){
      res.json({
         _id: user._id,
         username: user.username,
         email: user.email
      })
   }
   else{
     res.status(404);
     throw new Error("User not found");
   }
})
module.exports = getCurrentUserProfile