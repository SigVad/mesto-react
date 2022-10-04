import React from 'react';

function ImagePopup(props){
 
  return (
    <div className={`popup popup_type_image ${props.card.name ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <figure className="popup__image-group">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;