import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './store.js';
import { ACTIONS, MUTATIONS } from './types.js';

export { ACTIONS, MUTATIONS };

export default new Store({
  actions,
  mutations,
  state
});
