export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._class = classSelector;
  }

  addItem(item) {
    this._class.prepend(this._renderer(item));
  }

  renderItems(items) {
    items.forEach((item) => {
      this._class.append(this._renderer(item));
    });
  }
}
