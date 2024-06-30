import React from 'react';
import './ModalWindow.css';

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  content:  Content | null;
}

interface Content {
  title: number;
  medium_cover_image: string;
  rating: string;
  description_full: number;
  genres: string | string[];
  year: number;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) {
    return null; 
  }

  const genresString = Array.isArray(content.genres) ? content.genres.join(', ') : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <div className="modal-content">
          <h1>{content.title}</h1>
          <img src={content.medium_cover_image} alt={'poster'} />
          <p>Rating: {content.rating}</p>
          <p>Year: {content.year}</p>
          <p>Genre: {genresString}</p>
          <p>Description: {content.description_full}</p>
         </div>
      </div>
    </div>
  );
};

export default ModalWindow;
