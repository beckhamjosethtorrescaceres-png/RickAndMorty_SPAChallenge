/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('header');

    navbar.innerHTML = `
        <nav id="navbar">
            <!-- Links -->
            <ul class="list_navbar">
                <li class="nav-item">
                    <a class="nav-link" href="/" data-link>Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/episode" data-link> Episode</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/location" data-link> Location</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contacts" data-link>Contactos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about" data-link> Quiénes Somos</a>
                </li>
            </ul>
        </nav>
    `;
}