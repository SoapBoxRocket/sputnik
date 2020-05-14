'use babel';

import SputnikView from './sputnik-view';
import { CompositeDisposable } from 'atom';

export default {

  sputnikView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sputnikView = new SputnikView(state.sputnikViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sputnikView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sputnik:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sputnikView.destroy();
  },

  serialize() {
    return {
      sputnikViewState: this.sputnikView.serialize()
    };
  },

  toggle() {
    console.log('Sputnik was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
