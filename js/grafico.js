// Gráfico: cuántas transacciones hay de cada tipo
const transacciones = user.transactions || [];

const tipos = [TRANSACCION.DEPOSITO, TRANSACCION.RETIRO, TRANSACCION.PAGO];
const etiquetas = ['Depósitos', 'Retiros', 'Pagos de servicios'];
const cantidades = tipos.map(tipo => transacciones.filter(t => t.type === tipo).length);

const canvas = document.getElementById('grafica');

if (transacciones.length === 0) {
  // Sin datos: se muestra el aviso y se oculta el gráfico
  document.getElementById('sin-datos').classList.remove('d-none');
  canvas.parentElement.classList.add('d-none');
} else {
  canvas.setAttribute('aria-label', 'Gráfico de dona con el número de transacciones: ' +
    etiquetas.map((e, i) => e + ' ' + cantidades[i]).join(', '));

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: etiquetas,
      datasets: [{
        data: cantidades,
        backgroundColor: ['#1b1f3b', '#e63946', '#ffcb05'],
        borderColor: '#eceef5',
        borderWidth: 3
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (ctx) => ' ' + ctx.label + ': ' + ctx.parsed + (ctx.parsed === 1 ? ' transacción' : ' transacciones')
          }
        }
      }
    }
  });
}
