'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var Emitter = require('component-emitter');
var toEmitter = require('./');

function App(opts) {
  this.opts = opts || {};
}
App.prototype.set = function(key, val) {
  this.opts[key] = val;
  return this;
};
App.prototype.get = function(key, val) {
  return this.opts[key];
};
var app, emitter;

describe('toEmitter', function () {
  beforeEach(function () {
    emitter = Emitter({});
    app = new App();
  })

  it('should add emitter methods to the given object', function () {
    toEmitter(emitter, app);
    app.should.have.properties(['on', 'emit']);
    assert.equal(typeof app.on, 'function');
    assert.equal(typeof app.emit, 'function');
  });

  it('should emit events from methods on the given object', function (done) {
    toEmitter(emitter, app);
    app.on('set', function (key, val) {
      key.should.equal('a');
      val.should.equal('b');
      done();
    });
    app.set('a', 'b');
  });

  it('should throw an error when emitter is not an object', function () {
    (function () {
      toEmitter();
    }).should.throw('expected emitter to be an object.');
  });

  it('should throw an error when `emit` is not a function', function () {
    (function () {
      toEmitter({});
    }).should.throw('expected `emitter.emit` to be a function.');
  });

  it('should throw an error when the second arg is not an object', function () {
    (function () {
      toEmitter({emit: function() {}});
    }).should.throw('expected the second argument to be an object.');
  });
});
