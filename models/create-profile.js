const mongoose = require('mongoose');

const imageGalarrySchema = mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    file_data: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('ImageGalarry', imageGalarrySchema); 