import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(commonSelector, elementPopup, { selectorImageContainer, selectorTextContainer }) {
    super(commonSelector, elementPopup);

    this._elementImageContainer = this._elementPopup.querySelector(selectorImageContainer);
    this._elementTextContainer = this._elementPopup.querySelector(selectorTextContainer);

    super._setEventListeners();
  }

  _setPopupContent({ name, link }) {
    this._elementImageContainer.setAttribute('src', link);
    this._elementImageContainer.setAttribute('alt', name);
    this._elementTextContainer.textContent = name;
  }

  open({ name, link }) {
    this._setPopupContent({ name, link });
    super.open();
  }
}
