import { FormValidator } from "./modules/FormValidator.js";

import { Card } from "./modules/Card.js";

import "../pages/index.css";

import PopupWithImage from "./modules/PopupWithImage.js";

import Section from "./modules/Section.js";
import PopupWithForm from "./modules/PopupWithForm.js";

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

export const imagePopup = popups.querySelector("#imagePopup");

const popupImageTitle = imagePopup.querySelector(".popup__title");

const closeImageButton = popups.querySelector("#closeImage");

const popupImage = popups.querySelector(".popup__image");

export const editForm = popups.querySelector("#editForm");

export const addForm = popups.querySelector("#addForm");

const cards = main.querySelector(".cards");

const profile = main.querySelector(".profile");

const editProfileButton = profile.querySelector(".profile__edit");

const addCardButton = profile.querySelector(".profile__add");

const editPopup = popups.querySelector("#editPopup");

const addPopup = popups.querySelector("#addPopup");

export const popupName = popups.querySelector("#inputName");

export const popupDesc = popups.querySelector("#inputDesc");

export const profileTitle = profile.querySelector(".profile__title");

export const profileSubtitle = profile.querySelector(".profile__subtitle");

export const popupTitle = addForm.querySelector("#inputTitle");

export const popupLink = addForm.querySelector("#inputLink");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const EditValidator = new FormValidator(config, editForm);
const AddValidator = new FormValidator(config, addForm);
const CardPreview = new PopupWithImage(imagePopup);
const EditForm = new PopupWithForm(editPopup);
const AddForm = new PopupWithForm(addPopup);

function resetEdit() {
  popupName.value = profileTitle.textContent;
  popupDesc.value = profileSubtitle.textContent;
  EditValidator.toggleButtonState();
  EditValidator.resetValidation();
}

function openEdit() {
  openPopup(editPopup);
  resetEdit();
}

function openAdd() {
  openPopup(addPopup);
  AddValidator.toggleButtonState();
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
  CardSection.addItem(item);
  closePopup(addPopup);
  addForm.reset();
}

editProfileButton.addEventListener("click", () => {
  EditForm.open();
});

addCardButton.addEventListener("click", () => {
  AddForm.open();
});

const CardSection = new Section(
  {
    initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleImageClick: (imageData) => {
            CardPreview.open(imageData);
          },
        },
        "#card"
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  cards
);

CardSection.renderItems(initialCards);

CardPreview.setEventListeners();

//CardSection.addItem(AddForm.item);

EditValidator.enableValidation();

AddValidator.enableValidation();

export {
  EditValidator,
  AddValidator,
  cards,
  popups,
  popupImage,
  popupImageTitle,
  closeImageButton,
};
