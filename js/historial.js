// Formato monetario: $1,234.50
const formatoUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function updateTransactions()
{
  const tbody = document.querySelector('#tabla-historial tbody');
  const lista = user.transactions || [];   // usa el mismo nombre que en acciones.js

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">Aún no hay transacciones.</td></tr>';
    return;
  }

  tbody.innerHTML = "";
  tbody.innerHTML = lista.map(t => {
    const esIngreso = t.type === TRANSACCION.DEPOSITO;
    const clase = esIngreso ? 'ingreso' : 'egreso';   // define el color (ver style.css)
    const signo = esIngreso ? '+' : '-';

    return `
  <tr>
    <td>${t.date ? new Date(t.date).toLocaleString('es-SV') : '-'}</td>
    <td class="${clase}">${t.type}</td>
    <td class="${clase}">${signo} ${formatoUSD.format(t.amount)}</td>
  </tr>`;
  }).join('');
}

updateTransactions();
