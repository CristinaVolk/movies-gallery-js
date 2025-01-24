import { FAVOURITE_MOVIES } from "./shared/constants/movies.js";
import { setAllMovies } from "./shared/localStorage/setGetMovies.js";
import { attachContainerToTargetElement, createMovieContainer } from "./features/movieList/actions.js";

const switchBUtton = document.querySelector('.movies-container-switch-list');
switchBUtton.addEventListener('click', (event) => {
    const newListId = createNewListID(event);
    changeUI(newListId);
    const movieContainer = createMovieContainer(newListId);
    attachContainerToTargetElement(movieContainer, event.target, movieContainer.id);
})

setAllMovies();

const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
attachContainerToTargetElement(movieContainer, switchBUtton, movieContainer.id);

