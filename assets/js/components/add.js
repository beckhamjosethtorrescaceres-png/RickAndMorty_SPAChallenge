

export function add_characters() {
const modal   = document.getElementById('mi-modal');
const btnAbrir  = document.getElementById('btn-abrir');
const btnCerrar = document.getElementById('btn-cerrar');

// Abrir: agrega la clase "active"
btnAbrir.addEventListener('click', () => {
  modal.classList.add('active');
});

// Cerrar con el botón
btnCerrar.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Cerrar al hacer click en el fondo oscuro
modal.addEventListener('click', (e) => {
  if (e.target === modal) {          // solo si clickeaste el fondo, no la caja
    modal.classList.remove('active');
  }
});
}

