import Popup from "./Popup.js";

import {
  popupName,
  popupDesc,
  profileTitle,
  profileSubtitle,
  EditValidator,
  AddValidator,
  addForm,
  editForm,
  popupTitle,
  popupLink,
} from "../index.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
  }

  _getInputValues() {
    const item = { name: popupTitle.value, link: popupLink.value };
    return item;
  }

  open() {
    popupName.value = profileTitle.textContent;
    popupDesc.value = profileSubtitle.textContent;
    EditValidator.toggleButtonState();
    EditValidator.resetValidation();
    AddValidator.toggleButtonState();
    super.open();
  }

  closePopup() {
    addForm.reset();
    super.closePopup();
  }

  setEventListeners() {
    editForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      profileTitle.textContent = popupName.value;
      profileSubtitle.textContent = popupDesc.value;
      EditValidator.toggleButtonState();
      EditValidator.resetValidation();
      this.closePopup();
      console.log("hai");
    });
    addForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
    });
    super.setEventListeners();
  }
}
