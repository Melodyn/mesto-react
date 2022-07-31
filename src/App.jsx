import './vendor/normalize.css';
import './pages/index.css';
import React from 'react';
import { Api } from './utils/Api';
import { apiConfig } from './utils/constants';
// components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Card } from './components/Card';
import { PopupWithForm } from './components/PopupWithForm';
import { PopupWithImage } from './components/PopupWithImage';

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
  const [openPopupName, setOpenPopupName] = React.useState('');
  const [cards, updateCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
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
        isOpen={enumPopupName.profile === openPopupName}
        onClose={() => {
          setOpenPopupName('');
        }}
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
        isOpen={enumPopupName.place === openPopupName}
        onClose={() => {
          setOpenPopupName('');
        }}
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
        isOpen={enumPopupName.avatar === openPopupName}
        onClose={() => {
          setOpenPopupName('');
        }}
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
          setOpenPopupName('');
          setSelectedCard({});
        }}
      />
    </>
  );
};

export default App;
