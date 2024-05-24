const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOThkOTVmMmVjMGNkOWNjYjE2OGNmNDg5NGI3Y2Q0MiIsInN1YiI6IjY2NTBjODIyMDViNjY3ZTNlZDA2OTMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z-XWJn-0sa8DSoRCwv7sIHaZPKCpsLzV_etNqig944A';

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchMovies(query);
    }
});

async function searchMovies(query) {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                query: query
            }
        });
        displayMovies(response.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const movieImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300';
        movieElement.innerHTML = `
            <img src="${movieImage}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
            </div>
        `;

        moviesContainer.appendChild(movieElement);
    });
}
