import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Resultado extends Component {
  constructor() {
    super();
    
    const self = this;

    self.elementResultado = document.getElementById('resultado');
    self.elementNovoJogo = document.getElementById('novo-jogo');

    self.elementNovoJogo.addEventListener('click', () => self.novoJogo());
  }

  novoJogo() {
    this.store.dispatch(ACTIONS.FETCH_PALAVRA);
  }

  showResultado(mensagem) {
    this.elementNovoJogo.classList.remove('hidden');
    this.elementResultado.classList.remove('hidden');
    this.elementResultado.innerHTML = mensagem;
  }

  hideResultado() {
    this.elementNovoJogo.classList.add('hidden');
    this.elementResultado.classList.add('hidden');
    this.elementResultado.innerHTML = '';
  }

  render() {
    const { 
      vidas, 
      palavra,
      letras_restantes,
    } = this.store.state;

    if (vidas <= 0) {
      this.showResultado(`Você perdeu!! A palavra é: ${palavra}`);
      return;
    }

    if (letras_restantes <= 0) {
      this.showResultado(`Parabéns!! A palavra é: ${palavra}`);
      return;
    }

    this.hideResultado();
  }
}
