// models/Password.js
const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    website: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Password', PasswordSchema);
