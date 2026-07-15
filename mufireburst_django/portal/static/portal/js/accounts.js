const MuFireburstAccounts = (() => {
  const STORAGE_KEY = "mufireburst-accounts";
  const SESSION_KEY = "mufireburst-current-account-v2";
  const RETURN_KEY = "mufireburst-after-login";
  const LOGIN_NOTICE_KEY = "mufireburst-login-notice";
  const LEGACY_SESSION_KEY = "mufireburst-current-account";
  localStorage.removeItem(LEGACY_SESSION_KEY);
  const SESSION_TIMEOUT = 5 * 60 * 1000;

  const baseAccounts = [
    {
      username: "rOdree",
      password: "1234",
      email: "rodree@mufireburst.com",
      credits: 0,
      pcbang: 21065963,
      vip: "VIP GOLD",
      accountStatus: "Activada",
      forumStatus: "Pendiente",
      lastConnection: "29 de junio de 2026 @ 10:36:00",
      vipExpiration: "29 de julio de 2026 @ 10:32",
      characters: [
        {
          name: "AstarothBK",
          race: "Blade Knight",
          image: "../img/account-bk.png",
          level: 400,
          resets: 144,
          masterResets: 6,
          zen: "845.708.207",
          location: "Tarkan (55 - 172)",
          stats: { Fuerza: 65535, Agilidad: 65535, Vitalidad: 65535, Energia: 65535 }
        },
        {
          name: "ArcanumSM",
          race: "Soul Master",
          image: "../img/account-sm.png",
          level: 400,
          resets: 121,
          masterResets: 4,
          zen: "712.450.900",
          location: "Devias (186 - 44)",
          stats: { Fuerza: 18500, Agilidad: 40200, Vitalidad: 35600, Energia: 65535 }
        },
        {
          name: "Elyndra",
          race: "Muse Elf",
          image: "../img/account-elf.png",
          level: 400,
          resets: 98,
          masterResets: 3,
          zen: "617.242.997",
          location: "Noria (146 - 129)",
          stats: { Fuerza: 18200, Agilidad: 65535, Vitalidad: 42800, Energia: 37150 }
        },
        {
          name: "NoctariusDL",
          race: "Dark Lord",
          image: "../img/account-dl.png",
          level: 400,
          resets: 76,
          masterResets: 2,
          zen: "1.163.608.930",
          location: "Karutan 2 (69 - 55)",
          stats: { Fuerza: 25076, Agilidad: 25070, Vitalidad: 20879, Energia: 15985, Comando: 45150 }
        },
        {
          name: "ValthorMG",
          race: "Magic Gladiator",
          image: "../img/account-mg.png",
          level: 400,
          resets: 53,
          masterResets: 1,
          zen: "1.030.010.118",
          location: "Atlans (44 - 121)",
          stats: { Fuerza: 49787, Agilidad: 49787, Vitalidad: 19000, Energia: 28810 }
        }
      ]
    },
    {
      username: "n3tting",
      password: "1234",
      email: "n3tting@mufireburst.com",
      credits: 120,
      pcbang: 8500000,
      vip: "VIP SILVER",
      accountStatus: "Activada",
      forumStatus: "Activo",
      lastConnection: "28 de junio de 2026 @ 22:15:00",
      vipExpiration: "18 de julio de 2026 @ 18:00",
      characters: [
        {
          name: "DrakenBK",
          race: "Blade Knight",
          image: "../img/account-bk.png",
          level: 400,
          resets: 88,
          masterResets: 2,
          zen: "390.501.770",
          location: "Lorencia (125 - 118)",
          stats: { Fuerza: 61200, Agilidad: 52500, Vitalidad: 44000, Energia: 17000 }
        },
        {
          name: "CryonSM",
          race: "Soul Master",
          image: "../img/account-sm.png",
          level: 400,
          resets: 67,
          masterResets: 1,
          zen: "450.992.140",
          location: "Lost Tower (210 - 86)",
          stats: { Fuerza: 12000, Agilidad: 33500, Vitalidad: 28200, Energia: 65535 }
        },
        {
          name: "Sylphia",
          race: "Muse Elf",
          image: "../img/account-elf.png",
          level: 389,
          resets: 209,
          masterResets: 1,
          zen: "617.242.997",
          location: "Noria (175 - 92)",
          stats: { Fuerza: 18200, Agilidad: 65535, Vitalidad: 42800, Energia: 37150 }
        },
        {
          name: "ValerianDL",
          race: "Dark Lord",
          image: "../img/account-dl.png",
          level: 400,
          resets: 41,
          masterResets: 1,
          zen: "295.670.990",
          location: "Icarus (29 - 80)",
          stats: { Fuerza: 22000, Agilidad: 26000, Vitalidad: 18000, Energia: 24000, Comando: 33000 }
        },
        {
          name: "NoxGladius",
          race: "Magic Gladiator",
          image: "../img/account-mg.png",
          level: 400,
          resets: 73,
          masterResets: 2,
          zen: "538.204.710",
          location: "Arena (89 - 102)",
          stats: { Fuerza: 56000, Agilidad: 48900, Vitalidad: 21500, Energia: 39200 }
        }
      ]
    },
    {
      username: "LinZzZ",
      password: "1234",
      email: "linzzz@mufireburst.com",
      credits: 300,
      pcbang: 14200000,
      vip: "VIP GOLD",
      accountStatus: "Activada",
      forumStatus: "Pendiente",
      lastConnection: "29 de junio de 2026 @ 13:05:00",
      vipExpiration: "02 de agosto de 2026 @ 09:10",
      characters: [
        {
          name: "RagnarBK",
          race: "Blade Knight",
          image: "../img/account-bk.png",
          level: 400,
          resets: 112,
          masterResets: 5,
          zen: "885.110.230",
          location: "Tarkan (55 - 172)",
          stats: { Fuerza: 65535, Agilidad: 61500, Vitalidad: 52900, Energia: 21000 }
        },
        {
          name: "AurelionSM",
          race: "Soul Master",
          image: "../img/account-sm.png",
          level: 400,
          resets: 157,
          masterResets: 1,
          zen: "647.572.124",
          location: "Devias (211 - 47)",
          stats: { Fuerza: 15500, Agilidad: 40500, Vitalidad: 35000, Energia: 65535 }
        },
        {
          name: "Lunarya",
          race: "Muse Elf",
          image: "../img/account-elf.png",
          level: 400,
          resets: 64,
          masterResets: 2,
          zen: "302.100.440",
          location: "Noria (164 - 88)",
          stats: { Fuerza: 16000, Agilidad: 65535, Vitalidad: 31000, Energia: 42000 }
        },
        {
          name: "Noctarius",
          race: "Dark Lord",
          image: "../img/account-dl.png",
          level: 400,
          resets: 34,
          masterResets: 3,
          zen: "1.163.608.930",
          location: "Karutan 2 (69 - 55)",
          stats: { Fuerza: 25076, Agilidad: 25070, Vitalidad: 879, Energia: 15985, Comando: 15150 }
        },
        {
          name: "AzraelMG",
          race: "Magic Gladiator",
          image: "../img/account-mg.png",
          level: 400,
          resets: 91,
          masterResets: 3,
          zen: "730.904.331",
          location: "Atlans (78 - 134)",
          stats: { Fuerza: 65535, Agilidad: 41200, Vitalidad: 26800, Energia: 51000 }
        }
      ]
    }
  ];

  const characterTemplates = [
    { race: "Blade Knight", image: "../img/account-bk.png", location: "Lorencia (125 - 118)", stats: { Fuerza: 18000, Agilidad: 14000, Vitalidad: 12000, Energia: 6000 } },
    { race: "Soul Master", image: "../img/account-sm.png", location: "Devias (211 - 47)", stats: { Fuerza: 6000, Agilidad: 12000, Vitalidad: 10000, Energia: 20000 } },
    { race: "Muse Elf", image: "../img/account-elf.png", location: "Noria (175 - 92)", stats: { Fuerza: 8000, Agilidad: 22000, Vitalidad: 9000, Energia: 15000 } },
    { race: "Magic Gladiator", image: "../img/account-mg.png", location: "Atlans (44 - 121)", stats: { Fuerza: 16000, Agilidad: 16000, Vitalidad: 11000, Energia: 17000 } },
    { race: "Dark Lord", image: "../img/account-dl.png", location: "Tarkan (55 - 172)", stats: { Fuerza: 14000, Agilidad: 9000, Vitalidad: 12000, Energia: 10000, Comando: 18000 } }
  ];

  function normalizeName(value) {
    return String(value || "").trim();
  }

  function getAccounts() {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const names = new Set(stored.map((account) => account.username.toLowerCase()));
    const missingBase = baseAccounts.filter((account) => !names.has(account.username.toLowerCase()));
    const merged = [...missingBase, ...stored];
    return merged;
  }

  function saveCustomAccounts(accounts) {
    const custom = accounts.filter((account) => !baseAccounts.some((base) => base.username.toLowerCase() === account.username.toLowerCase()));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
  }

  function findAccount(username) {
    const user = normalizeName(username).toLowerCase();
    return getAccounts().find((account) => account.username.toLowerCase() === user) || null;
  }

  function createAccount(data) {
    const username = normalizeName(data.username);
    if (!username) throw new Error("El usuario es obligatorio.");
    if (findAccount(username)) throw new Error("Ese nombre de usuario ya existe.");

    const template = characterTemplates[Math.floor(Math.random() * characterTemplates.length)];
    const account = {
      username,
      password: String(data.password || ""),
      email: String(data.email || "sin-correo@mufireburst.com"),
      credits: 0,
      pcbang: 0,
      vip: "Sin VIP",
      accountStatus: "Activada",
      forumStatus: "Pendiente",
      lastConnection: "Primera conexión pendiente",
      vipExpiration: "Sin vencimiento VIP",
      characters: [
        {
          name: `${username}MF`,
          race: template.race,
          image: template.image,
          level: 1,
          resets: 0,
          masterResets: 0,
          zen: "0",
          location: template.location,
          stats: template.stats
        }
      ]
    };

    const accounts = getAccounts();
    accounts.push(account);
    saveCustomAccounts(accounts);
    setCurrentAccount(username);
    return account;
  }

  function login(username, password) {
    const account = findAccount(username);
    if (!account || String(account.password) !== String(password)) return null;
    setCurrentAccount(account.username);
    return account;
  }

  function readSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.username || !parsed.lastActivity) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return parsed;
    } catch (error) {
      // Sesiones antiguas guardadas como texto plano ya no son válidas.
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  function writeSession(username) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      username,
      lastActivity: Date.now()
    }));
  }

  function setCurrentAccount(username) {
    writeSession(username);
  }

  function touchSession() {
    const session = readSession();
    if (!session || !session.username) return;
    const elapsed = Date.now() - Number(session.lastActivity || 0);
    if (elapsed > SESSION_TIMEOUT) {
      logout();
      window.dispatchEvent(new CustomEvent('mufireburst-session-expired'));
      return;
    }
    writeSession(session.username);
  }

  function getCurrentAccount() {
    const session = readSession();
    if (!session || !session.username) return null;

    const elapsed = Date.now() - Number(session.lastActivity || 0);
    if (elapsed > SESSION_TIMEOUT) {
      logout();
      return null;
    }

    writeSession(session.username);
    return findAccount(session.username);
  }

  function setReturnTo(path) {
    localStorage.setItem(RETURN_KEY, path);
  }

  function consumeReturnTo() {
    const path = localStorage.getItem(RETURN_KEY);
    localStorage.removeItem(RETURN_KEY);
    return path || '';
  }

  function setLoginNotice(message) {
    localStorage.setItem(LOGIN_NOTICE_KEY, message);
  }

  function consumeLoginNotice() {
    const message = localStorage.getItem(LOGIN_NOTICE_KEY);
    localStorage.removeItem(LOGIN_NOTICE_KEY);
    return message || '';
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  let lastTouch = 0;
  ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'].forEach((eventName) => {
    window.addEventListener(eventName, () => {
      const now = Date.now();
      if (now - lastTouch < 15000) return;
      lastTouch = now;
      touchSession();
    }, { passive: true });
  });

  setInterval(() => {
    const session = readSession();
    if (!session || !session.username) return;
    const elapsed = Date.now() - Number(session.lastActivity || 0);
    if (elapsed > SESSION_TIMEOUT) {
      logout();
      window.dispatchEvent(new CustomEvent('mufireburst-session-expired'));
    }
  }, 30000);

  return {
    getAccounts,
    findAccount,
    createAccount,
    login,
    getCurrentAccount,
    touchSession,
    setReturnTo,
    consumeReturnTo,
    setLoginNotice,
    consumeLoginNotice,
    logout
  };
})();

