import React, { useState } from 'react';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations] = useState([
    { id: 1, title: 'Recommended Movie 1', genre: 'Action', match: '95%' },
    { id: 2, title: 'Recommended Movie 2', genre: 'Drama', match: '88%' },
    { id: 3, title: 'Recommended Movie 3', genre: 'Comedy', match: '82%' }
  ]);

  return (
    <div className="recommendations-container">
      <h1>Your Personalized Recommendations</h1>
      
      <div className="filters">
        <select defaultValue="all">
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
        </select>
      </div>

      <div className="recommendations-grid">
        {recommendations.map(movie => (
          <div key={movie.id} className="movie-recommendation">
            <div className="match-score">{movie.match}</div>
            <h3>{movie.title}</h3>
            <span className="genre">{movie.genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;