const mongoose =require('mongoose')


const todoSchema =mongoose.Schema({
    text:{
        type: String,
        require: true
    },
    complete:{
        type: Boolean,
        default:false
    },
    timeStamp:{
        type: String,
        default: Date.now()
    }
})

module.exports =mongoose.model('Todos', todoSchema)