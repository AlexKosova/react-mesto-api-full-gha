import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup ({
  isOpened,
  onClose,
  onOverlayClick,
  onAddPlace,
  buttonText
}) {
  
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  },[isOpened])

  function handleName (e) {
    setName(e.target.value)
  }

  function handleLink (e) {
    setLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace({name, link})
  }

  return (
    <PopupWithForm
          title="Новое место" 
          buttonText={buttonText}
          name="newPost" 
          isOpened={isOpened} 
          onClose={onClose}
          onOverlayClick = {onOverlayClick}
          onSubmit={handleSubmit}
        >
      <input value={name || ''} onChange={handleName} required className="popup__input" type="text" minLength="2" maxLength="30" placeholder="Название" name="postTitleInput" id="postTitleInput" />
      <span id="postTitleInput-error" className="error"></span>
      <input value={link || ''} onChange={handleLink} required className="popup__input" type="url" placeholder="Ссылка на картинку" name="postLinkInput" id="postLinkInput" />
      <span id="postLinkInput-error" className="error"></span>
    </PopupWithForm>
  )
}
