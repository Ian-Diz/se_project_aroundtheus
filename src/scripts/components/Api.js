export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _promiseThing(userArray, cardList) {
    return Promise.all(userArray, cardList);
  }

  getInitialCards() {}

  getUserInfo = () => {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        console.log(res.ok);
        //console.log(res.json());
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setUserInfo() {}
}
