import { urls } from "./constants";
import { createPromise } from "./utils";

class Api {
  constructor(
    { baseUrl, baseHeaders },
    {
      cardsUrl,
      authorUrl,
      authorAvatarUrl,
      cardUrl,
      likeUrl,
      registerUrl,
      loginUrl,
      userUrl,
    },
    promiseGenerator
  ) {
    this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;
    this._cardsUrl = cardsUrl;
    this._authorUrl = authorUrl;
    this._authorAvatarUrl = authorAvatarUrl;
    this._cardUrl = cardUrl;
    this._likeUrl = likeUrl;
    this._registerUrl = registerUrl;
    this._loginUrl = loginUrl;
    this._userUrl = userUrl;
    this._promiseGenerator = promiseGenerator;
  }

  getInitialCards(token) {
    return this._promiseGenerator(this._baseUrl + this._cardsUrl, {
      ...this._baseHeaders,
      authorization: token,
    });
  }

  getAuthor(token) {
    return this._promiseGenerator(this._baseUrl + this._authorUrl, {
      ...this._baseHeaders,
      authorization: token,
    });
  }

  patchAuthor(name, description, token) {
    return this._promiseGenerator(
      this._baseUrl + this._authorUrl,
      { ...this._baseHeaders, authorization: token },
      "PATCH",
      { name: name, about: description }
    );
  }

  postCard(link, name, token) {
    return this._promiseGenerator(
      this._baseUrl + this._cardsUrl,
      { ...this._baseHeaders, authorization: token },
      "POST",
      { name: name, link: link }
    );
  }

  deleteCard(cardId, token) {
    return this._promiseGenerator(
      this._baseUrl + this._cardUrl.template.replace(this._cardUrl.key, cardId),
      { ...this._baseHeaders, authorization: token },
      "DELETE"
    ).then(() => cardId);
  }

  putLike(cardId, token) {
    return this._promiseGenerator(
      this._baseUrl + this._likeUrl.template.replace(this._likeUrl.key, cardId),
      { ...this._baseHeaders, authorization: token },
      "PUT"
    );
  }

  deleteLike(cardId, token) {
    return this._promiseGenerator(
      this._baseUrl + this._likeUrl.template.replace(this._likeUrl.key, cardId),
      { ...this._baseHeaders, authorization: token },
      "DELETE"
    );
  }

  patchAvatar(url, token) {
    return this._promiseGenerator(
      this._baseUrl + this._authorAvatarUrl,
      { ...this._baseHeaders, authorization: token },
      "PATCH",
      { avatar: url }
    );
  }

  register(email, password) {
    return this._promiseGenerator(
      this._baseUrl + this._registerUrl,
      this._baseHeaders,
      "POST",
      {
        email: email,
        password: password,
      }
    );
  }

  login(email, password) {
    return this._promiseGenerator(
      this._baseUrl + this._loginUrl,
      this._baseHeaders,
      "POST",
      {
        email: email,
        password: password,
      }
    );
  }

  getAuthUser(token) {
    return this._promiseGenerator(this._baseUrl + this._userUrl, {
      ...this._baseHeaders,
      authorization: token,
    });
  }
}

export const api = new Api(
  {
    baseUrl: `${urls.baseUrl}/`,
    baseHeaders: {
      "Content-Type": "application/json",
    },
  },
  urls,
  createPromise
);
