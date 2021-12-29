let container = document.querySelector(".container");
let form = document.querySelector(".form-control");
let input = document.querySelector(".input");
let title = document.querySelector(".title");
let inputCounter = 0;
let lastSearch = [];
let lastItem = undefined;
let appear = 0;
let modal = document.querySelector(".modal");


// API URLS
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// Get the movies by API
    async function getMovies(url) {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        if( data.results.length < 1) {
        title.innerHTML = `The search was not found!`;
        title.style.color ="red";
            container.innerHTML = `<img class="error" src="https://cdn.pixabay.com/photo/2021/01/10/20/03/laptop-5906264_960_720.png" alt="error">`
        } else {
            showMovies(data.results);
        }
        }

    getMovies(APIURL);
    dynTitle();


    function showMovies(movies) {
// clear main
container.innerHTML = '';
        movies.forEach( movie => {
            let movieEl = document.createElement("div");
            movieEl.classList.add("movie");
            // Backdrop path on click
movieEl.addEventListener("click", () => {
        modal.style.display = "block";
           modal.innerHTML = `
<div class="modal-content">
<div class="box">
<div class="box-photo">
<img class="backdrop"src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="backdrop">
</div>
</div>
</div>`
setTimeout(function closed(){
    modal.style.display ="none";
},3000);
    })
             if(movie.poster_path == null) {
                 movieEl.innerHTML = `<img src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png" alt="${movie.title}">
                 <div class="movie-info">
                  <h3 class="movie-name">${movie.title}</h3>
                  <h2 class="rating">${movie.vote_average}</h2>  
                 </div>
                 <div class="movie-description">
                     <h3>Overview:</h3>
                     <h3>Release: 
                     ${movie.release_date}</h3>
                     <h3>Original language: <span  class="language">${movie.original_language}</span></h3>
                     <p>${movie.overview}</p>
                     <h3>CLICK FOR PREVIEW!</h3>
                  </div>`
                  container.appendChild(movieEl);
            } else {
                movieEl.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w1280/${movie.poster_path}" alt="${movie.title}">
              <div class="movie-info">
               <h3 class="movie-name">${movie.title}</h3>
               <h2 class="${ratingColor(movie.vote_average)}">${movie.vote_average}</h2>  
              </div>
              <div class="movie-description">
                  <h3>Overview:</h3>
                  <h3>Release: 
                  ${movie.release_date}</h3>
                  <h3>Original language: <span  class="language">${movie.original_language}</span></h3>
                  <p>${movie.overview}</p>
                  <h3 class="preview">CLICK FOR PREVIEW!</h3>
               </div>`
               container.appendChild(movieEl);
             }

             });
             function ratingColor(vote) {
                 if(vote >= 7) {
                     return "green";
                 } else {
               return "red";
                 }
             }
             
             return movies;
            }
            

// get searched movies movies first

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchFor = input.value;
    if (searchFor) {
        inputCounter++;
        lastSearch.push(input.value);
        getMovies(SEARCHAPI + searchFor);
        dynTitle();
      input.value ="";    
    }
})

//Dynamic title

function dynTitle() {
    if(inputCounter < 1) {
        title.innerHTML = `Popular this <span class="colored">week!</span>`
} else {
    lastItem = lastSearch.pop();
    title.innerHTML = `You have searched for <span class="colored">${lastItem}</span>`;
    title.style.color = "white";
}
}

