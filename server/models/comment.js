const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment : String,
    vote : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    user : String
},{
    timestamps : true
})

const Comment  = mongoose.model('Comment', commentSchema)
module.exports = Comment