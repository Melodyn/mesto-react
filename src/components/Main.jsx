import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Card } from './Card';

const Main = (props) => {
  const {
    apiMesto,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const [cards, updateCards] = useState([]);

  useEffect(() => {
    apiMesto
      .getCards()
      .then((data) => updateCards(data.slice().reverse()))
      .catch(alert);
  }, []);

  const onCardLike = (card) => {
    apiMesto
      .likeCard({ cardId: card._id, liked: card.isLiked })
      .then((updatedCard) => {
        const updatedCards = cards.map((crd) => ((crd._id === updatedCard._id) ? updatedCard : crd));
        updateCards(updatedCards);
      });
  };

  const onCardRemove = (card) => {
    apiMesto
      .removeCard({ cardId: card._id })
      .then(() => {
        const updatedCards = cards.filter(({ _id }) => _id !== card._id);
        updateCards(updatedCards);
      });
  };

  const cardComponents = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onClick={onCardClick}
      onLike={onCardLike}
      onRemove={onCardRemove}
    />
  ));

  return (
    <main className="content">
      <section className="profile" aria-label="Описание блога">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар блога"
            className="profile__avatar"
          />
          <div
            className="profile__avatar-overlay"
            role="button"
            aria-label="Обновить аватар"
            aria-hidden="true"
            tabIndex={0}
            onClick={onEditAvatar}
          />
        </div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <button
          type="button"
          className="button profile__edit"
          aria-label="Редактировать"
          onClick={onEditProfile}
        />
        <p className="profile__subtitle">{currentUser.about}</p>
        <button
          type="button"
          className="button profile__add-place"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>

      <section className="places" aria-label="Красивые картинки">
        <ul className="places__list">{cardComponents}</ul>
      </section>
    </main>
  );
};

export { Main };
