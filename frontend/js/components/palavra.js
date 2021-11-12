import Component from '../lib/component.js';

export default class Palavra extends Component {
  constructor() {
    super();

    this.elementDica = document.querySelector('#dica');
    this.elementPalavraMasked = document.querySelector('#palavra-masked');
    this.elementLetrasRestantes = document.querySelector('#letras-restantes');
  }

  showDica() {
    const { dica } = this.store.state;
    this.elementDica.innerHTML = dica;
  }

  renderPalavraMasked() {
    const { palavra_masked } = this.store.state;

    this.elementPalavraMasked.innerHTML = '';

    for (let i = 0; i < palavra_masked.length; i ++) {
      const { masked, letra_upper } = palavra_masked[i];

      const div = document.createElement('div');
      div.classList.add('letra');

      let ih = '_';
      if (letra_upper !== ' ') {
        ih = masked ? '*' : letra_upper;
      } 
      div.innerHTML = ih;

      this.elementPalavraMasked.appendChild(div);
    }
  }

  renderLetrasRestantes() {
    const { letras_restantes } = this.store.state;

    if (letras_restantes <= 0) {
      this.elementLetrasRestantes.classList.add('hidden');
      return;
    }

    this.elementLetrasRestantes.classList.remove('hidden');
    this.elementLetrasRestantes.innerHTML = letras_restantes === 1 ? 'Falta apenas 1 letra' : `Faltam ${letras_restantes} letras`;
  }

  render() {
    this.showDica();
    this.renderPalavraMasked();
    this.renderLetrasRestantes();
  }
}
