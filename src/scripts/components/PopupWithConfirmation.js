import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#certaintyConfirm");
  }

  setSubmitAction(action) {
    this._submitFunction = action;
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._submitFunction();
      this.close();
    });
    super.setEventListeners();
  }
}
