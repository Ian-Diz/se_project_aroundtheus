export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
  }

  addItem(item) {
    this._classSelector.prepend(this._renderer(item));
  }

  renderItems(items) {
    items.forEach((item) => {
      this._classSelector.append(this._renderer(item));
    });
  }
}
