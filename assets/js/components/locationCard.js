/**
 * location Card Component
 */

export function locationCard(location) {

    return `
        <article class="card">
            <div class="card-body">
                <img src="./assets/css/img/planet.jpeg" alt="${location.name}" class="card-img">
                <h3>${location.name}</h3>
                <p>
                    <strong>Type:</strong>
                    ${location.type}
                </p>
                <p>
                    <strong>Dimension:</strong>
                    ${location.dimension}
                </p>
                <p>
                    <strong>Resident:</strong>
                    ${location.residents.length}
                </p>
            </div>
        </article>
    `;
}
