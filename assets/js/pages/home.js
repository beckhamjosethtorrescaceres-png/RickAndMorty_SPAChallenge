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
import { toast } from '../utils/toast.js';

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

    let apiCharacters = [];

    try {
        apiCharacters = await getCharacters();

        if (apiCharacters.length === 0) {
            toast.warning('No se encontraron personajes en la API.');
        }
    } catch {
        toast.error('Error al cargar personajes desde la API. Mostrando datos locales.');
    }

    let characters = getAllCharacters(apiCharacters);

    /**
     * Renderiza solo los personajes que no estan ocultos.
     */
    function renderCharacters() {
        const visibleCharacters = getVisibleCharacters(characters);

        if (visibleCharacters.length === 0) {
            container.innerHTML = `
                <p style="color: #aaa; text-align: center; grid-column: 1/-1; padding: 2rem;">
                    No hay personajes para mostrar. Puedes crear uno o restaurar los ocultos.
                </p>
            `;
            return;
        }

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
            toast.success(`¡Personaje "${newCharacter.name}" creado con éxito!`);
        } else {
            const characterId = form.dataset.characterId;
            const editedCharacter = getEditedCharacterFromForm(form);

            saveCharacterEdit(characterId, editedCharacter);
            toast.success(`¡Personaje "${editedCharacter.name}" actualizado con éxito!`);
        }

        characters = getAllCharacters(apiCharacters);
        renderCharacters();
        closeCharacterForm(form, modal);
    }

    /**
     * Maneja los botones editar y eliminar de cada tarjeta.
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

        if (confirm(`¿Estás seguro de que deseas eliminar a ${character.name}?`)) {
            hideCharacter(characterId);
            card.remove();
            toast.info(`Personaje "${character.name}" eliminado.`);
        }
    }

    /**
     * Restaura todos los personajes ocultos.
     */
    function handleRestoreButtonClick() {
        restoreHiddenCharacters();
        characters = getAllCharacters(apiCharacters);
        renderCharacters();
        toast.success('Todos los personajes restaurados.');
    }

    renderCharacters();

    createButton.addEventListener('click', handleCreateButtonClick);
    cancelButton.addEventListener('click', handleCancelButtonClick);
    modal.addEventListener('click', handleModalClick);
    form.addEventListener('submit', handleFormSubmit);
    container.addEventListener('click', handleCardButtonClick);
    restoreButton.addEventListener('click', handleRestoreButtonClick);
}
