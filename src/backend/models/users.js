const {Schema, model } = require('mongoose')

const User = new Schema({
    name: String,
    lastname: String,
    email: String,
    gender: String,
    password: String,
    key: String,
    passwordApi: String,
    avatar: String
})

const Users = model('User', User)

module.exports = {Users, User}
