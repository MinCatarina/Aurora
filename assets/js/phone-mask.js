// Máscara simples de telefone brasileiro: (00) 00000-0000
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("leadPhone");
  if (!phoneInput) return;

  phoneInput.addEventListener("input", function (e) {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;

    if (digits.length > 0) formatted = "(" + digits.slice(0, 2);
    if (digits.length >= 3) formatted += ") " + digits.slice(2, 7);
    if (digits.length >= 8) formatted += "-" + digits.slice(7, 11);

    e.target.value = formatted;
  });
});
