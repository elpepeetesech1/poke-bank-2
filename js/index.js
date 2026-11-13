const form = document.getElementById('form-login');
const pinInput = document.getElementById('pin');

function mostrarError(titulo, texto)
{
  pinInput.value = '';
  Swal.fire({ icon: 'error', title: titulo, text: texto, confirmButtonColor: '#1b1f3b' })
    .then(() => pinInput.focus());
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const pinIngresado = pinInput.value.trim();

  // ValidateJS devuelve un array con los errores, o undefined si todo está bien
  const errores = validate.single(pinIngresado, {
    presence: { allowEmpty: false, message: '^Ingresa tu PIN' },
    format: { pattern: /^\d{4}$/, message: '^El PIN debe tener exactamente 4 dígitos' }
  });
  if (errores) {
    mostrarError('PIN no válido', errores[0]);
    return;
  }

  const user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user && pinIngresado === user.pin) {
    sessionStorage.setItem('pokebank_logged', 'true');
    window.location.href = 'acciones.html';
  } else {
    mostrarError('PIN incorrecto', 'Verifica tu PIN e inténtalo de nuevo.');
  }
});
