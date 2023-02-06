import { data } from "autoprefixer";

class Card {
  constructor(
    {
      data,
      handleImageClick,
      handleDeleteConfirmation,
      confirmationFunction,
      handleLikeFunction,
    },
    templateSelector
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likeAmount = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._confirmationFunction = confirmationFunction;
    this._handleLikeFunction = handleLikeFunction;
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

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeNumber = this._element.querySelector(".card__like-number");
    this._trash = this._element.querySelector(".card__trash");
    this._likeButton = this._element.querySelector(".card__like");

    this._likeNumber.textContent = this._likeAmount.length;

    if (this._cardOwnerId === "5b91ece1271e0a8558fbe8e0") {
      this._trash.classList.add("card__trash_opened");
    }

    this._cardImage.src = this._image;
    this._cardImage.alt = `Photo of ${this._title}`;
    this._cardTitle.textContent = this._title;

    return this._element;
  }

  /*_handleLikeButton(evt) {
    evt.target.classList.toggle("card_like_activate");
  }

  _handleDeleteButton() {
    this._confirmationFunction()
  }*/

  _setEventHandlers() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ title: this._title, image: this._image });
      });

    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeFunction(this._cardId, this._likeButton);
    });

    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._confirmationFunction(this._cardId);
      });
  }
}

export { Card };
