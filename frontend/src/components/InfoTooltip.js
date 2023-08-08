import React from "react";
import failImg from '../images/failImg.svg'
import successImg from '../images/successImg.svg'

export default function InfoTooltip ({status, isOpened, onClose}) {

  return (
    <div className={`popup ${isOpened && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__cancel-button"name="photo-popup__close" type="button" onClick={onClose}/>
        <img className="popup__tooltip-img" src={status ? successImg : failImg}/>
        <p className="popup__tooltip-title">{status ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</p>
      </div>
      
    </div>
  )
}