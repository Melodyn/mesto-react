import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(commonSelector, elementPopup, commonSelectorForm, handler = {}) {
    super(commonSelector, elementPopup);

    this._elementForm = elementPopup.querySelector(commonSelectorForm.selectorForm);
    this._elementFields = Array.from(this
      ._elementForm
      .querySelectorAll(commonSelectorForm.selectorField));

    this._onOpenHandler = handler.onOpen || (() => {});
    this._onSubmitHandler = handler.onSubmit || (() => {});

    this._setEventListeners();
  }

  _getInputValues() {
    return this._elementFields.reduce((acc, elementField) => {
      acc[elementField.name] = elementField.value;
      return acc;
    }, {});
  }

  _setEventListeners() {
    this._elementForm.addEventListener('submit', () => {
      this._onSubmitHandler(this._getInputValues());
    });
    super._setEventListeners();
  }

  open() {
    this._onOpenHandler();
    super.open();
  }
}
