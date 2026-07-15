document.addEventListener('DOMContentLoaded', () => {
  const privatePanel = document.querySelector('#account-private');
  const loginRequired = document.querySelector('#account-login-required');
  const logoutButton = document.querySelector('#account-logout');

  if (!window.MuFireburstAccounts) return;

  const account = MuFireburstAccounts.getCurrentAccount();

  if (!account) {
    if (privatePanel) privatePanel.hidden = true;
    if (loginRequired) loginRequired.hidden = false;
    return;
  }

  if (privatePanel) privatePanel.hidden = false;
  if (loginRequired) loginRequired.hidden = true;

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  setText('[data-account="username"]', account.username);
  setText('[data-account="email"]', account.email);
  setText('[data-account="credits"]', account.credits.toLocaleString('es-AR'));
  setText('[data-account="pcbang"]', account.pcbang.toLocaleString('es-AR'));
  setText('[data-account="vip"]', account.vip);
  setText('[data-account="status"]', account.accountStatus);
  setText('[data-account="forum"]', account.forumStatus);
  setText('[data-account="last"]', account.lastConnection);
  setText('[data-account="vip-expiration"]', account.vipExpiration);

  const list = document.querySelector('#character-list');
  if (list) {
    list.innerHTML = account.characters.map((character) => {
      const maxStat = 65535;
      const stats = Object.entries(character.stats).map(([name, value]) => {
        const percent = Math.min(100, Math.round((Number(value) / maxStat) * 100));
        return `
          <div class="character-card__stat">
            <span>${name}</span>
            <div class="character-card__bar"><strong style="width:${percent}%">${Number(value).toLocaleString('es-AR')}</strong></div>
          </div>
        `;
      }).join('');

      return `
        <article class="character-card">
          <div class="character-card__profile">
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="Personaje ${character.name}" width="220" height="220" loading="lazy" decoding="async">
            <p>${character.race}</p>
          </div>
          <div class="character-card__info">
            <h4>Stats</h4>
            ${stats}
          </div>
          <div class="character-card__badges">
            <span>Nivel: ${character.level}</span>
            <span>Resets: ${character.resets}</span>
            <span>Master Resets: ${character.masterResets}</span>
            <span>Zen: ${character.zen}</span>
            <span>Ubicación: ${character.location}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      MuFireburstAccounts.logout();
      window.location.href = '../index.html?logout=1#inicio';
    });
  }
});

window.addEventListener('mufireburst-session-expired', () => {
  if (!window.MuFireburstAccounts) return;
  MuFireburstAccounts.setLoginNotice('Tu sesión se cerró por inactividad. Volvé a ingresar para continuar.');
  window.location.href = '../index.html#inicio';
});
