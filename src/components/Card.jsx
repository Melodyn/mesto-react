const Card = ({ card, onCardClick }) => {
  const {
    name, link, likes,
  } = card;

  return (
    <li className="place-item">
      <article className="place" aria-label={name}>
        <img
          src={link}
          alt={name}
          className="place__image"
          aria-hidden="true"
          onClick={() => onCardClick(card)}
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
              className="button place__like"
              aria-label="Оценить"
            />
            <span className="place__like-count">{likes.length}</span>
          </div>
        </div>
        <button
          type="button"
          className="button place__remove"
          aria-label="Удалить"
        />
      </article>
    </li>
  );
};

export { Card };
