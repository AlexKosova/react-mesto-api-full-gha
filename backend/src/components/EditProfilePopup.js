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
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Сохранить')

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setButtonText('Сохранить')
  }, [currentUser, isOpened]);

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeAbout (e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();
    setButtonText('Сохраняем...')
    onUpdateUser({
      name: name,
      about: description,
    });
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
      <input value={name || ''} onChange={handleChangeName} required className="popup__input" type="text" placeholder="Введите имя" minLength="2" maxLength="40" name="userName" id="userNameInput" />
      <span className="error" id="userNameInput-error"></span>
      <input value={description || ''} onChange={handleChangeAbout} required className="popup__input" type="text" placeholder="Немного информации о себе" minLength="2" maxLength="200" name="userJobInput" id="userJobInput"/>
      <span id="userJobInput-error" className="error"></span>
    </PopupWithForm>
  )
}