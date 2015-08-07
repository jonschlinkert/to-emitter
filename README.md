# to-emitter [![NPM version](https://badge.fury.io/js/to-emitter.svg)](http://badge.fury.io/js/to-emitter)

> Convert any object into an event-emitter, and emits events with the name of any any method called on the object.

Wraps each method on an object so that an event is emitted with the name of the method along with the arguments passed to the method.

**Example**

```js
// an old object with a property that has a function value
var obj = {cache: {}};
obj.set = function(key, val) {
  obj[key] = val;
  return obj;
};

// pass an instance of your favorite event emitter, 
// see `example.js` for a working example
toEmitter(emitter, obj);

// now `obj` is an emitter, and `obj.set` will emit a `set` event.
obj.on('set', function(key, value) {
  console.log('set:', key, value);
});

obj.set('foo', 'bar');
```

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i to-emitter --save
```

## Usage

```js
var Emitter = require('component-emitter');
var toEmitter = require('to-emitter');

var obj = {
  cache: {},
  set: function (key, val) {
    obj.cache[key] = val
    return obj;
  },
  get: function (key) {
    return obj.cache[key];
  }
};

obj.set('foo', 'bar');

var emitter = Emitter({});
toEmitter(emitter, obj);

obj.on('set', function (key, val) {
  console.log('set:', key, val);
});

obj.on('get', function (key) {
  console.log('get:', key);
});

obj.set('a', 'b');
obj.set('c', 'd');
obj.get('a');
obj.get('c');
```

## Related projects

* [collection-visit](https://github.com/jonschlinkert/collection-visit): Visit a method over the items in an object, or map visit over the objects… [more](https://github.com/jonschlinkert/collection-visit)
* [minimist-events](https://github.com/jonschlinkert/minimist-events): Add events to minimist, ~30 sloc.
* [map-visit](https://github.com/jonschlinkert/map-visit): Map `visit` over an array of objects.
* [object-visit](https://github.com/jonschlinkert/object-visit): Call the given method on each value in the given object.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/to-emitter/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 06, 2015._