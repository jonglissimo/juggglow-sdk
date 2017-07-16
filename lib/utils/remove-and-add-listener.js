function removeListeners(listeners) {
  listeners.forEach(function(listener) {
    listener.emitter.removeListener(listener.eventName, listener.method)
  });
  listeners = [];
}

function addListener(listeners, listener) {
  listener.emitter.on(listener.eventName, listener.method);
  listeners.push(listener);
}

function removeListenersAndAdd(listeners, newListener) {
  removeListeners(listeners);
  addListener(listeners, newListener);
}

module.exports = removeListenersAndAdd;