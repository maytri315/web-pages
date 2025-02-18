document.getElementById('movieForm').addEventListener('submit', addMovie);

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function addMovie(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value;

    const movie = {
        title,
        genre,
        director,
        year,
        description
    };

    movies.push(movie);
    saveMovies();
    displayMovies();
    clearForm();
}

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

function displayMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach((movie, index) => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <div class="movie-details">
                <span class="movie-title">${movie.title} (${movie.year})</span>
                <span class="movie-genre">${movie.genre}</span>
                <span class="movie-director">Directed by ${movie.director}</span>
                <p class="movie-description">${movie.description}</p>
            </div>
            <div class="movie-buttons">
                <button onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </div>
        `;
        movieList.appendChild(movieItem);
    });
}

function clearForm() {
    document.getElementById('movieForm').reset();
}

function editMovie(index) {
    const movie = movies[index];
    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('director').value = movie.director;
    document.getElementById('year').value = movie.year;
    document.getElementById('description').value = movie.description;

    deleteMovie(index);
}

function deleteMovie(index) {
    movies.splice(index, 1);
    saveMovies();
    displayMovies();
}

// 3D Snakes Background using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

const snakes = [];
const numSnakes = 70; // Increase the number of snakes for better coverage

for (let i = 0; i < numSnakes; i++) {
    const snakeGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const snakeMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const snake = new THREE.Mesh(snakeGeometry, snakeMaterial);
    snake.position.set(
        Math.random() * window.innerWidth - window.innerWidth / 2,
        Math.random() * window.innerHeight - window.innerHeight / 2,
        (Math.random() - 0.5) * 100
    );
    snakes.push(snake);
    scene.add(snake);
}

camera.position.z = 100;

const animate = function () {
    requestAnimationFrame(animate);

    snakes.forEach(snake => {
        snake.rotation.x += 0.01;
        snake.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
};

animate();
