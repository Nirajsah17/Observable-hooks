// observable.js
const observers = new Map();

function useObservable(obj) {
  const observerId = Symbol();

  function subscribe(callback) {
    const callbacks = observers.get(obj) || new Set();
    callbacks.add([observerId, callback]);
    observers.set(obj, callbacks);
  }

  function unsubscribe(callback) {
    const callbacks = observers.get(obj);
    if (callbacks) {
      callbacks.delete([observerId, callback]);
      if (callbacks.size === 0) {
        observers.delete(obj);
      }
    }
  }

  function set(path, value) {
    const props = typeof path === 'string' ? path.split('.') : path;
    let currObj = obj;
    const lastProp = props.pop();

    for (const prop of props) {
      currObj[prop] = currObj[prop] || {};
      currObj = currObj[prop];
    }

    currObj[lastProp] = value;
    notify(obj, path);
  }

  function get(path) {
    const props = typeof path === 'string' ? path.split('.') : path;
    let currObj = obj;

    for (const prop of props) {
      if (!currObj || typeof currObj !== 'object') {
        return undefined;
      }
      currObj = currObj[prop];
    }

    return currObj;
  }

  function notify(obj, path) {
    const callbacks = observers.get(obj);
    if (callbacks) {
      callbacks.forEach(([_, callback]) => callback(path, get(path)));
    }
  }

  return { subscribe, unsubscribe, set, get };
}

export default useObservable;