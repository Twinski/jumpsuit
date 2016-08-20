'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _config = require('./utils/config');

var _config2 = _interopRequireDefault(_config);

var _emit = require('./utils/emit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _updateNotifier2.default)({ pkg: _package2.default }).notify();

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var _this = this;

  var _ret;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
            var argv, invalidCommand, cmd;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    argv = (0, _minimist2.default)(process.argv.slice(2), {
                      boolean: ['h', 'help', 'v', 'version']
                    });

                    if (argv.help || argv.h) {
                      argv._.unshift('help');
                    }

                    if (!(argv.version || argv.v)) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt('return', {
                      v: console.log('v' + _package2.default.version)
                    });

                  case 4:
                    invalidCommand = function invalidCommand() {
                      (0, _emit.error)('"' + argv._.join(' ') + '" is not a valid Jumpsuit command');
                    };

                    cmd = argv._[0];
                    _context.t0 = cmd;
                    _context.next = _context.t0 === 'new' ? 9 : _context.t0 === 'watch' ? 12 : _context.t0 === 'build' ? 18 : _context.t0 === 'serve' ? 24 : _context.t0 === 'help' ? 29 : _context.t0 === undefined ? 29 : 32;
                    break;

                  case 9:
                    _context.next = 11;
                    return require('./cmds/new').default(argv);

                  case 11:
                    return _context.abrupt('break', 34);

                  case 12:
                    process.env.NODE_ENV = 'development';
                    _context.next = 15;
                    return (0, _config2.default)(argv);

                  case 15:
                    _context.next = 17;
                    return require('./cmds/build').watch(argv);

                  case 17:
                    return _context.abrupt('break', 34);

                  case 18:
                    process.env.NODE_ENV = 'production';
                    _context.next = 21;
                    return (0, _config2.default)(argv);

                  case 21:
                    _context.next = 23;
                    return require('./cmds/build').default(argv);

                  case 23:
                    return _context.abrupt('break', 34);

                  case 24:
                    _context.next = 26;
                    return (0, _config2.default)(argv);

                  case 26:
                    _context.next = 28;
                    return require('./cmds/serve').default(argv);

                  case 28:
                    return _context.abrupt('break', 34);

                  case 29:
                    _context.next = 31;
                    return require('./cmds/help').default(argv);

                  case 31:
                    return _context.abrupt('break', 34);

                  case 32:
                    invalidCommand();
                    return _context.abrupt('break', 34);

                  case 34:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          })(), 't0', 2);

        case 2:
          _ret = _context2.t0;

          if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt('return', _ret.v);

        case 5:
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t1 = _context2['catch'](0);

          (0, _emit.error)(_context2.t1, true);
          process.exit(1);

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this, [[0, 7]]);
}));