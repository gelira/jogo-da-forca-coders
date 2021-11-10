import Component from '../lib/component.js';

import { ACTIONS } from '../store/types.js';

export default class Contador extends Component {
  constructor() {
    super();
    this.store.dispatch(ACTIONS.INICIAR_TEMPO);
    this.elementContador = document.querySelector('#contador');
  }

  subscribe() {
    this.store.events.subscribe('tempoChange', () => this.render());
  }

  render() {
    const { tempo } = this.store.state;
    console.log(tempo);

    const segundos = tempo % 60;
    const minutos = (tempo - segundos) / 60;

    const segundosText = segundos.toString().padStart(2, '0');
    const minutosText = minutos.toString().padStart(2, '0');

    this.elementContador.innerHTML = `Tempo de jogo: ${minutosText}:${segundosText}`;
  }
}
