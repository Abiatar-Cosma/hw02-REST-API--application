const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../../models/user");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers/sendEmail");

const BASE_URL = process.env.BASE_URL;

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signup = async (req, res, next) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "Email in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "robohash" }, true);

    const verificationToken = nanoid();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
      verify: false,
    });

    const verifyLink = `${BASE_URL}/users/verify/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Email Verification",
      html: `<p>Click <a href='${verifyLink}'>aici</a> pentru a-ti verifica adresa de e-mail.</p>`,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
