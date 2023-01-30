class Card {
  constructor({ data, handleImageClick }, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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
        this._handleImageClick({ title: this._title, image: this._image });
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
