const ETIQUETA_TIPO = { DEPOSITO: 'Depósito', RETIRO: 'Retiro', PAGO: 'Pago de servicio' };

// Genera y descarga el comprobante PDF de una transacción
function descargarComprobante(t)
{
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: [100, 140] });

  // Encabezado
  doc.setFillColor(27, 31, 59);
  doc.rect(0, 0, 100, 22, 'F');
  doc.setTextColor(255, 203, 5);
  doc.setFontSize(16);
  doc.text('Pokémon Bank', 50, 14, { align: 'center' });

  doc.setTextColor(27, 31, 59);
  doc.setFontSize(11);
  doc.text('COMPROBANTE DE TRANSACCIÓN', 50, 32, { align: 'center' });

  // Datos: campo a la izquierda, valor a la derecha
  const filas = [
    ['Fecha', new Date(t.date).toLocaleString('es-SV')],
    ['Titular', user.nombre],
    ['Cuenta', user.cuenta],
    ['Tipo', ETIQUETA_TIPO[t.type]],
    ['Detalle', t.description],
    ['Monto', '$' + t.amount.toFixed(2)],
    ['Saldo disponible', '$' + user.saldo.toFixed(2)]
  ];

  doc.setFontSize(9);
  let y = 44;
  filas.forEach(([campo, valor]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(campo + ':', 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(valor), 90, y, { align: 'right' });
    y += 9;
  });

  doc.setFontSize(8);
  doc.text('Gracias por usar Pokémon Bank', 50, 130, { align: 'center' });

  doc.save('comprobante-' + Date.parse(t.date) + '.pdf');
}

// Diálogo de éxito con la opción de descargar el comprobante de la última transacción
function mostrarExito(titulo, texto)
{
  const ultima = user.transactions[user.transactions.length - 1];

  Swal.fire({
    icon: 'success',
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: 'Descargar comprobante',
    cancelButtonText: 'Cerrar',
    confirmButtonColor: '#1b1f3b'
  }).then((r) => {
    if (r.isConfirmed) descargarComprobante(ultima);
  });
}
