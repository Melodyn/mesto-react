import { useState } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { enumPopupName } from '../../utils/constants';

const PopupAddCard = (props) => {
  const {
    isOpen,
    onSave,
    onClose,
  } = props;
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  return (
    <PopupWithForm
      name={enumPopupName.card}
      title="Новое место"
      submitText="Создать"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, link });
        setName('');
        setLink('');
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="form__items">
        <input
          type="text"
          name="name"
          className="form__item"
          placeholder="Название"
          tabIndex="1"
          minLength="2"
          maxLength="30"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <span className="form__item-error form__item-error_field_name" />
        <input
          type="url"
          name="link"
          className="form__item"
          placeholder="Ссылка на картинку"
          tabIndex="2"
          value={link}
          required
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="form__item-error form__item-error_field_link" />
      </fieldset>
    </PopupWithForm>
  );
};

export { PopupAddCard };
