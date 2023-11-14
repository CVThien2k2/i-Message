const authService = require('../services/auth.service')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
require('dotenv').config()

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}
class authController {

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            console.log(req.body)
            let user = await authService.getOneUser(email);
            console.log(user)
            if (!user) return res.status(400).json("Thông tin tài khoản hoặc mật khẩu không chính xác")

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) return res.status(400).json("Thông tin tài khoản hoặc mật khẩu không chính xác")

            user = { ...user.toObject(), password: undefined };

            const token = createToken(user._id);

            res.status(200).json({ user, token })

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async registerUser(req, res) {
        try {
            let password = req.body.password;
            const email = req.body.email;
            const name = req.body.name;
            const numberPhone = req.body.numberPhone;

            let user = await userModel.findOne({ email: email });
            if (user) {
                return res.status(400).json('Email đã được sử dụng');
            }

            user = await userModel.findOne({ numberPhone: numberPhone });
            if (user) {
                return res.status(400).json('Số điện thoại đã được sử dụng');
            }


            // Check for required fields
            if (!name || !email || !password || !numberPhone) {
                return res.status(400).json('Vui lòng điền các trường bắt buộc');
            }

            // Check for invalid email format
            if (!validator.isEmail(email)) {
                return res.status(400).json('Email không đúng định dạng');
            }
            if (!validator.isStrongPassword(password)) {
                return res.status(400).json('Mật khẩu không đủ mạnh')
            }

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            req.body.password = password;
            user = await authService.createUser(req.body);
            user = { ...user.toObject(), password: undefined };
            const token = createToken(user._id);
            res.status(200).json({ user, token })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async findUser(req, res) {
        try {
            const userId = req.params.userId

            var user = await authService.getUser(userId)
            
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getUser(req, res) {
        try {
            

            var users = await authService.getAllUsers()
            res.status(200).json(users)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}


module.exports = new authController;