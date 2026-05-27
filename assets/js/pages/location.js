import { loadHTML } from '../utils/helpers.js';
import { getLocation } from '../services/api.js';
import { locationCard } from '../components/locationCard.js';

/**
 * Renderiza location
 */
export async function renderLocation() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/location.html'
    );
    const container = document.getElementById(
        'location-container'
    );
    const location = await getLocation();
    container.innerHTML = location
        .map(location => locationCard(location))
        .join('');
}
