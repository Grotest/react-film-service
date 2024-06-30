import React, { useState } from 'react';
import './CardFilm.css';
import like1 from '../../../assets/like-1.svg';
import like2 from '../../../assets/like-2.svg';

interface CardFilmProps {
  name: string;
  poster: string;
  rating: number;
  year: number;
  isLike: boolean;
  id: number;
  onClick: () => void; // Добавлено свойство onClick
}

const CardFilm: React.FC<CardFilmProps> = ({ name, poster, rating, year, isLike, id, onClick }) => {
  const [liked, setLiked] = useState(isLike); // Состояние для отслеживания клика на изображение like
  const [favoritList, setFavoritList] = useState<number[]>([]); // Массив избранных id фильмов

  // Обработчик клика по изображению like
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); // Переключаем состояние liked

    // Добавляем или удаляем id фильма из списка избранных
    if (!liked) {
      setFavoritList([...favoritList, id]); // Добавляем id фильма в избранное
    } else {
      const updatedList = favoritList.filter((filmId) => filmId !== id); // Удаляем id фильма из избранного
      setFavoritList(updatedList);
    }
  };

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
