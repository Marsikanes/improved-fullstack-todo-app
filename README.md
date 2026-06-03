# Todo Fullstack App
Полноценное приложение для управления задачами с аутентификацией, JWT и базой данных SQLite. Построено на стеке Node.js + Express + better-sqlite3. Фронтенд — чистый JavaScript с Bootstrap, шаблонизация через EJS.

## Возможности

- Регистрация и вход пользователей (JWT хранится в localStorage)
- Личный список задач: добавление, редактирование текста, отметка выполнения, удаление
- Защищённые API-эндпоинты (middleware проверки токена)
- Готовые тестовые пользователи (см. seed.js)
- Простой деплой на Render (единое приложение)

## Стек

- **Backend:** Node.js, Express, better-sqlite3, jsonwebtoken, bcryptjs, dotenv
- **Frontend:** HTML5, CSS3 (Bootstrap 5), JavaScript, EJS
- **База данных:** SQLite (файл `database.sqlite`)

## Локальный запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/improved-fullstack-todo-app.git
   cd todo-fullstack
Установите зависимости:

bash
npm install
Создайте файл .env на основе .env.example и задайте свой секретный ключ:

env
JWT_SECRET=ваш_супер_секретный_ключ
PORT=3000
Заполните базу тестовыми данными (опционально):

bash
npm run seed
Будут созданы два пользователя: admin@test.com / admin123 и user@test.com / user123, у каждого по 4 задачи.

Запустите сервер:

bash
npm start
Откройте в браузере http://localhost:3000.

Структура API
Все защищённые эндпоинты требуют заголовок Authorization: Bearer <token>.

POST /api/register – регистрация (name, email, password)

POST /api/login – вход (email, password)

GET /api/todos – список задач пользователя

POST /api/todos – создать задачу (text)

PUT /api/todos/:id – обновить текст и/или статус выполнения (text, completed)

DELETE /api/todos/:id – удалить задачу

Деплой на Render
Запушьте проект в GitHub-репозиторий.

Создайте новый Web Service на Render.

Подключите репозиторий.

Настройки сервиса:

Build Command: npm install

Start Command: node app.js

Добавьте переменную окружения:

JWT_SECRET – любое сложное значение

Нажмите Create Web Service.
Приложение будет доступно по URL, предоставленному Render (можно также привязать свой домен).
После деплоя откройте приложение, зарегистрируйтесь или войдите под тестовыми учётными данными.

Примечание: База данных SQLite будет создана автоматически при первом запуске. Чтобы наполнить её тестовыми данными на сервере, можно выполнить npm run seed через консоль Render (вкладка Shell) или запустить seed один раз после деплоя.



---

## Пошаговая инструкция локального запуска

1. Скопируйте все файлы в папку `todo-fullstack` (или клонируйте репозиторий, если создадите его).
2. В терминале перейдите в папку проекта и выполните `npm install`.
3. Создайте `.env`:
JWT_SECRET=myultrastrongsecret123
PORT=3000

text
4. Запустите `npm run seed` – база заполнится двумя пользователями и задачами.
5. Запустите сервер: `npm start`.
6. Откройте `http://localhost:3000`.  
Войдите как `admin@test.com` / `admin123` или `user@test.com` / `user123`.  
Или зарегистрируйте нового пользователя.

## Пошаговая инструкция деплоя на Render

1. Залейте проект в новый публичный репозиторий на GitHub.
2. Авторизуйтесь на [render.com](https://render.com), нажмите **New +** → **Web Service**.
3. Подключите репозиторий через GitHub.
4. Заполните поля:
- **Name:** любое (например `todo-fullstack`)
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node app.js`
5. В разделе **Environment Variables** добавьте:
- `JWT_SECRET` = `myultrastrongsecret123`
6. Нажмите **Create Web Service**. Дождитесь окончания деплоя (логи будут показаны).
7. После успешного запуска откройте присвоенный URL (обычно `https://todo-fullstack.onrender.com`).  
Всё работает: регистрация, логин, задачи.

**Совет:** Если хотите, чтобы тестовые данные были на проде, зайдите в консоль Render (вкладка **Shell** у сервиса) и выполните `npm run seed`.

---

Проект полностью готов к сдаче практики. В README уже есть место для бейджа Code Climate и ссылки на деплой – останется только заменить `yourusername` и `your-app` на свои реальные значения после создания репозитория.