window.MuFireburstAccounts = MuFireburstAccounts;

function showMuFireburstAttention(message, onAccept) {
  const oldModal = document.querySelector('.attention-modal');
  if (oldModal) oldModal.remove();

  const modal = document.createElement('div');
  modal.className = 'attention-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="attention-modal__box">
      <div class="attention-modal__header">ATENCIÓN</div>
      <div class="attention-modal__body">${message}</div>
      <div class="attention-modal__actions">
        <button class="attention-modal__button" type="button">Aceptar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const button = modal.querySelector('.attention-modal__button');
  button.focus();

  function close() {
    modal.remove();
    if (typeof onAccept === 'function') onAccept();
  }

  button.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', function escHandler(event) {
    if (event.key === 'Escape') {
      document.removeEventListener('keydown', escHandler);
      close();
    }
  });
}

window.showMuFireburstAttention = showMuFireburstAttention;


document.addEventListener('DOMContentLoaded', () => {
  if (!window.MuFireburstAccounts) return;

  const isPageFolder = window.location.pathname.includes('/pages/');
  const loginUrl = isPageFolder ? '../index.html#inicio' : 'index.html#inicio';

  document.querySelectorAll('a[href$="tienda.html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const account = MuFireburstAccounts.getCurrentAccount();
      if (account) return;

      event.preventDefault();
      MuFireburstAccounts.setReturnTo('pages/tienda.html');
      MuFireburstAccounts.setLoginNotice('Logeate para poder ver la tienda.');
      showMuFireburstAttention('Logeate para poder ver la tienda.', () => {
        window.location.href = loginUrl;
      });
    });
  });
});
