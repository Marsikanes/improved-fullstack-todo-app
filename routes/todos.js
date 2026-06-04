const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Требуются все роуты
router.use(auth);

// Получаем задачки от юзера
router.get('/', (req, res) => {
  const db = req.db;
  const todos = db.prepare('SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC').all(req.user.id);
  return res.json(todos);
});

// Создаём новую задачку
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  const db = req.db;
  const info = db.prepare('INSERT INTO todos (user_id, text, completed) VALUES (?, ?, 0)').run(req.user.id, text.trim());
  const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(info.lastInsertRowid);
  return res.status(201).json(newTodo);
});

// Обновление задачки или изменение текста.
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const db = req.db;

  const todo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, req.user.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  const updates = [];
  const params = [];

  if (text !== undefined) {
    updates.push('text = ?');
    params.push(text.trim());
  }
  if (completed !== undefined) {
    updates.push('completed = ?');
    params.push(completed ? 1 : 0);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update.' });
  }

  params.push(id, req.user.id);
  db.prepare(`UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`).run(...params);
  const updated = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  return res.json(updated);
});

// Удаление задачки
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const todo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, req.user.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }
  db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?').run(id, req.user.id);
  return res.json({ message: 'Deleted successfully.' });
});

module.exports = router;