export class UserInfo {
  constructor(elementProfileTitle, elementProfileSubtitle, elementProfileAvatar, elementPageTitle) {
    this._elementProfileTitle = elementProfileTitle;
    this._elementProfileSubtitle = elementProfileSubtitle;
    this._elementProfileAvatar = elementProfileAvatar;
    this._elementPageTitle = elementPageTitle;
  }

  getFullInfo() {
    return {
      title: this._elementProfileTitle.textContent,
      subtitle: this._elementProfileSubtitle.textContent,
      avatar: this._elementProfileAvatar.src,
    };
  }

  setInfo({ title, subtitle }) {
    const preparedTitle = title.trim();
    const preparedSubtitle = subtitle.trim();
    this._elementProfileTitle.textContent = preparedTitle;
    this._elementProfileSubtitle.textContent = preparedSubtitle;
    this._elementPageTitle.textContent = `${preparedTitle}: ${preparedSubtitle}`;
  }

  setAvatar({ avatar }) {
    this._elementProfileAvatar.src = avatar;
  }
}
