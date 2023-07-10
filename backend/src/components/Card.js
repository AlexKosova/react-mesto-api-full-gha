import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card ({
  card,
  onClick,
  onCardDelete,
  onCardLike
}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onClick(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  function handleLikeClick () {
    onCardLike(card)
  }
 
 return (
    <li className="element">
        <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
        <h2 className="element__title">{card.name}</h2>
        <button className={`element__button-like ${isLiked && 'element__button-like_active'}`} aria-label="нравится" 
            type="button" onClick={handleLikeClick}></button>
        <p className="element__likeQuantity">{card.likes.length}</p>
        {isOwn && <button className="element__button-delete" onClick={handleDeleteClick}></button>}
    </li>
  )
}