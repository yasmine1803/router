import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './MovieList';
import Filter from './Filter';
import AddMovieForm from './AddMovieForm';
import MovieDetails from './MovieDetails';
import './App.css';

const App = () => {
  // Initial movie data with trailer links
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 8.8,
      trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 9.3,
      trailerLink: "https://www.youtube.com/embed/6hB3S9bIaco"
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 9.0,
      trailerLink: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterURL: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 8.9,
      trailerLink: "https://www.youtube.com/embed/s7EdQ4FqbhY"
    },
    {
      id: 5,
      title: "Parasite",
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      posterURL: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 8.6,
      trailerLink: "https://www.youtube.com/embed/5xH0HfJHsaY"
    },
    {
      id: 6,
      title: "La La Land",
      description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      posterURL: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 8.0,
      trailerLink: "https://www.youtube.com/embed/0pdqf4P9MB8"
    }
  ]);

  // Filter states
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter movies based on title and rating
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesRating = ratingFilter ? movie.rating >= parseFloat(ratingFilter) : true;
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  // Add new movie
  const handleAddMovie = (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: movies.length + 1,
      trailerLink: newMovie.trailerLink || "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };
    setMovies(prevMovies => [movieWithId, ...prevMovies]);
    setShowAddForm(false);
  };

  // Home Page Component
  const HomePage = () => (
    <div className="home-page">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>🎬 popCorn</h1>
            <p className="tagline">Your personal movie collection</p>
          </div>
          <button 
            className="add-movie-button"
            onClick={() => setShowAddForm(true)}
            aria-label="Add new movie"
          >
            + Add Movie
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Filter 
            onTitleChange={setTitleFilter}
            onRatingChange={setRatingFilter}
          />
          
          <div className="results-info">
            <h2>Movies ({filteredMovies.length})</h2>
            <p className="filter-info">
              {titleFilter && `Title: "${titleFilter}"`}
              {ratingFilter && `${titleFilter ? ' • ' : ''}Min. Rating: ${ratingFilter}`}
            </p>
          </div>
          
          <MovieList movies={filteredMovies} />
          
          {(titleFilter || ratingFilter) && (
            <div className="clear-filters">
              <button 
                onClick={() => {
                  setTitleFilter('');
                  setRatingFilter('');
                }}
                className="clear-button"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {showAddForm && (
        <AddMovieForm 
          onAddMovie={handleAddMovie}
          onClose={() => setShowAddForm(false)}
        />
      )}

      <footer className="app-footer">
        <div className="container">
          <p>popCorn Movie App • Built with React Hooks</p>
          <p className="total-movies">Total Movies: {movies.length}</p>
        </div>
      </footer>
    </div>
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;