// Проверка авторизации: если нет куки access_token, редирект на /login
// Куки httpOnly не видны из JS, поэтому делаем запрос к /api/todos и при 401 перенаправляем
async function checkAuth() {
  const res = await fetch('/api/todos', { credentials: 'same-origin' });
  if (res.status === 401) {
    // пробуем обновить токен
    const refreshRes = await fetch('/api/refresh', { method: 'POST', credentials: 'same-origin' });
    if (refreshRes.ok) {
      return true;
    } else {
      window.location.href = '/login';
      return false;
    }
  }
  return res.ok;
}

// Переменная для хранения ID задачи, которую собираемся удалить
let todoIdToDelete = null;

// Инициализация
(async function init() {
  const authorized = await checkAuth();
  if (!authorized) return;

  // Обработчики
  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.href = '/login';
  });

  document.getElementById('addBtn')?.addEventListener('click', addTodo);
  document.getElementById('newTodoText')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  // Обработчик подтверждения удаления в модальном окне
  document.getElementById('confirmDeleteBtn')?.addEventListener('click', async () => {
    if (todoIdToDelete) {
      await deleteTodo(todoIdToDelete);
      todoIdToDelete = null;
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      if (modal) modal.hide();
    }
  });

  await refreshTodos();
})();

// Функции работы с задачами
async function refreshTodos() {
  try {
    const res = await fetch('/api/todos', { credentials: 'same-origin' });
    if (res.status === 401) {
      const refreshed = await checkAuth();
      if (refreshed) return refreshTodos();
      else return;
    }
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    showError(err.message);
  }
}

function renderTodos(todos) {
  const list = document.getElementById('todoList');
  if (!list) return;
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between';
    li.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1 me-3">
        <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
        <span class="todo-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}">${escapeHtml(todo.text)}</span>
        <input type="text" class="form-control form-control-sm ms-2 d-none todo-edit-input" value="${escapeHtml(todo.text)}">
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary edit-btn" data-id="${todo.id}">Изменить</button>
        <button class="btn btn-outline-danger delete-btn" data-id="${todo.id}">Удалить</button>
      </div>
    `;
    list.appendChild(li);
  });

  // привязываем события
  document.querySelectorAll('.form-check-input').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      await updateTodo(id, { completed: e.target.checked ? 1 : 0 });
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const li = e.target.closest('li');
      const span = li.querySelector('.todo-text');
      const input = li.querySelector('.todo-edit-input');
      if (input.classList.contains('d-none')) {
        span.classList.add('d-none');
        input.classList.remove('d-none');
        input.focus();
        e.target.textContent = 'Сохранить';
      } else {
        const newText = input.value.trim();
        if (newText) updateTodo(id, { text: newText });
        else {
          span.classList.remove('d-none');
          input.classList.add('d-none');
          e.target.textContent = 'Изменить';
        }
      }
    });
  });

  // Удаление через модальное окно
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      todoIdToDelete = e.target.dataset.id;
      const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
      modal.show();
    });
  });
}

async function addTodo() {
  const input = document.getElementById('newTodoText');
  const text = input.value.trim();
  if (!text) return;
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (res.status === 401) {
      const refreshed = await checkAuth();
      if (refreshed) return addTodo();
      else return;
    }
    input.value = '';
    await refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function updateTodo(id, fields) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.status === 401) {
      const refreshed = await checkAuth();
      if (refreshed) return updateTodo(id, fields);
      else return;
    }
    await refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    });
    if (res.status === 401) {
      const refreshed = await checkAuth();
      if (refreshed) return deleteTodo(id);
      else return;
    }
    await refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

function showError(msg) {
  const errDiv = document.getElementById('error');
  if (errDiv) {
    errDiv.textContent = msg;
    errDiv.classList.remove('d-none');
    setTimeout(() => errDiv.classList.add('d-none'), 3000);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}