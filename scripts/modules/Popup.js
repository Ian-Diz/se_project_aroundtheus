import { popups, imagePopup, closeIma } from "../index.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
    console.log(this);
  }

  closePopup() {
    /*this._popupSelector.removeEventListener(
      "mousedown",
      this._handleClickClose
    );
    document.removeEventListener("keydown", this._handleEscClose);*/
    const activePopup = popups.querySelector(".popup_opened");
    activePopup.classList.remove("popup_opened");
  }

  /*_handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      const activePopup = popups.querySelector(".popup_opened");
      activePopup.classList.remove("popup_opened");
    }
  }*/

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const activePopup = popups.querySelector(".popup_opened");
      activePopup.classList.remove("popup_opened");
    }
  }

  /*_handleEscClose(evt) {
    const close = this.closePopup;
    if (evt.key === "Escape") {
      close();
    }
  }*/

  setEventListeners() {
    const popupClose = popups.querySelector(`#${this._popupSelector.id}-close`);
    popupClose.addEventListener("click", this.closePopup);
    this._popupSelector.addEventListener("mousedown", (evt) => {
      const close = this.closePopup;
      if (evt.target === evt.currentTarget) {
        close();
      }
    });

    this._popupSelector.addEventListener("mousedown", this._handleClickClose);

    document.addEventListener("keydown", this._handleEscClose);

    /*document.addEventListener("keydown", (evt) => {
      const close = this.closePopup;
      console.log(this.closePopup);
      if (evt.key === "Escape") {
        close();
      }
    });*/
  }
}
