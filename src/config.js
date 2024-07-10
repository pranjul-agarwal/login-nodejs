const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

// check database connected or not

connect.then(() => {
    console.log('database connected successfully');
})
    .catch(() => {
        console.log('database not connected');
    })

//create schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    }
});

//collection part

const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;