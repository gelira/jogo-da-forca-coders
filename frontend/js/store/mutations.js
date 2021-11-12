import { MUTATIONS } from './types.js';

export default {
  [MUTATIONS.SET_PALAVRA] (state, payload) {
    const { palavra, dica } = payload;

    let letras_restantes = 0;
    const palavra_masked = [];
    const palavra_upper = palavra.toUpperCase();
    const palavra_cleaned = palavra_upper.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (let i = 0; i < palavra.length; i ++) {
      let masked = true;
      const letra_upper = palavra_upper[i];
      const letra_cleaned = palavra_cleaned[i];

      if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letra_cleaned)) {
        letras_restantes ++;
      }
      else {
        masked = false;
      }

      palavra_masked.push({
        masked,
        letra_upper,
        letra_cleaned,
      });
    }

    state.vidas = 3;
    state.palavra = palavra;
    state.dica = dica;
    state.palavra_masked = palavra_masked;
    state.letras_restantes = letras_restantes;
    state.palavra_cleaned = palavra_cleaned;
    state.status = 0;
  },

  [MUTATIONS.ERRO_TENTATIVA] (state, payload = {}) {
    const { letra } = payload;

    if (letra) {
      const tentativas = { ...state.tentativas };
      tentativas[letra] = false;
      state.tentativas = tentativas;
    }

    state.vidas = state.vidas - 1;
  },

  [MUTATIONS.ACERTO_TENTATIVA] (state, payload) {
    const { letra } = payload;

    const tentativas = { ...state.tentativas };
    tentativas[letra] = true;

    let lr = state.letras_restantes;
    state.palavra_masked = state.palavra_masked.map(item => {
      if (item.letra_cleaned === letra && item.masked) {
        lr --;
        item.masked = false;
      }
      return item;
    });

    state.letras_restantes = lr;
    state.tentativas = tentativas;
  },

  [MUTATIONS.DEFINIR_TEMPO_INTERVAL] (state, payload) {
    state.tempo_interval = payload.tempo_interval;
  },

  [MUTATIONS.DEFINIR_TEMPO] (state, payload) {
    state.tempo = payload.tempo;
  },

  [MUTATIONS.INCREMENTAR_TEMPO] (state) {
    state.tempo ++;
  },

  [MUTATIONS.DEFINIR_PROGRESSO] (state, payload) {
    const {
      vidas,
      palavra,
      dica,
      tempo,
      palavra_masked,
      letras_restantes,
    } = payload;

    state.vidas = vidas;
    state.palavra = palavra;
    state.dica = dica;
    state.tempo = tempo;
    state.palavra_masked = palavra_masked;
    state.letras_restantes = letras_restantes;
  },

  [MUTATIONS.ACERTO_PALAVRA] (state) {
    state.palavra_masked = state.palavra_masked.map(i => ({ ...i, masked: false }));
    state.letras_restantes = 0;
  },
};
