require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// База данных
const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

function seedIfEmpty() {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount > 0) {
    console.log('База уже содержит пользователей, пропускаем посев.');
    return;
  }

  console.log('База пуста. Выполняю автоматический посев тестовых данных...');
  const bcrypt = require('bcryptjs');

  const adminPass = bcrypt.hashSync('admin123', 10);
  const userPass = bcrypt.hashSync('user123', 10);

  const insertUser = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  const admin = insertUser.run('Admin', 'admin@test.com', adminPass);
  const user = insertUser.run('User', 'user@test.com', userPass);

  const insertTodo = db.prepare('INSERT INTO todos (user_id, text, completed) VALUES (?, ?, 0)');
  const adminTodos = ['Review project plan', 'Setup CI/CD pipeline', 'Write unit tests', 'Deploy to staging'];
  const userTodos = ['Buy groceries', 'Read a book', 'Exercise for 30 minutes', 'Call dentist'];

  adminTodos.forEach(text => insertTodo.run(admin.lastInsertRowid, text));
  userTodos.forEach(text => insertTodo.run(user.lastInsertRowid, text));

  console.log('✅ Тестовые пользователи созданы:');
  console.log('   admin@test.com  |   admin123');
  console.log('   user@test.com   |   user123');
}

seedIfEmpty();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Пробрасываем db в запросы
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Маршруты страниц
app.get('/', (req, res) => res.redirect('/todos'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/todos', (req, res) => res.render('todos'));

// API
app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});