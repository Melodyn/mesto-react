import { PopupWithForm } from './PopupWithForm.js';

export class PopupWithConfirmation extends PopupWithForm {
  constructor(...params) {
    super(...params);
    this._confirmAction = () => {};
  }

  _setEventListeners() {
    this._elementForm.addEventListener('submit', () => {
      this._onSubmitHandler(this._confirmAction());
    });
    super._setEventListeners();
  }

  setConfirmAction(action) {
    this._confirmAction = action;
  }
}
