'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.typeCheck = typeCheck;
exports.debounce = debounce;
exports.getFreePort = getFreePort;

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getType(value) {
  return {}.toString.call(value).match(/\s([^\]]+)/)[1].toLowerCase();
}

function typeCheck(value, types) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (options.throw === undefined) options.throw = true;

  var typesType = getType(types);
  if (!types || !typesType.match(/string|array/)) {
    throw new Error('typeCheck type param must be a string or array');
  }

  if (typesType !== 'array') types = [types];

  var valueType = getType(value);
  var valueStr = valueType === 'string' ? '"' + value + '"' : value;
  var typeStr = types.length > 1 ? '{' + types.join(', ') + '}' : types[0];

  if (value && types.indexOf(valueType) === -1) {
    var error = 'value ' + valueStr + ' should be a ' + typeStr + ' but got ' + valueType;

    if (options.throw) throw new TypeError(error);
    return false;
  }

  return true;
}

function debounce(fn) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  typeCheck(fn, 'function');
  options.wait = options.wait || 100;

  var timeout = void 0;
  return function () {
    var _this = this,
        _arguments = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      fn.apply(_this, _arguments);
    }, options.wait);
  };
}

function getFreePort() {
  return new Promise(function (resolve, reject) {
    var server = _net2.default.createServer();

    server.listen(0, function (err) {
      if (err) return reject(err);

      var port = server.address().port;
      server.close(function () {
        return resolve(port);
      });
    });
  });
}