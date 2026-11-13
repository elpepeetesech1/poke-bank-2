const form = document.getElementById('form-login');
const pinInput = document.getElementById('pin');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const pinIngresado = pinInput.value.trim();
  const user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user && pinIngresado === user.pin) {
    sessionStorage.setItem('pokebank_logged', 'true');
    window.location.href = 'acciones.html';
  } else {
    pinInput.value = '';
    pinInput.focus();
    alert('PIN incorrecto');
  }
});
