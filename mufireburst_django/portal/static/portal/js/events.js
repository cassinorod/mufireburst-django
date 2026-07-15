document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'mufireburst-event-registrations';
  const buttons = document.querySelectorAll('[data-event-register]');
  const notice = document.querySelector('#event-register-notice');

  if (!buttons.length || !window.MuFireburstAccounts) return;

  const eventNames = {
    'blood-castle': 'Blood Castle',
    'devil-square': 'Devil Square',
    'chaos-castle': 'Chaos Castle',
    'castle-siege': 'Castle Siege'
  };

  function currentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  function readRegistrations() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  }

  function saveRegistrations(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function showNotice(message, type = 'success') {
    if (!notice) return;
    notice.textContent = message;
    notice.hidden = false;
    notice.classList.remove('is-error', 'is-success');
    notice.classList.add(type === 'error' ? 'is-error' : 'is-success');
  }

  function isRegistered(username, eventId) {
    const data = readRegistrations();
    const month = currentMonthKey();
    return Boolean(data[username] && data[username][month] && data[username][month].includes(eventId));
  }

  function markRegistered(username, eventId) {
    const data = readRegistrations();
    const month = currentMonthKey();
    if (!data[username]) data[username] = {};
    if (!data[username][month]) data[username][month] = [];
    if (!data[username][month].includes(eventId)) data[username][month].push(eventId);
    saveRegistrations(data);
  }

  function updateButtons() {
    const account = MuFireburstAccounts.getCurrentAccount();

    buttons.forEach((button) => {
      const eventId = button.dataset.eventRegister;
      const status = document.querySelector(`[data-event-status="${eventId}"]`);

      if (!account) {
        button.disabled = false;
        button.textContent = 'Registrarme al especial mensual';
        if (status) status.textContent = 'Necesitás iniciar sesión para registrar tu cuenta en este evento.';
        return;
      }

      if (isRegistered(account.username, eventId)) {
        button.disabled = true;
        button.textContent = 'Ya estás registrado este mes';
        if (status) status.textContent = `${account.username}, ya registraste tu cuenta para ${eventNames[eventId]} este mes.`;
        return;
      }

      button.disabled = false;
      button.textContent = 'Registrarme al especial mensual';
      if (status) status.textContent = `Disponible para ${account.username}. Solo podés registrarte una vez por mes.`;
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const eventId = button.dataset.eventRegister;
      const account = MuFireburstAccounts.getCurrentAccount();
      const eventName = eventNames[eventId] || 'este evento';

      if (!account) {
        MuFireburstAccounts.setReturnTo(`pages/eventos.html#${eventId}`);
        MuFireburstAccounts.setLoginNotice('Logeate para poder registrarte al evento mensual.');
        showMuFireburstAttention('Logeate para poder registrarte al evento mensual.', () => {
          window.location.href = '../index.html#inicio';
        });
        return;
      }

      if (isRegistered(account.username, eventId)) {
        showNotice(`Ya estás registrado en ${eventName} este mes.`, 'error');
        updateButtons();
        return;
      }

      markRegistered(account.username, eventId);
      showNotice(`Registro confirmado: ${account.username} quedó anotado en ${eventName} para el especial mensual.`);
      updateButtons();
    });
  });

  updateButtons();
});

window.addEventListener('mufireburst-session-expired', () => {
  if (!window.MuFireburstAccounts) return;
  MuFireburstAccounts.setLoginNotice('Tu sesión se cerró por inactividad. Volvé a ingresar para continuar.');
  window.location.href = '../index.html#inicio';
});
