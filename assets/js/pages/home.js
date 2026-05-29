import { characterCard } from '../components/characterCard.js';
import {
    closeCharacterForm,
    openCharacterForm
} from '../components/characterForm.js';
import { getCharacters } from '../services/api.js';
import {
    createCharacterFromForm,
    getAllCharacters,
    getEditedCharacterFromForm,
    getVisibleCharacters,
    hideCharacter,
    restoreHiddenCharacters,
    saveCharacterEdit,
    saveNewCharacter
} from '../services/characterStorage.js';
import { loadHTML } from '../utils/helpers.js';

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );

    const container = document.getElementById('characters-container');
    const modal = document.getElementById('character-form-modal');
    const form = document.getElementById('create-character-form');
    const createButton = document.getElementById(
        'show-create-character-form'
    );
    const cancelButton = document.getElementById('cancel-character-form');
    const restoreButton = document.getElementById(
        'restore-hidden-characters'
    );

    const apiCharacters = await getCharacters();
    let characters = getAllCharacters(apiCharacters);

    /**
     * Renderiza solo los personajes que no estan ocultos.
     */
    function renderCharacters() {
        const visibleCharacters = getVisibleCharacters(characters);

        container.innerHTML = visibleCharacters
            .map(character => characterCard(character))
            .join('');
    }

    /**
     * Abre el formulario para crear un personaje.
     */
    function handleCreateButtonClick() {
        openCharacterForm(form, modal, 'create');
    }

    /**
     * Cierra el formulario cuando el usuario cancela.
     */
    function handleCancelButtonClick() {
        closeCharacterForm(form, modal);
    }

    /**
     * Cierra el formulario si el usuario hace click fuera de el.
     */
    function handleModalClick(event) {
        if (event.target === modal) {
            closeCharacterForm(form, modal);
        }
    }

    /**
     * Guarda un personaje nuevo o una edicion.
     */
    function handleFormSubmit(event) {
        event.preventDefault();

        if (form.dataset.mode === 'create') {
            const newCharacter = createCharacterFromForm(form);

            saveNewCharacter(newCharacter);
        } else {
            const characterId = form.dataset.characterId;
            const editedCharacter = getEditedCharacterFromForm(form);

            saveCharacterEdit(characterId, editedCharacter);
        }

        characters = getAllCharacters(apiCharacters);
        renderCharacters();
        closeCharacterForm(form, modal);
    }

    /**
     * Maneja los botones editar y ocultar de cada tarjeta.
     */
    function handleCardButtonClick(event) {
        const button = event.target.closest('button[data-action]');

        if (!button) {
            return;
        }

        const card = button.closest('[data-character-id]');
        const characterId = card.dataset.characterId;
        const character = characters.find(
            currentCharacter => currentCharacter.localId === characterId
        );

        if (button.dataset.action === 'edit') {
            openCharacterForm(form, modal, 'edit', character);
            return;
        }

        if (confirm(`Ocultar a ${character.name}?`)) {
            hideCharacter(characterId);
            card.remove();
        }
    }

    /**
     * Restaura todos los personajes ocultos.
     */
    function handleRestoreButtonClick() {
        restoreHiddenCharacters();
        renderCharacters();
    }

    renderCharacters();

    createButton.addEventListener('click', handleCreateButtonClick);
    cancelButton.addEventListener('click', handleCancelButtonClick);
    modal.addEventListener('click', handleModalClick);
    form.addEventListener('submit', handleFormSubmit);
    container.addEventListener('click', handleCardButtonClick);
    restoreButton.addEventListener('click', handleRestoreButtonClick);
}
