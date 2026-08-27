document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadConverterForm");
  if (!form) return;

  const btnSubmit = document.getElementById("btnSubmitForm");
  const successMessage = document.getElementById("successMessage");
  const originalBtnText = btnSubmit.innerHTML;

  const fields = {
    leadName: (v) => v.trim().length >= 5 || "Informe seu nome completo.",
    leadCompany: (v) => v.trim().length >= 2 || "Informe o nome da empresa.",
    leadRole: (v) => v.trim().length >= 2 || "Informe seu cargo.",
    leadEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Informe um e-mail válido.",
    leadCompanySize: (v) => v !== "" || "Selecione o número de colaboradores.",
  };

  function validateField(input) {
    const rule = fields[input.id];
    if (!rule) return true;
    const errorEl = document.getElementById(input.id + "Error");
    const result = rule(input.value);

    if (result === true) {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      if (errorEl) errorEl.textContent = "";
      return true;
    }

    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((id) => {
      const input = document.getElementById(id);
      if (input && !validateField(input)) isValid = false;
    });

    if (!isValid) {
      form.querySelector(".is-invalid")?.focus();
      return;
    }

    btnSubmit.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
    btnSubmit.disabled = true;

    try {
      // Netlify Forms: funciona automaticamente quando publicado na Netlify,
      // graças ao atributo data-netlify="true" do <form> no index.html.
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      successMessage.classList.remove("d-none");
      form.reset();

      setTimeout(() => {
        successMessage.classList.add("d-none");
      }, 6000);
    } catch (err) {
      successMessage.classList.remove("d-none", "alert-success");
      successMessage.classList.add("alert-danger");
      successMessage.innerHTML =
        '<i class="bi bi-exclamation-circle-fill me-2"></i> Não foi possível enviar agora. Tente novamente em instantes.';
    } finally {
      btnSubmit.innerHTML = originalBtnText;
      btnSubmit.disabled = false;
    }
  });
});
