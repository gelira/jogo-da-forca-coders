import { ACTIONS, MUTATIONS } from './types.js';

export default {
  [ACTIONS.FETCH_PALAVRA] (context) {
    fetch('http://localhost:3000/palavra')
      .then(response => response.json())
      .then(data => context.commit(MUTATIONS.SET_PALAVRA, data));
  }
};
