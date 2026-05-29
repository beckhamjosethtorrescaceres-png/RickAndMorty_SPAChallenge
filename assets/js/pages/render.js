import { loadHTML } from '../utils/helpers.js';
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
    episodeCard
);
export const renderLocation = createRenderer(
    './assets/js/views/location.html',
    'location-container',
    getLocation,
    locationCard
)

function createRenderer(htmlPath, containerId, fetchFn, cardFn) {
    return async function render() {
        const content = document.getElementById('content');
        content.innerHTML = await loadHTML(htmlPath);

        const container = document.getElementById(containerId);
        const data = await fetchFn();

        container.innerHTML = data
            .map(item => cardFn(item))
            .join('');
    };
}