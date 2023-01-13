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

const editButton = profile.querySelector(".profile__edit");

const addButton = profile.querySelector(".profile__add");

const popups = main.querySelector(".popup");

const popupOpened = popups.querySelector(".popup_opened");

const popupContainer = main.querySelector(".popup__container");

const editPopup = popups.querySelector("#editPopup");

const addPopup = popups.querySelector("#addPopup");

const imagePopup = popups.querySelector("#imagePopup");

const closeEditButton = popups.querySelector("#closeEdit");

const closeAddButton = popups.querySelector("#closeAdd");

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

const saveButton = popups.querySelector(".popup__save");

const cards = main.querySelector(".cards");

const card = cards.querySelectorAll(".card");

//const popupContainers = popups.querySelectorAll(".popup_container");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  enableValidation();
}

function closePopup() {
  const activePopup = popups.querySelector(".popup_opened");
  activePopup.classList.remove("popup_opened");
}

function openEdit() {
  openPopup(editPopup);
  popupName.value = profileTitle.textContent;
  popupDesc.value = profileSubtitle.textContent;
  editPopup.addEventListener("click", function (evt) {
    if (!evt.target.closest(".popup__form")) {
      closePopup();
    }
  });
}

function openAdd() {
  openPopup(addPopup);
  addPopup.addEventListener("click", function (evt) {
    if (!evt.target.closest(".popup__form")) {
      closePopup();
    }
  });
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
}

editForm.addEventListener("submit", saveEdit);

addForm.addEventListener("submit", saveAdd);

editButton.addEventListener("click", openEdit);

addButton.addEventListener("click", openAdd);

closeEditButton.addEventListener("click", closePopup);

closeAddButton.addEventListener("click", closePopup);

closeImageButton.addEventListener("click", closePopup);

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
});

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
    imagePopup.addEventListener("click", function (evt) {
      if (!evt.target.closest(".popup__photo")) {
        closePopup();
      }
    });
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
