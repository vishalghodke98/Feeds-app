const mongoose = require('mongoose');

const createPost = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    profile: {
        type: String
    },
    likes: String,
    comments: [],
    timestamp: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('createPost', createPost); 