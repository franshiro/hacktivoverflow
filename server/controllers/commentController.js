const Comment = require('../models/comment')
const Article = require('../models/article')
const mongoose = require('mongoose')

class CommentController{
    static createComment(req, res){
       Comment.create({
           comment : req.body.comment,
           user : req.login.username
       })
       .then(comment => {
            Article.findByIdAndUpdate(req.body.articleId, {
                $push : {
                    comments : comment._id
                }
            }).populate('comments')
            .then(article => {
                res.status(200).json(article)
            })
       })
       .catch(err => {
           console.log(err)
       })
    }
    static showMyComment(req, res){
        Comment.findOne({_id : req.params.id})
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updateComment(req, res){
        Comment.findByIdAndUpdate({
            _id : req.params.id
        },{
            comment : req.body.comment
        })
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteComment(req, res){

    }
    static showAllComment(req, res){
        Comment.find().populate('user', '_id username')
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
    }

    static upVote(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id)
        Comment.findOne({vote : userId, _id:req.params.id})
        .then(comment => {
            if(comment){
                res.status(200).json({message : 'You already has vote'})
            }
            else{
                Comment.findOneAndUpdate({
                    _id : req.params.id
                },{
                    $push : { vote : req.login.id}
                })
                .then(vote => {
                    res.status(200).json({message : 'Vote Success', vote})
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static downVote(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id)
        Comment.findOne({vote : userId, _id:req.params.id})
        .then(comment => {
            if(!comment){
                res.status(200).json({message : 'No vote found'})
            }
            else{
                Comment.findByIdAndUpdate({
                    _id : req.params.id
                },{
                    $pull : { vote : req.login.id}
                })
                .then(vote => {
                    res.status(200).json({message : 'Downvote Success', vote})
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}
module.exports = CommentController
