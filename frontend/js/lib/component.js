import store from '../store/index.js';

export default class Component {
  constructor() {
    this.store = store;
    this.subscribe();
  }
  
  subscribe() {
    this.store.events.subscribe('stateChange', () => this.render());
  }

  render() {}
}