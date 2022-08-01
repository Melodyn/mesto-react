import React from 'react';
import cn from 'classnames';

const PopupWithForm = (props) => {
  const {
    name, title, submitText, isOpen,
    onClose,
    children,
  } = props;

  const popupClassName = cn({
    popup: true,
    [`popup_type_${name}`]: true,
    popup_opened: isOpen,
  });

  const childrenCount = React.Children.count(children) > 0
    ? React.Children
      .toArray(children.props.children)
      .filter(({ type }) => type === 'input')
      .length
    : 0;

  return (
    <div className={popupClassName}>
      <div className="popup__container popup__container_type_form">
        <button
          type="button"
          className="button popup__close"
          tabIndex={childrenCount + 2}
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form action="/" name={name} className="popup__content form" noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button
            type="submit"
            name="submit"
            className="button form__submit"
            tabIndex={childrenCount + 1}
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export { PopupWithForm };
