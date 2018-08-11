import Emitter from './helpers/Emitter';

export default class {
  constructor({ methods, globals, options }) {
    this.defaults = {
      selector: 'method'
    };

    this.methods = methods || {};
    this.globals = globals || {};
    this.options = Object.assign({}, this.defaults, options);
  }

  bind() {
    const nodes = Array.from(document.querySelectorAll(`[data-${this.options.selector}]`));

    const emitter = new Emitter();

    nodes.forEach(node => {
      const selector = node.dataset[this.options.selector];

      const context = {
        $node: node,
        $nodes: nodes,
        $emitter: emitter,
        $peers: nodes.filter(element => element !== node && element.dataset[this.options.selector] === selector),
        $selector: selector
      }

      if(this.methods[selector] != null) {
        if(typeof this.methods[selector] === 'function') {
          this.methods[selector].call(context);
        } else {
          console.error('[Lemidd]', `Error: Method "${selector}" is not a function. Called from node `, node);
        }
      } else {
        console.error('[Lemidd]', `Error: Called unknown method "${selector}" from node `, node);
      }
    });
  }
}