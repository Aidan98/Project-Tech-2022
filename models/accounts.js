const mongoose = require('mongoose')

const acountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    genre: {
        type: Array,
        required: false
    },
    profile_pic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Account =  mongoose.model('Account', acountSchema)
module.exports = Account