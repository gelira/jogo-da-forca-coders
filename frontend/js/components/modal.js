import Component from '../lib/component.js';

import { ACTIONS } from '../store/types.js';

export default class Modal extends Component {
  constructor() {
    super();

    this.elementModal = document.querySelector('#modal');
    this.elementModalTitle = document.querySelector('#modal-title');
    this.elementModalBody = document.querySelector('#modal-body');
    
    document.querySelector('#modal-close')
      .addEventListener('click', () => this.store.commit(ACTIONS.CLOSE_MODAL));
  }

  render() {
    const {
      open_modal,
      modal_title,
    } = this.store.state;

    if (open_modal) {
      this.elementModal.classList.add('modal-show');
    }
    else {
      this.elementModal.classList.remove('modal-show');
      this.elementModalBody.innerHTML = '';
    }

    this.elementModalTitle.innerHTML = modal_title;
  }
}
