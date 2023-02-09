export default class UserInfo {
  constructor({ nameElem, jobElem }) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      about: this._jobElem.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElem.textContent = name;
    this._jobElem.textContent = about;
  }
}
