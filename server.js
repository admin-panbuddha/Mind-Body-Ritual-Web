require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── API Routes ────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/checkout', require('./routes/checkout'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date(), project: 'MindBodyRitual' });
});

// ─── Static Files ──────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── SPA Catch-all ─────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🌿 MindBodyRitual running on port ${PORT}`);
  console.log(`  🔗 Local: http://localhost:${PORT}\n`);
});
