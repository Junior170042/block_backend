const router = require("express").Router();
const Post = require("../models/posts");

//Ad new post with
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(404).json(error);
    }
});
//change post userName when the userName is changed
router.post("/update_many", async (req, res) => {

    try {
        const modified = await Post.updateMany({ username: req.body.old }, { $set: { username: req.body.newUser } });
        res.status(200).json(modified);
    } catch (error) {
        res.status(404).json(error);
    }
});

//Update posts
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json("You can only update your own post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete posts
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post is deleted successfully");
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json("You can only delete your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get  posts by keyword
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            //get all post
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(error);
    }
});

//Get single post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;
