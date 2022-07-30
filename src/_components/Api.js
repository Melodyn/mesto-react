import { httpMethod } from '../utils/constants.js';

export class Api {
  constructor(config) {
    const {
      apiMestoBaseURL,
      apiMestoCohort,
      apiMestoToken,
    } = config;
    const baseHeaders = {
      Authorization: apiMestoToken,
      'Content-Type': 'application/json; charset=utf-8',
    };

    this._fetch = (page, method = httpMethod.get, body = undefined) => fetch(
      `${apiMestoBaseURL}/${apiMestoCohort}/${page}`,
      {
        method,
        headers: baseHeaders,
        body: (body && JSON.stringify(body)),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res
          .json()
          .then(({ message }) => {
            res.message = message || `Ошибка ${res.status}`;
            return Promise.reject(res);
          });
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
        return Promise.reject(new Error(`ApiMesto Error: ${err.message}`));
      });
  }

  /* profile */
  getProfile() {
    return this._fetch('users/me');
  }

  getPlaces() {
    return this._fetch('cards');
  }

  setAvatar({ avatar }) {
    return this._fetch('users/me/avatar', httpMethod.patch, { avatar });
  }

  setInfo({ name, about }) {
    return this._fetch('users/me', httpMethod.patch, { name, about });
  }

  /* place */
  createPlace({ name, link }) {
    return this._fetch('cards', httpMethod.post, { name, link });
  }

  removePlace({ cardId }) {
    return this._fetch(`cards/${cardId}`, httpMethod.delete);
  }

  likePlace({ cardId, liked }) {
    if (liked) {
      return this.removeLikePlace({ cardId });
    }
    return this.addLikePlace({ cardId });
  }

  addLikePlace({ cardId }) {
    return this._fetch(`cards/like/${cardId}`, httpMethod.put);
  }

  removeLikePlace({ cardId }) {
    return this._fetch(`cards/like/${cardId}`, httpMethod.delete);
  }
}
