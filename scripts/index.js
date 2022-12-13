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

const cards = main.querySelector(".cards");

const card = cards.querySelector("#card");

const editButton = profile.querySelector(".profile__edit");

const addButton = profile.querySelector(".profile__add");

const popup = main.querySelector(".popup");

const popupContainer = popup.querySelector(".popup__container");

const closeButton = popup.querySelector(".popup__close");

const form = popup.querySelector(".popup__form");

const profileName = popup.querySelector("input[name='nameInput'");

const profileDesc = popup.querySelector("input[name='descriptionInput'");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupHeader = popup.querySelector(".popup__header");

const popupTitle = popup.querySelector(".popup__title");

const popupImage = popup.querySelector(".popup__image");

const formEdit = form.querySelector("#save");

const formAdd = form.querySelector("#add");

const saveButton = popup.querySelector(".popup__save");

function openEdit() {
  form.classList.remove("popup_form_hidden");
  popupImage.classList.remove("popup_image_opened");
  popupTitle.classList.remove("popup_title_opened");
  profileName.value = profileTitle.textContent;
  profileDesc.value = profileSubtitle.textContent;
  popupHeader.textContent = "Edit Profile";
  profileName.setAttribute("placeholder", "Name");
  profileDesc.setAttribute("placeholder", "Description");
  form.setAttribute("id", "save");
  popup.classList.add("popup_opened");
}

function openAdd() {
  openEdit();
  profileName.value = "";
  profileDesc.value = "";
  popupHeader.textContent = "New place";
  profileName.setAttribute("placeholder", "Title");
  profileDesc.setAttribute("placeholder", "Image link");
  form.setAttribute("id", "add");
}

function closeEdit() {
  popup.classList.remove("popup_opened");
  closeButton.classList.remove("popup_close_mobile");
}

function save(event) {
  event.preventDefault();
  if (form.id === "save") {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileDesc.value;
  }
  if (form.id === "add") {
    let index = initialCards.push({
      name: profileName.value,
      link: profileDesc.value,
    });
    cards.prepend(getCardElement(initialCards[index - 1]));
  }
  closeEdit();
}

form.addEventListener("submit", save);
closeButton.addEventListener("click", closeEdit);
editButton.addEventListener("click", openEdit);
addButton.addEventListener("click", openAdd);

function getCardElement(data) {
  let cardElement = cards.querySelector("#card").content.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  let card = cardElement.querySelector(".card");
  let likeButton = cardElement.querySelector(".card__like");
  let likeImage = cardElement.querySelector("#likeImage");

  function likeActivate() {
    if (likeImage.src.includes("/images/like.svg")) {
      likeImage.setAttribute("src", "./images/activatedLike.svg");
      console.log(likeImage.src);
    } else {
      likeImage.setAttribute("src", "./images/like.svg");
      console.log(likeImage.src);
    }
  }

  let deleteButton = cardElement.querySelector(".card__trash");

  function deleteActivate() {
    card.remove();
  }

  function openImage() {
    popup.classList.add("popup_opened");
    popupImage.classList.add("popup_image_opened");
    form.classList.add("popup_form_hidden");
    popupTitle.classList.add("popup_title_opened");
    closeButton.classList.add("popup_close_mobile");
    popupTitle.textContent = cardTitle.textContent;
    popupImage.src = data.link;
  }

  deleteButton.addEventListener("click", deleteActivate);
  likeButton.addEventListener("click", likeActivate);
  cardImage.addEventListener("click", openImage);
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach(function (item) {
  let cardElement = getCardElement(item);
  cards.append(cardElement);
});
