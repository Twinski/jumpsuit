'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStyles = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var buildStyles = exports.buildStyles = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(evt, file) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentResolve && currentResolve();
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              currentResolve = resolve;
              stylesActionDebounced(evt, file, function (err, css) {
                if (err) return reject(err);
                _fs2.default.writeFile(outputFile, css, function (err) {
                  if (err) return reject(err);
                  if (process.env.NODE_ENV === 'development') {
                    (0, _serve.socketMessage)({
                      type: 'styles',
                      url: fileName
                    });
                  }
                  resolve();
                  currentResolve = null;
                });
              });
            }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function buildStyles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../utils/config');

var _serve = require('../cmds/serve');

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var outputDir = _config.CONFIG.outputDir;
var styles = _config.CONFIG.styles;

var fileName = 'app.css';
var outputFile = _path2.default.resolve(outputDir, fileName);

var currentResolve = void 0;

var stylesActionDebounced = styles ? (0, _common.debounce)(doStyles, { wait: 300 }) : function () {};

function doStyles(file, evt, cb) {
  var res = styles.action(file, evt);
  if (res.then) {
    return res.then(function (url) {
      return cb(null, url);
    }).catch(cb);
  }
  return res;
}