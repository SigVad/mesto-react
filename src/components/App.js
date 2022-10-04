import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  
  const createPopupData = [
    {
      isOpen: isEditAvatarPopupOpen,
      name: 'avatar',
      title: 'Обновить аватар',
      saveButton: 'Сохранить',
      children:
    <>
      <label className="popup__label">
          <input type="url" className="popup__input popup__input_avatar-link" id="avatarLink" placeholder="Введите ссылку" name="avatarLink" required />
          <span className="popup__error" id="avatarLink-error"></span>
      </label>   
    </>
    },{
      isOpen: isEditProfilePopupOpen,
      name: 'edit',
      title: 'Редактировать профиль',
      saveButton: 'Сохранить',
      children:
    <>
      <label className="popup__label">
        <input type="text" className="popup__input popup__input_name"  id="input-profile-name"  placeholder="Имя:" name="name" required />
        <span className="popup__error" id="input-profile-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" className="popup__input popup__input_profession" id="input-profile-profession" placeholder="О себе:" name="about" required />
        <span className="popup__error" id="input-profile-profession-error"></span>
      </label> 
    </>
    },{
      isOpen: isAddPlacePopupOpen,
      name: 'card',
      title: 'Новое место',
      saveButton: 'Создать',
      children:
    <>
      <label className="popup__label">
        <input type="text" className="popup__input popup__input_image-title"  id="imageTitle"  placeholder="Название" name="name" required />
        <span className="popup__error" id="imageTitle-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" className="popup__input popup__input_image-link" id="imageLink" placeholder="Ссылка на картинку" name="link" required />
        <span className="popup__error" id="imageLink-error"></span>
      </label>    
    </>
    }];

  
  function selectedPopupData() {
    let popupData = {isOpen: false, name: '', title: '', saveButton: '', children: <></>};
      //popupData = createPopupData.find(function(item) {
      createPopupData.forEach((item)=>{
        if (item.isOpen) {
          popupData = item;
          return;
        }
      });
    return popupData;
  }
  const popupData = selectedPopupData();
  //console.log(popupData);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick(props) {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick() {
    setSelectedCard(this.card);
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
      <Footer />
      <PopupWithForm 
       /* isOpen = {popupData.isOpen}
        children = {popupData.children}
        saveButton = {popupData.saveButton}
        name = {popupData.name}
        title = {popupData.title} */
        popupData = {popupData}
        onClose = {closeAllPopups} 
        />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;