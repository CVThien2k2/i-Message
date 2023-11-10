const authService = require('../services/auth.service')
class authController {
    async createUser(req, res) {
        try {
            console.log(req.body)
            const user = await authService.createUser(req.body);
            const id = { data: user, status: "success" }
            res.send({user})
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getUser(req, res) {
        try {
            var users = await authService.getAllUsers();
            // res.json(blogs);
            users = users.map(users => users.toObject())
            // res.json(blogs)
            res.send({ users })
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new authController;