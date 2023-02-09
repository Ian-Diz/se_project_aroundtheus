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
  .getData()
  .then((data) => {
    userInfo.setUserInfo(data[0]);
    profileImage.style.backgroundImage = `url(${data[0].avatar})`;
    const userId = data[0]._id;
    const initialCards = data[1];
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
                  confirmationPopup.isLoading();
                  api
                    .deleteCard(cardId)
                    .then(() => {
                      card.removeCard();
                      confirmationPopup.close();
                    })
                    .finally(() => {
                      confirmationPopup.finishLoading();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              },
              handleLikeFunction: (card) => {
                if (card.checkIfLiked()) {
                  api
                    .removeLike(card.getId())
                    .then((data) => {
                      card.removeLike();
                      card.likeNumberCheck(data.likes.length);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  api
                    .addLike(card.getId())
                    .then((data) => {
                      card.addLike();
                      card.likeNumberCheck(data.likes.length);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              },
              onLoadLikeCheck: (data) => {
                data.forEach((obj) => {
                  if (obj._id === userId) {
                    card.addLike();
                  }
                });
              },
            },
            "#card"
          );
          const cardElement = card.generateCard(userId);
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
          cardSection.addItem(data);
          addPopupForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          addPopupForm.finishLoading();
        });
    });

    addPopupForm.setEventListeners();

    addCardButton.addEventListener("click", () => {
      addPopupForm.open(false);
      addValidator.toggleButtonState();
    });

    const editPictureForm = new PopupWithForm(
      profilePicturePopup,
      (inputVal) => {
        editPictureForm.isLoading();
        api
          .updatePfp(inputVal.avatar)
          .then(() => {
            api
              .getUserInfo()
              .then((data) => {
                profileImage.style.backgroundImage = `url(${data.avatar})`;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            editPictureForm.close();
          })
          .finally(() => {
            editPictureForm.finishLoading();
          });
      }
    );

    editPictureForm.setEventListeners();

    editPictureButton.addEventListener("click", () => {
      editPictureForm.open(false);
      profilePictureValidator.toggleButtonState();
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
    .setUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      editPopupForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopupForm.finishLoading();
    });
});

editPopupForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editPopupForm.open(true);
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupDesc.value = data.about;
  editValidator.toggleButtonState();
  editValidator.resetValidation();
});

editPictureButton.addEventListener("mouseover", () => {
  profilePictureEditButton.classList.add("profile__picture_active");
});

editPictureButton.addEventListener("mouseout", () => {
  profilePictureEditButton.classList.remove("profile__picture_active");
});

cardPreview.setEventListeners();

editValidator.enableValidation();

addValidator.enableValidation();

profilePictureValidator.enableValidation();
