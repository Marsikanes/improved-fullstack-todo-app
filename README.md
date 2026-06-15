# Improved Fullstack Todo App

- Полноценное fullstack-приложение для управления задачами с безопасной аутентификацией (httpOnly cookies, refresh token) и базой данных SQLite.

## Деплой

Проект доступен по адресу:  
👉 [**improved-fullstack-todo-app.up.railway.app**](https://improved-fullstack-todo-app.up.railway.app)

## ВАЖНОЕ ПРИМЕЧАНИЕ


В связи с изменением политики и функциональности сервиса Code Climate (переход на модель Enterprise), публичная оценка качества кода для открытых репозиториев стала недоступна. Вместо бейджа в проекте применены следующие меры контроля качества: единый стиль кода, осмысленные имена переменных, документирование в README, ручное тестирование API.


##  Тестовые пользователи для пользования

| Email            | Пароль    |
| ---------------- | --------- |
| admin@test.com   | admin123  |
| user@test.com    | user123   |


## Демонстрация

![Демо работы](demo/0609.gif)

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

## Архитектура приложения

Проект построен как единое Node.js-приложение (монорепозиторий), где сервер Express отдаёт EJS-шаблоны и обслуживает REST API.

```
[ Браузер (клиент) ]
        │
        ├── GET/POST запросы (страницы, API)
        ▼
[ Express Server (app.js) ]
        │
        ├── Маршруты страниц (/login, /register, /todos)
        ├── API-маршруты (/api/register, /api/login, /api/todos)
        ├── Middleware auth.js (проверка JWT)
        │
        ▼
[ SQLite Database (database.sqlite) ]
```
## Модель данных (ERD)
![ER-диаграмма](/erd.png)


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
├── app.js                     # точка входа сервера
├── package.json
├── .env.example
├── seed.js                    # ручной посев (опционально)
├── middleware/
│   ├── verifyAccess.js        # проверка access-токена из куки
│   └── verifyRefresh.js       # проверка refresh-токена из куки
├── routes/
│   ├── authRoutes.js          # регистрация, вход, выход, обновление токенов
│   └── todoRoutes.js          # CRUD задач
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── todos.ejs
├── public/
│   ├── css/
│   │   └── dark-theme.css     # стили тёмной/светлой темы и кнопки переключения
│   └── js/
│       ├── app.js             # клиентская логика задач
│       └── theme.js           # переключатель тем
└── database.sqlite (в .gitignore)
```

##  Лицензия
- Проект создан в учебных целях.
