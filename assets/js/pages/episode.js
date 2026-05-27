import { loadHTML } from '../utils/helpers.js';
import { getEpisode } from '../services/api.js';
import { episodeCard } from '../components/episodeCard.js';

/**
 * Renderiza episode
 */
export async function renderEpisode() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episode.html'
    );
    const container = document.getElementById(
        'episode-container'
    );
    const episode = await getEpisode();
    container.innerHTML = episode
        .map(episode => episodeCard(episode))
        .join('');
}
