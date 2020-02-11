const User = require('../../schemas/user');
const bcrypt = require('bcrypt');
const { validateUserLogin } = require('../../validatingMethods/validate');
exports.login = async (req, res) => {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid user');
    const compareUser = await bcrypt.compare(req.body.password, user.password);
    if (!compareUser) return res.status(400).send('Invalid user name and password');
    req.locals.user = user;
    const token = user.generateToken();
    res.status(200).send(token);
}
exports.Register = async (req, res) => {
    try {
        const { error } = validateUserRegister(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User Already Exists!!');
        user = new User(
            _.pick(req.body, ['name', 'email', 'password'])
        );
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

