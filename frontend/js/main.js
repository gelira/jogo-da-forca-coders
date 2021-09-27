import Palavra from './components/palavra.js';
import Resultado from './components/resultado.js';
import Tentativa from './components/tentativa.js'

window.addEventListener('load', () => {
  const palavra = new Palavra();
  const tentativa = new Tentativa();
  const resultado = new Resultado();

  resultado.novoJogo();

  palavra.render();
  tentativa.render();
  resultado.render();
});
