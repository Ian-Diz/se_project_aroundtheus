export class Api {
  constructor(options) {
    this._options = options;
  }

  _promiseThing(userArray, cardList) {
    return Promise.all(userArray, cardList);
  }

  getInitialCards() {}

  getUserInfo = () => {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "3e3670e4-89e4-4b74-ac18-c98464206840",
        "Content-Type": "application/json",
      },
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

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "3e3670e4-89e4-4b74-ac18-c98464206840",
    "Content-Type": "application/json",
  },
});
