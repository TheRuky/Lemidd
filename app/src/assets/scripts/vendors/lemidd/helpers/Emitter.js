import EventQueue from './EventQueue';

export default class {
  constructor() {
    this.events = {};
    this.queue = new EventQueue();
  }

  on(event, fn) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(fn);

    this.dequeue(event);
  }

  emit(event, data, context = this) {
    if(this.events[event]) {
      this.events[event].forEach(fn => fn.call(context, data));
    } else {
      this.queue.enqueue({ event, data, context });
    }
  }

  dequeue(event) {
    this.queue.dequeue(element => {
      if(event === element.event) {
        const { event, data, context } = element;
        this.emit(event, data, context);

        return true;
      }

      return false;
    });
  }
}