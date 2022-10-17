import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext, CardsContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

//В корневом компоненте App создана стейт-переменная currentUser . Она используется в качестве значения для провайдера контекста.
//Компоненты модальных окон содержат только обработчики сабмита формы. Остальные обработчики, например handleUpdateUser , описаны в компоненте App .

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err)
      })
  },[]);


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


  function handleCardDelete(card) {console.log(`${card.name} Deleted!`)}

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => {
      return item._id === currentUser._id;
    })
    if (isLiked) {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    } else {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }
  }
  
  // function handleCardDelete(card) {
  //   api.deleteCard(card._id).then(() => {
  //     setCards((state) => state.filter((c) => c._id !== card._id));
  //   });
  // }

  // function handleAddPostSubmit ({name, link}) {
  //   api.createCard({name, link}).then((newCard) => {
  //     setCards([newCard, ...cards]);
  //     handleCloseAllPopups();
  //   });
  // }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <CardsContext.Provider value={cards}>
        <CurrentUserContext.Provider value ={currentUser}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            //cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
          <Footer />
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
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </CardsContext.Provider>      
    </>
  );
}

export default App;