const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exSchema = new Schema({
    username:{ type:String, required: true,unique: true,trim: true,minlength: true},
    description: {type:String,required:true},
    duration:{type:Number,required:true},
    date: {type:Date, required:true}
},{
    timestamps: true
})

const Exercise = mongoose.model('exercise',exSchema)
module.exports = Exercise