import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmFunction) {
    super(popupSelector);
    this._confirmFunction = confirmFunction;
    this._confirmButton = this._popup.querySelector(".popup__confirm");
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._confirmFunction();
      this.close();
    });
    super.setEventListeners();
  }
}
