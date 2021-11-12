import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();

    this.alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.elementVidas = document.querySelector('#vidas');
    this.elementLetraTentativa = document.querySelector('#letra-tentativa');
    this.elementContainer = document.querySelector('#tentativas-container');
    this.elementResultado = document.querySelector('#resultado');
    this.elementGame = document.querySelector('#game');
    this.elementTeclado = document.querySelector('#teclado');

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
    
    if (letra.length === 1 && this.alfabeto.includes(letra)) {
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

  renderTeclado() {
    for (let i = 0; i < this.alfabeto.length; i ++) {
      const letra = this.alfabeto[i];
      const btn = document.createElement('button');

      btn.id = `letra${letra}`;
      btn.dataset.letra = letra;
      btn.innerHTML = letra;
      btn.classList.add('btn-teclado');

      this.elementTeclado.appendChild(btn);

      btn.addEventListener('click', () => {
        console.log(btn.dataset.letra);
      });
    }
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
