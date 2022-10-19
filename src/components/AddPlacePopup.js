import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({onClose, isOpen, changeAddCard}){
  const [cardName, setCardName] = useState('');
  const [link, setLink]   = useState('');
  
  //очистить инпут при открытии
  useEffect(()=>{
    setCardName('');
    setLink('');
  },[isOpen]); 

  function handleSubmit(evt) {
    evt.preventDefault();
      changeAddCard({
        name: cardName,
        link: link
     });
  }

  function handleChangeCardName(evt) {
    setCardName(evt.target.value);
  }
  
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      onClose = {onClose}
      isOpen = {isOpen}
      name = "card"
      title = "Новое место"
      saveButton = "Создать"
      onSubmit = {handleSubmit}
      // isLoading = {isLoading}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_image-title"
          id="imageTitle"
          placeholder="Название"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={cardName ?? ''}
          onChange={handleChangeCardName}
        />
        <span className="popup__error" id="imageTitle-error"></span>
      </label>  
      <label className="popup__label">
        <input
          type="url"
          className="popup__input popup__input_image-link"
          id="imageLink"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link ?? ''}
          onChange={handleChangeLink}
        />
        <span className="popup__error" id="imageLink-error"></span>
      </label>
    </PopupWithForm>
  );
}
  
  export default AddPlacePopup;