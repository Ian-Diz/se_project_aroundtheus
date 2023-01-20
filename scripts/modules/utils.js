import { editValidator, addValidator, cards } from "../index.js";

import { Card } from "./Card.js";

const main = document.querySelector(".main");

const profile = main.querySelector(".profile");

const popups = main.querySelector(".popup");

const editProfileButton = profile.querySelector(".profile__edit");

const addCardButton = profile.querySelector(".profile__add");

const editPopup = popups.querySelector("#editPopup");

const addPopup = popups.querySelector("#addPopup");

const closeEditProfileButton = popups.querySelector("#closeEdit");

const closeAddCardButton = popups.querySelector("#closeAdd");

const closeImageButton = popups.querySelector("#closeImage");

const popupName = popups.querySelector("#inputName");

const popupDesc = popups.querySelector("#inputDesc");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupTitle = addForm.querySelector("#inputTitle");

const popupLink = addForm.querySelector("#inputLink");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", clickClosePopup);
  document.addEventListener("keydown", escapeClosePopup);
}

function closePopup() {
  const activePopup = popups.querySelector(".popup_opened");
  activePopup.classList.remove("popup_opened");
  activePopup.removeEventListener("mousedown", clickClosePopup);
  document.removeEventListener("keydown", escapeClosePopup);
}

function clickClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function escapeClosePopup(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

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
  const card = new Card(item, "#card");
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
  closePopup(addPopup);
  addForm.reset();
}

editForm.addEventListener("submit", saveEdit);

addForm.addEventListener("submit", saveAdd);

editProfileButton.addEventListener("click", openEdit);

addCardButton.addEventListener("click", openAdd);

closeEditProfileButton.addEventListener("click", closePopup);

closeAddCardButton.addEventListener("click", closePopup);

closeImageButton.addEventListener("click", closePopup);

export { openPopup, closePopup };
