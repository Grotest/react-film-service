import React, { useState, useEffect } from 'react';
import './MainContent.css';
import CardFilm from '../CardFilm/CardFilm';
import Select from '../../UI/Select/Select';
import axios from 'axios';
import plus from '../../../assets/plus.svg';

const MainContent: React.FC = () => {
  const [listVideo, setListVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
          params: {
            limit: 5,
            page: currentPage
          }
        });
        console.log(response.data);
        setListVideo((prevList) => [...prevList, ...response.data.data.movies]);
        setLoading(false);
        setInitialLoad(false); // Помечаем первоначальную загрузку как завершенную
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Добавьте обработку ошибок при необходимости
        setLoading(false);
      }
    };

   
      fetchListVideos();
    
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <main>
      <Select
        defaultValue={'Сортировка'}
        options={[
          { value: 'title', name: 'name' },
          { value: 'body', name: 'descr' }
        ]}
      />
      <div className="main-content">
        {listVideo.map((film) => (
          <CardFilm
            key={film.id}
            name={film.title}
            poster={film.medium_cover_image}
            rating={film.rating}
            year={film.year}
          />
        ))}
        {loading  && (
          <div className="loading-container">
            <img className='btn' src={plus} alt='loading' />
            <span className="loading-text">Loading...</span>
          </div>
        )}
        {!loading  && (
          <div className="loading-container">
            <img className='btn' src={plus} alt='poster' onClick={handleLoadMore} />
            <span className="loading-text">Load more...</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
