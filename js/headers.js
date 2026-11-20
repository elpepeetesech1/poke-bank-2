const USER_KEY = 'pokebank_user';
const DEFAULT_VALUES = {
  nombre: 'Ash Ketchum',
  pin: '1234',
  cuenta: '0987654321',
  saldo: 500.00,
  transactions: []
};

// no hay enums en javascript asi que esto funciona creo nose talvez quiza quien sabe :v
const TRANSACCION = Object.freeze({
  DEPOSITO: 'DEPOSITO',
  RETIRO: 'RETIRO',
  PAGO: 'PAGO'
});
