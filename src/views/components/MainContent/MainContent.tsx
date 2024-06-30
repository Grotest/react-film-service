import React, { useState, useEffect } from 'react';
import './MainContent.css';
import CardFilm from '../CardFilm/CardFilm';
import axios from 'axios';
import plus from '../../../assets/plus.svg';
import FilteredMovies from '../FilterMovie/FilterMovie';
import ModalWindow from '../ModalWindow/ModalWindow'; // Путь к вашему компоненту Modal
import like2 from '../../../assets/like-2.svg';
import like1 from '../../../assets/like-1.svg'; // Путь к вашей иконке like
import { useNavigate } from 'react-router-dom';

interface MainContentProps {
  setFavoritList: React.Dispatch<React.SetStateAction<number[]>>;
}

const MainContent: React.FC<MainContentProps> = ({ setFavoritList }) => {
  const [listVideo, setListVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    minimum_rating: null,
    maximum_rating: null,
    minimum_year: 1990,
    maximum_year: new Date().getFullYear(),
  });
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [favoritListLocal, setFavoritListLocal] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
          params: {
            limit: 50,
            page: currentPage,
            genre: filters.genres && filters.genres.length > 0 ? filters.genres.join(',') : null,
            minimum_rating: filters.minimum_rating,
            maximum_rating: filters.maximum_rating,
            minimum_year: filters.minimum_year,
            maximum_year: filters.maximum_year,
          },
        });

        if (currentPage > 1) {
          setListVideo((prevList) => [...prevList, ...response.data.data.movies]);
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFiltersChange = (selectedFilters: any) => {
    setFilters(selectedFilters);
    setListVideo([]);
    setCurrentPage(1);
  };

  const openModal = (film) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  const handleLikeClick = (id: number) => {
    const isLiked = favoritListLocal.includes(id);

    if (!isLiked) {
      setFavoritListLocal([...favoritListLocal, id]);
      setFavoritList((prevList) => [...prevList, id]);
      console.log(favoritListLocal)
    } else {
      const updatedList = favoritListLocal.filter((filmId) => filmId !== id);
      setFavoritListLocal(updatedList);
      setFavoritList((prevList) => prevList.filter((filmId) => filmId !== id));
    }
  };

  const navigateToFavorites = () => {
    navigate('/favorites', { state: { favoritList: favoritListLocal } });
  };
 

  return (
    <main>
      <FilteredMovies onFiltersChange={handleFiltersChange} />

      <div className="main-content">
        {listVideo.map((film) => (
          <div key={film.id}>
            {favoritListLocal.includes(film.id) ? (
              <img className="like" src={like2} alt="liked" onClick={() => handleLikeClick(film.id)} />
            ) : (
              <img className="like" src={like1} alt="like" onClick={() => handleLikeClick(film.id)} />
            )}
            <CardFilm
              name={film.title}
              poster={film.medium_cover_image}
              rating={film.rating}
              year={film.year}
              id={film.year}
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

        <ModalWindow isOpen={selectedFilm !== null} onClose={closeModal} content={selectedFilm} />
      </div>
    </main>
  );
};

export default MainContent;
