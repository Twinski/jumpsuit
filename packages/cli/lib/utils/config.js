'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _emit = require('./emit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG = exports.CONFIG = void 0;
var defaults = {
  sourceDir: 'src',
  outputDir: 'dist',
  assetsDir: 'assets',

  assetsIgnoreExtensions: [],

  entry: 'app.js',

  prodSourceMaps: true,

  hsr: {
    maxAge: 1000,
    shouldCatchErrors: true
  },

  server: {
    port: 8000,
    host: 'localhost',
    pushState: true
  },

  browserify: {
    extensions: ['.js'],
    rebundles: [],
    transforms: [],
    globals: {}
  },

  styles: null };

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var configFile, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configFile = _path2.default.resolve(argv.c || argv.config || 'jumpsuit.config.js');
            _context.next = 3;
            return _fsPromise2.default.exists(configFile);

          case 3:
            if (_context.sent) {
              _context.next = 6;
              break;
            }

            (0, _emit.warn)('"' + _path2.default.basename(configFile) + '" doesn\'t exist. We recommend creating one!');
            return _context.abrupt('return');

          case 6:
            config = (0, _deepAssign2.default)({}, defaults, require(configFile));


            config.sourceDir = _path2.default.resolve(config.sourceDir);
            config.outputDir = _path2.default.resolve(config.outputDir);
            config.assetsDir = _path2.default.resolve(config.sourceDir, config.assetsDir);
            config.entry = _path2.default.resolve(config.sourceDir, config.entry);

            exports.CONFIG = CONFIG = config;

          case 12:
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