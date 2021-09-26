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

    state.palavra = palavra;
    state.dica = dica;
    state.palavra_masked = palavra_masked;
    state.letras_restantes = letras_restantes;
  }
};
