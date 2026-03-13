const express = require('express');
const router = express.Router();
const pool = require('../db/index');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    console.log(`📬 Contact from ${name} <${email}>`);
    res.json({ success: true, message: 'Message received — we\'ll be in touch soon.' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Newsletter subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    await pool.query(
      'INSERT INTO subscribers (email, name) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
      [email, name || null]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
