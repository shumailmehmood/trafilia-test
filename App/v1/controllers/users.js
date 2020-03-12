const User = require('../../schemas/user');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const { validateUserLogin, validateUserRegister } = require('../../validatingMethods/validate');
exports.login = async (req, res) => {
    try {
        const { error } = validateUserLogin(_.pick(req.body, ['email', 'password']));
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid user');
        const compareUser = await bcrypt.compare(req.body.password, user.password);
        if (!compareUser) return res.status(400).send('Invalid user name and password');
        res.locals.USER = user;
        const token = user.generateToken();
        res.send(token);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.Register = async (req, res, next) => {
    try {
        const { error } = validateUserRegister(_.pick(req.body, ['name', 'vehicle_no', 'phoneNo']));
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ name: req.body.name });
        if (user) return res.status(400).send('User Already Exists!!');
        user = new User(
            _.pick(req.body, ['name', 'vehicle_no', 'phoneNo'])
        );
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        req.user = user;
        next()
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.getUsers = async (req, res) => {
    try {
        let { page, limit, id } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;
        let query = {};
        if (id) query["_id"] = id;
        let users = await User.aggregate([
            { $match: query },
            { $sort: { "createdAt": -1 } },
            {
                $facet: {
                    metadata: [{ $count: "total_users" },
                    { $addFields: { page: page, limit: limit, pages: { $ceil: { $divide: ["$total_users", limit] } } } },
                    ],
                    data: [{ $skip: (page * limit - limit) }, { $limit: limit }],
                }
            },
        ])
        res.send(users[0])

    } catch (error) {
        return res.status(400).send(err.message);
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        let query = {};
        let users = await User.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'salaries',
                    localField: '_id',
                    foreignField: 'uid.item',
                    as: 'Salary'
                }
            }
        ])
        res.send(users)
    } catch (error) {
        return res.status(400).send(err.message);
    }
}


