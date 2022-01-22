const {Schema, model} = require('mongoose')

const Task = new Schema({
    title: String,
    description: String,
    status: String,
    user: String,
})

const Tasks = model('Task', Task)

module.exports = { Tasks, Task }