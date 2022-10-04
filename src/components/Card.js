import React from 'react';
import trash from '../images/element/__trash-button/trash.svg';

function Card(props) {
  
  function handleClick(){
    props.onCardClick(props.card);
  }

  return (
      <li className="element" id={props.card._id}>
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
        <button type="button" className="element__trash-button">
          <img className="element__trash-button_image" width="18px" height="19px" src={trash} alt="корзина" />
        </button>
        <div className="element__content">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like">
            <button type="button" className="element__like-button"></button>
            <p className="element__like-number">{(props.card.likes.length)}</p>
          </div>
        </div>
      </li> 
  );
}

export default Card;