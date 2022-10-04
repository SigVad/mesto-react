import React from 'react';
//props.name: profile, card, confirm, avatar

function PopupWithForm(props) {
  // console.log(props.popupData)
  const name = props.popupData.name;
  const isOpen = props.popupData.isOpen;
  const onClose = props.onClose;
  const title = props.popupData.title;
  const saveButton = props.popupData.saveButton;
  const children = props.popupData.children;

  return(
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form 
          className={`popup__form popup__form_${name}`} 
          name={`${name}Form`} 
          //novalidate
        >

          {children}

          <button type="submit" className="popup__button">{saveButton}</button>
        </form>

      </div>
    </section>
  );
}

export default PopupWithForm;
