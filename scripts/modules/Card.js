import { openPopup, closePopup } from "./utils.js";

const main = document.querySelector(".main");

const popups = main.querySelector(".popup");

const imagePopup = popups.querySelector("#imagePopup");

const popupImageTitle = imagePopup.querySelector(".popup__title");

const closeImageButton = popups.querySelector("#closeImage");

const popupImage = popups.querySelector(".popup__image");

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventHandlers();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._image;
    cardImage.alt = `Photo of ${this._title}`;
    cardTitle.textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    openPopup(imagePopup);
    closeImageButton.classList.add("popup_close_mobile");
    popupImageTitle.textContent = this._title;
    popupImage.src = this._image;
    popupImage.alt = `An image of ${this._title}.`;
  }

  _handleClosePopup() {
    closePopup();
    closeImageButton.classList.remove("popup_close_mobile");
  }

  _handleLikeButton(evt) {
    evt.target.closest(".card__like").classList.toggle("card_like_activate");
  }

  _handleDeleteButton(evt) {
    evt.target.closest(".card").remove();
  }

  _setEventHandlers() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", (evt) => {
        this._handleDeleteButton(evt);
      });
  }
}

export { Card };
