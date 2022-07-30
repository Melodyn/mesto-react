export class Card {
  constructor(placeData, config, handler) {
    this._place = placeData;
    this._config = config;
    this._onClickHandler = handler.onClick;
    this._onRemoveHandler = handler.onRemove;
    this._onLikeHandler = handler.onLike;
    this._template = this._getTemplate();
    this._element = this._createElement();
    this._setListeners();
  }

  _getTemplate() {
    return document
      .querySelector(this._config.selectorTemplate)
      .content
      .firstElementChild;
  }

  _createElement() {
    const {
      name, link, likes, liked, removable,
    } = this._place;
    const config = this._config;
    const element = {
      container: null,
      place: null,
      image: null,
      link: null,
      like: null,
      remove: null,
      likeCount: null,
    };

    element.container = this._template.cloneNode(true);
    element.place = element.container.querySelector(config.selectorPlace);
    element.image = element.place.querySelector(config.getSelectorImage());
    element.link = element.place.querySelector(config.getSelectorLink());
    element.like = element.place.querySelector(config.getSelectorLike());
    element.likeCount = element.place.querySelector(config.getSelectorLikeCount());
    element.remove = element.place.querySelector(config.getSelectorRemove());
    if (!removable) {
      element.remove.remove();
      element.remove = null;
    }

    element.place.setAttribute('aria-label', name);
    element.image.setAttribute('alt', name);
    element.image.setAttribute('src', link);
    element.link.setAttribute('href', link);
    element.link.textContent = name;
    element.likeCount.textContent = likes.length;
    if (liked) {
      element.like.classList.add(config.getClassNameLiked());
    }

    return element;
  }

  _setListeners() {
    this._element.like.addEventListener('click', () => {
      this._handleLike();
    });

    if (this._element.remove !== null) {
      this._element.remove.addEventListener('click', () => {
        const placeDataCopy = { ...this._place };
        this._onRemoveHandler(placeDataCopy, () => this._handleRemove());
      });
    }

    this._element.image.addEventListener('click', () => {
      const placeDataCopy = { ...this._place };
      this._onClickHandler(placeDataCopy);
    });
  }

  _handleLike() {
    const placeDataCopy = { ...this._place };
    this._onLikeHandler(placeDataCopy, (updatedLikes) => {
      this._place.liked = !this._place.liked;
      this._place.likes = updatedLikes;
      const classNameLiked = this._config.getClassNameLiked();
      this._element.like.classList.toggle(classNameLiked);
      this._element.likeCount.textContent = this._place.likes.length;
    });
  }

  _handleRemove() {
    this._element.container.remove();
    this._element = {};
  }

  getElement() {
    return this._element.container;
  }
}
