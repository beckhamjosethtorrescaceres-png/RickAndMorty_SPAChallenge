import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

const CUSTOM_KEY = 'customCharacters';
const HIDDEN_KEY = 'hiddenCharacters';
const EDITS_KEY = 'characterEdits';

/**
 * Une personajes de la API, ediciones locales y personajes creados.
 */
export function getAllCharacters(apiCharacters) {
    const edits = getLocalStorage(EDITS_KEY, {});
    const customCharacters = getLocalStorage(CUSTOM_KEY, []);

    const apiCharactersWithEdits = apiCharacters.map(character => {
        const localId = `api-${character.id}`;

        return {
            ...character,
            ...edits[localId],
            localId
        };
    });

    return apiCharactersWithEdits.concat(customCharacters);
}

/**
 * Filtra los personajes que fueron ocultados por el usuario.
 */
export function getVisibleCharacters(characters) {
    const hiddenCharacters = getLocalStorage(HIDDEN_KEY, []);

    return characters.filter(
        character => !hiddenCharacters.includes(character.localId)
    );
}

/**
 * Crea un personaje local usando los datos del formulario.
 */
export function createCharacterFromForm(form) {
    const id = Date.now();

    return {
        id,
        localId: `local-${id}`,
        name: form.elements.name.value,
        species: form.elements.species.value,
        gender: form.elements.gender.value,
        status: form.elements.status.value,
        image: form.elements.image.value
    };
}

/**
 * Toma del formulario solo los campos permitidos para editar.
 */
export function getEditedCharacterFromForm(form) {
    return {
        name: form.elements.name.value,
        species: form.elements.species.value,
        status: form.elements.status.value
    };
}

/**
 * Guarda un nuevo personaje creado por el usuario.
 */
export function saveNewCharacter(character) {
    const customCharacters = getLocalStorage(CUSTOM_KEY, []);

    setLocalStorage(CUSTOM_KEY, customCharacters.concat(character));
}

/**
 * Guarda la edicion de un personaje creado localmente.
 */
function saveCustomCharacterEdit(characterId, editedData) {
    const customCharacters = getLocalStorage(CUSTOM_KEY, []);

    setLocalStorage(
        CUSTOM_KEY,
        customCharacters.map(character =>
            character.localId === characterId
                ? { ...character, ...editedData }
                : character
        )
    );
}

/**
 * Guarda una edicion visual para un personaje de la API.
 */
function saveApiCharacterEdit(characterId, editedData) {
    const edits = getLocalStorage(EDITS_KEY, {});

    setLocalStorage(EDITS_KEY, {
        ...edits,
        [characterId]: editedData
    });
}

/**
 * Decide donde guardar la edicion segun el origen del personaje.
 */
export function saveCharacterEdit(characterId, editedData) {
    if (characterId.startsWith('local-')) {
        saveCustomCharacterEdit(characterId, editedData);
    } else {
        saveApiCharacterEdit(characterId, editedData);
    }
}

/**
 * Guarda el id de un personaje para ocultarlo del DOM.
 */
export function hideCharacter(characterId) {
    const hiddenCharacters = getLocalStorage(HIDDEN_KEY, []);

    if (hiddenCharacters.includes(characterId)) {
        return;
    }

    setLocalStorage(HIDDEN_KEY, hiddenCharacters.concat(characterId));
}

/**
 * Limpia la lista de personajes ocultos.
 */
export function restoreHiddenCharacters() {
    setLocalStorage(HIDDEN_KEY, []);
}
