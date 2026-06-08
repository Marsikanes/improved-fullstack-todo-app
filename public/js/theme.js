(function() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // При загрузке проверяем сохранённую тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.textContent = '☀️';
  } else {
    // по умолчанию тёмная тема
    toggleBtn.textContent = '🌙';
  }

  // Переключение по клику
  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    if (isLight) {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';   // иконка солнца
    } else {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';   // иконка луны
    }
  });
})();