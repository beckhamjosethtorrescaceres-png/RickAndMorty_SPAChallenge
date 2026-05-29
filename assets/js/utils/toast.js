/**
 * Sistema de notificaciones toast reutilizable.
 * No depende de ninguna librería externa.
 */

const TOAST_DURATION = 3000;
const CONTAINER_ID = 'toast-container';

/**
 * Crea el contenedor de toasts si no existe.
 */
function getContainer() {
    let container = document.getElementById(CONTAINER_ID);

    if (!container) {
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        document.body.appendChild(container);
    }

    return container;
}

/**
 * Tipos de toast disponibles.
 */
export const ToastType = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

const TOAST_ICONS = {
    [ToastType.SUCCESS]: '✓',
    [ToastType.ERROR]:   '✕',
    [ToastType.WARNING]: '⚠',
    [ToastType.INFO]:    'ℹ'
};

/**
 * Muestra una notificación toast.
 *
 * @param {string} message  - Mensaje a mostrar
 * @param {string} type     - ToastType (success | error | warning | info)
 * @param {number} duration - Duración en ms (default 3000)
 */
export function showToast(message, type = ToastType.INFO, duration = TOAST_DURATION) {
    const container = getContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    toast.innerHTML = `
        <span class="toast__icon">${TOAST_ICONS[type]}</span>
        <span class="toast__message">${message}</span>
        <button class="toast__close" aria-label="Cerrar notificación">✕</button>
    `;

    // Cerrar manualmente
    toast.querySelector('.toast__close').addEventListener('click', () => removeToast(toast));

    container.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => toast.classList.add('toast--visible'));

    // Auto-cierre
    const timer = setTimeout(() => removeToast(toast), duration);

    // Pausar auto-cierre al hover
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
        setTimeout(() => removeToast(toast), 1500);
    });
}

/**
 * Elimina un toast con animación de salida.
 */
function removeToast(toast) {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

/**
 * Atajos semánticos
 */
export const toast = {
    success: (msg) => showToast(msg, ToastType.SUCCESS),
    error:   (msg) => showToast(msg, ToastType.ERROR),
    warning: (msg) => showToast(msg, ToastType.WARNING),
    info:    (msg) => showToast(msg, ToastType.INFO)
};
