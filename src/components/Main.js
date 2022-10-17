//Выполнено поднятие стейта из компонента Main в App .
import { useState, useContext, useEffect} from 'react';
//import avatar from '../images/profile/image.jpg';
import {CurrentUserContext, CardsContext} from '../contexts/CurrentUserContext';
import {api} from '../utils/Api.js';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, handleCardLike, handleCardDelete}) {
  
  const currentUser = useContext(CurrentUserContext);
  const currentCards = useContext(CardsContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar-image" />
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>  
        <div className="profile__info">
          <div className="profile__name-button">
            <h1 className="profile__name" id="profile-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__profession" id="profile-profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
      ></button>
      </section>
      <section className="elements content__break">
        <ul className="elements__list">
          { currentCards.map((card) => {
            return(
              <Card 
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            )
          }) }
        </ul>
      </section>
    </main>
  );
}

export default Main;
