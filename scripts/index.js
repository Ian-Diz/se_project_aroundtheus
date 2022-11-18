let object1 = {
  name: "Yosemite Valley",
  link: "../images/like.svg",
};

let object2 = {
  name: "Lake Louise",
  link: "../images/lake-louiselake.svg",
};

let object3 = {
  name: "Bald Mountains",
  link: "../images/bald-mountainsbald.svg",
};

let object4 = {
  name: "Latemar",
  link: "../images/latemarlatemar.svg",
};

let object5 = {
  name: "Vanoise National Park",
  link: "../images/vanoise-national-parkvanoise.svg",
};

let object6 = {
  name: "Lago di Braies",
  link: "../images/lago-di-braieslago.svg",
};

let main = document.querySelector(".main");
let profile = main.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit");
let editProfile = profile.querySelector(".edit-profile");
let closeButton = editProfile.querySelector(".edit-profile__close");
let profileName = profile.querySelector(".edit-profile__name");
let profileDesc = profile.querySelector(".edit-profile__description");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
let saveButton = editProfile.querySelector(".edit-profile__save");
let cards = main.querySelector(".cards");
let initialCards = [object1, object2, object3, object4, object5, object6];

editButton.addEventListener("click", openEdit);

function openEdit() {
  profileName.value = profileTitle.textContent;
  profileDesc.value = profileSubtitle.textContent;
  editProfile.classList.add("edit-profile_opened");
}

closeButton.addEventListener("click", closeEdit);
saveButton.addEventListener("click", saveEdit);

function closeEdit() {
  editProfile.classList.remove("edit-profile_opened");
}

function saveEdit(event) {
  event.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileDesc.value;
  editProfile.classList.remove("edit-profile_opened");
}

function getCardElement(data) {
  let cardElement = cards.querySelector("#card").cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.value = data.name;
}

for (i = 0; i < initialCards.length; ++i) {
  getCardElement(initialCards[i]);
}
