import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import "./index.css";

import PopupWithImage from "../scripts/components/PopupWithImage";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import Section from "../scripts/components/Section.js";

import UserInfo from "../scripts/components/UserInfo.js";

import Api from "../scripts/components/Api.js";

import {
  initialCards,
  editForm,
  addForm,
  cards,
  editProfileButton,
  addCardButton,
  editPopup,
  addPopup,
  popupName,
  popupDesc,
  profileTitle,
  profileSubtitle,
  config,
} from "../scripts/utils/constants";

const editValidator = new FormValidator(config, editForm);

const addValidator = new FormValidator(config, addForm);

const cardPreview = new PopupWithImage("#imagePopup");

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "3e3670e4-89e4-4b74-ac18-c98464206840",
    "Content-Type": "application/json",
  },
});

api.getUserInfo();

const user = new UserInfo({
  name: api.getUserInfo.name,
  job: api.getUserInfo.about,
});

/*const user = new UserInfo({
  name: profileTitle,
  job: profileSubtitle,
});*/

const editPopupForm = new PopupWithForm(editPopup, (inputValues) => {
  console.log(inputValues);
  user.setUserInfo(inputValues);
});

editPopupForm.setEventListeners();

const addPopupForm = new PopupWithForm(addPopup, (inputValues) => {
  const data = { name: inputValues.title, link: inputValues.imageLink };
  cardSection.addItem(data);
});

addPopupForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editPopupForm.open();
  const info = user.getUserInfo();
  popupName.value = info.name;
  popupDesc.value = info.job;
  editValidator.toggleButtonState();
  editValidator.resetValidation();
});

addCardButton.addEventListener("click", () => {
  addPopupForm.open();
  addValidator.toggleButtonState();
});

const cardSection = new Section(
  {
    initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleImageClick: (imageData) => {
            cardPreview.open(imageData);
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

cardSection.renderItems(initialCards);

cardPreview.setEventListeners();

editValidator.enableValidation();

addValidator.enableValidation();
