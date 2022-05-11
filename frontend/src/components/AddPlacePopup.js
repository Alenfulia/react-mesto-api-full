
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onLoading }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setImage('');
    setDescription('');
  }, [isOpen]);

  const handleImageChange = (event) => {
    setImage(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name: description,
      link: image
      });

    event.target.reset();
  };

    return (
      <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <input
          type="text"
          name="card_name"
          id="card-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          className="popup__input"
          required
          onChange={handleDescriptionChange}
        />
        <span id="card-name-error" className="popup__input-error"></span>
        <input
          type="url"
          name="card_link"
          id="card-link"
          placeholder="Ссылка на картинку"
          className="popup__input"
          required
          onChange={handleImageChange}
        />
        <span id="card-link-error" className="popup__input-error"></span>
        <button type="submit" className="popup__submit-save">{onLoading ? "Сохранение..." : "Создать"}</button>
      </fieldset>
    </PopupWithForm>
    )
};

export default AddPlacePopup;
