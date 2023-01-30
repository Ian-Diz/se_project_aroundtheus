export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const info = { name: this._name, job: this._job };
    return info;
  }

  setUserInfo(data) {
    this._name.textContent = data.first;
    this._job.textContent = data.second;
  }
}
