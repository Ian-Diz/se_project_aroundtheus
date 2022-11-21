const initialCards = [
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

const editButton = profile.querySelector(".profile__edit");

const popup = main.querySelector(".popup");

const closeButton = popup.querySelector(".popup__close");

const form = popup.querySelector(".popup__form");

const profileName = popup.querySelector(".popup_input_name");

const profileDesc = popup.querySelector(".popup_input_description");

const profileTitle = profile.querySelector(".profile__title");

const profileSubtitle = profile.querySelector(".profile__subtitle");

const saveButton = popup.querySelector(".popup__save");

const cards = main.querySelector(".cards");

const card = cards.querySelectorAll(".card");

function openEdit() {
  profileName.value = profileTitle.textContent;
  profileDesc.value = profileSubtitle.textContent;
  popup.classList.add("popup_opened");
}

function closeEdit() {
  popup.classList.remove("popup_opened");
}

function saveEdit(event) {
  event.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileDesc.value;
  closeEdit();
}

closeButton.addEventListener("click", closeEdit);
form.addEventListener("submit", saveEdit);
editButton.addEventListener("click", openEdit);

function getCardElement(data) {
  let cardElement = cards.querySelector("#card").content.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

for (i = 0; i < initialCards.length; ++i) {
  let insertCard = getCardElement(initialCards[i]);
  cards.prepend(insertCard);
}
