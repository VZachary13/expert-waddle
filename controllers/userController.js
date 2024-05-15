const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            if(!users){
                return res.status(404).json({ message: 'No users found' })
            }

            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new:true }
            );
            
            if(!user){
                return res.status(404).json({ message: 'No user found with this ID' })
            };

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;

            const user = await User.findById(userId)

            if(!user){
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            await Thought.deleteMany({ username: user.username })

            await User.findByIdAndDelete(userId)
            return res.status(200).json({ message: 'User deleted Successfully' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async addFriend(req, res) {
        try {
            const userID = req.params.userId;
            const friendID = req.params.friendId;

            const userTest = await User.findById(userID);
            const friendTest = await User.findById(friendID);

            if (!userTest) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }
            if (!friendTest) {
                return res.status(404).json({ message: 'No friend-user found with this ID' })
            }

            const user = await User.findByIdAndUpdate(
                { _id: userID },
                { $addToSet: { friends: friendID } },
                { new: true }
            )

            res.status(200).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async removeFriend(req, res) {
        try {
            const userID = req.params.userId;
            const friendID = req.params.friendId;

            const userTest = await User.findById(userID);
            const friendTest = await User.findById(friendID);

            if (!userTest) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }
            if (!friendTest) {
                return res.status(404).json({ message: 'No friend-user found with this ID' })
            }

            const user = await User.findByIdAndUpdate(
                { _id: userID },
                { $pull: { friends: friendID } },
                { new: true }
            )

            res.status(200).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
}