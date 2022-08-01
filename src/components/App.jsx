import '../vendor/normalize.css';
import '../pages/index.css';
import { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import { apiConfig } from '../utils/constants';
// components
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { Card } from './Card';
import { PopupWithForm } from './PopupWithForm';
import { PopupWithImage } from './PopupWithImage';

const enumPopupName = [
  'profile',
  'place',
  'avatar',
  'preview',
].reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {});

const App = () => {
  const apiMesto = new Api(apiConfig);
  const [openPopupName, setOpenPopupName] = useState('');
  const [cards, updateCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const handleClosePopup = () => {
    setOpenPopupName('');
  };

  useEffect(() => {
    apiMesto
      .getPlaces()
      .then((data) => updateCards(data.slice().reverse()))
      .catch(alert);
  }, []);

  const onEditProfile = () => {
    setOpenPopupName(enumPopupName.profile);
  };
  const onAddPlace = () => {
    setOpenPopupName(enumPopupName.place);
  };
  const onEditAvatar = () => {
    setOpenPopupName(enumPopupName.avatar);
  };
  const onCardClick = (card) => {
    setSelectedCard(card);
    setOpenPopupName(enumPopupName.preview);
  };

  return (
    <>
      <Header />
      <Main
        apiMesto={apiMesto}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
      >
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
          />
        ))}
      </Main>
      <Footer />

      <PopupWithForm
        name={enumPopupName.profile}
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={enumPopupName.profile === openPopupName}
        onClose={handleClosePopup}
      >
        <fieldset className="form__items">
          <input
            type="text"
            name="title"
            className="form__item"
            placeholder="Название профиля"
            minLength="2"
            maxLength="40"
            tabIndex="1"
            required
          />
          <span className="form__item-error form__item-error_field_title" />
          <input
            type="text"
            name="subtitle"
            className="form__item"
            placeholder="Описание профиля"
            minLength="2"
            maxLength="200"
            tabIndex="2"
            required
          />
          <span className="form__item-error form__item-error_field_subtitle" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name={enumPopupName.place}
        title="Новое место"
        submitText="Создать"
        isOpen={enumPopupName.place === openPopupName}
        onClose={handleClosePopup}
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
            required
          />
          <span className="form__item-error form__item-error_field_name" />
          <input
            type="url"
            name="link"
            className="form__item"
            placeholder="Ссылка на картинку"
            tabIndex="2"
            required
          />
          <span className="form__item-error form__item-error_field_link" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name={enumPopupName.avatar}
        title="Обновить аватар"
        submitText="Сохранить"
        isOpen={enumPopupName.avatar === openPopupName}
        onClose={handleClosePopup}
      >
        <fieldset className="form__items">
          <input
            type="url"
            name="avatar"
            className="form__item"
            placeholder="Ссылка на изображение"
            minLength="2"
            maxLength="200"
            tabIndex="1"
            required
          />
          <span className="form__item-error form__item-error_field_avatar" />
        </fieldset>
      </PopupWithForm>

      <PopupWithImage
        card={selectedCard}
        isOpen={enumPopupName.preview === openPopupName}
        onClose={() => {
          handleClosePopup();
          setSelectedCard({});
        }}
      />
    </>
  );
};

export default App;
