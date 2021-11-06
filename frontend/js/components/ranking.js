import Component from '../lib/component.js';

export default class Ranking extends Component {
  constructor() {
    super();
    
    const self = this;

    self.elementTempo = document.getElementById('tempo');
    self.elementNome = document.getElementById('nome');
    self.elementContainer = document.getElementById('ranking-container');
    self.elementBtnRankingShow = document.getElementById('ranking-show');
    self.elementBtnRankingHide = document.getElementById('ranking-hide');

    self.elementBtnRankingShow.addEventListener('click', () => self.showRanking());
    self.elementBtnRankingHide.addEventListener('click', () => self.hideRanking());

  }

  register(nome, tempo) {
    this.store.state.ranking.push(`{"nome":"${nome}", "tempo":"${tempo}"}`);

    this.store.state.ranking.sort( (a, b) => {
        return (a.nome > b.nome)? 1 : ((b.nome > a.nome)? -1 : 0);
    });
  }

  showRanking() {
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");

    for (let i=0; i<this.store.state.ranking.length; i++) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.appendChild(`${this.store.state.ranking[i].nome}`);
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.appendChild( `${this.store.state.ranking[i].tempo}` );
        tr.appendChild(td2);

        tableBody.appendChild(tr);
    }

    table.appendChild(tableBody);
    table.setAttribute("border", "1");
    
    this.elementContainer.appendChild(table+`<button id="ranking-hide"> Mostrar Ranking </button>`);
    this.elementContainer.classList.remove('hidden');
  }

  hideRanking() {
    this.elementContainer.innerHTML = "";
    this.elementContainer.classList.add('hidden');
  }

  render() {
    const { 
      nome,
      tempo,
      letras_restantes,
    } = this.store.state;

    if (letras_restantes <= 0) {
      this.register(nome, tempo);
      return;
    }
    
    this.hideRanking();
  }
}
