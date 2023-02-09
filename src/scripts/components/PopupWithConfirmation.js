import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#certaintyConfirm");
  }

  setSubmitAction(action) {
    this._submitFunction = action;
  }

  isLoading() {
    this._confirmButton.textContent = "Deleting...";
  }

  finishLoading() {
    setTimeout(() => {
      this._confirmButton.textContent = "Yes";
    }, 500);
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._submitFunction();
    });
    super.setEventListeners();
  }
}
