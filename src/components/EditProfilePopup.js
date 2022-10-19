import {useContext, useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup ({ onClose, isOpen, onUpdateUser }){
  //подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription]   = useState('');

  //добавить данные пользователя в инпуты формы
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      onClose = {onClose}
      isOpen = {isOpen}
      name = "edit"
      title = "Редактировать профиль"
      saveButton = "Сохранить"
      onSubmit = {handleSubmit}
      // isLoading = {isLoading}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_name"
          id="input-profile-name"
          placeholder="Имя:"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name ?? ''}
          onChange={handleChangeName}
        />
        <span className="popup__error" id="input-profile-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_profession"
          id="input-profile-profession"
          placeholder="О себе:"
          name="about"
          required
          value={description ?? ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__error" id="input-profile-profession-error"></span>
      </label>
    </PopupWithForm>
  );
}
  
  export default EditProfilePopup;