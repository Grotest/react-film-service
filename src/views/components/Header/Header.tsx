import React from 'react';
import '../Header/Header.css';
import mainIcon from '../../../assets/icon.png'
import likeIcon from '../../../assets/heart.svg'
import profileIcon from '../../../assets/profile.svg'
import SearchInput from '../../UI/Search/SearchInput';

const Header: React.FC = () => {
  return (
    <header className="header"> 
      <div className="container">
        <div className="logo">
          <img src={ mainIcon } alt="logo"/>
          <h2 className=''>
            <span style={{color:" #66FCF1", textTransform: "uppercase"}}>The best movie</span> <br/> on you device
          </h2>
        </div>
        <SearchInput/>
        <nav className="nav">
          <ul className='menu'>
            <li className='menuItem'>
              <img src={ likeIcon } alt="logo"/>
              <a href="/">Favorites</a>
            </li>
            <li className='menuItem'>
              <img src={ profileIcon } alt="logo"/>
              <a href="/">Profile</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
