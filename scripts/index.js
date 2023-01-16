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

const profile = main.querySelector(".profile");

const editProfileButton = profile.querySelector(".profile__edit");

const addCardButton = profile.querySelector(".profile__add");

const popups = main.querySelector(".popup");

const popupContainer = main.querySelector(".popup__container");

const editPopup = popups.querySelector("#editPopup");

const addPopup = popups.querySelector("#addPopup");

const imagePopup = popups.querySelector("#imagePopup");

const closeEditProfileButton = popups.querySelector("#closeEdit");

const closeAddCardButton = popups.querySelector("#closeAdd");

const closeImageButton = popups.querySelector("#closeImage");

const editForm = popups.querySelector("#editForm");

const addForm = popups.querySelector("#addForm");

const popupName = popups.querySelector("#inputName");

const popupDesc = popups.querySelector("#inputDesc");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupTitle = addForm.querySelector("#inputTitle");

const popupLink = addForm.querySelector("#inputLink");

const popupImageTitle = imagePopup.querySelector(".popup__title");

const popupImage = imagePopup.querySelector(".popup__image");

const addSaveButton = popups.querySelector("#addSave");

const editSaveButton = popups.querySelector("#editSave");

const cards = main.querySelector(".cards");

const card = cards.querySelectorAll(".card");

const addPopupInputList = Array.from(addForm.querySelectorAll(".popup__input"));

const editPopupInputList = Array.from(
  editForm.querySelectorAll(".popup__input")
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", clickClosePopup);
  document.addEventListener("keydown", escapeClosePopup);
}

function closePopup() {
  const activePopup = popups.querySelector(".popup_opened");
  activePopup.classList.remove("popup_opened");
  activePopup.removeEventListener("mousedown", clickClosePopup);
  document.addEventListener("keydown", escapeClosePopup);
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
  toggleButtonState(editPopupInputList, editSaveButton, config);
}

function openEdit() {
  openPopup(editPopup);
  resetEdit();
}

function openAdd() {
  openPopup(addPopup);
}

function saveEdit(event) {
  event.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupDesc.value;
  closePopup(editPopup);
}

function saveAdd(event) {
  event.preventDefault();
  const newCard = {
    name: popupTitle.value,
    link: popupLink.value,
  };
  cards.prepend(getCardElement(newCard));
  closePopup(addPopup);
  addForm.reset();
  toggleButtonState(addPopupInputList, addSaveButton, config);
}

editForm.addEventListener("submit", saveEdit);

addForm.addEventListener("submit", saveAdd);

editProfileButton.addEventListener("click", openEdit);

addCardButton.addEventListener("click", openAdd);

closeEditProfileButton.addEventListener("click", closePopup);

closeAddCardButton.addEventListener("click", closePopup);

closeImageButton.addEventListener("click", closePopup);

function getCardElement(data) {
  const cardElement = cards.querySelector("#card").content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const card = cardElement.querySelector(".card");

  const deleteButton = cardElement.querySelector(".card__trash");

  const likeButton = cardElement.querySelector(".card__like");

  function deleteActivate() {
    card.remove();
  }

  function likeActivate() {
    likeButton.classList.toggle("card_like_activate");
  }

  function openImage() {
    openPopup(imagePopup);
    closeImageButton.classList.add("popup_close_mobile");
    popupImageTitle.textContent = cardTitle.textContent;
    popupImage.src = data.link;
    popupImage.alt = `An image of ${data.name}.`;
  }

  cardImage.addEventListener("click", openImage);
  likeButton.addEventListener("click", likeActivate);
  deleteButton.addEventListener("click", deleteActivate);

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cards.append(cardElement);
});
