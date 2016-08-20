'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _emit = require('../utils/emit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var name, template, destination, pkgFile, pkg, child;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _emit.outputLogo)();

            _context.t0 = argv._[1];

            if (_context.t0) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return _inquirer2.default.prompt([{
              type: 'input',
              message: (0, _emit.question)('Enter a name for your app:'),
              name: 'name',
              validate: function validate(val) {
                if (!val) {
                  return (0, _emit.questionErr)('Please enter a name!');
                }
                if (_fsExtra2.default.existsSync(_path2.default.resolve(val))) {
                  return (0, _emit.questionErr)('A folder with that name already exists here!');
                }
                return true;
              }
            }]);

          case 5:
            _context.t0 = _context.sent.name;

          case 6:
            name = _context.t0;
            template = _path2.default.resolve(__dirname, '../../getting-started');
            destination = _path2.default.resolve(name);


            (0, _emit.log)('Creating new project');
            _fsExtra2.default.copySync(template, destination);

            pkgFile = destination + '/package.json';
            pkg = _fsExtra2.default.readJsonSync(pkgFile);

            pkg.name = name;

            _fsExtra2.default.outputJsonSync(pkgFile, pkg);

            (0, _emit.log)('Installing dependencies\n');
            child = (0, _crossSpawn2.default)('npm', ['install'], {
              cwd: destination,
              stdio: 'inherit'
            });


            child.on('close', function (code) {
              (0, _emit.log)('Your new project is ready to go!');
              (0, _emit.log)('Run ' + _chalk2.default.green('cd', name, '&& jumpsuit watch') + ' to get started.\n');

              process.exit(code);
            });

          case 18:
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