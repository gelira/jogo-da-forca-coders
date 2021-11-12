import Component from '../lib/component.js';

import { ACTIONS } from '../store/types.js';

export default class Modal extends Component {
  constructor() {
    super();

    this.elementModal = document.querySelector('#modal');
    this.elementModalTitle = document.querySelector('#modal-title');
    this.elementModalBody = document.querySelector('#modal-body');
    
    document.querySelector('#modal-close')
      .addEventListener('click', () => this.store.dispatch(ACTIONS.CLOSE_MODAL));
  }

  subscribe() {
    this.store.events.subscribe('modalChange', () => this.render());
  }

  render() {
    const {
      show_modal,
      modal_title,
    } = this.store.state;
    
    this.elementModalTitle.innerHTML = modal_title;

    if (show_modal) {
      this.elementModal.classList.add('modal-show');
    }
    else {
      this.elementModal.classList.remove('modal-show');
      this.elementModalBody.innerHTML = '';
    }
  }
}
