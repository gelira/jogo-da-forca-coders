import Palavra from './components/palavra.js';
import Resultado from './components/resultado.js';
import Tentativa from './components/tentativa.js'
import Ranking from './components/Ranking.js'

window.addEventListener('load', () => {
  const palavra = new Palavra();
  const tentativa = new Tentativa();
  const resultado = new Resultado();
  const ranking = new Ranking();

  resultado.novoJogo();

  palavra.render();
  tentativa.render();
  resultado.render();
  ranking.render();
});


function iniciaModal(modalID) {
  
      const modal = document.getElementById(modalID);
      if(modal) {
          modal.classList.add('mostrar');
          modal.addEventListener('click', (e) => {
              if(e.target.id == modalID || e.target.className == 'fechar') {
                  modal.classList.remove('mostrar');
                  
              }
          });
      }
  }

//iniciaModal('modal-result');



//const logo = document.querySelector('.logo');
  //  logo.addEventListener('click', () => iniciaModal('modal-result'));