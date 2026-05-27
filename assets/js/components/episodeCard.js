/**
 * episode Card Component
 */

export function episodeCard(episode) {

    return `
        <article class="card">
            <div class="card-body">
                <h3>${episode.name}</h3>
                <p>
                    <strong>Air date:</strong>
                    ${episode.air_date}
                </p>
                <p>
                    <strong>Number character:</strong>
                    ${episode.characters.length}
                </p>
                <p>
                    <strong>Episode:</strong>
                    ${episode.episode}
                </p>
            </div>
        </article>
    `;
}
