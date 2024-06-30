import React from 'react';
import './CardFilm.css';


export interface CardFilmProps {
  name: string;
  poster: string;
  rating: number;
  year: number;
  onClick: () => void; 
}

const CardFilm: React.FC<CardFilmProps> = ({ name, poster, rating, year, onClick }) => {

  return (
    <div className="card-film" onClick={onClick}>
      <img className="card-poster" src={poster} alt={name} />
      <div className="card-details">
        <h2 className="card-title">{name}</h2>
        <p className="card-year">Year: {year}</p>
        <p className="card-rating">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default CardFilm;
