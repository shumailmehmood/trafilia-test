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
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Repository.findSpecific(_.pick(req.body, ["email"]));
    if (!user) return res.status(400).send("Invalid user");
    const compareUser = await bcrypt.compare(req.body.password, user.password);
    if (!compareUser)
      return res.status(400).send("Invalid user name and password");
    const token = user.generateToken();
    res.send(token);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.Register = async (req, res) => {
  try {
    const { error } = validateUserRegister(
      _.pick(req.body, ["name", "email", "password"])
    );

    if (error) return res.status(400).send(error.details[0].message);

    let user = await Repository.findSpecific({
      email: _.pick(req.body, ["email"]),
    });
    if (user) return res.status(400).send("User Already Exists!!");

    let payload = { ..._.pick(req.body, ["name", "email", "password"]) };

    const salt = await bcrypt.genSalt(10);

    payload.password = await bcrypt.hash(payload.password, salt);

    return res.send(await Repository.createUser(payload));
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.get = async (req, res) => {
  try {
    return res.send(await Repository.getAll());
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
