const express = require('express');
const router = express.Router();

// Cart is client-side (localStorage) for now
// This route handles server-side cart validation before checkout

router.post('/validate', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // TODO: validate product IDs exist, check inventory, calculate totals server-side
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      valid: true,
      itemCount: items.length,
      total: total.toFixed(2)
    });
  } catch (err) {
    console.error('Cart validation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
