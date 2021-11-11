import Palavra from './components/palavra.js';
import Resultado from './components/resultado.js';
import Tentativa from './components/tentativa.js';
import Contador from './components/contador.js';

window.addEventListener('load', () => {
  const palavra = new Palavra();
  const tentativa = new Tentativa();
  const resultado = new Resultado();
  const contador = new Contador();

  resultado.novoJogo();

  contador.render();
  palavra.render();
  tentativa.render();
  resultado.render();
});
