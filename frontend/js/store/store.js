import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value;

        localStorage.setItem('progresso', JSON.stringify(state));

        if (key === 'tempo') {
          this.events.publish('tempoChange', state);
        }
        else {
          this.events.publish('stateChange', state);
        }
        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    const func = this.actions[actionKey];
    if (typeof func !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    return func(this, payload);
  }

  commit(mutationKey, payload) {
    const func = this.mutations[mutationKey];
    if (typeof func !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    return func(this.state, payload);
  }
}
