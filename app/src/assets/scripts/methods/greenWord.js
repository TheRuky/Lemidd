export default function() {
  // Third parameter 'this' is optional. It's used when the context
  // of the element who emitted the event is needed.
  this.$emitter.emit('sendGreen', `I sent ${Math.random()}`, this);
}