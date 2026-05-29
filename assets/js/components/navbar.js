/**
 * Navbar Component
 */

const NAV_LINKS = [
    { href: '/',         label: 'Home'          },
    { href: '/episode',  label: 'Episode'       },
    { href: '/location', label: 'Location'      },
    { href: '/contacts', label: 'Contactos'     },
    { href: '/about',    label: 'Quiénes Somos' }
];

/**
 * Construye los items del navbar marcando el enlace activo según la ruta actual.
 */
function buildNavItems() {
    const currentPath = window.location.pathname;

    return NAV_LINKS.map(({ href, label }) => {
        const isActive = currentPath === href;
        return `
            <li class="nav-item">
                <a class="nav-link${isActive ? ' active' : ''}"
                   href="${href}"
                   data-link
                   ${isActive ? 'aria-current="page"' : ''}>
                    ${label}
                </a>
            </li>
        `;
    }).join('');
}

/**
 * Renderiza el navbar completo.
 */
export async function loadNavbar() {
    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar navbar-expand-sm bg-dark justify-content-center">
            <ul class="navbar-nav">
                ${buildNavItems()}
            </ul>
        </nav>
    `;
}

/**
 * Actualiza el estado activo sin re-renderizar todo el navbar.
 * Llamar desde el router después de cada navegación.
 */
export function updateActiveLink() {
    const currentPath = window.location.pathname;

    document.querySelectorAll('#navbar .nav-link[data-link]').forEach(link => {
        const linkPath = new URL(link.href).pathname;
        const isActive = linkPath === currentPath;

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}