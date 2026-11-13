const moneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function mostrarAlerta(icono, titulo, texto)
{
  Swal.fire({ icon: icono, title: titulo, text: texto, confirmButtonColor: '#1b1f3b' });
}

// Devuelve true si se registró, false si se rechazó
function registerTransaction(type, amount, description)
{
  if (isNaN(amount) || amount <= 0)
  {
    console.log("????");
    mostrarAlerta('error', 'Monto no válido', 'Ingresa un monto mayor a $0.00');
    return false;
  }

  if (type !== TRANSACCION.DEPOSITO && amount > user.saldo) {
    console.log("????");
    const accion = type === TRANSACCION.RETIRO ? 'Retiro' : 'Pago';
    mostrarAlerta('error', accion + ' fallido', 'Saldo insuficiente. Tu saldo es ' + moneda.format(user.saldo));
    return false;
  }

  console.log("????");

  const transactions = user.transactions || [];
  transactions.push({ type, amount, description, date: new Date().toISOString() });
  user.transactions = transactions;
  user.saldo += (type == TRANSACCION.DEPOSITO ? amount : -amount);
  saveUser();
  updateFields();
  return true;
}

function updateFields()
{
  document.getElementById("saldo-consulta").innerText = `$${user.saldo.toFixed(2)} USD`;
}

document.getElementById("btn-depositar").addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("monto-deposito").value);
  if (registerTransaction(TRANSACCION.DEPOSITO, amount, "Deposito")) {
    mostrarAlerta('success', 'Depósito realizado', 'Depositaste ' + moneda.format(amount) + '. Saldo: ' + moneda.format(user.saldo));
  }
})

document.getElementById("btn-pagar").addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("monto-servicio").value);
  if (registerTransaction(TRANSACCION.PAGO, amount, "Pago")) {
    mostrarAlerta('success', 'Pago realizado', 'Pagaste ' + moneda.format(amount) + '. Saldo: ' + moneda.format(user.saldo));
  }
})

document.getElementById("btn-retirar").addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("monto-retiro").value);
  if (registerTransaction(TRANSACCION.RETIRO, amount, "Retiro")) {
    mostrarAlerta('success', 'Retiro realizado', 'Retiraste ' + moneda.format(amount) + '. Saldo: ' + moneda.format(user.saldo));
  }
})

updateFields();
