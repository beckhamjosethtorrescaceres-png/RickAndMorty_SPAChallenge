import { loadHTML } from '../utils/helpers.js';
import { toast } from '../utils/toast.js';
//EPISODE//
import { getEpisode } from '../services/api.js';
import { episodeCard } from '../components/episodeCard.js';
//LOCATION//
import { getLocation } from '../services/api.js';
import { locationCard } from '../components/locationCard.js';



export const renderEpisode = createRenderer(
    './assets/js/views/episode.html',
    'episode-container',
    getEpisode,
    episodeCard,
    'episodios'
);
export const renderLocation = createRenderer(
    './assets/js/views/location.html',
    'location-container',
    getLocation,
    locationCard,
    'ubicaciones'
)

function createRenderer(htmlPath, containerId, fetchFn, cardFn, entityName) {
    return async function render() {
        const content = document.getElementById('content');
        content.innerHTML = await loadHTML(htmlPath);

        const container = document.getElementById(containerId);

        let data = [];

        try {
            data = await fetchFn();
        } catch {
            toast.error(`Error al cargar ${entityName} desde la API.`);
            container.innerHTML = `<p style="color:#aaa;text-align:center;grid-column:1/-1;padding:2rem;">No se pudieron cargar los ${entityName}.</p>`;
            return;
        }

        if (data.length === 0) {
            toast.warning(`No se encontraron ${entityName}.`);
            container.innerHTML = `<p style="color:#aaa;text-align:center;grid-column:1/-1;padding:2rem;">No hay ${entityName} para mostrar.</p>`;
            return;
        }

        container.innerHTML = data
            .map(item => cardFn(item))
            .join('');
    };
}