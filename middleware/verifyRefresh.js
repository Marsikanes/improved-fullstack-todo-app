const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.refresh_token;
  if (!token) {
    return res.status(401).json({ error: 'No refresh token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    // Проверим, существует ли такой токен в базе
    const db = req.db;
    const saved = db.prepare('SELECT * FROM refresh_tokens WHERE token = ? AND user_id = ?').get(token, decoded.id);
    if (!saved || saved.expires_at < Date.now()) {
      // Удалим просроченный
      if (saved) db.prepare('DELETE FROM refresh_tokens WHERE id = ?').run(saved.id);
      return res.status(401).json({ error: 'Refresh token expired or invalid.' });
    }
    req.user = decoded;
    req.refreshTokenRecord = saved;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token.' });
  }
};