/**
 * Character Card Component
 */

const FALLBACK_IMAGE = 'assets/css/img/image.png';

export function characterCard(character) {

    return `
        <article class="card" data-character-id="${character.localId}">
            <img
                src="${character.image || FALLBACK_IMAGE}"
                alt="${character.name}"
                onerror="this.src='${FALLBACK_IMAGE}'; this.classList.add('img--broken');"
            >

            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Status:</strong>
                    ${character.status}
                </p>
                <p>
                    <strong>Species:</strong>
                    ${character.species}
                </p>
                <button type="button" class="btn btn-primary" data-action="edit">Editar</button>
                <button type="button" class="btn btn-danger" data-action="hide">Eliminar</button>
            </div>
        </article>
    `;
}
