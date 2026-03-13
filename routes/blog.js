const express = require('express');
const router = express.Router();
const pool = require('../db/index');

// List published posts
router.get('/', async (req, res) => {
  try {
    const { pillar, category, limit = 20, offset = 0 } = req.query;
    let sql = 'SELECT id, title, slug, excerpt, cover_image, category, tags, pillar, published_at, reading_time FROM posts WHERE is_published = true';
    const params = [];

    if (pillar) { params.push(pillar); sql += ` AND pillar = $${params.length}`; }
    if (category) { params.push(category); sql += ` AND category = $${params.length}`; }

    params.push(parseInt(limit), parseInt(offset));
    sql += ` ORDER BY published_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(sql, params);
    res.json({ posts: rows });
  } catch (err) {
    console.error('Blog error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, u.name as author_name FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.slug = $1 AND p.is_published = true`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Post not found' });
    res.json({ post: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
