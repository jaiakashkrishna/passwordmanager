const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Correct import path
const Password = require('../models/Password');

router.post('/', auth, async (req, res) => {
    const { website, password } = req.body;
    try {
        const newPassword = new Password({ user: req.user.id, website, password });
        const savedPassword = await newPassword.save();
        res.json(savedPassword);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user.id });
        res.json(passwords);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

