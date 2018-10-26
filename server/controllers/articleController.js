const Article = require('../models/article')
const User = require('../models/user')
const mongoose = require('mongoose')

class ArticleController{
    static createArticle(req, res){
        Article.create({
            title : req.body.title,
            article : req.body.article,
            category : req.body.category,
            img : req.body.img,
            username : req.login.username,
            user : req.login.id
        })
        .then(article => {
            res.status(201).json({
                article,
                message : "Create article success"
            })
        })
        .catch(err => {
            res.status(500).json({
                message : 'Token not found'
            })
        })
    }
    static updateArticle(req, res){
        Article.findOne({
            _id : req.params.id,
            user : req.login.id
        })
        .then(article => {
            if(article){
                article.img = req.body.img,
                article.category = req.body.category,
                article.title = req.body.title,
                article.article = req.body.content
                article.save()
                .then(updated => {
                    res.status(200).json({
                        updated,
                        message : 'Article updated'
                    })
                })
            }
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
    static deleteArticle(req, res){
        Article.findOneAndDelete({ _id : req.params.id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static showAllArticle(req, res){
        Article.find({}).populate('comments')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static showArticleById(req, res){
        Article.findOne({
            _id : req.params.id
        })
        .populate('comments')
        .then(article => {
            res.status(200).json({article})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static searchArticle(req, res){
        Article.find({
            title: new RegExp(req.params.keyword, 'i')
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
    static showUserArticle(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id);
        Article.find({}).populate('user')
        .then(article => {
            const result = article.filter(function (datum) {
                return userId.equals(datum.user._id);
            });
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
    static upvote(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id)
        Article.findOne({vote : userId, _id : req.params.id})
        .then(article => {
            if(article){
                res.status(200).json({message : 'You already has vote', vote})
            }
            else{
                Article.findOneAndUpdate({
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
            console.log('kosong')
            res.status(500).json(err)
        })
    }
    static downvote(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id)
        Article.findOne({vote : userId, _id : req.params.id})
        .then(article => {
            if(!article){
                res.status(200).json({message : 'No vote found', vote})
            }
            else{
                Article.findByIdAndUpdate({
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

module.exports = ArticleController