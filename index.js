let container = document.querySelector(".container");
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    async function getMovies() {
        let response = await fetch(APIURL);
        let data = await response.json();
console.log(data);
        data.results.forEach( movie => {
        let movieEl = document.createElement("div");
        movieEl.classList.add("movie");
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
         container.appendChild(movieEl);
         });
        }

    getMovies();


