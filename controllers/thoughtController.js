const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    }, //push to id to associated user's thoughts list
    async updateThought(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createReaction(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
}