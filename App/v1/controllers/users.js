const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  validateUserLogin,
  validateUserRegister,
} = require("../../validatingMethods/validate");
const Repository = require("../../repository/user");

exports.login = async (req, res) => {
  try {
    const { error } = validateUserLogin(
      _.pick(req.body, ["email", "password"])
    );
    if (error)
      return res.status(400).json({
        type: "Invalid",
        message: "Something went wrong",
        data: error.details[0].message,
      });
    let user = await Repository.findSpecific(_.pick(req.body, ["email"]));
    if (!user)
      return res.status(400).json({
        type: "Invalid",
        message: "Invalid User",
        data: req.body.email,
      });
    const compareUser = await bcrypt.compare(req.body.password, user.password);
    if (!compareUser)
      return res.status(400).json({
        type: "Invalid",
        message: "Invalid user name and password",
        data: req.body.email,
      });
    const token = user.generateToken();
    return res.status(200).json({
      type: "Success",
      message: "Logged In",
      data: token,
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wrong",
      data: err,
    });
  }
};
exports.Register = async (req, res) => {
  try {
    const { error } = validateUserRegister(
      _.pick(req.body, ["name", "email", "password"])
    );

    if (error)
      return res.status(400).json({
        type: "Invalid",
        message: "Something went wrong",
        data: error.details[0].message,
      });

    let user = await Repository.findSpecific({
      email: _.pick(req.body, ["email"]).email,
    });
    if (user)
      return res.status(400).json({
        type: "Invalid",
        message: "User Already Exists!!",
        data: req.body.email,
      });

    let payload = { ..._.pick(req.body, ["name", "email", "password"]) };

    const salt = await bcrypt.genSalt(10);

    payload.password = await bcrypt.hash(payload.password, salt);

    return res.status(200).json({
      type: "Success",
      message: "User Registered",
      data: await Repository.createUser(payload),
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wrong",
      data: err,
    });
  }
};
exports.get = async (req, res) => {
  try {
    return res.status(200).json({
      type: "Success",
      message: "Data Fetched",
      data: await Repository.getAll(),
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wrong",
      data: err,
    });
  }
};
