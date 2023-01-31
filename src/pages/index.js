import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import "./index.css";

import PopupWithImage from "../scripts/components/PopupWithImage";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import Section from "../scripts/components/Section.js";

import UserInfo from "../scripts/components/UserInfo.js";

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
const user = new UserInfo({
  name: profileTitle,
  job: profileSubtitle,
});

const editPopupForm = new PopupWithForm(editPopup, (inputValues) => {
  console.log(inputValues);
  user.setUserInfo(inputValues);
});

editPopupForm.setEventListeners();

const addPopupForm = new PopupWithForm(addPopup, (inputValues) => {
  const data = { name: inputValues.title, link: inputValues.imageLink };
  CardSection.addItem(data);
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

const CardSection = new Section(
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

CardSection.renderItems(initialCards);

cardPreview.setEventListeners();

editValidator.enableValidation();

addValidator.enableValidation();
