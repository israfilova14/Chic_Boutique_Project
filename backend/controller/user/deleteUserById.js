const asyncHandler = require("../../middleware/asyncHandler");
const userModel = require("../../models/userModel");

const deleteUserById = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.params.id);
   if(user){
     if(user.isAdmin){
         res.status(400)
         throw new Error('Cannot delete admin user')
     }
     await userModel.deleteOne({_id: user._id});
     res.json({message: "User removed"})
   }
   else{
     res.status(404);
     throw new Error("User not found")
   }
})
module.exports = deleteUserById