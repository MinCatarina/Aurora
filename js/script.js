// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after choosing a link (mobile)
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Lead form: validation + accessible feedback + Netlify submit ----------
const form = document.getElementById('leadForm');
const statusEl = document.getElementById('formStatus');

const validators = {
  nome: (v) => v.trim().length >= 3 || 'Informe seu nome completo.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Informe um e-mail válido.',
  cargo: (v) => v.trim().length >= 2 || 'Informe seu cargo.',
  tamanho_empresa: (v) => v !== '' || 'Selecione o tamanho da empresa.',
};

function validateField(field) {
  const rule = validators[field.name];
  const errorEl = document.getElementById('err-' + field.id);
  if (!rule) return true;

  const result = rule(field.value);
  if (result === true) {
    field.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
  field.setAttribute('aria-invalid', 'true');
  if (errorEl) errorEl.textContent = result;
  return false;
}

if (form) {
  // Validate on blur for immediate, non-intrusive feedback
  form.querySelectorAll('input[required], select[required]').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isValid = true;
    form.querySelectorAll('input[required], select[required]').forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      statusEl.textContent = 'Verifique os campos destacados antes de enviar.';
      statusEl.className = 'form-status is-error';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      // Netlify Forms endpoint — works automatically once deployed on Netlify
      // with the form's data-netlify="true" attribute (see index.html).
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      form.reset();
      form.hidden = true;
      statusEl.textContent = 'Recebemos sua solicitação! Nosso time entrará em contato em breve.';
      statusEl.className = 'form-status is-success';
    } catch (err) {
      statusEl.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      statusEl.className = 'form-status is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Quero falar com vendas';
    }
  });
}
