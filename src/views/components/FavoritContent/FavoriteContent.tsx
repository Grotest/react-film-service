import React, { useState, useEffect } from 'react';
import './FavoriteContent.css'; // Подключаем стили
import axios from 'axios';
import plus from '../../../assets/plus.svg';
import CardFilm from '../CardFilm/CardFilm'; // Путь к компоненту CardFilm
import ModalWindow from '../ModalWindow/ModalWindow'; // Путь к вашему компоненту Modal
import like2 from '../../../assets/like-2.svg'; // Иконка для like

const FavoriteContent: React.FC<{ favoritList: number[] }> = ({ favoritList }) => {
  const [listVideo, setListVideo] = useState([]); // Список фильмов
  const [loading, setLoading] = useState(false); // Изначально ставим загрузку в false
  const [selectedFilm, setSelectedFilm] = useState(null); // Выбранный фильм для модального окна
  console.log(favoritList)
  // Функция для загрузки фильмов по списку id
  const fetchMoviesByIds = async (ids: string[]) => {
    try {
      setLoading(true); // Начинаем загрузку данных
      const responses = await Promise.all(
        ids.map(async (id) => {
          const response = await axios.get(`https://yts.mx/api/v2/movie_details.json`, {
            params: {
              movie_id: id,
            },
          });
          return response.data.data.movie; // Возвращаем только нужную часть данных
        })
      );

      setListVideo(responses); // Устанавливаем список загруженных фильмов в state
      setLoading(false); // После загрузки данных устанавливаем загрузку в false
    } catch (error) {
      console.error('Error fetching movies by ids:', error);
      setLoading(false); // В случае ошибки также завершаем загрузку
    }
  };

  // Вызов загрузки фильмов по id при монтировании компонента
  useEffect(() => {
    fetchMoviesByIds(favoritList.map(String)); // Преобразуем массив чисел в массив строк для параметра movie_id
  }, [favoritList]); // Зависимость от изменений favoritList

  // Функции для открытия и закрытия модального окна
  const openModal = (film) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  // Отображение компонента
  return (
    <main>
      <div className="main-content">
        {listVideo.map((film) => (
          <div className= '' key={film.id}>
            <img className="like" src={like2} alt="like" /> {/* Пример использования иконки like */}
            <CardFilm
              name={film.title}
              poster={film.medium_cover_image}
              rating={film.rating}
              year={film.year}
              isLike={true} // Пример, если нужно отобразить другую иконку like
              onClick={() => openModal(film)} // Открываем модальное окно при клике на карточку фильма
            />
          </div>
        ))}

        {!loading && (
          <div className="loading-container">
            <img className="btn" src={plus} alt="poster" />
            <span className="loading-text">Load more...</span>
          </div>
        )}

        {/* Модальное окно */}
        <ModalWindow isOpen={selectedFilm !== null} onClose={closeModal} content={selectedFilm} />
      </div>
    </main>
  );
};

export default FavoriteContent;
