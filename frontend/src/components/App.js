import React from 'react';
import './App.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from "../utils/Api";


import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';


export default function App () {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, items]) => {
      setCurrentUser(userData)
      setCards(items)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  function handleEditProfileClick () {
    setEditProfilePopupOpen(true)
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  const [selectedCard, setSelectedCard] = React.useState({});
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    function handleCloseByEscape (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  };
  document.addEventListener('keydown', handleCloseByEscape)

  return () => {
    document.removeEventListener('keydown', handleCloseByEscape)
  }
  })

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards(cards.map((c) => c._id === card._id ? newCard : c))
  })
  .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((c) => c._id !== card._id)).catch((err) => {
        console.log(err);
      })
  })}

  function handleUpdateUser (inputValue) {
    api.setUserInfo(inputValue).then(res => {
      setCurrentUser(res);
      closeAllPopups()}).catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar (link) {
    api.editPhoto(link).then(res => {
      setCurrentUser(res);
      closeAllPopups()
    }).catch((err) => {
      console.log(err)})
  }

  function handleAddPlace (card) {
    api.addCard(card).then(newCard => {setCards([newCard, ...cards]);
    closeAllPopups()}).catch((err) => {
      console.log(err)})
  }

  function handleOverlayClick (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value = {currentUser}>
        <Header />
          <Main
        isEditProfilePopupOpen = {false}
        isAddPlacePopupOpen = {false}
        isEditAvatarPopupOpen = {false}
        onAvatarClick = {handleEditAvatarClick}
        onPlaceClick = {handleAddPlaceClick}
        onEditProfileClick = {handleEditProfileClick}
        onCardClick = {handleCardClick}
        cards = {cards}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
        isOpened={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onOverlayClick = {handleOverlayClick}
        onUpdateUser = {handleUpdateUser}/>

        <EditAvatarPopup
        isOpened={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onOverlayClick = {handleOverlayClick}
        onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onOverlayClick = {handleOverlayClick}
        onAddPlace={handleAddPlace}/>

        <PopupWithForm title="Вы уверены?" buttonText="Да" name="confirmDeletion" onClose={closeAllPopups}onOverlayClick = {handleOverlayClick}>
        </PopupWithForm>

        <ImagePopup 
        card = {selectedCard} 
        onClose = {closeAllPopups}
        onOverlayClick ={handleOverlayClick}/>

      </CurrentUserContext.Provider>
    </div>)
}