(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GranifyReduxMiddleware"] = factory();
	else
		root["GranifyReduxMiddleware"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	// Flag to track so we only show the warning once and don't spam the console.
	var warningShown = false;
	var granifyMiddleware = function granifyMiddleware(store) {
	  return function (next) {
	    return function (action) {
	      var result = next(action);
	      var currentState = store.getState();

	      if (!window.Granify || !window.Granify._functionsAvailable) {
	        // possibly have a queue until Granify is ready
	        return result;
	      }

	      // We do not have the correct version of Granify Enabled on the site
	      if (typeof window.Granify.trackRedux !== 'function') {
	        if (!warningShown) {
	          warningShown = true;

	          /* eslint-disable */
	          console.warn('Granify Redux Middleware: Please ensure the latest version of Granify is running. Contact support for more information');
	          /* eslint-enable */
	        }

	        return result;
	      }

	      // Send to external Granify Method
	      window.Granify.trackRedux(action, currentState);

	      return result;
	    };
	  };
	};

	exports['default'] = granifyMiddleware;

/***/ })
/******/ ])
});
;