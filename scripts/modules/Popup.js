import { popups } from "../index.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    const activePopup = this._popupSelector.querySelector(".popup_opened");
    activePopup.classList.remove("popup_opened");
    activePopup.removeEventListener("mousedown", clickClosePopup);
    document.removeEventListener("keydown", escapeClosePopup);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    popups
      .querySelector(`#${this._popupSelector.id}-close`)
      .addEventListener("click", this.close);
    this._popupSelector.addEventListener("mousedown", () => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });
    document.addEventListener("keydown", this._handleEscClose);
  }
}
