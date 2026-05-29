/**
 * Abre el formulario en modo crear o editar.
 */
export function openCharacterForm(form, modal, mode, character = null) {
    const isEditing = mode === 'edit';

    modal.hidden = false;
    form.dataset.mode = mode;
    form.dataset.characterId = character?.localId || '';
    form.reset();

    form.querySelector('#character-form-title').textContent = isEditing
        ? 'Editar personaje'
        : 'Crear personaje';
    form.querySelector('[type="submit"]').textContent = isEditing
        ? 'Guardar cambios'
        : 'Crear personaje';

    form.querySelector('[data-field="gender"]').hidden = isEditing;
    form.querySelector('[data-field="image"]').hidden = isEditing;
    form.elements.gender.disabled = isEditing;
    form.elements.gender.required = !isEditing;
    form.elements.image.disabled = isEditing;
    form.elements.image.required = !isEditing;

    if (isEditing) {
        form.elements.name.value = character.name;
        form.elements.species.value = character.species;
        form.elements.status.value = character.status;
    }
}

/**
 * Cierra el formulario y limpia sus datos.
 */
export function closeCharacterForm(form, modal) {
    modal.hidden = true;
    form.reset();
}
