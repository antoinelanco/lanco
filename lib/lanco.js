'use babel';

import LancoView from './lanco-view';
import { CompositeDisposable } from 'atom';

export default {

  lancoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lancoView = new LancoView(state.lancoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lancoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lanco:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lancoView.destroy();
  },

  serialize() {
    return {
      lancoViewState: this.lancoView.serialize()
    };
  },

  toggle() {
    console.log('Lanco was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
