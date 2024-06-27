import React from 'react';
import './CardFilm.css'; 
import likeIcon1 from '../../../assets/like-1.svg'
import likeIcon2 from '../../../assets/like-2.svg'



const MainContent: React.FC = (props) => {

  const movie: Movie = {
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl:
      'https://image.tmdb.org/t/p/w500//9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', // URL постера фильма
  };

  return (
    <div className='card-film' style={{ border: '10px solid black', borderRadius: '15px!important', margin: "10px", hover: 'translate'}}>
      
      <img src={likeIcon2} alt='like' style={{ display: 'flex', position: "absolute" }} />
      <h1 style={{display: 'flex', position: "absolute", padding: "0 250px" }}>{props.rating} </h1>
      <img src={props.poster} alt='poster' style={{width: "100%", height: "300px"}} />
      <div style={{ padding: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{props.name}</h1>
        <h2 style={{ fontSize: '1rem', color: '#888' }}>{props.year}</h2>
      </div>
     </div>
  );
};

export default MainContent;
