import React, { useState, useEffect } from 'react';
import './MainContent.css';
import CardFilm from '../../components/CardFilm/CardFilm';
import axios from 'axios';
import plus from '../../../assets/plus.svg';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import like2 from '../../../assets/like-2.svg';
import like1 from '../../../assets/like-1.svg';
import FilterMovies, { Filters } from '../../components/FilterMovie/FilterMovie';

interface MainContentProps {
  setFavoritList: React.Dispatch<React.SetStateAction<number[]>>;
  favoritList: number[];
}

interface CardFilmData {
  id: number;
  title: string;
  medium_cover_image: string;
  rating: number;
  year: number;
}

const MainContent: React.FC<MainContentProps> = ({ setFavoritList, favoritList }) => {
  const [listVideo, setListVideo] = useState<CardFilmData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    minimum_rating: null,
    maximum_rating: null,
    minimum_year: 1990,
    maximum_year: new Date().getFullYear(),
  });
  const [selectedFilm, setSelectedFilm] = useState<CardFilmData | null>(null);
  const [favoritListLocal, setFavoritListLocal] = useState<number[]>([]);

  useEffect(() => {
    const fetchListVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
          params: {
            limit: 50,
            page: currentPage,
            genre: Array.isArray(filters.genres) ? filters.genres.join(',') : filters.genres,
            minimum_rating: filters.minimum_rating,
            maximum_rating: filters.maximum_rating,
            minimum_year: filters.minimum_year,
            maximum_year: filters.maximum_year,
          },
        });

        if (currentPage > 1) {
          setListVideo(prevList => [...prevList, ...response.data.data.movies]);
        } else {
          setListVideo(response.data.data.movies);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchListVideos();
  }, [currentPage, filters]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleFiltersChange = (selectedFilters: Filters) => {
    setFilters(selectedFilters);
    setListVideo([]);
    setCurrentPage(1);
  };

  const openModal = (film: CardFilmData) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  const handleLikeClick = (id: number) => {
    setFavoritListLocal(prevList => {
      const isLiked = prevList.includes(id);

      if (!isLiked) {
        return [...prevList, id];
      } else {
        return prevList.filter(filmId => filmId !== id);
      }
    });

    setFavoritList(prevList => {
      const isLiked = prevList.includes(id);

      if (!isLiked) {
        return [...prevList, id];
      } else {
        return prevList.filter(filmId => filmId !== id);
      }
    });
  };

  return (
    <main>
      <FilterMovies onFiltersChange={handleFiltersChange} />
      <div className="main-content">
        {loading && <p className="loading-text">Loading...</p>}
        {!loading && listVideo.map(film => (
          <div key={film.id}>
            {favoritList.includes(film.id) ? (
              <img className="like" src={like2} alt="liked" onClick={() => handleLikeClick(film.id)} />
            ) : (
              <img className="like" src={like1} alt="like" onClick={() => handleLikeClick(film.id)} />
            )}
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
            <img className="btn" src={plus} alt="poster" onClick={handleLoadMore} />
            <span className="loading-text">Load more...</span>
          </div>
        )}
      </div>
      <ModalWindow isOpen={selectedFilm !== null} onClose={closeModal} content={selectedFilm} />
    </main>
  );
};

export default MainContent;
