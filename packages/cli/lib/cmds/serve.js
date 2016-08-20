'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketMessage = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _butler = require('butler');

var _butler2 = _interopRequireDefault(_butler);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _emit = require('../utils/emit');

var _config = require('../utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketMessage = exports.socketMessage = void 0;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var fromWatch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var _ref2, uri, config, hsr;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!fromWatch) (0, _emit.outputLogo)();

            _context.next = 3;
            return (0, _butler2.default)(_config.CONFIG.server, { hsr: true });

          case 3:
            _ref2 = _context.sent;
            uri = _ref2.uri;
            config = _ref2.config;
            hsr = _ref2.hsr;


            process.env.PORT = config.port;
            process.env.HOST = config.host;
            process.env.HSR_WS = hsr.uri;
            process.env.HSR_MAX_AGE = _config.CONFIG.hsr.maxAge;
            process.env.HSR_SHOULD_CATCH_ERRORS = _config.CONFIG.hsr.shouldCatchErrors;

            exports.socketMessage = socketMessage = hsr.send;

            (0, _emit.log)('running at', _chalk2.default.underline(uri));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();