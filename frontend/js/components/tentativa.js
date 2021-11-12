import Component from '../lib/component.js';
import { ACTIONS } from '../store/types.js';

export default class Tentativa extends Component {
  constructor() {
    super();

    this.alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.elementVidas = document.querySelector('#vidas');
    this.elementLetraTentativa = document.querySelector('#letra-tentativa');
    this.elementContainer = document.querySelector('#tentativas-container');
    this.elementResultado = document.querySelector('#resultado');
    this.elementGame = document.querySelector('#game');
    this.elementTeclado = document.querySelector('#teclado');

    document.querySelector('#btn-tentar')
      .addEventListener('click', () => this.tentar());
    
    this.renderTeclado();
  }

  tentar(letra) {
    const { vidas, letras_restantes } = this.store.state;
    if (vidas <= 0 || letras_restantes <= 0) {
      return;
    }
    
    if (!letra) {
      letra = this.elementLetraTentativa.value.trim();
      letra = letra.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    if (letra.length === 1) {
      if (this.alfabeto.includes(letra)) {
        this.store.dispatch(ACTIONS.TENTATIVA, { letra });
      }
    }
    else {
      this.store.dispatch(ACTIONS.TENTATIVA_TOTAL, { palavra: letra });
    }

    this.elementLetraTentativa.value = '';
  }

  showContainer() {
    this.elementContainer.classList.remove('hidden');
  }

  hideContainer() {
    this.elementContainer.classList.add('hidden');
  }

  renderVidas() {
    const { vidas } = this.store.state;

    this.elementVidas.innerHTML = '';

    if (vidas > 0) {
      for (let i = 0; i < vidas; i ++) {
        const img = document.createElement('img');
        
        img.setAttribute('src', 'img/vida.png');
        img.classList.add('vida-item');
  
        this.elementVidas.appendChild(img);
      }
      return;
    }

    this.elementGame.classList.add('hidden');
  }

  renderTeclado() {
    for (let i = 0; i < this.alfabeto.length; i ++) {
      const letra = this.alfabeto[i];
      const btn = document.createElement('button');

      btn.id = `letra${letra}`;
      btn.dataset.letra = letra;
      btn.innerHTML = letra;
      btn.classList.add('btn-teclado');

      this.elementTeclado.appendChild(btn);

      btn.addEventListener('click', () => {
        this.tentar(btn.dataset.letra);
      });
    }
  }

  updateTeclado() {
    const { tentativas } = this.store.state;
    
    for (let i = 0; i < this.alfabeto.length; i ++) {
      const letra = this.alfabeto[i];

      const btn = document.querySelector(`#letra${letra}`);

      if (!tentativas.hasOwnProperty(letra)) {
        btn.disabled = false;
        btn.classList.remove('btn-erro');
        btn.classList.remove('btn-acerto');
        continue;
      }

      const tentativa = tentativas[letra];
      
      btn.classList.add(tentativa ? 'btn-acerto' : 'btn-erro');
      btn.disabled = true;
    }
  }

  render() {
    const { letras_restantes } = this.store.state;

    if (letras_restantes <= 0) {
      this.hideContainer();
      return;
    }

    this.showContainer();
    this.renderVidas();
    this.updateTeclado();
  }
}
