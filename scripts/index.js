import { FormValidator } from "./modules/FormValidator.js";

import { Card, initialCards } from "./modules/Card.js";

const main = document.querySelector(".main");

const popups = main.querySelector(".popup");

const editForm = popups.querySelector("#editForm");

const addForm = popups.querySelector("#addForm");

const cards = main.querySelector(".cards");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

initialCards.forEach((item) => {
  const card = new Card(item, "#card");
  const cardElement = card.generateCard();
  cards.append(cardElement);
});

const editValidator = new FormValidator(config, editForm);
const addValidator = new FormValidator(config, addForm);

editValidator.enableValidation();
addValidator.enableValidation();

export { editValidator, addValidator, cards };
