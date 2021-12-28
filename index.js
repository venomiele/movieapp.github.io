let hovered = document.querySelector(".movie-description");

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    async function getMovies() {
        let response = await fetch(APIURL);
        let data = await response.json();
        console.log(data);
        // data.results.forEach(movie => {
        // let image = document.createElement("img");
        // image.src = IMGPATH + movie.poster_path;
        // document.body.appendChild(image);
        // })
    }
    getMovies();

    hovered.addEventListener("mouseover", () => {
    })

