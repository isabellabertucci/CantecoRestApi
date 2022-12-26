const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
    userRole: String
});

module.exports = User;