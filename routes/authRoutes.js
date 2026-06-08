const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyRefresh = require('../middleware/verifyRefresh');
const router = express.Router();

function setTokens(res, db, userId, email) {
  const accessToken = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  db.prepare('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)').run(userId, refreshToken, expiresAt);

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
  try {
    const db = req.db;
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(409).json({ error: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const info = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);
    setTokens(res, db, info.lastInsertRowid, email);
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  try {
    const db = req.db;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

    setTokens(res, db, user.id, user.email);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/refresh', verifyRefresh, (req, res) => {
  const db = req.db;
  const { id, email } = req.user;
  // удаляем старый токен
  db.prepare('DELETE FROM refresh_tokens WHERE id = ?').run(req.refreshTokenRecord.id);

  const newAccessToken = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  db.prepare('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)').run(id, newRefreshToken, expiresAt);

  res.cookie('access_token', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000
  });
  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ message: 'Tokens refreshed' });
});

router.post('/logout', verifyRefresh, (req, res) => {
  const db = req.db;
  db.prepare('DELETE FROM refresh_tokens WHERE id = ?').run(req.refreshTokenRecord.id);
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.json({ message: 'Logged out' });
});

module.exports = router;