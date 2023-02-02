const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name, email: this.email },
    "jwtPrivateKey"
  );
  return token;
};
module.exports = mongoose.model("User", userSchema);
