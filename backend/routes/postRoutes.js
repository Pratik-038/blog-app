const router = require("express").Router();
const Post = require("../models/Post");

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching posts");
  }
});

// ✅ CREATE POST
router.post("/", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || "",
      userId: "demoUser", // TEMP (so delete works without auth)
    });

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error creating post");
  }
});

// ✅ DELETE POST (WORKING 100%)
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE HIT:", req.params.id);

    await Post.findByIdAndDelete(req.params.id);

    res.json("Post deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error deleting post");
  }
});

module.exports = router;