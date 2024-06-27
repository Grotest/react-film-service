import React from 'react';
import './CardFilm.css'; // Подключаем файл стилей для компонента

interface Movie {
  title: string;
  description: string;
  posterUrl: string;
}

const MainContent: React.FC = () => {
  // Пример данных о фильме (можно заменить на реальные данные из API)
  const movie: Movie = {
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500//9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', // URL постера фильма
  };

  return (
      <div className="movie-card">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>
  );
};

export default MainContent;
