import Popup from "./Popup.js";

import { popupImage, popupImageTitle, popups } from "../index.js";

export default class PopupWithImage extends Popup {
  open(data) {
    //popups.querySelector(`#${this._popupSelector.id}-close`).classList.add("popup_close_mobile");
    popupImageTitle.textContent = data.title;
    popupImage.src = data.image;
    popupImage.alt = `An image of ${data.title}.`;
    super.open();
  }
}
