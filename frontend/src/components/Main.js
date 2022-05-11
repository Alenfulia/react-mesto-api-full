import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) => {

  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={avatar} alt="Аватар профиля"/>
            <button className="profile__avatar-btn" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((card) => {
            return <Card
                      key={card._id}
                      card={card}
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                      onCardDelete={onCardDelete}
                    />
          })}
        </section>
      </main>
    </>
  );
};

export default Main;
