const API_KEY = "api_key=6c47bf27c60c98b4db5a0a3c4cd07353";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + `discover/movie?sort_by=popularity.desc&` + API_KEY;
const searchURL = BASE_URL + `search/movie?` + API_KEY;
const IMG_URL = `https://image.tmdb.org/t/p/w500/`;
const main = document.getElementById("main-container");
const form = document.getElementById("myform");
const searchEl = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then((res) => res.json()).then((data) => {
            showMovies(data.results);
        });
}

function showMovies(data) {
    main.innerHTML = ''
    data.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            popularity,
            release_date,
            overview,
        } = movie;
        const movieEl = document.createElement("div");
        movieEl.innerHTML = `
    <div class="movie">
      <img src="${IMG_URL + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3 class='movie-title'>${title}</h3>
        <span class='rating'>${vote_average}</span>
        <div id='overview'>
          <h2>Summary</h2>
          ${overview}
        </div>
      </div>
    </div>`;
        main.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = searchEl.value
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL)
    }

    console.log('form has been submitted')
})