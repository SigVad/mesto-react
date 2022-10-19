import { useContext } from 'react';
import { CurrentUserContext, } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(
  {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    handleCardLike,
    handleCardDelete
  }) {
  
  const currentUser = useContext(CurrentUserContext);
  
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
          { cards.map((card) => {
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