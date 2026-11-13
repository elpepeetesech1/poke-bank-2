// we set the default values
if (!localStorage.getItem(USER_KEY)) {
  localStorage.setItem(USER_KEY, JSON.stringify({
    nombre: 'Ash',
    pin: '1234',
    saldo: 1000,
    movimientos: []
  }));
}


