import { FormValidator } from "../scripts/components/FormValidator.js";

import { Card } from "../scripts/components/Card.js";

import "./index.css";

import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

import PopupWithImage from "../scripts/components/PopupWithImage";

import PopupWithForm from "../scripts/components/PopupWithForm.js";

import Section from "../scripts/components/Section.js";

import UserInfo from "../scripts/components/UserInfo.js";

import Api from "../scripts/components/Api.js";

import {
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
  certaintyPopup,
  confirmButton,
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

const userInfo = new UserInfo({
  nameElem: profileTitle,
  jobElem: profileSubtitle,
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

const confirmationPopup = new PopupWithConfirmation(certaintyPopup, () => {
  api.deleteCard(confirmButton.id);
});

confirmationPopup.setEventListeners();

const editPopupForm = new PopupWithForm(editPopup, (inputValues) => {
  api
    .getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.setUserInfo(inputValues);
    })
    .catch((err) => {
      console.log(err);
    });
  api.setUserInfo(inputValues);
});

editPopupForm.setEventListeners();

api
  .getInitialCards()
  .then((initialCards) => {
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
              confirmationFunction: (cardId) => {
                confirmationPopup.open();
                confirmButton.id = cardId;
              },
              handleLikeFunction: (cardId, likeButton) => {
                if (likeButton.classList.contains("card_like_activate")) {
                  api.removeLike(cardId).catch((err) => {
                    console.log(err);
                  });
                  likeButton.classList.remove("card_like_activate");
                } else {
                  api.addLike(cardId).catch((err) => {
                    console.log(err);
                  });
                  likeButton.classList.add("card_like_activate");
                }
                api
                  .getLikeAmount(cardId)
                  .then(() => {
                    cardId;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
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
  })
  .catch((err) => {
    console.log(err);
  });

const addPopupForm = new PopupWithForm(addPopup, (inputValues) => {
  api.addNewCard(inputValues);
});

addPopupForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editPopupForm.open(true);
  api.getUserInfo().then((data) => {
    popupName.value = data.name;
    popupDesc.value = data.about;
    editValidator.toggleButtonState();
    editValidator.resetValidation();
  });
});

addCardButton.addEventListener("click", () => {
  addPopupForm.open(false);
  addValidator.toggleButtonState();
});

cardPreview.setEventListeners();

editValidator.enableValidation();

addValidator.enableValidation();
