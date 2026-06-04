
# 📝 Todo Fullstack App

[![Code Climate](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app/badges/gpa.svg)](https://codeclimate.com/github/yourusername/improved-fullstack-todo-app)
**Live Demo:** [https://improved-fullstack-todo-app.up.railway.app](https://improved-fullstack-todo-app.up.railway.app)

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

```
[ Браузер ] → (HTTP, EJS-шаблоны, fetch API) → [ Express Server (app.js) ]
                                                        |
                                                        ├── Маршруты (routes/)
                                                        ├── Middleware (auth)
                                                        └── SQLite (database.sqlite)
```
Проект выполнен в виде единого Node.js-приложения (монорепозиторий): сервер отдаёт клиентские страницы (EJS) и обслуживает REST API. Логически разделён на фронтенд (views/, public/js) и бэкенд (app.js, routes/, middleware/).

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
   JWT_SECRET=super_secret_key_change_me
   PORT=3000
   ```

4. **Заполните базу тестовыми данными (опционально)**
## 🧪 Тестовые учётные данные

После выполнения `npm run seed` в базе будут два пользователя:

- **admin@test.com** — пароль `admin123`
- **user@test.com** — пароль `user123`

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

## 🌍 Деплой на Railway

1. **Запушьте проект** в публичный GitHub‑репозиторий.
2. **Создайте новый проект** на [Railway](https://railway.app):
   - Нажмите **New Project** → **Deploy from GitHub repo**.
   - Подключите свой репозиторий.
3. Railway автоматически определит Node.js. Настройки можно оставить по умолчанию:
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
4. Добавьте **переменную окружения**:
   - Перейдите во вкладку **Variables**.
   - Добавьте `JWT_SECRET` с надёжным значением (например, `myultrastrongsecret123`).
5. Нажмите **Deploy** и дождитесь окончания сборки.
6. После успешного запуска откройте сгенерированный домен (вида `https://имя-проекта.up.railway.app`).

> 💡 **Совет:** Чтобы заполнить базу тестовыми данными, выполните `npm run seed` через Railway CLI:
> ```bash
> railway run npm run seed
> ```
> Или откройте вкладку **Shell** в интерфейсе Railway и выполните команду вручную.

## 📄 Лицензия

Проект создан в учебных целях. Вы можете свободно использовать, изменять и распространять код.

---

**🎓 Учебный проект по веб‑разработке. Разработано как fullstack‑расширение классического туториала Todo List App.**
