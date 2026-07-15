document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#register-form');
  const captcha = document.querySelector('[data-captcha]');
  const captchaHelp = document.querySelector('#captcha-help');
  const success = document.querySelector('#register-success');
  const password = document.querySelector('#reg-password');
  const passwordConfirm = document.querySelector('#reg-password-confirm');
  const securityCode = document.querySelector('#reg-security');
  const username = document.querySelector('#reg-user');
  const email = document.querySelector('#reg-email');

  if (!form || !captcha || !success) return;

  let captchaChecked = false;

  function toggleCaptcha() {
    captchaChecked = !captchaChecked;
    captcha.classList.toggle('is-checked', captchaChecked);
    captcha.classList.remove('fake-captcha--error');
    captcha.setAttribute('aria-pressed', captchaChecked ? 'true' : 'false');

    if (captchaHelp) {
      captchaHelp.textContent = captchaChecked
        ? 'Verificación completada.'
        : 'Marcá la verificación antes de crear la cuenta.';
    }
  }

  captcha.addEventListener('click', toggleCaptcha);
  captcha.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCaptcha();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (password && passwordConfirm) {
      passwordConfirm.setCustomValidity(
        password.value === passwordConfirm.value ? '' : 'Las contraseñas no coinciden.'
      );
    }

    if (securityCode) {
      securityCode.setCustomValidity(
        /^\d{7}$/.test(securityCode.value) ? '' : 'El código de seguridad debe tener 7 números.'
      );
    }

    if (!captchaChecked) {
      captcha.classList.add('fake-captcha--error');
      if (captchaHelp) captchaHelp.textContent = 'Tenés que completar la verificación.';
      captcha.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      if (window.MuFireburstAccounts) {
        MuFireburstAccounts.createAccount({
          username: username ? username.value : '',
          email: email ? email.value : '',
          password: password ? password.value : ''
        });
      }
    } catch (error) {
      username.setCustomValidity(error.message);
      form.reportValidity();
      username.addEventListener('input', () => username.setCustomValidity(''), { once: true });
      return;
    }

    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
