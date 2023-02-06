import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open = (prefilled) => {
    if (prefilled) {
      this._inputList.forEach((input) => {
        input.value = "Loading...";
      });
    }
    super.open();
  };

  close = () => {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
