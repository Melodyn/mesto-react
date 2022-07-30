export class Section {
  constructor({ items, renderer }, elementContainer) {
    this._items = items;
    this._renderer = renderer;
    this._elementContainer = elementContainer;
  }

  clear() {
    this._elementContainer.innerHTML = '';
  }

  render() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._elementContainer.prepend(element);
  }
}
