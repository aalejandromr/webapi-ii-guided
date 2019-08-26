const express = require("express");

const router = express.Router();

const db = require("../data/db");

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (title && contents) {
      const createdPost = await db.insert({
        title,
        contents
      });
      return res.status(201).json(createdPost);
    }
    return res.status(400).json({
      error: "Please provide title and contents for the post."
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = db.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found with provided ID" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = db.findCommentById(id);
    if (!comments) {
      return res.status(404).json({ error: "Post not found with provided ID" });
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const newComment = req.body;
    if (!newComment.text) {
      return res
        .status(400)
        .json({ error: "Please provide text for the comment" });
    }
    newComment = await db.insertComment({ post_id: id, ...newComment });
    if (!post) {
      return res
        .status(400)
        .json({ error: "Post not found with the ID provided" });
    }
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = db.remove(id);
    if (!deletedPost) {
      return res
        .status(400)
        .json({ error: "Post not found with the provided id" });
    }
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
