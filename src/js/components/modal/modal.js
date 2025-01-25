export function handleOpenModal(event) {
    const isCLickedMovieCardImg = event.target.classList.contains('movie-card-img');
    if (!isCLickedMovieCardImg) {
        return;
    }

    const clickedMovieCardId = event.target.parentElement.dataset.movieId;
    const xModal = document.querySelector('x-modal');
    xModal.id = clickedMovieCardId;
    xModal.visible = true;
}