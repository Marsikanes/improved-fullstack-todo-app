# Improved Fullstack Todo App

[![Render Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://your-app.onrender.com)
[![Code Climate](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app/badges/gpa.svg)](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app)

Полноценное fullstack-приложение для управления задачами с безопасной аутентификацией (httpOnly cookies, refresh token) и базой данных SQLite.

## Демонстрация

[![Смотреть видео](https://img.youtube.com/vi/ТВОЙ_ID/0.jpg)](https://youtu.be/ТВОЙ_ID)

## Возможности

- **Безопасная аутентификация** через JWT в httpOnly cookies + refresh token
- **Личный список задач** с созданием, редактированием, отметкой выполнения и удалением
- **Защищённые API-эндпоинты** с автоматическим обновлением токена
- **Тёмная тема** в зелёных оттенках, адаптивная вёрстка
- **Тестовые данные** (seed)

## Стек

| Часть | Технологии |
|---|---|
| Backend | Node.js, Express, better-sqlite3, jsonwebtoken, bcryptjs, cookie-parser |
| Frontend | HTML5, CSS3 (кастомная тема), чистый JavaScript, EJS |
| База данных | SQLite |

## Локальный запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/improved-fullstack-todo-app.git
   cd improved-fullstack-todo-app
   ```
- Установите зависимости:

```
bash
npm install
```
- Создайте файл .env (пример в .env.example):

```
env
JWT_SECRET=ваш_секретный_ключ
JWT_REFRESH_SECRET=другой_секрет
PORT=3000
```

Заполните базу тестовыми данными (опционально):
   ```
   bash
   npm run seed
   ```

- Учётные данные:

admin@test.com / admin123

user@test.com / user123

- Запустите сервер:
```
bash
npm start
```
Откройте http://localhost:3000

## Деплой на Railway
 - Запушьте проект в GitHub.

 - Создайте новый проект на Railway → Deploy from GitHub.

 - В Variables добавьте JWT_SECRET и JWT_REFRESH_SECRET.

Нажмите Deploy.

```
 API Endpoints
Метод	URL	Описание	Защита
POST	/api/register	Регистрация	Нет
POST	/api/login	Вход	Нет
POST	/api/refresh	Обновление access токена	Refresh cookie
GET	/api/todos	Список задач	Access cookie
POST	/api/todos	Создать задачу	Access cookie
PUT	/api/todos/:id	Обновить задачу	Access cookie
DELETE	/api/todos/:id	Удалить задачу	Access cookie
```

## Структура проекта
```
improved-fullstack-todo-app/
├── app.js                  # точка входа
├── package.json
├── .env.example
├── seed.js
├── middleware/
│   ├── auth.js             # проверка access токена
│   └── refresh.js          # проверка refresh токена
├── routes/
│   ├── auth.js             # регистрация, вход, выход, обновление
│   └── todos.js            # CRUD задач
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── todos.ejs
├── public/
│   ├── css/
│   │   └── dark-theme.css
│   └── js/
│       └── app.js
└── database.sqlite (в .gitignore)
```

##  Тестовые пользователи

| Email    |   	Пароль |
| admin@test.com	admin123 |
| user@test.com	user123 |


##  Лицензия
- Проект создан в учебных целях.
