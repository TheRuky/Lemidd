export default function() {
  const _this = this;

  let counter = 0;

  _this.$node.innerHTML = counter;

  // Since greenWord is giving it's context to the function,
  // it's necessary to cache the parent scope if used inside.
  _this.$emitter.on('sendGreen', function(data) {
    counter++;

    _this.$node.innerHTML = counter;

    console.log('Received data: ', data, 'Event was emitted by: ', this.$node);
  });
}