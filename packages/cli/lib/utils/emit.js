'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports.warn = warn;
exports.log = log;
exports.question = question;
exports.questionErr = questionErr;
exports.pending = pending;
exports.pendingDone = pendingDone;
exports.getLogo = getLogo;
exports.outputLogo = outputLogo;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARROW = String.fromCharCode(0x25B8) || '=>';
var CHECKMARK = String.fromCharCode(0x2713) || 'done';

function error(err) {
  var lineBreak = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (!err) return;


  if (lineBreak) console.log();

  var msg = err.message || err.msg || err;
  console.log(_chalk2.default.red(_chalk2.default.dim(ARROW), ' ', (0, _stripAnsi2.default)(msg)));
}

function warn() {
  for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
    msg[_key] = arguments[_key];
  }

  if (!msg.length) return;
  console.log(_chalk2.default.yellow.apply(_chalk2.default, [_chalk2.default.dim(ARROW), ' '].concat(msg)));
}

function log() {
  var _console;

  for (var _len2 = arguments.length, msg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    msg[_key2] = arguments[_key2];
  }

  if (!msg.length) return;
  (_console = console).log.apply(_console, [_chalk2.default.dim(ARROW), ' '].concat(msg));
}

function question(msg) {
  return _chalk2.default.yellow(' ', msg);
}

function questionErr(msg) {
  return _chalk2.default.red(' ' + msg);
}

function pending(msg) {
  if (!msg.length) return;
  process.stdout.write(_chalk2.default.dim(ARROW) + '   ' + msg + '... ');
}

function pendingDone(time) {
  if (time) time = _chalk2.default.dim('(' + time + 'ms)');
  process.stdout.write(CHECKMARK + ' ' + time + '\n');
}

function getLogo() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options.indent = options.indent || 0;

  var prepend = Array(parseInt(options.indent, 10) + 1).join('  ');
  var filepath = _path2.default.resolve(__dirname, '../../assets/logo.txt');
  var logo = _fs2.default.readFileSync(filepath, 'utf8').replace(/^/gm, prepend);

  if (options.trim) {
    logo = logo.substring(0, logo.lastIndexOf('\n'));
  }

  return logo;
}

function outputLogo() {
  console.log(_chalk2.default.dim(getLogo({ indent: 1 })));
}