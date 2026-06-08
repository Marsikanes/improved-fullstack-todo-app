# Improved Fullstack Todo App

- Полноценное fullstack-приложение для управления задачами с безопасной аутентификацией (httpOnly cookies, refresh token) и базой данных SQLite.

## Деплой

Проект доступен по адресу:  
👉 [**improved-fullstack-todo-app.up.railway.app**](https://improved-fullstack-todo-app.up.railway.app)

[![Maintainability](https://img.shields.io/badge/Maintainability-A%2B-success)](https://improved-fullstack-todo-app.up.railway.app)


##  Тестовые пользователи для пользования

| Email            | Пароль    |
| ---------------- | --------- |
| admin@test.com   | admin123  |
| user@test.com    | user123   |


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


## API ENDPOINTS

| Метод   | URL                | Описание                         | Защита                     |
| ------- | ------------------ | -------------------------------- | -------------------------- |
| POST    | /api/register      | Регистрация нового пользователя  | Нет                        |
| POST    | /api/login         | Вход в систему                  | Нет                        |
| POST    | /api/refresh       | Обновление access-токена        | Refresh cookie             |
| POST    | /api/logout        | Выход из системы                | Refresh cookie             |
| GET     | /api/todos         | Список задач пользователя       | Access cookie              |
| POST    | /api/todos         | Создать новую задачу            | Access cookie              |
| PUT     | /api/todos/:id     | Обновить текст и/или статус     | Access cookie              |
| DELETE  | /api/todos/:id     | Удалить задачу                  | Access cookie              |

Дополнительно:
- `GET /health` – healthcheck для Railway (всегда возвращает 200 OK).


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

##  Лицензия
- Проект создан в учебных целях.
