

export function add_characters() {
const modal   = document.getElementById('mi-modal');
const btnAbrir  = document.getElementById('btn-abrir');
const btnCerrar = document.getElementById('btn-cerrar');


btnAbrir.addEventListener('click', () => {
  modal.classList.add('active');
});


btnCerrar.addEventListener('click', () => {
  modal.classList.remove('active');
});


modal.addEventListener('click', (e) => {
  if (e.target === modal) {          
    modal.classList.remove('active');
  }
});
}

