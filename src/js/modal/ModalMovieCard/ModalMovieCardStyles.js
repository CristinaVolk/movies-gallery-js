export const modalMovieCardStyles = `
        <style>
            .wrapper {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgb(0 0 0 / 0.8);
              opacity: 0;
              visibility: hidden;
              transform: scale(1.1);
              transition: visibility 0s linear .25s, opacity .25s 0s,transform .25s;
              z-index: 1;
            }
            .visible {
              opacity: 1;
              visibility: visible;
              transform: scale(1);
              transition: visibility 0s linear 0s, opacity .25s 0s, transform .25s;
            }
            .modal {
              display: flex;
              flex-direction: column;
              background: #1c1d1f;
              padding: 16px;
              border-radius: 16px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              min-width: 300px;
            }
            .movie-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #1f212b;
                padding: 16px;
                border-radius: 8px;
                box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
            }
            .movie-card > img {
                width: 180px;
                height: 220px;
            }
            .close {
              align-self: end;
              width: fit-content;
              color:white;
              cursor: pointer;
              background: #545a83;
              margin-top: 8px;
              padding: 16px;
              border: 0.5px solid #9e9ea2;
              border-radius: 16px;
              font-family: "Comic Sans MS", serif;
              box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

            }
            .close:hover {
              background-color: #17355d;
              border-color: #6c757d;
            }
          </style>
    `
