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

  [MUTATIONS.ERRO_TENTATIVA] (state) {
    state.vidas = state.vidas - 1;
  },

  [MUTATIONS.ACERTO_TENTATIVA] (state, payload) {
    const { letra } = payload;

    let lr = state.letras_restantes;
    state.palavra_masked = state.palavra_masked.map(item => {
      if (item.letra_cleaned === letra && item.masked) {
        lr --;
        item.masked = false;
      }
      return item;
    });
    state.letras_restantes = lr;
  },

  [MUTATIONS.ACERTO_PALAVRA] (state, payload) {
    const { palavra } = payload;

    if (state.palavra_cleaned == palavra) {
      for(let i=0; i<palavra.length; i++){
        if (state.palavra_cleaned[i] == palavra[i] && state.palavra_masked[i].masked) {
          state.letras_restantes --;
          state.palavra_masked[i].masked = false;
        }
        console.log(state.palavra_masked[i]);
      }
      state.status = 0;
    }

  },
};
