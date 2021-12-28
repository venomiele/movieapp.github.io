let container = document.querySelector(".container");
let form = document.querySelector(".form-control");
let input = document.querySelector(".input");
let rating = document.querySelector(".rating");

// API URLS
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    async function getMovies(url) {
        let response = await fetch(url);
        let data = await response.json();
        showMovies(data.results);
        }

    getMovies(APIURL);
    

    function showMovies(movies) {
// clear main
container.innerHTML = '';
        movies.forEach( movie => {
            let movieEl = document.createElement("div");
            movieEl.classList.add("movie");
             if(movie.poster_path == null) {
                 movieEl.innerHTML = `<img src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png" alt="${movie.title}">
                 <div class="movie-info">
                  <h3 class="movie-name">${movie.title}</h3>
                  <h2 class="rating">${movie.vote_average}</h2>  
                 </div>
                 <div class="movie-description">
                     <h3>Overview:</h3>
                     <h3>Release date: ${movie.release_date}</h3>
                     <h3>Original language: <span  class="language">${movie.original_language}</span></h3>
                     <p>${movie.overview}</p>
                  </div>`
             } else {
                movieEl.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w1280/${movie.poster_path}" alt="${movie.title}">
              <div class="movie-info">
               <h3 class="movie-name">${movie.title}</h3>
               <h2 class="rating">${movie.vote_average}</h2>  
              </div>
              <div class="movie-description">
                  <h3>Overview:</h3>
                  <h3>Release date: ${movie.release_date}</h3>
                  <h3>Original language: <span  class="language">${movie.original_language}</span></h3>
                  <p>${movie.overview}</p>
               </div>`
             }
             container.appendChild(movieEl);
             });
    }
// ratings colors
function ratingColor () {
    if(movie.vote_average > 6) {
rating.style.color = "green";
    } else {
        rating.style.color ="green";
    }
}


// get searched movies movies first

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchFor = input.value;
    if (searchFor) {
        getMovies(SEARCHAPI + searchFor);
      input.value ="";
    }
})
