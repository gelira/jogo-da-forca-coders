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
    const self = this;

    const { vidas, palavra } = self.store.state;

    self.elementVidas.innerHTML = '';

    if (vidas > 0) {
      for (let i = 0; i < vidas; i ++) {
        const img = document.createElement('img');
        
        img.setAttribute('src', 'img/vida.png');
        img.classList.add('vida');
  
        self.elementVidas.appendChild(img);
      }
    }
    else {
      const div = document.createElement('div');

      const p = document.createElement('p');
      p.innerHTML = `Você perdeu! A palavra era ${palavra}`;

      const btn = document.createElement('button');
      btn.setAttribute('id', 'novoJogo');
      btn.innerHTML = 'Novo jogo';

      div.appendChild(p);
      div.appendChild(btn);

      self.elementVidas.appendChild(div);

      document.getElementById('novoJogo').addEventListener('click', () => self.store.dispatch(ACTIONS.FETCH_PALAVRA));
    }
  }
}
