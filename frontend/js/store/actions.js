import { ACTIONS, MUTATIONS } from './types.js';

easync [ACTIONS.FETCH_PALAVRA] (context) {

  let result = await fetch('http://localhost:3000/palavra');

  let data = await result.json();

  //fetch('http://localhost:3000/palavra')
   // .then(response => response.json())
   // .then(data => context.commit(MUTATIONS.SET_PALAVRA, data));

   context.commit(MUTATIONS.SET_PALAVRA, data);

},

  [ACTIONS.TENTATIVA] (context, payload) {
    const { letra } = payload;
    const { palavra_masked } = context.state;

    for (let i = 0; i < palavra_masked.length; i ++) {
      const item = palavra_masked[i];
      if (item.letra_cleaned === letra) {
        context.commit(MUTATIONS.ACERTO_TENTATIVA, { letra });
        return;
      }
    }

    context.commit(MUTATIONS.ERRO_TENTATIVA);
  },
};
