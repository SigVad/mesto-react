function PopupWithForm({onClose, isOpen, name, title, saveButton, children}) {

  return(
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form 
          className={`popup__form popup__form_${name}`} 
          name={`${name}Form`} 
        >
          {children}
          <button type="submit" className="popup__button">{saveButton}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;