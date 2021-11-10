export default class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].map(callback => callback(data));
    }
  }
}
