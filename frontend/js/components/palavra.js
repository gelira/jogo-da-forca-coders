import Component from '../lib/component.js';

export default class Palavra extends Component {
  constructor() {
    super();
    this.elementDica = document.getElementById('dica');
    this.elementPalavraMasked = document.getElementById('palavra-masked');
  }

  render() {
    const { dica, palavra_masked } = this.store.state;

    this.elementDica.innerHTML = dica;
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
}
