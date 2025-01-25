import {setAllMovies} from "./shared/localStorage/setGetLocalStorage.js";
import {attachContainerToDOM, createMovieContainer} from "./components/movieContainer/actions.js";
import {FAVOURITE_MOVIES} from "./shared/constants/movies.js";
import {changeMovieTitles, getNewListID} from "./components/btnSwitchLists/actions.js";

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0];

// set local storage
setAllMovies()

// create movie container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES)

// attach container to DOM
attachContainerToDOM(movieContainer, 'afterend', btnSwitchLists);

// switch movies lists
btnSwitchLists.addEventListener('click', (event) => {
    // get new lest ID
    const newListID = getNewListID(event)

    // change movie titles
    changeMovieTitles(newListID, event)

    // create movie container
    const movieContainer = createMovieContainer(newListID)

    // attach container to DOM
    attachContainerToDOM(movieContainer, 'afterend', btnSwitchLists);
})

// handle save to favourites