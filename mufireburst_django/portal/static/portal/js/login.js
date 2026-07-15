document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.login-box');
  const form = document.querySelector('.login-box__form');
  const userInput = document.querySelector('#login-usuario');
  const passwordInput = document.querySelector('#login-password');
  const message = document.querySelector('#login-message');

  if (!box || !form || !userInput || !passwordInput || !window.MuFireburstAccounts) return;

  function showMessage(text) {
    if (!message || !text) return;
    message.textContent = text;
    message.classList.add('is-visible');
  }

  function renderLoggedState(account) {
    if (!account) return;
    form.hidden = true;
    box.querySelectorAll('.login-box__link').forEach((link) => {
      link.hidden = true;
    });

    let sessionBox = box.querySelector('.login-box__session');
    if (!sessionBox) {
      sessionBox = document.createElement('div');
      sessionBox.className = 'login-box__session';
      form.insertAdjacentElement('afterend', sessionBox);
    }

    sessionBox.innerHTML = `
      <p class="login-box__session-text">Sesión iniciada como <strong>${account.username}</strong></p>
      <a class="login-box__button login-box__button--link" href="pages/cuenta.html">Mi cuenta</a>
      <a class="login-box__button login-box__button--link" href="pages/tienda.html">Tienda</a>
      <button class="login-box__button login-box__button--ghost" type="button" id="login-logout">Cerrar sesión</button>
    `;

    const logoutButton = sessionBox.querySelector('#login-logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        MuFireburstAccounts.logout();
        window.location.href = 'index.html?logout=1#inicio';
      });
    }
  }

  const current = MuFireburstAccounts.getCurrentAccount();
  if (current) {
    renderLoggedState(current);
    return;
  }

  userInput.value = '';
  passwordInput.value = '';

  const notice = MuFireburstAccounts.consumeLoginNotice();
  if (notice) showMessage(notice);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const account = MuFireburstAccounts.login(userInput.value, passwordInput.value);

    if (!account) {
      showMessage('Usuario o contraseña incorrectos. Revisá los datos ingresados.');
      return;
    }

    const returnTo = MuFireburstAccounts.consumeReturnTo();
    window.location.href = returnTo || 'pages/cuenta.html';
  });
});

window.addEventListener('pageshow', () => {
  if (!window.MuFireburstAccounts) return;
  const account = MuFireburstAccounts.getCurrentAccount();
  const form = document.querySelector('.login-box__form');
  const sessionBox = document.querySelector('.login-box__session');
  if (account || !sessionBox || !form) return;
  sessionBox.remove();
  form.hidden = false;
  const userInput = document.querySelector('#login-usuario');
  const passwordInput = document.querySelector('#login-password');
  if (userInput) userInput.value = '';
  if (passwordInput) passwordInput.value = '';
  document.querySelectorAll('.login-box__link').forEach((link) => {
    link.hidden = false;
  });
});
