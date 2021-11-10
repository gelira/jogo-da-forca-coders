import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Resultado extends Component {
  constructor() {
    super();
    
    const self = this;

    self.elementResultado = document.getElementById('resultado');
    self.elementNovoJogo = document.getElementById('novo-jogo');
    self.elementNovoContainer = document.getElementById('novo-container');
    self.elementNome = document.getElementById('name');
    self.elementNomeView = document.getElementById('nome-view');
    self.elementTempoView = document.getElementById('tempo-view');
    self.elementDados = document.getElementById('dados');
    self.elementGame = document.getElementById('game');

    this.store.state.nome = (localStorage.getItem('nome') === null)? '' : localStorage.getItem('nome') ;

    self.elementNovoJogo.addEventListener('click', () => self.novoJogo());
  }

  novoJogo() {
    if(this.elementNome.value) {
      this.store.state.nome = this.elementNome.value;
      localStorage.setItem('nome', this.elementNome.value);
    } else {
      alert(`É obrigatorio informar um nome para o jogador.`);
      return;
    }
    this.store.state.letras_restantes = -1;
    this.elementGame.classList.remove('hidden');

    this.store.dispatch(ACTIONS.FETCH_PALAVRA);

    this.store.state.tempo = 0;
    this.elementclock = setInterval((() => {
      this.store.state.tempo++;
    }).bind(this), 1000);

    let elementTeclado = document.querySelectorAll('.btn-teclado');
    elementTeclado.forEach( (value,index) => {
      elementTeclado[index].setAttribute("style", "background-color:;");
      elementTeclado[index].removeAttribute("disabled");
    });
    
    this.hideResultado();
  }

  showResultado(mensagem,status) {
    this.elementResultado.innerHTML = '';
    
    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(mensagem));

    if(!status){
      const img = document.createElement('img');
      img.setAttribute('src', 'img/game-over.png');
      img.classList.add('game-over-item');
      this.elementResultado.appendChild(img);
    }

    this.elementNovoContainer.classList.remove('hidden');
    this.elementResultado.classList.remove('hidden');
    this.elementResultado.appendChild(h3);
    clearInterval(this.elementclock);
  }

  hideResultado() {
    this.elementNovoContainer.classList.add('hidden');
    this.elementResultado.classList.add('hidden');
    this.elementResultado.innerHTML = '';
  }

  dados() {
    if(this.store.state.tempo == 0){
      this.elementDados.classList.add('hidden');
    } else {
      this.elementDados.classList.remove('hidden');
    }
  }

  render() {
    const { 
      vidas, 
      palavra,
      letras_restantes,
      nome,
      tempo,
    } = this.store.state;

    this.elementNome.value = nome;

    this.elementNomeView.innerHTML = nome;
    this.elementTempoView.innerHTML = tempo;
    this.dados();

    if (vidas == 0 && this.elementResultado.innerHTML == '') {
      this.showResultado(`Você perdeu!! A palavra é: ${palavra}`, false);
      return;
    }

    if (letras_restantes == 0 && this.elementResultado.innerHTML == '') {
      this.showResultado(`Parabéns!! A palavra é: ${palavra}`, true);
      return;
    }

  }
}
