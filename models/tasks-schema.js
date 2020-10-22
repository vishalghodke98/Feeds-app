const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const taskSchema = mongoose.Schema({
    id: {
        type: String,

    },
    task: {
        type: String,
    },
    status: {
        type: String,
    }
})

const User = mongoose.model('task', taskSchema);

module.exports = { User }