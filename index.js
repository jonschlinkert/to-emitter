/*!
 * to-emitter <https://github.com/jonschlinkert/to-emitter>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var forward = require('forward-object');

module.exports = function toEmitter(emitter, obj) {
  if (typeof emitter !== 'object') {
    throw new TypeError('expected emitter to be an object.');
  }

  if (typeof emitter.emit !== 'function') {
    throw new TypeError('expected `emitter.emit` to be a function.');
  }

  if (typeof obj !== 'object') {
    throw new TypeError('expected the second argument to be an object.');
  }

  function wrap(key, fn) {
    return function () {
      var args = [].slice.call(arguments);
      emitter.emit.apply(emitter, [key].concat(args));
      return fn.apply(obj, arguments);
    };
  }

  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'function') {
      obj[key] = wrap(key, val);
    }
  }

  forward(obj, emitter);
  return obj;
};
