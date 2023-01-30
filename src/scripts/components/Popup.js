export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener(
      "mousedown",
      this._handleClickClose.bind(this)
    );
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this._popup.classList.remove("popup_opened");
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popup.classList.remove("popup_opened");
    }
  }

  setEventListeners() {
    const popupClose = this._popup.querySelector(`#${this._popup.id}-close`);
    popupClose.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener(
      "mousedown",
      this._handleClickClose.bind(this)
    );

    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
}
