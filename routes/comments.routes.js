const router = require("express").Router();
const User = require("../models/Comments.model");
const Comment = require("../models/Comments.model")
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

router.post('/details/:Id/comment', isAuthenticated, async (req, res, next) => {
try {
    const { comment } = req.body;
    console.log("this is the new comment: ", req.body, req.payload)
    const newComment = await Comment.create({ author: req.payload._id, content });
    console.log ("newComment: ", newComment)
    const updatedExperience = await Experience.findByIdAndUpdate({_id: req.payload._id}, {$push: {comments: [newComment._id]}}, {new: true})
    res
    .status(201)
    .json({ message: "New comment created"}); 
    console.log("updated Comment:", updatedExperience);
} catch (error){
    console.log(error)
    res.status(500).json(error);
    }
}) 

module.exports = router;


















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

// /* Update Comment Route (put) */
// router.get('/edit-comment/:id', (req, res, next) => {
//     Comment.findById(req.params.id)
//     .then ((toUpdateComment) => {
//     console.log(toUpdateComment)
//     res.render('auth/edit-comment', {toUpdateComment})
//     })
//     });

//     router.post('/edit-comment/:commentId', async (req, res) => { 
//     try {
//     console.log("editing function opens!!!")
//         const {author, content, timestamps} = req.body;
//         const {commentId} = req.params
//         const updatedComment = await Comment.findByIdAndUpdate(commentId, {author, content, timestamps}, {new: true})
//         res.redirect(`/comment-details/${updatedComment._id}`);
//     } catch (error){
//         console.log ("Updating a book in the database failed", (error))
//     }
//     })

// /* Delete Comment Route (delete) */
// router.get('/comment-list', (req, res, next) => {
//     Comment.find()
//     .then ((listComments) => {
//     res.render('auth/comments-list', {listComments})
//     })
// });


