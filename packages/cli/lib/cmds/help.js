'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menus = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.spaced = spaced;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _emit = require('../utils/emit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var cmd;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cmd = argv._[1] ? argv._[1].split(':')[0] : argv._[0] || '_default';


            console.log(menus[cmd] || menus['_default']);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function spaced(name, desc) {
  var paddingLeft = 20;
  var fill = new Array(paddingLeft - name.length - 1).join('.');
  return name + ' ' + _chalk2.default.dim(fill) + ' ' + desc;
}

var menus = exports.menus = {
  _default: _chalk2.default.dim((0, _emit.getLogo)({ indent: 1, trim: true })) + '\n                      ' + _chalk2.default.dim(_package2.default.description) + '\n\n  ' + _chalk2.default.underline('Usage:') + '\n\n    js <command> [options]\n    jumpsuit <command> [options]\n\n    ' + _chalk2.default.dim('For further info about a command:') + '\n    jumpsuit help <command> ' + _chalk2.default.dim('or') + ' jumpsuit <command> --help\n\n  ' + _chalk2.default.underline('Commands:') + '\n\n    ' + spaced('new', 'start a project in a new directory') + '\n    ' + spaced('watch', 'build initial app and wait for changes') + '\n    ' + spaced('build', 'create a production-ready version of app') + '\n    ' + spaced('serve', 'run the static server') + '\n\n  ' + _chalk2.default.underline('Options:') + '\n\n    ' + spaced('-p, --port', 'specify the port you want to run on') + '\n    ' + spaced('-h, --host', 'specify the host you want to run on') + '\n    ' + spaced('-h, --help', 'show help menu for a command') + '\n    ' + spaced('-v, --version', 'show Jumpsuit version number') + '\n  ',

  'new': '\n  ' + _chalk2.default.underline('Usage:') + '\n\n    jumpsuit new <app-name> [options]\n  ',

  'watch': '\n  ' + _chalk2.default.underline('Usage:') + '\n\n    jumpsuit watch [options]\n  ',

  'build': '\n  ' + _chalk2.default.underline('Usage:') + '\n\n    jumpsuit build [options]\n  ',

  'serve': '\n  ' + _chalk2.default.underline('Usage:') + '\n\n    jumpsuit serve [options]\n  '
};