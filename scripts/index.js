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

const editProfile = main.querySelector(".edit-profile");

const closeButton = editProfile.querySelector(".edit-profile__close");

const form = editProfile.querySelector(".edit-profile__form");

let profileName = editProfile.querySelector(".edit-profile_input_name");

let profileDesc = editProfile.querySelector(".edit-profile_input_description");

let profileTitle = profile.querySelector(".profile__title");

let profileSubtitle = profile.querySelector(".profile__subtitle");

const saveButton = editProfile.querySelector(".edit-profile__save");

const cards = main.querySelector(".cards");

let card = cards.querySelectorAll(".card");

function openEdit() {
  profileName.value = profileTitle.textContent;
  profileDesc.value = profileSubtitle.textContent;
  editProfile.classList.add("edit-profile_opened");
}

function closeEdit() {
  editProfile.classList.remove("edit-profile_opened");
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
