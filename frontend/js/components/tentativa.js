import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();
    
    const self = this;

    self.elementVidas = document.getElementById('vidas');
    self.elementLetraTentativa = document.getElementById('letra-tentativa');
    self.elementContainer = document.getElementById('tentativas-container');

    document.getElementById('btn-tentar').addEventListener('click', () => self.tentar());
  }

  tentar() {
    const { vidas, letras_restantes } = this.store.state;
    if (vidas <= 0 || letras_restantes <= 0) {
      return;
    }

    const letra = this.elementLetraTentativa.value.trim().toUpperCase();
    
    if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letra)) {
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
