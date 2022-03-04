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
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Account =  mongoose.model('accounts', acountSchema)

module.export = Account