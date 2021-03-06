const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : String,
    article : String,
    username : String,
    vote : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps : true
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article