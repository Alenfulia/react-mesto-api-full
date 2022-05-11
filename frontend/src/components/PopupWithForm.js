import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
      <button type="button" className="popup__submit-close" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          name={`${props.name}`}
          action="#"
          className="popup__form"
          onSubmit={props.onSubmit}
          noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
