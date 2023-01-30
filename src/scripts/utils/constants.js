export const initialCards = [
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

export const main = document.querySelector(".main");

export const popups = main.querySelector(".popup");

export const editForm = popups.querySelector("#editForm");

export const addForm = popups.querySelector("#addForm");

export const cards = main.querySelector(".cards");

export const profile = main.querySelector(".profile");

export const editProfileButton = profile.querySelector(".profile__edit");

export const addCardButton = profile.querySelector(".profile__add");

export const editPopup = "#editPopup";

export const addPopup = "#addPopup";

export const popupName = popups.querySelector("#inputName");

export const popupDesc = popups.querySelector("#inputDesc");

export const profileTitle = profile.querySelector(".profile__title");

export const profileSubtitle = profile.querySelector(".profile__subtitle");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
