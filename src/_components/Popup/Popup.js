import { keyboardKeyNameMap } from '../../utils/constants.js';

export class Popup {
  constructor({ selectorCloseButton, classNamePopupOpened, classNameContainer }, elementPopup) {
    this._elementPopup = elementPopup;
    this._classNamePopupOpened = classNamePopupOpened;
    this._classNameContainer = classNameContainer;
    this._buttonClosePopup = this._elementPopup.querySelector(selectorCloseButton);
    this._bindedHandlerEscClose = this._handleEscClose.bind(this);
    this._bindedHandlerOverlayClose = this._handleOverlayClose.bind(this);
    this._elementPopup.removeAttribute('style'); // хак, чтобы попапы не показывались при открытии страницы
  }

  _handleEscClose(e) {
    const keyName = e.key.toLowerCase();
    if (keyboardKeyNameMap.escape.includes(keyName)) {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    const isPopup = (e.currentTarget === e.target);
    const isOutsideContainer = e.target.classList.contains(this._classNameContainer);
    if (isOutsideContainer || isPopup) {
      this.close();
    }
  }

  _setEventListeners() {
    this._buttonClosePopup.addEventListener('click', this.close.bind(this));
  }

  close() {
    document.removeEventListener('keydown', this._bindedHandlerEscClose);
    this._elementPopup.removeEventListener('click', this._bindedHandlerOverlayClose);
    this._elementPopup.classList.remove(this._classNamePopupOpened);
  }

  open() {
    document.addEventListener('keydown', this._bindedHandlerEscClose);
    this._elementPopup.addEventListener('click', this._bindedHandlerOverlayClose);
    this._elementPopup.classList.add(this._classNamePopupOpened);
  }

  getElement() {
    return this._elementPopup;
  }
}
