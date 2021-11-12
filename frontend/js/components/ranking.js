import Component from '../lib/component.js';
import { MUTATIONS } from '../store/types.js';

export default class Ranking extends Component {
  constructor() {
    super();

    this.elementModalBody = document.querySelector('#modal-body');

    document.querySelector('#ranking-btn')
      .addEventListener('click', () => this.showRanking());
  }

  createHeader() {
    const tr = document.createElement('tr');
    
    const thN = document.createElement('th');
    thN.innerHTML = '#';

    const thNome = document.createElement('th');
    thNome.innerHTML = 'Nome';

    const thTempo = document.createElement('th');
    thTempo.innerHTML = 'Tempo';

    tr.appendChild(thN);
    tr.appendChild(thNome);
    tr.appendChild(thTempo);

    return tr;
  }

  formatTempo(tempo) {
    const segundos = tempo % 60;
    const minutos = (tempo - segundos) / 60;

    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
  }

  createRankingLine(item, index) {
    const tr = document.createElement('tr');
    
    const tdN = document.createElement('td');
    tdN.innerHTML = index;

    const tdNome = document.createElement('td');
    tdNome.innerHTML = item.nome;

    const tdTempo = document.createElement('td');
    tdTempo.innerHTML = this.formatTempo(item.tempo);

    tr.appendChild(tdN);
    tr.appendChild(tdNome);
    tr.appendChild(tdTempo);

    return tr;
  }

  showRanking() {
    const { ranking } = this.store.state;

    this.elementModalBody.innerHTML = '';

    const table = document.createElement('table');
    table.appendChild(this.createHeader());
    
    for (let i = 0; i < ranking.length; i ++) {
      table.appendChild(this.createRankingLine(ranking[i], i + 1));
    }

    this.elementModalBody.appendChild(table);

    this.store.commit(MUTATIONS.DEFINIR_MODAL, {
      show_modal: true,
      modal_title: 'Ranking',
    });
  }
}
