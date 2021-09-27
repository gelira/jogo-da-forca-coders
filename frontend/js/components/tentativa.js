import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();
    
    const self = this;

    self.elementVidas = document.getElementById('vidas');
    self.elementTentativaLetra = document.getElementById('tentativaLetra');

    document.getElementById('btnTentar').addEventListener('click', () => self.tentar());
  }

  tentar() {
    if (this.store.state.vidas <= 0) {
      return;
    }

    const letra = this.elementTentativaLetra.value.trim().toUpperCase();
    
    if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letra)) {
      this.store.dispatch(ACTIONS.TENTATIVA, { letra });
    } 

    this.elementTentativaLetra.value = '';
  }

  render() {
    const { vidas } = this.store.state;

    this.elementVidas.innerHTML = '';

    for (let i = 0; i < vidas; i ++) {
      const img = document.createElement('img');
      
      img.setAttribute('src', 'img/vida.png');
      img.classList.add('vida');

      this.elementVidas.appendChild(img);
    }
  }
}
