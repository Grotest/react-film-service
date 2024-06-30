import React, { useState, useEffect } from 'react';
import './FavoriteContent.css';
import axios from 'axios';
import plus from '../../../assets/plus.svg';
import CardFilm from '../CardFilm/CardFilm';
import ModalWindow from '../ModalWindow/ModalWindow';
import like2 from '../../../assets/like-2.svg';

export interface CardFilmData {
  id: number;
  title: string;
  medium_cover_image: string;
  rating: number;
  year: number;
}

const FavoriteContent: React.FC<{ favoritList: number[], updateFavoriteList: (newList: number[]) => void }> = ({ favoritList, updateFavoriteList }) => {
  const [listVideo, setListVideo] = useState<CardFilmData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<CardFilmData | null>(null); 

  const fetchMoviesByIds = async (ids: string[]) => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        ids.map(async (id) => {
          const response = await axios.get(`https://yts.mx/api/v2/movie_details.json`, {
            params: {
              movie_id: id,
            },
          });
          return response.data.data.movie;
        })
      );

      setListVideo(responses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies by ids:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByIds(favoritList.map(String));
  }, [favoritList]);

  const handleLikeClick = (id: number) => {
    const updatedList = favoritList.filter((filmId) => filmId !== id);
    updateFavoriteList(updatedList);
    fetchMoviesByIds(updatedList.map(String));
  };

  const openModal = (film: CardFilmData) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  return (
    <main>
       <div className="main-content">
        {loading && <p>Loading...</p>}
      </div>
      <div className="main-content">
        {listVideo.map((film) => (
          <div className="" key={film.id}>
            <img className="like" src={like2} alt="like" onClick={() => handleLikeClick(film.id)} />
            <CardFilm
              name={film.title}
              poster={film.medium_cover_image}
              rating={film.rating}
              year={film.year}
              onClick={() => openModal(film)}
            />
          </div>
        ))}

        {!loading && (
          <div className="loading-container">
            <img className="btn" src={plus} alt="poster" />
            <span className="loading-text">Load more...</span>
          </div>
        )}

        <ModalWindow isOpen={selectedFilm !== null} onClose={closeModal} content={selectedFilm} />
      </div>
    </main>
  );
};

export default FavoriteContent;
