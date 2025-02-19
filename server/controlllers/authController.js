const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password, "formdata");

        let user = await User.findOne({ email });
        if (user) {
            return next({ statusCode: 400, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, encryptedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ token, userId: user._id, name: user.name, email: user.email });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.encryptedPassword))) {
            return next({ statusCode: 400, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, userId: user._id, name: user.name, email: user.email });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login };
