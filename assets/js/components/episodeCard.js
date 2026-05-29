/**
 * episode Card Component
 */

export function episodeCard(episode) {

    return `
        <article class="card">

            <img 
                src="/assets/img/episodios/${episode.id}.png"
                class="episode-img"
                alt="${episode.name}"
            >

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