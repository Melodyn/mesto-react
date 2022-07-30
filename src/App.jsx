import avatarImg from './images/avatar.jpg';
import './pages/index.css';

function App() {
  return (
    <>
      <header className="header">
        <a href="#" className="logo" aria-label="Логотип" />
      </header>

      <main className="content">
        <section className="profile" aria-label="Описание блога">
          <div className="profile__avatar-container">
            <img
              src={avatarImg}
              alt="Аватар блога"
              className="profile__avatar"
            />
            <div className="profile__avatar-overlay" />
          </div>
          <h1 className="profile__title">Меместо</h1>
          <button type="button" className="button profile__edit" aria-label="Редактировать" />
          <p className="profile__subtitle">Место ваших мемов</p>
          <button type="button" className="button profile__add-place" aria-label="Добавить место" />
        </section>

        <section className="places" aria-label="Красивые картинки">
          <ul className="places__list" />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2022 Сергей Мелодин</p>
      </footer>

      <div className="popup popup_type_preview" style={{ display: 'none' }}>
        <div className="popup__container">
          <button
            type="button"
            className="button popup__close"
            tabIndex="4"
            aria-label="Закрыть"
          />
          <div className="popup__content popup-preview">
            <img src="#" alt="alt" className="popup-preview__image" />
            <p className="popup-preview__text" />
          </div>
        </div>
      </div>

      <div className="popup popup_type_add-place" style={{ display: 'none' }}>
        <div className="popup__container popup__container_type_form">
          <button
            type="button"
            className="button popup__close"
            tabIndex="4"
            aria-label="Закрыть"
          />
          <form action="/" name="place" className="popup__content form" noValidate>
            <h2 className="form__title">Новое место</h2>
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
            <button
              type="submit"
              name="submit"
              className="button form__submit"
              tabIndex="3"
              disabled
            >
              Создать
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_edit-profile" style={{ display: 'none' }}>
        <div className="popup__container popup__container_type_form">
          <button
            type="button"
            className="button popup__close"
            tabIndex="4"
            aria-label="Закрыть"
          />
          <form action="/" name="profile" className="popup__content form" noValidate>
            <h2 className="form__title">Редактировать профиль</h2>
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
            <button
              type="submit"
              name="submit"
              className="button form__submit"
              tabIndex="3"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_edit-avatar" style={{ display: 'none' }}>
        <div className="popup__container popup__container_type_form">
          <button
            type="button"
            className="button popup__close"
            tabIndex="4"
            aria-label="Закрыть"
          />
          <form action="/" name="avatar" className="popup__content form" noValidate>
            <h2 className="form__title">Обновить аватар</h2>
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
            <button
              type="submit"
              name="submit"
              className="button form__submit"
              tabIndex="2"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_confirm" style={{ display: 'none' }}>
        <div className="popup__container popup__container_type_form">
          <button
            type="button"
            className="button popup__close"
            tabIndex="2"
            aria-label="Закрыть"
          />
          <form action="/" name="confirm" className="popup__content form form_fieldless" noValidate>
            <h2 className="form__title">Вы уверены?</h2>
            <button
              type="submit"
              name="submit"
              className="button form__submit"
              tabIndex="1"
            >
              Да
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
