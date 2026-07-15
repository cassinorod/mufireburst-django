document.addEventListener('DOMContentLoaded', () => {
  if (!window.MuFireburstAccounts) return;

  function requireShopLogin() {
    const account = MuFireburstAccounts.getCurrentAccount();
    if (account) return;

    MuFireburstAccounts.setReturnTo('pages/tienda.html');
    MuFireburstAccounts.setLoginNotice('Logeate para poder ver la tienda.');
    const goLogin = () => window.location.replace('../index.html#inicio');
    if (typeof window.showMuFireburstAttention === 'function') {
      window.showMuFireburstAttention('Logeate para poder ver la tienda.', goLogin);
    } else {
      goLogin();
    }
  }

  requireShopLogin();
});

window.addEventListener('pageshow', () => {
  if (!window.MuFireburstAccounts) return;
  const account = MuFireburstAccounts.getCurrentAccount();
  if (account) return;

  MuFireburstAccounts.setReturnTo('pages/tienda.html');
  MuFireburstAccounts.setLoginNotice('Logeate para poder ver la tienda.');
  window.location.replace('../index.html#inicio');
});

window.addEventListener('mufireburst-session-expired', () => {
  if (!window.MuFireburstAccounts) return;
  MuFireburstAccounts.setReturnTo('pages/tienda.html');
  MuFireburstAccounts.setLoginNotice('Tu sesión se cerró por inactividad. Volvé a ingresar para comprar en la tienda.');
  window.location.replace('../index.html#inicio');
});
