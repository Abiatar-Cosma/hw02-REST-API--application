const User = require("../../models/user");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Verification succesful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
