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
  profilePicturePopup,
  editPictureButton,
  profilePictureForm,
  profileImage,
  profilePictureEditButton,
} from "../scripts/utils/constants";

const editValidator = new FormValidator(config, editForm);

const addValidator = new FormValidator(config, addForm);

const profilePictureValidator = new FormValidator(config, profilePictureForm);

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
    profileImage.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

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
                confirmationPopup.setSubmitAction(() => {
                  api.deleteCard(cardId).then(() => {
                    card.removeCard();
                  });
                });
              },
              handleLikeFunction: (cardId, likeButton) => {
                if (likeButton.classList.contains("card_like_activate")) {
                  api
                    .removeLike(cardId)
                    .then(() => {
                      likeButton.classList.remove("card_like_activate");
                      card.likeNumberCheck(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  api
                    .addLike(cardId)
                    .then(() => {
                      likeButton.classList.add("card_like_activate");
                      card.likeNumberCheck(true);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              },
              onLoadLikeCheck: (data, likeButton) => {
                data.forEach((obj) => {
                  if (obj._id === "5b91ece1271e0a8558fbe8e0") {
                    likeButton.classList.add("card_like_activate");
                  }
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

    const addPopupForm = new PopupWithForm(addPopup, (inputValues) => {
      addPopupForm.isLoading();
      api
        .addNewCard(inputValues)
        .then((data) => {
          console.log(data);
          cardSection.addItem(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          addPopupForm.finishLoading();
          addPopupForm.close();
        });
    });

    addPopupForm.setEventListeners();

    addCardButton.addEventListener("click", () => {
      addPopupForm.open(false);
      addValidator.toggleButtonState();
    });

    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const confirmationPopup = new PopupWithConfirmation(certaintyPopup);

confirmationPopup.setEventListeners();

const editPopupForm = new PopupWithForm(editPopup, (inputValues) => {
  editPopupForm.isLoading();
  api
    .getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.setUserInfo(inputValues);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopupForm.finishLoading();
      editPopupForm.close();
    });
  api.setUserInfo(inputValues);
});

editPopupForm.setEventListeners();

const editPictureForm = new PopupWithForm(profilePicturePopup, (avatar) => {
  editPictureForm.isLoading();
  api
    .updatePfp(avatar.avatar)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatar.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPictureForm.finishLoading();
      editPictureForm.close();
    });
});

editPictureForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editPopupForm.open(true);
  api.getUserInfo().then((data) => {
    popupName.value = data.name;
    popupDesc.value = data.about;
    editValidator.toggleButtonState();
    editValidator.resetValidation();
  });
});

editPictureButton.addEventListener("mouseover", () => {
  profilePictureEditButton.classList.add("profile__picture_active");
});

editPictureButton.addEventListener("mouseout", () => {
  profilePictureEditButton.classList.remove("profile__picture_active");
});

editPictureButton.addEventListener("click", () => {
  editPictureForm.open(false);
  profilePictureValidator.toggleButtonState();
});

cardPreview.setEventListeners();

editValidator.enableValidation();

addValidator.enableValidation();

profilePictureValidator.enableValidation();
