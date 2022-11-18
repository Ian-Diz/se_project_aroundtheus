let object1 = {
  name: "Yosemite Valley",
  link: "./images/yosemite-valleyyosemite.svg",
};

let object2 = {
  name: "Lake Louise",
  link: "./images/lake-louiselake.svg",
};

let object3 = {
  name: "Bald Mountains",
  link: "./images/bald-mountainsbald.svg",
};

let object4 = {
  name: "Latemar",
  link: "./images/latemarlatemar.svg",
};

let object5 = {
  name: "Vanoise National Park",
  link: "./images/vanoise-national-parkvanoise.svg",
};

let object6 = {
  name: "Lago di Braies",
  link: "./images/lago-di-braieslago.svg",
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

let card = cards.querySelectorAll(".card");

let initialCards = [object1, object2, object3, object4, object5, object6];

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
  editProfile.classList.remove("edit-profile_opened");
}

closeButton.addEventListener("click", closeEdit);
saveButton.addEventListener("click", saveEdit);
editButton.addEventListener("click", openEdit);

function getCardElement(data) {
  let cardElement = cards.querySelector("#card").content.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.value = data.name;
}

for (i = 0; i < initialCards.length; ++i) {
  getCardElement(initialCards[i]);
  cards.insertAdjacentHTML(
    "beforeend",
    `
    <article class="card">
      <img
        class="card__image"
        alt="${initialCards[i].name}"
        src="${initialCards[i].link}"
      />
      <h2 class="card__title">${initialCards[i].name}</h2>
      <button class="card__like" aria-label="Like" type="Button">
        <img
         alt="A heart-shaped like button to show your appreciation"
          src="./images/like.svg"
        />
       </button>
  </article>
  `
  );
}
