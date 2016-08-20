"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToDepTree = addToDepTree;
var depTree = exports.depTree = {};

function addToDepTree(file, dep) {
  depTree[file] = depTree[file] || [];
  depTree[file].push(dep);
}