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

export const certaintyPopup = "#certaintyPopup";

export const confirmButton = popups.querySelector(".popup__confirm");

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
