const groupModel = require('../models/group.model')
const groupService = require('../services/group.service')
class groupController {
    async createGroup(req, res) {
        try {
            const {firstID, secondID} = req.body;

            var group = await groupService.getGroup(firstID,secondID)
            
            if(group) return res.status(200).json(group)
            
            const newGroup = new groupModel({
                members: [firstID, secondID]
            })
            const response = await groupService.createGroup(newGroup);
            res.status(200).json(response)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async findUserGroup(req, res) {
        try {
            const userID = req.params.userID
            const groups = await groupService.findUserGroup(userID)
            return res.status(200).json(groups)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async findGroup(req, res) {
        try {
            const {firstID, secondID} = req.params;
            const groups = await groupService.findGroup(firstID,secondID)
            return res.status(200).json(groups)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new groupController;