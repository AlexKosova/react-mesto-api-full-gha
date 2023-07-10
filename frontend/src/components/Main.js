import React from "react";
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main ({
  onAvatarClick,
  onPlaceClick,
  onEditProfileClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__photo" src={currentUser.avatar} alt="фото профиля"/>
        <button 
        className="profile__photo-edit-button" onClick={onAvatarClick}>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" aria-label="редактировать профиль" onClick={onEditProfileClick} type="button"></button>
          <p className="profile__description">{currentUser.about}</p> 
        </div>
        <button className="profile__add-button" onClick={onPlaceClick} type="button" aria-label="добавить фото"></button>
      </section>

      <section className="elements">
          {cards.map((data) => {
            return (
            <Card 
            card = {data} 
            key = {data._id}
            onClick = {onCardClick}
            onCardLike = {onCardLike} onCardDelete = {onCardDelete}
            />
            
            )
          })}
      </section>
    </main>
  )
}