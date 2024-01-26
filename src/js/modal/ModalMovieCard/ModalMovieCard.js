import {modalMovieCardStyles} from "./ModalMovieCardStyles.js";
import {getAllMovies} from "../../localStorage/setGetMovies.js";

export class ModalMovieCard extends HTMLElement {
    constructor() {
        super();
    }

    set id(value) {
        this.setAttribute('id', value);
    }

    get id() {
        return this.getAttribute('id')
    }

    set visible(value) {
        if (value) {
            this.setAttribute('visible', value);
        } else {
            this.removeAttribute('visible');
        }
    }

    get visible() {
        return this.hasAttribute('visible');
    }

    static get observedAttributes() {
        return ['id', 'visible'];
    }

    connectedCallback() {
        this._render();
        this._attachEventListeners()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'visible' && this.shadowRoot) {
            if (newValue === null) {
                this.shadowRoot.querySelector('.wrapper').classList.remove('visible');
                this.shadowRoot.querySelector('.movie-card').remove();
            } else {
                this.shadowRoot.querySelector('.wrapper').classList.add('visible');
            }
        }

        if (name === 'id' && this.shadowRoot) {
            const movie = getAllMovies().find(movie => movie.id === Number(this.id));
            if (!movie) {
                return;
            }

            const {id, releaseYear, description, movieName, imageUrl, isFavourite} = movie;
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';

            this.shadowRoot.querySelector('.modal').insertAdjacentHTML(
                'afterbegin',
                `
                <div class="movie-card" data-movie-id="${id}">
                    <img class="movie-card-img" src="${imageUrl}" alt="${movieName}"/>
                    <h3>${movieName}</h3>
                    <p>${description}</p>
                    <strong>${releaseYear}</strong>
                </div>
            `);
        }
    }

    _render() {
        const container = document.createElement('div');
        const wrapperClass = this.visible ? 'wrapper visible' : 'wrapper';

        container.innerHTML = `
            ${modalMovieCardStyles}
            
            <div class="${wrapperClass}">
                <div class="modal">
                    <button class="close">Close</button>
                </div>
            </div>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.append(container);
    }

    _attachEventListeners() {
        const btnCloseModal = this.shadowRoot.querySelector('.close');
        if (btnCloseModal) {
            btnCloseModal.addEventListener('click', () => {
                this.removeAttribute('visible');
            })
        }
    }
}
