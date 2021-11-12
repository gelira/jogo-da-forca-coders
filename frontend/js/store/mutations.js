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

    state.letras_restantes = letras_restantes;
    state.vidas = 3;
    state.palavra = palavra;
    state.dica = dica;
    state.palavra_masked = palavra_masked;
    state.palavra_cleaned = palavra_cleaned;
    state.tentativas = {};
  },

  [MUTATIONS.ERRO_TENTATIVA] (state, payload = {}) {
    const { letra } = payload;

    if (letra) {
      const tentativas = { ...state.tentativas };
      tentativas[letra] = false;
      state.tentativas = tentativas;
    }

    const vidas = state.vidas - 1;

    if (vidas === 0) {
      state.show_modal = true;
      state.modal_title = 'GAME OVER';
    }

    state.vidas = vidas;
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

    if (lr === 0) {
      state.show_modal = true;
      state.modal_title = 'YOU WIN';

      const { nome, tempo, ranking } = state;

      if (ranking.some(e => e.nome === nome && e.tempo === tempo)) {
        return;
      }

      const new_ranking = [...ranking, { nome, tempo }].sort((a, b) => {
        if (a.tempo > b.tempo) {
          return 1
        }
        if (b.tempo > a.tempo) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1
        }
        if (b.nome > a.nome) {
          return -1;
        }
        return 0;
      });

      state.ranking = new_ranking;  
    }
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
      nome,
      tentativas,
      ranking,
    } = payload;

    state.vidas = vidas;
    state.palavra = palavra;
    state.dica = dica;
    state.tempo = tempo;
    state.palavra_masked = palavra_masked;
    state.letras_restantes = letras_restantes;
    state.nome = nome;
    state.tentativas = tentativas;
    state.ranking = ranking;
  },

  [MUTATIONS.ACERTO_PALAVRA] (state) {
    state.palavra_masked = state.palavra_masked.map(i => ({ ...i, masked: false }));
    state.letras_restantes = 0;
  },

  [MUTATIONS.DEFINIR_NOME] (state, payload) {
    const { nome } = payload;
    state.nome = nome;
  },

  [MUTATIONS.DEFINIR_MODAL] (state, payload = {}) {
    const {
      show_modal = false,
      modal_title = '',
    } = payload;

    state.show_modal = show_modal;
    state.modal_title = modal_title;
  },
};
