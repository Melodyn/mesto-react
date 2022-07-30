export class FormValidator {
  constructor(config, elementForm) {
    this._config = config;
    this._element = {
      form: elementForm,
      fields: [],
      submit: null,
      submitOriginalText: '',
    };
    this._validityState = {
      enabled: false,
      formIsValid: false,
      validity: {},
    };
    this._prepareElements();
  }

  _prepareElements() {
    const {
      selectorField,
      selectorSubmit,
      getSelectorErrorTextContainer,
    } = this._config;

    const elementForm = this._element.form;
    this._element.submit = elementForm.querySelector(selectorSubmit);
    this._element.submitOriginalText = this._element.submit.textContent;
    const fields = Array.from(elementForm.querySelectorAll(selectorField));
    this._element.fields = fields.map((elementField) => {
      const errorTextContainerSelector = getSelectorErrorTextContainer(elementField.name);
      const elementError = elementForm.querySelector(errorTextContainerSelector);
      elementField.addEventListener('focus', ({ target }) => target.select());

      return {
        elementField,
        elementError,
      };
    });
  }

  _checkFormState() {
    const isValid = this._element.fields.every(({ elementField: { validity } }) => validity.valid);
    if (isValid) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton('');
    }

    this._validityState.formIsValid = isValid;
  }

  _checkFieldState(elementField, elementError) {
    const validityState = this._validityState.validity;
    const isValid = validityState.valid;

    if (isValid) {
      this._hideFieldError(elementField, elementError);
    } else {
      this._showFieldError(elementField, elementError);
    }
  }

  _setListeners() {
    this._element.fields.forEach(({ elementField, elementError }) => {
      elementField.addEventListener('input', (e) => {
        this._validityState.validity = e.target.validity;
        this._checkFieldState(elementField, elementError);
        this._checkFormState();
      });
    });

    this._element.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._checkFormState();
      const { formIsValid } = this._validityState;
      if (!formIsValid) {
        e.stopImmediatePropagation();
        return;
      }

      this.disableSubmitButton();
      this._element.fields.forEach(({ elementField }) => {
        elementField.setAttribute('disabled', 'disabled');
      });
    });
  }

  _showFieldError(elementField, elementError) {
    const { classNameFieldInvalid } = this._config;
    elementField.classList.add(classNameFieldInvalid);
    elementError.textContent = elementField.validationMessage;
  }

  _hideFieldError(elementField, elementError) {
    const { classNameFieldInvalid } = this._config;
    elementField.classList.remove(classNameFieldInvalid);
    elementError.textContent = '';
  }

  enableValidation() {
    if (this._validityState.enabled) return false;

    this._setListeners();
    this._validityState.enabled = true;

    return true;
  }

  disableSubmitButton(withText = 'Сохранение…') {
    if (withText) {
      this._element.submit.textContent = withText;
    }
    this._element.submit.setAttribute('disabled', 'disabled');
  }

  enableSubmitButton() {
    this._element.submit.textContent = this._element.submitOriginalText;
    this._element.submit.removeAttribute('disabled');
  }

  enableForm() {
    this.enableSubmitButton();
    this._element.fields.forEach(({ elementField }) => {
      elementField.removeAttribute('disabled');
    });
  }

  resetForm() {
    this._element.form.reset();
    this._element.fields.forEach(({ elementField, elementError }) => {
      elementField.removeAttribute('disabled');
      this._hideFieldError(elementField, elementError);
    });
    this.enableSubmitButton();
  }

  getElement() {
    return this._element.form;
  }
}
