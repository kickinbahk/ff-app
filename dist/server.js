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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shopify_app_bridge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shopify/app-bridge */ \"@shopify/app-bridge\");\n/* harmony import */ var _shopify_app_bridge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shopify/app-bridge/actions */ \"@shopify/app-bridge/actions\");\n/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var shopify_api_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shopify-api-node */ \"shopify-api-node\");\n/* harmony import */ var shopify_api_node__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(shopify_api_node__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n      DIST_DIR = __dirname,\n      HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html');\n\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nconst cookie = __webpack_require__(/*! cookie */ \"cookie\");\n\nconst nonce = __webpack_require__(/*! nonce */ \"nonce\")();\n\nconst querystring = __webpack_require__(/*! querystring */ \"querystring\");\n\nconst request = __webpack_require__(/*! request-promise */ \"request-promise\");\n\nconst apiKey = process.env.SHOPIFY_API_KEY;\nconst apiSecret = process.env.SHOPIFY_API_SECRET;\nconst scopes = 'read_products';\nconst forwardingAddress = \"https://fundflakes-app.herokuapp.com\"; // Replace this with your HTTPS Forwarding address\n\nconst permissionUrl = `/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${forwardingAddress}`;\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(DIST_DIR));\napp.get('/', (req, res) => {\n  res.sendFile(HTML_FILE);\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => {\n  console.log(`App listening to ${PORT}....`);\n  console.log('Press Ctrl+C to quit.');\n});\napp.get('/shopify', (req, res) => {\n  const shop = req.query.shop;\n\n  if (shop) {\n    const state = nonce();\n    const redirectUri = forwardingAddress + '/shopify/callback';\n    const installUrl = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey + '&scope=' + scopes + '&state=' + state + '&redirect_uri=' + redirectUri;\n    res.cookie('state', state);\n    res.redirect(installUrl);\n  } else {\n    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');\n  }\n});\napp.get('/shopify/callback', (req, res) => {\n  const {\n    shop,\n    hmac,\n    code,\n    state\n  } = req.query;\n  const stateCookie = cookie.parse(req.headers.cookie).state;\n\n  if (state !== stateCookie) {\n    return res.status(403).send('Request origin cannot be verified');\n  }\n\n  if (shop && hmac && code) {\n    const map = Object.assign({}, req.query);\n    delete map['signature'];\n    delete map['hmac'];\n    const message = querystring.stringify(map);\n    const providedHmac = Buffer.from(hmac, 'utf-8');\n    const generatedHash = Buffer.from(crypto.createHmac('sha256', apiSecret).update(message).digest('hex'), 'utf-8');\n    let hashEquals = false; // timingSafeEqual will prevent any timing attacks. Arguments must be buffers\n\n    try {\n      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac); // timingSafeEqual will return an error if the input buffers are not the same length.\n    } catch (e) {\n      hashEquals = false;\n    }\n\n    ;\n\n    if (!hashEquals) {\n      return res.status(400).send('HMAC validation failed');\n    }\n\n    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';\n    const accessTokenPayload = {\n      client_id: apiKey,\n      client_secret: apiSecret,\n      code\n    };\n    request.post(accessTokenRequestUrl, {\n      json: accessTokenPayload\n    }).then(accessTokenResponse => {\n      const accessToken = accessTokenResponse.access_token;\n      const shopRequestUrl = 'https://' + shop + '/admin/shop.json';\n      const shopRequestHeaders = {\n        'X-Shopify-Access-Token': accessToken\n      };\n      request.get(shopRequestUrl, {\n        headers: shopRequestHeaders\n      }).then(shopResponse => {\n        const shopify = new shopify_api_node__WEBPACK_IMPORTED_MODULE_4___default.a({\n          shopName: shop,\n          apiKey: apiKey\n        });\n        const adminApp = _shopify_app_bridge__WEBPACK_IMPORTED_MODULE_2___default()({\n          apiKey: apiKey,\n          shopOrigin: shopify.shopName\n        });\n        const toastOptions = {\n          message: 'Product saved',\n          duration: 5000\n        };\n        const toastNotice = _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Toast\"].create(adminApp, toastOptions);\n        toastNotice.subscribe(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Toast\"].Action.SHOW, data => {\n          // Do something with the show action\n          res.end(\"This is for the admin\");\n        });\n        toastNotice.subscribe(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Toast\"].Action.CLEAR, data => {\n          // Do something with the clear action\n          res.end(\"This is for the admin2\");\n        }); // Dispatch the show Toast action, using the toastOptions above\n\n        toastNotice.dispatch(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Toast\"].Action.SHOW);\n        _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"].create(adminApp).dispatch(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"].Action.ADMIN_PATH, permissionUrl);\n      }).catch(error => {\n        res.status(error.statusCode).send(error.error.error_description);\n      });\n    }).catch(error => {\n      res.status(error.statusCode).send(error.error.error_description);\n    });\n  } else {\n    res.status(400).send('Required parameters missing');\n  }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "@shopify/app-bridge":
/*!**************************************!*\
  !*** external "@shopify/app-bridge" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@shopify/app-bridge\");\n\n//# sourceURL=webpack:///external_%22@shopify/app-bridge%22?");

/***/ }),

/***/ "@shopify/app-bridge/actions":
/*!**********************************************!*\
  !*** external "@shopify/app-bridge/actions" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@shopify/app-bridge/actions\");\n\n//# sourceURL=webpack:///external_%22@shopify/app-bridge/actions%22?");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie\");\n\n//# sourceURL=webpack:///external_%22cookie%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "nonce":
/*!************************!*\
  !*** external "nonce" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nonce\");\n\n//# sourceURL=webpack:///external_%22nonce%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"querystring\");\n\n//# sourceURL=webpack:///external_%22querystring%22?");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request-promise\");\n\n//# sourceURL=webpack:///external_%22request-promise%22?");

/***/ }),

/***/ "shopify-api-node":
/*!***********************************!*\
  !*** external "shopify-api-node" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"shopify-api-node\");\n\n//# sourceURL=webpack:///external_%22shopify-api-node%22?");

/***/ })

/******/ });