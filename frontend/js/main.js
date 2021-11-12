import Palavra from './components/palavra.js';
import Resultado from './components/resultado.js';
import Tentativa from './components/tentativa.js';
import Contador from './components/contador.js';
import Ranking from './components/ranking.js';
import Modal from './components/modal.js';

window.addEventListener('load', () => {
  const palavra = new Palavra();
  const tentativa = new Tentativa();
  const resultado = new Resultado();
  const contador = new Contador();
  const ranking = new Ranking();
  const modal = new Modal();

  //resultado.novoJogo();

  contador.render();
  palavra.render();
  tentativa.render();
  resultado.render();
  ranking.render();
  modal.render();
});
