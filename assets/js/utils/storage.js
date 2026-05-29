/**
 * Lee datos de localStorage y devuelve un valor por defecto si no existen.
 */
export function getLocalStorage(key, defaultValue) {
    const savedValue = localStorage.getItem(key);

    return savedValue ? JSON.parse(savedValue) : defaultValue;
}

/**
 * Guarda datos en localStorage en formato JSON.
 */
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
