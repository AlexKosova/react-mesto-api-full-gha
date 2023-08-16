import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup ({
  isOpened,
  onClose,
  onOverlayClick,
  onUpdateUser
}) {
  
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about)
  const [buttonText, setButtonText] = React.useState('Сохранить')

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setButtonText('Сохранить')
  }, [currentUser, isOpened]);

  function handleSubmit (e) {
    e.preventDefault();
    setButtonText('Сохраняем...')
    onUpdateUser({
      name: name,
      about: about,
    });
  }  

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeAbout (e) {
    setAbout(e.target.value)
  }

  return (
    <PopupWithForm
      title="Редактировать профиль" 
      buttonText={buttonText} 
      name="editProfile" 
      isOpened={isOpened} 
      onClose={onClose}
      onOverlayClick = {onOverlayClick}
      onSubmit={handleSubmit}
    >
      <input 
      value={name || ''} 
      onChange={handleChangeName} 
      required 
      className="popup__input" 
      type="text" 
      placeholder="Введите имя" 
      minLength="2" 
      maxLength="40" 
      name="userName" 
      id="userNameInput" />
      <span className="error" id="userNameInput-error"></span>
      <input value={about || ''} onChange={handleChangeAbout} required className="popup__input" type="text" placeholder="Немного информации о себе" minLength="2" maxLength="200" name="userJobInput" id="userJobInput"/>
      <span id="userJobInput-error" className="error"></span>
    </PopupWithForm>
  )
}