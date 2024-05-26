const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            if(!thoughts){
                return res.status(404).json({ message: 'No users found' })
            }

            res.status(200).json(thoughts);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' })
            }

            res.status(200).json(thought);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'Thought created but found no user with that username' })
            }
            res.status(201).json({thought, user})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    }, 
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body },
                { new:true }
            );
            
            if(!thought){
                return res.status(404).json({ message: 'No thought found with this ID' })
            };

            res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this id' })
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'Thought deleted but no user found with this id' })
            }

            res.status(200).json({ message: 'Thought deleted successfully', user})

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this is id' })
            }

            res.status(201).json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this is id' })
            }

            res.status(201).json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
}