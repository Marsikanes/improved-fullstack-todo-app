require('dotenv').config();
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const db = new Database('database.sqlite');

// Create tables if not exist
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
`);

// Clear existing data (optional, remove if you want to keep)
db.exec('DELETE FROM todos');
db.exec('DELETE FROM users');
db.exec("DELETE FROM sqlite_sequence WHERE name='users' OR name='todos'");

// Seed users
const adminPass = bcrypt.hashSync('admin123', 10);
const userPass = bcrypt.hashSync('user123', 10);

const insertUser = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
const admin = insertUser.run('Admin', 'admin@test.com', adminPass);
const user = insertUser.run('User', 'user@test.com', userPass);

// Seed todos
const insertTodo = db.prepare('INSERT INTO todos (user_id, text, completed) VALUES (?, ?, ?)');
const todosForAdmin = [
  'Review project plan',
  'Setup CI/CD pipeline',
  'Write unit tests',
  'Deploy to staging'
];
const todosForUser = [
  'Buy groceries',
  'Read a book',
  'Exercise for 30 minutes',
  'Call dentist'
];

todosForAdmin.forEach(text => insertTodo.run(admin.lastInsertRowid, text, 0));
todosForUser.forEach(text => insertTodo.run(user.lastInsertRowid, text, 0));

console.log('Database seeded successfully.');
console.log('Admin: admin@test.com / admin123');
console.log('User:  user@test.com  / user123');
process.exit(0);