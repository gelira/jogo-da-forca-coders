import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();

    this.elementVidas = document.querySelector('#vidas');
    this.elementLetraTentativa = document.querySelector('#letra-tentativa');
    this.elementContainer = document.querySelector('#tentativas-container');
    this.elementResultado = document.getElementById('resultado');
    this.elementGame = document.getElementById('game');

    document.querySelector('#btn-tentar')
      .addEventListener('click', () => this.tentar());
    
    this.renderTeclado();
  }

  tentar(button) {
    const { vidas, letras_restantes } = this.store.state;
    if (vidas <= 0 || letras_restantes <= 0) {
      return;
    }

    const letra = button.innerHTML.trim().toUpperCase();
    
    if (letra.length === 1 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letra)) {
      if(this.store.dispatch(ACTIONS.TENTATIVA, { letra })) {
        document.getElementById(button.id).setAttribute("style", "background-color: #56ff56;");
        document.getElementById(button.id).setAttribute("disabled", "disabled");
      } else {
        document.getElementById(button.id).setAttribute("style", "background-color: #ff8a8a");
        document.getElementById(button.id).setAttribute("disabled", "disabled");
      }
        
    } 

    this.elementLetraTentativa.value = '';
  }

  tentarPalavra() {
    const { vidas, letras_restantes } = this.store.state;
    if (vidas <= 0 || letras_restantes <= 0) {
      return;
    }
    const palavra = this.elementLetraTentativa.value.trim().toUpperCase();
    this.store.dispatch(ACTIONS.TENTATIVATOTAL, { palavra });
    this.elementLetraTentativa.value = '';
  }

  showContainer() {
    this.elementContainer.classList.remove('hidden');
  }

  hideContainer() {
    this.elementContainer.classList.add('hidden');
  }

  renderVidas() {
    const { vidas } = this.store.state;

    this.elementVidas.innerHTML = '';

    if (vidas > 0) {
      for (let i = 0; i < vidas; i ++) {
        const img = document.createElement('img');
        
        img.setAttribute('src', 'img/vida.png');
        img.classList.add('vida-item');
  
        this.elementVidas.appendChild(img);
      }
      return;
    }

    this.elementGame.classList.add('hidden');
  }

  renderTeclado(){
    let teclado = "<table cellpadding=3 cellspacing=6 width=390 height=90> <tr>";
    let linha = 0;
    for(let i=65; i<91; i++) {
        if(linha == 8) {
            linha = 0;
            teclado += "</tr><tr>";
        }
        teclado += "<td align=center valign=middle width=15> ";
        teclado += `<button type=button id="letter`+ String.fromCharCode(i) +`" class="btn-teclado">`+ String.fromCharCode(i) +`</button></td>`;
        linha++;
    }
    teclado += "</tr></table>";
    document.getElementById('teclado').insertAdjacentHTML('afterend', teclado);

    let elementTeclado = document.querySelectorAll('.btn-teclado');
    elementTeclado.forEach( (value,index) => {
      elementTeclado[index].addEventListener('click', () => this.tentar(value));
    });
  
  }

  render() {
    const { letras_restantes } = this.store.state;

    if (letras_restantes <= 0) {
      this.hideContainer();
      return;
    }

    this.showContainer();
    this.renderVidas();
  }
}
