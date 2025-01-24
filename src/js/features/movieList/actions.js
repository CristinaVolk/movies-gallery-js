export function attachContainerToTargetElement(container, targetElement) {
    if (container.id) {
        const oldContainer = document.getElementsByClassName(container.className);
        if (oldContainer) {
            oldContainer.remove();
        }
    }

    targetElement.insertAdjacentElement('afterend', container);
}

export function createMovieContainer(listID) {
    let movies;

    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies();
            break;
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies();
            break;
        }
        default: {
            return;
        }
    }

    const moviesContainer = document.createElement('div');
    moviesContainer.id = listID;
    moviesContainer.className = 'movies-container-cards';

    if (movies.length) {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesContainer.insertAdjacentHTML('beforeend', movieCard);
        });
    }

    moviesContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID);
    })

    return moviesContainer;
}