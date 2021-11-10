import store from '../store/index.js';

export default class Component {
  constructor() {
    const self = this;

    if (!self.render) {
      self.render = function () {};
    }

    self.store = store;
    store.events.subscribe('stateChange', () => self.render());
  }
}