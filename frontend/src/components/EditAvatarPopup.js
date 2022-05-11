import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, onLoading }) => {
  const avatarRef = useRef();

  useEffect(() => {
  avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form">
        <input
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input"
          required
          ref={avatarRef}
        />
        <span id="avatar-error" className="popup__input-error"></span>
        <button type="submit" className="popup__submit-save">{onLoading ? "Сохранение..." : "Сохранить"}</button>
      </fieldset>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
