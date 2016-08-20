'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.initBundle = initBundle;
exports.buildJs = buildJs;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _forgetify = require('forgetify');

var _forgetify2 = _interopRequireDefault(_forgetify);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _looseEnvify = require('loose-envify');

var _looseEnvify2 = _interopRequireDefault(_looseEnvify);

var _uglifyify = require('uglifyify');

var _uglifyify2 = _interopRequireDefault(_uglifyify);

var _aliasify = require('aliasify');

var _aliasify2 = _interopRequireDefault(_aliasify);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _exorcist = require('exorcist');

var _exorcist2 = _interopRequireDefault(_exorcist);

var _common = require('../utils/common');

var _deptree = require('../utils/deptree');

var _serve = require('../cmds/serve');

var _config = require('../utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectNodeModsDir = _path2.default.resolve('node_modules');

var bundler = void 0;
function initBundle() {
  var b = (0, _browserify2.default)({
    plugin: [_forgetify2.default],
    paths: [_path2.default.resolve('node_modules'), _config.CONFIG.sourceDir],
    debug: process.env.NODE_ENV === 'development' || _config.CONFIG.prodSourceMaps,
    cache: {}, packageCache: {},
    insertGlobalVars: Object.assign(_config.CONFIG.browserify.globals, {
      React: function React(file, basedir) {
        return 'require("' + _resolve2.default.sync('react', { basedir: projectNodeModsDir }) + '")';
      }
    })
  });

  b.transform(_babelify2.default, {
    presets: [_resolve2.default.sync('babel-preset-es2015', { basedir: __dirname }), _resolve2.default.sync('babel-preset-react', { basedir: __dirname }), _resolve2.default.sync('babel-preset-stage-2', { basedir: __dirname })]
  });

  b.transform({
    global: true
  }, _looseEnvify2.default);

  if (process.env.NODE_ENV === 'production') {
    b.transform({
      global: true,
      sourcemap: _config.CONFIG.prodSourceMaps
    }, _uglifyify2.default);
  }

  _config.CONFIG.browserify.transforms.forEach(function (t) {
    if (typeof t === 'string') {
      b.transform(_resolve2.default.sync(t, { basedir: process.cwd() }));
    } else if ((typeof t === 'undefined' ? 'undefined' : (0, _typeof3.default)(t)) === 'object' && t.transform) {
      b.transform(t.transform, t.options);
    }
  });

  b.transform(_aliasify2.default, {
    global: true,
    aliases: {
      'react': _path2.default.resolve(_resolve2.default.sync('react', { basedir: projectNodeModsDir }), '../')
    }
  });

  return b;
}

var createBundle = (0, _common.debounce)(function (cb) {
  var file = _path2.default.resolve(_config.CONFIG.outputDir, _path2.default.basename(_config.CONFIG.entry));

  var sourceMapFile = _path2.default.basename(_config.CONFIG.entry).split('.');
  sourceMapFile.splice(sourceMapFile.length - 1, 0, 'map');
  sourceMapFile = sourceMapFile.join('.');

  var stream = _fsExtra2.default.createWriteStream(file).on('error', cb).on('finish', function () {
    if (process.env.NODE_ENV === 'production') {
      var code = _fsExtra2.default.readFileSync(file, 'utf8');
      var newCode = _uglifyJs2.default.minify(code, {
        outSourceMap: _config.CONFIG.prodSourceMaps ? sourceMapFile : undefined,
        fromString: true
      });
      _fsExtra2.default.writeFileSync(file, newCode.code);
      return;
    }

    (0, _serve.socketMessage)({
      type: 'refresh'
    });
  });

  if (process.env.NODE_ENV === 'production' && _config.CONFIG.prodSourceMaps) {
    bundler.bundle(function (err) {
      if (err) cb(err);else cb();
    }).pipe((0, _exorcist2.default)(_path2.default.resolve(_config.CONFIG.outputDir, sourceMapFile))).pipe(stream);
  } else {
    bundler.bundle(function (err) {
      if (err) cb(err);else cb();
    }).pipe(stream);
  }
}, { wait: 300 });

var firstRun = true;
var entries = new Set();

function buildJs(evt, file) {
  return new Promise(function (resolve, reject) {
    if (!bundler) bundler = initBundle();

    if (firstRun && !file.match(new RegExp(_config.CONFIG.entry + '$'))) {
      return resolve();
    }

    var invalidate = new Set([file]);

    if (_deptree.depTree[file]) {
      _deptree.depTree[file].forEach(function (f) {
        return invalidate.add(f);
      });
    }

    _config.CONFIG.browserify.rebundles.forEach(function (f) {
      if ((0, _minimatch2.default)(file, f.match)) {
        invalidate.add(_path2.default.resolve(f.file));
      }
    });

    invalidate.forEach(function (f) {
      return _forgetify2.default.forget(bundler, f);
    });

    if (!entries.has(file)) {
      entries.add(file);
      bundler.add(file);
    }

    createBundle(function (err) {
      if (err) reject(err);else resolve();

      firstRun = false;
    });
  });
}