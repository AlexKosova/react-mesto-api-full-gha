import React from 'react';
import './App.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from "../utils/Api";
import authApi from '../utils/authApi';
import {Route, Routes, useNavigate} from 'react-router-dom';


import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';


export default function App () {

  const [isLoggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [successStatus, setSuccessStatus] = React.useState(false)

  function handleRegister (data) {
    authApi.register(data).then(() => {
      setInfoTooltipOpen(true);
      setSuccessStatus(true)
      navigate('/sign-in')
    })
    .catch((err) => {
      setInfoTooltipOpen(true)
      setSuccessStatus(false)
      console.log(err);
    })
  }

  function handleLogin (data) {
    authApi.login(data).then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      setEmail(data.email)
      navigate('/')
    })
    .catch((err) => {
      setInfoTooltipOpen(true)
      setSuccessStatus(false)
      console.log(err);
    })
  }

  function getUserToken () {
    return localStorage.getItem('jwt')
  }

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [buttonText, setButtonText] = React.useState('Создать')
  const [buttonProfileText, setButtonProfileText] = React.useState('Сохранить')

  React.useEffect(() => {
    if (isLoggedIn) {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, items]) => {
        setCurrentUser(userData)
        setCards(items)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    const token = getUserToken();
    if (token) {
      authApi.getToken(token).then((res) => {
        if (res) {
          setLoggedIn(true)
          navigate('/')
          setEmail(res.data.email)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [navigate])

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
    setInfoTooltipOpen(false);
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
      setCards(cards.filter((c) => c._id !== card._id))
      }).catch((err) => {
        console.log(err);})
  }

  function handleUpdateUser (inputValue) {
    setButtonProfileText('Сохраняем...')
    api.setUserInfo(inputValue).then(res => {
      setCurrentUser(res);
      closeAllPopups()}).catch((err) => {
        console.log(err);
      }).finally(() => {
        setButtonProfileText('Сохранить')
      })
  }

  function handleUpdateAvatar (link) {
    setButtonProfileText('Сохраняем...')
    api.editPhoto(link).then(res => {
      setCurrentUser(res);
      closeAllPopups()
    }).catch((err) => {
      console.log(err)}).finally(() => {
        setButtonProfileText('Сохранить')
      })
  }

  function handleAddPlace (card) {
    setButtonText('создаём...')
    api.addCard(card).then(newCard => {setCards([newCard, ...cards]);
    closeAllPopups()}).catch((err) => {
      console.log(err)}).finally(() => {
        setButtonText('создать')
      })
  }

  function handleOverlayClick (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value = {currentUser}>
        <Header email={email}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute 
          loggedIn={isLoggedIn}
          Component={Main}
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
          />}/>
          <Route element={<Login onSubmit={handleLogin}/>} path='/sign-in'/>
          <Route element={<Register onSubmit={handleRegister}/>} path='/sign-up'/>
        </Routes>
        {isLoggedIn && <Footer />}
        <EditProfilePopup
        isOpened={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onOverlayClick = {handleOverlayClick}
        onUpdateUser = {handleUpdateUser}/>

        <EditAvatarPopup
        buttonText={buttonProfileText}
        isOpened={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onOverlayClick = {handleOverlayClick}
        onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup
        buttonText={buttonProfileText}
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onOverlayClick = {handleOverlayClick}
        onAddPlace={handleAddPlace}
        buttonText={buttonText} />

        <PopupWithForm title="Вы уверены?" buttonText="Да" name="confirmDeletion" onClose={closeAllPopups}onOverlayClick = {handleOverlayClick}>
        </PopupWithForm>

        <ImagePopup 
        card = {selectedCard} 
        onClose = {closeAllPopups}
        onOverlayClick ={handleOverlayClick}/>

        <InfoTooltip isOpened={isInfoTooltipOpen} onClose={closeAllPopups} status={successStatus}></InfoTooltip>

      </CurrentUserContext.Provider>
    </div>)
}