export function add_characters() {
  const formulario = document.getElementById("form");
  const cardsContainer = document.getElementById("div-card");
  const modal = document.getElementById('mi-modal');
  const btnAbrir = document.getElementById('btn-abrir');
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

  // Función para crear una card
  function createCard({ name, status, species }) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="/assets/img/vacia.jpeg">
      <div class="card-body">
        <h3>${name}</h3>
        <p><strong>Species:</strong> ${species}</p>
        <p><strong>Status:</strong> ${status}</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const species = document.getElementById("species").value;

    // Guarda en localStorage
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
    characters.push({ name, status, species });
    localStorage.setItem("characters", JSON.stringify(characters));

    createCard({ name, status, species }); 
    formulario.reset();
  });

  
  const saved = JSON.parse(localStorage.getItem("characters") || "[]");
  saved.forEach(createCard);
}