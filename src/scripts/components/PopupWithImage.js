import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector(".popup__title");
    this._image = this._popup.querySelector(".popup__image");
  }

  open(data) {
    this._title.textContent = data.title;
    this._image.src = data.image;
    this._image.alt = `An image of ${data.title}.`;

    super.open();
  }
}
