import React from 'react';
import avatarImg from '../images/avatar.jpg';

const Main = (props) => {
  const {
    apiMesto,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    children,
  } = props;
  const [profile, updateProfile] = React.useState({
    name: 'Меместо',
    about: 'Место ваших мемов',
    avatar: avatarImg,
    _id: '',
    cohort: '',
  });

  React.useEffect(() => {
    apiMesto
      .getProfile()
      .then((data) => updateProfile(data))
      .catch(alert);
  }, []);

  return (
    <main className="content">
      <section className="profile" aria-label="Описание блога">
        <div className="profile__avatar-container">
          <img
            src={profile.avatar}
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
        <h1 className="profile__title">{profile.name}</h1>
        <button
          type="button"
          className="button profile__edit"
          aria-label="Редактировать"
          onClick={onEditProfile}
        />
        <p className="profile__subtitle">{profile.about}</p>
        <button
          type="button"
          className="button profile__add-place"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>

      <section className="places" aria-label="Красивые картинки">
        <ul className="places__list">{children}</ul>
      </section>
    </main>
  );
};

export { Main };
