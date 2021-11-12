import { ACTIONS, MUTATIONS } from './types.js';

export default {
  async [ACTIONS.FETCH_PALAVRA] (context) {
    const response = await fetch('http://localhost:3000/palavra')
    const { city, country } = await response.json();
    
    context.commit(MUTATIONS.SET_PALAVRA, {
      dica: city,
      palavra: country,
    });

    context.dispatch(ACTIONS.PARAR_TEMPO);
  },

  [ACTIONS.TENTATIVA] (context, payload) {
    const { letra } = payload;
    const { palavra_masked } = context.state;

    for (let i = 0; i < palavra_masked.length; i ++) {
      const item = palavra_masked[i];
      if (item.letra_cleaned === letra) {
        context.commit(MUTATIONS.ACERTO_TENTATIVA, { letra });
        return true;
      }
    }

    context.commit(MUTATIONS.ERRO_TENTATIVA, { letra });
    return false;
  },

  [ACTIONS.TENTATIVA_TOTAL] (context, payload) {
    const { palavra } = payload;

    if (context.state.palavra_cleaned === palavra) {
      context.commit(MUTATIONS.ACERTO_PALAVRA);
      return true;
    }
 
    context.commit(MUTATIONS.ERRO_TENTATIVA);
    return false;
  },

  [ACTIONS.INICIAR_TEMPO] (context, payload = {}) {
    const { tempo } = payload;
    
    if (tempo !== undefined) {
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

  [ACTIONS.CARREGAR_PROGRESSO] (context) {
    const progresso = localStorage.getItem('progresso');
    if (!progresso) {
      return false;
    }

    const {
      vidas,
      palavra,
      dica,
      tempo,
      palavra_masked,
      letras_restantes,
      nome,
      tentativas,
    } = JSON.parse(progresso);

    context.commit(MUTATIONS.DEFINIR_PROGRESSO, {
      vidas,
      palavra,
      dica,
      tempo,
      palavra_masked,
      letras_restantes,
      nome,
      tentativas,
    });

    if (palavra_masked.length > 0) {
      context.dispatch(ACTIONS.INICIAR_TEMPO);
    }
  },

  [ACTIONS.CARREGAR_RANKING] (context) {
    const ranking = localStorage.getItem('ranking');
    if (ranking) {
      context.commit(MUTATIONS.DEFINIR_RANKING, {
        ranking: JSON.parse(ranking),
      });
    }
  },

  [ACTIONS.LIMPAR_PROGRESSO] () {
    localStorage.removeItem('progresso');
  },

  [ACTIONS.CLOSE_MODAL] (context) {
    context.commit(MUTATIONS.DEFINIR_MODAL, {
      show_modal: false,
      modal_title: '',
    });
  },
};
