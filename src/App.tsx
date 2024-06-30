import { useState, useEffect } from 'react';
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

  const updateFavoriteList = (newList: number[]) => {
    setFavoritList(newList);
  };

  return (
    <> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<div>Home Page</div>} />
          <Route path='/films' element={<MainContent setFavoritList={setFavoritList} favoritList={favoritList}/>} />
          <Route path='/favorites' element={<FavoriteContent favoritList={favoritList} updateFavoriteList={updateFavoriteList} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;