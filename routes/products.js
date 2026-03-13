const express = require('express');
const router = express.Router();
const pool = require('../db/index');

// List all active products (with optional pillar filter)
router.get('/', async (req, res) => {
  try {
    const { pillar, category, limit = 50, offset = 0 } = req.query;
    let sql = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = true';
    const params = [];

    if (pillar) {
      params.push(pillar);
      sql += ` AND p.pillar = $${params.length}`;
    }
    if (category) {
      params.push(category);
      sql += ` AND c.slug = $${params.length}`;
    }

    params.push(parseInt(limit), parseInt(offset));
    sql += ` ORDER BY p.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(sql, params);
    res.json({ products: rows });
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = $1',
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: rows[0] });
  } catch (err) {
    console.error('Product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY sort_order');
    res.json({ categories: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
