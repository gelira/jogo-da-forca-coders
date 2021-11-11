import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();

    this.elementVidas = document.querySelector('#vidas');
    this.elementLetraTentativa = document.querySelector('#letra-tentativa');
    this.elementContainer = document.querySelector('#tentativas-container');

    document.querySelector('#btn-tentar')
      .addEventListener('click', () => this.tentar());
  }

  tentar() {
    const { vidas, letras_restantes } = this.store.state;
    if (vidas <= 0 || letras_restantes <= 0) {
      return;
    }

    const letra = this.elementLetraTentativa.value.trim().toUpperCase();
    
    if (letra.length === 1 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letra)) {
      this.store.dispatch(ACTIONS.TENTATIVA, { letra });
    } 

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

    const img = document.createElement('img');
      
    img.setAttribute('src', 'img/game-over.png');
    img.classList.add('game-over-item');

    this.elementVidas.appendChild(img);
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
