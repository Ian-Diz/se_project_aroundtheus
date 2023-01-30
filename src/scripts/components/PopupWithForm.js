import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
  }

  _getInputValues() {
    const firstInput = this._popup.querySelector(".popup__input-first");
    const secondInput = this._popup.querySelector(".popup__input-second");
    const item = { first: firstInput.value, second: secondInput.value };
    return item;
  }

  open(cb) {
    cb();
    super.open();
  }

  close() {
    const form = this._popup.querySelector(".popup__form");
    if (this._popup.id === "addPopup") {
      form.reset();
    }
    super.close();
  }

  setEventListeners() {
    this._popup.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this._submitFunction(this._getInputValues());
        this.close();
      },
      { once: true }
    );
    super.setEventListeners();
  }
}
