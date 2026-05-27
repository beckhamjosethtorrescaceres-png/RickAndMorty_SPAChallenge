/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
    try {
        const response = await httpClient.get('/character');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}
/**
 * Obtiene episode.
 *
 * @returns {Promise<Array>}
 */
export async function getEpisode() {
    try {
        const response = await httpClient.get('/episode');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Obtiene location.
 *
 * @returns {Promise<Array>}
 */
export async function getLocation() {
    try {
        const response = await httpClient.get('/location');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}