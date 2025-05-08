const { types, required } = require("joi");
const { Schema, model } = require("mongoose");
const { token } = require("morgan");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: {
        type: String,
        default: null,
      },
  }, {versionKey: false, timestamps: true});


  const User = model('user', userSchema);

  module.exports = User;
  
