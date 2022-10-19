import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {CurrentUserContext, CardsContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

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

    api.getInitialCards()
      .then((res) => {
        setCards(res);
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
  
  function handleUpdateAvatar(link) {
    api.changeAvatar(link)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
  }

  function handleUpdateUser(userData) {
    api.changeUserInfo(userData)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
  }

  function handleAddPlaceSubmit (preloadCard) {
    api.addCard(preloadCard)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

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
  
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <CurrentUserContext.Provider value ={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup
          onClose = {closeAllPopups} 
          isOpen = {isEditAvatarPopupOpen}
          changeAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup 
          onClose={closeAllPopups} 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        /> 
        <AddPlacePopup
          onClose = {closeAllPopups} 
          isOpen = {isAddPlacePopupOpen}
          changeAddCard={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;