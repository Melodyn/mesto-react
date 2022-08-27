import { useState, useContext, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { enumPopupName } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const PopupEditProfile = (props) => {
  const {
    isOpen,
    onSave,
    onClose,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={enumPopupName.profile}
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={isOpen}
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, about });
      }}
      onClose={onClose}
    >
      <fieldset className="form__items">
        <input
          type="text"
          name="name"
          className="form__item"
          placeholder="Название профиля"
          minLength="2"
          maxLength="40"
          tabIndex="1"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <span className="form__item-error form__item-error_field_title" />
        <input
          type="text"
          name="about"
          className="form__item"
          placeholder="Описание профиля"
          minLength="2"
          maxLength="200"
          tabIndex="2"
          value={about}
          required
          onChange={(e) => setAbout(e.target.value)}
        />
        <span className="form__item-error form__item-error_field_subtitle" />
      </fieldset>
    </PopupWithForm>
  );
};

export { PopupEditProfile };
