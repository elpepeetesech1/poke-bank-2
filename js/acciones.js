if (sessionStorage.getItem('pokebank_logged') !== 'true') {
  window.location.replace('index.html');
}

const moneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const SERVICIOS = ['energia', 'internet', 'telefonia', 'agua'];

const mostrarAlerta = (icono, titulo, texto) =>  Swal.fire({ icon: icono, title: titulo, text: texto, confirmButtonColor: '#1b1f3b' });

// Lee y valida el campo. Devuelve el monto como número, o null si hubo error (ya avisó)
function leerMonto(idCampo)
{
  const texto = document.getElementById(idCampo).value.trim();

  const errores = validate.single(texto, {
    presence: { allowEmpty: false, message: '^Ingresa un monto' },
    format: { pattern: /^\d+(\.\d{1,2})?$/, message: '^Ingresa solo números positivos, con máximo 2 decimales' },
    numericality: { greaterThan: 0, message: '^El monto debe ser mayor a $0.00' }
  });

  const error = errores ? errores[0] : null;
  if (error) {
    mostrarAlerta('error', 'Monto no válido', error);
    return null;
  }
  return parseFloat(texto);
}

// Devuelve true si se registró, false si se rechazó
function registerTransaction(type, amount, description)
{
  if (type !== TRANSACCION.DEPOSITO && amount > user.saldo) {
    const accion = type === TRANSACCION.RETIRO ? 'Retiro' : 'Pago';
    mostrarAlerta('error', accion + ' fallido', 'Saldo insuficiente. Tu saldo es ' + moneda.format(user.saldo));
    return false;
  }

  const transactions = user.transactions || [];
  transactions.push({ type, amount, description, date: new Date().toISOString() });
  user.transactions = transactions;
  user.saldo += (type == TRANSACCION.DEPOSITO ? amount : -amount);
  saveUser();
  updateFields();
  return true;
}

const updateFields = () => {
  document.getElementById("nombre-titular").innerText = user.nombre;
  document.getElementById("numero-cuenta").innerText = user.cuenta;
  document.getElementById("saldo-consulta").innerText = `$${user.saldo.toFixed(2)} USD`;
};

document.getElementById("btn-depositar").addEventListener("click", (e) => {
  e.preventDefault();
  const amount = leerMonto("monto-deposito");
  if (amount === null) return;

  if (registerTransaction(TRANSACCION.DEPOSITO, amount, "Deposito")) {
    mostrarExito('Depósito realizado', 'Depositaste ' + moneda.format(amount) + '. Saldo: ' + moneda.format(user.saldo));
  }
})

document.getElementById("btn-pagar").addEventListener("click", (e) => {
  e.preventDefault();

  const lista = document.getElementById("servicio");
  const errores = validate.single(lista.value, {
    presence: { allowEmpty: false, message: '^Selecciona un servicio' },
    inclusion: { within: SERVICIOS, message: '^Servicio no válido' }
  });
  if (errores) {
    mostrarAlerta('error', 'Servicio no válido', errores[0]);
    return;
  }

  const amount = leerMonto("monto-servicio");
  if (amount === null) return;

  const servicio = lista.options[lista.selectedIndex].text;
  if (registerTransaction(TRANSACCION.PAGO, amount, servicio)) {
    mostrarExito('Pago realizado', 'Pagaste ' + moneda.format(amount) + ' de ' + servicio + '. Saldo: ' + moneda.format(user.saldo));
  }
})

document.getElementById("btn-retirar").addEventListener("click", (e) => {
  e.preventDefault();
  const amount = leerMonto("monto-retiro");
  if (amount === null) return;

  if (registerTransaction(TRANSACCION.RETIRO, amount, "Retiro")) {
    mostrarExito('Retiro realizado', 'Retiraste ' + moneda.format(amount) + '. Saldo: ' + moneda.format(user.saldo));
  }
})

document.getElementById('btn-salir').addEventListener('click', () => {
  sessionStorage.removeItem('pokebank_logged');
});

updateFields();
