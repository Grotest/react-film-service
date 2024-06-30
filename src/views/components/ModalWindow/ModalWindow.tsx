import React from 'react';
import './ModalWindow.css'; // Подключаем CSS для стилей модального окна

interface ModalWindowProps {
  isOpen: boolean; // Состояние модального окна: открыто или закрыто
  onClose: () => void; // Функция для закрытия модального окна
  content: any; // Содержимое модального окна (ваш выбранный фильм)
}

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null; // Не показываем модальное окно, если isOpen равен false
  }

  // Преобразуем массив жанров в строку через запятую
  const genresString = content.genres.join(', ');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <div className="modal-content">
          <h1>{content.title}</h1>
          <img src={content.medium_cover_image} alt={content.title} />
          <p>Rating: {content.rating}</p>
          <p>Year: {content.year}</p>
          <p>Genre: {genresString}</p>
          <p>Description: {content.description_full}</p>
          {/* Добавьте другие данные фильма, которые хотите показать в модальном окне */}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
