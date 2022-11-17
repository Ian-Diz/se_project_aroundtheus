let main = document.querySelector(".main");
let profile = main.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit");
let editProfile = profile.querySelector(".edit-profile");
let closeButton = editProfile.querySelector(".edit-profile__close");

editButton.addEventListener("click", openEdit);

function openEdit() {
  editProfile.classList.add("edit-profile_opened");
}

closeButton.addEventListener("click", closeEdit);

function closeEdit() {
  editProfile.classList.remove("edit-profile_opened");
}

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

let initialCards = [object1, object2, object3, object4, object5, object6];
