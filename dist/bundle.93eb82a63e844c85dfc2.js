/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 146);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(52);
} else {}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(61)();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(65);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(58);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function warning() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/resolve-pathname/index.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
} // About 1.5x faster than the two-arg version of Array#splice()


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
} // This implementation is based heavily on node's url.parse


function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';
  var hasTrailingSlash = void 0;

  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;

  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }
  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
  var result = fromParts.join('/');
  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
  return result;
}

/* harmony default export */ var resolve_pathname = (resolvePathname);
// CONCATENATED MODULE: ./node_modules/value-equal/index.js
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

function valueEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);
  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();
    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ var value_equal = (valueEqual);
// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';

function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/* harmony default export */ var tiny_invariant_esm = (invariant);
// CONCATENATED MODULE: ./node_modules/history/esm/history.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createBrowserHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createHashHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createMemoryHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return locationsAreEqual; });
/* unused harmony export parsePath */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createPath; });
function history_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { history_typeof = function _typeof(obj) { return typeof obj; }; } else { history_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return history_typeof(obj); }







function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}

function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}

function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
}

function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}

function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}

function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = Object(esm_extends["a" /* default */])({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && value_equal(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     false ? undefined : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? undefined : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */


function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */


function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */


function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */


function isExtraneousPopstateEvent(event) {
  event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');
  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    return '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? undefined : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     false ? undefined : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var bind = __webpack_require__(32);

var isBuffer = __webpack_require__(66);
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (_typeof(obj) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && _typeof(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (_typeof(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/BrowserRouter.js
var BrowserRouter = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__(6);
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/history/esm/history.js + 3 modules
var esm_history = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Router.js
var Router = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/HashRouter.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter_HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(esm_history["b" /* createHashHistory */])(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    warning_default()(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.");
  };

  HashRouter.prototype.render = function render() {
    return react_default.a.createElement(Router["a" /* default */], {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(react_default.a.Component);

HashRouter_HashRouter.propTypes = {
  basename: prop_types_default.a.string,
  getUserConfirmation: prop_types_default.a.func,
  hashType: prop_types_default.a.oneOf(["hashbang", "noslash", "slash"]),
  children: prop_types_default.a.node
};
/* harmony default export */ var es_HashRouter = (HashRouter_HashRouter);
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var Link = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/react-router/es/Router.js
var es_Router = __webpack_require__(13);

// CONCATENATED MODULE: ./node_modules/react-router/es/MemoryRouter.js
function MemoryRouter_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MemoryRouter_typeof = function _typeof(obj) { return typeof obj; }; } else { MemoryRouter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MemoryRouter_typeof(obj); }

function MemoryRouter_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function MemoryRouter_possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (MemoryRouter_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function MemoryRouter_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + MemoryRouter_typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter_MemoryRouter = function (_React$Component) {
  MemoryRouter_inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    MemoryRouter_classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = MemoryRouter_possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(esm_history["d" /* createMemoryHistory */])(_this.props), _temp), MemoryRouter_possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    warning_default()(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
  };

  MemoryRouter.prototype.render = function render() {
    return react_default.a.createElement(es_Router["a" /* default */], {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(react_default.a.Component);

MemoryRouter_MemoryRouter.propTypes = {
  initialEntries: prop_types_default.a.array,
  initialIndex: prop_types_default.a.number,
  getUserConfirmation: prop_types_default.a.func,
  keyLength: prop_types_default.a.number,
  children: prop_types_default.a.node
};
/* harmony default export */ var es_MemoryRouter = (MemoryRouter_MemoryRouter);
// CONCATENATED MODULE: ./node_modules/react-router-dom/es/MemoryRouter.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var react_router_dom_es_MemoryRouter = (es_MemoryRouter);
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/NavLink.js
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var NavLink_typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}





/**
 * A <Link> wrapper that knows if it's "active" or not.
 */

var NavLink_NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref["aria-current"],
      rest = _objectWithoutProperties(_ref, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]);

  var path = (typeof to === "undefined" ? "undefined" : NavLink_typeof(to)) === "object" ? to.pathname : to; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

  var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  return react_default.a.createElement(Route["a" /* default */], {
    path: escapedPath,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;
      var isActive = !!(getIsActive ? getIsActive(match, location) : match);
      return react_default.a.createElement(Link["a" /* default */], _extends({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(" ") : className,
        style: isActive ? _extends({}, style, activeStyle) : style,
        "aria-current": isActive && ariaCurrent || null
      }, rest));
    }
  });
};

NavLink_NavLink.propTypes = {
  to: Link["a" /* default */].propTypes.to,
  exact: prop_types_default.a.bool,
  strict: prop_types_default.a.bool,
  location: prop_types_default.a.object,
  activeClassName: prop_types_default.a.string,
  className: prop_types_default.a.string,
  activeStyle: prop_types_default.a.object,
  style: prop_types_default.a.object,
  isActive: prop_types_default.a.func,
  "aria-current": prop_types_default.a.oneOf(["page", "step", "location", "date", "time", "true"])
};
NavLink_NavLink.defaultProps = {
  activeClassName: "active",
  "aria-current": "page"
};
/* harmony default export */ var es_NavLink = (NavLink_NavLink);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(5);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./node_modules/react-router/es/Prompt.js
function Prompt_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Prompt_typeof = function _typeof(obj) { return typeof obj; }; } else { Prompt_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Prompt_typeof(obj); }

function Prompt_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function Prompt_possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (Prompt_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function Prompt_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + Prompt_typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}




/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt_Prompt = function (_React$Component) {
  Prompt_inherits(Prompt, _React$Component);

  function Prompt() {
    Prompt_classCallCheck(this, Prompt);

    return Prompt_possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();
    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    browser_default()(this.context.router, "You should not use <Prompt> outside a <Router>");
    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(react_default.a.Component);

Prompt_Prompt.propTypes = {
  when: prop_types_default.a.bool,
  message: prop_types_default.a.oneOfType([prop_types_default.a.func, prop_types_default.a.string]).isRequired
};
Prompt_Prompt.defaultProps = {
  when: true
};
Prompt_Prompt.contextTypes = {
  router: prop_types_default.a.shape({
    history: prop_types_default.a.shape({
      block: prop_types_default.a.func.isRequired
    }).isRequired
  }).isRequired
};
/* harmony default export */ var es_Prompt = (Prompt_Prompt);
// CONCATENATED MODULE: ./node_modules/react-router-dom/es/Prompt.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var react_router_dom_es_Prompt = (es_Prompt);
// EXTERNAL MODULE: ./node_modules/react-router/es/Redirect.js
var Redirect = __webpack_require__(49);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/Redirect.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var es_Redirect = (Redirect["a" /* default */]);
// CONCATENATED MODULE: ./node_modules/react-router/es/StaticRouter.js
function StaticRouter_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { StaticRouter_typeof = function _typeof(obj) { return typeof obj; }; } else { StaticRouter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return StaticRouter_typeof(obj); }

var StaticRouter_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function StaticRouter_objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function StaticRouter_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function StaticRouter_possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (StaticRouter_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function StaticRouter_inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + StaticRouter_typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}








var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;
  return StaticRouter_extends({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;
  var base = addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return StaticRouter_extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var StaticRouter_createURL = function createURL(location) {
  return typeof location === "string" ? location : Object(esm_history["e" /* createPath */])(location);
};

var StaticRouter_staticHandler = function staticHandler(methodName) {
  return function () {
    browser_default()(false, "You cannot %s with <StaticRouter>", methodName);
  };
};

var noop = function noop() {};
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var StaticRouter_StaticRouter = function (_React$Component) {
  StaticRouter_inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    StaticRouter_classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = StaticRouter_possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return addLeadingSlash(_this.props.basename + StaticRouter_createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;
      context.action = "PUSH";
      context.location = addBasename(basename, Object(esm_history["c" /* createLocation */])(location));
      context.url = StaticRouter_createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;
      context.action = "REPLACE";
      context.location = addBasename(basename, Object(esm_history["c" /* createLocation */])(location));
      context.url = StaticRouter_createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), StaticRouter_possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    warning_default()(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.");
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = StaticRouter_objectWithoutProperties(_props, ["basename", "context", "location"]);

    var history = {
      createHref: this.createHref,
      action: "POP",
      location: stripBasename(basename, Object(esm_history["c" /* createLocation */])(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: StaticRouter_staticHandler("go"),
      goBack: StaticRouter_staticHandler("goBack"),
      goForward: StaticRouter_staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return react_default.a.createElement(es_Router["a" /* default */], StaticRouter_extends({}, props, {
      history: history
    }));
  };

  return StaticRouter;
}(react_default.a.Component);

StaticRouter_StaticRouter.propTypes = {
  basename: prop_types_default.a.string,
  context: prop_types_default.a.object.isRequired,
  location: prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.object])
};
StaticRouter_StaticRouter.defaultProps = {
  basename: "",
  location: "/"
};
StaticRouter_StaticRouter.childContextTypes = {
  router: prop_types_default.a.object.isRequired
};
/* harmony default export */ var es_StaticRouter = (StaticRouter_StaticRouter);
// CONCATENATED MODULE: ./node_modules/react-router-dom/es/StaticRouter.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var react_router_dom_es_StaticRouter = (es_StaticRouter);
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/react-router/es/generatePath.js
var generatePath = __webpack_require__(16);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/generatePath.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var es_generatePath = (generatePath["a" /* default */]);
// EXTERNAL MODULE: ./node_modules/react-router/es/matchPath.js
var matchPath = __webpack_require__(14);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/matchPath.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var es_matchPath = (matchPath["a" /* default */]);
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(47);

// CONCATENATED MODULE: ./node_modules/react-router-dom/es/index.js
/* concated harmony reexport BrowserRouter */__webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return BrowserRouter["a" /* default */]; });
/* concated harmony reexport HashRouter */__webpack_require__.d(__webpack_exports__, "HashRouter", function() { return es_HashRouter; });
/* concated harmony reexport Link */__webpack_require__.d(__webpack_exports__, "Link", function() { return Link["a" /* default */]; });
/* concated harmony reexport MemoryRouter */__webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return react_router_dom_es_MemoryRouter; });
/* concated harmony reexport NavLink */__webpack_require__.d(__webpack_exports__, "NavLink", function() { return es_NavLink; });
/* concated harmony reexport Prompt */__webpack_require__.d(__webpack_exports__, "Prompt", function() { return react_router_dom_es_Prompt; });
/* concated harmony reexport Redirect */__webpack_require__.d(__webpack_exports__, "Redirect", function() { return es_Redirect; });
/* concated harmony reexport Route */__webpack_require__.d(__webpack_exports__, "Route", function() { return Route["a" /* default */]; });
/* concated harmony reexport Router */__webpack_require__.d(__webpack_exports__, "Router", function() { return Router["a" /* default */]; });
/* concated harmony reexport StaticRouter */__webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return react_router_dom_es_StaticRouter; });
/* concated harmony reexport Switch */__webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch["a" /* default */]; });
/* concated harmony reexport generatePath */__webpack_require__.d(__webpack_exports__, "generatePath", function() { return es_generatePath; });
/* concated harmony reexport matchPath */__webpack_require__.d(__webpack_exports__, "matchPath", function() { return es_matchPath; });
/* concated harmony reexport withRouter */__webpack_require__.d(__webpack_exports__, "withRouter", function() { return withRouter["a" /* default */]; });





























/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if ( true && _typeof(__webpack_require__(42)) === 'object' && __webpack_require__(42)) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_router_es_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
// Written in this round about way for babel-transform-imports

/* harmony default export */ __webpack_exports__["a"] = (react_router_es_Router__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}





/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;
    invariant__WEBPACK_IMPORTED_MODULE_1___default()(children == null || react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.count(children) === 1, "A <Router> may have only one child element"); // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.

    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(this.props.history === nextProps.history, "You cannot change <Router history>");
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;
    return children ? react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children) : null;
  };

  return Router;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Router.propTypes = {
  history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
};
Router.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
Router.childContextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
  if (cache[pattern]) return cache[pattern];
  var keys = [];
  var re = path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default()(pattern, keys, options);
  var compiledPattern = {
    re: re,
    keys: keys
  };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};
/**
 * Public API for matching a URL pathname to a path pattern.
 */


var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments[2];
  if (typeof options === "string") options = {
    path: options
  };
  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;
  if (path == null) return parent;

  var _compilePath = compilePath(path, {
    end: exact,
    strict: strict,
    sensitive: sensitive
  }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);
  if (!match) return null;
  var url = match[0],
      values = match.slice(1);
  var isExact = pathname === url;
  if (exact && !isExact) return null;
  return {
    path: path,
    // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url,
    // the matched portion of the URL
    isExact: isExact,
    // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

/* harmony default export */ __webpack_exports__["a"] = (matchPath);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;

          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ["replace", "to", "innerRef"]); // eslint-disable-line no-unused-vars


    invariant__WEBPACK_IMPORTED_MODULE_2___default()(this.context.router, "You should not use <Link> outside a <Router>");
    invariant__WEBPACK_IMPORTED_MODULE_2___default()(to !== undefined, 'You must specify the "to" property');
    var history = this.context.router.history;
    var location = typeof to === "string" ? Object(history__WEBPACK_IMPORTED_MODULE_3__[/* createLocation */ "c"])(to, null, null, history.location) : to;
    var href = history.createHref(location);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", _extends({}, props, {
      onClick: this.handleClick,
      href: href,
      ref: innerRef
    }));
  };

  return Link;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Link.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  target: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  to: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired,
  innerRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      createHref: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
    }).isRequired
  }).isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compileGenerator = function compileGenerator(pattern) {
  var cacheKey = pattern;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
  if (cache[pattern]) return cache[pattern];
  var compiledGenerator = path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default.a.compile(pattern);

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledGenerator;
    cacheCount++;
  }

  return compiledGenerator;
};
/**
 * Public API for generating a URL pathname from a pattern and parameters.
 */


var generatePath = function generatePath() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (pattern === "/") {
    return pattern;
  }

  var generator = compileGenerator(pattern);
  return generator(params, {
    pretty: true
  });
};

/* harmony default export */ __webpack_exports__["a"] = (generatePath);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "699882dfbfd07653ba90a9f5ff0c3c67.png";

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_router_es_Route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
// Written in this round about way for babel-transform-imports

/* harmony default export */ __webpack_exports__["a"] = (react_router_es_Route__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3fd6e969252e9a3bfe045e4b3f87c172.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('='); // skip things that don't look like key=value

    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim(); // quoted values

    if ('"' == val[0]) {
      val = val.slice(1, -1);
    } // only assign once


    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */


function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;

      case 'lax':
        str += '; SameSite=Lax';
        break;

      case 'strict':
        str += '; SameSite=Strict';
        break;

      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */


function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _matchPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







var isEmptyChildren = function isEmptyChildren(children) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.count(children) === 0;
};
/**
 * The public API for matching a single path and rendering.
 */


var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;
    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    invariant__WEBPACK_IMPORTED_MODULE_1___default()(router, "You should not use <Route> or withRouter() outside a <Router>");
    var route = router.route;
    var pathname = (location || route.location).pathname;
    return Object(_matchPath__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(pathname, {
      path: path,
      strict: strict,
      exact: exact,
      sensitive: sensitive
    }, route.match);
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored");
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored");
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored");
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;
    var location = this.props.location || route.location;
    var props = {
      match: match,
      location: location,
      history: history,
      staticContext: staticContext
    };
    if (component) return match ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(component, props) : null;
    if (render) return match ? render(props) : null;
    if (typeof children === "function") return children(props);
    if (children && !isEmptyChildren(children)) return react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children);
    return null;
  };

  return Route;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Route.propTypes = {
  computedMatch: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
  // private, from <Switch>
  path: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  exact: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  strict: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  sensitive: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  render: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]),
  location: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
Route.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
    route: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
  })
};
Route.childContextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (Route);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isarray = __webpack_require__(93);
/**
 * Expose `pathToRegexp`.
 */


module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(63);
} else {}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if (false) {}

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(53);
} else {}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var ReactIs = __webpack_require__(25);

var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
  if (ReactIs.isMemo(component)) {
    return MEMO_STATICS;
  }

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }

    return targetComponent;
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23), __webpack_require__(64)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(108),
    isObject = __webpack_require__(24);
/** Error message constants. */


var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */

function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(8);

var normalizeHeaderName = __webpack_require__(72);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter; // Only Node.JS has a process variable that is of [[Class]] process

  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(36);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(36);
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(71)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

var settle = __webpack_require__(73);

var buildURL = __webpack_require__(33);

var parseHeaders = __webpack_require__(75);

var isURLSameOrigin = __webpack_require__(76);

var createError = __webpack_require__(37);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(77); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (config.withCredentials) {
      request.withCredentials = true;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(74);
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "648312560e1fd5ebf660c829446a7a4b.png";

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__[/* createBrowserHistory */ "a"])(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.");
  };

  BrowserRouter.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Router__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

BrowserRouter.propTypes = {
  basename: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  forceRefresh: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  keyLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
};
/* harmony default export */ __webpack_exports__["a"] = (BrowserRouter);

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "df4be8b1e377c81f6879d9b213a41267.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var freeGlobal = __webpack_require__(110);
/** Detect free variable `self`. */


var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(44);
/** Built-in value references. */


var _Symbol = root.Symbol;
module.exports = _Symbol;

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__(6);
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);

// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(5);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/react-router/es/matchPath.js
var matchPath = __webpack_require__(14);

// CONCATENATED MODULE: ./node_modules/react-router/es/Switch.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch_Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    browser_default()(this.context.router, "You should not use <Switch> outside a <Router>");
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning_default()(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
    warning_default()(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;
    var location = this.props.location || route.location;
    var match = void 0,
        child = void 0;
    react_default.a.Children.forEach(children, function (element) {
      if (match == null && react_default.a.isValidElement(element)) {
        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;
        var path = pathProp || from;
        child = element;
        match = Object(matchPath["a" /* default */])(location.pathname, {
          path: path,
          exact: exact,
          strict: strict,
          sensitive: sensitive
        }, route.match);
      }
    });
    return match ? react_default.a.cloneElement(child, {
      location: location,
      computedMatch: match
    }) : null;
  };

  return Switch;
}(react_default.a.Component);

Switch_Switch.contextTypes = {
  router: prop_types_default.a.shape({
    route: prop_types_default.a.object.isRequired
  }).isRequired
};
Switch_Switch.propTypes = {
  children: prop_types_default.a.node,
  location: prop_types_default.a.object
};
/* harmony default export */ var es_Switch = (Switch_Switch);
// CONCATENATED MODULE: ./node_modules/react-router-dom/es/Switch.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var react_router_dom_es_Switch = __webpack_exports__["a"] = (es_Switch);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-router/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(50);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/react-router/es/Route.js
var Route = __webpack_require__(21);

// CONCATENATED MODULE: ./node_modules/react-router/es/withRouter.js
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}





/**
 * A public higher-order component to access the imperative API
 */

var withRouter_withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ["wrappedComponentRef"]);

    return react_default.a.createElement(Route["a" /* default */], {
      children: function children(routeComponentProps) {
        return react_default.a.createElement(Component, _extends({}, remainingProps, routeComponentProps, {
          ref: wrappedComponentRef
        }));
      }
    });
  };

  C.displayName = "withRouter(" + (Component.displayName || Component.name) + ")";
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: prop_types_default.a.func
  };
  return hoist_non_react_statics_cjs_default()(C, Component);
};

/* harmony default export */ var es_withRouter = (withRouter_withRouter);
// CONCATENATED MODULE: ./node_modules/react-router-dom/es/withRouter.js
// Written in this round about way for babel-transform-imports

/* harmony default export */ var react_router_dom_es_withRouter = __webpack_exports__["a"] = (es_withRouter);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
  var result;
  var _Symbol = root.Symbol;

  if (typeof _Symbol === 'function') {
    if (_Symbol.observable) {
      result = _Symbol.observable;
    } else {
      result = _Symbol('observable');
      _Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}
;

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _generatePath__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    invariant__WEBPACK_IMPORTED_MODULE_3___default()(this.context.router, "You should not use <Redirect> outside a <Router>");
    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = Object(history__WEBPACK_IMPORTED_MODULE_4__[/* createLocation */ "c"])(prevProps.to);
    var nextTo = Object(history__WEBPACK_IMPORTED_MODULE_4__[/* createLocation */ "c"])(this.props.to);

    if (Object(history__WEBPACK_IMPORTED_MODULE_4__[/* locationsAreEqual */ "f"])(prevTo, nextTo)) {
      warning__WEBPACK_IMPORTED_MODULE_2___default()(false, "You tried to redirect to the same route you're currently on: " + ("\"" + nextTo.pathname + nextTo.search + "\""));
      return;
    }

    this.perform();
  };

  Redirect.prototype.computeTo = function computeTo(_ref) {
    var computedMatch = _ref.computedMatch,
        to = _ref.to;

    if (computedMatch) {
      if (typeof to === "string") {
        return Object(_generatePath__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(to, computedMatch.params);
      } else {
        return _extends({}, to, {
          pathname: Object(_generatePath__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(to.pathname, computedMatch.params)
        });
      }
    }

    return to;
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var push = this.props.push;
    var to = this.computeTo(this.props);

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Redirect.propTypes = {
  computedMatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  // private, from <Switch>
  push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  from: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  to: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
    }).isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }).isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (Redirect);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }

    return targetComponent;
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var strictUriEncode = __webpack_require__(122);

var decodeComponent = __webpack_require__(123);

var splitOnFirst = __webpack_require__(124);

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return function (key) {
        return function (result, value) {
          var index = result.length;

          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
        };
      };

    case 'bracket':
      return function (key) {
        return function (result, value) {
          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
        };
      };

    case 'comma':
      return function (key) {
        return function (result, value, index) {
          if (value === null || value === undefined || value.length === 0) {
            return result;
          }

          if (index === 0) {
            return [[encode(key, options), '=', encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(',')];
        };
      };

    default:
      return function (key) {
        return function (result, value) {
          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [encode(key, options)]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
        };
      };
  }
}

function parserForArrayFormat(options) {
  var result;

  switch (options.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
      return function (key, value, accumulator) {
        var isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
        var newValue = isArray ? value.split(',') : value;
        accumulator[key] = newValue;
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (_typeof(input) === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

function removeHash(input) {
  var hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function extract(input) {
  input = removeHash(input);
  var queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parse(input, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    parseNumbers: false
  }, options);
  var formatter = parserForArrayFormat(options); // Create an object with no prototype

  var ret = Object.create(null);

  if (typeof input !== 'string') {
    return ret;
  }

  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = input.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var param = _step.value;

      var _splitOnFirst = splitOnFirst(param.replace(/\+/g, ' '), '='),
          _splitOnFirst2 = _slicedToArray(_splitOnFirst, 2),
          key = _splitOnFirst2[0],
          value = _splitOnFirst2[1]; // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters


      value = value === undefined ? null : decode(value, options);

      if (options.parseNumbers && !Number.isNaN(Number(value))) {
        value = Number(value);
      }

      formatter(decode(key, options), value, ret);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
    var value = ret[key];

    if (Boolean(value) && _typeof(value) === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (object, options) {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none'
  }, options);
  var formatter = encoderForArrayFormat(options);
  var keys = Object.keys(object);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(function (key) {
    var value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      return value.reduce(formatter(key), []).join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&');
};

exports.parseUrl = function (input, options) {
  return {
    url: removeHash(input).split('?')[0] || '',
    query: parse(extract(input), options)
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var k = __webpack_require__(31),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.concurrent_mode") : 60111,
    y = n ? Symbol.for("react.forward_ref") : 60112,
    z = n ? Symbol.for("react.suspense") : 60113,
    aa = n ? Symbol.for("react.memo") : 60115,
    ba = n ? Symbol.for("react.lazy") : 60116,
    A = "function" === typeof Symbol && Symbol.iterator;

function ca(a, b, d, c, e, g, h, f) {
  if (!a) {
    a = void 0;
    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [d, c, e, g, h, f],
          m = 0;
      a = Error(b.replace(/%s/g, function () {
        return l[m++];
      }));
      a.name = "Invariant Violation";
    }
    a.framesToPop = 1;
    throw a;
  }
}

function B(a) {
  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
    d += "&args[]=" + encodeURIComponent(arguments[c + 1]);
  }

  ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
}

var C = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    D = {};

function E(a, b, d) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = d || C;
}

E.prototype.isReactComponent = {};

E.prototype.setState = function (a, b) {
  "object" !== _typeof(a) && "function" !== typeof a && null != a ? B("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function F() {}

F.prototype = E.prototype;

function G(a, b, d) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = d || C;
}

var H = G.prototype = new F();
H.constructor = G;
k(H, E.prototype);
H.isPureReactComponent = !0;
var I = {
  current: null
},
    J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, d) {
  var c = void 0,
      e = {},
      g = null,
      h = null;
  if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) e.children = d;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) {
      l[m] = arguments[m + 2];
    }

    e.children = l;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === e[c] && (e[c] = f[c]);
  }
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: h,
    props: e,
    _owner: J.current
  };
}

function da(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function N(a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var O = /\/+/g,
    P = [];

function Q(a, b, d, c) {
  if (P.length) {
    var e = P.pop();
    e.result = a;
    e.keyPrefix = b;
    e.func = d;
    e.context = c;
    e.count = 0;
    return e;
  }

  return {
    result: a,
    keyPrefix: b,
    func: d,
    context: c,
    count: 0
  };
}

function R(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > P.length && P.push(a);
}

function S(a, b, d, c) {
  var e = _typeof(a);

  if ("undefined" === e || "boolean" === e) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (e) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return d(c, a, "" === b ? "." + T(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    e = a[h];
    var f = b + T(e, h);
    g += S(e, f, d, c);
  } else if (null === a || "object" !== _typeof(a) ? f = null : (f = A && a[A] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(e = a.next()).done;) {
    e = e.value, f = b + T(e, h++), g += S(e, f, d, c);
  } else "object" === e && (d = "" + a, B("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));
  return g;
}

function U(a, b, d) {
  return null == a ? 0 : S(a, "", b, d);
}

function T(a, b) {
  return "object" === _typeof(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function ea(a, b) {
  a.func.call(a.context, b, a.count++);
}

function fa(a, b, d) {
  var c = a.result,
      e = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? V(a, c, d, function (a) {
    return a;
  }) : null != a && (N(a) && (a = da(a, e + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + d)), c.push(a));
}

function V(a, b, d, c, e) {
  var g = "";
  null != d && (g = ("" + d).replace(O, "$&/") + "/");
  b = Q(b, g, c, e);
  U(a, fa, b);
  R(b);
}

function W() {
  var a = I.current;
  null === a ? B("321") : void 0;
  return a;
}

var X = {
  Children: {
    map: function map(a, b, d) {
      if (null == a) return a;
      var c = [];
      V(a, c, null, b, d);
      return c;
    },
    forEach: function forEach(a, b, d) {
      if (null == a) return a;
      b = Q(null, null, b, d);
      U(a, ea, b);
      R(b);
    },
    count: function count(a) {
      return U(a, function () {
        return null;
      }, null);
    },
    toArray: function toArray(a) {
      var b = [];
      V(a, b, null, function (a) {
        return a;
      });
      return b;
    },
    only: function only(a) {
      N(a) ? void 0 : B("143");
      return a;
    }
  },
  createRef: function createRef() {
    return {
      current: null
    };
  },
  Component: E,
  PureComponent: G,
  createContext: function createContext(a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: w,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    a.Provider = {
      $$typeof: v,
      _context: a
    };
    return a.Consumer = a;
  },
  forwardRef: function forwardRef(a) {
    return {
      $$typeof: y,
      render: a
    };
  },
  lazy: function lazy(a) {
    return {
      $$typeof: ba,
      _ctor: a,
      _status: -1,
      _result: null
    };
  },
  memo: function memo(a, b) {
    return {
      $$typeof: aa,
      type: a,
      compare: void 0 === b ? null : b
    };
  },
  useCallback: function useCallback(a, b) {
    return W().useCallback(a, b);
  },
  useContext: function useContext(a, b) {
    return W().useContext(a, b);
  },
  useEffect: function useEffect(a, b) {
    return W().useEffect(a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, d) {
    return W().useImperativeHandle(a, b, d);
  },
  useDebugValue: function useDebugValue() {},
  useLayoutEffect: function useLayoutEffect(a, b) {
    return W().useLayoutEffect(a, b);
  },
  useMemo: function useMemo(a, b) {
    return W().useMemo(a, b);
  },
  useReducer: function useReducer(a, b, d) {
    return W().useReducer(a, b, d);
  },
  useRef: function useRef(a) {
    return W().useRef(a);
  },
  useState: function useState(a) {
    return W().useState(a);
  },
  Fragment: r,
  StrictMode: t,
  Suspense: z,
  createElement: M,
  cloneElement: function cloneElement(a, b, d) {
    null === a || void 0 === a ? B("267", a) : void 0;
    var c = void 0,
        e = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;

    if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);
      void 0 !== b.key && (g = "" + b.key);
      var l = void 0;
      a.type && a.type.defaultProps && (l = a.type.defaultProps);

      for (c in b) {
        K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }
    }

    c = arguments.length - 2;
    if (1 === c) e.children = d;else if (1 < c) {
      l = Array(c);

      for (var m = 0; m < c; m++) {
        l[m] = arguments[m + 2];
      }

      e.children = l;
    }
    return {
      $$typeof: p,
      type: a.type,
      key: g,
      ref: h,
      props: e,
      _owner: f
    };
  },
  createFactory: function createFactory(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: N,
  version: "16.8.6",
  unstable_ConcurrentMode: x,
  unstable_Profiler: u,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentDispatcher: I,
    ReactCurrentOwner: J,
    assign: k
  }
},
    Y = {
  default: X
},
    Z = Y && X || Y;
module.exports = Z.default || Z;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var aa = __webpack_require__(0),
    n = __webpack_require__(31),
    r = __webpack_require__(54);

function ba(a, b, c, d, e, f, g, h) {
  if (!a) {
    a = void 0;
    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [c, d, e, f, g, h],
          k = 0;
      a = Error(b.replace(/%s/g, function () {
        return l[k++];
      }));
      a.name = "Invariant Violation";
    }
    a.framesToPop = 1;
    throw a;
  }
}

function x(a) {
  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) {
    c += "&args[]=" + encodeURIComponent(arguments[d + 1]);
  }

  ba(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
}

aa ? void 0 : x("227");

function ca(a, b, c, d, e, f, g, h, l) {
  var k = Array.prototype.slice.call(arguments, 3);

  try {
    b.apply(c, k);
  } catch (m) {
    this.onError(m);
  }
}

var da = !1,
    ea = null,
    fa = !1,
    ha = null,
    ia = {
  onError: function onError(a) {
    da = !0;
    ea = a;
  }
};

function ja(a, b, c, d, e, f, g, h, l) {
  da = !1;
  ea = null;
  ca.apply(ia, arguments);
}

function ka(a, b, c, d, e, f, g, h, l) {
  ja.apply(this, arguments);

  if (da) {
    if (da) {
      var k = ea;
      da = !1;
      ea = null;
    } else x("198"), k = void 0;

    fa || (fa = !0, ha = k);
  }
}

var la = null,
    ma = {};

function na() {
  if (la) for (var a in ma) {
    var b = ma[a],
        c = la.indexOf(a);
    -1 < c ? void 0 : x("96", a);

    if (!oa[c]) {
      b.extractEvents ? void 0 : x("97", a);
      oa[c] = b;
      c = b.eventTypes;

      for (var d in c) {
        var e = void 0;
        var f = c[d],
            g = b,
            h = d;
        pa.hasOwnProperty(h) ? x("99", h) : void 0;
        pa[h] = f;
        var l = f.phasedRegistrationNames;

        if (l) {
          for (e in l) {
            l.hasOwnProperty(e) && qa(l[e], g, h);
          }

          e = !0;
        } else f.registrationName ? (qa(f.registrationName, g, h), e = !0) : e = !1;

        e ? void 0 : x("98", d, a);
      }
    }
  }
}

function qa(a, b, c) {
  ra[a] ? x("100", a) : void 0;
  ra[a] = b;
  sa[a] = b.eventTypes[c].dependencies;
}

var oa = [],
    pa = {},
    ra = {},
    sa = {},
    ta = null,
    ua = null,
    va = null;

function wa(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = va(c);
  ka(d, b, void 0, a);
  a.currentTarget = null;
}

function xa(a, b) {
  null == b ? x("30") : void 0;
  if (null == a) return b;

  if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;
    a.push(b);
    return a;
  }

  return Array.isArray(b) ? [a].concat(b) : [a, b];
}

function ya(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}

var za = null;

function Aa(a) {
  if (a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;
    if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
      wa(a, b[d], c[d]);
    } else b && wa(a, b, c);
    a._dispatchListeners = null;
    a._dispatchInstances = null;
    a.isPersistent() || a.constructor.release(a);
  }
}

var Ba = {
  injectEventPluginOrder: function injectEventPluginOrder(a) {
    la ? x("101") : void 0;
    la = Array.prototype.slice.call(a);
    na();
  },
  injectEventPluginsByName: function injectEventPluginsByName(a) {
    var b = !1,
        c;

    for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        ma.hasOwnProperty(c) && ma[c] === d || (ma[c] ? x("102", c) : void 0, ma[c] = d, b = !0);
      }
    }

    b && na();
  }
};

function Ca(a, b) {
  var c = a.stateNode;
  if (!c) return null;
  var d = ta(c);
  if (!d) return null;
  c = d[b];

  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;

    default:
      a = !1;
  }

  if (a) return null;
  c && "function" !== typeof c ? x("231", b, _typeof(c)) : void 0;
  return c;
}

function Da(a) {
  null !== a && (za = xa(za, a));
  a = za;
  za = null;
  if (a && (ya(a, Aa), za ? x("95") : void 0, fa)) throw a = ha, fa = !1, ha = null, a;
}

var Ea = Math.random().toString(36).slice(2),
    Fa = "__reactInternalInstance$" + Ea,
    Ga = "__reactEventHandlers$" + Ea;

function Ha(a) {
  if (a[Fa]) return a[Fa];

  for (; !a[Fa];) {
    if (a.parentNode) a = a.parentNode;else return null;
  }

  a = a[Fa];
  return 5 === a.tag || 6 === a.tag ? a : null;
}

function Ia(a) {
  a = a[Fa];
  return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
}

function Ja(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  x("33");
}

function Ka(a) {
  return a[Ga] || null;
}

function La(a) {
  do {
    a = a.return;
  } while (a && 5 !== a.tag);

  return a ? a : null;
}

function Ma(a, b, c) {
  if (b = Ca(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a);
}

function Na(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    for (var b = a._targetInst, c = []; b;) {
      c.push(b), b = La(b);
    }

    for (b = c.length; 0 < b--;) {
      Ma(c[b], "captured", a);
    }

    for (b = 0; b < c.length; b++) {
      Ma(c[b], "bubbled", a);
    }
  }
}

function Oa(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Ca(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a));
}

function Pa(a) {
  a && a.dispatchConfig.registrationName && Oa(a._targetInst, null, a);
}

function Qa(a) {
  ya(a, Na);
}

var Ra = !("undefined" === typeof window || !window.document || !window.document.createElement);

function Sa(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var Ta = {
  animationend: Sa("Animation", "AnimationEnd"),
  animationiteration: Sa("Animation", "AnimationIteration"),
  animationstart: Sa("Animation", "AnimationStart"),
  transitionend: Sa("Transition", "TransitionEnd")
},
    Ua = {},
    Va = {};
Ra && (Va = document.createElement("div").style, "AnimationEvent" in window || (delete Ta.animationend.animation, delete Ta.animationiteration.animation, delete Ta.animationstart.animation), "TransitionEvent" in window || delete Ta.transitionend.transition);

function Wa(a) {
  if (Ua[a]) return Ua[a];
  if (!Ta[a]) return a;
  var b = Ta[a],
      c;

  for (c in b) {
    if (b.hasOwnProperty(c) && c in Va) return Ua[a] = b[c];
  }

  return a;
}

var Xa = Wa("animationend"),
    Ya = Wa("animationiteration"),
    Za = Wa("animationstart"),
    $a = Wa("transitionend"),
    ab = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    bb = null,
    cb = null,
    db = null;

function eb() {
  if (db) return db;
  var a,
      b = cb,
      c = b.length,
      d,
      e = "value" in bb ? bb.value : bb.textContent,
      f = e.length;

  for (a = 0; a < c && b[a] === e[a]; a++) {
    ;
  }

  var g = c - a;

  for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {
    ;
  }

  return db = e.slice(a, 1 < d ? 1 - d : void 0);
}

function fb() {
  return !0;
}

function gb() {
  return !1;
}

function y(a, b, c, d) {
  this.dispatchConfig = a;
  this._targetInst = b;
  this.nativeEvent = c;
  a = this.constructor.Interface;

  for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }

  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? fb : gb;
  this.isPropagationStopped = gb;
  return this;
}

n(y.prototype, {
  preventDefault: function preventDefault() {
    this.defaultPrevented = !0;
    var a = this.nativeEvent;
    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = fb);
  },
  stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;
    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = fb);
  },
  persist: function persist() {
    this.isPersistent = fb;
  },
  isPersistent: gb,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;

    for (b in a) {
      this[b] = null;
    }

    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = gb;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
y.Interface = {
  type: null,
  target: null,
  currentTarget: function currentTarget() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

y.extend = function (a) {
  function b() {}

  function c() {
    return d.apply(this, arguments);
  }

  var d = this;
  b.prototype = d.prototype;
  var e = new b();
  n(e, c.prototype);
  c.prototype = e;
  c.prototype.constructor = c;
  c.Interface = n({}, d.Interface, a);
  c.extend = d.extend;
  hb(c);
  return c;
};

hb(y);

function ib(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();
    this.call(e, a, b, c, d);
    return e;
  }

  return new this(a, b, c, d);
}

function jb(a) {
  a instanceof this ? void 0 : x("279");
  a.destructor();
  10 > this.eventPool.length && this.eventPool.push(a);
}

function hb(a) {
  a.eventPool = [];
  a.getPooled = ib;
  a.release = jb;
}

var kb = y.extend({
  data: null
}),
    lb = y.extend({
  data: null
}),
    mb = [9, 13, 27, 32],
    nb = Ra && "CompositionEvent" in window,
    ob = null;
Ra && "documentMode" in document && (ob = document.documentMode);
var pb = Ra && "TextEvent" in window && !ob,
    qb = Ra && (!nb || ob && 8 < ob && 11 >= ob),
    rb = String.fromCharCode(32),
    sb = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: "onBeforeInput",
      captured: "onBeforeInputCapture"
    },
    dependencies: ["compositionend", "keypress", "textInput", "paste"]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: "onCompositionEnd",
      captured: "onCompositionEndCapture"
    },
    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture"
    },
    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: "onCompositionUpdate",
      captured: "onCompositionUpdateCapture"
    },
    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
  }
},
    tb = !1;

function ub(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== mb.indexOf(b.keyCode);

    case "keydown":
      return 229 !== b.keyCode;

    case "keypress":
    case "mousedown":
    case "blur":
      return !0;

    default:
      return !1;
  }
}

function vb(a) {
  a = a.detail;
  return "object" === _typeof(a) && "data" in a ? a.data : null;
}

var wb = !1;

function xb(a, b) {
  switch (a) {
    case "compositionend":
      return vb(b);

    case "keypress":
      if (32 !== b.which) return null;
      tb = !0;
      return rb;

    case "textInput":
      return a = b.data, a === rb && tb ? null : a;

    default:
      return null;
  }
}

function yb(a, b) {
  if (wb) return "compositionend" === a || !nb && ub(a, b) ? (a = eb(), db = cb = bb = null, wb = !1, a) : null;

  switch (a) {
    case "paste":
      return null;

    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }

      return null;

    case "compositionend":
      return qb && "ko" !== b.locale ? null : b.data;

    default:
      return null;
  }
}

var zb = {
  eventTypes: sb,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = void 0;
    var f = void 0;
    if (nb) b: {
      switch (a) {
        case "compositionstart":
          e = sb.compositionStart;
          break b;

        case "compositionend":
          e = sb.compositionEnd;
          break b;

        case "compositionupdate":
          e = sb.compositionUpdate;
          break b;
      }

      e = void 0;
    } else wb ? ub(a, c) && (e = sb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = sb.compositionStart);
    e ? (qb && "ko" !== c.locale && (wb || e !== sb.compositionStart ? e === sb.compositionEnd && wb && (f = eb()) : (bb = d, cb = "value" in bb ? bb.value : bb.textContent, wb = !0)), e = kb.getPooled(e, b, c, d), f ? e.data = f : (f = vb(c), null !== f && (e.data = f)), Qa(e), f = e) : f = null;
    (a = pb ? xb(a, c) : yb(a, c)) ? (b = lb.getPooled(sb.beforeInput, b, c, d), b.data = a, Qa(b)) : b = null;
    return null === f ? b : null === b ? f : [f, b];
  }
},
    Ab = null,
    Bb = null,
    Cb = null;

function Db(a) {
  if (a = ua(a)) {
    "function" !== typeof Ab ? x("280") : void 0;
    var b = ta(a.stateNode);
    Ab(a.stateNode, a.type, b);
  }
}

function Eb(a) {
  Bb ? Cb ? Cb.push(a) : Cb = [a] : Bb = a;
}

function Fb() {
  if (Bb) {
    var a = Bb,
        b = Cb;
    Cb = Bb = null;
    Db(a);
    if (b) for (a = 0; a < b.length; a++) {
      Db(b[a]);
    }
  }
}

function Gb(a, b) {
  return a(b);
}

function Hb(a, b, c) {
  return a(b, c);
}

function Ib() {}

var Jb = !1;

function Kb(a, b) {
  if (Jb) return a(b);
  Jb = !0;

  try {
    return Gb(a, b);
  } finally {
    if (Jb = !1, null !== Bb || null !== Cb) Ib(), Fb();
  }
}

var Lb = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function Mb(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!Lb[a.type] : "textarea" === b ? !0 : !1;
}

function Nb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}

function Ob(a) {
  if (!Ra) return !1;
  a = "on" + a;
  var b = a in document;
  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
  return b;
}

function Pb(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}

function Qb(a) {
  var b = Pb(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];

  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function get() {
        return e.call(this);
      },
      set: function set(a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function getValue() {
        return d;
      },
      setValue: function setValue(a) {
        d = "" + a;
      },
      stopTracking: function stopTracking() {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}

function Rb(a) {
  a._valueTracker || (a._valueTracker = Qb(a));
}

function Sb(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = Pb(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}

var Tb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
Tb.hasOwnProperty("ReactCurrentDispatcher") || (Tb.ReactCurrentDispatcher = {
  current: null
});
var Ub = /^(.*)[\\\/]/,
    z = "function" === typeof Symbol && Symbol.for,
    Vb = z ? Symbol.for("react.element") : 60103,
    Wb = z ? Symbol.for("react.portal") : 60106,
    Xb = z ? Symbol.for("react.fragment") : 60107,
    Yb = z ? Symbol.for("react.strict_mode") : 60108,
    Zb = z ? Symbol.for("react.profiler") : 60114,
    $b = z ? Symbol.for("react.provider") : 60109,
    ac = z ? Symbol.for("react.context") : 60110,
    bc = z ? Symbol.for("react.concurrent_mode") : 60111,
    cc = z ? Symbol.for("react.forward_ref") : 60112,
    dc = z ? Symbol.for("react.suspense") : 60113,
    ec = z ? Symbol.for("react.memo") : 60115,
    fc = z ? Symbol.for("react.lazy") : 60116,
    gc = "function" === typeof Symbol && Symbol.iterator;

function hc(a) {
  if (null === a || "object" !== _typeof(a)) return null;
  a = gc && a[gc] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function ic(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case bc:
      return "ConcurrentMode";

    case Xb:
      return "Fragment";

    case Wb:
      return "Portal";

    case Zb:
      return "Profiler";

    case Yb:
      return "StrictMode";

    case dc:
      return "Suspense";
  }

  if ("object" === _typeof(a)) switch (a.$$typeof) {
    case ac:
      return "Context.Consumer";

    case $b:
      return "Context.Provider";

    case cc:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case ec:
      return ic(a.type);

    case fc:
      if (a = 1 === a._status ? a._result : null) return ic(a);
  }
  return null;
}

function jc(a) {
  var b = "";

  do {
    a: switch (a.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var c = "";
        break a;

      default:
        var d = a._debugOwner,
            e = a._debugSource,
            f = ic(a.type);
        c = null;
        d && (c = ic(d.type));
        d = f;
        f = "";
        e ? f = " (at " + e.fileName.replace(Ub, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
        c = "\n    in " + (d || "Unknown") + f;
    }

    b += c;
    a = a.return;
  } while (a);

  return b;
}

var kc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    lc = Object.prototype.hasOwnProperty,
    mc = {},
    nc = {};

function oc(a) {
  if (lc.call(nc, a)) return !0;
  if (lc.call(mc, a)) return !1;
  if (kc.test(a)) return nc[a] = !0;
  mc[a] = !0;
  return !1;
}

function pc(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (_typeof(b)) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function qc(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pc(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function C(a, b, c, d, e) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
}

var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  D[a] = new C(a, 0, !1, a, null);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  D[b] = new C(b, 1, !1, a[1], null);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  D[a] = new C(a, 2, !1, a.toLowerCase(), null);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  D[a] = new C(a, 2, !1, a, null);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  D[a] = new C(a, 3, !1, a.toLowerCase(), null);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  D[a] = new C(a, 3, !0, a, null);
});
["capture", "download"].forEach(function (a) {
  D[a] = new C(a, 4, !1, a, null);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  D[a] = new C(a, 6, !1, a, null);
});
["rowSpan", "start"].forEach(function (a) {
  D[a] = new C(a, 5, !1, a.toLowerCase(), null);
});
var rc = /[\-:]([a-z])/g;

function sc(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(rc, sc);
  D[b] = new C(b, 1, !1, a, null);
});
"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(rc, sc);
  D[b] = new C(b, 1, !1, a, "http://www.w3.org/1999/xlink");
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(rc, sc);
  D[b] = new C(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  D[a] = new C(a, 1, !1, a.toLowerCase(), null);
});

function tc(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;
  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
  f || (qc(b, c, e, d) && (c = null), d || null === e ? oc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}

function uc(a) {
  switch (_typeof(a)) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;

    default:
      return "";
  }
}

function vc(a, b) {
  var c = b.checked;
  return n({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}

function wc(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;
  c = uc(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}

function xc(a, b) {
  b = b.checked;
  null != b && tc(a, "checked", b, !1);
}

function yc(a, b) {
  xc(a, b);
  var c = uc(b.value),
      d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? zc(a, b.type, c) : b.hasOwnProperty("defaultValue") && zc(a, b.type, uc(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}

function Ac(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }

  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !a.defaultChecked;
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}

function zc(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}

var Bc = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
  }
};

function Cc(a, b, c) {
  a = y.getPooled(Bc.change, a, b, c);
  a.type = "change";
  Eb(c);
  Qa(a);
  return a;
}

var Dc = null,
    Ec = null;

function Fc(a) {
  Da(a);
}

function Gc(a) {
  var b = Ja(a);
  if (Sb(b)) return a;
}

function Hc(a, b) {
  if ("change" === a) return b;
}

var Ic = !1;
Ra && (Ic = Ob("input") && (!document.documentMode || 9 < document.documentMode));

function Jc() {
  Dc && (Dc.detachEvent("onpropertychange", Kc), Ec = Dc = null);
}

function Kc(a) {
  "value" === a.propertyName && Gc(Ec) && (a = Cc(Ec, a, Nb(a)), Kb(Fc, a));
}

function Lc(a, b, c) {
  "focus" === a ? (Jc(), Dc = b, Ec = c, Dc.attachEvent("onpropertychange", Kc)) : "blur" === a && Jc();
}

function Mc(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Gc(Ec);
}

function Nc(a, b) {
  if ("click" === a) return Gc(b);
}

function Oc(a, b) {
  if ("input" === a || "change" === a) return Gc(b);
}

var Pc = {
  eventTypes: Bc,
  _isInputEventSupported: Ic,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? Ja(b) : window,
        f = void 0,
        g = void 0,
        h = e.nodeName && e.nodeName.toLowerCase();
    "select" === h || "input" === h && "file" === e.type ? f = Hc : Mb(e) ? Ic ? f = Oc : (f = Mc, g = Lc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = Nc);
    if (f && (f = f(a, b))) return Cc(f, c, d);
    g && g(a, e, b);
    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && zc(e, "number", e.value);
  }
},
    Qc = y.extend({
  view: null,
  detail: null
}),
    Rc = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};

function Sc(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Rc[a]) ? !!b[a] : !1;
}

function Tc() {
  return Sc;
}

var Uc = 0,
    Vc = 0,
    Wc = !1,
    Xc = !1,
    Yc = Qc.extend({
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: Tc,
  button: null,
  buttons: null,
  relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  },
  movementX: function movementX(a) {
    if ("movementX" in a) return a.movementX;
    var b = Uc;
    Uc = a.screenX;
    return Wc ? "mousemove" === a.type ? a.screenX - b : 0 : (Wc = !0, 0);
  },
  movementY: function movementY(a) {
    if ("movementY" in a) return a.movementY;
    var b = Vc;
    Vc = a.screenY;
    return Xc ? "mousemove" === a.type ? a.screenY - b : 0 : (Xc = !0, 0);
  }
}),
    Zc = Yc.extend({
  pointerId: null,
  width: null,
  height: null,
  pressure: null,
  tangentialPressure: null,
  tiltX: null,
  tiltY: null,
  twist: null,
  pointerType: null,
  isPrimary: null
}),
    $c = {
  mouseEnter: {
    registrationName: "onMouseEnter",
    dependencies: ["mouseout", "mouseover"]
  },
  mouseLeave: {
    registrationName: "onMouseLeave",
    dependencies: ["mouseout", "mouseover"]
  },
  pointerEnter: {
    registrationName: "onPointerEnter",
    dependencies: ["pointerout", "pointerover"]
  },
  pointerLeave: {
    registrationName: "onPointerLeave",
    dependencies: ["pointerout", "pointerover"]
  }
},
    ad = {
  eventTypes: $c,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = "mouseover" === a || "pointerover" === a,
        f = "mouseout" === a || "pointerout" === a;
    if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;
    e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;
    f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Ha(b) : null) : f = null;
    if (f === b) return null;
    var g = void 0,
        h = void 0,
        l = void 0,
        k = void 0;
    if ("mouseout" === a || "mouseover" === a) g = Yc, h = $c.mouseLeave, l = $c.mouseEnter, k = "mouse";else if ("pointerout" === a || "pointerover" === a) g = Zc, h = $c.pointerLeave, l = $c.pointerEnter, k = "pointer";
    var m = null == f ? e : Ja(f);
    e = null == b ? e : Ja(b);
    a = g.getPooled(h, f, c, d);
    a.type = k + "leave";
    a.target = m;
    a.relatedTarget = e;
    c = g.getPooled(l, b, c, d);
    c.type = k + "enter";
    c.target = e;
    c.relatedTarget = m;
    d = b;
    if (f && d) a: {
      b = f;
      e = d;
      k = 0;

      for (g = b; g; g = La(g)) {
        k++;
      }

      g = 0;

      for (l = e; l; l = La(l)) {
        g++;
      }

      for (; 0 < k - g;) {
        b = La(b), k--;
      }

      for (; 0 < g - k;) {
        e = La(e), g--;
      }

      for (; k--;) {
        if (b === e || b === e.alternate) break a;
        b = La(b);
        e = La(e);
      }

      b = null;
    } else b = null;
    e = b;

    for (b = []; f && f !== e;) {
      k = f.alternate;
      if (null !== k && k === e) break;
      b.push(f);
      f = La(f);
    }

    for (f = []; d && d !== e;) {
      k = d.alternate;
      if (null !== k && k === e) break;
      f.push(d);
      d = La(d);
    }

    for (d = 0; d < b.length; d++) {
      Oa(b[d], "bubbled", a);
    }

    for (d = f.length; 0 < d--;) {
      Oa(f[d], "captured", c);
    }

    return [a, c];
  }
};

function bd(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var cd = Object.prototype.hasOwnProperty;

function dd(a, b) {
  if (bd(a, b)) return !0;
  if ("object" !== _typeof(a) || null === a || "object" !== _typeof(b) || null === b) return !1;
  var c = Object.keys(a),
      d = Object.keys(b);
  if (c.length !== d.length) return !1;

  for (d = 0; d < c.length; d++) {
    if (!cd.call(b, c[d]) || !bd(a[c[d]], b[c[d]])) return !1;
  }

  return !0;
}

function ed(a) {
  var b = a;
  if (a.alternate) for (; b.return;) {
    b = b.return;
  } else {
    if (0 !== (b.effectTag & 2)) return 1;

    for (; b.return;) {
      if (b = b.return, 0 !== (b.effectTag & 2)) return 1;
    }
  }
  return 3 === b.tag ? 2 : 3;
}

function fd(a) {
  2 !== ed(a) ? x("188") : void 0;
}

function gd(a) {
  var b = a.alternate;
  if (!b) return b = ed(a), 3 === b ? x("188") : void 0, 1 === b ? null : a;

  for (var c = a, d = b;;) {
    var e = c.return,
        f = e ? e.alternate : null;
    if (!e || !f) break;

    if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return fd(e), a;
        if (g === d) return fd(e), b;
        g = g.sibling;
      }

      x("188");
    }

    if (c.return !== d.return) c = e, d = f;else {
      g = !1;

      for (var h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }

        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }

        h = h.sibling;
      }

      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }

          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }

          h = h.sibling;
        }

        g ? void 0 : x("189");
      }
    }
    c.alternate !== d ? x("190") : void 0;
  }

  3 !== c.tag ? x("188") : void 0;
  return c.stateNode.current === c ? a : b;
}

function hd(a) {
  a = gd(a);
  if (!a) return null;

  for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;
    if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;

      for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  return null;
}

var id = y.extend({
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    jd = y.extend({
  clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }
}),
    kd = Qc.extend({
  relatedTarget: null
});

function ld(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}

var md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
},
    nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
},
    od = Qc.extend({
  key: function key(a) {
    if (a.key) {
      var b = md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }

    return "keypress" === a.type ? (a = ld(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? nd[a.keyCode] || "Unidentified" : "";
  },
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: Tc,
  charCode: function charCode(a) {
    return "keypress" === a.type ? ld(a) : 0;
  },
  keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  },
  which: function which(a) {
    return "keypress" === a.type ? ld(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }
}),
    pd = Yc.extend({
  dataTransfer: null
}),
    qd = Qc.extend({
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: Tc
}),
    rd = y.extend({
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    sd = Yc.extend({
  deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: null,
  deltaMode: null
}),
    td = [["abort", "abort"], [Xa, "animationEnd"], [Ya, "animationIteration"], [Za, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [$a, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
    ud = {},
    vd = {};

function wd(a, b) {
  var c = a[0];
  a = a[1];
  var d = "on" + (a[0].toUpperCase() + a.slice(1));
  b = {
    phasedRegistrationNames: {
      bubbled: d,
      captured: d + "Capture"
    },
    dependencies: [c],
    isInteractive: b
  };
  ud[a] = b;
  vd[c] = b;
}

[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["auxclick", "auxClick"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
  wd(a, !0);
});
td.forEach(function (a) {
  wd(a, !1);
});
var xd = {
  eventTypes: ud,
  isInteractiveTopLevelEventType: function isInteractiveTopLevelEventType(a) {
    a = vd[a];
    return void 0 !== a && !0 === a.isInteractive;
  },
  extractEvents: function extractEvents(a, b, c, d) {
    var e = vd[a];
    if (!e) return null;

    switch (a) {
      case "keypress":
        if (0 === ld(c)) return null;

      case "keydown":
      case "keyup":
        a = od;
        break;

      case "blur":
      case "focus":
        a = kd;
        break;

      case "click":
        if (2 === c.button) return null;

      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
        a = Yc;
        break;

      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        a = pd;
        break;

      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        a = qd;
        break;

      case Xa:
      case Ya:
      case Za:
        a = id;
        break;

      case $a:
        a = rd;
        break;

      case "scroll":
        a = Qc;
        break;

      case "wheel":
        a = sd;
        break;

      case "copy":
      case "cut":
      case "paste":
        a = jd;
        break;

      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        a = Zc;
        break;

      default:
        a = y;
    }

    b = a.getPooled(e, b, c, d);
    Qa(b);
    return b;
  }
},
    yd = xd.isInteractiveTopLevelEventType,
    zd = [];

function Ad(a) {
  var b = a.targetInst,
      c = b;

  do {
    if (!c) {
      a.ancestors.push(c);
      break;
    }

    var d;

    for (d = c; d.return;) {
      d = d.return;
    }

    d = 3 !== d.tag ? null : d.stateNode.containerInfo;
    if (!d) break;
    a.ancestors.push(c);
    c = Ha(d);
  } while (c);

  for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c];
    var e = Nb(a.nativeEvent);
    d = a.topLevelType;

    for (var f = a.nativeEvent, g = null, h = 0; h < oa.length; h++) {
      var l = oa[h];
      l && (l = l.extractEvents(d, b, f, e)) && (g = xa(g, l));
    }

    Da(g);
  }
}

var Bd = !0;

function E(a, b) {
  if (!b) return null;
  var c = (yd(a) ? Cd : Dd).bind(null, a);
  b.addEventListener(a, c, !1);
}

function Ed(a, b) {
  if (!b) return null;
  var c = (yd(a) ? Cd : Dd).bind(null, a);
  b.addEventListener(a, c, !0);
}

function Cd(a, b) {
  Hb(Dd, a, b);
}

function Dd(a, b) {
  if (Bd) {
    var c = Nb(b);
    c = Ha(c);
    null === c || "number" !== typeof c.tag || 2 === ed(c) || (c = null);

    if (zd.length) {
      var d = zd.pop();
      d.topLevelType = a;
      d.nativeEvent = b;
      d.targetInst = c;
      a = d;
    } else a = {
      topLevelType: a,
      nativeEvent: b,
      targetInst: c,
      ancestors: []
    };

    try {
      Kb(Ad, a);
    } finally {
      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > zd.length && zd.push(a);
    }
  }
}

var Fd = {},
    Gd = 0,
    Hd = "_reactListenersID" + ("" + Math.random()).slice(2);

function Id(a) {
  Object.prototype.hasOwnProperty.call(a, Hd) || (a[Hd] = Gd++, Fd[a[Hd]] = {});
  return Fd[a[Hd]];
}

function Jd(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;

  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}

function Kd(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }

  return a;
}

function Ld(a, b) {
  var c = Kd(a);
  a = 0;

  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }

    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }

        c = c.parentNode;
      }

      c = void 0;
    }

    c = Kd(c);
  }
}

function Md(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Md(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}

function Nd() {
  for (var a = window, b = Jd(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }

    if (c) a = b.contentWindow;else break;
    b = Jd(a.document);
  }

  return b;
}

function Od(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}

function Pd() {
  var a = Nd();

  if (Od(a)) {
    if ("selectionStart" in a) var b = {
      start: a.selectionStart,
      end: a.selectionEnd
    };else a: {
      b = (b = a.ownerDocument) && b.defaultView || window;
      var c = b.getSelection && b.getSelection();

      if (c && 0 !== c.rangeCount) {
        b = c.anchorNode;
        var d = c.anchorOffset,
            e = c.focusNode;
        c = c.focusOffset;

        try {
          b.nodeType, e.nodeType;
        } catch (A) {
          b = null;
          break a;
        }

        var f = 0,
            g = -1,
            h = -1,
            l = 0,
            k = 0,
            m = a,
            p = null;

        b: for (;;) {
          for (var t;;) {
            m !== b || 0 !== d && 3 !== m.nodeType || (g = f + d);
            m !== e || 0 !== c && 3 !== m.nodeType || (h = f + c);
            3 === m.nodeType && (f += m.nodeValue.length);
            if (null === (t = m.firstChild)) break;
            p = m;
            m = t;
          }

          for (;;) {
            if (m === a) break b;
            p === b && ++l === d && (g = f);
            p === e && ++k === c && (h = f);
            if (null !== (t = m.nextSibling)) break;
            m = p;
            p = m.parentNode;
          }

          m = t;
        }

        b = -1 === g || -1 === h ? null : {
          start: g,
          end: h
        };
      } else b = null;
    }
    b = b || {
      start: 0,
      end: 0
    };
  } else b = null;

  return {
    focusedElem: a,
    selectionRange: b
  };
}

function Qd(a) {
  var b = Nd(),
      c = a.focusedElem,
      d = a.selectionRange;

  if (b !== c && c && c.ownerDocument && Md(c.ownerDocument.documentElement, c)) {
    if (null !== d && Od(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
      a = a.getSelection();
      var e = c.textContent.length,
          f = Math.min(d.start, e);
      d = void 0 === d.end ? f : Math.min(d.end, e);
      !a.extend && f > d && (e = d, d = f, f = e);
      e = Ld(c, f);
      var g = Ld(c, d);
      e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
    }
    b = [];

    for (a = c; a = a.parentNode;) {
      1 === a.nodeType && b.push({
        element: a,
        left: a.scrollLeft,
        top: a.scrollTop
      });
    }

    "function" === typeof c.focus && c.focus();

    for (c = 0; c < b.length; c++) {
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
}

var Rd = Ra && "documentMode" in document && 11 >= document.documentMode,
    Sd = {
  select: {
    phasedRegistrationNames: {
      bubbled: "onSelect",
      captured: "onSelectCapture"
    },
    dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
  }
},
    Td = null,
    Ud = null,
    Vd = null,
    Wd = !1;

function Xd(a, b) {
  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;
  if (Wd || null == Td || Td !== Jd(c)) return null;
  c = Td;
  "selectionStart" in c && Od(c) ? c = {
    start: c.selectionStart,
    end: c.selectionEnd
  } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
    anchorNode: c.anchorNode,
    anchorOffset: c.anchorOffset,
    focusNode: c.focusNode,
    focusOffset: c.focusOffset
  });
  return Vd && dd(Vd, c) ? null : (Vd = c, a = y.getPooled(Sd.select, Ud, a, b), a.type = "select", a.target = Td, Qa(a), a);
}

var Yd = {
  eventTypes: Sd,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;

    if (!(f = !e)) {
      a: {
        e = Id(e);
        f = sa.onSelect;

        for (var g = 0; g < f.length; g++) {
          var h = f[g];

          if (!e.hasOwnProperty(h) || !e[h]) {
            e = !1;
            break a;
          }
        }

        e = !0;
      }

      f = !e;
    }

    if (f) return null;
    e = b ? Ja(b) : window;

    switch (a) {
      case "focus":
        if (Mb(e) || "true" === e.contentEditable) Td = e, Ud = b, Vd = null;
        break;

      case "blur":
        Vd = Ud = Td = null;
        break;

      case "mousedown":
        Wd = !0;
        break;

      case "contextmenu":
      case "mouseup":
      case "dragend":
        return Wd = !1, Xd(c, d);

      case "selectionchange":
        if (Rd) break;

      case "keydown":
      case "keyup":
        return Xd(c, d);
    }

    return null;
  }
};
Ba.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
ta = Ka;
ua = Ia;
va = Ja;
Ba.injectEventPluginsByName({
  SimpleEventPlugin: xd,
  EnterLeaveEventPlugin: ad,
  ChangeEventPlugin: Pc,
  SelectEventPlugin: Yd,
  BeforeInputEventPlugin: zb
});

function Zd(a) {
  var b = "";
  aa.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

function $d(a, b) {
  a = n({
    children: void 0
  }, b);
  if (b = Zd(b.children)) a.children = b;
  return a;
}

function ae(a, b, c, d) {
  a = a.options;

  if (b) {
    b = {};

    for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }

    for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + uc(c);
    b = null;

    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }

      null !== b || a[e].disabled || (b = a[e]);
    }

    null !== b && (b.selected = !0);
  }
}

function be(a, b) {
  null != b.dangerouslySetInnerHTML ? x("91") : void 0;
  return n({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}

function ce(a, b) {
  var c = b.value;
  null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? x("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : x("93"), b = b[0]), c = b), null == c && (c = ""));
  a._wrapperState = {
    initialValue: uc(c)
  };
}

function de(a, b) {
  var c = uc(b.value),
      d = uc(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}

function ee(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && (a.value = b);
}

var fe = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function ge(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

function he(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? ge(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}

var ie = void 0,
    je = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== fe.svg || "innerHTML" in a) a.innerHTML = b;else {
    ie = ie || document.createElement("div");
    ie.innerHTML = "<svg>" + b + "</svg>";

    for (b = ie.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }

    for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});

function ke(a, b) {
  if (b) {
    var c = a.firstChild;

    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }

  a.textContent = b;
}

var le = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
},
    me = ["Webkit", "ms", "Moz", "O"];
Object.keys(le).forEach(function (a) {
  me.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    le[b] = le[a];
  });
});

function ne(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || le.hasOwnProperty(a) && le[a] ? ("" + b).trim() : b + "px";
}

function oe(a, b) {
  a = a.style;

  for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"),
          e = ne(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}

var pe = n({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function qe(a, b) {
  b && (pe[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? x("137", a, "") : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? x("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : x("61")), null != b.style && "object" !== _typeof(b.style) ? x("62", "") : void 0);
}

function re(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;

    default:
      return !0;
  }
}

function se(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
  var c = Id(a);
  b = sa[b];

  for (var d = 0; d < b.length; d++) {
    var e = b[d];

    if (!c.hasOwnProperty(e) || !c[e]) {
      switch (e) {
        case "scroll":
          Ed("scroll", a);
          break;

        case "focus":
        case "blur":
          Ed("focus", a);
          Ed("blur", a);
          c.blur = !0;
          c.focus = !0;
          break;

        case "cancel":
        case "close":
          Ob(e) && Ed(e, a);
          break;

        case "invalid":
        case "submit":
        case "reset":
          break;

        default:
          -1 === ab.indexOf(e) && E(e, a);
      }

      c[e] = !0;
    }
  }
}

function te() {}

var ue = null,
    ve = null;

function we(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }

  return !1;
}

function xe(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}

var ye = "function" === typeof setTimeout ? setTimeout : void 0,
    ze = "function" === typeof clearTimeout ? clearTimeout : void 0,
    Ae = r.unstable_scheduleCallback,
    Be = r.unstable_cancelCallback;

function Ce(a, b, c, d, e) {
  a[Ga] = e;
  "input" === c && "radio" === e.type && null != e.name && xc(a, e);
  re(c, d);
  d = re(c, e);

  for (var f = 0; f < b.length; f += 2) {
    var g = b[f],
        h = b[f + 1];
    "style" === g ? oe(a, h) : "dangerouslySetInnerHTML" === g ? je(a, h) : "children" === g ? ke(a, h) : tc(a, g, h, d);
  }

  switch (c) {
    case "input":
      yc(a, e);
      break;

    case "textarea":
      de(a, e);
      break;

    case "select":
      b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? ae(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? ae(a, !!e.multiple, e.defaultValue, !0) : ae(a, !!e.multiple, e.multiple ? [] : "", !1));
  }
}

function De(a) {
  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }

  return a;
}

function Ee(a) {
  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }

  return a;
}

new Set();
var Fe = [],
    Ge = -1;

function F(a) {
  0 > Ge || (a.current = Fe[Ge], Fe[Ge] = null, Ge--);
}

function G(a, b) {
  Ge++;
  Fe[Ge] = a.current;
  a.current = b;
}

var He = {},
    H = {
  current: He
},
    I = {
  current: !1
},
    Ie = He;

function Je(a, b) {
  var c = a.type.contextTypes;
  if (!c) return He;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
      f;

  for (f in c) {
    e[f] = b[f];
  }

  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}

function J(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}

function Ke(a) {
  F(I, a);
  F(H, a);
}

function Le(a) {
  F(I, a);
  F(H, a);
}

function Me(a, b, c) {
  H.current !== He ? x("168") : void 0;
  G(H, b, a);
  G(I, c, a);
}

function Ne(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();

  for (var e in d) {
    e in a ? void 0 : x("108", ic(b) || "Unknown", e);
  }

  return n({}, c, d);
}

function Oe(a) {
  var b = a.stateNode;
  b = b && b.__reactInternalMemoizedMergedChildContext || He;
  Ie = H.current;
  G(H, b, a);
  G(I, I.current, a);
  return !0;
}

function Pe(a, b, c) {
  var d = a.stateNode;
  d ? void 0 : x("169");
  c ? (b = Ne(a, b, Ie), d.__reactInternalMemoizedMergedChildContext = b, F(I, a), F(H, a), G(H, b, a)) : F(I, a);
  G(I, c, a);
}

var Qe = null,
    Re = null;

function Se(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}

function Te(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (b.isDisabled || !b.supportsFiber) return !0;

  try {
    var c = b.inject(a);
    Qe = Se(function (a) {
      return b.onCommitFiberRoot(c, a);
    });
    Re = Se(function (a) {
      return b.onCommitFiberUnmount(c, a);
    });
  } catch (d) {}

  return !0;
}

function Ue(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.contextDependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}

function K(a, b, c, d) {
  return new Ue(a, b, c, d);
}

function Ve(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}

function We(a) {
  if ("function" === typeof a) return Ve(a) ? 1 : 0;

  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === cc) return 11;
    if (a === ec) return 14;
  }

  return 2;
}

function Xe(a, b) {
  var c = a.alternate;
  null === c ? (c = K(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childExpirationTime = a.childExpirationTime;
  c.expirationTime = a.expirationTime;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  c.contextDependencies = a.contextDependencies;
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}

function Ye(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) Ve(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case Xb:
      return Ze(c.children, e, f, b);

    case bc:
      return $e(c, e | 3, f, b);

    case Yb:
      return $e(c, e | 2, f, b);

    case Zb:
      return a = K(12, c, b, e | 4), a.elementType = Zb, a.type = Zb, a.expirationTime = f, a;

    case dc:
      return a = K(13, c, b, e), a.elementType = dc, a.type = dc, a.expirationTime = f, a;

    default:
      if ("object" === _typeof(a) && null !== a) switch (a.$$typeof) {
        case $b:
          g = 10;
          break a;

        case ac:
          g = 9;
          break a;

        case cc:
          g = 11;
          break a;

        case ec:
          g = 14;
          break a;

        case fc:
          g = 16;
          d = null;
          break a;
      }
      x("130", null == a ? a : _typeof(a), "");
  }
  b = K(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.expirationTime = f;
  return b;
}

function Ze(a, b, c, d) {
  a = K(7, a, d, b);
  a.expirationTime = c;
  return a;
}

function $e(a, b, c, d) {
  a = K(8, a, d, b);
  b = 0 === (b & 1) ? Yb : bc;
  a.elementType = b;
  a.type = b;
  a.expirationTime = c;
  return a;
}

function af(a, b, c) {
  a = K(6, a, null, b);
  a.expirationTime = c;
  return a;
}

function bf(a, b, c) {
  b = K(4, null !== a.children ? a.children : [], a.key, b);
  b.expirationTime = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}

function cf(a, b) {
  a.didError = !1;
  var c = a.earliestPendingTime;
  0 === c ? a.earliestPendingTime = a.latestPendingTime = b : c < b ? a.earliestPendingTime = b : a.latestPendingTime > b && (a.latestPendingTime = b);
  df(b, a);
}

function ef(a, b) {
  a.didError = !1;
  if (0 === b) a.earliestPendingTime = 0, a.latestPendingTime = 0, a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0;else {
    b < a.latestPingedTime && (a.latestPingedTime = 0);
    var c = a.latestPendingTime;
    0 !== c && (c > b ? a.earliestPendingTime = a.latestPendingTime = 0 : a.earliestPendingTime > b && (a.earliestPendingTime = a.latestPendingTime));
    c = a.earliestSuspendedTime;
    0 === c ? cf(a, b) : b < a.latestSuspendedTime ? (a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0, cf(a, b)) : b > c && cf(a, b);
  }
  df(0, a);
}

function ff(a, b) {
  a.didError = !1;
  a.latestPingedTime >= b && (a.latestPingedTime = 0);
  var c = a.earliestPendingTime,
      d = a.latestPendingTime;
  c === b ? a.earliestPendingTime = d === b ? a.latestPendingTime = 0 : d : d === b && (a.latestPendingTime = c);
  c = a.earliestSuspendedTime;
  d = a.latestSuspendedTime;
  0 === c ? a.earliestSuspendedTime = a.latestSuspendedTime = b : c < b ? a.earliestSuspendedTime = b : d > b && (a.latestSuspendedTime = b);
  df(b, a);
}

function gf(a, b) {
  var c = a.earliestPendingTime;
  a = a.earliestSuspendedTime;
  c > b && (b = c);
  a > b && (b = a);
  return b;
}

function df(a, b) {
  var c = b.earliestSuspendedTime,
      d = b.latestSuspendedTime,
      e = b.earliestPendingTime,
      f = b.latestPingedTime;
  e = 0 !== e ? e : f;
  0 === e && (0 === a || d < a) && (e = d);
  a = e;
  0 !== a && c > a && (a = c);
  b.nextExpirationTimeToWorkOn = e;
  b.expirationTime = a;
}

function L(a, b) {
  if (a && a.defaultProps) {
    b = n({}, b);
    a = a.defaultProps;

    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }

  return b;
}

function hf(a) {
  var b = a._result;

  switch (a._status) {
    case 1:
      return b;

    case 2:
      throw b;

    case 0:
      throw b;

    default:
      a._status = 0;
      b = a._ctor;
      b = b();
      b.then(function (b) {
        0 === a._status && (b = b.default, a._status = 1, a._result = b);
      }, function (b) {
        0 === a._status && (a._status = 2, a._result = b);
      });

      switch (a._status) {
        case 1:
          return a._result;

        case 2:
          throw a._result;
      }

      a._result = b;
      throw b;
  }
}

var jf = new aa.Component().refs;

function kf(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : n({}, b, c);
  a.memoizedState = c;
  d = a.updateQueue;
  null !== d && 0 === a.expirationTime && (d.baseState = c);
}

var tf = {
  isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? 2 === ed(a) : !1;
  },
  enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;
    var d = lf();
    d = mf(d, a);
    var e = nf(d);
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    of();
    pf(a, e);
    qf(a, d);
  },
  enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;
    var d = lf();
    d = mf(d, a);
    var e = nf(d);
    e.tag = rf;
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    of();
    pf(a, e);
    qf(a, d);
  },
  enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;
    var c = lf();
    c = mf(c, a);
    var d = nf(c);
    d.tag = sf;
    void 0 !== b && null !== b && (d.callback = b);
    of();
    pf(a, d);
    qf(a, c);
  }
};

function uf(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !dd(c, d) || !dd(e, f) : !0;
}

function vf(a, b, c) {
  var d = !1,
      e = He;
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? f = M(f) : (e = J(b) ? Ie : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Je(a, e) : He);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = tf;
  a.stateNode = b;
  b._reactInternalFiber = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}

function wf(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && tf.enqueueReplaceState(b, b.state, null);
}

function xf(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = jf;
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? e.context = M(f) : (f = J(b) ? Ie : H.current, e.context = Je(a, f));
  f = a.updateQueue;
  null !== f && (yf(a, f, c, e, d), e.state = a.memoizedState);
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (kf(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && tf.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (yf(a, f, c, e, d), e.state = a.memoizedState));
  "function" === typeof e.componentDidMount && (a.effectTag |= 4);
}

var zf = Array.isArray;

function Af(a, b, c) {
  a = c.ref;

  if (null !== a && "function" !== typeof a && "object" !== _typeof(a)) {
    if (c._owner) {
      c = c._owner;
      var d = void 0;
      c && (1 !== c.tag ? x("309") : void 0, d = c.stateNode);
      d ? void 0 : x("147", a);
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

      b = function b(a) {
        var b = d.refs;
        b === jf && (b = d.refs = {});
        null === a ? delete b[e] : b[e] = a;
      };

      b._stringRef = e;
      return b;
    }

    "string" !== typeof a ? x("284") : void 0;
    c._owner ? void 0 : x("290", a);
  }

  return a;
}

function Bf(a, b) {
  "textarea" !== a.type && x("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}

function Cf(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;
      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
      c.nextEffect = null;
      c.effectTag = 8;
    }
  }

  function c(c, d) {
    if (!a) return null;

    for (; null !== d;) {
      b(c, d), d = d.sibling;
    }

    return null;
  }

  function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }

    return a;
  }

  function e(a, b, c) {
    a = Xe(a, b, c);
    a.index = 0;
    a.sibling = null;
    return a;
  }

  function f(b, c, d) {
    b.index = d;
    if (!a) return c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
    b.effectTag = 2;
    return c;
  }

  function g(b) {
    a && null === b.alternate && (b.effectTag = 2);
    return b;
  }

  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = af(c, a.mode, d), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function l(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props, d), d.ref = Af(a, b, c), d.return = a, d;
    d = Ye(c.type, c.key, c.props, null, a.mode, d);
    d.ref = Af(a, b, c);
    d.return = a;
    return d;
  }

  function k(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = bf(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || [], d);
    b.return = a;
    return b;
  }

  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Ze(c, a.mode, d, f), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function p(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = af("" + b, a.mode, c), b.return = a, b;

    if ("object" === _typeof(b) && null !== b) {
      switch (b.$$typeof) {
        case Vb:
          return c = Ye(b.type, b.key, b.props, null, a.mode, c), c.ref = Af(a, null, b), c.return = a, c;

        case Wb:
          return b = bf(b, a.mode, c), b.return = a, b;
      }

      if (zf(b) || hc(b)) return b = Ze(b, a.mode, c, null), b.return = a, b;
      Bf(a, b);
    }

    return null;
  }

  function t(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

    if ("object" === _typeof(c) && null !== c) {
      switch (c.$$typeof) {
        case Vb:
          return c.key === e ? c.type === Xb ? m(a, b, c.props.children, d, e) : l(a, b, c, d) : null;

        case Wb:
          return c.key === e ? k(a, b, c, d) : null;
      }

      if (zf(c) || hc(c)) return null !== e ? null : m(a, b, c, d, null);
      Bf(a, c);
    }

    return null;
  }

  function A(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

    if ("object" === _typeof(d) && null !== d) {
      switch (d.$$typeof) {
        case Vb:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === Xb ? m(b, a, d.props.children, e, d.key) : l(b, a, d, e);

        case Wb:
          return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
      }

      if (zf(d) || hc(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      Bf(b, d);
    }

    return null;
  }

  function v(e, g, h, k) {
    for (var l = null, m = null, q = g, u = g = 0, B = null; null !== q && u < h.length; u++) {
      q.index > u ? (B = q, q = null) : B = q.sibling;
      var w = t(e, q, h[u], k);

      if (null === w) {
        null === q && (q = B);
        break;
      }

      a && q && null === w.alternate && b(e, q);
      g = f(w, g, u);
      null === m ? l = w : m.sibling = w;
      m = w;
      q = B;
    }

    if (u === h.length) return c(e, q), l;

    if (null === q) {
      for (; u < h.length; u++) {
        if (q = p(e, h[u], k)) g = f(q, g, u), null === m ? l = q : m.sibling = q, m = q;
      }

      return l;
    }

    for (q = d(e, q); u < h.length; u++) {
      if (B = A(q, e, u, h[u], k)) a && null !== B.alternate && q.delete(null === B.key ? u : B.key), g = f(B, g, u), null === m ? l = B : m.sibling = B, m = B;
    }

    a && q.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  function R(e, g, h, k) {
    var l = hc(h);
    "function" !== typeof l ? x("150") : void 0;
    h = l.call(h);
    null == h ? x("151") : void 0;

    for (var m = l = null, q = g, u = g = 0, B = null, w = h.next(); null !== q && !w.done; u++, w = h.next()) {
      q.index > u ? (B = q, q = null) : B = q.sibling;
      var v = t(e, q, w.value, k);

      if (null === v) {
        q || (q = B);
        break;
      }

      a && q && null === v.alternate && b(e, q);
      g = f(v, g, u);
      null === m ? l = v : m.sibling = v;
      m = v;
      q = B;
    }

    if (w.done) return c(e, q), l;

    if (null === q) {
      for (; !w.done; u++, w = h.next()) {
        w = p(e, w.value, k), null !== w && (g = f(w, g, u), null === m ? l = w : m.sibling = w, m = w);
      }

      return l;
    }

    for (q = d(e, q); !w.done; u++, w = h.next()) {
      w = A(q, e, u, w.value, k), null !== w && (a && null !== w.alternate && q.delete(null === w.key ? u : w.key), g = f(w, g, u), null === m ? l = w : m.sibling = w, m = w);
    }

    a && q.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  return function (a, d, f, h) {
    var k = "object" === _typeof(f) && null !== f && f.type === Xb && null === f.key;
    k && (f = f.props.children);
    var l = "object" === _typeof(f) && null !== f;
    if (l) switch (f.$$typeof) {
      case Vb:
        a: {
          l = f.key;

          for (k = d; null !== k;) {
            if (k.key === l) {
              if (7 === k.tag ? f.type === Xb : k.elementType === f.type) {
                c(a, k.sibling);
                d = e(k, f.type === Xb ? f.props.children : f.props, h);
                d.ref = Af(a, k, f);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, k);
                break;
              }
            } else b(a, k);
            k = k.sibling;
          }

          f.type === Xb ? (d = Ze(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Ye(f.type, f.key, f.props, null, a.mode, h), h.ref = Af(a, d, f), h.return = a, a = h);
        }

        return g(a);

      case Wb:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);
                d = e(d, f.children || [], h);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, d);
                break;
              }
            } else b(a, d);
            d = d.sibling;
          }

          d = bf(f, a.mode, h);
          d.return = a;
          a = d;
        }

        return g(a);
    }
    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = af(f, a.mode, h), d.return = a, a = d), g(a);
    if (zf(f)) return v(a, d, f, h);
    if (hc(f)) return R(a, d, f, h);
    l && Bf(a, f);
    if ("undefined" === typeof f && !k) switch (a.tag) {
      case 1:
      case 0:
        h = a.type, x("152", h.displayName || h.name || "Component");
    }
    return c(a, d);
  };
}

var Df = Cf(!0),
    Ef = Cf(!1),
    Ff = {},
    N = {
  current: Ff
},
    Gf = {
  current: Ff
},
    Hf = {
  current: Ff
};

function If(a) {
  a === Ff ? x("174") : void 0;
  return a;
}

function Jf(a, b) {
  G(Hf, b, a);
  G(Gf, a, a);
  G(N, Ff, a);
  var c = b.nodeType;

  switch (c) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : he(null, "");
      break;

    default:
      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = he(b, c);
  }

  F(N, a);
  G(N, b, a);
}

function Kf(a) {
  F(N, a);
  F(Gf, a);
  F(Hf, a);
}

function Lf(a) {
  If(Hf.current);
  var b = If(N.current);
  var c = he(b, a.type);
  b !== c && (G(Gf, a, a), G(N, c, a));
}

function Mf(a) {
  Gf.current === a && (F(N, a), F(Gf, a));
}

var Nf = 0,
    Of = 2,
    Pf = 4,
    Qf = 8,
    Rf = 16,
    Sf = 32,
    Tf = 64,
    Uf = 128,
    Vf = Tb.ReactCurrentDispatcher,
    Wf = 0,
    Xf = null,
    O = null,
    P = null,
    Yf = null,
    Q = null,
    Zf = null,
    $f = 0,
    ag = null,
    bg = 0,
    cg = !1,
    dg = null,
    eg = 0;

function fg() {
  x("321");
}

function gg(a, b) {
  if (null === b) return !1;

  for (var c = 0; c < b.length && c < a.length; c++) {
    if (!bd(a[c], b[c])) return !1;
  }

  return !0;
}

function hg(a, b, c, d, e, f) {
  Wf = f;
  Xf = b;
  P = null !== a ? a.memoizedState : null;
  Vf.current = null === P ? ig : jg;
  b = c(d, e);

  if (cg) {
    do {
      cg = !1, eg += 1, P = null !== a ? a.memoizedState : null, Zf = Yf, ag = Q = O = null, Vf.current = jg, b = c(d, e);
    } while (cg);

    dg = null;
    eg = 0;
  }

  Vf.current = kg;
  a = Xf;
  a.memoizedState = Yf;
  a.expirationTime = $f;
  a.updateQueue = ag;
  a.effectTag |= bg;
  a = null !== O && null !== O.next;
  Wf = 0;
  Zf = Q = Yf = P = O = Xf = null;
  $f = 0;
  ag = null;
  bg = 0;
  a ? x("300") : void 0;
  return b;
}

function lg() {
  Vf.current = kg;
  Wf = 0;
  Zf = Q = Yf = P = O = Xf = null;
  $f = 0;
  ag = null;
  bg = 0;
  cg = !1;
  dg = null;
  eg = 0;
}

function mg() {
  var a = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === Q ? Yf = Q = a : Q = Q.next = a;
  return Q;
}

function ng() {
  if (null !== Zf) Q = Zf, Zf = Q.next, O = P, P = null !== O ? O.next : null;else {
    null === P ? x("310") : void 0;
    O = P;
    var a = {
      memoizedState: O.memoizedState,
      baseState: O.baseState,
      queue: O.queue,
      baseUpdate: O.baseUpdate,
      next: null
    };
    Q = null === Q ? Yf = a : Q.next = a;
    P = O.next;
  }
  return Q;
}

function og(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function pg(a) {
  var b = ng(),
      c = b.queue;
  null === c ? x("311") : void 0;
  c.lastRenderedReducer = a;

  if (0 < eg) {
    var d = c.dispatch;

    if (null !== dg) {
      var e = dg.get(c);

      if (void 0 !== e) {
        dg.delete(c);
        var f = b.memoizedState;

        do {
          f = a(f, e.action), e = e.next;
        } while (null !== e);

        bd(f, b.memoizedState) || (qg = !0);
        b.memoizedState = f;
        b.baseUpdate === c.last && (b.baseState = f);
        c.lastRenderedState = f;
        return [f, d];
      }
    }

    return [b.memoizedState, d];
  }

  d = c.last;
  var g = b.baseUpdate;
  f = b.baseState;
  null !== g ? (null !== d && (d.next = null), d = g.next) : d = null !== d ? d.next : null;

  if (null !== d) {
    var h = e = null,
        l = d,
        k = !1;

    do {
      var m = l.expirationTime;
      m < Wf ? (k || (k = !0, h = g, e = f), m > $f && ($f = m)) : f = l.eagerReducer === a ? l.eagerState : a(f, l.action);
      g = l;
      l = l.next;
    } while (null !== l && l !== d);

    k || (h = g, e = f);
    bd(f, b.memoizedState) || (qg = !0);
    b.memoizedState = f;
    b.baseUpdate = h;
    b.baseState = e;
    c.lastRenderedState = f;
  }

  return [b.memoizedState, c.dispatch];
}

function rg(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  null === ag ? (ag = {
    lastEffect: null
  }, ag.lastEffect = a.next = a) : (b = ag.lastEffect, null === b ? ag.lastEffect = a.next = a : (c = b.next, b.next = a, a.next = c, ag.lastEffect = a));
  return a;
}

function sg(a, b, c, d) {
  var e = mg();
  bg |= a;
  e.memoizedState = rg(b, c, void 0, void 0 === d ? null : d);
}

function tg(a, b, c, d) {
  var e = ng();
  d = void 0 === d ? null : d;
  var f = void 0;

  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;

    if (null !== d && gg(d, g.deps)) {
      rg(Nf, c, f, d);
      return;
    }
  }

  bg |= a;
  e.memoizedState = rg(b, c, f, d);
}

function ug(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}

function vg() {}

function wg(a, b, c) {
  25 > eg ? void 0 : x("301");
  var d = a.alternate;
  if (a === Xf || null !== d && d === Xf) {
    if (cg = !0, a = {
      expirationTime: Wf,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    }, null === dg && (dg = new Map()), c = dg.get(b), void 0 === c) dg.set(b, a);else {
      for (b = c; null !== b.next;) {
        b = b.next;
      }

      b.next = a;
    }
  } else {
    of();
    var e = lf();
    e = mf(e, a);
    var f = {
      expirationTime: e,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    },
        g = b.last;
    if (null === g) f.next = f;else {
      var h = g.next;
      null !== h && (f.next = h);
      g.next = f;
    }
    b.last = f;
    if (0 === a.expirationTime && (null === d || 0 === d.expirationTime) && (d = b.lastRenderedReducer, null !== d)) try {
      var l = b.lastRenderedState,
          k = d(l, c);
      f.eagerReducer = d;
      f.eagerState = k;
      if (bd(k, l)) return;
    } catch (m) {} finally {}
    qf(a, e);
  }
}

var kg = {
  readContext: M,
  useCallback: fg,
  useContext: fg,
  useEffect: fg,
  useImperativeHandle: fg,
  useLayoutEffect: fg,
  useMemo: fg,
  useReducer: fg,
  useRef: fg,
  useState: fg,
  useDebugValue: fg
},
    ig = {
  readContext: M,
  useCallback: function useCallback(a, b) {
    mg().memoizedState = [a, void 0 === b ? null : b];
    return a;
  },
  useContext: M,
  useEffect: function useEffect(a, b) {
    return sg(516, Uf | Tf, a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return sg(4, Pf | Sf, ug.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return sg(4, Pf | Sf, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = mg();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: function useReducer(a, b, c) {
    var d = mg();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: a,
      lastRenderedState: b
    };
    a = a.dispatch = wg.bind(null, Xf, a);
    return [d.memoizedState, a];
  },
  useRef: function useRef(a) {
    var b = mg();
    a = {
      current: a
    };
    return b.memoizedState = a;
  },
  useState: function useState(a) {
    var b = mg();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: og,
      lastRenderedState: a
    };
    a = a.dispatch = wg.bind(null, Xf, a);
    return [b.memoizedState, a];
  },
  useDebugValue: vg
},
    jg = {
  readContext: M,
  useCallback: function useCallback(a, b) {
    var c = ng();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && gg(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  },
  useContext: M,
  useEffect: function useEffect(a, b) {
    return tg(516, Uf | Tf, a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return tg(4, Pf | Sf, ug.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return tg(4, Pf | Sf, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = ng();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && gg(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: pg,
  useRef: function useRef() {
    return ng().memoizedState;
  },
  useState: function useState(a) {
    return pg(og, a);
  },
  useDebugValue: vg
},
    xg = null,
    yg = null,
    zg = !1;

function Ag(a, b) {
  var c = K(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.effectTag = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}

function Bg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, !0) : !1;

    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

    case 13:
      return !1;

    default:
      return !1;
  }
}

function Cg(a) {
  if (zg) {
    var b = yg;

    if (b) {
      var c = b;

      if (!Bg(a, b)) {
        b = De(c);

        if (!b || !Bg(a, b)) {
          a.effectTag |= 2;
          zg = !1;
          xg = a;
          return;
        }

        Ag(xg, c);
      }

      xg = a;
      yg = Ee(b);
    } else a.effectTag |= 2, zg = !1, xg = a;
  }
}

function Dg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 18 !== a.tag;) {
    a = a.return;
  }

  xg = a;
}

function Eg(a) {
  if (a !== xg) return !1;
  if (!zg) return Dg(a), zg = !0, !1;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !xe(b, a.memoizedProps)) for (b = yg; b;) {
    Ag(a, b), b = De(b);
  }
  Dg(a);
  yg = xg ? De(a.stateNode) : null;
  return !0;
}

function Fg() {
  yg = xg = null;
  zg = !1;
}

var Gg = Tb.ReactCurrentOwner,
    qg = !1;

function S(a, b, c, d) {
  b.child = null === a ? Ef(b, null, c, d) : Df(b, a.child, c, d);
}

function Hg(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  Ig(b, e);
  d = hg(a, b, c, d, f, e);
  if (null !== a && !qg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Jg(a, b, e);
  b.effectTag |= 1;
  S(a, b, d, e);
  return b.child;
}

function Kg(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;
    if ("function" === typeof g && !Ve(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, Lg(a, b, g, d, e, f);
    a = Ye(c.type, null, d, null, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  g = a.child;
  if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : dd, c(e, d) && a.ref === b.ref)) return Jg(a, b, f);
  b.effectTag |= 1;
  a = Xe(g, d, f);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}

function Lg(a, b, c, d, e, f) {
  return null !== a && dd(a.memoizedProps, d) && a.ref === b.ref && (qg = !1, e < f) ? Jg(a, b, f) : Mg(a, b, c, d, f);
}

function Ng(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}

function Mg(a, b, c, d, e) {
  var f = J(c) ? Ie : H.current;
  f = Je(b, f);
  Ig(b, e);
  c = hg(a, b, c, d, f, e);
  if (null !== a && !qg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Jg(a, b, e);
  b.effectTag |= 1;
  S(a, b, c, e);
  return b.child;
}

function Og(a, b, c, d, e) {
  if (J(c)) {
    var f = !0;
    Oe(b);
  } else f = !1;

  Ig(b, e);
  if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), vf(b, c, d, e), xf(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;
    g.props = h;
    var l = g.context,
        k = c.contextType;
    "object" === _typeof(k) && null !== k ? k = M(k) : (k = J(c) ? Ie : H.current, k = Je(b, k));
    var m = c.getDerivedStateFromProps,
        p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    p || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && wf(b, g, d, k);
    Pg = !1;
    var t = b.memoizedState;
    l = g.state = t;
    var A = b.updateQueue;
    null !== A && (yf(b, A, d, g, e), l = b.memoizedState);
    h !== d || t !== l || I.current || Pg ? ("function" === typeof m && (kf(b, c, m, d), l = b.memoizedState), (h = Pg || uf(b, c, h, d, t, l, k)) ? (p || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = l), g.props = d, g.state = l, g.context = k, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
  } else g = b.stateNode, h = b.memoizedProps, g.props = b.type === b.elementType ? h : L(b.type, h), l = g.context, k = c.contextType, "object" === _typeof(k) && null !== k ? k = M(k) : (k = J(c) ? Ie : H.current, k = Je(b, k)), m = c.getDerivedStateFromProps, (p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && wf(b, g, d, k), Pg = !1, l = b.memoizedState, t = g.state = l, A = b.updateQueue, null !== A && (yf(b, A, d, g, e), t = b.memoizedState), h !== d || l !== t || I.current || Pg ? ("function" === typeof m && (kf(b, c, m, d), t = b.memoizedState), (m = Pg || uf(b, c, h, d, l, t, k)) ? (p || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, t, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, t, k)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = t), g.props = d, g.state = t, g.context = k, d = m) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), d = !1);
  return Qg(a, b, c, d, f, e);
}

function Qg(a, b, c, d, e, f) {
  Ng(a, b);
  var g = 0 !== (b.effectTag & 64);
  if (!d && !g) return e && Pe(b, c, !1), Jg(a, b, f);
  d = b.stateNode;
  Gg.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.effectTag |= 1;
  null !== a && g ? (b.child = Df(b, a.child, null, f), b.child = Df(b, null, h, f)) : S(a, b, h, f);
  b.memoizedState = d.state;
  e && Pe(b, c, !0);
  return b.child;
}

function Rg(a) {
  var b = a.stateNode;
  b.pendingContext ? Me(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Me(a, b.context, !1);
  Jf(a, b.containerInfo);
}

function Sg(a, b, c) {
  var d = b.mode,
      e = b.pendingProps,
      f = b.memoizedState;

  if (0 === (b.effectTag & 64)) {
    f = null;
    var g = !1;
  } else f = {
    timedOutAt: null !== f ? f.timedOutAt : 0
  }, g = !0, b.effectTag &= -65;

  if (null === a) {
    if (g) {
      var h = e.fallback;
      a = Ze(null, d, 0, null);
      0 === (b.mode & 1) && (a.child = null !== b.memoizedState ? b.child.child : b.child);
      d = Ze(h, d, c, null);
      a.sibling = d;
      c = a;
      c.return = d.return = b;
    } else c = d = Ef(b, null, e.children, c);
  } else null !== a.memoizedState ? (d = a.child, h = d.sibling, g ? (c = e.fallback, e = Xe(d, d.pendingProps, 0), 0 === (b.mode & 1) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== d.child && (e.child = g)), d = e.sibling = Xe(h, c, h.expirationTime), c = e, e.childExpirationTime = 0, c.return = d.return = b) : c = d = Df(b, d.child, e.children, c)) : (h = a.child, g ? (g = e.fallback, e = Ze(null, d, 0, null), e.child = h, 0 === (b.mode & 1) && (e.child = null !== b.memoizedState ? b.child.child : b.child), d = e.sibling = Ze(g, d, c, null), d.effectTag |= 2, c = e, e.childExpirationTime = 0, c.return = d.return = b) : d = c = Df(b, h, e.children, c)), b.stateNode = a.stateNode;
  b.memoizedState = f;
  b.child = c;
  return d;
}

function Jg(a, b, c) {
  null !== a && (b.contextDependencies = a.contextDependencies);
  if (b.childExpirationTime < c) return null;
  null !== a && b.child !== a.child ? x("153") : void 0;

  if (null !== b.child) {
    a = b.child;
    c = Xe(a, a.pendingProps, a.expirationTime);
    b.child = c;

    for (c.return = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = Xe(a, a.pendingProps, a.expirationTime), c.return = b;
    }

    c.sibling = null;
  }

  return b.child;
}

function Tg(a, b, c) {
  var d = b.expirationTime;
  if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || I.current) qg = !0;else {
      if (d < c) {
        qg = !1;

        switch (b.tag) {
          case 3:
            Rg(b);
            Fg();
            break;

          case 5:
            Lf(b);
            break;

          case 1:
            J(b.type) && Oe(b);
            break;

          case 4:
            Jf(b, b.stateNode.containerInfo);
            break;

          case 10:
            Ug(b, b.memoizedProps.value);
            break;

          case 13:
            if (null !== b.memoizedState) {
              d = b.child.childExpirationTime;
              if (0 !== d && d >= c) return Sg(a, b, c);
              b = Jg(a, b, c);
              return null !== b ? b.sibling : null;
            }

        }

        return Jg(a, b, c);
      }
    }
  } else qg = !1;
  b.expirationTime = 0;

  switch (b.tag) {
    case 2:
      d = b.elementType;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      a = b.pendingProps;
      var e = Je(b, H.current);
      Ig(b, c);
      e = hg(null, b, d, a, e, c);
      b.effectTag |= 1;

      if ("object" === _typeof(e) && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        lg();

        if (J(d)) {
          var f = !0;
          Oe(b);
        } else f = !1;

        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        var g = d.getDerivedStateFromProps;
        "function" === typeof g && kf(b, d, g, a);
        e.updater = tf;
        b.stateNode = e;
        e._reactInternalFiber = b;
        xf(b, d, a, c);
        b = Qg(null, b, d, !0, f, c);
      } else b.tag = 0, S(null, b, e, c), b = b.child;

      return b;

    case 16:
      e = b.elementType;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      f = b.pendingProps;
      a = hf(e);
      b.type = a;
      e = b.tag = We(a);
      f = L(a, f);
      g = void 0;

      switch (e) {
        case 0:
          g = Mg(null, b, a, f, c);
          break;

        case 1:
          g = Og(null, b, a, f, c);
          break;

        case 11:
          g = Hg(null, b, a, f, c);
          break;

        case 14:
          g = Kg(null, b, a, L(a.type, f), d, c);
          break;

        default:
          x("306", a, "");
      }

      return g;

    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Mg(a, b, d, e, c);

    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Og(a, b, d, e, c);

    case 3:
      Rg(b);
      d = b.updateQueue;
      null === d ? x("282") : void 0;
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      yf(b, d, b.pendingProps, null, c);
      d = b.memoizedState.element;
      if (d === e) Fg(), b = Jg(a, b, c);else {
        e = b.stateNode;
        if (e = (null === a || null === a.child) && e.hydrate) yg = Ee(b.stateNode.containerInfo), xg = b, e = zg = !0;
        e ? (b.effectTag |= 2, b.child = Ef(b, null, d, c)) : (S(a, b, d, c), Fg());
        b = b.child;
      }
      return b;

    case 5:
      return Lf(b), null === a && Cg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, xe(d, e) ? g = null : null !== f && xe(d, f) && (b.effectTag |= 16), Ng(a, b), 1 !== c && b.mode & 1 && e.hidden ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (S(a, b, g, c), b = b.child), b;

    case 6:
      return null === a && Cg(b), null;

    case 13:
      return Sg(a, b, c);

    case 4:
      return Jf(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Df(b, null, d, c) : S(a, b, d, c), b.child;

    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), Hg(a, b, d, e, c);

    case 7:
      return S(a, b, b.pendingProps, c), b.child;

    case 8:
      return S(a, b, b.pendingProps.children, c), b.child;

    case 12:
      return S(a, b, b.pendingProps.children, c), b.child;

    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        Ug(b, f);

        if (null !== g) {
          var h = g.value;
          f = bd(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

          if (0 === f) {
            if (g.children === e.children && !I.current) {
              b = Jg(a, b, c);
              break a;
            }
          } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
            var l = h.contextDependencies;

            if (null !== l) {
              g = h.child;

              for (var k = l.first; null !== k;) {
                if (k.context === d && 0 !== (k.observedBits & f)) {
                  1 === h.tag && (k = nf(c), k.tag = sf, pf(h, k));
                  h.expirationTime < c && (h.expirationTime = c);
                  k = h.alternate;
                  null !== k && k.expirationTime < c && (k.expirationTime = c);
                  k = c;

                  for (var m = h.return; null !== m;) {
                    var p = m.alternate;
                    if (m.childExpirationTime < k) m.childExpirationTime = k, null !== p && p.childExpirationTime < k && (p.childExpirationTime = k);else if (null !== p && p.childExpirationTime < k) p.childExpirationTime = k;else break;
                    m = m.return;
                  }

                  l.expirationTime < c && (l.expirationTime = c);
                  break;
                }

                k = k.next;
              }
            } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

            if (null !== g) g.return = h;else for (g = h; null !== g;) {
              if (g === b) {
                g = null;
                break;
              }

              h = g.sibling;

              if (null !== h) {
                h.return = g.return;
                g = h;
                break;
              }

              g = g.return;
            }
            h = g;
          }
        }

        S(a, b, e.children, c);
        b = b.child;
      }

      return b;

    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, Ig(b, c), e = M(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, S(a, b, d, c), b.child;

    case 14:
      return e = b.type, f = L(e, b.pendingProps), f = L(e.type, f), Kg(a, b, e, f, d, c);

    case 15:
      return Lg(a, b, b.type, b.pendingProps, d, c);

    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : L(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, J(d) ? (a = !0, Oe(b)) : a = !1, Ig(b, c), vf(b, d, e, c), xf(b, d, e, c), Qg(null, b, d, !0, a, c);
  }

  x("156");
}

var Vg = {
  current: null
},
    Wg = null,
    Xg = null,
    Yg = null;

function Ug(a, b) {
  var c = a.type._context;
  G(Vg, c._currentValue, a);
  c._currentValue = b;
}

function Zg(a) {
  var b = Vg.current;
  F(Vg, a);
  a.type._context._currentValue = b;
}

function Ig(a, b) {
  Wg = a;
  Yg = Xg = null;
  var c = a.contextDependencies;
  null !== c && c.expirationTime >= b && (qg = !0);
  a.contextDependencies = null;
}

function M(a, b) {
  if (Yg !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) Yg = a, b = 1073741823;
    b = {
      context: a,
      observedBits: b,
      next: null
    };
    null === Xg ? (null === Wg ? x("308") : void 0, Xg = b, Wg.contextDependencies = {
      first: b,
      expirationTime: 0
    }) : Xg = Xg.next = b;
  }

  return a._currentValue;
}

var $g = 0,
    rf = 1,
    sf = 2,
    ah = 3,
    Pg = !1;

function bh(a) {
  return {
    baseState: a,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function ch(a) {
  return {
    baseState: a.baseState,
    firstUpdate: a.firstUpdate,
    lastUpdate: a.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function nf(a) {
  return {
    expirationTime: a,
    tag: $g,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}

function dh(a, b) {
  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
}

function pf(a, b) {
  var c = a.alternate;

  if (null === c) {
    var d = a.updateQueue;
    var e = null;
    null === d && (d = a.updateQueue = bh(a.memoizedState));
  } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = bh(a.memoizedState), e = c.updateQueue = bh(c.memoizedState)) : d = a.updateQueue = ch(e) : null === e && (e = c.updateQueue = ch(d));

  null === e || d === e ? dh(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (dh(d, b), dh(e, b)) : (dh(d, b), e.lastUpdate = b);
}

function eh(a, b) {
  var c = a.updateQueue;
  c = null === c ? a.updateQueue = bh(a.memoizedState) : fh(a, c);
  null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
}

function fh(a, b) {
  var c = a.alternate;
  null !== c && b === c.updateQueue && (b = a.updateQueue = ch(b));
  return b;
}

function gh(a, b, c, d, e, f) {
  switch (c.tag) {
    case rf:
      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

    case ah:
      a.effectTag = a.effectTag & -2049 | 64;

    case $g:
      a = c.payload;
      e = "function" === typeof a ? a.call(f, d, e) : a;
      if (null === e || void 0 === e) break;
      return n({}, d, e);

    case sf:
      Pg = !0;
  }

  return d;
}

function yf(a, b, c, d, e) {
  Pg = !1;
  b = fh(a, b);

  for (var f = b.baseState, g = null, h = 0, l = b.firstUpdate, k = f; null !== l;) {
    var m = l.expirationTime;
    m < e ? (null === g && (g = l, f = k), h < m && (h = m)) : (k = gh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = l : (b.lastEffect.nextEffect = l, b.lastEffect = l)));
    l = l.next;
  }

  m = null;

  for (l = b.firstCapturedUpdate; null !== l;) {
    var p = l.expirationTime;
    p < e ? (null === m && (m = l, null === g && (f = k)), h < p && (h = p)) : (k = gh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = l : (b.lastCapturedEffect.nextEffect = l, b.lastCapturedEffect = l)));
    l = l.next;
  }

  null === g && (b.lastUpdate = null);
  null === m ? b.lastCapturedUpdate = null : a.effectTag |= 32;
  null === g && null === m && (f = k);
  b.baseState = f;
  b.firstUpdate = g;
  b.firstCapturedUpdate = m;
  a.expirationTime = h;
  a.memoizedState = k;
}

function hh(a, b, c) {
  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
  ih(b.firstEffect, c);
  b.firstEffect = b.lastEffect = null;
  ih(b.firstCapturedEffect, c);
  b.firstCapturedEffect = b.lastCapturedEffect = null;
}

function ih(a, b) {
  for (; null !== a;) {
    var c = a.callback;

    if (null !== c) {
      a.callback = null;
      var d = b;
      "function" !== typeof c ? x("191", c) : void 0;
      c.call(d);
    }

    a = a.nextEffect;
  }
}

function jh(a, b) {
  return {
    value: a,
    source: b,
    stack: jc(b)
  };
}

function kh(a) {
  a.effectTag |= 4;
}

var lh = void 0,
    mh = void 0,
    nh = void 0,
    oh = void 0;

lh = function lh(a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
};

mh = function mh() {};

nh = function nh(a, b, c, d, e) {
  var f = a.memoizedProps;

  if (f !== d) {
    var g = b.stateNode;
    If(N.current);
    a = null;

    switch (c) {
      case "input":
        f = vc(g, f);
        d = vc(g, d);
        a = [];
        break;

      case "option":
        f = $d(g, f);
        d = $d(g, d);
        a = [];
        break;

      case "select":
        f = n({}, f, {
          value: void 0
        });
        d = n({}, d, {
          value: void 0
        });
        a = [];
        break;

      case "textarea":
        f = be(g, f);
        d = be(g, d);
        a = [];
        break;

      default:
        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = te);
    }

    qe(c, d);
    g = c = void 0;
    var h = null;

    for (c in f) {
      if (!d.hasOwnProperty(c) && f.hasOwnProperty(c) && null != f[c]) if ("style" === c) {
        var l = f[c];

        for (g in l) {
          l.hasOwnProperty(g) && (h || (h = {}), h[g] = "");
        }
      } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (ra.hasOwnProperty(c) ? a || (a = []) : (a = a || []).push(c, null));
    }

    for (c in d) {
      var k = d[c];
      l = null != f ? f[c] : void 0;
      if (d.hasOwnProperty(c) && k !== l && (null != k || null != l)) if ("style" === c) {
        if (l) {
          for (g in l) {
            !l.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (h || (h = {}), h[g] = "");
          }

          for (g in k) {
            k.hasOwnProperty(g) && l[g] !== k[g] && (h || (h = {}), h[g] = k[g]);
          }
        } else h || (a || (a = []), a.push(c, h)), h = k;
      } else "dangerouslySetInnerHTML" === c ? (k = k ? k.__html : void 0, l = l ? l.__html : void 0, null != k && l !== k && (a = a || []).push(c, "" + k)) : "children" === c ? l === k || "string" !== typeof k && "number" !== typeof k || (a = a || []).push(c, "" + k) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (ra.hasOwnProperty(c) ? (null != k && se(e, c), a || l === k || (a = [])) : (a = a || []).push(c, k));
    }

    h && (a = a || []).push("style", h);
    e = a;
    (b.updateQueue = e) && kh(b);
  }
};

oh = function oh(a, b, c, d) {
  c !== d && kh(b);
};

var ph = "function" === typeof WeakSet ? WeakSet : Set;

function qh(a, b) {
  var c = b.source,
      d = b.stack;
  null === d && null !== c && (d = jc(c));
  null !== c && ic(c.type);
  b = b.value;
  null !== a && 1 === a.tag && ic(a.type);

  try {
    console.error(b);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}

function rh(a) {
  var b = a.ref;
  if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    sh(a, c);
  } else b.current = null;
}

function th(a, b, c) {
  c = c.updateQueue;
  c = null !== c ? c.lastEffect : null;

  if (null !== c) {
    var d = c = c.next;

    do {
      if ((d.tag & a) !== Nf) {
        var e = d.destroy;
        d.destroy = void 0;
        void 0 !== e && e();
      }

      (d.tag & b) !== Nf && (e = d.create, d.destroy = e());
      d = d.next;
    } while (d !== c);
  }
}

function uh(a, b) {
  for (var c = a;;) {
    if (5 === c.tag) {
      var d = c.stateNode;
      if (b) d.style.display = "none";else {
        d = c.stateNode;
        var e = c.memoizedProps.style;
        e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
        d.style.display = ne("display", e);
      }
    } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;else if (13 === c.tag && null !== c.memoizedState) {
      d = c.child.sibling;
      d.return = c;
      c = d;
      continue;
    } else if (null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }

    if (c === a) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === a) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
}

function vh(a) {
  "function" === typeof Re && Re(a);

  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      var b = a.updateQueue;

      if (null !== b && (b = b.lastEffect, null !== b)) {
        var c = b = b.next;

        do {
          var d = c.destroy;

          if (void 0 !== d) {
            var e = a;

            try {
              d();
            } catch (f) {
              sh(e, f);
            }
          }

          c = c.next;
        } while (c !== b);
      }

      break;

    case 1:
      rh(a);
      b = a.stateNode;
      if ("function" === typeof b.componentWillUnmount) try {
        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
      } catch (f) {
        sh(a, f);
      }
      break;

    case 5:
      rh(a);
      break;

    case 4:
      wh(a);
  }
}

function xh(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}

function yh(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (xh(b)) {
        var c = b;
        break a;
      }

      b = b.return;
    }

    x("160");
    c = void 0;
  }

  var d = b = void 0;

  switch (c.tag) {
    case 5:
      b = c.stateNode;
      d = !1;
      break;

    case 3:
      b = c.stateNode.containerInfo;
      d = !0;
      break;

    case 4:
      b = c.stateNode.containerInfo;
      d = !0;
      break;

    default:
      x("161");
  }

  c.effectTag & 16 && (ke(b, ""), c.effectTag &= -17);

  a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || xh(c.return)) {
        c = null;
        break a;
      }

      c = c.return;
    }

    c.sibling.return = c.return;

    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
      if (c.effectTag & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }

    if (!(c.effectTag & 2)) {
      c = c.stateNode;
      break a;
    }
  }

  for (var e = a;;) {
    if (5 === e.tag || 6 === e.tag) {
      if (c) {
        if (d) {
          var f = b,
              g = e.stateNode,
              h = c;
          8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
        } else b.insertBefore(e.stateNode, c);
      } else d ? (g = b, h = e.stateNode, 8 === g.nodeType ? (f = g.parentNode, f.insertBefore(h, g)) : (f = g, f.appendChild(h)), g = g._reactRootContainer, null !== g && void 0 !== g || null !== f.onclick || (f.onclick = te)) : b.appendChild(e.stateNode);
    } else if (4 !== e.tag && null !== e.child) {
      e.child.return = e;
      e = e.child;
      continue;
    }
    if (e === a) break;

    for (; null === e.sibling;) {
      if (null === e.return || e.return === a) return;
      e = e.return;
    }

    e.sibling.return = e.return;
    e = e.sibling;
  }
}

function wh(a) {
  for (var b = a, c = !1, d = void 0, e = void 0;;) {
    if (!c) {
      c = b.return;

      a: for (;;) {
        null === c ? x("160") : void 0;

        switch (c.tag) {
          case 5:
            d = c.stateNode;
            e = !1;
            break a;

          case 3:
            d = c.stateNode.containerInfo;
            e = !0;
            break a;

          case 4:
            d = c.stateNode.containerInfo;
            e = !0;
            break a;
        }

        c = c.return;
      }

      c = !0;
    }

    if (5 === b.tag || 6 === b.tag) {
      a: for (var f = b, g = f;;) {
        if (vh(g), null !== g.child && 4 !== g.tag) g.child.return = g, g = g.child;else {
          if (g === f) break;

          for (; null === g.sibling;) {
            if (null === g.return || g.return === f) break a;
            g = g.return;
          }

          g.sibling.return = g.return;
          g = g.sibling;
        }
      }

      e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
    } else if (4 === b.tag) {
      if (null !== b.child) {
        d = b.stateNode.containerInfo;
        e = !0;
        b.child.return = b;
        b = b.child;
        continue;
      }
    } else if (vh(b), null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }

    if (b === a) break;

    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return;
      b = b.return;
      4 === b.tag && (c = !1);
    }

    b.sibling.return = b.return;
    b = b.sibling;
  }
}

function zh(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      th(Pf, Qf, b);
      break;

    case 1:
      break;

    case 5:
      var c = b.stateNode;

      if (null != c) {
        var d = b.memoizedProps;
        a = null !== a ? a.memoizedProps : d;
        var e = b.type,
            f = b.updateQueue;
        b.updateQueue = null;
        null !== f && Ce(c, f, e, a, d, b);
      }

      break;

    case 6:
      null === b.stateNode ? x("162") : void 0;
      b.stateNode.nodeValue = b.memoizedProps;
      break;

    case 3:
      break;

    case 12:
      break;

    case 13:
      c = b.memoizedState;
      d = void 0;
      a = b;
      null === c ? d = !1 : (d = !0, a = b.child, 0 === c.timedOutAt && (c.timedOutAt = lf()));
      null !== a && uh(a, d);
      c = b.updateQueue;

      if (null !== c) {
        b.updateQueue = null;
        var g = b.stateNode;
        null === g && (g = b.stateNode = new ph());
        c.forEach(function (a) {
          var c = Ah.bind(null, b, a);
          g.has(a) || (g.add(a), a.then(c, c));
        });
      }

      break;

    case 17:
      break;

    default:
      x("163");
  }
}

var Bh = "function" === typeof WeakMap ? WeakMap : Map;

function Ch(a, b, c) {
  c = nf(c);
  c.tag = ah;
  c.payload = {
    element: null
  };
  var d = b.value;

  c.callback = function () {
    Dh(d);
    qh(a, b);
  };

  return c;
}

function Eh(a, b, c) {
  c = nf(c);
  c.tag = ah;
  var d = a.type.getDerivedStateFromError;

  if ("function" === typeof d) {
    var e = b.value;

    c.payload = function () {
      return d(e);
    };
  }

  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === Fh ? Fh = new Set([this]) : Fh.add(this));
    var c = b.value,
        e = b.stack;
    qh(a, b);
    this.componentDidCatch(c, {
      componentStack: null !== e ? e : ""
    });
  });
  return c;
}

function Gh(a) {
  switch (a.tag) {
    case 1:
      J(a.type) && Ke(a);
      var b = a.effectTag;
      return b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;

    case 3:
      return Kf(a), Le(a), b = a.effectTag, 0 !== (b & 64) ? x("285") : void 0, a.effectTag = b & -2049 | 64, a;

    case 5:
      return Mf(a), null;

    case 13:
      return b = a.effectTag, b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;

    case 18:
      return null;

    case 4:
      return Kf(a), null;

    case 10:
      return Zg(a), null;

    default:
      return null;
  }
}

var Hh = Tb.ReactCurrentDispatcher,
    Ih = Tb.ReactCurrentOwner,
    Jh = 1073741822,
    Kh = !1,
    T = null,
    Lh = null,
    U = 0,
    Mh = -1,
    Nh = !1,
    V = null,
    Oh = !1,
    Ph = null,
    Qh = null,
    Rh = null,
    Fh = null;

function Sh() {
  if (null !== T) for (var a = T.return; null !== a;) {
    var b = a;

    switch (b.tag) {
      case 1:
        var c = b.type.childContextTypes;
        null !== c && void 0 !== c && Ke(b);
        break;

      case 3:
        Kf(b);
        Le(b);
        break;

      case 5:
        Mf(b);
        break;

      case 4:
        Kf(b);
        break;

      case 10:
        Zg(b);
    }

    a = a.return;
  }
  Lh = null;
  U = 0;
  Mh = -1;
  Nh = !1;
  T = null;
}

function Th() {
  for (; null !== V;) {
    var a = V.effectTag;
    a & 16 && ke(V.stateNode, "");

    if (a & 128) {
      var b = V.alternate;
      null !== b && (b = b.ref, null !== b && ("function" === typeof b ? b(null) : b.current = null));
    }

    switch (a & 14) {
      case 2:
        yh(V);
        V.effectTag &= -3;
        break;

      case 6:
        yh(V);
        V.effectTag &= -3;
        zh(V.alternate, V);
        break;

      case 4:
        zh(V.alternate, V);
        break;

      case 8:
        a = V, wh(a), a.return = null, a.child = null, a.memoizedState = null, a.updateQueue = null, a = a.alternate, null !== a && (a.return = null, a.child = null, a.memoizedState = null, a.updateQueue = null);
    }

    V = V.nextEffect;
  }
}

function Uh() {
  for (; null !== V;) {
    if (V.effectTag & 256) a: {
      var a = V.alternate,
          b = V;

      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          th(Of, Nf, b);
          break a;

        case 1:
          if (b.effectTag & 256 && null !== a) {
            var c = a.memoizedProps,
                d = a.memoizedState;
            a = b.stateNode;
            b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : L(b.type, c), d);
            a.__reactInternalSnapshotBeforeUpdate = b;
          }

          break a;

        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          break a;

        default:
          x("163");
      }
    }
    V = V.nextEffect;
  }
}

function Vh(a, b) {
  for (; null !== V;) {
    var c = V.effectTag;

    if (c & 36) {
      var d = V.alternate,
          e = V,
          f = b;

      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          th(Rf, Sf, e);
          break;

        case 1:
          var g = e.stateNode;
          if (e.effectTag & 4) if (null === d) g.componentDidMount();else {
            var h = e.elementType === e.type ? d.memoizedProps : L(e.type, d.memoizedProps);
            g.componentDidUpdate(h, d.memoizedState, g.__reactInternalSnapshotBeforeUpdate);
          }
          d = e.updateQueue;
          null !== d && hh(e, d, g, f);
          break;

        case 3:
          d = e.updateQueue;

          if (null !== d) {
            g = null;
            if (null !== e.child) switch (e.child.tag) {
              case 5:
                g = e.child.stateNode;
                break;

              case 1:
                g = e.child.stateNode;
            }
            hh(e, d, g, f);
          }

          break;

        case 5:
          f = e.stateNode;
          null === d && e.effectTag & 4 && we(e.type, e.memoizedProps) && f.focus();
          break;

        case 6:
          break;

        case 4:
          break;

        case 12:
          break;

        case 13:
          break;

        case 17:
          break;

        default:
          x("163");
      }
    }

    c & 128 && (e = V.ref, null !== e && (f = V.stateNode, "function" === typeof e ? e(f) : e.current = f));
    c & 512 && (Ph = a);
    V = V.nextEffect;
  }
}

function Wh(a, b) {
  Rh = Qh = Ph = null;
  var c = W;
  W = !0;

  do {
    if (b.effectTag & 512) {
      var d = !1,
          e = void 0;

      try {
        var f = b;
        th(Uf, Nf, f);
        th(Nf, Tf, f);
      } catch (g) {
        d = !0, e = g;
      }

      d && sh(b, e);
    }

    b = b.nextEffect;
  } while (null !== b);

  W = c;
  c = a.expirationTime;
  0 !== c && Xh(a, c);
  X || W || Yh(1073741823, !1);
}

function of() {
  null !== Qh && Be(Qh);
  null !== Rh && Rh();
}

function Zh(a, b) {
  Oh = Kh = !0;
  a.current === b ? x("177") : void 0;
  var c = a.pendingCommitExpirationTime;
  0 === c ? x("261") : void 0;
  a.pendingCommitExpirationTime = 0;
  var d = b.expirationTime,
      e = b.childExpirationTime;
  ef(a, e > d ? e : d);
  Ih.current = null;
  d = void 0;
  1 < b.effectTag ? null !== b.lastEffect ? (b.lastEffect.nextEffect = b, d = b.firstEffect) : d = b : d = b.firstEffect;
  ue = Bd;
  ve = Pd();
  Bd = !1;

  for (V = d; null !== V;) {
    e = !1;
    var f = void 0;

    try {
      Uh();
    } catch (h) {
      e = !0, f = h;
    }

    e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }

  for (V = d; null !== V;) {
    e = !1;
    f = void 0;

    try {
      Th();
    } catch (h) {
      e = !0, f = h;
    }

    e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }

  Qd(ve);
  ve = null;
  Bd = !!ue;
  ue = null;
  a.current = b;

  for (V = d; null !== V;) {
    e = !1;
    f = void 0;

    try {
      Vh(a, c);
    } catch (h) {
      e = !0, f = h;
    }

    e && (null === V ? x("178") : void 0, sh(V, f), null !== V && (V = V.nextEffect));
  }

  if (null !== d && null !== Ph) {
    var g = Wh.bind(null, a, d);
    Qh = r.unstable_runWithPriority(r.unstable_NormalPriority, function () {
      return Ae(g);
    });
    Rh = g;
  }

  Kh = Oh = !1;
  "function" === typeof Qe && Qe(b.stateNode);
  c = b.expirationTime;
  b = b.childExpirationTime;
  b = b > c ? b : c;
  0 === b && (Fh = null);
  $h(a, b);
}

function ai(a) {
  for (;;) {
    var b = a.alternate,
        c = a.return,
        d = a.sibling;

    if (0 === (a.effectTag & 1024)) {
      T = a;

      a: {
        var e = b;
        b = a;
        var f = U;
        var g = b.pendingProps;

        switch (b.tag) {
          case 2:
            break;

          case 16:
            break;

          case 15:
          case 0:
            break;

          case 1:
            J(b.type) && Ke(b);
            break;

          case 3:
            Kf(b);
            Le(b);
            g = b.stateNode;
            g.pendingContext && (g.context = g.pendingContext, g.pendingContext = null);
            if (null === e || null === e.child) Eg(b), b.effectTag &= -3;
            mh(b);
            break;

          case 5:
            Mf(b);
            var h = If(Hf.current);
            f = b.type;
            if (null !== e && null != b.stateNode) nh(e, b, f, g, h), e.ref !== b.ref && (b.effectTag |= 128);else if (g) {
              var l = If(N.current);

              if (Eg(b)) {
                g = b;
                e = g.stateNode;
                var k = g.type,
                    m = g.memoizedProps,
                    p = h;
                e[Fa] = g;
                e[Ga] = m;
                f = void 0;
                h = k;

                switch (h) {
                  case "iframe":
                  case "object":
                    E("load", e);
                    break;

                  case "video":
                  case "audio":
                    for (k = 0; k < ab.length; k++) {
                      E(ab[k], e);
                    }

                    break;

                  case "source":
                    E("error", e);
                    break;

                  case "img":
                  case "image":
                  case "link":
                    E("error", e);
                    E("load", e);
                    break;

                  case "form":
                    E("reset", e);
                    E("submit", e);
                    break;

                  case "details":
                    E("toggle", e);
                    break;

                  case "input":
                    wc(e, m);
                    E("invalid", e);
                    se(p, "onChange");
                    break;

                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!m.multiple
                    };
                    E("invalid", e);
                    se(p, "onChange");
                    break;

                  case "textarea":
                    ce(e, m), E("invalid", e), se(p, "onChange");
                }

                qe(h, m);
                k = null;

                for (f in m) {
                  m.hasOwnProperty(f) && (l = m[f], "children" === f ? "string" === typeof l ? e.textContent !== l && (k = ["children", l]) : "number" === typeof l && e.textContent !== "" + l && (k = ["children", "" + l]) : ra.hasOwnProperty(f) && null != l && se(p, f));
                }

                switch (h) {
                  case "input":
                    Rb(e);
                    Ac(e, m, !0);
                    break;

                  case "textarea":
                    Rb(e);
                    ee(e, m);
                    break;

                  case "select":
                  case "option":
                    break;

                  default:
                    "function" === typeof m.onClick && (e.onclick = te);
                }

                f = k;
                g.updateQueue = f;
                g = null !== f ? !0 : !1;
                g && kh(b);
              } else {
                m = b;
                p = f;
                e = g;
                k = 9 === h.nodeType ? h : h.ownerDocument;
                l === fe.html && (l = ge(p));
                l === fe.html ? "script" === p ? (e = k.createElement("div"), e.innerHTML = "<script>\x3c/script>", k = e.removeChild(e.firstChild)) : "string" === typeof e.is ? k = k.createElement(p, {
                  is: e.is
                }) : (k = k.createElement(p), "select" === p && (p = k, e.multiple ? p.multiple = !0 : e.size && (p.size = e.size))) : k = k.createElementNS(l, p);
                e = k;
                e[Fa] = m;
                e[Ga] = g;
                lh(e, b, !1, !1);
                p = e;
                k = f;
                m = g;
                var t = h,
                    A = re(k, m);

                switch (k) {
                  case "iframe":
                  case "object":
                    E("load", p);
                    h = m;
                    break;

                  case "video":
                  case "audio":
                    for (h = 0; h < ab.length; h++) {
                      E(ab[h], p);
                    }

                    h = m;
                    break;

                  case "source":
                    E("error", p);
                    h = m;
                    break;

                  case "img":
                  case "image":
                  case "link":
                    E("error", p);
                    E("load", p);
                    h = m;
                    break;

                  case "form":
                    E("reset", p);
                    E("submit", p);
                    h = m;
                    break;

                  case "details":
                    E("toggle", p);
                    h = m;
                    break;

                  case "input":
                    wc(p, m);
                    h = vc(p, m);
                    E("invalid", p);
                    se(t, "onChange");
                    break;

                  case "option":
                    h = $d(p, m);
                    break;

                  case "select":
                    p._wrapperState = {
                      wasMultiple: !!m.multiple
                    };
                    h = n({}, m, {
                      value: void 0
                    });
                    E("invalid", p);
                    se(t, "onChange");
                    break;

                  case "textarea":
                    ce(p, m);
                    h = be(p, m);
                    E("invalid", p);
                    se(t, "onChange");
                    break;

                  default:
                    h = m;
                }

                qe(k, h);
                l = void 0;
                var v = k,
                    R = p,
                    u = h;

                for (l in u) {
                  if (u.hasOwnProperty(l)) {
                    var q = u[l];
                    "style" === l ? oe(R, q) : "dangerouslySetInnerHTML" === l ? (q = q ? q.__html : void 0, null != q && je(R, q)) : "children" === l ? "string" === typeof q ? ("textarea" !== v || "" !== q) && ke(R, q) : "number" === typeof q && ke(R, "" + q) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ra.hasOwnProperty(l) ? null != q && se(t, l) : null != q && tc(R, l, q, A));
                  }
                }

                switch (k) {
                  case "input":
                    Rb(p);
                    Ac(p, m, !1);
                    break;

                  case "textarea":
                    Rb(p);
                    ee(p, m);
                    break;

                  case "option":
                    null != m.value && p.setAttribute("value", "" + uc(m.value));
                    break;

                  case "select":
                    h = p;
                    h.multiple = !!m.multiple;
                    p = m.value;
                    null != p ? ae(h, !!m.multiple, p, !1) : null != m.defaultValue && ae(h, !!m.multiple, m.defaultValue, !0);
                    break;

                  default:
                    "function" === typeof h.onClick && (p.onclick = te);
                }

                (g = we(f, g)) && kh(b);
                b.stateNode = e;
              }

              null !== b.ref && (b.effectTag |= 128);
            } else null === b.stateNode ? x("166") : void 0;
            break;

          case 6:
            e && null != b.stateNode ? oh(e, b, e.memoizedProps, g) : ("string" !== typeof g && (null === b.stateNode ? x("166") : void 0), e = If(Hf.current), If(N.current), Eg(b) ? (g = b, f = g.stateNode, e = g.memoizedProps, f[Fa] = g, (g = f.nodeValue !== e) && kh(b)) : (f = b, g = (9 === e.nodeType ? e : e.ownerDocument).createTextNode(g), g[Fa] = b, f.stateNode = g));
            break;

          case 11:
            break;

          case 13:
            g = b.memoizedState;

            if (0 !== (b.effectTag & 64)) {
              b.expirationTime = f;
              T = b;
              break a;
            }

            g = null !== g;
            f = null !== e && null !== e.memoizedState;
            null !== e && !g && f && (e = e.child.sibling, null !== e && (h = b.firstEffect, null !== h ? (b.firstEffect = e, e.nextEffect = h) : (b.firstEffect = b.lastEffect = e, e.nextEffect = null), e.effectTag = 8));
            if (g || f) b.effectTag |= 4;
            break;

          case 7:
            break;

          case 8:
            break;

          case 12:
            break;

          case 4:
            Kf(b);
            mh(b);
            break;

          case 10:
            Zg(b);
            break;

          case 9:
            break;

          case 14:
            break;

          case 17:
            J(b.type) && Ke(b);
            break;

          case 18:
            break;

          default:
            x("156");
        }

        T = null;
      }

      b = a;

      if (1 === U || 1 !== b.childExpirationTime) {
        g = 0;

        for (f = b.child; null !== f;) {
          e = f.expirationTime, h = f.childExpirationTime, e > g && (g = e), h > g && (g = h), f = f.sibling;
        }

        b.childExpirationTime = g;
      }

      if (null !== T) return T;
      null !== c && 0 === (c.effectTag & 1024) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));
    } else {
      a = Gh(a, U);
      if (null !== a) return a.effectTag &= 1023, a;
      null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 1024);
    }

    if (null !== d) return d;
    if (null !== c) a = c;else break;
  }

  return null;
}

function bi(a) {
  var b = Tg(a.alternate, a, U);
  a.memoizedProps = a.pendingProps;
  null === b && (b = ai(a));
  Ih.current = null;
  return b;
}

function ci(a, b) {
  Kh ? x("243") : void 0;
  of();
  Kh = !0;
  var c = Hh.current;
  Hh.current = kg;
  var d = a.nextExpirationTimeToWorkOn;
  if (d !== U || a !== Lh || null === T) Sh(), Lh = a, U = d, T = Xe(Lh.current, null, U), a.pendingCommitExpirationTime = 0;
  var e = !1;

  do {
    try {
      if (b) for (; null !== T && !di();) {
        T = bi(T);
      } else for (; null !== T;) {
        T = bi(T);
      }
    } catch (u) {
      if (Yg = Xg = Wg = null, lg(), null === T) e = !0, Dh(u);else {
        null === T ? x("271") : void 0;
        var f = T,
            g = f.return;
        if (null === g) e = !0, Dh(u);else {
          a: {
            var h = a,
                l = g,
                k = f,
                m = u;
            g = U;
            k.effectTag |= 1024;
            k.firstEffect = k.lastEffect = null;

            if (null !== m && "object" === _typeof(m) && "function" === typeof m.then) {
              var p = m;
              m = l;
              var t = -1,
                  A = -1;

              do {
                if (13 === m.tag) {
                  var v = m.alternate;

                  if (null !== v && (v = v.memoizedState, null !== v)) {
                    A = 10 * (1073741822 - v.timedOutAt);
                    break;
                  }

                  v = m.pendingProps.maxDuration;
                  if ("number" === typeof v) if (0 >= v) t = 0;else if (-1 === t || v < t) t = v;
                }

                m = m.return;
              } while (null !== m);

              m = l;

              do {
                if (v = 13 === m.tag) v = void 0 === m.memoizedProps.fallback ? !1 : null === m.memoizedState;

                if (v) {
                  l = m.updateQueue;
                  null === l ? (l = new Set(), l.add(p), m.updateQueue = l) : l.add(p);

                  if (0 === (m.mode & 1)) {
                    m.effectTag |= 64;
                    k.effectTag &= -1957;
                    1 === k.tag && (null === k.alternate ? k.tag = 17 : (g = nf(1073741823), g.tag = sf, pf(k, g)));
                    k.expirationTime = 1073741823;
                    break a;
                  }

                  k = h;
                  l = g;
                  var R = k.pingCache;
                  null === R ? (R = k.pingCache = new Bh(), v = new Set(), R.set(p, v)) : (v = R.get(p), void 0 === v && (v = new Set(), R.set(p, v)));
                  v.has(l) || (v.add(l), k = ei.bind(null, k, p, l), p.then(k, k));
                  -1 === t ? h = 1073741823 : (-1 === A && (A = 10 * (1073741822 - gf(h, g)) - 5E3), h = A + t);
                  0 <= h && Mh < h && (Mh = h);
                  m.effectTag |= 2048;
                  m.expirationTime = g;
                  break a;
                }

                m = m.return;
              } while (null !== m);

              m = Error((ic(k.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + jc(k));
            }

            Nh = !0;
            m = jh(m, k);
            h = l;

            do {
              switch (h.tag) {
                case 3:
                  h.effectTag |= 2048;
                  h.expirationTime = g;
                  g = Ch(h, m, g);
                  eh(h, g);
                  break a;

                case 1:
                  if (t = m, A = h.type, k = h.stateNode, 0 === (h.effectTag & 64) && ("function" === typeof A.getDerivedStateFromError || null !== k && "function" === typeof k.componentDidCatch && (null === Fh || !Fh.has(k)))) {
                    h.effectTag |= 2048;
                    h.expirationTime = g;
                    g = Eh(h, t, g);
                    eh(h, g);
                    break a;
                  }

              }

              h = h.return;
            } while (null !== h);
          }

          T = ai(f);
          continue;
        }
      }
    }

    break;
  } while (1);

  Kh = !1;
  Hh.current = c;
  Yg = Xg = Wg = null;
  lg();
  if (e) Lh = null, a.finishedWork = null;else if (null !== T) a.finishedWork = null;else {
    c = a.current.alternate;
    null === c ? x("281") : void 0;
    Lh = null;

    if (Nh) {
      e = a.latestPendingTime;
      f = a.latestSuspendedTime;
      g = a.latestPingedTime;

      if (0 !== e && e < d || 0 !== f && f < d || 0 !== g && g < d) {
        ff(a, d);
        fi(a, c, d, a.expirationTime, -1);
        return;
      }

      if (!a.didError && b) {
        a.didError = !0;
        d = a.nextExpirationTimeToWorkOn = d;
        b = a.expirationTime = 1073741823;
        fi(a, c, d, b, -1);
        return;
      }
    }

    b && -1 !== Mh ? (ff(a, d), b = 10 * (1073741822 - gf(a, d)), b < Mh && (Mh = b), b = 10 * (1073741822 - lf()), b = Mh - b, fi(a, c, d, a.expirationTime, 0 > b ? 0 : b)) : (a.pendingCommitExpirationTime = d, a.finishedWork = c);
  }
}

function sh(a, b) {
  for (var c = a.return; null !== c;) {
    switch (c.tag) {
      case 1:
        var d = c.stateNode;

        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Fh || !Fh.has(d))) {
          a = jh(b, a);
          a = Eh(c, a, 1073741823);
          pf(c, a);
          qf(c, 1073741823);
          return;
        }

        break;

      case 3:
        a = jh(b, a);
        a = Ch(c, a, 1073741823);
        pf(c, a);
        qf(c, 1073741823);
        return;
    }

    c = c.return;
  }

  3 === a.tag && (c = jh(b, a), c = Ch(a, c, 1073741823), pf(a, c), qf(a, 1073741823));
}

function mf(a, b) {
  var c = r.unstable_getCurrentPriorityLevel(),
      d = void 0;
  if (0 === (b.mode & 1)) d = 1073741823;else if (Kh && !Oh) d = U;else {
    switch (c) {
      case r.unstable_ImmediatePriority:
        d = 1073741823;
        break;

      case r.unstable_UserBlockingPriority:
        d = 1073741822 - 10 * (((1073741822 - a + 15) / 10 | 0) + 1);
        break;

      case r.unstable_NormalPriority:
        d = 1073741822 - 25 * (((1073741822 - a + 500) / 25 | 0) + 1);
        break;

      case r.unstable_LowPriority:
      case r.unstable_IdlePriority:
        d = 1;
        break;

      default:
        x("313");
    }

    null !== Lh && d === U && --d;
  }
  c === r.unstable_UserBlockingPriority && (0 === gi || d < gi) && (gi = d);
  return d;
}

function ei(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  if (null !== Lh && U === c) Lh = null;else if (b = a.earliestSuspendedTime, d = a.latestSuspendedTime, 0 !== b && c <= b && c >= d) {
    a.didError = !1;
    b = a.latestPingedTime;
    if (0 === b || b > c) a.latestPingedTime = c;
    df(c, a);
    c = a.expirationTime;
    0 !== c && Xh(a, c);
  }
}

function Ah(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = lf();
  b = mf(b, a);
  a = hi(a, b);
  null !== a && (cf(a, b), b = a.expirationTime, 0 !== b && Xh(a, b));
}

function hi(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  var d = a.return,
      e = null;
  if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
    c = d.alternate;
    d.childExpirationTime < b && (d.childExpirationTime = b);
    null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);

    if (null === d.return && 3 === d.tag) {
      e = d.stateNode;
      break;
    }

    d = d.return;
  }
  return e;
}

function qf(a, b) {
  a = hi(a, b);
  null !== a && (!Kh && 0 !== U && b > U && Sh(), cf(a, b), Kh && !Oh && Lh === a || Xh(a, a.expirationTime), ii > ji && (ii = 0, x("185")));
}

function ki(a, b, c, d, e) {
  return r.unstable_runWithPriority(r.unstable_ImmediatePriority, function () {
    return a(b, c, d, e);
  });
}

var li = null,
    Y = null,
    mi = 0,
    ni = void 0,
    W = !1,
    oi = null,
    Z = 0,
    gi = 0,
    pi = !1,
    qi = null,
    X = !1,
    ri = !1,
    si = null,
    ti = r.unstable_now(),
    ui = 1073741822 - (ti / 10 | 0),
    vi = ui,
    ji = 50,
    ii = 0,
    wi = null;

function xi() {
  ui = 1073741822 - ((r.unstable_now() - ti) / 10 | 0);
}

function yi(a, b) {
  if (0 !== mi) {
    if (b < mi) return;
    null !== ni && r.unstable_cancelCallback(ni);
  }

  mi = b;
  a = r.unstable_now() - ti;
  ni = r.unstable_scheduleCallback(zi, {
    timeout: 10 * (1073741822 - b) - a
  });
}

function fi(a, b, c, d, e) {
  a.expirationTime = d;
  0 !== e || di() ? 0 < e && (a.timeoutHandle = ye(Ai.bind(null, a, b, c), e)) : (a.pendingCommitExpirationTime = c, a.finishedWork = b);
}

function Ai(a, b, c) {
  a.pendingCommitExpirationTime = c;
  a.finishedWork = b;
  xi();
  vi = ui;
  Bi(a, c);
}

function $h(a, b) {
  a.expirationTime = b;
  a.finishedWork = null;
}

function lf() {
  if (W) return vi;
  Ci();
  if (0 === Z || 1 === Z) xi(), vi = ui;
  return vi;
}

function Xh(a, b) {
  null === a.nextScheduledRoot ? (a.expirationTime = b, null === Y ? (li = Y = a, a.nextScheduledRoot = a) : (Y = Y.nextScheduledRoot = a, Y.nextScheduledRoot = li)) : b > a.expirationTime && (a.expirationTime = b);
  W || (X ? ri && (oi = a, Z = 1073741823, Di(a, 1073741823, !1)) : 1073741823 === b ? Yh(1073741823, !1) : yi(a, b));
}

function Ci() {
  var a = 0,
      b = null;
  if (null !== Y) for (var c = Y, d = li; null !== d;) {
    var e = d.expirationTime;

    if (0 === e) {
      null === c || null === Y ? x("244") : void 0;

      if (d === d.nextScheduledRoot) {
        li = Y = d.nextScheduledRoot = null;
        break;
      } else if (d === li) li = e = d.nextScheduledRoot, Y.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === Y) {
        Y = c;
        Y.nextScheduledRoot = li;
        d.nextScheduledRoot = null;
        break;
      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;

      d = c.nextScheduledRoot;
    } else {
      e > a && (a = e, b = d);
      if (d === Y) break;
      if (1073741823 === a) break;
      c = d;
      d = d.nextScheduledRoot;
    }
  }
  oi = b;
  Z = a;
}

var Ei = !1;

function di() {
  return Ei ? !0 : r.unstable_shouldYield() ? Ei = !0 : !1;
}

function zi() {
  try {
    if (!di() && null !== li) {
      xi();
      var a = li;

      do {
        var b = a.expirationTime;
        0 !== b && ui <= b && (a.nextExpirationTimeToWorkOn = ui);
        a = a.nextScheduledRoot;
      } while (a !== li);
    }

    Yh(0, !0);
  } finally {
    Ei = !1;
  }
}

function Yh(a, b) {
  Ci();
  if (b) for (xi(), vi = ui; null !== oi && 0 !== Z && a <= Z && !(Ei && ui > Z);) {
    Di(oi, Z, ui > Z), Ci(), xi(), vi = ui;
  } else for (; null !== oi && 0 !== Z && a <= Z;) {
    Di(oi, Z, !1), Ci();
  }
  b && (mi = 0, ni = null);
  0 !== Z && yi(oi, Z);
  ii = 0;
  wi = null;
  if (null !== si) for (a = si, si = null, b = 0; b < a.length; b++) {
    var c = a[b];

    try {
      c._onComplete();
    } catch (d) {
      pi || (pi = !0, qi = d);
    }
  }
  if (pi) throw a = qi, qi = null, pi = !1, a;
}

function Bi(a, b) {
  W ? x("253") : void 0;
  oi = a;
  Z = b;
  Di(a, b, !1);
  Yh(1073741823, !1);
}

function Di(a, b, c) {
  W ? x("245") : void 0;
  W = !0;

  if (c) {
    var d = a.finishedWork;
    null !== d ? Fi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, ze(d)), ci(a, c), d = a.finishedWork, null !== d && (di() ? a.finishedWork = d : Fi(a, d, b)));
  } else d = a.finishedWork, null !== d ? Fi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, ze(d)), ci(a, c), d = a.finishedWork, null !== d && Fi(a, d, b));

  W = !1;
}

function Fi(a, b, c) {
  var d = a.firstBatch;

  if (null !== d && d._expirationTime >= c && (null === si ? si = [d] : si.push(d), d._defer)) {
    a.finishedWork = b;
    a.expirationTime = 0;
    return;
  }

  a.finishedWork = null;
  a === wi ? ii++ : (wi = a, ii = 0);
  r.unstable_runWithPriority(r.unstable_ImmediatePriority, function () {
    Zh(a, b);
  });
}

function Dh(a) {
  null === oi ? x("246") : void 0;
  oi.expirationTime = 0;
  pi || (pi = !0, qi = a);
}

function Gi(a, b) {
  var c = X;
  X = !0;

  try {
    return a(b);
  } finally {
    (X = c) || W || Yh(1073741823, !1);
  }
}

function Hi(a, b) {
  if (X && !ri) {
    ri = !0;

    try {
      return a(b);
    } finally {
      ri = !1;
    }
  }

  return a(b);
}

function Ii(a, b, c) {
  X || W || 0 === gi || (Yh(gi, !1), gi = 0);
  var d = X;
  X = !0;

  try {
    return r.unstable_runWithPriority(r.unstable_UserBlockingPriority, function () {
      return a(b, c);
    });
  } finally {
    (X = d) || W || Yh(1073741823, !1);
  }
}

function Ji(a, b, c, d, e) {
  var f = b.current;

  a: if (c) {
    c = c._reactInternalFiber;

    b: {
      2 === ed(c) && 1 === c.tag ? void 0 : x("170");
      var g = c;

      do {
        switch (g.tag) {
          case 3:
            g = g.stateNode.context;
            break b;

          case 1:
            if (J(g.type)) {
              g = g.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }

        }

        g = g.return;
      } while (null !== g);

      x("171");
      g = void 0;
    }

    if (1 === c.tag) {
      var h = c.type;

      if (J(h)) {
        c = Ne(c, h, g);
        break a;
      }
    }

    c = g;
  } else c = He;

  null === b.context ? b.context = c : b.pendingContext = c;
  b = e;
  e = nf(d);
  e.payload = {
    element: a
  };
  b = void 0 === b ? null : b;
  null !== b && (e.callback = b);
  of();
  pf(f, e);
  qf(f, d);
  return d;
}

function Ki(a, b, c, d) {
  var e = b.current,
      f = lf();
  e = mf(f, e);
  return Ji(a, b, c, e, d);
}

function Li(a) {
  a = a.current;
  if (!a.child) return null;

  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;

    default:
      return a.child.stateNode;
  }
}

function Mi(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: Wb,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}

Ab = function Ab(a, b, c) {
  switch (b) {
    case "input":
      yc(a, c);
      b = c.name;

      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) {
          c = c.parentNode;
        }

        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

        for (b = 0; b < c.length; b++) {
          var d = c[b];

          if (d !== a && d.form === a.form) {
            var e = Ka(d);
            e ? void 0 : x("90");
            Sb(d);
            yc(d, e);
          }
        }
      }

      break;

    case "textarea":
      de(a, c);
      break;

    case "select":
      b = c.value, null != b && ae(a, !!c.multiple, b, !1);
  }
};

function Ni(a) {
  var b = 1073741822 - 25 * (((1073741822 - lf() + 500) / 25 | 0) + 1);
  b >= Jh && (b = Jh - 1);
  this._expirationTime = Jh = b;
  this._root = a;
  this._callbacks = this._next = null;
  this._hasChildren = this._didComplete = !1;
  this._children = null;
  this._defer = !0;
}

Ni.prototype.render = function (a) {
  this._defer ? void 0 : x("250");
  this._hasChildren = !0;
  this._children = a;
  var b = this._root._internalRoot,
      c = this._expirationTime,
      d = new Oi();
  Ji(a, b, null, c, d._onCommit);
  return d;
};

Ni.prototype.then = function (a) {
  if (this._didComplete) a();else {
    var b = this._callbacks;
    null === b && (b = this._callbacks = []);
    b.push(a);
  }
};

Ni.prototype.commit = function () {
  var a = this._root._internalRoot,
      b = a.firstBatch;
  this._defer && null !== b ? void 0 : x("251");

  if (this._hasChildren) {
    var c = this._expirationTime;

    if (b !== this) {
      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));

      for (var d = null, e = b; e !== this;) {
        d = e, e = e._next;
      }

      null === d ? x("251") : void 0;
      d._next = e._next;
      this._next = b;
      a.firstBatch = this;
    }

    this._defer = !1;
    Bi(a, c);
    b = this._next;
    this._next = null;
    b = a.firstBatch = b;
    null !== b && b._hasChildren && b.render(b._children);
  } else this._next = null, this._defer = !1;
};

Ni.prototype._onComplete = function () {
  if (!this._didComplete) {
    this._didComplete = !0;
    var a = this._callbacks;
    if (null !== a) for (var b = 0; b < a.length; b++) {
      (0, a[b])();
    }
  }
};

function Oi() {
  this._callbacks = null;
  this._didCommit = !1;
  this._onCommit = this._onCommit.bind(this);
}

Oi.prototype.then = function (a) {
  if (this._didCommit) a();else {
    var b = this._callbacks;
    null === b && (b = this._callbacks = []);
    b.push(a);
  }
};

Oi.prototype._onCommit = function () {
  if (!this._didCommit) {
    this._didCommit = !0;
    var a = this._callbacks;
    if (null !== a) for (var b = 0; b < a.length; b++) {
      var c = a[b];
      "function" !== typeof c ? x("191", c) : void 0;
      c();
    }
  }
};

function Pi(a, b, c) {
  b = K(3, null, null, b ? 3 : 0);
  a = {
    current: b,
    containerInfo: a,
    pendingChildren: null,
    pingCache: null,
    earliestPendingTime: 0,
    latestPendingTime: 0,
    earliestSuspendedTime: 0,
    latestSuspendedTime: 0,
    latestPingedTime: 0,
    didError: !1,
    pendingCommitExpirationTime: 0,
    finishedWork: null,
    timeoutHandle: -1,
    context: null,
    pendingContext: null,
    hydrate: c,
    nextExpirationTimeToWorkOn: 0,
    expirationTime: 0,
    firstBatch: null,
    nextScheduledRoot: null
  };
  this._internalRoot = b.stateNode = a;
}

Pi.prototype.render = function (a, b) {
  var c = this._internalRoot,
      d = new Oi();
  b = void 0 === b ? null : b;
  null !== b && d.then(b);
  Ki(a, c, null, d._onCommit);
  return d;
};

Pi.prototype.unmount = function (a) {
  var b = this._internalRoot,
      c = new Oi();
  a = void 0 === a ? null : a;
  null !== a && c.then(a);
  Ki(null, b, null, c._onCommit);
  return c;
};

Pi.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
  var d = this._internalRoot,
      e = new Oi();
  c = void 0 === c ? null : c;
  null !== c && e.then(c);
  Ki(b, d, a, e._onCommit);
  return e;
};

Pi.prototype.createBatch = function () {
  var a = new Ni(this),
      b = a._expirationTime,
      c = this._internalRoot,
      d = c.firstBatch;
  if (null === d) c.firstBatch = a, a._next = null;else {
    for (c = null; null !== d && d._expirationTime >= b;) {
      c = d, d = d._next;
    }

    a._next = d;
    null !== c && (c._next = a);
  }
  return a;
};

function Qi(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}

Gb = Gi;
Hb = Ii;

Ib = function Ib() {
  W || 0 === gi || (Yh(gi, !1), gi = 0);
};

function Ri(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }
  return new Pi(a, !1, b);
}

function Si(a, b, c, d, e) {
  var f = c._reactRootContainer;

  if (f) {
    if ("function" === typeof e) {
      var g = e;

      e = function e() {
        var a = Li(f._internalRoot);
        g.call(a);
      };
    }

    null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
  } else {
    f = c._reactRootContainer = Ri(c, d);

    if ("function" === typeof e) {
      var h = e;

      e = function e() {
        var a = Li(f._internalRoot);
        h.call(a);
      };
    }

    Hi(function () {
      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
    });
  }

  return Li(f._internalRoot);
}

function Ti(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  Qi(b) ? void 0 : x("200");
  return Mi(a, b, null, c);
}

var Vi = {
  createPortal: Ti,
  findDOMNode: function findDOMNode(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternalFiber;
    void 0 === b && ("function" === typeof a.render ? x("188") : x("268", Object.keys(a)));
    a = hd(b);
    a = null === a ? null : a.stateNode;
    return a;
  },
  hydrate: function hydrate(a, b, c) {
    Qi(b) ? void 0 : x("200");
    return Si(null, a, b, !0, c);
  },
  render: function render(a, b, c) {
    Qi(b) ? void 0 : x("200");
    return Si(null, a, b, !1, c);
  },
  unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    Qi(c) ? void 0 : x("200");
    null == a || void 0 === a._reactInternalFiber ? x("38") : void 0;
    return Si(a, b, c, !1, d);
  },
  unmountComponentAtNode: function unmountComponentAtNode(a) {
    Qi(a) ? void 0 : x("40");
    return a._reactRootContainer ? (Hi(function () {
      Si(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  },
  unstable_createPortal: function unstable_createPortal() {
    return Ti.apply(void 0, arguments);
  },
  unstable_batchedUpdates: Gi,
  unstable_interactiveUpdates: Ii,
  flushSync: function flushSync(a, b) {
    W ? x("187") : void 0;
    var c = X;
    X = !0;

    try {
      return ki(a, b);
    } finally {
      X = c, Yh(1073741823, !1);
    }
  },
  unstable_createRoot: Ui,
  unstable_flushControlled: function unstable_flushControlled(a) {
    var b = X;
    X = !0;

    try {
      ki(a);
    } finally {
      (X = b) || W || Yh(1073741823, !1);
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [Ia, Ja, Ka, Ba.injectEventPluginsByName, pa, Qa, function (a) {
      ya(a, Pa);
    }, Eb, Fb, Dd, Da]
  }
};

function Ui(a, b) {
  Qi(a) ? void 0 : x("299", "unstable_createRoot");
  return new Pi(a, !0, null != b && !0 === b.hydrate);
}

(function (a) {
  var b = a.findFiberByHostInstance;
  return Te(n({}, a, {
    overrideProps: null,
    currentDispatcherRef: Tb.ReactCurrentDispatcher,
    findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = hd(a);
      return null === a ? null : a.stateNode;
    },
    findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    }
  }));
})({
  findFiberByHostInstance: Ha,
  bundleType: 0,
  version: "16.8.6",
  rendererPackageName: "react-dom"
});

var Wi = {
  default: Vi
},
    Xi = Wi && Vi || Wi;
module.exports = Xi.default || Xi;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(55);
} else {}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.13.6
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var d = null,
    e = !1,
    g = 3,
    k = -1,
    l = -1,
    m = !1,
    n = !1;

function p() {
  if (!m) {
    var a = d.expirationTime;
    n ? q() : n = !0;

    _r(t, a);
  }
}

function u() {
  var a = d,
      b = d.next;
  if (d === b) d = null;else {
    var c = d.previous;
    d = c.next = b;
    b.previous = c;
  }
  a.next = a.previous = null;
  c = a.callback;
  b = a.expirationTime;
  a = a.priorityLevel;
  var f = g,
      Q = l;
  g = a;
  l = b;

  try {
    var h = c();
  } finally {
    g = f, l = Q;
  }

  if ("function" === typeof h) if (h = {
    callback: h,
    priorityLevel: a,
    expirationTime: b,
    next: null,
    previous: null
  }, null === d) d = h.next = h.previous = h;else {
    c = null;
    a = d;

    do {
      if (a.expirationTime >= b) {
        c = a;
        break;
      }

      a = a.next;
    } while (a !== d);

    null === c ? c = d : c === d && (d = h, p());
    b = c.previous;
    b.next = c.previous = h;
    h.next = c;
    h.previous = b;
  }
}

function v() {
  if (-1 === k && null !== d && 1 === d.priorityLevel) {
    m = !0;

    try {
      do {
        u();
      } while (null !== d && 1 === d.priorityLevel);
    } finally {
      m = !1, null !== d ? p() : n = !1;
    }
  }
}

function t(a) {
  m = !0;
  var b = e;
  e = a;

  try {
    if (a) for (; null !== d;) {
      var c = exports.unstable_now();

      if (d.expirationTime <= c) {
        do {
          u();
        } while (null !== d && d.expirationTime <= c);
      } else break;
    } else if (null !== d) {
      do {
        u();
      } while (null !== d && !w());
    }
  } finally {
    m = !1, e = b, null !== d ? p() : n = !1, v();
  }
}

var x = Date,
    y = "function" === typeof setTimeout ? setTimeout : void 0,
    z = "function" === typeof clearTimeout ? clearTimeout : void 0,
    A = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0,
    B = "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0,
    C,
    D;

function E(a) {
  C = A(function (b) {
    z(D);
    a(b);
  });
  D = y(function () {
    B(C);
    a(exports.unstable_now());
  }, 100);
}

if ("object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now) {
  var F = performance;

  exports.unstable_now = function () {
    return F.now();
  };
} else exports.unstable_now = function () {
  return x.now();
};

var _r,
    q,
    w,
    G = null;

"undefined" !== typeof window ? G = window : "undefined" !== typeof global && (G = global);

if (G && G._schedMock) {
  var H = G._schedMock;
  _r = H[0];
  q = H[1];
  w = H[2];
  exports.unstable_now = H[3];
} else if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var I = null,
      J = function J(a) {
    if (null !== I) try {
      I(a);
    } finally {
      I = null;
    }
  };

  _r = function r(a) {
    null !== I ? setTimeout(_r, 0, a) : (I = a, setTimeout(J, 0, !1));
  };

  q = function q() {
    I = null;
  };

  w = function w() {
    return !1;
  };
} else {
  "undefined" !== typeof console && ("function" !== typeof A && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof B && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
  var K = null,
      L = !1,
      M = -1,
      N = !1,
      O = !1,
      P = 0,
      R = 33,
      S = 33;

  w = function w() {
    return P <= exports.unstable_now();
  };

  var T = new MessageChannel(),
      U = T.port2;

  T.port1.onmessage = function () {
    L = !1;
    var a = K,
        b = M;
    K = null;
    M = -1;
    var c = exports.unstable_now(),
        f = !1;
    if (0 >= P - c) if (-1 !== b && b <= c) f = !0;else {
      N || (N = !0, E(V));
      K = a;
      M = b;
      return;
    }

    if (null !== a) {
      O = !0;

      try {
        a(f);
      } finally {
        O = !1;
      }
    }
  };

  var V = function V(a) {
    if (null !== K) {
      E(V);
      var b = a - P + S;
      b < S && R < S ? (8 > b && (b = 8), S = b < R ? R : b) : R = b;
      P = a + S;
      L || (L = !0, U.postMessage(void 0));
    } else N = !1;
  };

  _r = function _r(a, b) {
    K = a;
    M = b;
    O || 0 > b ? U.postMessage(void 0) : N || (N = !0, E(V));
  };

  q = function q() {
    K = null;
    L = !1;
    M = -1;
  };
}

exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = g,
      f = k;
  g = a;
  k = exports.unstable_now();

  try {
    return b();
  } finally {
    g = c, k = f, v();
  }
};

exports.unstable_next = function (a) {
  switch (g) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = g;
  }

  var c = g,
      f = k;
  g = b;
  k = exports.unstable_now();

  try {
    return a();
  } finally {
    g = c, k = f, v();
  }
};

exports.unstable_scheduleCallback = function (a, b) {
  var c = -1 !== k ? k : exports.unstable_now();
  if ("object" === _typeof(b) && null !== b && "number" === typeof b.timeout) b = c + b.timeout;else switch (g) {
    case 1:
      b = c + -1;
      break;

    case 2:
      b = c + 250;
      break;

    case 5:
      b = c + 1073741823;
      break;

    case 4:
      b = c + 1E4;
      break;

    default:
      b = c + 5E3;
  }
  a = {
    callback: a,
    priorityLevel: g,
    expirationTime: b,
    next: null,
    previous: null
  };
  if (null === d) d = a.next = a.previous = a, p();else {
    c = null;
    var f = d;

    do {
      if (f.expirationTime > b) {
        c = f;
        break;
      }

      f = f.next;
    } while (f !== d);

    null === c ? c = d : c === d && (d = a, p());
    b = c.previous;
    b.next = c.previous = a;
    a.next = c;
    a.previous = b;
  }
  return a;
};

exports.unstable_cancelCallback = function (a) {
  var b = a.next;

  if (null !== b) {
    if (b === a) d = null;else {
      a === d && (d = b);
      var c = a.previous;
      c.next = b;
      b.previous = c;
    }
    a.next = a.previous = null;
  }
};

exports.unstable_wrapCallback = function (a) {
  var b = g;
  return function () {
    var c = g,
        f = k;
    g = b;
    k = exports.unstable_now();

    try {
      return a.apply(this, arguments);
    } finally {
      g = c, k = f, v();
    }
  };
};

exports.unstable_getCurrentPriorityLevel = function () {
  return g;
};

exports.unstable_shouldYield = function () {
  return !e && (null !== d && d.expirationTime < l || w());
};

exports.unstable_continueExecution = function () {
  null !== d && p();
};

exports.unstable_pauseExecution = function () {};

exports.unstable_getFirstCallbackNode = function () {
  return d;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(57);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, "body {\r\n\tbackground: #222938;\r\n\tmargin: 0px;\r\n}\r\n\r\n#achievements-container {\r\n\tcolor: white;\r\n\tmax-width: 800px;\r\n\tmargin: 0px auto;\r\n\tpadding-inline-start: 0px;\r\n\tpadding: 0px 40px 0 20px;\r\n}\r\n\r\n.achievement-icon {\r\n\tposition: absolute;\r\n    left: -40px;\r\n    top: -45px;\r\n}\r\n\r\n.achievement-icon img {\r\n\twidth: 150px;\r\n}\r\n\r\n.achievement {\r\n    background: rgba(0,0,0,0.7);\r\n\tbox-shadow: -2px -2px 4px #666;\r\n\tpadding: 15px 10px;\r\n\twidth: 100%;\r\n    position: relative;\r\n    height: 2em;\r\n    margin-bottom: 50px;\r\n    margin-left: 5px;\r\n    display: block;\r\n}\r\n\r\n#achievements-header {\r\n\ttext-align: center;\r\n    font-size: 30px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.achievement-info {\r\n\tdisplay: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\n.achievement-title {\r\n\tfont-size: 25px;\r\n    margin-top: -10px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.achievement-cap {\r\n\tposition: absolute;\r\n    right: -20px;\r\n    top: -10px;\r\n}\r\n\r\n.achievement-cap img {\r\n\twidth: 55px;\r\n}\r\n\r\n.help {\r\n\tmargin-left: 5px;\r\n    width: 16px;\r\n    height: 16px;\r\n    background: url(https://res.cloudinary.com/phirehero/image/upload/v1559843373/help.png) no-repeat;\r\n    cursor: help;\r\n    display: inline-block;\r\n    background-size: 16px 16px;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\t\r\n\t#achievements-header {\r\n\t\ttext-align: center;\r\n\t    font-size: 30px;\r\n\t    margin-bottom: 40px;\r\n\t}\r\n\r\n\t.achievement-info {\r\n\t\tmargin-left: 40px;\r\n\t}\r\n}", ""]);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(60);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".main-content {\r\n\tmax-width: 800px;\r\n\tmargin: 20px auto 0;\r\n\tpadding: 0px 15px 20px;\r\n}\r\n\r\n.channel-header {\r\n\tdisplay: flex;\r\n}\r\n\r\n.main-content h3 {\r\n\tfont-size: 24px;\r\n\tcolor: white;\r\n\tflex: 1;\r\n}\r\n\r\n.add-channel {\r\n\tmax-width: 600px;\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    border: 2px dashed #AAA;\r\n    padding: 10px 20px;\r\n    color: white;\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.add-channel img {\r\n\twidth:32px;\r\n\theight:32px;\r\n\tmargin-top:5px;\r\n}\r\n\r\n.join-channel-button {\r\n    text-align: right;\r\n    font-size: 18px;\r\n    color: white;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.join-channel-button img {\r\n\twidth: 24px;\r\n    margin-right: 5px;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\t.main-content {\r\n\t\tmargin-top: 0px;\r\n\t}\r\n\r\n\t.add-channel {\r\n\t\tmargin: 0 10px;\r\n\t\tpadding: 5px 10px;\r\n\t}\r\n\r\n\t.channel-item {\r\n\t\theight: 75px;\r\n\t}\r\n\r\n\t.channel-item--logo {\r\n\t\theight: 75px;\r\n\t}\r\n\r\n\t.channel-item--logo img {\r\n\t\twidth: 75px;\r\n\t\theight: 75px;\r\n\t}\r\n\r\n\t.channel-item--name {\r\n\t\tfont: 18px;\r\n\t}\r\n}", ""]);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = __webpack_require__(62);

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.memo") : 60115,
    r = b ? Symbol.for("react.lazy") : 60116;

function t(a) {
  if ("object" === _typeof(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case h:
                return a;

              default:
                return u;
            }

        }

      case r:
      case q:
      case d:
        return u;
    }
  }
}

function v(a) {
  return t(a) === m;
}

exports.typeOf = t;
exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = r;
exports.Memo = q;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;

exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || "object" === _typeof(a) && null !== a && (a.$$typeof === r || a.$$typeof === q || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n);
};

exports.isAsyncMode = function (a) {
  return v(a) || t(a) === l;
};

exports.isConcurrentMode = v;

exports.isContextConsumer = function (a) {
  return t(a) === k;
};

exports.isContextProvider = function (a) {
  return t(a) === h;
};

exports.isElement = function (a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === c;
};

exports.isForwardRef = function (a) {
  return t(a) === n;
};

exports.isFragment = function (a) {
  return t(a) === e;
};

exports.isLazy = function (a) {
  return t(a) === r;
};

exports.isMemo = function (a) {
  return t(a) === q;
};

exports.isPortal = function (a) {
  return t(a) === d;
};

exports.isProfiler = function (a) {
  return t(a) === g;
};

exports.isStrictMode = function (a) {
  return t(a) === f;
};

exports.isSuspense = function (a) {
  return t(a) === p;
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

var bind = __webpack_require__(32);

var Axios = __webpack_require__(67);

var mergeConfig = __webpack_require__(38);

var defaults = __webpack_require__(35);
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(39);
axios.CancelToken = __webpack_require__(80);
axios.isCancel = __webpack_require__(34); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(81);
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
module.exports = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

var buildURL = __webpack_require__(33);

var InterceptorManager = __webpack_require__(68);

var dispatchRequest = __webpack_require__(69);

var mergeConfig = __webpack_require__(38);
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get'; // Hook up interceptors middleware

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

var transformData = __webpack_require__(70);

var isCancel = __webpack_require__(34);

var defaults = __webpack_require__(35);

var isAbsoluteURL = __webpack_require__(78);

var combineURLs = __webpack_require__(79);
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Support baseURL config

  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  } // Ensure headers exist


  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(37);
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(8);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(39);
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(83);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".notificationPanel-wrapper {\r\n\tmargin-left: auto;\r\n\tposition: relative;\r\n\tuser-select: none;\r\n}\r\n\r\n.notificationPanel {\r\n\tposition: relative;\r\n\tpadding: 60px 20px 35px;\r\n\tcursor: not-allowed;\r\n}\r\n\r\n.notificationPanel--active .notificationPanel {\r\n\tbackground-color: #794fc6;\r\n}\r\n\r\n.notificationPanel > img {\r\n\twidth: 30px;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n.notificationPanel-badge {\r\n\tbackground-color: red;\r\n\tcolor: white;\r\n\tborder-radius: 15px;\r\n\tposition: absolute;\r\n\tpadding: 3px 8px;\r\n\tfont-size: 16px;\r\n\tright: 15px;\r\n\ttop: 50px;\r\n\tfont-weight: 800;\r\n}\r\n\r\n.notificationContent {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\tleft: 0px;\r\n\ttop: 131px;\r\n\tborder: 1px solid #333;\r\n\tbox-shadow: 0px 1px 2px black;\r\n}\r\n\r\n.notificationPanel--active .notificationContent {\r\n\tdisplay: block;\r\n}\r\n\r\n.notification {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tmin-width: 350px;\r\n\tborder-bottom: 1px solid #666;\r\n\tbackground: #DDD;;\r\n}\r\n\r\n.notification--icon {\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n}\r\n\r\n.notification--delete {\r\n\talign-self: baseline;\r\n\tpadding: 8px;\r\n\tmargin-top: 5px;\r\n\tmargin-right: 5px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.notification--delete:hover {\r\n\tbackground: #EEE;\r\n}\r\n\r\n.notification--icon img {\r\n\twidth: 50px;\r\n\theight: 50px;\r\n\tpadding: 5px;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\t.notificationPanel {\r\n\t\tpadding: 32px 15px 20px;\r\n\t}\r\n\r\n\t.notificationPanel > img {\r\n\t\twidth: 24px;\r\n\t}\r\n}", ""]);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "32d616b53657b1e0806e3174bbbc30b8.png";

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(86);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, "#page-header {\r\n\theight: 130px;\r\n\tbackground: #2f4882;\r\n\tdisplay: flex;\r\n\tbox-shadow: 0px 1px 2px #111;\r\n\tz-index: 100;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n#page-header .logo img {\r\n\twidth: 342px;\r\n\ttransition: all 0.2s ease;\r\n\tpadding: 24px 0 24px 20px;\r\n}\r\n\r\n.header-nav {\r\n\tdisplay: flex;\r\n    align-items: center;\r\n    flex: 2;\r\n}\r\n\r\n.menu {\r\n\twidth: 220px;\r\n\tpadding: 80px 40px 35px;\r\n\tcursor: pointer;\r\n\tcolor: white;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tborder-left: 2px solid #455c96;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.menu--active,\r\n.menu:hover {\r\n\tbackground-color: #455c96;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.header-nav a {\r\n\tbackground-color: #1c2741;\r\n    align-items: center;\r\n    justify-content: center;\r\n    padding: 90px 40px 21px;\r\n    font-size: 1rem;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    text-decoration: none;\r\n    color: white;\r\n}\r\n\r\n.header-nav a:hover {\r\n\tbackground-color: #455c96;\r\n\ttransition: background-color 0.5s ease;\r\n}\r\n\r\n.menu--logo img {\r\n\twidth: 70px;\r\n\theight:70px;\r\n\tmargin-right:15px;\r\n}\r\n\r\n.menu--label {\r\n\tfont-size: 20px;\r\n    text-overflow: ellipsis;\r\n    min-width: 0;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n}\r\n\r\n/* Dropdown */\r\n\r\n.menu-dropdown--wrapper {\r\n\tdisplay: none;\r\n}\r\n\r\n.menu-dropdown--wrapper.menu-dropdown--active {\r\n\tdisplay: block;\r\n}\r\n\r\n.menu-dropdown {\r\n\twidth: 300px;\r\n    position: absolute;\r\n    background: #DDD;\r\n    border: 1px solid #333;\r\n    box-shadow: 0px 1px 3px black;\r\n    right: 0px;\r\n    top: 131px;\r\n    z-index: 0;\r\n}\r\n\r\n.menu-mask {\r\n\tposition: absolute;\r\n    z-index: -10;\r\n    background: rgba(0,0,0,0.5);\r\n    width: 100%;\r\n    top: 130px;\r\n    left: 0px;\r\n}\r\n\r\n.menu-dropdown ul {\r\n\tlist-style: none;\r\n\twidth: 100%;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\n.menu-dropdown li a {\r\n    width: 90%;\r\n    padding: 20px 5%;\r\n    border-bottom: 1px solid #AAA;\r\n    display: block;\r\n    text-decoration: none;\r\n    color: #333;\r\n    font-size: 16px;\r\n    font-weight: 700;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.menu-dropdown li a:hover {\r\n\tbackground-color: #BBB;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.menu-dropdown li.logout a {\r\n\tborder-bottom: none;\r\n\tborder-top: 1px solid #AAA;\r\n\tcolor: red;\r\n\tmargin-top: 80px;\r\n\ttransition: all 0.2s ease;\r\n\tbackground-color: inherit;\r\n\ttext-align: center;\r\n}\r\n\r\n.menu-dropdown li.logout a:hover {\r\n\tcolor: white;\r\n\tbackground-color: red;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.menu-dropdown .reviewing {\r\n\tpadding: 20px;\r\n    text-align: center;\r\n    border-bottom: 1px solid #AAA;\r\n    font-weight: bold;\r\n    color: #FFFFFF;\r\n    background: #455c96;\r\n}\r\n\r\n\r\n@media only screen and (max-width: 480px) {\r\n\t#page-header {\r\n\t\theight: 80px;\r\n\t\ttransition: all 0.2s ease;\r\n\t}\r\n\r\n\t#page-header .logo img {\r\n\t\twidth: 212px;\r\n\t\ttransition: all 0.2s ease;\r\n    \tpadding: 14px 0 14px 10px;\r\n\t}\r\n\r\n\t.header-nav {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.menu {\r\n\t\twidth: auto;\r\n\t\tpadding: 20px 15px;\r\n\t\tmargin-left: auto;\r\n\t\ttransition: all 0.2s ease;\r\n\t}\r\n\r\n\t.menu--label {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.menu img {\r\n\t\twidth: 55px;\r\n\t\theight: 55px;\r\n\t\tmargin: 0;\r\n\t}\r\n\r\n\t.menu-dropdown {\r\n\t\tborder: 0;\r\n\t\twidth: 100%;\r\n\t\ttop: 80px;\r\n\t}\r\n}", ""]);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(88);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".footer {\r\n    height: 100px;\r\n    /*background: #1c2741;*/\r\n    background: #2f4882;\r\n    box-shadow: 0px -1px 2px #111;\r\n    color: white;\r\n    font-size: 16px;\r\n    margin-top: 15px;\r\n}\r\n\r\n.footer-content {\r\n\tmax-width: 800px;\r\n    padding-top: 25px;\r\n    margin: 0 auto;\r\n    text-align: center;\r\n}", ""]);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(90);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".loading-spinner {\r\n    \r\n    display: none;\r\n}\r\n\r\n.loading-spinner--full {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    background: rgba(0,0,0,0.5);\r\n    height: 100%;\r\n    padding-bottom: 15px;\r\n}\r\n\r\n.loading-spinner.loading-spinner--active {\r\n    display: block\r\n}\r\n\r\n.loading-spinner--wrapper {\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-top: 6em;\r\n}\r\n\r\n.lds-ellipsis {\r\n  display: inline-block;\r\n  position: relative;\r\n  width: 64px;\r\n  height: 64px;\r\n}\r\n\r\n.lds-ellipsis div {\r\n  position: absolute;\r\n  top: 27px;\r\n  width: 11px;\r\n  height: 11px;\r\n  border-radius: 50%;\r\n  background: #fff;\r\n  animation-timing-function: cubic-bezier(0, 1, 1, 0);\r\n}\r\n\r\n.lds-ellipsis div:nth-child(1) {\r\n  left: 6px;\r\n  animation: lds-ellipsis1 0.6s infinite;\r\n}\r\n\r\n.lds-ellipsis div:nth-child(2) {\r\n  left: 6px;\r\n  animation: lds-ellipsis2 0.6s infinite;\r\n}\r\n\r\n.lds-ellipsis div:nth-child(3) {\r\n  left: 26px;\r\n  animation: lds-ellipsis2 0.6s infinite;\r\n}\r\n\r\n.lds-ellipsis div:nth-child(4) {\r\n  left: 45px;\r\n  animation: lds-ellipsis3 0.6s infinite;\r\n}\r\n\r\n@keyframes lds-ellipsis1 {\r\n  0% {\r\n    transform: scale(0);\r\n  }\r\n  100% {\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes lds-ellipsis3 {\r\n  0% {\r\n    transform: scale(1);\r\n  }\r\n  100% {\r\n    transform: scale(0);\r\n  }\r\n}\r\n\r\n@keyframes lds-ellipsis2 {\r\n  0% {\r\n    transform: translate(0, 0);\r\n  }\r\n  100% {\r\n    transform: translate(19px, 0);\r\n  }\r\n}\r\n", ""]);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(92);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".template {\r\n\tdisplay:flex;\r\n\tflex-direction: column;\r\n\tmin-height: 100vh;\r\n}\r\n\r\n.main {\r\n\tflex: 1;\r\n\tposition: relative;\r\n}\r\n\r\n.no-scroll {\r\n\toverflow-y: hidden;\r\n\toverflow-x: hidden;\r\n}", ""]);


/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(95);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".channel-item {\r\n\tbackground: #DDD;\r\n    /*padding: 10px 20px;*/\r\n    display: flex;\r\n    margin-bottom: 20px;\r\n    align-items: center;\r\n    border: 1px solid #AAA;\r\n    box-shadow: 0px 2px 3px #111;\r\n    cursor: pointer;\r\n    height: 100px;\r\n    padding-right:20px;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.channel-item:hover {\r\n    background: #CCC;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.channel-item--logo {\r\n\tmargin-right: 20px;\r\n\theight:100px;\r\n}\r\n\r\n.channel-item--logo img {\r\n    width: 100px;\r\n}\r\n\r\n.channel-item--name {\r\n\tflex-grow: 2;\r\n\tfont-size: 22px;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\r\n    .channel-item {\r\n        height: 85px;\r\n    }\r\n\r\n    .channel-item--logo {\r\n        height: 85px;\r\n    }\r\n\r\n    .channel-item--logo img {\r\n        width: 85px;\r\n        height: 85px;\r\n    }\r\n}", ""]);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(97);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".notice {\r\n\tposition: fixed;\r\n    z-index: 2000;\r\n    max-width: 800px;\r\n    padding: 0px;\r\n    background: #DDD;\r\n    color: black;\r\n    border-radius: 10px;\r\n    box-shadow: 2px 2px 4px #000;\r\n    text-align: center;\r\n    font-size: 20px;\r\n    font-family: sans-serif;\r\n    opacity: 0;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.notice--visible {\r\n\topacity: 1;\r\n    padding: 25px 40px;\r\n\ttransition: opacity 0.2s ease;\r\n}", ""]);


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(99);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".integration--patreon .integration-content {\r\n\tdisplay: flex;\r\n\tpadding: 0;\r\n}\r\n\r\n.patreon--left {\r\n\tpadding: 20px;\r\n    background: #BBB;\r\n    box-shadow: 0px 1px 2px #333;\r\n    z-index: 10;\r\n}\r\n\r\n.patreon--thumb img {\r\n\twidth: 100px;\r\n\theight: 100px;\r\n}\r\n\r\n.patreon--right {\r\n\tflex: 1;\r\n}\r\n\r\n.patreon--banner {\r\n\tbackground: #e88446;\r\n    padding-left: 10px;\r\n    display: flex;\r\n    padding: 10px;\r\n    color: #222;\r\n    font-weight: 700;\r\n    font-size: 17px;\r\n    align-items: center;\r\n}\r\n\r\n.patreon--banner div {\r\n\tflex: 1;\r\n}\r\n\r\n.patreon--banner .follow-button {\r\n\talign-self: flex-end;\r\n\tjustify-content: flex-end;\r\n\tbackground: white;\r\n    border: 0;\r\n    padding: 5px 10px;\r\n    font-weight: 700;\r\n}\r\n\r\n.integration--patreon .feedback {\r\n    padding: 10px;\r\n    background: #fffc8c;\r\n    color: black;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.patreon--content {\r\n\tpadding: 10px;\r\n\tdisplay: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.column-layout {\r\n    flex-direction: column;\r\n}\r\n\r\n.patreon--content .support,\r\n.patreon--content .upgrade {\r\n\ttext-align: center;\r\n    background: white;\r\n    padding: 10px;\r\n    border-radius: 10px;\r\n    box-shadow: 1px 1px 3px #333;\r\n    margin: 0 10px;\r\n}\r\n\r\n.patreon--content button {\r\n\tbackground: rgb(232, 91, 70);\r\n    border: none;\r\n    padding: 10px 15px;\r\n    margin-top: 20px;\r\n    font-size: 14px;\r\n    text-transform: uppercase;\r\n    font-weight: bold;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n\r\n.patreon--content h3 {\r\n\ttext-align: center;\r\n}\r\n\r\n.patreon--features {\r\n\tdisplay: -webkit-flex;\r\n    display: flex;\r\n    width: 100%;\r\n    -webkit-flex-wrap: wrap;\r\n    flex-wrap: wrap;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.patreon--features div {\r\n\twidth: 48%;\r\n    margin-top: 1px;\r\n    background: white;\r\n    padding: 5px;\r\n    box-shadow: 1px 1px 3px;\r\n    text-align: center;\r\n}\r\n\r\n.support,\r\n.upgrade {\r\n\tdisplay: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.support > img,\r\n.upgrade > img {\r\n\twidth: 100px;\r\n    margin-top: 10px;\r\n}\r\n\r\n@keyframes rotation {\r\n  from {\r\n    transform: rotate(0deg);\r\n  }\r\n  to {\r\n    transform: rotate(359deg);\r\n  }\r\n}", ""]);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d4560ebe5e036427a7e7d148d6bbe147.png";

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cb44a8b2bf3e448ae2b4e495591b9f04.png";

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "609896e96c277c4d04e6782cd7c13030.png";

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "11bb5f5a33f0ab6d44dabd9277ed58cf.png";

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(105);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".manage-container {\r\n\tmax-width: 800px;\r\n\tmargin: 0 auto;\r\n\tcolor: white;\r\n}\r\n\r\n.integration {\r\n\tborder-radius: 6px;\r\n    box-shadow: 1px 1px 2px black;\r\n    margin-bottom: 20px;\r\n    color: black;\r\n}\r\n\r\n.integration.not-linked {\r\n\tbox-shadow: none;\r\n\tborder: 3px dashed white;\r\n\tbackground: none;\r\n\tpadding: 30px;\r\n}\r\n\r\n.integration--twitch {\r\n\tbackground: #DDD;\r\n}\r\n\r\n.integration--patreon {\r\n\tbackground: #DDD;\r\n}\r\n\r\n.integration-header,\r\n.integration-content {\r\n\tpadding: 10px 20px;\r\n}\r\n\r\n.integration-header {\r\n\tborder-radius: 6px 6px 0px 0px;\r\n\tdisplay: flex;\r\n\tcolor: white;\r\n}\r\n\r\n.integration--twitch .integration-header {\r\n\tbackground: #6441a4;\r\n}\r\n\r\n.integration--patreon .integration-header {\r\n\tbackground: rgb(232, 91, 70);\r\n}\r\n\r\n.integration-header h3 {\r\n\tmargin: 0 0 0 20px;\r\n\talign-self: center;\r\n}\r\n\r\n.integration-header img {\r\n\twidth: 26px;\r\n\theight: 28px;\r\n}\r\n\r\n.integration-sync {\r\n\twidth: 30px;\r\n\tflex: 1;\r\n\tdisplay: flex;\r\n    justify-content: flex-end;\r\n    align-items: center;\r\n}\r\n\r\n.integration-sync a {\r\n\tcursor: pointer;\r\n}\r\n\r\n.integration-content {\r\n\tdisplay:flex;\r\n}\r\n\r\n.integration--patreon .integration-content {\r\n\tcolor: black;\r\n}\r\n\r\n.patreonLink {\r\n\tdisplay: flex;\r\n\ttext-decoration: none;\r\n    margin: 0 auto;\r\n    width: fit-content;\r\n}\r\n\r\n.patreonLink span {\r\n\tbackground: rgb(249, 104, 84);\r\n    padding: 10px;\r\n    font-size: 14px;\r\n    text-transform: uppercase;\r\n    color: white;\r\n    font-weight: bold;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n}\r\n\r\n.profile--channels .channel-item {\r\n\tcolor: black;\r\n\tcursor: auto;\r\n\tpadding-right: 0;\r\n}\r\n\r\n.profile--channels .channel-item:hover {\r\n\tbackground-color: #DDD;\r\n}\r\n\r\n.channelInfo--logo img{\r\n\twidth: 100px;\r\n\theight: 100px;\r\n}\r\n\r\n.channelInfo--data {\r\n\tmargin-left: 30px;\r\n\talign-self: center;\r\n}\r\n\r\n.channelInfo--name {\r\n\tfont-size: 28px;\r\n}\r\n\r\n.channelInfo--link {\r\n\tfont-size: 18px;\r\n\tfont-style: italic;\r\n}\r\n\r\n.channel-item--leave {\r\n\theight: 100%;\r\n    width: 50px;\r\n    display: flex;\r\n    padding: 0;\r\n    border: 0;\r\n    cursor: pointer;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-item--leave:hover {\r\n\tbackground-color: #BBB;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-item--leave img {\r\n\twidth: 32px;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n/* Tab Styles */\r\n.manage-tabs {\r\n\tlist-style: none;\r\n\tdisplay: flex;\r\n}\r\n\r\n.manage-tab {\r\n\tpadding: 10px 20px;\r\n\tcursor: pointer;\r\n\tborder-radius: 5px;\r\n\tbackground: rgba(121, 79, 198, 0);\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.manage-tab.react-tabs__tab--selected {\r\n\tbackground: rgba(121, 79, 198, 1);\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channelHeader {\r\n\tdisplay: flex;\r\n}\r\n\r\n.channelHeader img {\r\n\twidth: 20px;\r\n}\r\n\r\n.achievement-search {\r\n\tflex: 1;\r\n\talign-self: center;\r\n\tmargin-left: 20px;\r\n}\r\n\r\n.achievement-search input {\r\n\twidth: 98%;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\th2 {\r\n\t\tmargin-left: 15px;\r\n\t}\r\n\r\n\t.manage-tabs {\r\n\t\tjustify-content: space-around;\r\n\t}\r\n\r\n\t.react-tabs ul {\r\n\t\tpadding: 0;\r\n\t}\r\n\r\n\t.manage-tab {\r\n\t\tpadding: 10px 15px;\r\n\t}\r\n\r\n\t.integration {\r\n\t\tmargin: 0 8px;\r\n\t}\r\n\r\n\t.integration-header {\r\n\t\tpadding: 15px;\r\n\t}\r\n\r\n\t.integration h3 {\r\n\t\tfont-size: 1.1em;\r\n\t}\r\n}", ""]);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(107);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".landing-page {\r\n\twidth: 100%;\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    color: white;\r\n}\r\n\r\n.twitch-login-button {\r\n\tpadding: 10px 20px;\r\n    background: #6441a4;\r\n    color: white;\r\n    font-size: 18px;\r\n    border-width: 0px;\r\n    cursor: pointer;\r\n    text-decoration: none;\r\n    height: 22px;\r\n}\r\n\r\n.button-container {\r\n\tmargin-top: 30px;\r\n}\r\n\r\n.login-button {\r\n\tposition: relative;\r\n}\r\n\r\n.login-button-icon img {\r\n\tposition: absolute;\r\n\tleft: 15px;\r\n\twidth: 20px;\r\n\ttop: 10px;\r\n}\r\n\r\n.login-button-text {\r\n\tmargin-left: 35px;\r\n}\r\n\r\n.site-logo {\r\n    width: 150px;\r\n    height: 100px;\r\n}\r\n\r\n.logo {\r\n    width: 85%;\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.landing-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    padding: 10px 20px;\r\n    max-width: 1060px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.landing-page h1 {\r\n    font-size: 58px;\r\n}\r\n\r\n.landing-page h2 {\r\n    font-size: 36px;\r\n}\r\n\r\n.section-wrapper {\r\n    background-color: rgba(0,0,0,0.5);\r\n    padding: 10px 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.section-wrapper.main {\r\n\r\n    background: #1c2741;\r\n    box-shadow: 0px -1px 5px #000\r\n}\r\n\r\n.section-wrapper.section-wrapper--full {\r\n    text-shadow: 2px 2px 3px #000;\r\n    text-align: center;\r\n}\r\n\r\n.section-wrapper.section-wrapper--alt {\r\n    background-color: rgba(0,0,0,0.6);\r\n}\r\n\r\n.section-content {\r\n    max-width: 1060px;\r\n    margin: 0 auto;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n.section-wrapper--full .section-content {\r\n    display: block;\r\n}\r\n\r\n.section-wrapper--full p {\r\n    font-size: 17px;\r\n    text-shadow: 1px 1px #000;\r\n}\r\n\r\n.section-content > h2,\r\n.section-content > div {\r\n    max-width: 48%;\r\n}\r\n\r\n.main .section-content > h2,\r\n.main .section-content > div,\r\n.section-wrapper--full .section-content > h2 {\r\n    max-width: 100%;\r\n}\r\n\r\n.section-wrapper.section-wrapper--login {\r\n    padding: 40px;\r\n}\r\n\r\n.section-wrapper--login .section-content {\r\n    flex-direction: column;\r\n}\r\n\r\n.section-wrapper--login p {\r\n    font-size: 24px;\r\n}\r\n\r\n.section-wrapper.main {\r\n    padding:40px 20px;\r\n}\r\n\r\n.main .section-content {\r\n    flex-direction: column;\r\n}\r\n\r\n.landing-page .footer {\r\n    margin-top: 0;\r\n}\r\n\r\n.landing-page .section-gfx {\r\n    max-width: 500px;\r\n}\r\n\r\n.landing-page .section-gfx img {\r\n    max-width: 500px;\r\n}", ""]);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24),
    now = __webpack_require__(109),
    toNumber = __webpack_require__(111);
/** Error message constants. */


var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(44);
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */


var now = function now() {
  return root.Date.now();
};

module.exports = now;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)))

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24),
    isSymbol = __webpack_require__(112);
/** Used as references for various `Number` constants. */


var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var baseGetTag = __webpack_require__(113),
    isObjectLike = __webpack_require__(116);
/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(45),
    getRawTag = __webpack_require__(114),
    objectToString = __webpack_require__(115);
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(45);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),
/* 115 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(118);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".achievement-icon {\r\n\tposition: absolute;\r\n    left: -40px;\r\n    top: -45px;\r\n}\r\n\r\n.achievement-icon img {\r\n\twidth: 150px;\r\n}\r\n\r\n.achievement {\r\n    background: #555;\r\n    box-shadow: 0px 1px 2px black;\r\n    width: 96%;\r\n    position: relative;\r\n    height: 2em;\r\n    margin-bottom: 25px;\r\n    display: block;\r\n    color: white;\r\n    text-shadow: 1px 1px black;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.achievement.achievement--earned {\r\n    background: #DDD;\r\n    color: black;\r\n    text-shadow: none;\r\n}\r\n\r\n.achievement.achievement--earned .achievement-logo {\r\n    opacity: 1;\r\n}\r\n\r\n.achievement-logo {\r\n    position: absolute;\r\n    left: -1px;\r\n    top: auto;\r\n    opacity: 0.5;\r\n}\r\n\r\n.achievement-logo img {\r\n    width: 90px;\r\n    height: 90px;\r\n}\r\n\r\n.achievement-info {\r\n\tdisplay: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    flex: 1;\r\n    justify-content: center;\r\n}\r\n\r\n.achievement-title {\r\n\tfont-size: 25px;\r\n    margin-bottom: 5px;\r\n    margin-top: 0px;\r\n}\r\n\r\n.achievement--edit {\r\n    cursor: pointer;\r\n}\r\n\r\n.achievement--earnDate {\r\n    position: absolute;\r\n    right: 10px;\r\n}\r\n\r\n.achievement--gift {\r\n    width: 32px;\r\n    height: 32px;\r\n    position: absolute;\r\n    right: 3.5em;\r\n    top: 1em;\r\n    cursor: pointer;\r\n}\r\n\r\n.achievement--gift img {\r\n    width:32px;\r\n}\r\n\r\n.achievement-cap {\r\n\tposition: absolute;\r\n    right: -20px;\r\n    top: -10px;\r\n}\r\n\r\n.achievement-cap img {\r\n\twidth: 55px;\r\n}\r\n\r\n.achievement-blurred {\r\n    filter: blur(7px);\r\n}", ""]);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "43ddf9475ef0754a6ff4d9c8de1c2be1.png";

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(121);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, "#channel-header {\r\n\tmin-height: 115px;\r\n    background: #DDD;\r\n    display: flex;\r\n    align-items: center;\r\n\ttransition: all 0.2s ease;\r\n\tposition: relative;\r\n\tz-index: 10;\r\n}\r\n\r\n#channel-header.condensed {\r\n\tposition: fixed;\r\n    z-index: 100;\r\n    width: 100%;\r\n    top: 0;\r\n    min-height: 60px;\r\n    height: 60px;\r\n    box-shadow: 0px 2px;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.channel-fav {\r\n\tpadding: 0 2px;\r\n\tmin-height: 115px;\r\n\tdisplay: block;\r\n\talign-items: center;\r\n    transition: all 0.2s ease;\r\n    width: 35px;\r\n}\r\n\r\n.channel-buttons {\r\n\tmargin-left: auto;\r\n}\r\n\r\n.condensed .channel-fav {\r\n\tmin-height: 70px;\r\n\ttransition: all 0.2s ease;\r\n\twidth: 5px;\r\n}\r\n\r\n.channel-fav img {\r\n\twidth: 35px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.condensed .channel-fav img {\r\n\twidth: 30px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-logo img {\r\n\twidth: 100px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-logo {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\ttransition: all 0.5s ease;\r\n\tmargin: 0px 20px;\r\n}\r\n\r\n.condensed .channel-logo img {\r\n\twidth: 55px;\r\n\theight: 55px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-name {\r\n\tdisplay: flex;\r\n}\r\n\r\n.channel-name span {\r\n\tfont-size: 20px;\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.channel-name a {\r\n\talign-items: center;\r\n\tdisplay: flex;\r\n}\r\n\r\n.channel-name img {\r\n\tbackground: white;\r\n}\r\n\r\n.channel-name .ranking {\r\n\tbackground: none;\r\n    width: 25px;\r\n    margin-left: 5px;\r\n    height: 24px;\r\n}\r\n\r\n.channel-achievement-progress {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: flex-end;\r\n\tmargin-right: 10px;\r\n\tflex: 1;\r\n\talign-items: center;\r\n\r\n}\r\n\r\n.progress-bar--label {\r\n    width: 100%;\r\n    text-align: center;\r\n    font-size: 20px;\r\n    color: #000;\r\n}\r\n\r\n.progress-bar--visual {\r\n\tdisplay: flex;\r\n\tjustify-content: flex-end;\r\n\tmargin-right: 10px;\r\n\tflex: 1;\r\n\theight: 20px;\r\n\talign-items: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.achievements-container {\r\n\tmax-width: 800px;\r\n\tmargin: 15px auto 0;\r\n}\r\n\r\n.progress-bar-wrapper {\r\n  width: 85%;\r\n  background-color: #FFF;\r\n  height: 20px;\r\n  border-radius: 9px;\r\n  border: 1px solid #666;\r\n  margin: 0px 40px;\r\n}\r\n\r\n.progress-percentage {\r\n\tposition: absolute;\r\n}\r\n\r\n.progress-bar {\r\n  height: 20px;\r\n  background-color: green;\r\n  border-radius: 6px\r\n}\r\n\r\n.no-achievements {\r\n\tfont-size: 24px;\r\n    color: white;\r\n    text-align: center;\r\n    text-shadow: 1px 1px black;\r\n    margin-top: 40px;\r\n}\r\n\r\n.channel-progress {\r\n\tflex: 1;\r\n}\r\n\r\n.channel-page--sm .channel-progress {\r\n\tposition: absolute;\r\n    width: 100%;\r\n    height: 60px;\r\n    top: 0px;\r\n    background: #DDD;\r\n    z-index: 1;\r\n    display: flex;\r\n    flex-direction: column;\r\n    border-bottom: 1px solid;\r\n    padding-bottom: 5px;\r\n}\r\n\r\n.channel-page--sm .progress-bar--label {\r\n\tmargin-top: 5px;\r\n}\r\n\r\n.channel-page--sm .progress-bar-wrapper,\r\n.channel-page--sm .progress-bar {\r\n\theight: 20px;\r\n}\r\n\r\n.channel-page--sm .channel-progress.channel-progress--visible {\r\n\ttop: 60px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.channel-page--sm .condensed + .channel-progress.channel-progress--visible {\r\n\ttop: 120px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\t#channel-header {\r\n\t    width: 100%;\r\n\t    height: 60px;\r\n\t    min-height: inherit;\r\n\t    box-shadow: 0px 2px;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.channel-fav {\r\n\t\theight: 70px;\r\n\t\ttransition: all 0.2s ease;\r\n\t\twidth: 5px;\r\n\t}\r\n\r\n\t.channel-fav img {\r\n\t\twidth: 30px;\r\n\t\ttransition: all 0.2s ease;\r\n\t}\r\n\r\n\t.channel-logo img {\r\n\t\twidth: 55px;\r\n\t\theight: 55px;\r\n\t\ttransition: all 0.2s ease;\r\n\t}\r\n\r\n\t.achievements-container .achievement-logo img {\r\n\t\twidth: 80px;\r\n\t}\r\n\r\n\t.achievements-container .achievement-title {\r\n\t\tmargin-top: -5px;\r\n\t\tfont-size: 20px;\r\n\t}\r\n}", ""]);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {
    return "%".concat(x.charCodeAt(0).toString(16).toUpperCase());
  });
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': "\uFFFD\uFFFD",
    '%FF%FE': "\uFFFD\uFFFD"
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = "\uFFFD";
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

module.exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + _typeof(encodedURI) + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  var separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(126);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".verify-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    color: white;\r\n    text-align: center;\r\n    align-items: center;\r\n    padding: 0px 20px;\r\n}\r\n\r\n.verify-wrapper p {\r\n\tfont-size: 18px;\r\n}\r\n\r\n.verify-wrapper h2 {\r\n    font-size: 30px;\r\n}\r\n\r\n.verify-wrapper a {\r\n\tcolor: #ecdc19;\r\n}", ""]);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(128);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".modal-mask {\r\n\tposition: fixed;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0,0,0,0.6);\r\n    z-index: 100;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.modal-container {\r\n\tposition: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 101;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.modal {\r\n    position: absolute;\r\n\tmax-width: 600px;\r\n    background: #DDD;\r\n    padding: 10px 20px;\r\n    min-height: 200px;\r\n    box-shadow: 0px 4px 4px #111;\r\n    border-radius: 2px;\r\n    color: black;\r\n    min-width: 450px;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.modal a {\r\n    position: absolute;\r\n    right: 0;\r\n    height: 40px;\r\n    width: 40px;\r\n}\r\n\r\n.modal h3 {\r\n    color: black;\r\n    text-align: center;\r\n}\r\n\r\n.modal h4 {\r\n    font-size: 18px;\r\n    border-bottom: 1px solid #666;\r\n    margin-top: 0px;\r\n    padding-top: 10px;\r\n}\r\n\r\n.modal input {\r\n\twidth: 100%;\r\n    height: 24px;\r\n}\r\n\r\n.modal select {\r\n    height: 30px;\r\n}\r\n\r\n.channel-search {\r\n\tmargin-bottom: 15px;\r\n}\r\n\r\n.modal .channel-item {\r\n\tbackground: white;\r\n}\r\n\r\n.modal--hidden {\r\n    display: none;\r\n}\r\n\r\n.modal-error {\r\n    text-align: center;\r\n    color: red;\r\n    margin-bottom: 20px;\r\n    border-top: 1px solid;\r\n    border-bottom: 1px solid red;\r\n    padding: 5px 0px;\r\n    display: none;\r\n}\r\n\r\n.modal-error.modal-error--active {\r\n    display: block;\r\n}\r\n\r\n.formGroup {\r\n    display: flex;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.formGroup img {\r\n    align-self: center;\r\n    max-width: 150px;\r\n    max-height: 150px;\r\n}\r\n\r\n.formGroup label {\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n    align-items: center;\r\n    align-self: center;\r\n    text-align: right;\r\n    width: 30%;\r\n    margin-right: 10px;\r\n}\r\n\r\n.formGroup .textInput,\r\n.formGroup .selectInput {\r\n    font-size: 14px;\r\n    width: 96%;\r\n    padding-left: 2%;\r\n    margin-left: 2%;\r\n}\r\n\r\n.formGroup.checkboxGroup {\r\n    flex-direction: row;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.checkboxGroup div {\r\n    width: 100%;\r\n}\r\n\r\n.checkbox {\r\n    flex: 1;\r\n    text-align: center;\r\n}\r\n\r\n.checkbox label {\r\n    margin-right: 0;\r\n}\r\n\r\n.checkbox input {\r\n    margin-top: 5px;\r\n}\r\n\r\n.formGroup.checkboxGroup label {\r\n    white-space: nowrap\r\n}\r\n\r\n.formGroup.checkboxGroup input {\r\n    height: 20px;\r\n    width: 20px;\r\n    align-self: flex-start;\r\n}\r\n\r\n.noMargin {\r\n    margin: 0;\r\n}\r\n\r\n.currentIcon {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex: 1;\r\n    margin: 3%;\r\n    width: 90%;\r\n    border: 2px inset #AAA;\r\n    background-color: #BBB;\r\n    cursor: pointer;\r\n    min-height: 150px;\r\n}\r\n\r\n.availableIcons {\r\n    /*overflow-y: scroll;*/\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex: 1;\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n}\r\n\r\n.gallery-wrapper {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 80px;\r\n    width: 80px;\r\n    padding: 0;\r\n    border: 1px solid #999;\r\n    border-radius: 8px;\r\n    margin-bottom: 5px;\r\n    cursor: pointer;\r\n}\r\n\r\n.gallery-wrapper.image--selected {\r\n    border-color: #455c96;\r\n    background-color: #b691fa80;\r\n}\r\n\r\n.gallery-wrapper img {\r\n    width: 65px;\r\n    height: 65px;\r\n}\r\n\r\n.upload--subtext {\r\n    font-style: italic;\r\n}\r\n\r\n.gallery-wrapper div {\r\n    flex: 1;\r\n}\r\n\r\n.icon-upload {\r\n    margin-bottom: 0;\r\n}\r\n\r\n.iconPreview-group {\r\n    /*Remove when image gallery available*/\r\n    justify-content: center;\r\n}\r\n\r\n.modal .helpText {\r\n    font-size: 14px;\r\n    text-align: right;\r\n    color: #000;\r\n    margin-top: -5px;\r\n}\r\n\r\n.chooseImage--wrapper {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    align-items: center;\r\n}\r\n\r\n.chooseImage--wrapper .currentImage {\r\n    display: flex;\r\n    flex-direction: column;\r\n    text-align: center;\r\n    width: 40%;\r\n    align-items: center;\r\n}\r\n\r\n.currentImage h4 {\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.currentImage img {\r\n    width: 150px;\r\n    height: 150px;\r\n}\r\n\r\n.chooseImage--wrapper .chooseImage {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    text-align: center;\r\n}\r\n\r\n.chooseImage > button {\r\n    padding: 10px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.chooseImage #achievement-icon {\r\n    display: none;\r\n}\r\n\r\n.chooseImage--confirm,\r\n.chooseImage--cancel {\r\n    margin-top: 10px;\r\n    padding: 10px;\r\n    font-size: 17px;\r\n    cursor:pointer;\r\n    border: 1px solid #666;\r\n}\r\n\r\n.chooseImage--confirm {\r\n    margin-top: 30px;\r\n    background-color: #455c96;\r\n    border:none;\r\n    color: white;\r\n}\r\n\r\n.hoverText {\r\n    position: absolute;\r\n    padding: 10px 20px;\r\n    background-color: rgba(33,33,33,0.8);\r\n    border-radius: 15px;\r\n    color: white;\r\n    text-shadow: 1px 1px black;\r\n    opacity: 0;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.hoverText.hoverText--active {\r\n    opacity: 1;\r\n    transition: all 0.2s ease;\r\n}", ""]);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(130);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".chooseMember--wrapper h5 {\r\n\ttext-align: center;\r\n\tfont-size: 18px;\r\n}\r\n\r\n.member-list {\r\n\tmax-height: 300px;\r\n\toverflow-y: scroll;\r\n\tmargin: 15px 0;\r\n\tbackground: white;\r\n\tborder: 1px solid white;\r\n}\r\n\r\n.member-list .channelMember {\r\n\tdisplay: -webkit-flex;\r\n    display: flex;\r\n    width: 100%;\r\n    border: none;\r\n    background: #DDD;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n    margin-bottom: 1px;\r\n    font-size: 15px;\r\n    cursor: pointer;\r\n}\r\n\r\n.member-list .channelMember .member-info {\r\n\tflex: 0;\r\n}\r\n\r\n.member-list .channelMember--stripe {\r\n\tbackground: #EEE;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.member-list .channelMember.channelMember--selected {\r\n\tbackground: #5a70a7;\r\n    color: white;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.chooseMember--award,\r\n.chooseMember--cancel {\r\n\tpadding: 10px;\r\n\tmargin-top: 10px;\r\n\tbackground-color: #888;\r\n\tborder: none;\r\n\tcolor: white;\r\n\tfont-size: 17px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.chooseMember--award {\r\n\tbackground-color: #2f4882;\r\n}", ""]);


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(132);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".confirm-panel .modal-content div {\r\n\tmargin: 0 0 20px;\r\n\ttext-align: center;\r\n\tfont-size: 18px;\r\n}\r\n\r\n.confirm-panel button {\r\n\theight: auto;\r\n\twidth: 98%;\r\n\tpadding: 10px;\r\n\tmargin-top: 5px;\r\n\tcursor: pointer;\r\n    font-size: 16px;\r\n    font-weight: bold;\r\n}\r\n\r\n.confirm-panel .confirm-delete-button {\r\n\tbackground: red;\r\n    color: white;\r\n    border: none;\r\n}", ""]);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(134);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".manage-container {\r\n\tmax-width: 800px;\r\n\tmargin: 0 auto;\r\n\tcolor: white;\r\n\tpadding: 0 15px;\r\n}\r\n\r\n.general-configuration img {\r\n\twidth: 100px;\r\n\theight: 100px;\r\n}\r\n\r\n.section-wrapper {\r\n    justify-content: flex-start;\r\n}\r\n\r\n.section-label {\r\n    padding: 5px 10px;\r\n    text-align: right;\r\n    width: 30%;\r\n}\r\n\r\n.section-label label {\r\n    font-weight: 700;\r\n}\r\n\r\n.section-value {\r\n    flex: 1;\r\n    padding: 5px 10px;\r\n    margin-left: 20px;\r\n}\r\n\r\n.default-icons {\r\n\tdisplay: flex;\r\n}\r\n\r\n.default-icons button {\r\n\tbackground: none;\r\n\tborder: none;\r\n}\r\n\r\n/*.default-icons button.selected {\r\n\tborder: 2px solid aliceblue;\r\n\tbackground: rgba(200,200,200,0.5);\r\n}*/\r\n\r\n\r\n.integration--patreon {\r\n\tbackground: #DDD;\r\n}\r\n\r\n.integration-header,\r\n.integration-content {\r\n\tpadding: 20px;\r\n}\r\n\r\n.integration-header {\r\n\tborder-radius: 6px 6px 0px 0px;\r\n\tdisplay: flex;\r\n}\r\n\r\n.integration--twitch .integration-header {\r\n\tbackground: #6441a4;\r\n}\r\n\r\n.integration--patreon .integration-header {\r\n\tbackground: rgb(232, 91, 70);\r\n}\r\n\r\n.integration-header h3 {\r\n\tmargin: 0 0 0 20px;\r\n\talign-self: center;\r\n}\r\n\r\n.integration-header img {\r\n\twidth: 26px;\r\n\theight: 28px;\r\n}\r\n\r\n.integration-sync {\r\n\ttext-align: right;\r\n\twidth: 30px;\r\n\tflex: 1;\r\n}\r\n\r\n.integration-sync a {\r\n\tcursor: pointer;\r\n}\r\n\r\n.integration-content {\r\n\tdisplay:flex;\r\n}\r\n\r\n.integration--patreon .integration-content {\r\n\tcolor: black;\r\n}\r\n\r\n.channelInfo--logo img{\r\n\twidth: 100px;\r\n\theight: 100px;\r\n}\r\n\r\n.channelInfo--data {\r\n\tmargin-left: 30px;\r\n\talign-self: center;\r\n}\r\n\r\n.channelInfo--name {\r\n\tfont-size: 28px;\r\n}\r\n\r\n.channelInfo--link {\r\n\tfont-size: 18px;\r\n\tfont-style: italic;\r\n}\r\n\r\n/* Tab Styles */\r\n.manage-tabs {\r\n\tlist-style: none;\r\n\tdisplay: flex;\r\n}\r\n\r\n.manage-tab {\r\n\tpadding: 10px 20px;\r\n\tcursor: pointer;\r\n\tborder-radius: 5px;\r\n\tbackground: rgba(121, 79, 198, 0);\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.manage-tab.react-tabs__tab--selected {\r\n\tbackground: #2f4882;\r\n\ttransition: all 0.2s ease;\r\n    box-shadow: 0px 0px 3px #000;\r\n}\r\n\r\n/* Member styles */\r\n.channelMember {\r\n\tdisplay: flex;\r\n\talign-content: center;\r\n\tpadding: 5px 10px;\r\n\tborder-top: 1px solid #455c96;\r\n}\r\n\r\n.channelMember--stripe {\r\n\tbackground-color: rgba(0,0,0,0.4);\r\n}\r\n\r\n.channelMember img {\r\n\twidth: 50px;\r\n}\r\n\r\n.channelMember .member-info {\r\n\tflex: 1;\r\n\talign-self: center;\r\n\tmargin-left: 20px;\r\n}\r\n\r\n.achievementsHeader {\r\n\tdisplay: flex;\r\n}\r\n\r\n.achievementsHeader img {\r\n\twidth: 20px;\r\n}\r\n\r\n.achievementsHeader--add {\r\n\tflex: 1;\r\n\ttext-align: right;\r\n\talign-self: center;\r\n\tdisplay: flex;\r\n\tflex-direction: row-reverse;\r\n}\r\n\r\n.achievementsHeader--plus {\r\n\tflex: 1;  \r\n\tmargin-right: 5px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    display: flex;\r\n}\r\n\r\n.achievementsHeader--add img {\r\n\talign-self: center;\r\n}\r\n\r\n.achievementsHeader--add a {\r\n\ttext-decoration: none;\r\n\tcolor: white;\r\n\talign-self: center;\r\n\tdisplay: flex;\r\n    flex-direction: row-reverse;\r\n    align-items: center;\r\n}\r\n\r\n.achievement-search {\r\n\tflex: 1;\r\n\talign-self: center;\r\n\tmargin-left: 20px;\r\n}\r\n\r\n.achievement-search input {\r\n\twidth: 98%;\r\n\theight: 25px;\r\n    padding-left: 2%;\r\n}\r\n\r\n.achievement--edit {\r\n\twidth: 32px;\r\n    height: 32px;\r\n    position: absolute;\r\n    right: 1em;\r\n    top: 1em;\r\n}\r\n\r\n.achievement--edit img {\r\n\twidth:32px;\r\n}\r\n\r\n.achievement-logo {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: -1em;\r\n}\r\n\r\n.add-achievement {\r\n\tmax-width: 600px;\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    border: 2px dashed #AAA;\r\n    padding: 10px 20px;\r\n    color: white;\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.add-achievement img {\r\n\twidth:32px;\r\n\theight:32px;\r\n\tmargin-top:5px;\r\n}\r\n\r\n\r\n.customDefaultImg {\r\n\tdisplay: -webkit-flex;\r\n    display: flex;\r\n    -webkit-flex-direction: column;\r\n    flex-direction: column;\r\n    -webkit-justify-content: center;\r\n    justify-content: center;\r\n    -webkit-align-items: center;\r\n    align-items: center;\r\n    width: 100px;\r\n    cursor: pointer;\r\n    height: 100px;\r\n    text-align: center;\r\n}\r\n\r\n.customDefaultImg.no-default {\r\n\tborder: 2px inset #AAA;\r\n}\r\n\r\n.default-icon--input {\r\n\tdisplay: none;\r\n}\r\n\r\n.section-wrapper--end {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\tpadding: 15px 10px;\r\n}\r\n\r\n.section-wrapper--end input {\r\n\twidth: 200px;\r\n    height: 40px;\r\n    font-size: 17px;\r\n    transition: all .2s ease;\r\n}\r\n\r\n.section-wrapper--end .save-button--active {\r\n\tbackground: #007d00;\r\n    border: none;\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 17px;\r\n    width: 200px;\r\n    box-shadow: -1px -1px 1px black;\r\n    text-shadow: 1px 1px 3px black;\r\n    transition: all .2s ease;\r\n}\r\n\r\n.imageGallery {\r\n\tdisplay: flex;\r\n    width: 100%;\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n}\r\n\r\n.image--wrapper {\r\n\tbackground: #999;\r\n    border-radius: 8px;\r\n    margin: 5px;\r\n    border: 1px solid black;\r\n    box-shadow: 1px 1px 3px black;\r\n    position: relative;\r\n    display: flex;\r\n}\r\n\r\n.image--wrapper.active {\r\n\tbackground: #DDD;\r\n}\r\n\r\n.image--wrapper img {\r\n\twidth: 125px;\r\n\theight: 125px;\r\n\topacity: 0.6;\r\n\tborder-radius: 6px;\r\n}\r\n\r\n.image--wrapper.active img {\r\n\topacity: 1\r\n}\r\n\r\n.manage-container h4 {\r\n\tmargin-bottom: 0px;\r\n\tfont-size: 18px;\r\n}\r\n\r\n.manage-container .subText {\r\n\tfont-style: italic;\r\n}\r\n\r\n.deleteImg {\r\n\tfloat: right;\r\n    position: absolute;\r\n    right: 4px;\r\n    top: 4px;\r\n    width: 16px;\r\n    height: 16px;\r\n    background: red;\r\n    padding: 4px;\r\n    border-radius: 10px;\r\n    opacity: 0;\r\n\ttransition: all 0.2s ease;\r\n\tcursor: pointer;\r\n\tz-index: 100;\r\n}\r\n\r\n.image--wrapper:hover .deleteImg {\r\n\topacity: 1;\r\n\ttransition: all 0.2s ease;\r\n\tcursor: pointer;\r\n}\r\n\r\n.deleteImg .icon {\r\n\tbackground-image: url(https://res.cloudinary.com/phirehero/image/upload/v1556641782/trash-white.png);\r\n    background-size: 16px;\r\n    height: 16px;\r\n}\r\n\r\n.delete-image--confirm {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n}\r\n\r\n.image--wrapper.default {\r\n\tbackground: #5a70a7;\r\n}\r\n\r\n.image--wrapper.default img {\r\n\topacity: 1\r\n}\r\n\r\n.image--label {\r\n\tposition: absolute;\r\n    bottom: 0;\r\n    width: 126px;\r\n    text-align: center;\r\n    background: #00000099;\r\n    border-radius: 0px 0px 6px 6px;\r\n    left: 0px;\r\n}\r\n\r\n.delete-image--confirm img {\r\n\twidth: 100px;\r\n}\r\n\r\n.defaultIcon,\r\n.hiddenIcon {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex: 1;\r\n    margin: 0 3%;\r\n    border: 2px inset #AAA;\r\n    background-color: #BBB;\r\n    cursor: pointer;\r\n    height: 98px;\r\n    width: 98px;\r\n\ttransition: all 0.2s ease;\r\n}\r\n\r\n.defaultIcon--placeholder,\r\n.hiddenIcon--placeholder {\r\n\tbackground: url('https://res.cloudinary.com/phirehero/image/upload/v1558809631/upload.png');\r\n\twidth:50px;\r\n\theight:50px;\r\n\tmargin: 0 auto;\r\n\tbackground-size: 50px;\r\n}\r\n\r\n.divider {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\twidth: 50px;\r\n\tmargin: 1px 0 1px 5%;\r\n}\r\n\r\n.icon--stock {\r\n\tmargin: 2px;\r\n\twidth: 100px;\r\n\theight: 100px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.icon--selected {\r\n\tbackground-color: #425583;\r\n    border: 2px solid white;\r\n    margin: 0;\r\n\ttransition: background 0.2s ease;\r\n}\r\n\r\n.manage-container .disabled {\r\n\tdisplay: none;\r\n\tpointer-events: none;\r\n}\r\n\r\n@media only screen and (max-width: 480px) {\r\n\th2 {\r\n\t\tmargin-left: 15px;\r\n\t}\r\n\r\n\t.manage-tabs {\r\n\t\tjustify-content: space-around;\r\n\t}\r\n\r\n\t.react-tabs ul {\r\n\t\tpadding: 0;\r\n\t}\r\n\r\n\t.manage-tab {\r\n\t\tpadding: 10px 15px;\r\n\t}\r\n\r\n\t.twitch-integration {\r\n\t\tmargin: 0 8px;\r\n\t}\r\n\r\n\t.twitch-integration--header {\r\n\t\tpadding: 15px;\r\n\t}\r\n\r\n\t.twitch-integration h3 {\r\n\t\tfont-size: 1.1em;\r\n\t}\r\n}", ""]);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(136);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".achievement-wrapper {\r\n\tmargin: 15px auto;\r\n\tcolor: white;\r\n\tmax-width: 800px;\r\n}\r\n\r\n.achievement-wrapper h4 {\r\n\tfont-size: 18px;\r\n    border-bottom: 1px solid #666;\r\n    margin-top: 0px;\r\n    padding-top: 10px;\r\n}\r\n\r\n.achievementPage-header {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n}\r\n\r\n.achievementPage-header h2 {\r\n\tflex: 1;\r\n}\r\n\r\n.delete-achievement-button {\r\n    height:25px;\r\n    padding: 10px;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.delete-achievement-button:hover {\r\n\tbackground:rgb(63, 56, 82);\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.achievement-preview {\r\n\t\r\n}\r\n\r\n.achievement-wrapper form {\r\n\tmax-width: 800px;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n.achievement-wrapper input {\r\n\twidth: 100%;\r\n    height: 24px;\r\n}\r\n\r\n.achievement-wrapper select {\r\n    height: 30px;\r\n}\r\n\r\n.achievement-wrapper select {\r\n\tpadding: 3px 0px;\r\n}\r\n\r\n.helpText {\r\n\ttext-align: right;\r\n}\r\n\r\n.checkboxes {\r\n\tdisplay: flex;\r\n\twidth: 103%;\r\n}\r\n\r\n.achievement-button.submit-achievement {\r\n\twidth: 98%;\r\n\tpadding: 10px 15px;\r\n    height: auto;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin: 0 auto;\r\n}\r\n\r\n.button-bank {\r\n\tdisplay: flex;\r\n\tjustify-content: space-around;\r\n\tmargin-top: 10px;\r\n}\r\n\r\n.button-bank button {\r\n\tpadding: 10px 15px;\r\n\twidth: 48%;\r\n}\r\n\r\n.achievement-wrapper .disabled {\r\n\tdisplay: none;\r\n\tpointer-events: none;\r\n}\r\n\r\n.formGroup.upgradeTier p {\r\n\ttext-align: center;\r\n    width: 100%;\r\n    padding: 10px 0px;\r\n}", ""]);


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "31f177498c6601d5d8fed57044c1a150.png";

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(139);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".directory-search input {\r\n\twidth: 98%;\r\n    height: 40px;\r\n    padding-left: 2%;\r\n}\r\n\r\n.directory-results {\r\n\tmargin-top: 30px;\r\n}", ""]);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(141);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".createChannel--wrapper {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tcolor: white;\r\n\tfont-size: 16px;\r\n\talign-items: center;\r\n\ttext-align: center;\r\n}\r\n\r\n.createChannel--wrapper .confirmForm {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\twidth: 60%;\r\n}\r\n\r\n.confirmForm input {\r\n\tmargin-top: 20px;\r\n\tpadding: 10px 20px;\r\n\tfont-size: 18px;\r\n\ttext-align: center;\r\n}\r\n\r\n.confirmForm button:disabled {\r\n\tbackground-color: #BBB;\r\n\tcolor: #666;\r\n\tcursor: default;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.confirmForm button:disabled:hover {\r\n\tbackground-color: #BBB;\r\n\tcolor: #666;\r\n\tcursor: default;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.confirmForm button {\r\n\tmargin-top: 15px;\r\n\tpadding: 10px 20px;\r\n\tborder: 0;\r\n\tcolor: white;\r\n    background-color: #007900;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.confirmForm button:hover {\r\n\tbackground-color: #088f08;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.createChannel--wrapper h4 {\r\n\tfont-size: 22px;\r\n    color: #46fb46;\r\n    text-shadow: -2px -2px 4px #000;\r\n}\r\n\r\n.createChannel--wrapper .home {\r\n\tpadding: 10px 20px;\r\n    border: 0;\r\n    color: white;\r\n    font-size: 16px;\r\n    background: #6440a4;\r\n    font-weight: bold;\r\n    text-decoration: none;\r\n}", ""]);


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(143);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, ".pendingMembers-wrapper {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    justify-content: space-between;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember {\r\n\tbackground: #DDD;\r\n    display: flex;\r\n    flex: 1;\r\n    max-width: 49%;\r\n    margin-bottom: 20px;\r\n    align-items: center;\r\n    border: 1px solid #AAA;\r\n    box-shadow: 0px 2px 3px #111;\r\n    height: 75px;\r\n\tposition: relative;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember .member-logo {\r\n\tdisplay: flex;\r\n\tmargin-right: 15px;\r\n    border-right: 1px solid #666;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember .member-logo img {\r\n\twidth: 75px;\r\n\theight: 75px;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember .member-mobileWrapper {\r\n\tdisplay: flex;\r\n\tflex: 1;\r\n}\r\n\r\n.pendingMember .member-info {\r\n\tdisplay: flex;\r\n\tflex: 1;\r\n\talign-items: center;\r\n\tcolor: #333;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember .member-info a {\r\n\tmargin-left: 0px;\r\n    position: absolute;\r\n    left: 0px;\r\n    bottom: -1px;\r\n    width: 75px;\r\n    height: 75px;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.pendingMember .member-info a img {\r\n\tbackground: #FFF;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\tbottom: 0;\r\n}\r\n\r\n.pendingMember .member-action img {\r\n\twidth: 30px;\r\n    margin: 0 4px;\r\n    -webkit-transition: all 0.2s ease;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n\t.pendingMembers-wrapper {\r\n\t\tflex-direction: column;\r\n\t}\r\n\t\r\n\t.pendingMember {\r\n\t\twidth: 98%;\r\n\t    max-width: unset;\r\n\t    margin: 0 auto 10px;\r\n\t    height: 85px;\r\n\t    padding-right: 2%;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.pendingMember .member-logo img {\r\n\t\twidth: 85px;\r\n    \theight: 85px;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.pendingMember .member-mobileWrapper {\r\n\t\tflex: 1;\r\n\t    display: flex;\r\n\t    flex-direction: column;\r\n\t    align-items: center;\r\n\t    width: 100%;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.pendingMember .member-info {\r\n\t\tflex: 1;\r\n\t    color: #333;\r\n\t    align-items: center;\r\n\t    display: flex;\r\n\t    margin-bottom: 5px;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.pendingMember .member-info a {\r\n\t\twidth: 85px;\r\n\t\theight: 85px;\r\n\t}\r\n\r\n\t.pendingMember .member-action {\r\n\t\twidth: 100%;\r\n\t    align-items: center;\r\n\t    justify-content: center;\r\n\t    justify-items: center;\r\n\t    padding-top: 10px;\r\n\t    display: flex;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n\r\n\t.pendingMember .member-action .approve,\r\n\t.pendingMember .member-action .deny {\r\n\t\tflex: 1;\r\n\t    align-items: center;\r\n\t    justify-content: center;\r\n\t    display: flex;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t    cursor: pointer;\r\n\t}\r\n\r\n\t.pendingMember .member-action .approve {\r\n\t    border-right: 1px solid #666;\r\n\t    -webkit-transition: all 0.2s ease;\r\n\t    transition: all 0.2s ease;\r\n\t}\r\n}", ""]);


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6c72ee6280971707ca8e5b9d8c91876d.png";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ab07f5c29bea5fbcf59c9430e20e86d9.png";

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(26);

// EXTERNAL MODULE: ./src/app.css
var app = __webpack_require__(56);

// CONCATENATED MODULE: ./src/app.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var app_App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", null, this.props.children);
    }
  }]);

  return App;
}(react["Component"]);

/* harmony default export */ var src_app = (app_App);
// EXTERNAL MODULE: ./src/routes/home-page.css
var home_page = __webpack_require__(59);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Context.js

var ReactReduxContext = react_default.a.createContext(null);
/* harmony default export */ var components_Context = (ReactReduxContext);
// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Provider.js





var Provider_Provider =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Provider, _Component);

  function Provider(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var store = props.store;
    _this.state = {
      storeState: store.getState(),
      store: store
    };
    return _this;
  }

  var _proto = Provider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this.subscribe();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this._isMounted = false;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      if (this.unsubscribe) this.unsubscribe();
      this.subscribe();
    }
  };

  _proto.subscribe = function subscribe() {
    var _this2 = this;

    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      var newStoreState = store.getState();

      if (!_this2._isMounted) {
        return;
      }

      _this2.setState(function (providerState) {
        // If the value is the same, skip the unnecessary state update.
        if (providerState.storeState === newStoreState) {
          return null;
        }

        return {
          storeState: newStoreState
        };
      });
    }); // Actions might have been dispatched between render and mount - handle those

    var postMountStoreState = store.getState();

    if (postMountStoreState !== this.state.storeState) {
      this.setState({
        storeState: postMountStoreState
      });
    }
  };

  _proto.render = function render() {
    var Context = this.props.context || ReactReduxContext;
    return react_default.a.createElement(Context.Provider, {
      value: this.state
    }, this.props.children);
  };

  return Provider;
}(react["Component"]);

Provider_Provider.propTypes = {
  store: prop_types_default.a.shape({
    subscribe: prop_types_default.a.func.isRequired,
    dispatch: prop_types_default.a.func.isRequired,
    getState: prop_types_default.a.func.isRequired
  }),
  context: prop_types_default.a.object,
  children: prop_types_default.a.any
};
/* harmony default export */ var components_Provider = (Provider_Provider);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function assertThisInitialized_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(27);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(5);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/react-redux/es/components/connectAdvanced.js










var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      _ref2$forwardRef = _ref2.forwardRef,
      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? ReactReduxContext : _ref2$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);

  browser_default()(renderCountProp === undefined, "renderCountProp is removed. render counting is built into the latest React dev tools profiling extension");
  browser_default()(!withRef, 'withRef is removed. To access the wrapped instance, use a ref on the connected component');
  var customStoreWarningMessage = 'To use a custom Redux store for specific components,  create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like:  <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';
  browser_default()(storeKey === 'store', 'storeKey has been removed and does not do anything. ' + customStoreWarningMessage);
  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if (false) {}

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = Object(esm_extends["a" /* default */])({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var pure = connectOptions.pure;
    var OuterBaseComponent = react["Component"];

    if (pure) {
      OuterBaseComponent = react["PureComponent"];
    }

    function makeDerivedPropsSelector() {
      var lastProps;
      var lastState;
      var lastDerivedProps;
      var lastStore;
      var lastSelectorFactoryOptions;
      var sourceSelector;
      return function selectDerivedProps(state, props, store, selectorFactoryOptions) {
        if (pure && lastProps === props && lastState === state) {
          return lastDerivedProps;
        }

        if (store !== lastStore || lastSelectorFactoryOptions !== selectorFactoryOptions) {
          lastStore = store;
          lastSelectorFactoryOptions = selectorFactoryOptions;
          sourceSelector = selectorFactory(store.dispatch, selectorFactoryOptions);
        }

        lastProps = props;
        lastState = state;
        var nextProps = sourceSelector(state, props);
        lastDerivedProps = nextProps;
        return lastDerivedProps;
      };
    }

    function makeChildElementSelector() {
      var lastChildProps, lastForwardRef, lastChildElement, lastComponent;
      return function selectChildElement(WrappedComponent, childProps, forwardRef) {
        if (childProps !== lastChildProps || forwardRef !== lastForwardRef || lastComponent !== WrappedComponent) {
          lastChildProps = childProps;
          lastForwardRef = forwardRef;
          lastComponent = WrappedComponent;
          lastChildElement = react_default.a.createElement(WrappedComponent, Object(esm_extends["a" /* default */])({}, childProps, {
            ref: forwardRef
          }));
        }

        return lastChildElement;
      };
    }

    var Connect =
    /*#__PURE__*/
    function (_OuterBaseComponent) {
      _inheritsLoose(Connect, _OuterBaseComponent);

      function Connect(props) {
        var _this;

        _this = _OuterBaseComponent.call(this, props) || this;
        browser_default()(forwardRef ? !props.wrapperProps[storeKey] : !props[storeKey], 'Passing redux store in props has been removed and does not do anything. ' + customStoreWarningMessage);
        _this.selectDerivedProps = makeDerivedPropsSelector();
        _this.selectChildElement = makeChildElementSelector();
        _this.indirectRenderWrappedComponent = _this.indirectRenderWrappedComponent.bind(assertThisInitialized_assertThisInitialized(_this));
        return _this;
      }

      var _proto = Connect.prototype;

      _proto.indirectRenderWrappedComponent = function indirectRenderWrappedComponent(value) {
        // calling renderWrappedComponent on prototype from indirectRenderWrappedComponent bound to `this`
        return this.renderWrappedComponent(value);
      };

      _proto.renderWrappedComponent = function renderWrappedComponent(value) {
        browser_default()(value, "Could not find \"store\" in the context of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + "or pass a custom React context provider to <Provider> and the corresponding " + ("React context consumer to " + displayName + " in connect options."));
        var storeState = value.storeState,
            store = value.store;
        var wrapperProps = this.props;
        var forwardedRef;

        if (forwardRef) {
          wrapperProps = this.props.wrapperProps;
          forwardedRef = this.props.forwardedRef;
        }

        var derivedProps = this.selectDerivedProps(storeState, wrapperProps, store, selectorFactoryOptions);
        return this.selectChildElement(WrappedComponent, derivedProps, forwardedRef);
      };

      _proto.render = function render() {
        var ContextToUse = this.props.context && this.props.context.Consumer && Object(react_is["isContextConsumer"])(react_default.a.createElement(this.props.context.Consumer, null)) ? this.props.context : Context;
        return react_default.a.createElement(ContextToUse.Consumer, null, this.indirectRenderWrappedComponent);
      };

      return Connect;
    }(OuterBaseComponent);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;

    if (forwardRef) {
      var forwarded = react_default.a.forwardRef(function forwardConnectRef(props, ref) {
        return react_default.a.createElement(Connect, {
          wrapperProps: props,
          forwardedRef: ref
        });
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoist_non_react_statics_cjs_default()(forwarded, WrappedComponent);
    }

    return hoist_non_react_statics_cjs_default()(Connect, WrappedComponent);
  };
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/shallowEqual.js
function shallowEqual_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { shallowEqual_typeof = function _typeof(obj) { return typeof obj; }; } else { shallowEqual_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return shallowEqual_typeof(obj); }

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (shallowEqual_typeof(objA) !== 'object' || objA === null || shallowEqual_typeof(objB) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
// EXTERNAL MODULE: ./node_modules/symbol-observable/es/index.js
var es = __webpack_require__(28);

// CONCATENATED MODULE: ./node_modules/redux/es/redux.js
function redux_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { redux_typeof = function _typeof(obj) { return typeof obj; }; } else { redux_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return redux_typeof(obj); }


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (redux_typeof(obj) !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (redux_typeof(observer) !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[es["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[es["a" /* default */]] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (redux_typeof(actionCreators) !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : redux_typeof(actionCreators)) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if (false) {}


// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/isPlainObject.js
function isPlainObject_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { isPlainObject_typeof = function _typeof(obj) { return typeof obj; }; } else { isPlainObject_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return isPlainObject_typeof(obj); }

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject_isPlainObject(obj) {
  if (isPlainObject_typeof(obj) !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/warning.js
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning_warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/verifyPlainObject.js


function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject_isPlainObject(value)) {
    warning_warning(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/wrapMapToProps.js

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (false) {}
      return props;
    };

    return proxy;
  };
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapDispatchToProps.js
function mapDispatchToProps_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { mapDispatchToProps_typeof = function _typeof(obj) { return typeof obj; }; } else { mapDispatchToProps_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return mapDispatchToProps_typeof(obj); }



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && mapDispatchToProps_typeof(mapDispatchToProps) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ var connect_mapDispatchToProps = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapStateToProps.js

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ var connect_mapStateToProps = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mergeProps.js


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return Object(esm_extends["a" /* default */])({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (false) {}
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ var connect_mergeProps = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/verifySubselectors.js


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning_warning("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/selectorFactory.js


function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutPropertiesLoose(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (false) {}

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/connect.js
function connect_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { connect_typeof = function _typeof(obj) { return typeof obj; }; } else { connect_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return connect_typeof(obj); }









/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + connect_typeof(arg) + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? connect_mapStateToProps : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? connect_mapDispatchToProps : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? connect_mergeProps : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, Object(esm_extends["a" /* default */])({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ var connect_connect = (createConnect());
// CONCATENATED MODULE: ./node_modules/react-redux/es/index.js





// CONCATENATED MODULE: ./src/redux/connector.js

function connector(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return connect_connect(mapStateToProps, mapDispatchToProps, mergeProps, options);
}
// CONCATENATED MODULE: ./src/redux/profile-reducer.js
function profile_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { profile_reducer_defineProperty(target, key, source[key]); }); } return target; }

function profile_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_PROFILE = 'SET_PROFILE';
var SYNC_PATREON = 'SYNC_PATREON';
var initialState = {
  username: '',
  logo: '',
  status: '',
  type: ''
};
function ProfileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PROFILE:
      return profile_reducer_objectSpread({}, state, {
        profile: {
          username: action.data.username,
          logo: action.data.logo,
          status: action.data.status,
          type: action.data.type
        },
        patreon: action.data.patreon
      });

    case SYNC_PATREON:
      return profile_reducer_objectSpread({}, state, {
        patreon: action.data
      });

    default:
      return profile_reducer_objectSpread({}, state);
  }
}
function setProfile(data) {
  return {
    type: SET_PROFILE,
    data: data
  };
}
function syncPatreon(data) {
  return {
    type: SYNC_PATREON,
    data: data
  };
}
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(2);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var Link = __webpack_require__(15);

// EXTERNAL MODULE: ./src/components/notification-panel.css
var notification_panel = __webpack_require__(82);

// CONCATENATED MODULE: ./src/components/notification-panel.js
function notification_panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { notification_panel_typeof = function _typeof(obj) { return typeof obj; }; } else { notification_panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return notification_panel_typeof(obj); }

function notification_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notification_panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function notification_panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) notification_panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) notification_panel_defineProperties(Constructor, staticProps); return Constructor; }

function notification_panel_possibleConstructorReturn(self, call) { if (call && (notification_panel_typeof(call) === "object" || typeof call === "function")) { return call; } return notification_panel_assertThisInitialized(self); }

function notification_panel_getPrototypeOf(o) { notification_panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return notification_panel_getPrototypeOf(o); }

function notification_panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function notification_panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) notification_panel_setPrototypeOf(subClass, superClass); }

function notification_panel_setPrototypeOf(o, p) { notification_panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return notification_panel_setPrototypeOf(o, p); }

function notification_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var notification_panel_NotificationPanel =
/*#__PURE__*/
function (_React$Component) {
  notification_panel_inherits(NotificationPanel, _React$Component);

  function NotificationPanel(props) {
    var _this;

    notification_panel_classCallCheck(this, NotificationPanel);

    _this = notification_panel_possibleConstructorReturn(this, notification_panel_getPrototypeOf(NotificationPanel).call(this, props));

    notification_panel_defineProperty(notification_panel_assertThisInitialized(_this), "goToChannel", function (channel) {
      _this.props.history.push('/channel/' + channel);
    });

    _this.state = {
      username: null
    };
    return _this;
  }

  notification_panel_createClass(NotificationPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var badge;
      var count = 0;

      if (count > 0) {
        badge = react_default.a.createElement("div", {
          className: "notificationPanel-badge"
        }, count);
      }

      var notificationContent = react_default.a.createElement("div", {
        className: "notificationContent"
      }, react_default.a.createElement("div", {
        className: "notification notification--unread"
      }, react_default.a.createElement("div", {
        className: "notification--icon"
      }, react_default.a.createElement("img", {
        alt: "",
        src: "https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg"
      })), react_default.a.createElement("div", {
        className: "notification--info"
      }, "You earned the 'Fresh and Crispy' Achievement!"), react_default.a.createElement("div", {
        className: "notification--delete"
      }, "X")), react_default.a.createElement("div", {
        className: "notification"
      }, react_default.a.createElement("div", {
        className: "notification--icon"
      }, react_default.a.createElement("img", {
        alt: "",
        src: "https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg"
      })), react_default.a.createElement("div", {
        className: "notification--info"
      }, "You earned the 'Fresh and Crispy' Achievement!"), react_default.a.createElement("div", {
        className: "notification--delete"
      }, "X")), react_default.a.createElement("div", {
        className: "notification"
      }, react_default.a.createElement("div", {
        className: "notification--icon"
      }, react_default.a.createElement("img", {
        alt: "",
        src: "https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg"
      })), react_default.a.createElement("div", {
        className: "notification--info"
      }, "You earned the 'Fresh and Crispy' Achievement!"), react_default.a.createElement("div", {
        className: "notification--delete"
      }, "X")));
      return react_default.a.createElement("div", {
        title: "Notifications coming soon!",
        className: "notificationPanel-wrapper" + (this.props.active ? " notificationPanel--active" : "")
      }, react_default.a.createElement("div", {
        className: "notificationPanel"
        /*onClick={this.props.onClick}*/

      }, react_default.a.createElement("img", {
        alt: "",
        src: __webpack_require__(84)
      }), badge), notificationContent);
    }
  }]);

  return NotificationPanel;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/components/header.css
var header = __webpack_require__(85);

// CONCATENATED MODULE: ./src/components/header.js
function header_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { header_typeof = function _typeof(obj) { return typeof obj; }; } else { header_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return header_typeof(obj); }

function header_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function header_createClass(Constructor, protoProps, staticProps) { if (protoProps) header_defineProperties(Constructor.prototype, protoProps); if (staticProps) header_defineProperties(Constructor, staticProps); return Constructor; }

function header_possibleConstructorReturn(self, call) { if (call && (header_typeof(call) === "object" || typeof call === "function")) { return call; } return header_assertThisInitialized(self); }

function header_getPrototypeOf(o) { header_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return header_getPrototypeOf(o); }

function header_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function header_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) header_setPrototypeOf(subClass, superClass); }

function header_setPrototypeOf(o, p) { header_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return header_setPrototypeOf(o, p); }

function header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var header_Header =
/*#__PURE__*/
function (_React$Component) {
  header_inherits(Header, _React$Component);

  function Header() {
    var _this;

    header_classCallCheck(this, Header);

    _this = header_possibleConstructorReturn(this, header_getPrototypeOf(Header).call(this));

    header_defineProperty(header_assertThisInitialized(_this), "toggleMenu", function () {
      _this.positionModal();

      _this.setState({
        menuActive: !_this.state.menuActive,
        notificationActive: false
      });
    });

    header_defineProperty(header_assertThisInitialized(_this), "toggleNotifications", function () {
      _this.positionNotificationPanel();

      _this.setState({
        notificationActive: !_this.state.notificationActive,
        menuActive: false
      });
    });

    header_defineProperty(header_assertThisInitialized(_this), "positionModal", function () {
      var maskHeight = window.innerHeight - 130;
      document.documentElement.scrollTop = 0;
      _this._mask.style.top = '130px';
      _this._mask.style.height = maskHeight + 'px';
    });

    header_defineProperty(header_assertThisInitialized(_this), "positionNotificationPanel", function () {});

    _this.state = {
      menuActive: false
    };
    return _this;
  }

  header_createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.profile) {
        axios_default.a.get('http://api.streamachievements.com/api/user').then(function (res) {
          console.log(res.data);

          _this2.props.dispatch(setProfile(res.data));
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var username, logo;

      if (this.props.profile) {
        username = this.props.profile.username;
        logo = react_default.a.createElement("img", {
          alt: "User Profile Icon",
          src: this.props.profile.logo
        });
      }

      var channelLink = null;

      if (this.props.profile) {
        var status = this.props.profile.status;
        console.log(this.props.profile);

        switch (status) {
          case 'verified':
            channelLink = react_default.a.createElement("li", null, react_default.a.createElement(Link["a" /* default */], {
              to: "/manage/" + this.props.profile.username
            }, "Manage Channel"));
            break;

          case 'pending':
            channelLink = react_default.a.createElement("li", {
              className: "reviewing"
            }, "Go check your email!!");
            break;

          case 'review':
            channelLink = react_default.a.createElement("li", {
              className: "reviewing"
            }, "We are currently reviewing your channel! We will let you know when you can start!");
            break;

          case 'viewer':
            channelLink = react_default.a.createElement("li", null, react_default.a.createElement(Link["a" /* default */], {
              to: "/channel/create"
            }, "Start Channel"));
            break;

          default:
            break;
        }
      }

      var adminLink;

      if (this.props.profile && this.props.profile.type === 'admin') {
        console.log('hellu');
        adminLink = react_default.a.createElement("li", {
          className: "admin"
        }, react_default.a.createElement(Link["a" /* default */], {
          to: "/admin"
        }, "Admin Panel"));
      }

      if (this.props.profile && this.props.profile.notifications) {
        var notifications = this.props.profile.notifications;
      }

      var menu = react_default.a.createElement("div", {
        className: "menu-dropdown--wrapper" + (this.state.menuActive ? " menu-dropdown--active" : "")
      }, react_default.a.createElement("div", {
        className: "menu-dropdown"
      }, react_default.a.createElement("ul", null, react_default.a.createElement("li", null, react_default.a.createElement(Link["a" /* default */], {
        to: "/home"
      }, "Home")), react_default.a.createElement("li", null, react_default.a.createElement(Link["a" /* default */], {
        to: "/profile"
      }, "Profile")), channelLink, adminLink, react_default.a.createElement("li", null, react_default.a.createElement(Link["a" /* default */], {
        to: "/support"
      }, "Support Us!")), react_default.a.createElement("li", {
        className: "logout"
      }, react_default.a.createElement("a", {
        href: "http://api.streamachievements.com/auth/logout"
      }, "Log Out")))), react_default.a.createElement("div", {
        className: "menu-mask",
        ref: function ref(mask) {
          return _this3._mask = mask;
        },
        onClick: this.toggleMenu
      }));
      return react_default.a.createElement("div", {
        id: "page-header"
      }, react_default.a.createElement("div", {
        className: "logo"
      }, react_default.a.createElement(Link["a" /* default */], {
        to: "/home"
      }, react_default.a.createElement("img", {
        src: __webpack_require__(40),
        alt: ""
      }))), react_default.a.createElement(notification_panel_NotificationPanel, {
        onClick: this.toggleNotifications,
        profile: this.props.profile,
        active: this.state.notificationActive
      }), react_default.a.createElement("div", {
        className: "menu" + (this.state.menuActive ? " menu--active" : ""),
        onClick: this.toggleMenu
      }, react_default.a.createElement("div", {
        className: "menu--logo"
      }, logo), react_default.a.createElement("div", {
        className: "menu--label"
      }, username), react_default.a.createElement("div", {
        className: "menu--icon"
      })), menu);
    }
  }]);

  return Header;
}(react_default.a.Component);

function headerMapStateToProps(state) {
  return {
    profile: state.profile
  };
}

/* harmony default export */ var components_header = (connector(headerMapStateToProps)(header_Header));
// EXTERNAL MODULE: ./src/components/footer.css
var footer = __webpack_require__(87);

// CONCATENATED MODULE: ./src/components/footer.js
function footer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { footer_typeof = function _typeof(obj) { return typeof obj; }; } else { footer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return footer_typeof(obj); }

function footer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function footer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function footer_createClass(Constructor, protoProps, staticProps) { if (protoProps) footer_defineProperties(Constructor.prototype, protoProps); if (staticProps) footer_defineProperties(Constructor, staticProps); return Constructor; }

function footer_possibleConstructorReturn(self, call) { if (call && (footer_typeof(call) === "object" || typeof call === "function")) { return call; } return footer_assertThisInitialized(self); }

function footer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function footer_getPrototypeOf(o) { footer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return footer_getPrototypeOf(o); }

function footer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) footer_setPrototypeOf(subClass, superClass); }

function footer_setPrototypeOf(o, p) { footer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return footer_setPrototypeOf(o, p); }




var footer_Footer =
/*#__PURE__*/
function (_React$Component) {
  footer_inherits(Footer, _React$Component);

  function Footer() {
    footer_classCallCheck(this, Footer);

    return footer_possibleConstructorReturn(this, footer_getPrototypeOf(Footer).apply(this, arguments));
  }

  footer_createClass(Footer, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "footer"
      }, react_default.a.createElement("div", {
        className: "footer-content"
      }, "\u200E\xA9 2019 StreamAchievements. All Rights Reserved."));
    }
  }]);

  return Footer;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/cookie/index.js
var cookie = __webpack_require__(20);
var cookie_default = /*#__PURE__*/__webpack_require__.n(cookie);

// CONCATENATED MODULE: ./src/utils/auth-utils.js



var auth_utils_isAuthenticated = function isAuthenticated() {
  var cookies = cookie_default.a.parse(document.cookie);

  if (cookies.etid) {
    return true;
  }

  return false;
};

var auth_utils_AxiosInstance = function AxiosInstance(history, method, endpoint, opts) {
  return new Promise(function (resolve, reject) {
    if (opts) {
      axios_default.a[method](endpoint, opts).then(function (res) {
        if (res.redirect) {
          history.push('/');
        } else {
          resolve(res);
        }
      });
    } else {
      axios_default.a[method](endpoint).then(function (res) {
        if (res.redirect) {
          history.push('/');
        } else {
          resolve(res);
        }
      });
    }
  });
};


// EXTERNAL MODULE: ./src/components/loading-spinner.css
var loading_spinner = __webpack_require__(89);

// CONCATENATED MODULE: ./src/components/loading-spinner.js
function loading_spinner_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { loading_spinner_typeof = function _typeof(obj) { return typeof obj; }; } else { loading_spinner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return loading_spinner_typeof(obj); }

function loading_spinner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function loading_spinner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function loading_spinner_createClass(Constructor, protoProps, staticProps) { if (protoProps) loading_spinner_defineProperties(Constructor.prototype, protoProps); if (staticProps) loading_spinner_defineProperties(Constructor, staticProps); return Constructor; }

function loading_spinner_possibleConstructorReturn(self, call) { if (call && (loading_spinner_typeof(call) === "object" || typeof call === "function")) { return call; } return loading_spinner_assertThisInitialized(self); }

function loading_spinner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function loading_spinner_getPrototypeOf(o) { loading_spinner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return loading_spinner_getPrototypeOf(o); }

function loading_spinner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) loading_spinner_setPrototypeOf(subClass, superClass); }

function loading_spinner_setPrototypeOf(o, p) { loading_spinner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return loading_spinner_setPrototypeOf(o, p); }




var loading_spinner_LoadingSpinner =
/*#__PURE__*/
function (_React$Component) {
  loading_spinner_inherits(LoadingSpinner, _React$Component);

  function LoadingSpinner(props) {
    loading_spinner_classCallCheck(this, LoadingSpinner);

    return loading_spinner_possibleConstructorReturn(this, loading_spinner_getPrototypeOf(LoadingSpinner).call(this, props));
  }

  loading_spinner_createClass(LoadingSpinner, [{
    key: "render",
    value: function render() {
      var classes = 'loading-spinner';

      if (this.props.full) {
        classes += ' loading-spinner--full';
      }

      if (this.props.isLoading) {
        classes += ' loading-spinner--active';
      }

      return react_default.a.createElement("div", {
        className: classes
      }, react_default.a.createElement("div", {
        className: "loading-spinner--wrapper"
      }, react_default.a.createElement("div", {
        className: "lds-ellipsis"
      }, react_default.a.createElement("div", null), react_default.a.createElement("div", null), react_default.a.createElement("div", null), react_default.a.createElement("div", null))));
    }
  }]);

  return LoadingSpinner;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/components/template.css
var template = __webpack_require__(91);

// CONCATENATED MODULE: ./src/components/template.js
function template_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { template_typeof = function _typeof(obj) { return typeof obj; }; } else { template_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return template_typeof(obj); }

function template_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function template_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function template_createClass(Constructor, protoProps, staticProps) { if (protoProps) template_defineProperties(Constructor.prototype, protoProps); if (staticProps) template_defineProperties(Constructor, staticProps); return Constructor; }

function template_possibleConstructorReturn(self, call) { if (call && (template_typeof(call) === "object" || typeof call === "function")) { return call; } return template_assertThisInitialized(self); }

function template_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function template_getPrototypeOf(o) { template_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return template_getPrototypeOf(o); }

function template_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) template_setPrototypeOf(subClass, superClass); }

function template_setPrototypeOf(o, p) { template_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return template_setPrototypeOf(o, p); }








var template_Template =
/*#__PURE__*/
function (_React$Component) {
  template_inherits(Template, _React$Component);

  function Template() {
    template_classCallCheck(this, Template);

    return template_possibleConstructorReturn(this, template_getPrototypeOf(Template).apply(this, arguments));
  }

  template_createClass(Template, [{
    key: "render",
    value: function render() {
      var redirect;

      if (!auth_utils_isAuthenticated()) {
        var Redirect = __webpack_require__(10).Redirect;

        return react_default.a.createElement(Redirect, {
          to: "/"
        });
      }

      var isLoading, fullscreen;

      if (this.props.spinner) {
        isLoading = this.props.spinner.isLoading;
        fullscreen = this.props.spinner.fullscreen;
      }

      return react_default.a.createElement("div", {
        className: "template"
      }, redirect, react_default.a.createElement(components_header, null), react_default.a.createElement("div", {
        className: "main"
      }, this.props.children, react_default.a.createElement(loading_spinner_LoadingSpinner, {
        isLoading: isLoading,
        full: fullscreen
      })), react_default.a.createElement(footer_Footer, null));
    }
  }]);

  return Template;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/channel-list.css
var channel_list = __webpack_require__(94);

// CONCATENATED MODULE: ./src/components/channel-list.js
function channel_list_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { channel_list_typeof = function _typeof(obj) { return typeof obj; }; } else { channel_list_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return channel_list_typeof(obj); }

function channel_list_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function channel_list_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function channel_list_createClass(Constructor, protoProps, staticProps) { if (protoProps) channel_list_defineProperties(Constructor.prototype, protoProps); if (staticProps) channel_list_defineProperties(Constructor, staticProps); return Constructor; }

function channel_list_possibleConstructorReturn(self, call) { if (call && (channel_list_typeof(call) === "object" || typeof call === "function")) { return call; } return channel_list_assertThisInitialized(self); }

function channel_list_getPrototypeOf(o) { channel_list_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return channel_list_getPrototypeOf(o); }

function channel_list_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function channel_list_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) channel_list_setPrototypeOf(subClass, superClass); }

function channel_list_setPrototypeOf(o, p) { channel_list_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return channel_list_setPrototypeOf(o, p); }

function channel_list_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var channel_list_ChannelList =
/*#__PURE__*/
function (_React$Component) {
  channel_list_inherits(ChannelList, _React$Component);

  function ChannelList() {
    var _this;

    channel_list_classCallCheck(this, ChannelList);

    _this = channel_list_possibleConstructorReturn(this, channel_list_getPrototypeOf(ChannelList).call(this));

    channel_list_defineProperty(channel_list_assertThisInitialized(_this), "getChannels", function () {
      axios_default.a.get('http://api.streamachievements.com/api/channel/user').then(function (res) {
        console.log('got data');
        console.log(res.data);

        _this.setState({
          channels: res.data
        });

        if (_this.props.onLoad) {
          _this.props.onLoad();
        }
      });
    });

    channel_list_defineProperty(channel_list_assertThisInitialized(_this), "showDirectory", function () {
      _this.props.history.push('/directory');
    });

    channel_list_defineProperty(channel_list_assertThisInitialized(_this), "goToChannel", function (channel) {
      _this.props.history.push('/channel/' + channel);
    });

    _this.state = {
      channels: false,
      isAddChannelActive: false
    };
    return _this;
  }

  channel_list_createClass(ChannelList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getChannels();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var content, headerJoinButton, joinFirstChannel;

      if (!this.state.channels) {
        content = null;
      } else {
        var channels = this.state.channels;

        if (Array.isArray(channels)) {
          if (channels.length > 0) {
            //we have some channels!
            content = channels.map(function (channel, index) {
              return react_default.a.createElement("div", {
                key: "channel." + index,
                className: "channel-item",
                onClick: function onClick() {
                  _this2.goToChannel(channel.owner);
                }
              }, react_default.a.createElement("div", {
                className: "channel-item--logo"
              }, react_default.a.createElement("img", {
                alt: "Channel Logo",
                src: channel.logo
              })), react_default.a.createElement("div", {
                className: "channel-item--name"
              }, channel.owner), react_default.a.createElement("div", {
                className: "channel-item--percentage"
              }, channel.percentage + '%'));
            });
            headerJoinButton = react_default.a.createElement("div", {
              onClick: this.showDirectory,
              className: "join-channel-button"
            }, react_default.a.createElement("img", {
              alt: "plus icon",
              src: __webpack_require__(17)
            }), react_default.a.createElement("span", null, "Join a channel"));
          } else {
            joinFirstChannel = react_default.a.createElement("div", {
              onClick: this.showDirectory,
              className: "add-channel"
            }, react_default.a.createElement("div", null, "Join your first channel!"), react_default.a.createElement("div", null, react_default.a.createElement("img", {
              alt: "plus icon",
              src: __webpack_require__(17)
            })));
          }
        }
      }

      return react_default.a.createElement("div", null, react_default.a.createElement("div", {
        className: "channel-header"
      }, react_default.a.createElement("h3", null, "My Channels"), headerJoinButton), react_default.a.createElement("div", {
        className: "channel-list"
      }, content, joinFirstChannel));
    }
  }]);

  return ChannelList;
}(react_default.a.Component);

/* harmony default export */ var components_channel_list = (Object(withRouter["a" /* default */])(channel_list_ChannelList));
// CONCATENATED MODULE: ./src/routes/home-page.js
function home_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { home_page_typeof = function _typeof(obj) { return typeof obj; }; } else { home_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return home_page_typeof(obj); }

function home_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function home_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) home_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) home_page_defineProperties(Constructor, staticProps); return Constructor; }

function home_page_possibleConstructorReturn(self, call) { if (call && (home_page_typeof(call) === "object" || typeof call === "function")) { return call; } return home_page_assertThisInitialized(self); }

function home_page_getPrototypeOf(o) { home_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return home_page_getPrototypeOf(o); }

function home_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function home_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) home_page_setPrototypeOf(subClass, superClass); }

function home_page_setPrototypeOf(o, p) { home_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return home_page_setPrototypeOf(o, p); }

function home_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var home_page_HomePage =
/*#__PURE__*/
function (_React$Component) {
  home_page_inherits(HomePage, _React$Component);

  function HomePage() {
    var _this;

    home_page_classCallCheck(this, HomePage);

    _this = home_page_possibleConstructorReturn(this, home_page_getPrototypeOf(HomePage).call(this));

    home_page_defineProperty(home_page_assertThisInitialized(_this), "listLoaded", function () {
      _this.setState({
        loading: false
      });
    });

    _this.state = {
      loading: true
    };
    return _this;
  }

  home_page_createClass(HomePage, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement(template_Template, {
        spinner: {
          isLoading: this.state.loading,
          fullscreen: true
        }
      }, react_default.a.createElement("div", {
        className: "main-content"
      }, react_default.a.createElement(components_channel_list, {
        onLoad: this.listLoaded
      })));
    }
  }]);

  return HomePage;
}(react_default.a.Component);


// CONCATENATED MODULE: ./node_modules/react-tabs/esm/helpers/elementTypes.js
function isTab(el) {
  return el.type && el.type.tabsRole === 'Tab';
}
function isTabPanel(el) {
  return el.type && el.type.tabsRole === 'TabPanel';
}
function isTabList(el) {
  return el.type && el.type.tabsRole === 'TabList';
}
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/helpers/childrenDeepMap.js
function childrenDeepMap_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { childrenDeepMap_typeof = function _typeof(obj) { return typeof obj; }; } else { childrenDeepMap_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return childrenDeepMap_typeof(obj); }

function childrenDeepMap_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      childrenDeepMap_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function childrenDeepMap_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




function isTabChild(child) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

function deepMap(children, callback) {
  return react["Children"].map(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (child.props && child.props.children && childrenDeepMap_typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return Object(react["cloneElement"])(child, childrenDeepMap_objectSpread({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }

    return child;
  });
}
function deepForEach(children, callback) {
  return react["Children"].forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (child.props && child.props.children && childrenDeepMap_typeof(child.props.children) === 'object') {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/helpers/propTypes.js
function propTypes_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { propTypes_typeof = function _typeof(obj) { return typeof obj; }; } else { propTypes_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return propTypes_typeof(obj); }



function childrenPropType(props, propName, componentName) {
  var error;
  var tabsCount = 0;
  var panelsCount = 0;
  var tabListFound = false;
  var listTabs = [];
  var children = props[propName];
  deepForEach(children, function (child) {
    if (isTabList(child)) {
      if (child.props && child.props.children && propTypes_typeof(child.props.children) === 'object') {
        deepForEach(child.props.children, function (listChild) {
          return listTabs.push(listChild);
        });
      }

      if (tabListFound) {
        error = new Error("Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.");
      }

      tabListFound = true;
    }

    if (isTab(child)) {
      if (!tabListFound || listTabs.indexOf(child) === -1) {
        error = new Error("Found a 'Tab' component outside of the 'TabList' component. 'Tab' components " + "have to be inside the 'TabList' component.");
      }

      tabsCount++;
    } else if (isTabPanel(child)) {
      panelsCount++;
    }
  });

  if (!error && tabsCount !== panelsCount) {
    error = new Error("There should be an equal number of 'Tab' and 'TabPanel' in `" + componentName + "`. " + ("Received " + tabsCount + " 'Tab' and " + panelsCount + " 'TabPanel'."));
  }

  return error;
}
function onSelectPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop && typeof prop !== 'function') {
    error = new Error("Invalid " + location + " `" + name + "` of type `" + propTypes_typeof(prop) + "` supplied " + ("to `" + componentName + "`, expected `function`."));
  } else if (props.selectedIndex != null && prop == null) {
    error = new Error("The " + location + " `" + name + "` is marked as required in `" + componentName + "`, but " + "its value is `undefined` or `null`.\n" + "`onSelect` is required when `selectedIndex` is also set. Not doing so will " + "make the tabs not do anything, as `selectedIndex` indicates that you want to " + "handle the selected tab yourself.\n" + "If you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.");
  }

  return error;
}
function selectedIndexPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop != null && typeof prop !== 'number') {
    error = new Error("Invalid " + location + " `" + name + "` of type `" + propTypes_typeof(prop) + "` supplied to " + ("`" + componentName + "`, expected `number`."));
  } else if (props.defaultIndex != null && prop != null) {
    return new Error("The " + location + " `" + name + "` cannot be used together with `defaultIndex` " + ("in `" + componentName + "`.\n") + ("Either remove `" + name + "` to let `" + componentName + "` handle the selected ") + "tab internally or remove `defaultIndex` to handle it yourself.");
  }

  return error;
}
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(11);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/react-tabs/esm/helpers/uuid.js
// Get a universally unique identifier
var uuid_count = 0;
function uuid() {
  return "react-tabs-" + uuid_count++;
}
function uuid_reset() {
  uuid_count = 0;
}
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/helpers/count.js


function count_getTabsCount(children) {
  var tabCount = 0;
  deepForEach(children, function (child) {
    if (isTab(child)) tabCount++;
  });
  return tabCount;
}
function count_getPanelsCount(children) {
  var panelCount = 0;
  deepForEach(children, function (child) {
    if (isTabPanel(child)) panelCount++;
  });
  return panelCount;
}
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/components/UncontrolledTabs.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function UncontrolledTabs_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function UncontrolledTabs_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}










function isNode(node) {
  return node && 'getAttribute' in node;
} // Determine if a node from event.target is a Tab element


function isTabNode(node) {
  return isNode(node) && node.getAttribute('role') === 'tab';
} // Determine if a tab node is disabled


function isTabDisabled(node) {
  return isNode(node) && node.getAttribute('aria-disabled') === 'true';
}

var canUseActiveElement;

try {
  canUseActiveElement = !!(typeof window !== 'undefined' && window.document && window.document.activeElement);
} catch (e) {
  // Work around for IE bug when accessing document.activeElement in an iframe
  // Refer to the following resources:
  // http://stackoverflow.com/a/10982960/369687
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12733599
  canUseActiveElement = false;
}

var UncontrolledTabs_UncontrolledTabs =
/*#__PURE__*/
function (_Component) {
  UncontrolledTabs_inheritsLoose(UncontrolledTabs, _Component);

  function UncontrolledTabs() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.tabNodes = [];

    _this.handleKeyDown = function (e) {
      if (_this.isTabFromContainer(e.target)) {
        var index = _this.props.selectedIndex;
        var preventDefault = false;
        var useSelectedIndex = false;

        if (e.keyCode === 32 || e.keyCode === 13) {
          preventDefault = true;
          useSelectedIndex = false;

          _this.handleClick(e);
        }

        if (e.keyCode === 37 || e.keyCode === 38) {
          // Select next tab to the left
          index = _this.getPrevTab(index);
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 39 || e.keyCode === 40) {
          // Select next tab to the right
          index = _this.getNextTab(index);
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 35) {
          // Select last tab (End key)
          index = _this.getLastTab();
          preventDefault = true;
          useSelectedIndex = true;
        } else if (e.keyCode === 36) {
          // Select first tab (Home key)
          index = _this.getFirstTab();
          preventDefault = true;
          useSelectedIndex = true;
        } // This prevents scrollbars from moving around


        if (preventDefault) {
          e.preventDefault();
        } // Only use the selected index in the state if we're not using the tabbed index


        if (useSelectedIndex) {
          _this.setSelected(index, e);
        }
      }
    };

    _this.handleClick = function (e) {
      var node = e.target; // eslint-disable-next-line no-cond-assign

      do {
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);

          _this.setSelected(index, e);

          return;
        }
      } while ((node = node.parentNode) != null);
    };

    return _this;
  }

  var _proto = UncontrolledTabs.prototype;

  _proto.setSelected = function setSelected(index, event) {
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;
    var _this$props = this.props,
        onSelect = _this$props.onSelect,
        selectedIndex = _this$props.selectedIndex; // Call change event handler

    onSelect(index, selectedIndex, event);
  };

  _proto.getNextTab = function getNextTab(index) {
    var count = this.getTabsCount(); // Look for non-disabled tab from index to the last tab on the right

    for (var i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // If no tab found, continue searching from first on left to index


    for (var _i = 0; _i < index; _i++) {
      if (!isTabDisabled(this.getTab(_i))) {
        return _i;
      }
    } // No tabs are disabled, return index


    return index;
  };

  _proto.getPrevTab = function getPrevTab(index) {
    var i = index; // Look for non-disabled tab from index to first tab on the left

    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // If no tab found, continue searching from last tab on right to index


    i = this.getTabsCount();

    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    } // No tabs are disabled, return index


    return index;
  };

  _proto.getFirstTab = function getFirstTab() {
    var count = this.getTabsCount(); // Look for non disabled tab from the first tab

    for (var i = 0; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    return null;
  };

  _proto.getLastTab = function getLastTab() {
    var i = this.getTabsCount(); // Look for non disabled tab from the last tab

    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    return null;
  };

  _proto.getTabsCount = function getTabsCount() {
    var children = this.props.children;
    return count_getTabsCount(children);
  };

  _proto.getPanelsCount = function getPanelsCount() {
    var children = this.props.children;
    return count_getPanelsCount(children);
  };

  _proto.getTab = function getTab(index) {
    return this.tabNodes["tabs-" + index];
  };

  _proto.getChildren = function getChildren() {
    var _this2 = this;

    var index = 0;
    var _this$props2 = this.props,
        children = _this$props2.children,
        disabledTabClassName = _this$props2.disabledTabClassName,
        focus = _this$props2.focus,
        forceRenderTabPanel = _this$props2.forceRenderTabPanel,
        selectedIndex = _this$props2.selectedIndex,
        selectedTabClassName = _this$props2.selectedTabClassName,
        selectedTabPanelClassName = _this$props2.selectedTabPanelClassName;
    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount(); // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control

    while (diff++ < 0) {
      this.tabIds.push(uuid());
      this.panelIds.push(uuid());
    } // Map children to dynamically setup refs


    return deepMap(children, function (child) {
      var result = child; // Clone TabList and Tab components to have refs

      if (isTabList(child)) {
        var listIndex = 0; // Figure out if the current focus in the DOM is set on a Tab
        // If it is we should keep the focus on the next selected tab

        var wasTabFocused = false;

        if (canUseActiveElement) {
          wasTabFocused = react_default.a.Children.toArray(child.props.children).filter(isTab).some(function (tab, i) {
            return document.activeElement === _this2.getTab(i);
          });
        }

        result = Object(react["cloneElement"])(child, {
          children: deepMap(child.props.children, function (tab) {
            var key = "tabs-" + listIndex;
            var selected = selectedIndex === listIndex;
            var props = {
              tabRef: function tabRef(node) {
                _this2.tabNodes[key] = node;
              },
              id: _this2.tabIds[listIndex],
              panelId: _this2.panelIds[listIndex],
              selected: selected,
              focus: selected && (focus || wasTabFocused)
            };
            if (selectedTabClassName) props.selectedClassName = selectedTabClassName;
            if (disabledTabClassName) props.disabledClassName = disabledTabClassName;
            listIndex++;
            return Object(react["cloneElement"])(tab, props);
          })
        });
      } else if (isTabPanel(child)) {
        var props = {
          id: _this2.panelIds[index],
          tabId: _this2.tabIds[index],
          selected: selectedIndex === index
        };
        if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName) props.selectedClassName = selectedTabPanelClassName;
        index++;
        result = Object(react["cloneElement"])(child, props);
      }

      return result;
    });
  };
  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */


  _proto.isTabFromContainer = function isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    } // Check if the first occurrence of a Tabs container is `this` one.


    var nodeAncestor = node.parentElement;

    do {
      if (nodeAncestor === this.node) return true;
      if (nodeAncestor.getAttribute('data-tabs')) break;
      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  };

  _proto.render = function render() {
    var _this3 = this; // Delete all known props, so they don't get added to DOM


    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        disabledTabClassName = _this$props3.disabledTabClassName,
        domRef = _this$props3.domRef,
        focus = _this$props3.focus,
        forceRenderTabPanel = _this$props3.forceRenderTabPanel,
        onSelect = _this$props3.onSelect,
        selectedIndex = _this$props3.selectedIndex,
        selectedTabClassName = _this$props3.selectedTabClassName,
        selectedTabPanelClassName = _this$props3.selectedTabPanelClassName,
        attributes = UncontrolledTabs_objectWithoutPropertiesLoose(_this$props3, ["children", "className", "disabledTabClassName", "domRef", "focus", "forceRenderTabPanel", "onSelect", "selectedIndex", "selectedTabClassName", "selectedTabPanelClassName"]);

    return react_default.a.createElement("div", _extends({}, attributes, {
      className: classnames_default()(className),
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ref: function ref(node) {
        _this3.node = node;
        if (domRef) domRef(node);
      },
      "data-tabs": true
    }), this.getChildren());
  };

  return UncontrolledTabs;
}(react["Component"]);

UncontrolledTabs_UncontrolledTabs.defaultProps = {
  className: 'react-tabs',
  focus: false
};

UncontrolledTabs_UncontrolledTabs.propTypes =  false ? undefined : {};
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/components/Tabs.js
function Tabs_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function Tabs_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}






var MODE_CONTROLLED = 0;
var MODE_UNCONTROLLED = 1;

var Tabs_Tabs =
/*#__PURE__*/
function (_Component) {
  Tabs_inheritsLoose(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.handleSelected = function (index, last, event) {
      var onSelect = _this.props.onSelect;
      var mode = _this.state.mode; // Call change event handler

      if (typeof onSelect === 'function') {
        // Check if the change event handler cancels the tab change
        if (onSelect(index, last, event) === false) return;
      }

      var state = {
        // Set focus if the change was triggered from the keyboard
        focus: event.type === 'keydown'
      };

      if (mode === MODE_UNCONTROLLED) {
        // Update selected index
        state.selectedIndex = index;
      }

      _this.setState(state);
    };

    _this.state = Tabs.copyPropsToState(_this.props, {}, props.defaultFocus);
    return _this;
  }

  Tabs.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return Tabs.copyPropsToState(props, state);
  };

  Tabs.getModeFromProps = function getModeFromProps(props) {
    return props.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
  }; // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0


  Tabs.copyPropsToState = function copyPropsToState(props, state, focus) {
    if (focus === void 0) {
      focus = false;
    }

    if (false) {}

    var newState = {
      focus: focus,
      mode: Tabs.getModeFromProps(props)
    };

    if (newState.mode === MODE_UNCONTROLLED) {
      var maxTabIndex = count_getTabsCount(props.children) - 1;
      var selectedIndex = null;

      if (state.selectedIndex != null) {
        selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
      } else {
        selectedIndex = props.defaultIndex || 0;
      }

      newState.selectedIndex = selectedIndex;
    }

    return newState;
  };

  var _proto = Tabs.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        defaultIndex = _this$props.defaultIndex,
        defaultFocus = _this$props.defaultFocus,
        props = Tabs_objectWithoutPropertiesLoose(_this$props, ["children", "defaultIndex", "defaultFocus"]);

    var _this$state = this.state,
        focus = _this$state.focus,
        selectedIndex = _this$state.selectedIndex;
    props.focus = focus;
    props.onSelect = this.handleSelected;

    if (selectedIndex != null) {
      props.selectedIndex = selectedIndex;
    }

    return react_default.a.createElement(UncontrolledTabs_UncontrolledTabs, props, children);
  };

  return Tabs;
}(react["Component"]);

Tabs_Tabs.defaultProps = {
  defaultFocus: false,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null
};

Tabs_Tabs.propTypes =  false ? undefined : {};
Tabs_Tabs.tabsRole = 'Tabs';
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/components/TabList.js
function TabList_extends() {
  TabList_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return TabList_extends.apply(this, arguments);
}

function TabList_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function TabList_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}





var TabList_TabList =
/*#__PURE__*/
function (_Component) {
  TabList_inheritsLoose(TabList, _Component);

  function TabList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TabList.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        attributes = TabList_objectWithoutPropertiesLoose(_this$props, ["children", "className"]);

    return react_default.a.createElement("ul", TabList_extends({}, attributes, {
      className: classnames_default()(className),
      role: "tablist"
    }), children);
  };

  return TabList;
}(react["Component"]);

TabList_TabList.defaultProps = {
  className: 'react-tabs__tab-list'
};

TabList_TabList.propTypes =  false ? undefined : {};
TabList_TabList.tabsRole = 'TabList';
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/components/Tab.js
function Tab_extends() {
  Tab_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return Tab_extends.apply(this, arguments);
}

function Tab_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function Tab_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}




var DEFAULT_CLASS = 'react-tabs__tab';

var Tab_Tab =
/*#__PURE__*/
function (_Component) {
  Tab_inheritsLoose(Tab, _Component);

  function Tab() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.checkFocus();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.checkFocus();
  };

  _proto.checkFocus = function checkFocus() {
    var _this$props = this.props,
        selected = _this$props.selected,
        focus = _this$props.focus;

    if (selected && focus) {
      this.node.focus();
    }
  };

  _proto.render = function render() {
    var _cx,
        _this = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        disabled = _this$props2.disabled,
        disabledClassName = _this$props2.disabledClassName,
        focus = _this$props2.focus,
        id = _this$props2.id,
        panelId = _this$props2.panelId,
        selected = _this$props2.selected,
        selectedClassName = _this$props2.selectedClassName,
        tabIndex = _this$props2.tabIndex,
        tabRef = _this$props2.tabRef,
        attributes = Tab_objectWithoutPropertiesLoose(_this$props2, ["children", "className", "disabled", "disabledClassName", "focus", "id", "panelId", "selected", "selectedClassName", "tabIndex", "tabRef"]);

    return react_default.a.createElement("li", Tab_extends({}, attributes, {
      className: classnames_default()(className, (_cx = {}, _cx[selectedClassName] = selected, _cx[disabledClassName] = disabled, _cx)),
      ref: function ref(node) {
        _this.node = node;
        if (tabRef) tabRef(node);
      },
      role: "tab",
      id: id,
      "aria-selected": selected ? 'true' : 'false',
      "aria-disabled": disabled ? 'true' : 'false',
      "aria-controls": panelId,
      tabIndex: tabIndex || (selected ? '0' : null)
    }), children);
  };

  return Tab;
}(react["Component"]);

Tab_Tab.defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: DEFAULT_CLASS + "--disabled",
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: DEFAULT_CLASS + "--selected"
};

Tab_Tab.propTypes =  false ? undefined : {};
Tab_Tab.tabsRole = 'Tab';
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/components/TabPanel.js
function TabPanel_extends() {
  TabPanel_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return TabPanel_extends.apply(this, arguments);
}

function TabPanel_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function TabPanel_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}




var TabPanel_DEFAULT_CLASS = 'react-tabs__tab-panel';

var TabPanel_TabPanel =
/*#__PURE__*/
function (_Component) {
  TabPanel_inheritsLoose(TabPanel, _Component);

  function TabPanel() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TabPanel.prototype;

  _proto.render = function render() {
    var _cx;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        forceRender = _this$props.forceRender,
        id = _this$props.id,
        selected = _this$props.selected,
        selectedClassName = _this$props.selectedClassName,
        tabId = _this$props.tabId,
        attributes = TabPanel_objectWithoutPropertiesLoose(_this$props, ["children", "className", "forceRender", "id", "selected", "selectedClassName", "tabId"]);

    return react_default.a.createElement("div", TabPanel_extends({}, attributes, {
      className: classnames_default()(className, (_cx = {}, _cx[selectedClassName] = selected, _cx)),
      role: "tabpanel",
      id: id,
      "aria-labelledby": tabId
    }), forceRender || selected ? children : null);
  };

  return TabPanel;
}(react["Component"]);

TabPanel_TabPanel.defaultProps = {
  className: TabPanel_DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: TabPanel_DEFAULT_CLASS + "--selected"
};

TabPanel_TabPanel.propTypes =  false ? undefined : {};
TabPanel_TabPanel.tabsRole = 'TabPanel';
// CONCATENATED MODULE: ./node_modules/react-tabs/esm/index.js





// EXTERNAL MODULE: ./src/components/notice.css
var notice = __webpack_require__(96);

// CONCATENATED MODULE: ./src/components/notice.js
function notice_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { notice_typeof = function _typeof(obj) { return typeof obj; }; } else { notice_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return notice_typeof(obj); }

function notice_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notice_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function notice_createClass(Constructor, protoProps, staticProps) { if (protoProps) notice_defineProperties(Constructor.prototype, protoProps); if (staticProps) notice_defineProperties(Constructor, staticProps); return Constructor; }

function notice_possibleConstructorReturn(self, call) { if (call && (notice_typeof(call) === "object" || typeof call === "function")) { return call; } return notice_assertThisInitialized(self); }

function notice_getPrototypeOf(o) { notice_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return notice_getPrototypeOf(o); }

function notice_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function notice_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) notice_setPrototypeOf(subClass, superClass); }

function notice_setPrototypeOf(o, p) { notice_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return notice_setPrototypeOf(o, p); }

function notice_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var notice_Notice =
/*#__PURE__*/
function (_React$Component) {
  notice_inherits(Notice, _React$Component);

  function Notice() {
    var _this;

    notice_classCallCheck(this, Notice);

    _this = notice_possibleConstructorReturn(this, notice_getPrototypeOf(Notice).call(this));

    notice_defineProperty(notice_assertThisInitialized(_this), "positionNotice", function () {
      var winWidth = window.innerWidth;
      _this.notice.style.top = 60 + 'px';
      _this.notice.style.left = winWidth / 2 - _this.notice.offsetWidth / 2 + 'px';
    });

    _this.state = {
      message: ''
    };
    return _this;
  }

  notice_createClass(Notice, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (prevProps.message !== this.props.message && this.props.message !== '') {
        this.setState({
          message: this.props.message
        }, function () {
          _this2.positionNotice();

          _this2.notice.classList.add('notice--visible');
        });
        setTimeout(function () {
          _this2.notice.classList.remove('notice--visible');

          setTimeout(function () {
            _this2.setState({
              message: ''
            });

            _this2.props.onClear();
          }, 2000);
        }, 3000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react_default.a.createElement("div", {
        className: "notice",
        ref: function ref(notice) {
          return _this3.notice = notice;
        }
      }, this.state.message);
    }
  }]);

  return Notice;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/components/patreon-panel.css
var patreon_panel = __webpack_require__(98);

// CONCATENATED MODULE: ./src/components/patreon-panel.js
function patreon_panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { patreon_panel_typeof = function _typeof(obj) { return typeof obj; }; } else { patreon_panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return patreon_panel_typeof(obj); }

function patreon_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function patreon_panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function patreon_panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) patreon_panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) patreon_panel_defineProperties(Constructor, staticProps); return Constructor; }

function patreon_panel_possibleConstructorReturn(self, call) { if (call && (patreon_panel_typeof(call) === "object" || typeof call === "function")) { return call; } return patreon_panel_assertThisInitialized(self); }

function patreon_panel_getPrototypeOf(o) { patreon_panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return patreon_panel_getPrototypeOf(o); }

function patreon_panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function patreon_panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) patreon_panel_setPrototypeOf(subClass, superClass); }

function patreon_panel_setPrototypeOf(o, p) { patreon_panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return patreon_panel_setPrototypeOf(o, p); }

function patreon_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var PATREON_URL = 'https://www.patreon.com/join/streamachievements?';

var patreon_panel_PatreonPanel =
/*#__PURE__*/
function (_React$Component) {
  patreon_panel_inherits(PatreonPanel, _React$Component);

  function PatreonPanel(props) {
    var _this;

    patreon_panel_classCallCheck(this, PatreonPanel);

    _this = patreon_panel_possibleConstructorReturn(this, patreon_panel_getPrototypeOf(PatreonPanel).call(this, props));

    patreon_panel_defineProperty(patreon_panel_assertThisInitialized(_this), "becomeGold", function () {
      var win = window.open(PATREON_URL, '_blank');
      win.focus();
    });

    patreon_panel_defineProperty(patreon_panel_assertThisInitialized(_this), "becomeSilver", function () {
      var win = window.open(PATREON_URL, '_blank');
      win.focus();
    });

    patreon_panel_defineProperty(patreon_panel_assertThisInitialized(_this), "handleFollow", function () {//API call to follow on Patreon
    });

    patreon_panel_defineProperty(patreon_panel_assertThisInitialized(_this), "handleSync", function () {
      axios_default.a.post('http://api.streamachievements.com/auth/patreon/sync').then(function (res) {
        _this.props.dispatch(syncPatreon(res.data));
      });
    });

    _this.state = {
      loading: _this.props.patreon === undefined ? true : false
    };
    return _this;
  }

  patreon_panel_createClass(PatreonPanel, [{
    key: "shouldDidUpdate",
    value: function shouldDidUpdate(prevProps, prevState) {
      console.log('shouldComponentUpdate');
      console.log(prevProps.patreon);
      console.log(this.props.patreon);

      if (prevProps.patreon === undefined && this.props.patreon !== undefined) {
        this.setState({
          loading: false
        });
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.state.loading);
      console.log(this.props.patreon);

      if (this.state.loading && this.props.patreon === undefined) {
        return null;
      }

      var patreonContent;

      if (this.props.patreon === false) {
        //Data retrieved, not connected
        patreonContent = react_default.a.createElement("div", {
          className: "integration integration--patreon not-linked"
        }, react_default.a.createElement("a", {
          className: "patreonLink",
          href: "http://api.streamachievements.com/auth/patreon"
        }, react_default.a.createElement("img", {
          alt: "",
          src: __webpack_require__(100)
        }), react_default.a.createElement("span", null, "Link Your Patreon")));
      } else {
        var _this$props$patreon = this.props.patreon,
            thumb_url = _this$props$patreon.thumb_url,
            vanity = _this$props$patreon.vanity,
            follower = _this$props$patreon.follower,
            status = _this$props$patreon.status,
            gold = _this$props$patreon.gold;
        var vanityContent, headerContent, bodyContent, banner;
        var goldFeatures = react_default.a.createElement("div", {
          className: "patreon--features"
        }, react_default.a.createElement("div", null, "Chat-Triggered Achievements"), react_default.a.createElement("div", null, "Custom Achievement Icons"), react_default.a.createElement("div", null, "Icon Gallery"), react_default.a.createElement("div", null, "Secret Achievements"), react_default.a.createElement("div", null, "Channel Themes"), react_default.a.createElement("div", null, "Gold-Level Discord Role"), react_default.a.createElement("div", null, "Sneak Peaks"));

        if (vanity) {
          vanityContent = react_default.a.createElement("div", {
            className: "patreon--vanity"
          }, vanityContent);
        }

        if (!follower) {
          banner = react_default.a.createElement("div", {
            className: "patreon--banner"
          }, react_default.a.createElement("div", null, "Following the Patreon to get the latest updates!"), react_default.a.createElement("button", {
            className: "follow-button",
            onClick: this.handleFollow
          }, "Follow"));
        }

        if (status === null || status === 'former_patron') {
          var feedback;

          if (status === 'former_patron') {
            feedback = react_default.a.createElement("div", {
              className: "feedback"
            }, "Thank you so much for the support you showed in the past! If there is anything we could do to improve the system, feel free to ", react_default.a.createElement("a", {
              href: "mailto:streamachievements.official@gmail.com"
            }, "let us know"), "!");
          }

          bodyContent = react_default.a.createElement("div", null, feedback, react_default.a.createElement("div", {
            className: "patreon--content"
          }, react_default.a.createElement("div", {
            className: "support"
          }, react_default.a.createElement("div", null, "Love having achievements from your favorite streamers and want to help support keeping this service running? Consider becoming a Patron!"), react_default.a.createElement("img", {
            src: __webpack_require__(101)
          }), react_default.a.createElement("button", {
            onClick: this.becomeSilver,
            type: "button"
          }, "Become a Supporter")), react_default.a.createElement("div", {
            className: "upgrade"
          }, react_default.a.createElement("div", null, "Are you enjoying offering achievements to your community, and want to extend the capibilities even further? Enable all of the features by becoming a ", react_default.a.createElement("span", {
            className: "gold"
          }, "Gold Achievement"), "!"), react_default.a.createElement("img", {
            src: __webpack_require__(102)
          }), react_default.a.createElement("button", {
            onClick: this.becomeGold,
            type: "button"
          }, "Upgrade to Gold"))));
        } else if (status === 'active_patron') {
          if (gold) {
            bodyContent = react_default.a.createElement("div", {
              className: "patreon--content column-layout"
            }, react_default.a.createElement("h3", null, "You are currently a ", react_default.a.createElement("span", null, "Gold Achievement"), "!"), react_default.a.createElement("p", null, "Thank you so much for support Stream Achievements! With your generous support, we are able to keep this site running, and providing you a way to truly engage your communty members!"), react_default.a.createElement("p", null, "With this level of support, you have enabled the full potential that Stream Achievements has to offer! Take a look below at the features you have, and adjust your achievements to take advantage of the full suite!"), react_default.a.createElement("h4", null, "List of Features"), goldFeatures);
          } else {
            var owner;

            if (this.props.profile && this.props.profile.status === 'verified') {
              owner = react_default.a.createElement("div", {
                className: "upgrade"
              }, react_default.a.createElement("div", null, "Are you enjoying the features you are providing, but wanting to hook up more for your community? Consider trying out the Gold Achievement tier!"), react_default.a.createElement("h4", null, "List of Gold Achievement Features"), goldFeatures, react_default.a.createElement("button", {
                onClick: this.becomeGold,
                type: "button"
              }, "Upgrade to Gold"));
            }

            bodyContent = react_default.a.createElement("div", {
              className: "patreon--content column-layout"
            }, react_default.a.createElement("h3", null, "You are currently a ", react_default.a.createElement("span", null, "Silver Achievement"), "!"), react_default.a.createElement("p", null, "Thank you so much for support Stream Achievements! With your generous support, we are able to keep this site running, and providing you a way to truly engage your communty members!"), owner);
          }
        }

        patreonContent = react_default.a.createElement("div", {
          className: "integration integration--patreon"
        }, react_default.a.createElement("div", {
          className: "integration-header"
        }, react_default.a.createElement("img", {
          alt: "",
          src: __webpack_require__(103)
        }), react_default.a.createElement("h3", null, "Patreon"), react_default.a.createElement("div", {
          className: "integration-sync"
        }, react_default.a.createElement("a", {
          href: "javascript:;",
          onClick: this.handleSync
        }, react_default.a.createElement("img", {
          alt: "",
          src: __webpack_require__(43)
        })))), react_default.a.createElement("div", {
          className: "integration-content"
        }, react_default.a.createElement("div", {
          className: "patreon--left"
        }, react_default.a.createElement("div", {
          className: "patreon--thumb"
        }, react_default.a.createElement("img", {
          alt: "Patreon User Thumbnail",
          src: thumb_url
        })), vanityContent), react_default.a.createElement("div", {
          className: "patreon--right"
        }, headerContent, bodyContent)));
      }

      return patreonContent;
    }
  }]);

  return PatreonPanel;
}(react_default.a.Component);

function patreon_panel_headerMapStateToProps(state) {
  console.log(state);
  return {
    profile: state.profile,
    patreon: state.patreon
  };
}

/* harmony default export */ var components_patreon_panel = (connector(patreon_panel_headerMapStateToProps)(patreon_panel_PatreonPanel));
// EXTERNAL MODULE: ./src/routes/profile-page.css
var profile_page = __webpack_require__(104);

// EXTERNAL MODULE: ./src/img/twitch-glitch.png
var twitch_glitch = __webpack_require__(19);
var twitch_glitch_default = /*#__PURE__*/__webpack_require__.n(twitch_glitch);

// CONCATENATED MODULE: ./src/routes/profile-page.js
function profile_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { profile_page_typeof = function _typeof(obj) { return typeof obj; }; } else { profile_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return profile_page_typeof(obj); }

function profile_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function profile_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function profile_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) profile_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) profile_page_defineProperties(Constructor, staticProps); return Constructor; }

function profile_page_possibleConstructorReturn(self, call) { if (call && (profile_page_typeof(call) === "object" || typeof call === "function")) { return call; } return profile_page_assertThisInitialized(self); }

function profile_page_getPrototypeOf(o) { profile_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return profile_page_getPrototypeOf(o); }

function profile_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function profile_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) profile_page_setPrototypeOf(subClass, superClass); }

function profile_page_setPrototypeOf(o, p) { profile_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return profile_page_setPrototypeOf(o, p); }

function profile_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var profile_page_ManageChannel =
/*#__PURE__*/
function (_React$Component) {
  profile_page_inherits(ManageChannel, _React$Component);

  function ManageChannel() {
    var _this;

    profile_page_classCallCheck(this, ManageChannel);

    _this = profile_page_possibleConstructorReturn(this, profile_page_getPrototypeOf(ManageChannel).call(this));

    profile_page_defineProperty(profile_page_assertThisInitialized(_this), "clearNotice", function () {
      _this.setState({
        notice: ''
      });
    });

    profile_page_defineProperty(profile_page_assertThisInitialized(_this), "filterList", function (event) {
      var updatedList = _this.state.channels;

      if (event.target.value === '') {
        //nothing in text box
        _this.setState({
          filteredChannels: false
        });
      } else {
        updatedList = updatedList.filter(function (channel) {
          return channel.owner.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });

        _this.setState({
          filteredChannels: updatedList
        });
      }
    });

    _this.state = {
      channel: '',
      achievements: '',
      notice: ''
    };
    return _this;
  }

  profile_page_createClass(ManageChannel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios_default.a.get('http://api.streamachievements.com/api/profile').then(function (res) {
        _this2.setState({
          channels: res.data
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var integrationContent, channelContent, patreonContent;

      if (this.state.channels && this.props.profile) {
        var _this$props$profile = this.props.profile,
            logo = _this$props$profile.logo,
            username = _this$props$profile.username;
        var channels = this.state.channels;

        if (Array.isArray(this.state.filteredChannels)) {
          channels = this.state.filteredChannels;
        }

        integrationContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
          className: "integration integration--twitch"
        }, react_default.a.createElement("div", {
          className: "integration-header"
        }, react_default.a.createElement("img", {
          alt: "",
          src: twitch_glitch_default.a
        }), react_default.a.createElement("h3", null, "Twitch"), react_default.a.createElement("div", {
          className: "integration-sync"
        }, react_default.a.createElement("a", {
          href: "javascript:;"
        }, react_default.a.createElement("img", {
          alt: "",
          src: __webpack_require__(43)
        })))), react_default.a.createElement("div", {
          className: "integration-content"
        }, react_default.a.createElement("div", {
          className: "channelInfo--logo"
        }, react_default.a.createElement("img", {
          alt: "",
          src: logo
        })), react_default.a.createElement("div", {
          className: "channelInfo--data"
        }, react_default.a.createElement("div", {
          className: "channelInfo--name"
        }, username), react_default.a.createElement("div", {
          className: "channelInfo--link"
        }, 'twitch.tv/' + username)))), react_default.a.createElement(components_patreon_panel, null));
        channelContent = react_default.a.createElement("div", {
          className: "profile--channels"
        }, react_default.a.createElement("div", {
          className: "achievementsHeader"
        }, react_default.a.createElement("h3", null, "Showing ", channels.length, " Channels"), react_default.a.createElement("div", {
          className: "achievement-search"
        }, react_default.a.createElement("input", {
          placeholder: "Search for channel...",
          type: "text",
          onChange: this.filterList
        }))), channels.map(function (channel, index) {
          return react_default.a.createElement("div", {
            key: "channel." + index,
            className: "channel-item"
          }, react_default.a.createElement("div", {
            className: "channel-item--logo"
          }, react_default.a.createElement("img", {
            alt: "",
            src: channel.logo
          })), react_default.a.createElement("div", {
            className: "channel-item--name"
          }, channel.owner));
        }));
      } else {
        integrationContent = react_default.a.createElement("div", null, "Fetching Integration...");
        channelContent = react_default.a.createElement("div", null, "Fetching Channels...");
      }

      return react_default.a.createElement(template_Template, null, react_default.a.createElement("div", {
        className: "manage-container"
      }, react_default.a.createElement("h2", null, "Profile"), react_default.a.createElement(notice_Notice, {
        message: this.state.notice,
        onClear: this.clearNotice
      }), react_default.a.createElement(Tabs_Tabs, null, react_default.a.createElement(TabList_TabList, {
        className: "manage-tabs"
      }, react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Integration"), react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Channels")), react_default.a.createElement(TabPanel_TabPanel, null, integrationContent), react_default.a.createElement(TabPanel_TabPanel, null, channelContent))));
    }
  }]);

  return ManageChannel;
}(react_default.a.Component);

function profile_page_headerMapStateToProps(state) {
  return {
    profile: state.profile
  };
}

/* harmony default export */ var routes_profile_page = (connector(profile_page_headerMapStateToProps)(profile_page_ManageChannel)); //export default ManageChannel;
// EXTERNAL MODULE: ./src/routes/landing.css
var landing = __webpack_require__(106);

// CONCATENATED MODULE: ./src/routes/landing-page.js
function landing_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { landing_page_typeof = function _typeof(obj) { return typeof obj; }; } else { landing_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return landing_page_typeof(obj); }

function landing_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function landing_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function landing_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) landing_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) landing_page_defineProperties(Constructor, staticProps); return Constructor; }

function landing_page_possibleConstructorReturn(self, call) { if (call && (landing_page_typeof(call) === "object" || typeof call === "function")) { return call; } return landing_page_assertThisInitialized(self); }

function landing_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function landing_page_getPrototypeOf(o) { landing_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return landing_page_getPrototypeOf(o); }

function landing_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) landing_page_setPrototypeOf(subClass, superClass); }

function landing_page_setPrototypeOf(o, p) { landing_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return landing_page_setPrototypeOf(o, p); }






var landing_page_LandingPage =
/*#__PURE__*/
function (_React$Component) {
  landing_page_inherits(LandingPage, _React$Component);

  function LandingPage() {
    var _this;

    landing_page_classCallCheck(this, LandingPage);

    _this = landing_page_possibleConstructorReturn(this, landing_page_getPrototypeOf(LandingPage).call(this));
    _this.state = {
      redirect: false
    };
    var cookies = cookie_default.a.parse(document.cookie);

    if (cookies.etid) {
      _this.state.redirect = true;
    }

    return _this;
  }

  landing_page_createClass(LandingPage, [{
    key: "render",
    value: function render() {
      var redirect;
      console.log(this.state);

      if (this.state.redirect) {
        var Redirect = __webpack_require__(10).Redirect;

        redirect = react_default.a.createElement(Redirect, {
          to: "/home"
        });
      }

      return react_default.a.createElement("div", {
        className: "landing-page"
      }, redirect, react_default.a.createElement("div", {
        className: "section-wrapper main"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("img", {
        className: "logo",
        src: __webpack_require__(40)
      }), react_default.a.createElement("a", {
        href: "http://api.streamachievements.com/auth/twitch",
        className: "login-button twitch-login-button"
      }, react_default.a.createElement("span", {
        className: "login-button-icon"
      }, react_default.a.createElement("img", {
        alt: "",
        src: __webpack_require__(19)
      })), react_default.a.createElement("span", {
        className: "login-button-text"
      }, "Login using Twitch")))), react_default.a.createElement("div", {
        className: "section-wrapper section-wrapper--full"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("h2", null, "What is StreamAchievements?"), react_default.a.createElement("p", null, "Stream Achievements is a fun and interactive platform to add that extra flair to a streaming channel's community through the power of achievements!"), react_default.a.createElement("p", null, "With this system, a streamer will be able to create various achievements for their community to earn while interacting with stream!"), react_default.a.createElement("p", null, "This isn't just for streamers though! For someone who just watches streams, you will be able to keep track of all the achievements you have earned from your favorite streamers!"), react_default.a.createElement("iframe", {
        width: "560",
        height: "315",
        src: "https://www.youtube.com/watch?v=PS5k6bIW8q4",
        frameborder: "0",
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true
      }))), react_default.a.createElement("div", {
        className: "section-wrapper section-wrapper--alt"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("h2", null, "Easy To Use"), react_default.a.createElement("p", null, "Getting your channel stood up is quick and easy, thanks to integration with the support streaming platform!"), react_default.a.createElement("p", null, "You'll be ready to get your fans engaged in no time!"))), react_default.a.createElement("div", {
        className: "section-wrapper"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("div", {
        className: "section-gfx"
      }, react_default.a.createElement("img", {
        src: "https://res.cloudinary.com/phirehero/image/upload/v1559919160/achievements.png"
      })), react_default.a.createElement("div", {
        className: "section-info"
      }, react_default.a.createElement("h2", null, "Seamless Achievement Creation"), react_default.a.createElement("p", null, "Creating your first achievements is quick and painless, with helpful tips to guide you along the way!"), react_default.a.createElement("p", null, "You are also able to see your achievement come to life as you are creating it!")))), react_default.a.createElement("div", {
        className: "section-wrapper section-wrapper--alt"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("h2", null, "Custom Achievements"), react_default.a.createElement("div", null, react_default.a.createElement("p", null, "The sky is the limits!"), react_default.a.createElement("p", null, "Award achievements for numerous activities, such as following, subbing, hosting, raiding, etc.!"), react_default.a.createElement("p", null, "Create custom achievements for those quirks that make your stream awesome!")))), react_default.a.createElement("div", {
        className: "section-wrapper section-wrapper--full"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("h2", null, "We are still growing!"), react_default.a.createElement("p", null, "At launch, we wanted to provide a ton of exciting features for both the streamer and community alike, but know that this isn't all there is!"), react_default.a.createElement("p", null, "As we press forward, more and more features will be released into StreamAchievements to add even more fun & engagement!"))), react_default.a.createElement("div", {
        className: "section-wrapper section-wrapper--login"
      }, react_default.a.createElement("div", {
        className: "section-content"
      }, react_default.a.createElement("p", null, "What are you waiting for? Get started with your channel today, or use our tools to help spread the word to your favorite streamers to create achievements today!"), react_default.a.createElement("a", {
        href: "http://api.streamachievements.com/auth/twitch",
        className: "login-button twitch-login-button"
      }, react_default.a.createElement("span", {
        className: "login-button-icon"
      }, react_default.a.createElement("img", {
        alt: "",
        src: __webpack_require__(19)
      })), react_default.a.createElement("span", {
        className: "login-button-text"
      }, "Login using Twitch")))), react_default.a.createElement(footer_Footer, null));
    }
  }]);

  return LandingPage;
}(react_default.a.Component);


// EXTERNAL MODULE: ./node_modules/lodash/throttle.js
var throttle = __webpack_require__(29);
var throttle_default = /*#__PURE__*/__webpack_require__.n(throttle);

// EXTERNAL MODULE: ./src/components/achievement.css
var components_achievement = __webpack_require__(117);

// CONCATENATED MODULE: ./src/components/achievement.js
function achievement_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { achievement_typeof = function _typeof(obj) { return typeof obj; }; } else { achievement_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return achievement_typeof(obj); }

function achievement_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function achievement_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function achievement_createClass(Constructor, protoProps, staticProps) { if (protoProps) achievement_defineProperties(Constructor.prototype, protoProps); if (staticProps) achievement_defineProperties(Constructor, staticProps); return Constructor; }

function achievement_possibleConstructorReturn(self, call) { if (call && (achievement_typeof(call) === "object" || typeof call === "function")) { return call; } return achievement_assertThisInitialized(self); }

function achievement_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function achievement_getPrototypeOf(o) { achievement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return achievement_getPrototypeOf(o); }

function achievement_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) achievement_setPrototypeOf(subClass, superClass); }

function achievement_setPrototypeOf(o, p) { achievement_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return achievement_setPrototypeOf(o, p); }




var achievement_Achievement =
/*#__PURE__*/
function (_React$Component) {
  achievement_inherits(Achievement, _React$Component);

  function Achievement() {
    achievement_classCallCheck(this, Achievement);

    return achievement_possibleConstructorReturn(this, achievement_getPrototypeOf(Achievement).apply(this, arguments));
  }

  achievement_createClass(Achievement, [{
    key: "render",
    value: function render() {
      var _this = this;

      var keyProp, editIcon, giftIcon, title, description, earnDate;
      var _this$props = this.props,
          earned = _this$props.earned,
          className = _this$props.className,
          defaultIcons = _this$props.defaultIcons;
      var _this$props$achieveme = this.props.achievement,
          secret = _this$props$achieveme.secret,
          limited = _this$props$achieveme.limited;
      title = this.props.achievement.title;
      description = this.props.achievement.description;
      var achievementClass = "achievement";
      var icon = 'https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png';

      if (this.props.editable) {
        icon = this.props.achievement.icon || null;
      } else {
        icon = this.props.achievement.icon || defaultIcons.default;
      }

      if (earned || this.props.editable) {
        achievementClass += " achievement--earned";
      } else if (secret) {
        title = "????";
        description = "????????????";
        icon = defaultIcons.hidden;
      }

      if (this.props.editable) {
        giftIcon = react_default.a.createElement("div", {
          title: "Awarding achievement manually!",
          className: "achievement--gift",
          onClick: function onClick() {
            _this.props.onGift(_this.props.achievement.uid);
          }
        }, react_default.a.createElement("img", {
          src: __webpack_require__(119)
        }));
        editIcon = react_default.a.createElement("div", {
          className: "achievement--edit",
          onClick: function onClick() {
            _this.props.onClick(_this.props.achievement);
          }
        }, react_default.a.createElement("img", {
          src: "https://res.cloudinary.com/phirehero/image/upload/v1552697627/edit-icon-png-24.png"
        }));
      }

      if (className) {
        achievementClass += " " + className;
      }

      var logo;

      if (icon) {
        logo = react_default.a.createElement("div", {
          className: "achievement-logo"
        }, react_default.a.createElement("img", {
          src: icon
        }));
      }

      if (earned && earned !== true) {
        earnDate = react_default.a.createElement("div", {
          className: "achievement--earnDate"
        }, new Date(earned).toLocaleDateString());
      }

      return react_default.a.createElement("div", {
        className: achievementClass
      }, logo, react_default.a.createElement("div", {
        className: "achievement-info"
      }, react_default.a.createElement("div", {
        className: "achievement-title"
      }, title), react_default.a.createElement("div", {
        className: "achievement-description"
      }, description)), giftIcon, editIcon, earnDate);
    }
  }]);

  return Achievement;
}(react_default.a.Component);

/* harmony default export */ var src_components_achievement = (achievement_Achievement);
// EXTERNAL MODULE: ./src/routes/channel-page.css
var channel_page = __webpack_require__(120);

// CONCATENATED MODULE: ./src/routes/channel-page.js
function channel_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { channel_page_typeof = function _typeof(obj) { return typeof obj; }; } else { channel_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return channel_page_typeof(obj); }

function channel_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function channel_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function channel_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) channel_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) channel_page_defineProperties(Constructor, staticProps); return Constructor; }

function channel_page_possibleConstructorReturn(self, call) { if (call && (channel_page_typeof(call) === "object" || typeof call === "function")) { return call; } return channel_page_assertThisInitialized(self); }

function channel_page_getPrototypeOf(o) { channel_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return channel_page_getPrototypeOf(o); }

function channel_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function channel_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) channel_page_setPrototypeOf(subClass, superClass); }

function channel_page_setPrototypeOf(o, p) { channel_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return channel_page_setPrototypeOf(o, p); }

function channel_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var channel_page_ChannelPage =
/*#__PURE__*/
function (_React$Component) {
  channel_page_inherits(ChannelPage, _React$Component);

  function ChannelPage(props) {
    var _this;

    channel_page_classCallCheck(this, ChannelPage);

    _this = channel_page_possibleConstructorReturn(this, channel_page_getPrototypeOf(ChannelPage).call(this, props));

    channel_page_defineProperty(channel_page_assertThisInitialized(_this), "clearNotice", function () {
      _this.setState({
        notice: ''
      });
    });

    channel_page_defineProperty(channel_page_assertThisInitialized(_this), "updateChannelHeader", function () {
      if (document.documentElement.scrollHeight > 1060 && (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130)) {
        _this._channelHeader.classList.add('condensed');
      } else {
        _this._channelHeader.classList.remove('condensed');
      }
    });

    channel_page_defineProperty(channel_page_assertThisInitialized(_this), "updateChannelSize", function () {
      if (window.innerWidth <= 480 && !_this.state.small) {
        _this.setState({
          small: true
        });
      } else if (window.innerWidth > 480 && _this.state.small) {
        _this.setState({
          small: false
        });
      }
    });

    channel_page_defineProperty(channel_page_assertThisInitialized(_this), "joinChannel", function () {
      axios_default.a.post('http://api.streamachievements.com/api/channel/join', {
        channel: _this.state.channel.owner
      }).then(function (res) {
        _this.setState({
          joined: true,
          notice: "Joined channel successfully!"
        });
      });
    });

    channel_page_defineProperty(channel_page_assertThisInitialized(_this), "leaveChannel", function () {
      axios_default.a.post('http://api.streamachievements.com/api/channel/leave', {
        channel: _this.state.channel.owner
      }).then(function (res) {
        console.log(res.data);

        if (res.data.leave) {
          _this.props.history.push('/home');
        }
      });
    });

    _this.state = {
      channel: '',
      notice: '',
      loading: true,
      small: false,
      progress: true
    };
    return _this;
  }

  channel_page_createClass(ChannelPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //Fetch channel data 
      var authAxios = axios_default.a.create({
        withCredentials: true
      });
      authAxios.get('http://api.streamachievements.com/api/channel/retrieve?id=' + this.props.match.params.channelid).then(function (res) {
        console.log(res.data.achievements);

        _this2.setState({
          channel: res.data.channel,
          achievements: res.data.achievements,
          joined: res.data.joined,
          loading: false
        }, function () {
          _this2.updateChannelHeader();

          _this2.updateChannelSize();

          _this2._updateChannelHeader = throttle_default()(_this2.updateChannelHeader, 200);
          _this2._updateChannelSize = throttle_default()(_this2.updateChannelSize, 200);
          window.addEventListener('scroll', _this2._updateChannelHeader);
          window.addEventListener('resize', _this2._updateChannelSize);
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('unmounting...');
      window.removeEventListener('scroll', this._updateChannelHeader);
      window.removeEventListener('resize', this._updateChannelSize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var content;

      if (this.state.channel) {
        var _this$state$channel = this.state.channel,
            owner = _this$state$channel.owner,
            logo = _this$state$channel.logo;
        var achievements = this.state.achievements;
        var membershipContent, achievementProgress, achievementsContent, favorite;

        if (this.state.joined) {
          // membershipContent = <a href="javascript:;" onClick={this.leaveChannel} className="leave">Leave Channel</a>
          membershipContent = null;
          document.body.classList.remove('no-scroll');
        } else {
          membershipContent = react_default.a.createElement("a", {
            href: "javascript:;",
            onClick: this.joinChannel,
            className: "join"
          }, "Join Channel");
          document.body.classList.add('no-scroll');
        }

        if (achievements.length > 0) {
          var userAchievements = this.state.achievements.earned;
          achievementsContent = react_default.a.createElement("div", {
            className: "achievements-container"
          }, achievements.map(function (achievement, index) {
            var classes;
            var earned = achievement.earned;

            if (index >= 3 && !_this3.state.joined) {
              classes = "achievement-blurred";
            }

            return react_default.a.createElement(src_components_achievement, {
              key: 'achievement-' + index,
              earned: earned,
              achievement: achievement,
              className: classes,
              defaultIcons: _this3.state.channel.icons
            });
          }));

          if (this.state.joined) {
            var _achievements = this.state.achievements;
            var percentage = Math.floor(_achievements.filter(function (achievement) {
              return achievement.earned;
            }).length / _achievements.length * 100);
            var progressClasses = 'channel-progress';

            if (this.state.progress) {
              progressClasses += ' channel-progress--visible';
            }

            achievementProgress = react_default.a.createElement("div", {
              className: progressClasses
            }, react_default.a.createElement("div", {
              className: "channel-achievement-progress"
            }, react_default.a.createElement("div", {
              className: "progress-bar--label"
            }, "Achievement Progress"), react_default.a.createElement("div", {
              className: "progress-bar--visual"
            }, react_default.a.createElement("div", {
              className: "progress-bar-wrapper"
            }, react_default.a.createElement("div", {
              className: "progress-bar",
              style: {
                width: percentage + "%"
              }
            })), react_default.a.createElement("div", {
              className: "progress-percentage"
            }, percentage, "%")))); //TODO: Future Perk
            //favorite = (<div className="channel-fav"><img src={require('../img/star-not-favorited.png')} /></div>);
            //favorite = (<div className="channel-fav"></div>);
          }
        } else {
          achievementsContent = react_default.a.createElement("div", {
            className: "no-achievements"
          }, react_default.a.createElement("p", null, owner, " has yet to make any achievements available!"), react_default.a.createElement("p", null, "Check back soon!"));
        }

        var wrapperClasses = 'channel-page';

        if (this.state.small) {
          wrapperClasses += ' channel-page--sm';
        }

        content = react_default.a.createElement(template_Template, {
          className: "no-scroll",
          spinner: {
            isLoading: this.state.loading,
            fullscreen: true
          }
        }, react_default.a.createElement("div", {
          className: wrapperClasses
        }, react_default.a.createElement(notice_Notice, {
          message: this.state.notice,
          onClear: this.clearNotice
        }), react_default.a.createElement("div", {
          id: "channel-header",
          ref: function ref(el) {
            return _this3._channelHeader = el;
          }
        }, favorite, react_default.a.createElement("div", {
          className: "channel-logo"
        }, react_default.a.createElement("img", {
          src: logo
        })), react_default.a.createElement("div", {
          className: "channel-info"
        }, react_default.a.createElement("div", {
          className: "channel-name"
        }, react_default.a.createElement("span", null, owner), react_default.a.createElement("a", {
          title: 'Go to ' + owner + '\'s channel on Twitch!',
          href: "https://twitch.tv/" + owner,
          target: "_blank"
        }, react_default.a.createElement("img", {
          src: "https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png"
        })), react_default.a.createElement(Link["a" /* default */], {
          to: "/channel/" + owner + "/rankings",
          title: 'View rankings for ' + owner + '\'s channel'
        }, react_default.a.createElement("img", {
          className: "ranking",
          src: "https://res.cloudinary.com/phirehero/image/upload/v1559928373/ranking-icon.png"
        }))), react_default.a.createElement("div", {
          className: "channel-description"
        })), this.state.small ? null : achievementProgress, react_default.a.createElement("div", {
          className: "channel-buttons"
        }, membershipContent)), this.state.small ? achievementProgress : null, achievementsContent));
      } else {
        content = react_default.a.createElement(template_Template, {
          spinner: {
            isLoading: this.state.loading,
            fullscreen: true
          }
        }, "Loading channel information...");
      }

      return content;
    }
  }]);

  return ChannelPage;
}(react_default.a.Component);

function channel_page_headerMapStateToProps(state) {
  return {
    profile: state.profile
  };
}

/* harmony default export */ var routes_channel_page = (connector(channel_page_headerMapStateToProps)(channel_page_ChannelPage));
// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(51);
var query_string_default = /*#__PURE__*/__webpack_require__.n(query_string);

// EXTERNAL MODULE: ./src/routes/verify-page.css
var verify_page = __webpack_require__(125);

// CONCATENATED MODULE: ./src/routes/verify-page.js
function verify_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { verify_page_typeof = function _typeof(obj) { return typeof obj; }; } else { verify_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return verify_page_typeof(obj); }

function verify_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function verify_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function verify_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) verify_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) verify_page_defineProperties(Constructor, staticProps); return Constructor; }

function verify_page_possibleConstructorReturn(self, call) { if (call && (verify_page_typeof(call) === "object" || typeof call === "function")) { return call; } return verify_page_assertThisInitialized(self); }

function verify_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function verify_page_getPrototypeOf(o) { verify_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return verify_page_getPrototypeOf(o); }

function verify_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) verify_page_setPrototypeOf(subClass, superClass); }

function verify_page_setPrototypeOf(o, p) { verify_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return verify_page_setPrototypeOf(o, p); }








var verify_page_VerifyPage =
/*#__PURE__*/
function (_React$Component) {
  verify_page_inherits(VerifyPage, _React$Component);

  function VerifyPage() {
    var _this;

    verify_page_classCallCheck(this, VerifyPage);

    _this = verify_page_possibleConstructorReturn(this, verify_page_getPrototypeOf(VerifyPage).call(this));
    _this.state = {
      expired: false,
      verified: false,
      fetch: true
    };
    return _this;
  }

  verify_page_createClass(VerifyPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var queries = query_string_default.a.parse(this.props.location.search);

      if (queries.id && queries['utm_medium'] === 'Email' && fetch) {
        axios_default.a.post('http://api.streamachievements.com/api/channel/verify', {
          id: queries.id
        }).then(function (res) {
          if (res.data.expired) {
            _this2.setState({
              expired: true,
              verified: false,
              fetch: false
            });
          } else if (res.data.verified) {
            _this2.setState({
              verified: true,
              expired: false,
              fetch: false
            });
          } else {
            _this2.setState({
              fetch: false
            });
          }
        });
      } else {
        this.props.history.push('/home');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content;

      if (this.state.expired) {
        content = react_default.a.createElement("div", {
          class: "verify-wrapper"
        }, react_default.a.createElement("h2", null, "Whoops! Looks like your link expired!!"), react_default.a.createElement("p", null, "Do not fear, just make your way back over to ", react_default.a.createElement(Link["a" /* default */], {
          to: "/channel/create"
        }, "Start A Channel"), " that way we can get another invite sent out for you!"), react_default.a.createElement("p", null, "Just remember, invites expire after 72 hours, so don't forget to check that email!"));
      } else if (this.state.verified) {
        content = react_default.a.createElement("div", {
          class: "verify-wrapper"
        }, react_default.a.createElement("h2", null, "Success!! You have been verified!"), react_default.a.createElement("p", null, "You are now ready to start creating those achievmenets for your community to earn!"), react_default.a.createElement("p", null, "Let your community know that you now offer achievements! Click the 'Share on Twitter' button below to inform the masses!"), react_default.a.createElement("p", null, react_default.a.createElement("a", {
          href: "https://ctt.ac/eLcfl",
          target: "_blank"
        }, "Click")));
      }

      return react_default.a.createElement(template_Template, {
        spinner: {
          isLoading: this.state.fetch,
          fullscreen: true
        }
      }, content);
    }
  }]);

  return VerifyPage;
}(react_default.a.Component);

/* harmony default export */ var routes_verify_page = (verify_page_VerifyPage);
// CONCATENATED MODULE: ./src/routes/support-page.js
function support_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { support_page_typeof = function _typeof(obj) { return typeof obj; }; } else { support_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return support_page_typeof(obj); }

function support_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function support_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function support_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) support_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) support_page_defineProperties(Constructor, staticProps); return Constructor; }

function support_page_possibleConstructorReturn(self, call) { if (call && (support_page_typeof(call) === "object" || typeof call === "function")) { return call; } return support_page_assertThisInitialized(self); }

function support_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function support_page_getPrototypeOf(o) { support_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return support_page_getPrototypeOf(o); }

function support_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) support_page_setPrototypeOf(subClass, superClass); }

function support_page_setPrototypeOf(o, p) { support_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return support_page_setPrototypeOf(o, p); }





var support_page_SupportPage =
/*#__PURE__*/
function (_React$Component) {
  support_page_inherits(SupportPage, _React$Component);

  function SupportPage(props) {
    support_page_classCallCheck(this, SupportPage);

    return support_page_possibleConstructorReturn(this, support_page_getPrototypeOf(SupportPage).call(this, props));
  }

  support_page_createClass(SupportPage, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement(template_Template, null, "Support");
    }
  }]);

  return SupportPage;
}(react_default.a.Component);

function support_page_headerMapStateToProps(state) {
  return {
    profile: state.profile,
    patreon: state.patreon
  };
}

/* harmony default export */ var support_page = (connector(support_page_headerMapStateToProps)(support_page_SupportPage));
// EXTERNAL MODULE: ./node_modules/react-router/es/Redirect.js
var es_Redirect = __webpack_require__(49);

// EXTERNAL MODULE: ./src/components/modal.css
var components_modal = __webpack_require__(127);

// EXTERNAL MODULE: ./src/components/gift-achievement.css
var gift_achievement = __webpack_require__(129);

// CONCATENATED MODULE: ./src/components/gift-achievement.js
function gift_achievement_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { gift_achievement_typeof = function _typeof(obj) { return typeof obj; }; } else { gift_achievement_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return gift_achievement_typeof(obj); }

function gift_achievement_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function gift_achievement_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function gift_achievement_createClass(Constructor, protoProps, staticProps) { if (protoProps) gift_achievement_defineProperties(Constructor.prototype, protoProps); if (staticProps) gift_achievement_defineProperties(Constructor, staticProps); return Constructor; }

function gift_achievement_possibleConstructorReturn(self, call) { if (call && (gift_achievement_typeof(call) === "object" || typeof call === "function")) { return call; } return gift_achievement_assertThisInitialized(self); }

function gift_achievement_getPrototypeOf(o) { gift_achievement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return gift_achievement_getPrototypeOf(o); }

function gift_achievement_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function gift_achievement_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) gift_achievement_setPrototypeOf(subClass, superClass); }

function gift_achievement_setPrototypeOf(o, p) { gift_achievement_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return gift_achievement_setPrototypeOf(o, p); }

function gift_achievement_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var gift_achievement_GiftAchievementModal =
/*#__PURE__*/
function (_React$Component) {
  gift_achievement_inherits(GiftAchievementModal, _React$Component);

  function GiftAchievementModal(props) {
    var _this;

    gift_achievement_classCallCheck(this, GiftAchievementModal);

    _this = gift_achievement_possibleConstructorReturn(this, gift_achievement_getPrototypeOf(GiftAchievementModal).call(this, props));

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "positionModal", function () {
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      var scrollTop = document.documentElement.scrollTop;
      _this.giftModal.style.top = winHeight / 2 - _this.giftModal.offsetHeight + scrollTop + 'px';
      _this.giftModal.style.left = winWidth / 2 - _this.giftModal.offsetWidth / 2 + 'px';
    });

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "filterList", function (event) {
      var updatedList = _this.state.members;

      if (event.target.value === '') {
        //nothing in text box
        _this.setState({
          filteredMembers: false
        });
      } else {
        updatedList = updatedList.filter(function (member) {
          return member.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });

        _this.setState({
          filteredMembers: updatedList
        });
      }
    });

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "onChange", function (event) {
      _this.props.onChange(event).then(function (res) {
        if (res.error) {
          console.log(res.error);
        }
      });
    });

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "toggleMember", function (member, event, fromChild) {
      var members = _this.state.members;
      var memberIdx = members.map(function (member) {
        return member.name;
      }).indexOf(member.name);

      if (members[memberIdx].selected) {
        delete members[memberIdx].selected;
      } else {
        members[memberIdx].selected = true;
      }

      _this.setState({
        members: members
      });
    });

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "buildMemberList", function (members, className) {
      if (Array.isArray(members) && members.length > 0) {
        return react_default.a.createElement("div", {
          className: className
        }, members.map(function (member, index) {
          return react_default.a.createElement("button", {
            type: "button",
            key: 'member-' + index,
            className: "channelMember" + (index % 2 === 1 ? " channelMember--stripe" : "") + (member.selected ? " channelMember--selected" : ""),
            onClick: function onClick(event) {
              _this.toggleMember(member, event);
            }
          }, react_default.a.createElement("div", {
            className: "member-logo"
          }, react_default.a.createElement("img", {
            src: member.logo
          })), react_default.a.createElement("div", {
            className: "member-info"
          }, member.name));
        }));
      } else {
        if (_this.props.members.length > 0) {
          return react_default.a.createElement("h5", null, "Your whole community currently has this achievement!");
        } else {
          return react_default.a.createElement("h5", null, "Currently no members for your channel!");
        }
      }
    });

    gift_achievement_defineProperty(gift_achievement_assertThisInitialized(_this), "awardAchievement", function () {
      var chosenMembers = _this.state.members.filter(function (member) {
        return member.selected;
      });

      console.log(chosenMembers);
      axios_default.a.post('http://api.streamachievements.com/api/achievement/award', {
        members: chosenMembers.map(function (member) {
          return member.name;
        }),
        aid: _this.state.aid
      }).then(function (response) {
        _this.props.onSubmit(response.data.members);
      });
    });

    var unearnedMembers = props.members.filter(function (member) {
      var notEarned = member.achievements.filter(function (achievement) {
        return achievement.aid === props.aid;
      }).length === 0;
      return notEarned;
    });
    _this.state = {
      members: unearnedMembers,
      aid: props.aid
    };
    return _this;
  }

  gift_achievement_createClass(GiftAchievementModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.filterMembers();
      this.positionModal();
    }
  }, {
    key: "filterMembers",
    value: function filterMembers() {
      console.log(this.props.members);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          members = _this$state.members,
          membersToGift = _this$state.membersToGift;

      if (Array.isArray(this.state.filteredMembers)) {
        members = this.state.filteredMembers;
      }

      return react_default.a.createElement("div", {
        className: "gift-modal"
      }, react_default.a.createElement("div", {
        className: "modal-mask",
        onClick: function onClick() {
          _this2.props.onCancel();
        }
      }), react_default.a.createElement("div", {
        className: "modal-container"
      }, react_default.a.createElement("div", {
        className: "modal",
        ref: function ref(giftModal) {
          return _this2.giftModal = giftModal;
        }
      }, react_default.a.createElement("div", {
        className: "modal-header"
      }, react_default.a.createElement("h3", null, "Award Achievement")), react_default.a.createElement("div", {
        className: "modal-content chooseMember--wrapper"
      }, react_default.a.createElement("div", {
        className: "member-search"
      }, react_default.a.createElement("input", {
        placeholder: "Search for member...",
        type: "text",
        onChange: this.filterList
      })), react_default.a.createElement("h4", null, "Members"), this.buildMemberList(members, 'member-list')), react_default.a.createElement("button", {
        className: "chooseMember--award",
        type: "button",
        onClick: this.awardAchievement
      }, "Award"), react_default.a.createElement("button", {
        className: "chooseMember--cancel",
        type: "button",
        onClick: function onClick() {
          return _this2.props.onClose();
        }
      }, "Cancel"))));
    }
  }]);

  return GiftAchievementModal;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/components/confirm-panel.css
var confirm_panel = __webpack_require__(131);

// CONCATENATED MODULE: ./src/components/confirm-panel.js
function confirm_panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { confirm_panel_typeof = function _typeof(obj) { return typeof obj; }; } else { confirm_panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return confirm_panel_typeof(obj); }

function confirm_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function confirm_panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function confirm_panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) confirm_panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) confirm_panel_defineProperties(Constructor, staticProps); return Constructor; }

function confirm_panel_possibleConstructorReturn(self, call) { if (call && (confirm_panel_typeof(call) === "object" || typeof call === "function")) { return call; } return confirm_panel_assertThisInitialized(self); }

function confirm_panel_getPrototypeOf(o) { confirm_panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return confirm_panel_getPrototypeOf(o); }

function confirm_panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function confirm_panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) confirm_panel_setPrototypeOf(subClass, superClass); }

function confirm_panel_setPrototypeOf(o, p) { confirm_panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return confirm_panel_setPrototypeOf(o, p); }

function confirm_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var confirm_panel_ConfirmPanel =
/*#__PURE__*/
function (_React$Component) {
  confirm_panel_inherits(ConfirmPanel, _React$Component);

  function ConfirmPanel() {
    var _this;

    confirm_panel_classCallCheck(this, ConfirmPanel);

    _this = confirm_panel_possibleConstructorReturn(this, confirm_panel_getPrototypeOf(ConfirmPanel).call(this));

    confirm_panel_defineProperty(confirm_panel_assertThisInitialized(_this), "positionModal", function () {
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      var scrollTop = document.documentElement.scrollTop;
      _this.confirmModal.style.top = winHeight / 2 - _this.confirmModal.offsetHeight + scrollTop + 'px';
      _this.confirmModal.style.left = winWidth / 2 - _this.confirmModal.offsetWidth / 2 + 'px';
    });

    return _this;
  }

  confirm_panel_createClass(ConfirmPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.positionModal();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react_default.a.createElement("div", {
        className: "confirm-panel"
      }, react_default.a.createElement("div", {
        className: "modal-mask"
      }), react_default.a.createElement("div", {
        className: "modal-container"
      }, react_default.a.createElement("div", {
        className: "modal",
        ref: function ref(confirmModal) {
          return _this2.confirmModal = confirmModal;
        }
      }, react_default.a.createElement("div", {
        className: "modal-header"
      }, react_default.a.createElement("h3", null, "Confirm")), react_default.a.createElement("div", {
        className: "modal-content"
      }, this.props.children, react_default.a.createElement("button", {
        className: "confirm-delete-button",
        onClick: this.props.onConfirm
      }, "Yes"), react_default.a.createElement("button", {
        className: "cancel-delete-button",
        onClick: this.props.onCancel
      }, "No")))));
    }
  }]);

  return ConfirmPanel;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/components/image-panel.js
function image_panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { image_panel_typeof = function _typeof(obj) { return typeof obj; }; } else { image_panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return image_panel_typeof(obj); }

function image_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function image_panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function image_panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) image_panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) image_panel_defineProperties(Constructor, staticProps); return Constructor; }

function image_panel_possibleConstructorReturn(self, call) { if (call && (image_panel_typeof(call) === "object" || typeof call === "function")) { return call; } return image_panel_assertThisInitialized(self); }

function image_panel_getPrototypeOf(o) { image_panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return image_panel_getPrototypeOf(o); }

function image_panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function image_panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) image_panel_setPrototypeOf(subClass, superClass); }

function image_panel_setPrototypeOf(o, p) { image_panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return image_panel_setPrototypeOf(o, p); }

function image_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var image_panel_ImagePanel =
/*#__PURE__*/
function (_React$Component) {
  image_panel_inherits(ImagePanel, _React$Component);

  function ImagePanel(props) {
    var _this;

    image_panel_classCallCheck(this, ImagePanel);

    _this = image_panel_possibleConstructorReturn(this, image_panel_getPrototypeOf(ImagePanel).call(this, props));

    image_panel_defineProperty(image_panel_assertThisInitialized(_this), "positionModal", function () {
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      var scrollTop = document.documentElement.scrollTop;
      _this.imageModal.style.top = winHeight / 2 - _this.imageModal.offsetHeight + scrollTop + 'px';
      _this.imageModal.style.left = winWidth / 2 - _this.imageModal.offsetWidth / 2 + 'px';
    });

    image_panel_defineProperty(image_panel_assertThisInitialized(_this), "onChange", function (event) {
      _this.props.onChange(event).then(function (res) {
        if (res.error) {
          console.log(res.error);
        }
      });
    });

    image_panel_defineProperty(image_panel_assertThisInitialized(_this), "handleSave", function () {
      if (_this.props.currentImage !== _this.state.originalImage) {
        _this.props.onConfirm();
      } else {
        _this.props.onCancel();
      }
    });

    image_panel_defineProperty(image_panel_assertThisInitialized(_this), "handleCancel", function () {
      if (_this.props.currentImage === _this.state.originalImage) {
        _this.props.onCancel();
      } else {
        _this.props.onCancel(_this.state.originalImage);
      }
    });

    _this.state = {
      originalImage: _this.props.currentImage
    };
    return _this;
  }

  image_panel_createClass(ImagePanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.positionModal();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var iconGallery, previewImage;
      var icons = this.props.icons;

      if (icons.length > 0) {
        iconGallery = icons.map(function (image, index) {
          var classes = "gallery-wrapper";

          if (_this2.props.currentImage && _this2.props.currentImage === image.url) {
            classes += " image--selected";
          }

          return react_default.a.createElement("button", {
            key: "icon-" + index,
            type: "button",
            className: classes,
            onClick: function onClick() {
              _this2.chooseImage(image);
            }
          }, react_default.a.createElement("img", {
            alt: image.name,
            src: image.url
          }));
        });
      } else {
        iconGallery = react_default.a.createElement("div", {
          className: "noIcons"
        }, "No icons have been uploaded!");
      }

      if (this.props.currentImage) {
        previewImage = this.props.currentImage;
      } else {
        previewImage = 'https://res.cloudinary.com/phirehero/image/upload/v1552923648/unearned.png'; //update with empty image
      }

      return react_default.a.createElement("div", {
        className: "image-panel"
      }, react_default.a.createElement("div", {
        className: "modal-mask",
        onClick: function onClick() {
          _this2.props.onCancel();
        }
      }), react_default.a.createElement("div", {
        className: "modal-container"
      }, react_default.a.createElement("div", {
        className: "modal",
        ref: function ref(imageModal) {
          return _this2.imageModal = imageModal;
        }
      }, react_default.a.createElement("div", {
        className: "modal-header"
      }, react_default.a.createElement("h3", null, "Choose Your Icon")), react_default.a.createElement("div", {
        className: "modal-content chooseImage--wrapper"
      }, react_default.a.createElement("div", {
        className: "currentImage"
      }, react_default.a.createElement("h4", null, "Current Image"), react_default.a.createElement("img", {
        src: previewImage
      })), react_default.a.createElement("div", {
        className: "chooseImage"
      }, react_default.a.createElement("button", {
        type: "button",
        onClick: function onClick() {
          _this2.fileInputEl.click();
        },
        className: "uploadImageButton"
      }, "Upload an Image"), react_default.a.createElement("span", {
        className: "upload--subtext"
      }, "Image must be 300x300 or less"), react_default.a.createElement("input", {
        type: "file",
        id: "achievement-icon",
        accept: "image/jpeg, image/png",
        ref: function ref(fileInputEl) {
          return _this2.fileInputEl = fileInputEl;
        },
        onChange: this.onChange
      }))), react_default.a.createElement("button", {
        className: "chooseImage--confirm",
        type: "button",
        onClick: this.handleSave
      }, "Save"), react_default.a.createElement("button", {
        type: "button",
        className: "chooseImage--cancel",
        onClick: this.handleCancel
      }, "Cancel"))));
    }
  }]);

  return ImagePanel;
}(react_default.a.Component);


// EXTERNAL MODULE: ./src/routes/manage-channel.css
var manage_channel = __webpack_require__(133);

// CONCATENATED MODULE: ./src/routes/manage-channel.js
function manage_channel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { manage_channel_typeof = function _typeof(obj) { return typeof obj; }; } else { manage_channel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return manage_channel_typeof(obj); }

function manage_channel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function manage_channel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function manage_channel_createClass(Constructor, protoProps, staticProps) { if (protoProps) manage_channel_defineProperties(Constructor.prototype, protoProps); if (staticProps) manage_channel_defineProperties(Constructor, staticProps); return Constructor; }

function manage_channel_possibleConstructorReturn(self, call) { if (call && (manage_channel_typeof(call) === "object" || typeof call === "function")) { return call; } return manage_channel_assertThisInitialized(self); }

function manage_channel_getPrototypeOf(o) { manage_channel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return manage_channel_getPrototypeOf(o); }

function manage_channel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function manage_channel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) manage_channel_setPrototypeOf(subClass, superClass); }

function manage_channel_setPrototypeOf(o, p) { manage_channel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return manage_channel_setPrototypeOf(o, p); }

function manage_channel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















var ICON_SELECTED = 'icon--selected';

var manage_channel_ManageChannel =
/*#__PURE__*/
function (_React$Component) {
  manage_channel_inherits(ManageChannel, _React$Component);

  function ManageChannel() {
    var _this;

    manage_channel_classCallCheck(this, ManageChannel);

    _this = manage_channel_possibleConstructorReturn(this, manage_channel_getPrototypeOf(ManageChannel).call(this));

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "clearNotice", function () {
      _this.setState({
        notice: ''
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "filterList", function (event) {
      var updatedList = _this.state.achievements;

      if (event.target.value === '') {
        //nothing in text box
        _this.setState({
          filteredAchievements: false
        });
      } else {
        updatedList = updatedList.filter(function (achievement) {
          return achievement.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });

        _this.setState({
          filteredAchievements: updatedList
        });
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "showGiftModal", function (aid) {
      console.log(aid);

      _this.setState({
        isModalActive: true,
        aid: aid
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "hideGiftModal", function (members) {
      var stateUpdate = {
        isModalActive: false
      };

      if (members) {
        stateUpdate.members = members;
      }

      _this.setState(stateUpdate);
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "hideAchievementModal", function () {
      _this.setState({
        isModalActive: false,
        edition: null
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "updateAchievements", function (data) {
      if (data.notice) {
        _this.setState({
          notice: data.notice
        });
      }

      if (data.delete) {
        //Achievement deleted, remove from list
        var currentAchievements = _this.state.achievements;
        var updatedAchievements = currentAchievements.filter(function (achievement) {
          return achievement._id !== data.delete;
        });

        _this.setState({
          achievements: updatedAchievements
        });
      } else if (data.achievement) {
        var newAchievement = data.achievement;
        var _currentAchievements = _this.state.achievements;
        var found = false;

        _currentAchievements.forEach(function (currentAchievement, index, arr) {
          if (currentAchievement._id === newAchievement._id) {
            found = true;
            arr[index] = newAchievement;
          }
        });

        if (!found) {
          _currentAchievements.push(newAchievement);
        }

        _this.setState({
          achievements: _currentAchievements
        });
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleIconChange", function (event) {
      var touched = _this.state.touched || {};
      var name = event.target.name;
      touched[name] = true;

      if (event.target.files[0]) {
        var stateUpdate = {
          file: event.target.files[0],
          touched: touched
        };
        stateUpdate[name + 'Preview'] = URL.createObjectURL(event.target.files[0]);

        _this.setState(stateUpdate);
      } else {
        var _stateUpdate = {
          file: '',
          touched: touched
        };
        _stateUpdate[name + 'Preview'] = '';

        _this.setState(_stateUpdate);
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "promptDelete", function (image) {
      _this.setState({
        showConfirm: true,
        imageToDelete: image
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleImageDelete", function () {
      var image = _this.state.imageToDelete;

      _this.setState({
        showConfirm: false,
        imageToDelete: null
      });

      axios_default.a.post('http://api.streamachievements.com/api/channel/image', {
        image: image
      }).then(function (res) {
        debugger;

        if (res.error) {} else {
          _this.setState(res.data);
        }
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleSubmit", function (foo) {
      debugger;
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "showImagePanel", function (event, iconName) {
      _this.setState({
        showImagePanel: true,
        iconName: iconName
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "toggleHover", function (showHover, node) {
      if (showHover) {
        node.classList.add('hoverText--active');
      } else {
        node.classList.remove('hoverText--active');
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleIconChange", function (event) {
      return new Promise(function (resolve, reject) {
        if (event.target.files[0]) {
          var file = event.target.files[0];
          var preview = URL.createObjectURL(file);
          var img = new Image();
          img.src = preview;

          img.onload = function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;
            window.URL.revokeObjectURL(img.src);

            if (width <= 300 && height <= 300) {
              var touched = _this.state.touched || {};
              touched[_this.state.iconName] = true;
              touched[_this.state.iconName + 'File'] = true;
              touched[_this.state.iconName + 'Name'] = true;
              touched[_this.state.iconName + 'Preview'] = true;
              var newPreview = URL.createObjectURL(file);
              var stateUpdate = {
                touched: touched
              };
              stateUpdate[_this.state.iconName + 'File'] = file;
              stateUpdate[_this.state.iconName + 'Name'] = file.name;
              stateUpdate[_this.state.iconName + 'Preview'] = newPreview;

              _this.setState(stateUpdate);

              resolve({
                error: null
              });
            } else {
              resolve({
                error: 'Icon needs to be less than 300x300'
              });
            }
          };
        } else {
          var touched = _this.state.touched || {};
          touched[_this.state.iconName] = true;
          var stateUpdate = {
            touched: touched
          };
          stateUpdate[_this.state.iconName + 'File'] = '';
          stateUpdate[_this.state.iconName + 'Name'] = '';
          stateUpdate[_this.state.iconName + 'Preview'] = '';

          _this.setState(stateUpdate);

          resolve({
            error: null
          });
        }
      });
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleCancel", function (originalIcon) {
      var stateUpdate = {
        showImagePanel: false
      };

      if (originalIcon) {
        var touched = _this.state.touched || undefined;

        if (touched) {
          delete touched[_this.state.iconName];
          delete touched[_this.state.iconName + 'File'];
          delete touched[_this.state.iconName + 'Name'];
          delete touched[_this.state.iconName + 'Preview'];
          stateUpdate.touched = touched;
        }

        stateUpdate[_this.state.iconName + 'Preview'] = originalIcon;
      }

      _this.setState(stateUpdate);
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleIconSelect", function (evt, iconName, icon) {
      var name = evt.target.name;
      var prevIconName = _this.state.selected[iconName];

      if (prevIconName != name) {
        var stateUpdate = {
          selected: _this.state.selected
        };
        stateUpdate.selected[iconName] = name;
        stateUpdate[iconName + 'Selected'] = icon;
        var touched = _this.state.touched || {};

        if (_this.state[iconName + 'Original'] === name) {
          delete touched[iconName];
        } else {
          touched[iconName] = true;

          if (prevIconName === 'customDefault' || prevIconName === 'customHidden') {
            delete touched[iconName + 'File'];
            delete touched[iconName + 'Name'];
            delete touched[iconName + 'Preview'];
          }
        }

        stateUpdate.touched = touched;

        _this.setState(stateUpdate);
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleCustomIcon", function (evt, iconName) {
      if (_this.props.patreon && _this.props.patreon.gold) {
        var identifier = iconName === 'defaultIcon' ? 'customDefault' : 'customHidden';

        if (_this[iconName + 'Preview'] && _this.state.selected[iconName] !== identifier) {
          var stateUpdate = {
            selected: _this.state.selected
          };
          stateUpdate.selected[iconName] = identifier;
          _this[iconName + 'Selected'] = _this[iconName + 'Preview'];
          stateUpdate[iconName + 'Selected'] = _this.state[iconName + 'Preview'];
          var touched = _this.state.touched || {};
          touched[iconName] = true;
          touched[iconName + 'File'] = true;
          stateUpdate.touched = touched;

          _this.setState(stateUpdate);
        } else {
          _this.showImagePanel(evt, iconName);
        }
      }
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleConfirm", function () {
      var iconName = _this.state.iconName;
      var identifier = iconName === 'defaultIcon' ? 'customDefault' : 'customHidden';
      var stateUpdate = {
        selected: _this.state.selected,
        showImagePanel: false
      };
      stateUpdate.selected[iconName] = identifier;
      _this[iconName + 'Selected'] = _this[iconName + 'Preview'];
      stateUpdate[iconName + 'Selected'] = _this.state[iconName + 'Preview'];

      _this.setState(stateUpdate);
    });

    manage_channel_defineProperty(manage_channel_assertThisInitialized(_this), "handleSave", function () {
      _this.setState({
        loading: true
      });

      var defaultPromise, hiddenPromise;
      var payload = {}; //check for default change

      if (_this.state.touched.defaultIcon) {
        //change made to default icon
        if (_this.state.touched.defaultIconFile) {
          //need to upload
          defaultPromise = new Promise(function (resolve, reject) {
            var defaultReader = new FileReader();
            defaultReader.addEventListener("load", function () {
              payload.defaultIcon = defaultReader.result;
              payload.defaultIconName = _this.state.defaultIconFile.name;
              resolve();
            });
            defaultReader.readAsDataURL(_this.state.defaultIconFile);
          });
        } else {
          payload.defaultImage = _this.state.defaultIconSelected;
          defaultPromise = Promise.resolve();
        }
      } else {
        defaultPromise = Promise.resolve();
      } //check for hidden change


      if (_this.state.touched.hiddenIcon) {
        //change made to default icon
        if (_this.state.touched.hiddenIconFile) {
          //need to upload
          hiddenPromise = new Promise(function (resolve, reject) {
            var hiddenReader = new FileReader();
            hiddenReader.addEventListener("load", function () {
              payload.hiddenIcon = hiddenReader.result;
              payload.hiddenIconName = _this.state.hiddenIconFile.name;
              resolve();
            });
            hiddenReader.readAsDataURL(_this.state.hiddenIconFile);
          });
        } else {
          payload.hiddenImage = _this.state.hiddenIconSelected;
          hiddenPromise = Promise.resolve();
        }
      } else {
        hiddenPromise = Promise.resolve();
      }

      Promise.all([defaultPromise, hiddenPromise]).then(function (results) {
        if (Object.keys(payload).length > 0) {
          //changes made, call to service
          axios_default.a.post('http://api.streamachievements.com/api/channel/preferences', payload).then(function (res) {
            var stateUpdate = {
              channel: res.data.channel,
              loading: false
            };

            if (res.data.images) {
              stateUpdate.images = res.data.images;
            }

            _this.setState(stateUpdate);
          });
        }
      });
    });

    _this.state = {
      channel: '',
      achievements: '',
      notice: '',
      showConfirm: false,
      loading: true,
      showImagePanel: false,
      selected: {
        defaultIcon: '',
        hiddenIcon: ''
      }
    };
    _this.icons = {
      default: {
        gold: "https://res.cloudinary.com/phirehero/image/upload/v1558811694/default-icon.png",
        silver: "https://res.cloudinary.com/phirehero/image/upload/v1558834120/default-icon-silver.png",
        bronze: "https://res.cloudinary.com/phirehero/image/upload/v1559961119/default-icon-bronze.png"
      },
      hidden: "https://res.cloudinary.com/phirehero/image/upload/v1558811887/hidden-icon.png"
    };
    return _this;
  }

  manage_channel_createClass(ManageChannel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios_default.a.get('http://api.streamachievements.com/api/channel/retrieve').then(function (res) {
        console.log(res.data);

        if (res.data.error) {//redirect to home
        } else {
          var stateUpdate = {
            channel: res.data.channel,
            achievements: res.data.achievements,
            images: res.data.images,
            members: res.data.members,
            loading: false,
            selected: {}
          };
          var channelIcons = res.data.channel.icons;

          if (channelIcons) {
            if (channelIcons.default) {
              if (channelIcons.default === _this2.icons.default.gold) {
                stateUpdate.selected.defaultIcon = 'gold';
                stateUpdate.defaultIconOriginal = 'gold';
              } else if (channelIcons.default === _this2.icons.default.silver) {
                stateUpdate.selected.defaultIcon = 'silver';
                stateUpdate.defaultIconOriginal = 'silver';
              } else if (channelIcons.default === _this2.icons.default.bronze) {
                stateUpdate.selected.defaultIcon = 'bronze';
                stateUpdate.defaultIconOriginal = 'bronze';
              } else {
                stateUpdate.selected.defaultIcon = 'customDefault';
                stateUpdate.defaultIconOriginal = 'customDefault';
                stateUpdate.defaultIconPreview = channelIcons.default;
              }
            }

            if (channelIcons.hidden) {
              if (channelIcons.hidden !== _this2.icons.hidden) {
                stateUpdate.selected.hiddenIcon = 'customHidden';
                stateUpdate.hiddenIconOriginal = 'customHidden';
                stateUpdate.hiddenIconPreview = channelIcons.hidden;
              } else {
                stateUpdate.selected.hiddenIcon = 'default';
                stateUpdate.hiddenIconOriginal = 'default';
              }
            }
          }

          _this2.setState(stateUpdate);
        }
      });
    } // componentDidUpdate(prevProps, prevState) {
    // 	let prevIcons = prevState.channel.icons;
    // 	let icons = this.state.channel.icons;
    // 	let stateUpdate = {...this.state};
    // 	let update = false;
    // 	debugger;
    // 	if(prevIcons && icons) {
    // 		if(prevIcons.default !== icons.default) {
    // 			update = true;
    // 			delete stateUpdate.selected.defaultIcon;
    // 			delete stateUpdate.defaultIconOriginal;
    // 			delete stateUpdate.defaultIconPreview;	
    // 		}
    // 		if(prevIcons.hidden !== icons.hidden) {
    // 			update = true;
    // 			delete stateUpdate.selected.hiddenIcon;
    // 			delete stateUpdate.hiddenIconOriginal;
    // 			delete stateUpdate.hiddenIconPreview;
    // 		}
    // 		if(update) {
    // 			this.setState(stateUpdate);
    // 		}
    // 	}
    // }

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.props.profile && !this.props.profile.stats === 'verified') {
        return react_default.a.createElement(es_Redirect["a" /* default */], {
          to: "/home"
        });
      }

      var generalContent, achievementTab, imageContent, memberContent, imagePanel;

      if (this.state.channel) {
        var _this$state$channel = this.state.channel,
            logo = _this$state$channel.logo,
            owner = _this$state$channel.owner;
        var achievements = this.state.achievements;

        if (Array.isArray(this.state.filteredAchievements)) {
          achievements = this.state.filteredAchievements;
        }

        var customDefaultIcon, customHiddenIcon;

        if (this.props.patreon && this.props.patreon.gold) {
          if (this.state.defaultIconPreview) {
            customDefaultIcon = react_default.a.createElement("div", {
              className: "customDefaultImg"
            }, react_default.a.createElement("img", {
              alt: "Default Icon",
              name: "customDefault",
              className: this.state.selected.defaultIcon === 'customDefault' ? ICON_SELECTED : '',
              ref: function ref(el) {
                return _this3.defaultIconPreview = el;
              },
              src: this.state.defaultIconPreview
            }));
          } else {
            customDefaultIcon = react_default.a.createElement("div", {
              className: "defaultIcon--placeholder"
            });
          }

          debugger;

          if (this.state.hiddenIconPreview) {
            customHiddenIcon = react_default.a.createElement("div", {
              className: "customHiddenImg"
            }, react_default.a.createElement("img", {
              alt: "Hidden icon",
              name: "customHidden",
              className: this.state.selected.hiddenIcon === 'customHidden' ? ICON_SELECTED : '',
              ref: function ref(el) {
                return _this3.hiddenIconPreview = el;
              },
              src: this.state.hiddenIconPreview
            }));
          } else {
            customHiddenIcon = react_default.a.createElement("div", {
              className: "hiddenIcon--placeholder"
            });
          }
        }

        var defaultBlurb;

        if (this.props.patreon && this.props.patreon.gold) {
          defaultBlurb = react_default.a.createElement("p", null, "Being a patreon supporter, you have the option to upload a custom icon for each achievement when creating one! Also, you can upload a custom image here to use for all achievements by default!");
        } else {
          defaultBlurb = react_default.a.createElement("p", null, "Wan't to provide your own custom icons for your achievements? Consider becoming a Patreon! You will be able to upload an icon to use for all achievements, or provide a custom icon for each achievement when creating them!");
        }

        if (this.state.showImagePanel) {
          imagePanel = react_default.a.createElement(image_panel_ImagePanel, {
            currentImage: this.state[this.state.iconName + 'Preview'],
            icons: this.state.images.gallery,
            onChange: this.handleIconChange,
            onConfirm: this.handleConfirm,
            onCancel: this.handleCancel
          });
        } else {
          imagePanel = undefined;
        }

        var defaultHoverText = this.state.defaultIconPreview ? this.state.selected.defaultIcon === 'customDefault' ? 'Edit' : 'Select' : 'Upload';
        var hiddenHoverText = this.state.hiddenIconPreview ? this.state.selected.hiddenIcon === 'customHidden' ? 'Edit' : 'Select' : 'Upload';
        var saveButton;

        if (this.state.touched && Object.keys(this.state.touched).length > 0) {
          saveButton = react_default.a.createElement("input", {
            className: "save-button--active",
            type: "submit",
            value: "Save",
            onClick: this.handleSave
          });
        } else {
          saveButton = react_default.a.createElement("input", {
            className: "save-button--inactive",
            disabled: true,
            type: "submit",
            value: "Save"
          });
        }

        generalContent = react_default.a.createElement("div", {
          className: "general-configuration"
        }, react_default.a.createElement("h4", null, "Basic Info"), react_default.a.createElement("span", {
          className: "subText"
        }, "This information is managed by Twitch"), react_default.a.createElement("div", {
          className: "section-wrapper"
        }, react_default.a.createElement("div", {
          className: "section-label"
        }, react_default.a.createElement("label", {
          htmlFor: "name"
        }, "Twitch Name")), react_default.a.createElement("div", {
          className: "section-value"
        }, react_default.a.createElement("span", {
          name: "name"
        }, owner))), react_default.a.createElement("div", {
          className: "section-wrapper"
        }, react_default.a.createElement("div", {
          className: "section-label"
        }, react_default.a.createElement("label", {
          htmlFor: "logo"
        }, "Channel Logo")), react_default.a.createElement("div", {
          className: "section-value"
        }, react_default.a.createElement("span", {
          name: "logo"
        }, react_default.a.createElement("img", {
          alt: "",
          src: logo
        })))), react_default.a.createElement("h4", null, "Channel Customization"), react_default.a.createElement("div", {
          className: "section-wrapper"
        }, react_default.a.createElement("div", {
          className: "section-label"
        }, react_default.a.createElement("label", {
          htmlFor: "defaultIcon"
        }, "Default Icon for Achievements"), react_default.a.createElement("p", null, "Choose an image to use for your achievements!"), defaultBlurb), react_default.a.createElement("div", {
          className: "section-value default-icons"
        }, react_default.a.createElement("div", {
          className: "formGroup icon-upload" + (this.props.patreon && this.props.patreon.gold ? '' : ' disabled')
        }, react_default.a.createElement("div", {
          className: "defaultIcon",
          onClick: function onClick(evt) {
            return _this3.handleCustomIcon(evt, 'defaultIcon');
          },
          onMouseEnter: function onMouseEnter() {
            _this3.toggleHover(true, _this3.defaultHover);
          },
          onMouseLeave: function onMouseLeave() {
            _this3.toggleHover(false, _this3.defaultHover);
          }
        }, customDefaultIcon, react_default.a.createElement("div", {
          className: "hoverText",
          ref: function ref(hover) {
            return _this3.defaultHover = hover;
          }
        }, defaultHoverText))), react_default.a.createElement("div", {
          className: "divider" + (this.props.patreon && this.props.patreon.gold ? '' : ' disabled')
        }, react_default.a.createElement("span", null, "OR")), react_default.a.createElement("img", {
          alt: "",
          name: "gold",
          className: "icon--stock" + (this.state.selected.defaultIcon === 'gold' ? ' ' + ICON_SELECTED : ''),
          src: this.icons.default.gold,
          onClick: function onClick(evt) {
            _this3.handleIconSelect(evt, 'defaultIcon', _this3.icons.default.gold);
          },
          ref: function ref(el) {
            return _this3.defaultGold = el;
          }
        }), react_default.a.createElement("img", {
          alt: "",
          name: "silver",
          className: "icon--stock" + (this.state.selected.defaultIcon === 'silver' ? ' ' + ICON_SELECTED : ''),
          src: this.icons.default.silver,
          onClick: function onClick(evt) {
            _this3.handleIconSelect(evt, 'defaultIcon', _this3.icons.default.silver);
          },
          ref: function ref(el) {
            return _this3.defaultSilver = el;
          }
        }), react_default.a.createElement("img", {
          alt: "",
          name: "bronze",
          className: "icon--stock" + (this.state.selected.defaultIcon === 'bronze' ? ' ' + ICON_SELECTED : ''),
          src: this.icons.default.bronze,
          onClick: function onClick(evt) {
            _this3.handleIconSelect(evt, 'defaultIcon', _this3.icons.default.bronze);
          },
          ref: function ref(el) {
            return _this3.defaultBronze = el;
          }
        }))), react_default.a.createElement("div", {
          className: "section-wrapper"
        }, react_default.a.createElement("div", {
          className: "section-label"
        }, react_default.a.createElement("label", {
          htmlFor: "unearnedIcon"
        }, "Hidden Achievement Icon"), react_default.a.createElement("p", null, "This will be the icon used when displaying an achievement that hasn't been earned yet")), react_default.a.createElement("div", {
          className: "section-value default-icons"
        }, react_default.a.createElement("div", {
          className: "formGroup icon-upload" + (this.props.patreon && this.props.patreon.gold ? '' : ' disabled')
        }, react_default.a.createElement("div", {
          className: "hiddenIcon",
          onClick: function onClick(evt) {
            return _this3.handleCustomIcon(evt, 'hiddenIcon');
          },
          onMouseEnter: function onMouseEnter() {
            _this3.toggleHover(true, _this3.hiddenHover);
          },
          onMouseLeave: function onMouseLeave() {
            _this3.toggleHover(false, _this3.hiddenHover);
          }
        }, customHiddenIcon, react_default.a.createElement("div", {
          className: "hoverText",
          ref: function ref(hover) {
            return _this3.hiddenHover = hover;
          }
        }, hiddenHoverText))), react_default.a.createElement("div", {
          className: "divider" + (this.props.patreon && this.props.patreon.gold ? '' : ' disabled')
        }, react_default.a.createElement("span", null, "OR")), react_default.a.createElement("img", {
          alt: "",
          name: "default",
          className: "icon--stock" + (this.state.selected.hiddenIcon === 'default' ? ' ' + ICON_SELECTED : ''),
          src: this.icons.hidden,
          onClick: function onClick(evt) {
            _this3.handleIconSelect(evt, 'hiddenIcon', _this3.icons.hidden);
          },
          ref: function ref(el) {
            return _this3.defaultHidden = el;
          }
        }))), react_default.a.createElement("div", {
          className: "section-wrapper--end"
        }, saveButton), imagePanel);
        var modal;

        if (this.state.isModalActive) {
          modal = react_default.a.createElement(gift_achievement_GiftAchievementModal, {
            aid: this.state.aid,
            channel: this.state.channel._id,
            active: this.state.isModalActive,
            onClose: this.hideGiftModal,
            onSubmit: this.hideGiftModal,
            members: this.state.members
          });
        } else {
          modal = undefined;
        }

        if (achievements.length === 0 && !this.state.filteredAchievements) {
          achievementTab = react_default.a.createElement("div", null, react_default.a.createElement("div", {
            onClick: function onClick() {
              _this3.props.history.push('/manage/achievement');
            },
            className: "add-achievement"
          }, react_default.a.createElement("div", null, "Add your first achievement!"), react_default.a.createElement("div", null, react_default.a.createElement("img", {
            alt: "plus icon",
            src: __webpack_require__(17)
          }))));
        } else {
          achievementTab = react_default.a.createElement("div", null, react_default.a.createElement("div", {
            className: "achievementsHeader"
          }, react_default.a.createElement("h3", null, "Showing ", achievements.length, " Achievements"), react_default.a.createElement("div", {
            className: "achievement-search"
          }, react_default.a.createElement("input", {
            placeholder: "Search for achievement...",
            type: "text",
            onChange: this.filterList
          })), react_default.a.createElement("div", {
            className: "achievementsHeader--add"
          }, react_default.a.createElement(Link["a" /* default */], {
            to: "/manage/achievement"
          }, "Add New...", react_default.a.createElement("div", {
            className: "achievementsHeader--plus"
          }, react_default.a.createElement("img", {
            alt: "",
            src: __webpack_require__(17)
          }))))), achievements.map(function (achievement, index) {
            return react_default.a.createElement(src_components_achievement, {
              key: 'achievement-' + index,
              editable: true,
              achievement: achievement,
              onGift: _this3.showGiftModal,
              onClick: function onClick() {
                _this3.props.history.push('/manage/achievement/' + achievement.uid);
              }
            });
          }), modal);
        }

        if (this.state.images.gallery.length > 0) {
          imageContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
            className: "imageGallery"
          }, this.state.images.gallery.map(function (image, index) {
            var classNames = "image--wrapper";
            var label;

            if (image.achievementID) {
              classNames += " active";
            } else if (image.type === 'default') {
              classNames += " default";
              label = react_default.a.createElement("div", {
                className: "image--label"
              }, "Default");
            } else if (image.type === 'hidden' && _this3.state.channel.icons.hidden === image.url) {
              classNames += " default";
              label = react_default.a.createElement("div", {
                className: "image--label"
              }, "Hidden");
            }

            return react_default.a.createElement("div", {
              key: 'image-' + index,
              className: classNames
            }, react_default.a.createElement("div", {
              className: "deleteImg",
              onClick: function onClick() {
                _this3.promptDelete(image);
              }
            }, react_default.a.createElement("div", {
              className: "icon"
            })), react_default.a.createElement("img", {
              alt: "",
              src: image.url
            }), label);
          })));
        } else {
          imageContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
            className: "imageGallery"
          }, react_default.a.createElement("h3", null, "You currently don't have any images!")));
        }

        memberContent = this.state.members.map(function (member, index) {
          return react_default.a.createElement("div", {
            key: 'member-' + index,
            className: "channelMember" + (index % 2 === 1 ? " channelMember--stripe" : "")
          }, react_default.a.createElement("div", {
            className: "member-logo"
          }, react_default.a.createElement("img", {
            alt: "",
            src: member.logo
          })), react_default.a.createElement("div", {
            className: "member-info"
          }, member.name));
        });
      } else {
        generalContent = react_default.a.createElement(loading_spinner_LoadingSpinner, null);
        achievementTab = react_default.a.createElement(loading_spinner_LoadingSpinner, null);
        imageContent = react_default.a.createElement(loading_spinner_LoadingSpinner, null);
        memberContent = react_default.a.createElement(loading_spinner_LoadingSpinner, null);
      }

      var params = new URLSearchParams(this.props.location.search);
      var tab = params.get('tab');
      var tabIndex = 0;
      var confirmPanel;

      if (this.state.showConfirm) {
        confirmPanel = react_default.a.createElement(confirm_panel_ConfirmPanel, {
          onConfirm: this.handleImageDelete,
          onCancel: function onCancel() {
            _this3.setState({
              showConfirm: false
            });
          }
        }, react_default.a.createElement("div", {
          className: "delete-image--confirm"
        }, react_default.a.createElement("div", null, "Are you sure you want to delete this image?"), react_default.a.createElement("img", {
          alt: "",
          src: this.state.imageToDelete.url
        })));
      }

      switch (tab) {
        case 'achievements':
          tabIndex = 1;
          break;

        case 'images':
          tabIndex = 2;
          break;

        case 'rankings':
          tabIndex = 3;
          break;

        default:
          break;
      }

      return react_default.a.createElement(template_Template, {
        spinner: {
          isLoading: this.state.loading,
          fullscreen: true
        }
      }, react_default.a.createElement("div", {
        className: "manage-container"
      }, react_default.a.createElement("h2", null, "Manage Channel"), react_default.a.createElement(notice_Notice, {
        message: this.state.notice,
        onClear: this.clearNotice
      }), react_default.a.createElement(Tabs_Tabs, {
        defaultIndex: tabIndex
      }, react_default.a.createElement(TabList_TabList, {
        className: "manage-tabs"
      }, react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "General"), react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Achievements"), react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Images"), react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Rankings")), react_default.a.createElement(TabPanel_TabPanel, null, generalContent), react_default.a.createElement(TabPanel_TabPanel, null, achievementTab), react_default.a.createElement(TabPanel_TabPanel, null, imageContent, confirmPanel), react_default.a.createElement(TabPanel_TabPanel, null, react_default.a.createElement("h3", null, "Rankings"), memberContent))));
    }
  }]);

  return ManageChannel;
}(react_default.a.Component);

function manage_channel_headerMapStateToProps(state) {
  return {
    profile: state.profile,
    patreon: state.patreon
  };
}

/* harmony default export */ var routes_manage_channel = (connector(manage_channel_headerMapStateToProps)(manage_channel_ManageChannel)); //export default ManageChannel;
// EXTERNAL MODULE: ./src/routes/achievement-page.css
var achievement_page = __webpack_require__(135);

// CONCATENATED MODULE: ./src/routes/achievement-page.js
function achievement_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { achievement_page_typeof = function _typeof(obj) { return typeof obj; }; } else { achievement_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return achievement_page_typeof(obj); }

function achievement_page_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { achievement_page_defineProperty(target, key, source[key]); }); } return target; }

function achievement_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function achievement_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function achievement_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) achievement_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) achievement_page_defineProperties(Constructor, staticProps); return Constructor; }

function achievement_page_possibleConstructorReturn(self, call) { if (call && (achievement_page_typeof(call) === "object" || typeof call === "function")) { return call; } return achievement_page_assertThisInitialized(self); }

function achievement_page_getPrototypeOf(o) { achievement_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return achievement_page_getPrototypeOf(o); }

function achievement_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function achievement_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) achievement_page_setPrototypeOf(subClass, superClass); }

function achievement_page_setPrototypeOf(o, p) { achievement_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return achievement_page_setPrototypeOf(o, p); }

function achievement_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var achievement_page_AchievementPage =
/*#__PURE__*/
function (_React$Component) {
  achievement_page_inherits(AchievementPage, _React$Component);

  function AchievementPage(props) {
    var _this;

    achievement_page_classCallCheck(this, AchievementPage);

    console.log('constructor');
    _this = achievement_page_possibleConstructorReturn(this, achievement_page_getPrototypeOf(AchievementPage).call(this, props));

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "fetchData", function () {
      if (_this.props.match.params.achievementid) {
        axios_default.a.get('http://api.streamachievements.com/api/achievement/retrieve?aid=' + _this.props.match.params.achievementid).then(function (res) {
          if (res.data.error) {//redirect to home
          } else {
            _this.setState(achievement_page_objectSpread({
              originalAchievement: res.data.achievement
            }, res.data.achievement, {
              iconPreview: res.data.achievement.icon,
              icons: res.data.images,
              defaultIcons: res.data.defaultIcons,
              fetch: false,
              edit: true
            }));
          }
        });
      } else {
        axios_default.a.get('http://api.streamachievements.com/api/achievement/icons').then(function (res) {
          _this.setState({
            icons: res.data.images,
            defaultIcons: res.data.defaultIcons,
            fetch: false
          });
        });
      }
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "revert", function () {
      var originalAchievement = _this.state.originalAchievement;

      if (originalAchievement) {
        _this.setState(achievement_page_objectSpread({}, originalAchievement, {
          iconPreview: originalAchievement.icon,
          touched: {}
        }));
      } else {
        _this.setState({
          title: "",
          description: "",
          icon: "",
          code: "",
          resubType: "0",
          query: "",
          bot: "",
          condition: "",
          earnable: true,
          limited: false,
          secret: false,
          iconPreview: '',
          id: '',
          edit: false,
          showConfirm: false,
          showImagePanel: false
        });
      }
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "handleIconChange", function (event) {
      return new Promise(function (resolve, reject) {
        if (event.target.files[0]) {
          var file = event.target.files[0];
          var preview = URL.createObjectURL(file);
          console.log(event.target);
          var img = new Image();
          img.src = preview;

          img.onload = function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;
            window.URL.revokeObjectURL(img.src);

            if (width <= 300 && height <= 300) {
              var touched = _this.state.touched || {};
              touched['icon'] = true;
              touched['file'] = true;
              touched['iconName'] = true;
              touched['iconPreview'] = true;
              var newPreview = URL.createObjectURL(file);

              _this.setState({
                icon: newPreview,
                iconPreview: newPreview,
                iconName: file.name,
                file: file,
                touched: touched
              });

              resolve({
                error: null
              });
            } else {
              resolve({
                error: 'Icon needs to be less than 300x300'
              });
            }
          };
        } else {
          var touched = _this.state.touched || {};
          touched['icon'] = true;

          _this.setState({
            icon: '',
            iconPreview: '',
            file: '',
            touched: touched
          });

          resolve({
            error: null
          });
        }
      });
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "handleDataChange", function (event) {
      var _stateUpdate;

      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      var touched = _this.state.touched || {};
      touched[name] = true;
      var stateUpdate = (_stateUpdate = {}, achievement_page_defineProperty(_stateUpdate, name, value), achievement_page_defineProperty(_stateUpdate, "touched", touched), _stateUpdate);

      if (name === "code") {
        stateUpdate.touched['query'] = true;
        stateUpdate.query = '';
      }

      _this.setState(stateUpdate);
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "getConditionContent", function () {
      if (_this.state.code !== "" && _this.state.code !== "0") {
        var conditionContent;
        var helpText;

        switch (_this.state.code) {
          case "1":
            if (_this.state.resubType) {
              if (_this.state.resubType === "0") {
                helpText = "Number of months viewer has kept a streak";
              } else {
                helpText = "Number of months a viewer has subbed altogether";
              }
            } else {
              helpText = "Number of months viewer has kept a streak";
            }

            conditionContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "resubType"
            }, "Resub Type"), react_default.a.createElement("select", {
              id: "resubType",
              name: "resubType",
              className: "selectInput",
              onChange: _this.handleDataChange
            }, react_default.a.createElement("option", {
              value: "0"
            }, "Streak"), react_default.a.createElement("option", {
              value: "1"
            }, "Total"))), react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-query"
            }, "Condition"), react_default.a.createElement("input", {
              id: "achievement-query",
              name: "query",
              className: "textInput",
              type: "text",
              value: _this.state.query,
              onChange: _this.handleDataChange
            })), react_default.a.createElement("div", {
              className: "helpText"
            }, helpText));
            break;

          case "2":
            //Gifted Sub
            helpText = "Total number of gifted subs (defaults to 1)";
            conditionContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-query"
            }, "Condition"), react_default.a.createElement("input", {
              id: "achievement-query",
              name: "query",
              className: "textInput",
              type: "text",
              value: _this.state.query,
              onChange: _this.handleDataChange
            })), react_default.a.createElement("div", {
              className: "helpText"
            }, helpText));
            break;

          case "3":
            //Raid
            helpText = "Total raids from the viewer (defaults to 1)";
            conditionContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-query"
            }, "Condition"), react_default.a.createElement("input", {
              id: "achievement-query",
              name: "query",
              className: "textInput",
              type: "text",
              value: _this.state.query,
              onChange: _this.handleDataChange
            })), react_default.a.createElement("div", {
              className: "helpText"
            }, helpText));
            break;

          case "4":
            //Custom
            conditionContent = react_default.a.createElement("div", null, react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-bot"
            }, "Bot Name"), react_default.a.createElement("input", {
              id: "achievement-bot",
              name: "bot",
              className: "textInput",
              type: "text",
              value: _this.state.bot,
              onChange: _this.handleDataChange
            })), react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-query"
            }, "Message"), react_default.a.createElement("input", {
              id: "achievement-query",
              name: "query",
              className: "textInput",
              type: "text",
              value: _this.state.query,
              onChange: _this.handleDataChange
            })), react_default.a.createElement("div", {
              className: "formGroup"
            }, react_default.a.createElement("label", {
              htmlFor: "achievement-condition"
            }, "Condition"), react_default.a.createElement("input", {
              id: "achievement-condition",
              name: "condition",
              className: "textInput",
              type: "text",
              value: _this.state.condition,
              onChange: _this.handleDataChange
            })));
            break;
        }

        return conditionContent;
      }

      return null;
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "handleSubmit", function (event) {
      event.preventDefault();
      var achievement = {};

      if (_this.state.edit) {
        if (_this.state.touched) {
          Object.keys(_this.state.touched).forEach(function (key) {
            if (_this.state.touched[key]) {
              achievement[key] = _this.state[key];
            }
          });
        }
      } else {
        achievement = {
          title: _this.state.title,
          description: _this.state.description,
          earnable: _this.state.earnable,
          limited: _this.state.limited,
          secret: _this.state.secret,
          iconName: _this.state.file ? _this.state.file.name : '',
          code: _this.state.code
        };

        if (_this.state.code !== '0') {
          achievement.query = _this.state.query;

          if (_this.state.code === "1") {
            achievement.resubType = _this.state.resubType;
          }

          if (_this.state.code === "4") {
            achievement.bot = _this.state.bot;
            achievement.condition = _this.state.condition;
          }
        }
      }

      achievement.id = _this.state._id;

      if (_this.state.file && _this.state.file != '') {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          achievement.icon = reader.result;

          _this.sendData(achievement);
        }, false);
        reader.readAsDataURL(_this.state.file);
      } else {
        _this.sendData(achievement);
      }
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "handleDelete", function (event) {
      _this.setState({
        showConfirm: false
      });

      axios_default.a.post('http://api.streamachievements.com/api/achievement/delete', {
        achievementID: _this.state._id
      }).then(function (response) {
        var data = {
          notice: "\"" + _this.state.title + "\" achievement was deleted successfully!",
          delete: _this.state._id
        };

        _this.props.history.push('/manage/' + _this.props.profile.username + '?tab=achievements'); //redirect to manage-channel#achievements

      });
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "sendData", function (achievement) {
      console.log(achievement);
      var api = 'http://api.streamachievements.com/api/achievement/create';

      if (_this.state.edit) {
        api = 'http://api.streamachievements.com/api/achievement/update';
      }

      axios_default.a.post(api, achievement).then(function (res) {
        if (res.data.created || res.data.update) {
          //redirect to manage-channel#achievements
          _this.clearState();

          _this.props.history.push('/manage/?tab=achievements');
        } else {
          _this.setState({
            error: res.data.message
          });
        }
      });
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "showImagePanel", function (event) {
      _this.setState({
        showImagePanel: true
      });
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "toggleHover", function (showHover) {
      if (showHover) {
        _this.hover.classList.add('hoverText--active');
      } else {
        _this.hover.classList.remove('hoverText--active');
      }
    });

    achievement_page_defineProperty(achievement_page_assertThisInitialized(_this), "clearState", function () {
      _this.setState({
        fetched: false,
        title: "",
        description: "",
        icon: "",
        code: "",
        resubType: "0",
        query: "",
        bot: "",
        condition: "",
        earnable: true,
        limited: false,
        secret: false,
        iconPreview: '',
        id: '',
        edit: false,
        showConfirm: false,
        showImagePanel: false
      });
    });

    _this.state = {
      fetch: true,
      title: "",
      description: "",
      icon: "",
      code: "",
      resubType: "0",
      query: "",
      bot: "",
      condition: "",
      earnable: true,
      limited: false,
      secret: false,
      iconPreview: '',
      id: '',
      edit: false,
      showConfirm: false,
      showImagePanel: false,
      defaultIcons: {}
    };

    if (props.profile) {
      _this.fetchData();
    }

    return _this;
  }

  achievement_page_createClass(AchievementPage, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      //debugger;
      if (this.state.fetch && !this.props.profile && nextProps.profile) {
        this.fetchData();
      }

      return true;
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      console.log('componentWillUpdate');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('unmount');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var content, iconGallery, confirmPanel, imagePanel, imgPreviewContent, iconSection;
      var deleteButton = null;
      var _this$state = this.state,
          title = _this$state.title,
          description = _this$state.description,
          earnable = _this$state.earnable,
          limited = _this$state.limited,
          secret = _this$state.secret;

      if (this.state.showConfirm) {
        confirmPanel = react_default.a.createElement(confirm_panel_ConfirmPanel, {
          onConfirm: this.handleDelete,
          onCancel: function onCancel() {
            _this2.setState({
              showConfirm: false
            });
          }
        }, react_default.a.createElement("div", null, "Are you sure you want to delete this achievement?"));
      }

      if (this.state.showImagePanel) {
        imagePanel = react_default.a.createElement(image_panel_ImagePanel, {
          currentImage: this.state.iconPreview,
          icons: this.state.icons,
          onChange: this.handleIconChange,
          onConfirm: function onConfirm() {
            _this2.setState({
              showImagePanel: false
            });
          },
          onCancel: function onCancel() {
            _this2.setState({
              showImagePanel: false
            });
          }
        });
      } else {
        imagePanel = undefined;
      }

      if (this.state.edit) {
        deleteButton = react_default.a.createElement("img", {
          className: "delete-achievement-button",
          onClick: function onClick() {
            _this2.setState({
              showConfirm: true
            });
          },
          src: __webpack_require__(137)
        });
      }

      var customType;

      if (this.state.iconPreview) {
        imgPreviewContent = react_default.a.createElement("img", {
          src: this.state.iconPreview
        });
      } else {
        imgPreviewContent = react_default.a.createElement("div", {
          className: "currentIcon--placeholder"
        });
      }

      if (this.props.patreon && this.props.patreon.gold) {
        customType = react_default.a.createElement("option", {
          value: "4"
        }, "Custom");
        iconSection = react_default.a.createElement("div", {
          className: "formGroup icon-upload"
        }, react_default.a.createElement("label", {
          htmlFor: "achievement-icon"
        }, "Icon"), react_default.a.createElement("div", {
          className: "currentIcon",
          onClick: this.showImagePanel,
          onMouseEnter: function onMouseEnter() {
            _this2.toggleHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            _this2.toggleHover(false);
          }
        }, imgPreviewContent, react_default.a.createElement("div", {
          className: "hoverText",
          ref: function ref(hover) {
            return _this2.hover = hover;
          }
        }, "Click to Edit")));
      } else if (!this.state.loading) {
        customType = react_default.a.createElement("option", {
          disabled: true,
          title: "Unlocked wtih Gold Tier!",
          value: "4"
        }, "Custom (Unlocked with the Gold Tier!)");
        iconSection = react_default.a.createElement("div", {
          className: "formGroup upgradeTier"
        }, react_default.a.createElement("p", null, "Upload custom images for each of your achievements by upgrading to the Gold Tier on Patreon!"));
      }

      var pageHeader = "Create Achievement";

      if (this.props.match.params.achievementid) {
        pageHeader = "Edit Achievement";
      }

      content = react_default.a.createElement(template_Template, {
        spinner: {
          isLoading: this.state.fetch,
          fullscreen: true
        }
      }, react_default.a.createElement("div", {
        className: "achievement-wrapper"
      }, react_default.a.createElement("div", {
        className: "achievementPage-header"
      }, react_default.a.createElement("h2", null, pageHeader), react_default.a.createElement("span", null, deleteButton)), react_default.a.createElement("div", {
        className: "modal-error" + (this.state.error ? " modal-error--active" : "")
      }, this.state.error), react_default.a.createElement("h4", null, "Achievement Preview", react_default.a.createElement("span", {
        className: "help",
        title: "This is what your achievement looks like, based on the information below!"
      })), react_default.a.createElement("div", {
        className: "achievement-preview"
      }, react_default.a.createElement(src_components_achievement, {
        earned: true,
        achievement: this.state,
        defaultIcons: this.state.defaultIcons
      })), react_default.a.createElement("h4", null, "Achievement Info", react_default.a.createElement("span", {
        className: "help",
        title: "Basic information for your achievement!"
      })), react_default.a.createElement("form", {
        onSubmit: this.handleSubmit
      }, react_default.a.createElement("div", {
        className: "formGroup"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-title"
      }, "Name"), react_default.a.createElement("input", {
        id: "achievement-title",
        name: "title",
        className: "textInput",
        type: "text",
        value: this.state.title,
        onChange: this.handleDataChange
      })), react_default.a.createElement("div", {
        className: "formGroup"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-description"
      }, "Description"), react_default.a.createElement("input", {
        id: "achievement-description",
        name: "description",
        className: "textInput",
        type: "text",
        value: this.state.description,
        onChange: this.handleDataChange
      })), react_default.a.createElement("div", {
        className: "formGroup checkboxes"
      }, react_default.a.createElement("label", null, "Configuration"), react_default.a.createElement("div", {
        className: "checkboxes"
      }, react_default.a.createElement("div", {
        className: "checkbox"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-earnable",
        title: "This achievement can currently be earned"
      }, "Earnable"), react_default.a.createElement("div", null, react_default.a.createElement("input", {
        id: "achievement-earnable",
        name: "earnable",
        type: "checkbox",
        title: "This achievement can currently be earned",
        checked: this.state.earnable,
        onChange: this.handleDataChange
      }))), react_default.a.createElement("div", {
        className: "checkbox"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-limited",
        title: "This achievement can only be earned for a limited time"
      }, "Limited Time"), react_default.a.createElement("div", null, react_default.a.createElement("input", {
        id: "achievement-limited",
        name: "limited",
        type: "checkbox",
        title: "This achievement can only be earned for a limited time",
        checked: this.state.limited,
        onChange: this.handleDataChange
      }))), react_default.a.createElement("div", {
        className: "checkbox"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-secret",
        title: "This achievement will be a secret in your list until someone earns it!"
      }, "Secret"), react_default.a.createElement("div", null, react_default.a.createElement("input", {
        id: "achievement-secret",
        name: "secret",
        type: "checkbox",
        title: "This achievement will be a secret in your list until someone earns it!",
        checked: this.state.secret,
        onChange: this.handleDataChange
      }))))), react_default.a.createElement("h4", null, "Condition", react_default.a.createElement("span", {
        className: "help",
        title: "Sets what will trigger a community member to earn the achievement!"
      })), react_default.a.createElement("div", {
        className: "formGroup"
      }, react_default.a.createElement("label", {
        htmlFor: "achievement-code"
      }, "Type of Achievement"), react_default.a.createElement("select", {
        id: "achievement-code",
        name: "code",
        className: "selectInput",
        title: "The code of event that this achievement will be awarded for!",
        onChange: this.handleDataChange,
        value: this.state.code
      }, react_default.a.createElement("option", {
        value: ""
      }), react_default.a.createElement("option", {
        value: "0"
      }, "New Sub"), react_default.a.createElement("option", {
        value: "1"
      }, "Resub"), react_default.a.createElement("option", {
        value: "2"
      }, "Gifted Sub"), react_default.a.createElement("option", {
        value: "3"
      }, "Raid"), customType)), this.getConditionContent(), react_default.a.createElement("h4", {
        className: "noMargin"
      }, "Icon", react_default.a.createElement("span", {
        className: "help",
        title: "Upload an icon specific for your achievement! Leaving this blank will fall back on the one provided in your general settings!"
      })), iconSection, react_default.a.createElement("input", {
        type: "submit",
        className: "achievement-button submit-achievement",
        value: "Save"
      }), react_default.a.createElement("div", {
        className: "button-bank"
      }, react_default.a.createElement("button", {
        type: "button",
        className: "achievement-button",
        onClick: function onClick() {
          _this2.revert();
        }
      }, "Reset"), react_default.a.createElement("button", {
        type: "button",
        className: "achievement-button cancel-achievement-button",
        onClick: function onClick() {
          _this2.props.history.push('/manage/' + _this2.props.profile.username + '?tab=achievements');
        }
      }, "Cancel")), confirmPanel, imagePanel)));
      return content;
    }
  }]);

  return AchievementPage;
}(react_default.a.Component);

function achievement_page_headerMapStateToProps(state) {
  return {
    profile: state.profile,
    patreon: state.patreon
  };
}

/* harmony default export */ var routes_achievement_page = (connector(achievement_page_headerMapStateToProps)(achievement_page_AchievementPage));
// EXTERNAL MODULE: ./src/routes/channel-directory-page.css
var channel_directory_page = __webpack_require__(138);

// CONCATENATED MODULE: ./src/routes/channel-directory-page.js
function channel_directory_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { channel_directory_page_typeof = function _typeof(obj) { return typeof obj; }; } else { channel_directory_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return channel_directory_page_typeof(obj); }

function channel_directory_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function channel_directory_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function channel_directory_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) channel_directory_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) channel_directory_page_defineProperties(Constructor, staticProps); return Constructor; }

function channel_directory_page_possibleConstructorReturn(self, call) { if (call && (channel_directory_page_typeof(call) === "object" || typeof call === "function")) { return call; } return channel_directory_page_assertThisInitialized(self); }

function channel_directory_page_getPrototypeOf(o) { channel_directory_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return channel_directory_page_getPrototypeOf(o); }

function channel_directory_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function channel_directory_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) channel_directory_page_setPrototypeOf(subClass, superClass); }

function channel_directory_page_setPrototypeOf(o, p) { channel_directory_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return channel_directory_page_setPrototypeOf(o, p); }

function channel_directory_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var channel_directory_page_ChannelDirectoryPage =
/*#__PURE__*/
function (_React$Component) {
  channel_directory_page_inherits(ChannelDirectoryPage, _React$Component);

  function ChannelDirectoryPage(props) {
    var _this;

    channel_directory_page_classCallCheck(this, ChannelDirectoryPage);

    _this = channel_directory_page_possibleConstructorReturn(this, channel_directory_page_getPrototypeOf(ChannelDirectoryPage).call(this, props));

    channel_directory_page_defineProperty(channel_directory_page_assertThisInitialized(_this), "getChannels", function () {
      axios_default.a.get('http://api.streamachievements.com/api/channel/list').then(function (res) {
        console.log(res.data);

        _this.setState({
          channels: res.data
        });
      });
    });

    channel_directory_page_defineProperty(channel_directory_page_assertThisInitialized(_this), "filterList", function (event) {
      var updatedList = _this.state.channels;

      if (event.target.value === '') {
        //nothing in text box
        _this.setState({
          filteredChannels: false
        });
      } else {
        updatedList = updatedList.filter(function (channel) {
          return channel.owner.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        console.log(updatedList);

        _this.setState({
          filteredChannels: updatedList
        });
      }
    });

    channel_directory_page_defineProperty(channel_directory_page_assertThisInitialized(_this), "loadChannel", function (channel) {
      console.log(channel.owner);

      _this.props.history.push('/channel/' + channel.owner);
    });

    _this.state = {
      channels: []
    };
    return _this;
  }

  channel_directory_page_createClass(ChannelDirectoryPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getChannels();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var content;
      var channels = this.state.channels;

      if (!auth_utils_isAuthenticated()) {
        var Redirect = __webpack_require__(10).Redirect;

        return react_default.a.createElement(Redirect, {
          to: "/"
        });
      }

      if (Array.isArray(this.state.filteredChannels)) {
        //resultsTip = this.state.filteredChannels.length;
        channels = this.state.filteredChannels;
      }

      if (Array.isArray(channels)) {
        content = channels.map(function (channel, index) {
          return react_default.a.createElement("div", {
            key: "channel." + index,
            className: "channel-item",
            onClick: function onClick() {
              _this2.loadChannel(channel);
            }
          }, react_default.a.createElement("div", {
            className: "channel-item--logo"
          }, react_default.a.createElement("img", {
            src: channel.logo
          })), react_default.a.createElement("div", {
            className: "channel-item--name"
          }, channel.owner));
        });
      }

      return react_default.a.createElement("div", null, react_default.a.createElement(template_Template, null, react_default.a.createElement("div", {
        className: "main-content"
      }, react_default.a.createElement("div", {
        className: "directory-search"
      }, react_default.a.createElement("input", {
        type: "text",
        onChange: this.filterList,
        placeholder: "Search channels..."
      })), react_default.a.createElement("div", {
        className: "directory-results"
      }, react_default.a.createElement("div", {
        className: "channels"
      }, content)))));
    }
  }]);

  return ChannelDirectoryPage;
}(react_default.a.Component);

/* harmony default export */ var routes_channel_directory_page = (Object(withRouter["a" /* default */])(channel_directory_page_ChannelDirectoryPage));
// EXTERNAL MODULE: ./src/routes/create-channel-page.css
var create_channel_page = __webpack_require__(140);

// CONCATENATED MODULE: ./src/routes/create-channel-page.js
function create_channel_page_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { create_channel_page_typeof = function _typeof(obj) { return typeof obj; }; } else { create_channel_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return create_channel_page_typeof(obj); }

function create_channel_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create_channel_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function create_channel_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) create_channel_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) create_channel_page_defineProperties(Constructor, staticProps); return Constructor; }

function create_channel_page_possibleConstructorReturn(self, call) { if (call && (create_channel_page_typeof(call) === "object" || typeof call === "function")) { return call; } return create_channel_page_assertThisInitialized(self); }

function create_channel_page_getPrototypeOf(o) { create_channel_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return create_channel_page_getPrototypeOf(o); }

function create_channel_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function create_channel_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) create_channel_page_setPrototypeOf(subClass, superClass); }

function create_channel_page_setPrototypeOf(o, p) { create_channel_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return create_channel_page_setPrototypeOf(o, p); }

function create_channel_page_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var create_channel_page_CreateChannelPage =
/*#__PURE__*/
function (_React$Component) {
  create_channel_page_inherits(CreateChannelPage, _React$Component);

  function CreateChannelPage(props) {
    var _this;

    create_channel_page_classCallCheck(this, CreateChannelPage);

    _this = create_channel_page_possibleConstructorReturn(this, create_channel_page_getPrototypeOf(CreateChannelPage).call(this, props));

    create_channel_page_defineProperty(create_channel_page_assertThisInitialized(_this), "handleUpdate", function (evt) {
      var field = evt.target;

      _this.setState({
        validated: field.value === 'ACHIEVEMENT'
      });
    });

    create_channel_page_defineProperty(create_channel_page_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();
      axios_default.a.post('http://api.streamachievements.com/api/channel/signup').then(function (res) {
        if (res.data.error) {} else {
          _this.setState({
            received: true
          });
        }
      });
    });

    _this.state = {
      validated: false,
      received: false
    };
    return _this;
  }

  create_channel_page_createClass(CreateChannelPage, [{
    key: "render",
    value: function render() {
      var content;

      if (this.props.profile) {
        if (this.props.profile.status === 'verified') {
          return react_default.a.createElement(es_Redirect["a" /* default */], {
            to: "/manage/"
          });
        }

        var user = this.props.profile.username;
        var form;

        if (this.state.received) {
          form = react_default.a.createElement("div", null, react_default.a.createElement("h4", null, "We got you jotted down! Keep an eye out for your confirmation email!!"), react_default.a.createElement(Link["a" /* default */], {
            className: "home",
            to: "/home"
          }, "Back to Home"));
        } else {
          form = react_default.a.createElement("form", {
            className: "confirmForm",
            onSubmit: this.onSubmit
          }, react_default.a.createElement("input", {
            type: "text",
            name: "confirm",
            onChange: this.handleUpdate
          }), react_default.a.createElement("button", {
            disabled: !this.state.validated ? 'disabled' : ''
          }, "Send"));
        }

        content = react_default.a.createElement("div", {
          className: "main-content createChannel--wrapper"
        }, react_default.a.createElement("h3", null, "Thank you for your interest in wanting to provide achievements to the community, ".concat(user, "!")), react_default.a.createElement("p", null, "To send your confirmation, just type the word 'ACHIEVEMENT' in the box below!"), react_default.a.createElement("p", null, "Once received, we will review your Stream channel to confirm activity! Once we have the confirmation, you will receive an email with a validation code to start creating achievements!"), form);
      }

      return react_default.a.createElement(template_Template, null, content);
    }
  }]);

  return CreateChannelPage;
}(react_default.a.Component);

function create_channel_page_headerMapStateToProps(state) {
  return {
    profile: state.profile
  };
}

/* harmony default export */ var routes_create_channel_page = (connector(create_channel_page_headerMapStateToProps)(create_channel_page_CreateChannelPage));
// EXTERNAL MODULE: ./src/routes/admin-panel.css
var admin_panel = __webpack_require__(142);

// CONCATENATED MODULE: ./src/routes/admin-panel.js
function admin_panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { admin_panel_typeof = function _typeof(obj) { return typeof obj; }; } else { admin_panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return admin_panel_typeof(obj); }

function admin_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function admin_panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function admin_panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) admin_panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) admin_panel_defineProperties(Constructor, staticProps); return Constructor; }

function admin_panel_possibleConstructorReturn(self, call) { if (call && (admin_panel_typeof(call) === "object" || typeof call === "function")) { return call; } return admin_panel_assertThisInitialized(self); }

function admin_panel_getPrototypeOf(o) { admin_panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return admin_panel_getPrototypeOf(o); }

function admin_panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function admin_panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) admin_panel_setPrototypeOf(subClass, superClass); }

function admin_panel_setPrototypeOf(o, p) { admin_panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return admin_panel_setPrototypeOf(o, p); }

function admin_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var admin_panel_AdminPanel =
/*#__PURE__*/
function (_React$Component) {
  admin_panel_inherits(AdminPanel, _React$Component);

  function AdminPanel(props) {
    var _this;

    admin_panel_classCallCheck(this, AdminPanel);

    _this = admin_panel_possibleConstructorReturn(this, admin_panel_getPrototypeOf(AdminPanel).call(this, props));

    admin_panel_defineProperty(admin_panel_assertThisInitialized(_this), "approveMember", function (evt, name) {
      evt.preventDefault();
      axios_default.a.post('http://api.streamachievements.com/api/channel/confirm', {
        name: name
      }, function (res) {
        console.log(res);
      });
    });

    _this.state = {
      notice: '',
      users: null
    };
    return _this;
  }

  admin_panel_createClass(AdminPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios_default.a.get('http://api.streamachievements.com/api/users').then(function (res) {
        _this2.setState({
          users: res.data.users || []
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.props.profile && !this.props.profile.type === 'admin') {
        return react_default.a.createElement(es_Redirect["a" /* default */], {
          to: "/home"
        });
      }

      var newCCContent, pendingCCContent;

      if (this.state.users) {
        var users = this.state.users.map(function (member, index) {
          return react_default.a.createElement("div", {
            key: 'pendingMember-' + index,
            className: "pendingMember"
          }, react_default.a.createElement("div", {
            className: "member-logo"
          }, react_default.a.createElement("img", {
            alt: "",
            src: member.logo
          })), react_default.a.createElement("div", {
            className: "member-mobileWrapper"
          }, react_default.a.createElement("div", {
            className: "member-info"
          }, member.name, react_default.a.createElement("a", {
            title: 'Go to ' + member.name + '\'s channel on Twitch!',
            href: "https://twitch.tv/" + member.name,
            target: "_blank"
          }, react_default.a.createElement("img", {
            src: "https://res.cloudinary.com/phirehero/image/upload/v1553267941/GlitchBadge_Purple_24px.png"
          }))), react_default.a.createElement("div", {
            className: "member-action"
          }, react_default.a.createElement("a", {
            className: "approve",
            href: "",
            onClick: function onClick(e) {
              _this3.approveMember(e, member.name);
            }
          }, react_default.a.createElement("img", {
            src: __webpack_require__(144)
          })), react_default.a.createElement("a", {
            className: "deny",
            href: ""
          }, react_default.a.createElement("img", {
            src: __webpack_require__(145)
          })))));
        });
        newCCContent = react_default.a.createElement("div", null, react_default.a.createElement("h3", null, "Pending Users"), react_default.a.createElement("div", {
          className: "pendingMembers-wrapper"
        }, users));
        pendingCCContent = react_default.a.createElement("div", null, react_default.a.createElement("h3", null, "Waiting For Verification"), react_default.a.createElement("div", {
          className: "pendingMembers-wrapper"
        }));
      }

      var tabIndex = 0;
      return react_default.a.createElement(template_Template, null, react_default.a.createElement("div", {
        className: "manage-container"
      }, react_default.a.createElement("h2", null, "Admin Panel"), react_default.a.createElement(notice_Notice, {
        message: this.state.notice,
        onClear: this.clearNotice
      }), react_default.a.createElement(Tabs_Tabs, {
        defaultIndex: tabIndex
      }, react_default.a.createElement(TabList_TabList, {
        className: "manage-tabs"
      }, react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "New Content Creators"), react_default.a.createElement(Tab_Tab, {
        className: "manage-tab"
      }, "Pending Creation")), react_default.a.createElement(TabPanel_TabPanel, null, newCCContent), react_default.a.createElement(TabPanel_TabPanel, null, pendingCCContent))));
    }
  }]);

  return AdminPanel;
}(react_default.a.Component);

function admin_panel_headerMapStateToProps(state) {
  return {
    profile: state.profile
  };
}

/* harmony default export */ var routes_admin_panel = (connector(admin_panel_headerMapStateToProps)(admin_panel_AdminPanel));
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/BrowserRouter.js
var BrowserRouter = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/redux-thunk/es/index.js
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
/* harmony default export */ var redux_thunk_es = (thunk);
// CONCATENATED MODULE: ./src/redux/store.js



var store_store = createStore(ProfileReducer, applyMiddleware(redux_thunk_es));
/* harmony default export */ var redux_store = (store_store);
// CONCATENATED MODULE: ./src/index.js














 //Redux



var rootElem = document.getElementById('root');
var src_app_0 = react_default.a.createElement(BrowserRouter["a" /* default */], null, react_default.a.createElement(components_Provider, {
  store: redux_store
}, react_default.a.createElement(src_app, null, react_default.a.createElement(Switch["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
  path: "/",
  exact: true,
  component: landing_page_LandingPage
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/home",
  component: home_page_HomePage
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/profile",
  component: routes_profile_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/directory",
  component: routes_channel_directory_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/admin",
  component: routes_admin_panel
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/manage/achievement/:achievementid",
  component: routes_achievement_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/manage/achievement",
  component: routes_achievement_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/manage/",
  component: routes_manage_channel
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/channel/verify",
  component: routes_verify_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/channel/create",
  component: routes_create_channel_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/channel/:channelid",
  component: routes_channel_page
}), react_default.a.createElement(Route["a" /* default */], {
  path: "/support",
  component: support_page
})))));

if (rootElem.hasChildNodes()) {
  Object(react_dom["hydrate"])(src_app_0, rootElem);
} else {
  Object(react_dom["render"])(src_app_0, rootElem);
}

/***/ })
/******/ ]);