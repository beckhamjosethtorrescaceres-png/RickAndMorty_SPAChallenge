/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar navbar-expand-sm bg-dark justify-content-center">
            <!-- Links -->
            <ul class="navbar-nav">
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