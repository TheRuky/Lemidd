export default class {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
  }
  
  dequeue(callback) {
    let queue = [];
    
    this.queue.forEach(element => {
      if(!callback(element)) {
        queue.push(element);
      }
    });

    this.queue = queue;
  }
}