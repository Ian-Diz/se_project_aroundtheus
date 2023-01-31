export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
}
