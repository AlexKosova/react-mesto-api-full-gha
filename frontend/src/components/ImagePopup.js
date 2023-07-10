export default function ImagePopup ({card, onClose, onOverlayClick}) {
  return (
      <section className = {`popup  popup_background-color ${card._id && 'popup_opened'}`} onClick={onOverlayClick} id="photo-popup">
      <div className='photo-popup'>
        <button className="popup__cancel-button" id="photo-popup__close" name="photo-popup__close" type="button" onClick={onClose}></button>
        <img className="photo-popup__image" src={`${card.link}`} alt={card.name}/>
        <p className="photo-popup__title">{card.name}</p>
      </div>
    </section>
  )
}