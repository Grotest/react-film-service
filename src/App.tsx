import React, { useState, useEffect } from 'react';
import './App.css'
import Header from './views/components/Header/Header'
import MainContent from './views/components/MainContent/MainContent'
import FavoriteContent from './views/components/FavoritContent/FavoriteContent'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [favoritList, setFavoritList] = useState<number[]>(() => {
    const storedList = localStorage.getItem('favoritList');
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritList', JSON.stringify(favoritList));
  }, [favoritList]);

  return (
    <> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/home' element={<div>Home Page</div>} />
          <Route path='/films' element={<MainContent setFavoritList={setFavoritList} />} />
          <Route path='/favorites' element={<FavoriteContent favoritList={favoritList} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;