
const express = require('express');
const { BlogPost, User, Comment } = require('./models');
const { authenticate } = require('./auth');
const router = express.Router();

// Create a blog post
router.post('/posts', authenticate, async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const post = await BlogPost.create({
            title,
            content,
            tags,
            userId: req.userId
        });
        console.log(req.userId);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Error creating post' });
    }
});

// Get all blog posts
router.get('/posts', async (req, res) => {
    const posts = await BlogPost.findAll({ include: User });
    res.json(posts);
});

// Edit a blog post
router.put('/posts/:id', authenticate, async (req, res) => {
    const { title, content, tags } = req.body;
    // console.log(req.params.id);
    // console.log(req.userId);
    const post = await BlogPost.findByPk(parseInt(req.params.id));
    console.log(post);
    if (!post || post.id !== parseInt(req.params.id)) {
        return res.status(404).json({ error: 'Post not found or not authorized' });
    }
    post.title = title;
    post.content = content;
    post.tags = tags;
    await post.save();
    res.json(post);
});

// Delete a blog post
router.delete('/posts/:id', authenticate, async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    console.log(post);
    if (!post || post.id !== parseInt(req.params.id)) {
        return res.status(404).json({ error: 'Post not found or not authorized' });
    }
    await post.destroy();
    res.status(204).end();
});

module.exports = { router };

























































































































































