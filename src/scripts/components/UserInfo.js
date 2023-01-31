export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const info = { name: this._name.textContent, job: this._job.textContent };
    return info;
  }

  setUserInfo(data) {
    this._name.textContent = data.nameInput;
    this._job.textContent = data.descriptionInput;
  }
}
