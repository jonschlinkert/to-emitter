var Emitter = require('component-emitter');
var toEmitter = require('./');

var app = {
  cache: {},
  set: function (key, val) {
    app.cache[key] = val
    return app;
  },
  get: function (key) {
    return app.cache[key];
  }
};

app.set('foo', 'bar');

var emitter = Emitter({});
toEmitter(emitter, app);

app.on('set', function (key, val) {
  console.log('set:', key, val);
});

app.on('get', function (key) {
  console.log('get:', key);
});

app.set('a', 'b');
app.set('c', 'd');
app.get('a');
app.get('c');
