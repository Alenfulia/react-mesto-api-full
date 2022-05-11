import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_show-image ${card.link ? "popup_opened" : ""}`}>

      <div className="popup__container popup__show-container">
      <button type="button" className="popup__submit-close" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>

        <h2 className="popup__image-title">{card.name}</h2>

      </div>
    </div>
  );
};

export default ImagePopup;
