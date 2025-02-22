import { setAllMovies } from "./shared/localStorage/setGetMovies.js";
import { createMovieContainer, attachContainerToTargetElement } from "./components/movieList.js";
import { generateNewListId, changeUI } from './components/btnSwitchLists.js';

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0];

// set local storage
setAllMovies()


// create movie container
const movieContainer = createMovieContainer();

// attach movie container to DOM
attachContainerToTargetElement(movieContainer, btnSwitchLists, 'afterend');

// create switching lists feature
btnSwitchLists.addEventListener('click', (event) => {
    // generete new listID
    const newListId = generateNewListId(event)
    // change UI
    changeUI(event, newListId)
    // create movie container
    const movieContainer = createMovieContainer(newListId);
    // attach movie container to DOM
    attachContainerToTargetElement(movieContainer, btnSwitchLists, 'afterend');
})

// cearte saving to favourites feature