export default class UserInfo {
  constructor({ nameElem, jobElem, avatar }) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      about: this._jobElem.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElem.textContent = name;
    this._jobElem.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
