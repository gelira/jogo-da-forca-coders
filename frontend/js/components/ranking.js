import Component from '../lib/component.js';

export default class Ranking extends Component {
  constructor() {
    super();
    
    const self = this;

    this.store.state.ranking = (localStorage.getItem('ranking') === null)? [] : JSON.parse(localStorage.getItem('ranking')) ;

    self.elementContainer = document.getElementById('ranking-container');
    self.elementBtnRankingShow = document.getElementById('ranking-btn');

    self.elementBtnRankingShow.addEventListener('click', () => self.showRanking());
  }

  register(nome, tempo) {
    this.store.state.ranking.push(`{"nome":"${nome}", "tempo":"${tempo}"}`);
    localStorage.setItem('ranking', JSON.stringify(this.store.state.ranking));

    this.store.state.ranking.sort( (a, b) => {
        let aa = JSON.parse(a);
        let bb = JSON.parse(b);
        return (aa.tempo > bb.tempo)? 1 : ((bb.tempo > aa.tempo)? -1 : 0);
    });
  }

  showRanking() {
    if(!this.elementContainer.classList.contains('hidden')){
      this.elementContainer.innerHTML = "";
      this.elementContainer.classList.toggle('hidden');
      this.elementBtnRankingShow.innerHTML = "Mostrar Ranking";
      return;
    }

    this.store.state.ranking.sort( (a, b) => {
      let aa = JSON.parse(a);
      let bb = JSON.parse(b);
      return (aa.tempo > bb.tempo)? 1 : ((bb.tempo > aa.tempo)? -1 : 0);
    });

    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    let tableHead = document.createElement("thead");

    if( this.store.state.ranking.length > 0 ) {
      let tr = document.createElement("tr");

      let th = document.createElement("th");
      th.appendChild(document.createTextNode(`POSIÇÃO`));
      tr.appendChild(th);

      let th1 = document.createElement("th");
      th1.appendChild(document.createTextNode(`NOME`));
      tr.appendChild(th1);

      let th2 = document.createElement("th");
      th2.appendChild(document.createTextNode(`TEMPO`));
      tr.appendChild(th2);

      tableHead.appendChild(tr);

      for (let i=0; i<this.store.state.ranking.length; i++) {
        let dados = JSON.parse(this.store.state.ranking[i]);

        let tr = document.createElement("tr");

        let td = document.createElement("td");
        td.appendChild(document.createTextNode(`${i+1}`));
        tr.appendChild(td);

        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(`${dados.nome}`));
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(`${dados.tempo}s`));
        tr.appendChild(td2);

        tableBody.appendChild(tr);
      }
    } else {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.appendChild(document.createTextNode(`Nenhum resultado localizado`));
      tr.appendChild(td1);

      tableBody.appendChild(tr);
    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    table.setAttribute("border", "1");
    
    this.elementContainer.appendChild(table);
    this.elementContainer.classList.toggle('hidden');
    this.elementBtnRankingShow.innerHTML = "Ocultar Ranking";
  }

  render() {
    const { 
      nome,
      tempo,
      letras_restantes,
    } = this.store.state;

    if (letras_restantes == 0) {
      this.register(nome, tempo);
      if(!this.elementContainer.classList.contains('hidden')){
        this.showRanking();
        this.showRanking();
      }
    }
    
  }
}
