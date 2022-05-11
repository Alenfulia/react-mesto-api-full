import Popup from "./PopupWithForm"
import success from '../images/Union_success.svg';
import fail from '../images/Union_failure.svg';

const InfoTooltip = ({registerSuccess, isOpen, onClose}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}>
      <div className="popup__container">
        <div className="popup__info-tooltip">
          <img src={registerSuccess ? success : fail} alt="Регистрация" />
          <h2 className="popup__title popup__title-tooltip">{registerSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
        </div>
      </div>
    </Popup>
  )
}

export default InfoTooltip;
