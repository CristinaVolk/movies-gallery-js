import {setAllMovies, setFavouriteMovies} from "./shared/localStorage/setGetMovies.js";
import {FAVOURITE_MOVIES} from "./shared/localStorage/consts.js";
import {changeUI, renderNewListId} from "./components/btnSwitchLists/actions.js";
import {ModalMovieCard} from "./components/modal/ModalMovieCard/ModalMovieCard.js";
import {attachContainer, createMovieContainer} from "./components/movieList/actions.js";

const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', (event) => {
    // render new listId
    const newListId = renderNewListId(event);
    changeUI(newListId, event);
    //create new container
    const newMovieContainer = createMovieContainer(newListId);
    attachContainer(newMovieContainer, event.target)
});

// set localStorage
setAllMovies();
setFavouriteMovies();

// create movieContainer
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to btn
attachContainer(movieContainer, btnSwitchLists);



window.customElements.define('x-modal', ModalMovieCard)

