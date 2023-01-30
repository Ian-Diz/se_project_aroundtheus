import { FormValidator } from "../utils/FormValidator.js";

import { Card } from "../components/Card.js";

import "../../pages/index.css";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import Section from "../components/Section.js";

import UserInfo from "../utils/UserInfo.js";

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
} from "../utils/constants";

const EditValidator = new FormValidator(config, editForm);
const AddValidator = new FormValidator(config, addForm);
const CardPreview = new PopupWithImage("#imagePopup");
const User = new UserInfo({
  name: profileTitle,
  job: profileSubtitle,
});

const EditForm = new PopupWithForm(editPopup, (inputValues) => {
  User.setUserInfo(inputValues);
});

const AddForm = new PopupWithForm(addPopup, (inputValues) => {
  const data = { name: inputValues.first, link: inputValues.second };
  CardSection.addItem(data);
});

editProfileButton.addEventListener("click", () => {
  EditForm.open(() => {
    popupName.value = profileTitle.textContent;
    popupDesc.value = profileSubtitle.textContent;
    EditValidator.toggleButtonState();
    EditValidator.resetValidation();
  });
});

addCardButton.addEventListener("click", () => {
  AddForm.open(() => {
    AddValidator.toggleButtonState();
  });
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

EditValidator.enableValidation();

AddValidator.enableValidation();
