const messageModel = require('../models/message.model')

class messageController{
    async createMessage(req, res) {
        try {
            const {firstID, secondID} = req.body;
            
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}