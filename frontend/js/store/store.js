import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(params) {
    const self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy((params.state || {}), {
      set: function (state, key, value) {
        state[key] = value;
        self.events.publish('stateChange', state);

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    const self = this;

    const func = self.actions[actionKey];
    if (typeof func !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    return func(self, payload);
    //return true;
  }

  commit(mutationKey, payload) {
    const self = this;

    const func = self.mutations[mutationKey];
    if (typeof func !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    func(self.state, payload);

    return true;
  }
}
