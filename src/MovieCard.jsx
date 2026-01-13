import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, description, posterURL, rating } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster">
          <img src={posterURL} alt={title} className="poster-image" />
          <div className="movie-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-description">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
          <div className="view-details">
            Click to view details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;