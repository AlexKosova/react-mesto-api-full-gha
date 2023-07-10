export default function PopupWithForm ({
  isOpened,
  onClose,
  children,
  title,
  buttonText,
  name,
  onSubmit,
  onOverlayClick
}) {
  return (
  <div className={`popup ${isOpened && 'popup_opened'}`} onClick={onOverlayClick}>
    <div className={`popup__container popup_type_${name}`}>
      <button className="popup__cancel-button" onClick={onClose} type="button"></button>
      <h3 className="popup__title">{title}</h3>
      <form onSubmit={onSubmit} name={name} noValidate>
        {children}
        <button className="popup__save-button" aria-label={buttonText} type="submit">{buttonText}
        </button>  
      </form>
      
    </div>
  </div>
  )
}

