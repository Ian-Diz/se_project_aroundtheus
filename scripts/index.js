let initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valleyyosemite.svg",
  },

  {
    name: "Lake Louise",
    link: "./images/lake-louiselake.svg",
  },

  {
    name: "Bald Mountains",
    link: "./images/bald-mountainsbald.svg",
  },
  {
    name: "Latemar",
    link: "./images/latemarlatemar.svg",
  },

  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-parkvanoise.svg",
  },

  {
    name: "Lago di Braies",
    link: "./images/lago-di-braieslago.svg",
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

const profileName = popup.querySelector(".popup_input_name");

const profileDesc = popup.querySelector(".popup_input_description");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const popupHeader = popup.querySelector(".popup__header");

const popupTitle = popup.querySelector(".popup__title");

const popupImage = popup.querySelector(".popup__image");

const formEdit = form.querySelector("#save");

const formAdd = form.querySelector("#add");

const saveButton = popup.querySelector(".popup__save");

function openEdit() {
  profileName.value = profileTitle.textContent;
  profileDesc.value = profileSubtitle.textContent;
  popupHeader.textContent = "Edit Profile";
  profileName.setAttribute("placeholder", "Name");
  profileDesc.setAttribute("placeholder", "Description");
  form.setAttribute("id", "save");
  popup.classList.add("popup_opened");
}

function openAdd() {
  profileName.value = "";
  profileDesc.value = "";
  popupHeader.textContent = "New place";
  profileName.setAttribute("placeholder", "Title");
  profileDesc.setAttribute("placeholder", "Image link");
  form.setAttribute("id", "add");
  popup.classList.add("popup_opened");
}

function closeEdit() {
  popup.classList.remove("popup_opened");
  popupImage.classList.remove("popup_image_opened");
  form.classList.remove("popup_form_hidden");
  popupTitle.classList.remove("popup_title_opened");
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
    popup.head;
    popup.classList.add("popup_opened");
    popupImage.classList.add("popup_image_opened");
    form.classList.add("popup_form_hidden");
    popupTitle.classList.add("popup_title_opened");
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
  let insertCard = getCardElement(item);
  cards.append(insertCard);
});
