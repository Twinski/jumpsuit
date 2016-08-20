'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAsset = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var buildAsset = exports.buildAsset = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(evt, file) {
    var outputDir, assetsDir, sourceDir, outputFile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            outputDir = _config.CONFIG.outputDir;
            assetsDir = _config.CONFIG.assetsDir;
            sourceDir = _config.CONFIG.sourceDir;
            outputFile = void 0;


            if (file.indexOf(assetsDir) > -1) {
              outputFile = file.replace(assetsDir, outputDir);
            } else {
              outputFile = file.replace(sourceDir, outputDir);
            }

            _context.t0 = evt;
            _context.next = _context.t0 === 'add' ? 8 : _context.t0 === 'change' ? 8 : _context.t0 === 'unlink' ? 18 : 21;
            break;

          case 8:
            _context.next = 10;
            return _fsPromise2.default.exists(file);

          case 10:
            if (!_context.sent) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return _fsPromise2.default.copy(file, outputFile);

          case 13:
            _context.next = 17;
            break;

          case 15:
            _context.next = 17;
            return _fsPromise2.default.writeFile(outputFile, file);

          case 17:
            return _context.abrupt('break', 21);

          case 18:
            _context.next = 20;
            return _fsPromise2.default.remove(outputFile);

          case 20:
            return _context.abrupt('break', 21);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function buildAsset(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _config = require('../utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }