const asyncHandler = require("../../middleware/asyncHandler")
const userModel = require("../../models/userModel")

const updateUserById  = asyncHandler(async(req, res) => {
   const user = await userModel.findById(req.params.id)

   if(user){
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      })
   }
   else{
      res.status(404)
      throw new Error("User not found")
   }
})

module.exports = updateUserById