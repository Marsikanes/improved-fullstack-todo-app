Конечно! Вот улучшенный и структурированный `README.md` с исправленным форматированием, объединением дублирующейся информации, эмодзи и более приятной читаемостью. Можешь скопировать его как есть или адаптировать под себя.

---


# 📝 Todo Fullstack App

[![Code Climate](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app/badges/gpa.svg)](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app)
[![Render Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://your-app.onrender.com)

Полноценное fullstack-приложение для управления задачами с регистрацией, JWT‑аутентификацией и базой данных SQLite. Сервер на Express генерирует страницы через EJS, а клиентский JavaScript взаимодействует с REST API.

---

## 🚀 Возможности

- 🔐 **Регистрация и вход** (JWT-токен сохраняется в `localStorage`)
- 📋 **Личный список задач**: создание, редактирование, отметка выполнения, удаление
- 🛡 **Защищённые маршруты** – middleware проверяет JWT на каждом API‑запросе
- 🗄 **Готовые тестовые пользователи** и задачи (заполняются через `npm run seed`)
- 🚢 **Простой деплой на Render** одним веб‑сервисом

---

## 🧰 Стек технологий

| Часть       | Инструменты                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| **Backend** | Node.js, Express, [better‑sqlite3](https://github.com/WiseLibs/better-sqlite3), jsonwebtoken, bcryptjs, dotenv |
| **Frontend**| HTML5, CSS3 (Bootstrap 5), чистый JavaScript, EJS                                           |
| **База данных** | SQLite (файл `database.sqlite`)                                                             |

---

## 📁 Структура проекта

```
improved-fullstack-todo-app/
├── app.js                # точка входа сервера
├── package.json
├── .env.example
├── seed.js               # наполнение тестовыми данными
├── middleware/
│   └── auth.js           # проверка JWT
├── routes/
│   ├── auth.js           # регистрация / логин
│   └── todos.js          # CRUD задач
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── todos.ejs
└── public/
    └── js/
        └── app.js        # клиентская логика
```

---

## ⚙️ Локальный запуск

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/yourusername/improved-fullstack-todo-app.git
   cd improved-fullstack-todo-app
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения**
   Создайте файл `.env` на основе `.env.example`:
   ```env
   JWT_SECRET=ваш_супер_секретный_ключ
   PORT=3000
   ```

4. **Заполните базу тестовыми данными (опционально)**
   ```bash
   npm run seed
   ```
   Появятся два пользователя:
   - `admin@test.com` / `admin123`
   - `user@test.com` / `user123`  
   У каждого по 4 задачи.

5. **Запустите сервер**
   ```bash
   npm start
   ```

6. **Откройте в браузере** [http://localhost:3000](http://localhost:3000)  
   Войдите под одним из тестовых аккаунтов или зарегистрируйте нового.

---

## 📡 API Endpoints

Все защищённые эндпоинты требуют заголовок:  
`Authorization: Bearer <ваш_JWT_токен>`

| Метод   | URL                | Описание                                      | Тело запроса (JSON)                          |
| ------- | ------------------ | --------------------------------------------- | -------------------------------------------- |
| `POST`  | `/api/register`    | Регистрация нового пользователя               | `{ "name": "Имя", "email": "почта", "password": "пароль" }` |
| `POST`  | `/api/login`       | Аутентификация и получение JWT                | `{ "email": "почта", "password": "пароль" }` |
| `GET`   | `/api/todos`       | Получить список задач текущего пользователя   | —                                            |
| `POST`  | `/api/todos`       | Создать новую задачу                          | `{ "text": "Текст задачи" }`                |
| `PUT`   | `/api/todos/:id`   | Обновить текст и/или статус выполнения         | `{ "text": "новый текст", "completed": 1 }` |
| `DELETE`| `/api/todos/:id`   | Удалить задачу по ID                          | —                                            |

---

## 🌍 Деплой на Render

1. **Запушьте проект** в публичный GitHub‑репозиторий.
2. **Создайте новый Web Service** на [Render](https://render.com).
3. Подключите репозиторий и настройте:
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
4. Добавьте **переменную окружения**:
   - `JWT_SECRET` = любое надёжное значение
5. Нажмите **Create Web Service** и дождитесь деплоя.
6. После успешного запуска откройте полученный URL (обычно `https://имя-сервиса.onrender.com`).

> 💡 **Совет:** Чтобы на проде тоже были тестовые пользователи, откройте вкладку **Shell** у сервиса на Render и выполните `npm run seed`.

---

## 📄 Лицензия

Проект создан в учебных целях. Вы можете свободно использовать, изменять и распространять код.

---

**🎓 Учебный проект по веб‑разработке. Разработано как fullstack‑расширение классического туториала Todo List App.**
```


