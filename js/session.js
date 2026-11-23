// Protege la página: sin sesión activa vuelve al login
if (sessionStorage.getItem('pokebank_logged') !== 'true') {
  window.location.replace('index.html');
}

// Salir: borra la sesión (el enlace ya lleva a index.html)
document.getElementById('btn-salir').addEventListener('click', () => {
  sessionStorage.removeItem('pokebank_logged');
});
