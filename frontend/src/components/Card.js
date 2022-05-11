import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import IconDel from '../images/Trash-element.svg';

const Card = ({ card, onCardClick, onCardLike,  onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
  `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  return (
    <div className="element">
      {isOwn && <button type="button" className='element__button-delete' src={IconDel} onClick={handleDeleteClick} />}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
