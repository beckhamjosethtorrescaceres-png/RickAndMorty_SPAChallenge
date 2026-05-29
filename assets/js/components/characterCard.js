/**
 * Character Card Component
 */

export function characterCard(character) {

    return `
        <article class="card" data-character-id="${character.localId}">
            <img
                src="${character.image}"
                alt="${character.name}"
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
                <button type="button" class="btn btn-danger" data-action="hide">Ocultar</button>
            </div>
        </article>
    `;
}
