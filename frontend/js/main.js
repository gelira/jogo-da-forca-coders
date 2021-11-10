import Palavra from './components/palavra.js';
import Resultado from './components/resultado.js';
import Tentativa from './components/tentativa.js';
import Contador from './components/contador.js';

import store from './store/index.js';
import { ACTIONS } from './store/types.js';

window.addEventListener('load', () => {
  store.dispatch(ACTIONS.INICIAR_TEMPO, { tempo: 0 });

  const palavra = new Palavra();
  const tentativa = new Tentativa();
  const resultado = new Resultado();
  const contador = new Contador();

  resultado.novoJogo();

  palavra.render();
  tentativa.render();
  resultado.render();
  contador.render();
});
