import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onLoading  }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <input
          type="text"
          name="username"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          className="popup__input"
          required
          value={ name || ''}
          onChange={handleNameChange}
        />
        <span id="name-error" className="popup__input-error"></span>
        <input
          type="text"
          name="info"
          id="info"
          placeholder="Профессиональная деятельность"
          minLength="2"
          maxLength="200"
          className="popup__input"
          required
          value={ description || ''}
          onChange={handleDescriptionChange}
        />
        <span id="info-error" className="popup__input-error"></span>
        <button type="submit" className="popup__submit-save">{onLoading ? "Сохранение..." : "Сохранить"}</button>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
