import trash from '../images/element/__trash-button/trash.svg';

function Card({card, onCardClick, onCardDelete, onCardLike}) {

  return (
      <li className="element" id={card._id}>
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={() => {onCardClick(card)}}
        />
        <button
          type="button"
          className="element__trash-button"
          onClick={() => {onCardDelete(card)}}
        >
          <img className="element__trash-button_image" width="18px" height="19px" src={trash} alt="корзина" />
        </button>
        <div className="element__content">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button
              type="button"
              className="element__like-button"
              onClick={() => {onCardLike(card)}}
            ></button>
            <span className="element__like-number">{(card.likes.length)}</span>
          </div>
        </div>
      </li> 
  );
}

export default Card;