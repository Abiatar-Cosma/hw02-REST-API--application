const Joi = require("joi");
const User = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

const BASE_URL = process.env.BASE_URL;

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required field email" });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verifyLink = `${BASE_URL}/users/verify/${user.verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Email Verification - Resend",
      html: `<p>Click <a href="${verifyLink}">aici</a> pentru a-ți verifica adresa de e-mail.</p>`,
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
