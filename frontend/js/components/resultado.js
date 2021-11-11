import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Resultado extends Component {
  constructor() {
    super();
  
    this.elementResultado = document.getElementById('resultado');
    this.elementNovoJogo = document.getElementById('novo-jogo');

    this.elementNovoJogo.addEventListener('click', () => this.novoJogo());
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

    let fimDeJogo = false;

    if (vidas === 0) {
      this.showResultado(`Você perdeu!! A palavra é: ${palavra}`);
      fimDeJogo = true;
    }

    if (letras_restantes === 0) {
      this.showResultado(`Parabéns!! A palavra é: ${palavra}`);
      fimDeJogo = true;
    }

    if (fimDeJogo) {
      this.store.dispatch(ACTIONS.PARAR_TEMPO);
      return;
    }

    this.hideResultado();
  }
}
