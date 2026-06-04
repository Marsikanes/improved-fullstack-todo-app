const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login';
}

const apiBase = window.location.origin;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Выйти из аккаунта
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
});

//Ловит и рендерит задачки
async function fetchTodos() {
  try {
    const res = await fetch(`${apiBase}/api/todos`, { headers });
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return [];
    }
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    showError(err.message);
    return [];
  }
}

function showError(msg) {
  const errDiv = document.getElementById('error');
  errDiv.textContent = msg;
  errDiv.classList.remove('d-none');
  setTimeout(() => errDiv.classList.add('d-none'), 3000);
}

function renderTodos(todos) {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between';
    li.innerHTML = `
      <div class="d-flex align-items-center flex-grow-1 me-3">
        <input type="checkbox" class="form-check-input me-2 todo-check" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
        <span class="todo-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}">${escapeHtml(todo.text)}</span>
        <input type="text" class="form-control form-control-sm ms-2 d-none todo-edit-input" value="${escapeHtml(todo.text)}">
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary edit-btn" data-id="${todo.id}">Edit</button>
        <button class="btn btn-outline-danger delete-btn" data-id="${todo.id}">Del</button>
      </div>
    `;
    list.appendChild(li);
  });


  document.querySelectorAll('.todo-check').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      const completed = e.target.checked ? 1 : 0;
      await updateTodo(id, { completed });
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const li = e.target.closest('li');
      const span = li.querySelector('.todo-text');
      const input = li.querySelector('.todo-edit-input');
      const isEditing = input.classList.contains('d-none');

      if (isEditing) {
        // Войти в режим редактирования
        span.classList.add('d-none');
        input.classList.remove('d-none');
        input.focus();
        e.target.textContent = 'Save';
      } else {
        // Сохранить
        const newText = input.value.trim();
        if (newText) {
          updateTodo(id, { text: newText });
        } else {
            // Отменить если пусто
          span.classList.remove('d-none');
          input.classList.add('d-none');
          e.target.textContent = 'Edit';
        }
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (confirm('Delete this task?')) {
        await deleteTodo(id);
      }
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function addTodo(text) {
  try {
    const res = await fetch(`${apiBase}/api/todos`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text })
    });
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to add');
    }
    refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function updateTodo(id, fields) {
  try {
    const res = await fetch(`${apiBase}/api/todos/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(fields)
    });
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Update failed');
    }
    refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${apiBase}/api/todos/${id}`, {
      method: 'DELETE',
      headers
    });
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Delete failed');
    }
    refreshTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function refreshTodos() {
  const todos = await fetchTodos();
  renderTodos(todos);
}


document.getElementById('addBtn').addEventListener('click', () => {
  const input = document.getElementById('newTodoText');
  const text = input.value.trim();
  if (text) {
    addTodo(text);
    input.value = '';
  }
});

document.getElementById('newTodoText').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('addBtn').click();
  }
});


refreshTodos();