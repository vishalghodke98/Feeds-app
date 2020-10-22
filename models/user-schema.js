const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema); 