// Comments Routes
const router = require("express").Router();
const User = require("../models/Comment.model");
// /* Create Comment Route (post) */

// router.post('/', async(req, res, next) => {
//     const { author, content, timestamps } = req.body

//     try {
//         const comments = await Comment.create({
//             author: author.trim(),
//             content: content.trim(),
//             timestamps: parseFloat(timestamps)
//         })
//         res.status(3000).json({message: 'New content created', id: comments.id})
// (error) {
//     res.status(5005).json(error)
// }
//     }
    
// })


/* Create comment */

router.post('/', async (req, res) => {
try {
    console.log(req.body)
    const { author, content, timestamps } = req.body;
    const newComment = await Comment.create({ author, content, timestamps });
    const updatedComment = await Comment.updateOne({_id:comment}, {$push: {comments: [newComment]}})
    console.log("updated Comment:", updatedUser);
    res.redirect(`/..../${newComment._id}`);
} catch (error){
    console.log ("Creating new comment in the database failed", (error))}
}) 


/* Update Comment Route (put) */
router.get('/edit-comment/:id', isLoggedIn, (req, res, next) => {
    Comment.findById(req.params.id)
    .then ((toUpdateComment) => {
    console.log(toUpdateComment)
    res.render('auth/edit-comment', {toUpdateComment})
    })
    });

    router.post('/edit-comment/:commentId', async (req, res) => { 
    try {
    console.log("editing function opens!!!")
        const {author, content, timestamps} = req.body;
        const {commentId} = req.params
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {author, content, timestamps}, {new: true})
        res.redirect(`/comment-details/${updatedComment._id}`);
    } catch (error){
        console.log ("Updating a book in the database failed", (error))
    }
    })

/* Delete Comment Route (delete) */
router.get('/comment-list', isLoggedIn, (req, res, next) => {
    Comment.find()
    .then ((listComments) => {
    res.render('auth/comments-list', {listComments})
    })
});


module.exports = router;