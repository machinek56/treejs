/*!
 * treejs
 * @version 1.8.0
 * @see https://github.com/daweilv/treejs
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tree"] = factory();
	else
		root["Tree"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function uniq(arr) {
  var map = {};
  return arr.reduce(function (acc, item) {
    if (!map[item]) {
      map[item] = true;
      acc.push(item);
    }

    return acc;
  }, []);
}

function empty(ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
}

function animation(duration, callback) {
  requestAnimationFrame(function () {
    callback.enter();
    requestAnimationFrame(function () {
      callback.active();
      setTimeout(function () {
        callback.leave();
      }, duration);
    });
  });
}

function findIndexEl(id, array) {
  return array.findIndex(function (item) {
    return item.id === id;
  });
}

function Tree(container, options) {
  var defaultOptions = {
    selectMode: 'checkbox',
    values: [],
    disables: [],
    closeDepth: null
  };
  this.treeNodes = [];
  this.nodesById = {};
  this.leafNodesById = {};
  this.liElementsById = {};
  this.willUpdateNodesById = {};
  this.container = container;
  this.options = Object.assign(defaultOptions, options);
  this.myValues = [];
  Object.defineProperties(this, {
    values: {
      get: function get() {
        return this.getValues();
      },
      set: function set(values) {
        return this.setValues(uniq(values));
      }
    },
    disables: {
      get: function get() {
        return this.getDisables();
      },
      set: function set(values) {
        return this.setDisables(uniq(values));
      }
    },
    selectedNodes: {
      get: function get() {
        var nodes = [];
        var nodesById = this.nodesById;

        for (var id in nodesById) {
          if (nodesById.hasOwnProperty(id) && (nodesById[id].status === 1 || nodesById[id].status === 2)) {
            var node = Object.assign({}, nodesById[id]);
            delete node.parent;
            delete node.children;
            nodes.push(node);
          }
        }

        return nodes;
      }
    },
    disabledNodes: {
      get: function get() {
        var nodes = [];
        var nodesById = this.nodesById;

        for (var id in nodesById) {
          if (nodesById.hasOwnProperty(id) && nodesById[id].disabled) {
            var node = Object.assign({}, nodesById[id]);
            delete node.parent;
            nodes.push(node);
          }
        }

        return nodes;
      }
    }
  });
  this.init(this.options.data);
}

Tree.prototype.init = function (data) {
  console.time('init');

  var _Tree$parseTreeData = Tree.parseTreeData(data),
      treeNodes = _Tree$parseTreeData.treeNodes,
      nodesById = _Tree$parseTreeData.nodesById,
      leafNodesById = _Tree$parseTreeData.leafNodesById,
      defaultValues = _Tree$parseTreeData.defaultValues,
      defaultDisables = _Tree$parseTreeData.defaultDisables;

  this.treeNodes = treeNodes;
  this.nodesById = nodesById;
  this.leafNodesById = leafNodesById;
  this.render(this.treeNodes);
  var _this$options = this.options,
      values = _this$options.values,
      disables = _this$options.disables;
  if (values && values.length) defaultValues = values;
  defaultValues.length && this.setValues(defaultValues);
  if (disables && disables.length) defaultDisables = disables;
  defaultDisables.length && this.setDisables(defaultDisables);
  console.timeEnd('init');
};

Tree.prototype.render = function (treeNodes) {
  var treeEle = Tree.createRootEle();
  treeEle.appendChild(this.buildTree(treeNodes, 0));
  this.bindEvent(treeEle);
  var ele = document.querySelector(this.container);
  empty(ele);
  ele.appendChild(treeEle);
};

Tree.prototype.buildTree = function (nodes, depth) {
  var _this = this;

  var rootUlEle = Tree.createUlEle();

  if (nodes && nodes.length) {
    nodes.forEach(function (node) {
      var liEle = Tree.createLiEle(node, !node.open // open subtree or not
      );
      _this.liElementsById[node.id] = liEle;
      var ulEle = null;

      if (node.children && node.children.length) {
        ulEle = _this.buildTree(node.children, depth + 1);
      }

      ulEle && liEle.appendChild(ulEle);
      rootUlEle.appendChild(liEle);
    });
  }

  return rootUlEle;
};

Tree.prototype.bindEvent = function (ele) {
  var _this2 = this;

  ele.addEventListener('click', function (e) {
    var target = e.target;

    if (target.nodeName === 'SPAN' && (target.classList.contains('treejs-checkbox') || target.classList.contains('treejs-label'))) {
      _this2.onItemClick(target.parentNode.nodeId);
    } else if (target.nodeName === 'LI' && target.classList.contains('treejs-node')) {
      _this2.onItemClick(target.nodeId);
    } else if (target.nodeName === 'SPAN' && target.classList.contains('treejs-switcher')) {
      _this2.onSwitcherClick(target);
    }
  }, false);
};

Tree.prototype.onItemClick = function (id) {
  console.time('onItemClick');
  var node = this.nodesById[id];
  var onChange = this.options.onChange;

  if (!node.disabled) {
    this.setValue(id);
    this.updateLiElements();
  }

  onChange && onChange.call(this, {
    name: node.name,
    id: node.id,
    checked: node.status === 2
  });
  console.timeEnd('onItemClick');
};

Tree.prototype.setValue = function (value) {
  var node = this.nodesById[value];
  if (!node) return;
  var prevStatus = node.status;
  var status = prevStatus === 1 || prevStatus === 2 ? 0 : 2;
  node.status = status;

  if (node.status !== 0) {
    this.myValues.push({
      name: node.name,
      id: node.id
    });
  } else {
    this.myValues.splice(findIndexEl(node.id, this.myValues), 1);
  }

  this.markWillUpdateNode(node);
  this.walkUp(node, 'status');
  this.walkDown(node, 'status');
};

Tree.prototype.getValues = function () {
  var values = [];

  for (var id in this.leafNodesById) {
    if (this.leafNodesById.hasOwnProperty(id)) {
      if (this.leafNodesById[id].status === 1 || this.leafNodesById[id].status === 2) {
        values.push(id);
      }
    }
  }

  return values;
};

Tree.prototype.setValues = function (values) {
  var _this3 = this;

  this.emptyNodesCheckStatus();
  values.forEach(function (value) {
    _this3.setValue(value);
  });
  this.updateLiElements();
  var onChange = this.options.onChange;
  onChange && onChange.call(this);
};

Tree.prototype.setDisable = function (value) {
  var node = this.nodesById[value];
  if (!node) return;
  var prevDisabled = node.disabled;

  if (!prevDisabled) {
    node.disabled = true;
    this.markWillUpdateNode(node);
    this.walkUp(node, 'disabled');
    this.walkDown(node, 'disabled');
  }
};

Tree.prototype.getDisables = function () {
  var values = [];

  for (var id in this.leafNodesById) {
    if (this.leafNodesById.hasOwnProperty(id)) {
      if (this.leafNodesById[id].disabled) {
        values.push(id);
      }
    }
  }

  return values;
};

Tree.prototype.setDisables = function (values) {
  var _this4 = this;

  this.emptyNodesDisable();
  values.forEach(function (value) {
    _this4.setDisable(value);
  });
  this.updateLiElements();
};

Tree.prototype.emptyNodesCheckStatus = function () {
  this.willUpdateNodesById = this.getSelectedNodesById();
  Object.values(this.willUpdateNodesById).forEach(function (node) {
    if (!node.disabled) node.status = 0;
  });
};

Tree.prototype.emptyNodesDisable = function () {
  this.willUpdateNodesById = this.getDisabledNodesById();
  Object.values(this.willUpdateNodesById).forEach(function (node) {
    node.disabled = false;
  });
};

Tree.prototype.getSelectedNodesById = function () {
  return Object.entries(this.nodesById).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        node = _ref2[1];

    if (node.status === 1 || node.status === 2) {
      acc[id] = node;
    }

    return acc;
  }, {});
};

Tree.prototype.getDisabledNodesById = function () {
  return Object.entries(this.nodesById).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        id = _ref4[0],
        node = _ref4[1];

    if (node.disabled) {
      acc[id] = node;
    }

    return acc;
  }, {});
};

Tree.prototype.updateLiElements = function () {
  var _this5 = this;

  Object.values(this.willUpdateNodesById).forEach(function (node) {
    _this5.updateLiElement(node);
  });
  this.willUpdateNodesById = {};
};

Tree.prototype.markWillUpdateNode = function (node) {
  this.willUpdateNodesById[node.id] = node;
};

Tree.prototype.onSwitcherClick = function (target) {
  var liEle = target.parentNode;
  var ele = liEle.lastChild;
  var height = ele.scrollHeight;

  if (liEle.classList.contains('treejs-node__close')) {
    animation(150, {
      enter: function enter() {
        ele.style.height = 0;
        ele.style.opacity = 0;
      },
      active: function active() {
        ele.style.height = "".concat(height, "px");
        ele.style.opacity = 1;
      },
      leave: function leave() {
        ele.style.height = '';
        ele.style.opacity = '';
        liEle.classList.remove('treejs-node__close');
      }
    });
  } else {
    animation(150, {
      enter: function enter() {
        ele.style.height = "".concat(height, "px");
        ele.style.opacity = 1;
      },
      active: function active() {
        ele.style.height = 0;
        ele.style.opacity = 0;
      },
      leave: function leave() {
        ele.style.height = '';
        ele.style.opacity = '';
        liEle.classList.add('treejs-node__close');
      }
    });
  }
};

Tree.prototype.walkUp = function (node, changeState) {
  var parent = node.parent;

  if (parent) {
    if (changeState === 'status') {
      var pStatus = null;
      var statusCount = parent.children.reduce(function (acc, child) {
        if (!isNaN(child.status)) return acc + child.status;
        return acc;
      }, 0);

      if (statusCount) {
        pStatus = statusCount === parent.children.length * 2 ? 2 : 1;
      } else {
        pStatus = 0;
      }

      if (parent.status === pStatus) return;
      parent.status = pStatus;
    } else {
      var pDisabled = parent.children.reduce(function (acc, child) {
        return acc && child.disabled;
      }, true);
      if (parent.disabled === pDisabled) return;
      parent.disabled = pDisabled;
    }

    this.markWillUpdateNode(parent);
    this.walkUp(parent, changeState);
  }
};

Tree.prototype.walkDown = function (node, changeState) {
  var _this6 = this;

  if (node.children && node.children.length) {
    node.children.forEach(function (child) {
      if (changeState === 'status' && child.disabled) return;
      child[changeState] = node[changeState];

      _this6.markWillUpdateNode(child);

      _this6.walkDown(child, changeState);
    });
  }
};

Tree.prototype.updateLiElement = function (node) {
  var classList = this.liElementsById[node.id].classList;

  switch (node.status) {
    case 0:
      classList.remove('treejs-node__halfchecked', 'treejs-node__checked');
      break;

    case 1:
      classList.remove('treejs-node__checked');
      classList.add('treejs-node__halfchecked');
      break;

    case 2:
      classList.remove('treejs-node__halfchecked');
      classList.add('treejs-node__checked');
      break;
  }

  switch (node.disabled) {
    case true:
      if (!classList.contains('treejs-node__disabled')) classList.add('treejs-node__disabled');
      break;

    case false:
      if (classList.contains('treejs-node__disabled')) classList.remove('treejs-node__disabled');
      break;
  }
};

Tree.parseTreeData = function (data) {
  var treeNodes = deepClone(data);
  var nodesById = {};
  var leafNodesById = {};
  var values = [];
  var disables = [];

  var walkTree = function walkTree(nodes, parent) {
    nodes.forEach(function (node) {
      nodesById[node.id] = node;
      if (node.checked) values.push(node.id);
      if (node.disabled) disables.push(node.id);
      if (parent) node.parent = parent;

      if (node.children && node.children.length) {
        walkTree(node.children, node);
      } else {
        leafNodesById[node.id] = node;
      }
    });
  };

  walkTree(treeNodes);
  return {
    treeNodes: treeNodes,
    nodesById: nodesById,
    leafNodesById: leafNodesById,
    defaultValues: values,
    defaultDisables: disables
  };
};

Tree.createRootEle = function () {
  var div = document.createElement('div');
  div.classList.add('treejs');
  return div;
};

Tree.createUlEle = function () {
  var ul = document.createElement('ul');
  ul.classList.add('treejs-nodes');
  return ul;
};

Tree.createLiEle = function (node, closed) {
  var li = document.createElement('li');
  li.classList.add('treejs-node');
  if (closed) li.classList.add('treejs-node__close');

  if (node.children && node.children.length) {
    var switcher = document.createElement('span');
    switcher.classList.add('treejs-switcher');
    li.appendChild(switcher);
  } else {
    li.classList.add('treejs-placeholder');
  }

  var checkbox = document.createElement('span');
  checkbox.classList.add('treejs-checkbox');
  checkbox.dataset.id = node.id;
  checkbox.value = node.name;
  li.appendChild(checkbox);
  var label = document.createElement('span');
  label.classList.add('treejs-label');
  var text = document.createTextNode(node.name);
  label.appendChild(text);
  li.appendChild(label);
  li.nodeId = node.id;
  return li;
};

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=tree.js.map