import { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick(props) {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        onClose = {closeAllPopups} 
        isOpen = {isEditAvatarPopupOpen}
        name = "avatar"
        title = "Обновить аватар"
        saveButton = "Сохранить"
      >
        <label className="popup__label">
            <input type="url" className="popup__input popup__input_avatar-link" id="avatarLink" placeholder="Введите ссылку" name="avatarLink" required />
            <span className="popup__error" id="avatarLink-error"></span>
        </label> 
      </PopupWithForm>
      <PopupWithForm
        onClose = {closeAllPopups} 
        isOpen = {isEditProfilePopupOpen}
        name = "edit"
        title = "Редактировать профиль"
        saveButton = "Сохранить"
      >
        <label className="popup__label">
          <input type="text" className="popup__input popup__input_name"  id="input-profile-name"  placeholder="Имя:" name="name" required />
          <span className="popup__error" id="input-profile-name-error"></span>
        </label>
        <label className="popup__label">
          <input type="text" className="popup__input popup__input_profession" id="input-profile-profession" placeholder="О себе:" name="about" required />
          <span className="popup__error" id="input-profile-profession-error"></span>
        </label>  
      </PopupWithForm>
      <PopupWithForm
        onClose = {closeAllPopups} 
        isOpen = {isAddPlacePopupOpen}
        name = "card"
        title = "Новое место"
        saveButton = "Создать"
      >
        <label className="popup__label">
          <input type="text" className="popup__input popup__input_image-title"  id="imageTitle"  placeholder="Название" name="name" required />
          <span className="popup__error" id="imageTitle-error"></span>
        </label>
        <label className="popup__label">
          <input type="url" className="popup__input popup__input_image-link" id="imageLink" placeholder="Ссылка на картинку" name="link" required />
          <span className="popup__error" id="imageLink-error"></span>
        </label>
      </PopupWithForm>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;