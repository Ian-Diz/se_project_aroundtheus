import Popup from "./Popup.js";

import { popupImage, popupImageTitle, popups } from "../index.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    popups
      .querySelector(`#${this._popupSelector.id}-close`)
      .classList.add("popup_close_mobile");
    popupImageTitle.textContent = this._title;
    popupImage.src = this._image;
    popupImage.alt = `An image of ${this._title}.`;
  }
}
