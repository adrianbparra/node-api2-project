const express = require("express");

const postsRouter = express.Router();


const posts = require("./data/db.js")


postsRouter.post("/", (req,res) => {
    if("title" in req.body && "contents" in req.body) {
        posts.insert(req.body)
            .then(post =>{
                //post === {"post":{"id":12}}
                res.status(201).json({post})
            })
            .catch(err => res.status(500).json({error: "There was an error while saving the post to the database",err}))
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post"})
    }
})

postsRouter.post("/:id/comments", (req,res)=>{
    const {id} = req.params;
    posts.findById(id)
        .then(post =>{
            if("id" in post) {
                
                if("text" in req.body) {

                    const comment = req.body;
                    
                    comment.post_id = id;

                    posts.insertComment(comment)
                        .then(com =>{
                            res.status(201).json({...com})
                        })
                        .catch(err => res.status(500).json({error: "There was an error while saving the comment to the database",err}))

                    // res.status(201).json({post, ...req.body})
                } else {
                    res.status(400).json({errorMessage: "Please provide text for the comment."})
                }


            } else {
                res.status(404).json({message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(404).json({errorMessage: "The post with the specified ID does not exist." }))
})



postsRouter.get("/", (req,res)=>{
    posts.find()
        .then(posts=>{
            res.status(201).json(posts)
        })
        .catch(err => res.status(500).json({error: "The posts information could not be retrieved." }))

})

postsRouter.get("/:id", (req,res) =>{

    const {id} = req.params;

    posts.findById(id)
        .then(post =>{
            if("id" in post) {
                res.status(200).json(post)
            } else {
                
            }
        })
        .catch(err => res.status(500).json({error: "The post information could not be retrieved."}))
})


postsRouter.get("/:id/comments", (req,res) =>{
    const {id} = req.params;

    posts.findById(id)

        .then(postFound => {
            
            posts.findPostComments(id)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => res.status(500).json({ error: "The comments information could not be retrieved." }))

        }) 
        .catch(err => {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        })   


    
})



module.exports = postsRouter;
