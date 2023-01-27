import { FormValidator } from "./modules/FormValidator.js";

import { Card } from "./modules/Card.js";

import "../pages/index.css";
import PopupWithImage from "./modules/PopupWithImage.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const main = document.querySelector(".main");

const popups = main.querySelector(".popup");

const imagePopup = popups.querySelector("#imagePopup");

const popupImageTitle = imagePopup.querySelector(".popup__title");

const closeImageButton = popups.querySelector("#closeImage");

const popupImage = popups.querySelector(".popup__image");

const editForm = popups.querySelector("#editForm");

const addForm = popups.querySelector("#addForm");

const cards = main.querySelector(".cards");

const profile = main.querySelector(".profile");

const editProfileButton = profile.querySelector(".profile__edit");

const addCardButton = profile.querySelector(".profile__add");

const editPopup = popups.querySelector("#editPopup");

const addPopup = popups.querySelector("#addPopup");

const popupName = popups.querySelector("#inputName");

const popupDesc = popups.querySelector("#inputDesc");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupTitle = addForm.querySelector("#inputTitle");

const popupLink = addForm.querySelector("#inputLink");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const editValidator = new FormValidator(config, editForm);
const addValidator = new FormValidator(config, addForm);
const popupImageClass = new PopupWithImage(popupImage);

function resetEdit() {
  popupName.value = profileTitle.textContent;
  popupDesc.value = profileSubtitle.textContent;
  editValidator.toggleButtonState();
  editValidator.resetValidation();
}

function openEdit() {
  openPopup(editPopup);
  resetEdit();
}

function openAdd() {
  openPopup(addPopup);
  addValidator.toggleButtonState();
}

function saveEdit(event) {
  event.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupDesc.value;
  closePopup(editPopup);
}

function saveAdd(event) {
  event.preventDefault();
  const item = { name: popupTitle.value, link: popupLink.value };
  cards.prepend(createCard(item));
  closePopup(addPopup);
  addForm.reset();
}

function createCard(item) {
  const card = new Card(item, "#card", popupImageClass.);
  const cardElement = card.generateCard();
  return cardElement;
}

//editForm.addEventListener("submit", saveEdit);

//addForm.addEventListener("submit", saveAdd);

editProfileButton.addEventListener("click", openEdit);

addCardButton.addEventListener("click", openAdd);

initialCards.forEach((item) => {
  cards.append(createCard(item));
});

editValidator.enableValidation();
addValidator.enableValidation();

export {
  editValidator,
  addValidator,
  cards,
  popups,
  popupImage,
  popupImageTitle,
  closeImageButton,
};
