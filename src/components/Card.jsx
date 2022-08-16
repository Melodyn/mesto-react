import { useContext } from 'react';
import cn from 'classnames';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({
  card: sourceCard, onClick, onLike, onRemove,
}) => {
  const {
    name, link, likes, owner,
  } = sourceCard;
  const currentUser = useContext(CurrentUserContext);
  const card = {
    ...sourceCard,
    isOwner: (currentUser._id === owner._id),
    isLiked: likes.some((liker) => liker._id === currentUser._id),
  };

  return (
    <li className="place-item">
      <article className="place" aria-label={name}>
        <img
          src={link}
          alt={name}
          className="place__image"
          aria-hidden="true"
          onClick={() => onClick(card)}
        />
        <div className="place__info">
          <a
            href={link}
            className="place__link"
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
          <div className="place__like-container">
            <button
              type="button"
              className={cn('button', 'place__like', { place__like_liked: card.isLiked })}
              aria-label="Оценить"
              onClick={() => onLike(card)}
            />
            <span className="place__like-count">{likes.length}</span>
          </div>
        </div>
        {card.isOwner && (
        <button
          type="button"
          className="button place__remove"
          aria-label="Удалить"
          onClick={() => onRemove(card)}
        />
        )}
      </article>
    </li>
  );
};

export { Card };
