const router = require('express').Router()
const commentController = require('../controllers/commentController')
const midleware = require('../midleware/auth')

router.get('/', (req, res)=> {
    res.send('Comment Route')
})


router.get('/showall', commentController.showAllComment)
router.get('/showmy/:id', midleware.isLogin, commentController.showMyComment)
router.post('/add',midleware.isLogin, commentController.createComment)
router.put('/edit/:id',midleware.isLogin, commentController.updateComment)
router.delete('/delete/:id',midleware.isLogin, midleware.isAdmin, commentController.deleteComment)

router.get('/upvote/:id', midleware.isLogin, commentController.upVote)
router.get('/downvote/:id', midleware.isLogin, commentController.downVote)
module.exports = router