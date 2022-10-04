import React from 'react';
//import avatar from '../images/profile/image.jpg';
import {api} from '../utils/Api.js';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        // console.log(res)
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err)
      })
  },[]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err)
      })
  },[]);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={userAvatar} alt="аватар" className="profile__avatar-image" />
          <button
            type="button"
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          ></button>
        </div>  
        <div className="profile__info">
          <div className="profile__name-button">
            <h1 className="profile__name" id="profile-name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__profession" id="profile-profession">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
      ></button>
      </section>
      <section className="elements content__break">
        <ul className="elements__list">

          {cards.map((card) => {
            return(
              <Card card={card} key={card._id} onCardClick={props.onCardClick} />
            )
          })}

        </ul>
      </section>
    </main>
  );
}



export default Main;
