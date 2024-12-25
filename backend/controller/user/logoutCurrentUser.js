const asyncHandler = require("../../middleware/asyncHandler")

const logoutCurrentUser = asyncHandler(async(req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
      });
    
      res.status(200).json({ message: "Logged out successfully" })
})

module.exports = logoutCurrentUser