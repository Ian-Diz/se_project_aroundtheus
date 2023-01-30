import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open(data) {
    this._popup
      .querySelector(`#${this._popup.id}-close`)
      .classList.add("popup_close_mobile");
    const title = this._popup.querySelector(".popup__title");
    const image = this._popup.querySelector(".popup__image");

    title.textContent = data.title;
    image.src = data.image;
    image.alt = `An image of ${data.title}.`;

    super.open();
  }
}
