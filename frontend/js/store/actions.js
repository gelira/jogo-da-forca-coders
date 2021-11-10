import { ACTIONS, MUTATIONS } from './types.js';

export default {
  [ACTIONS.FETCH_PALAVRA] (context) {
    fetch('http://localhost:3000/palavra')
      .then(response => response.json())
      .then(data => context.commit(MUTATIONS.SET_PALAVRA, data));
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

  [ACTIONS.INICIAR_TEMPO] (context, payload = {}) {
    const { tempo } = payload;
    
    if (tempo) {
      context.commit(MUTATIONS.DEFINIR_TEMPO, { tempo });
    } 

    const tempo_interval = setInterval(() => {
      context.commit(MUTATIONS.INCREMENTAR_TEMPO);
    }, 1000);

    context.commit(MUTATIONS.DEFINIR_TEMPO_INTERVAL, { tempo_interval });
  },

  [ACTIONS.PARAR_TEMPO] (context) {
    const { tempo_interval } = context.state;
    clearInterval(tempo_interval);
  },
};
