import Component from '../lib/component.js';
import { ACTIONS, MUTATIONS } from '../store/types.js';

export default class Resultado extends Component {
  constructor() {
    super();
  
    this.elementResultado = document.querySelector('#resultado');
    this.elementNome = document.querySelector('#nome');
    this.elementModalBody = document.querySelector('#modal-body');

    document.querySelector('#novo-jogo')
      .addEventListener('click', () => this.novoJogo());
  }

  novoJogo() {
    const { nome, tempo } = this.store.state;

    if (!nome && tempo === 0) {
      const nome = prompt('Digite seu nome:');
      if (!nome) {
        return;
      }
      this.store.commit(MUTATIONS.DEFINIR_NOME, { nome });
    }

    this.store.dispatch(ACTIONS.FETCH_PALAVRA)
      .then(() => {
        this.store.dispatch(ACTIONS.INICIAR_TEMPO, { tempo: 0 });
      });
  }

  render() {
    const { 
      vidas, 
      palavra,
      letras_restantes,
      nome,
    } = this.store.state;

    let fimDeJogo = false;

    if (vidas === 0) {
      this.elementModalBody.innerHTML = `A palavra certa era: ${palavra}`; 
      this.store.dispatch(ACTIONS.OPEN_MODAL, {
        modal_title: 'GAME OVER',
      });
      fimDeJogo = true;
    }

    if (letras_restantes === 0) {
      console.log(this.store.state);
      this.elementModalBody.innerHTML = `Parabéns!! A palavra é: ${palavra}`; 
      this.store.dispatch(ACTIONS.OPEN_MODAL, {
        modal_title: 'YOU WIN',
      });
      fimDeJogo = true;
    }

    if (fimDeJogo) {
      this.store.dispatch(ACTIONS.PARAR_TEMPO);
      this.store.dispatch(ACTIONS.LIMPAR_PROGRESSO);
      return;
    }

    this.elementNome.innerHTML = nome;
  }
}
