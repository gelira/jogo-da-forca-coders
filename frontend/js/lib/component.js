import Store from '../store/store.js';

export default class Component {
  constructor(props = {}) {
    const self = this;

    if (!self.render) {
      self.render = function () {};
    }

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }

    if (props.hasOwnProperty('element')) {
      self.element = props.element;
    }
  }
}