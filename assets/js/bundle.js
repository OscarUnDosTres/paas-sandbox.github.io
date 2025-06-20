(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = exports.InvalidTokenError = void 0;
class InvalidTokenError extends Error {
}
exports.InvalidTokenError = InvalidTokenError;
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    }
    catch (err) {
        return atob(output);
    }
}
function jwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }
    let decoded;
    try {
        decoded = base64UrlDecode(part);
    }
    catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
        return JSON.parse(decoded);
    }
    catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
    }
}
exports.jwtDecode = jwtDecode;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiClient = exports.ApiResponse = void 0;
var _apiErrors = require("./api.errors.js");
var _env = _interopRequireDefault(require("../config/env.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); } /**
 * api.client.js
 * * A centralized, intelligent client for all backend API communications.
 * - Automatically adds authentication headers ('Authorization', 'x-api-key').
 * - Handles the token refresh lifecycle.
 * - Parses the standard API response structure { message, data, error }.
 * - Maps business logic errors to user-friendly messages.
 * - Returns a standardized ApiResponse object for predictable handling in the app.
 */
// A standardized response object for the application layers to use.
var ApiResponse = exports.ApiResponse = /*#__PURE__*/_createClass(function ApiResponse(success, data) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  _classCallCheck(this, ApiResponse);
  this.success = success;
  this.data = data;
  this.error = error; // error is an object { code, message }
});
var apiClient = exports.apiClient = {
  TRANSACTION_BASE_URL: _env["default"].TRANSACTION_BASE_URL,
  USERS_BASE_URL: _env["default"].USERS_BASE_URL,
  OAUTH_BASE_URL: _env["default"].OAUTH_BASE_URL,
  /**
   * Performs the actual AJAX request, including auth and error handling.
   * This is a private method intended for internal use by get, post, etc.
   */
  _request: function _request(endpoint, method) {
    var _arguments = arguments,
      _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var body, accessToken, handle401AndRetry, response, errorCode, errorMessage, _errorMessage;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            body = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : null;
            accessToken = localStorage.getItem('accessToken'); // --- Internal function to handle token refreshing ---
            handle401AndRetry = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var refreshToken, refreshResponse, newAccessToken;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      console.warn('Access token expired or invalid. Attempting to refresh...');
                      refreshToken = localStorage.getItem('refreshToken');
                      if (refreshToken) {
                        _context.next = 6;
                        break;
                      }
                      console.error('No refresh token available. Redirecting to login.');
                      window.location.href = '/auth/login.html'; // Or your app's login page
                      return _context.abrupt("return", new ApiResponse(false, null, {
                        code: 'NO_REFRESH_TOKEN',
                        message: 'No refresh token.'
                      }));
                    case 6:
                      _context.prev = 6;
                      _context.next = 9;
                      return $.ajax({
                        url: "".concat(_this.OAUTH_BASE_URL, "/token/refresh"),
                        // <-- UPDATE REFRESH ENDPOINT
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                          refreshToken: refreshToken
                        })
                      });
                    case 9:
                      refreshResponse = _context.sent;
                      if (!refreshResponse.error) {
                        _context.next = 12;
                        break;
                      }
                      throw new Error(refreshResponse.error);
                    case 12:
                      newAccessToken = refreshResponse.data.accessToken;
                      localStorage.setItem('accessToken', newAccessToken);
                      console.log('Token refreshed successfully.');

                      // IMPORTANT: Retry the original request with the new token
                      return _context.abrupt("return", _this._request(endpoint, method, body));
                    case 18:
                      _context.prev = 18;
                      _context.t0 = _context["catch"](6);
                      console.error('Failed to refresh token. Redirecting to login.', _context.t0);
                      localStorage.clear(); // Clear stale tokens
                      window.location.href = '/auth/login.html';
                      return _context.abrupt("return", new ApiResponse(false, null, {
                        code: 'AUTH_REFRESH_FAILED',
                        message: _apiErrors.apiErrorMap['AUTH_REFRESH_FAILED']
                      }));
                    case 24:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, null, [[6, 18]]);
              }));
              return function handle401AndRetry() {
                return _ref.apply(this, arguments);
              };
            }(); // --- Main AJAX Call ---
            _context2.prev = 3;
            _context2.next = 6;
            return $.ajax({
              url: endpoint,
              method: method,
              contentType: 'application/json',
              headers: {
                'Authorization': "Bearer ".concat(accessToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'SESSID': 'asdasdasdasdasd'
              },
              data: body ? JSON.stringify(body) : null
            });
          case 6:
            response = _context2.sent;
            if (!response.error) {
              _context2.next = 12;
              break;
            }
            errorCode = response.error;
            errorMessage = _apiErrors.apiErrorMap[errorCode] || _apiErrors.apiErrorMap['DEFAULT'];
            console.error("API Business Error: ".concat(errorCode, " - ").concat(errorMessage));
            return _context2.abrupt("return", new ApiResponse(false, null, {
              code: errorCode,
              message: errorMessage
            }));
          case 12:
            return _context2.abrupt("return", new ApiResponse(true, response.data, null));
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](3);
            if (!(_context2.t0.status === 401)) {
              _context2.next = 21;
              break;
            }
            _context2.next = 20;
            return handle401AndRetry();
          case 20:
            return _context2.abrupt("return", _context2.sent);
          case 21:
            _errorMessage = "HTTP Error ".concat(_context2.t0.status, ": ").concat(_context2.t0.statusText);
            console.error(_errorMessage, _context2.t0.responseJSON);
            return _context2.abrupt("return", new ApiResponse(false, null, {
              code: "HTTP_".concat(_context2.t0.status),
              message: _errorMessage
            }));
          case 24:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 15]]);
    }))();
  },
  /** Public Methods (GET, POST, etc.) **/
  get: function get(endpoint) {
    return this._request(endpoint, 'GET');
  },
  post: function post(endpoint, body) {
    return this._request(endpoint, 'POST', body);
  },
  put: function put(endpoint, body) {
    return this._request(endpoint, 'PUT', body);
  },
  "delete": function _delete(endpoint) {
    return this._request(endpoint, 'DELETE');
  }
};

},{"../config/env.js":4,"./api.errors.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiErrorMap = void 0;
/**
 * api.errors.js
 * * This file contains a map of known API error codes to user-friendly,
 * readable messages. This allows for centralized error message management.
 */
var apiErrorMap = exports.apiErrorMap = {
  'PAAS_INC_DATA_001': 'Inconsistent data was found. Please contact support.',
  'PAAS_INC_DATA_002': 'The specified account could not be found.',
  'PAAS_INC_DATA_003': 'The account configuration is missing. Please set up your account.',
  'PAAS_ACC_VAL_004': 'The maximum number of customers has been exceeded for this account.',
  // Add other generic or common errors here
  'AUTH_TOKEN_EXPIRED': 'Your session has expired. Please log in again.',
  'AUTH_REFRESH_FAILED': 'Your session could not be renewed. Please log in again.',
  'DEFAULT': 'An unexpected error occurred. Please try again later.'
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * src/config/env.js
 *
 * This file defines environment-specific configuration variables for the frontend.
 * For production builds, this file is typically overridden by the CI/CD pipeline.
 */
var env = {
  // API Base URLs
  // These will be replaced by your AWS pipeline for production builds.
  TRANSACTION_BASE_URL: 'https://revamp-transaction.undostres.com.mx/api/v1/paas/admin',
  USERS_BASE_URL: 'https://revamp-users.undostres.com.mx/api/v1/paas/admin',
  OAUTH_BASE_URL: 'https://revamp-oauth.undostres.com.mx/api/v1/paas/admin' // This is your login/refresh API base

  // Other environment variables can go here
  // ANALYTICS_ENABLED: true,
  // FEATURE_FLAG_X: false,
};

// Export the env object so it can be imported and used throughout your application.
var _default = exports["default"] = env;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUtils = void 0;
var fileUtils = exports.fileUtils = {
  /**
   * Triggers the download of a file in the browser.
   * @param {string} content The file content as a string.
   * @param {string} filename The desired filename.
   * @param {string} mimeType The MIME type of the file.
   */
  downloadFile: function downloadFile(content, filename, mimeType) {
    var blob = new Blob([content], {
      type: mimeType
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the object URL
  }
};

},{}],6:[function(require,module,exports){
"use strict";

require("./modules/spei/index");
require("./modules/auth/index");
require("./modules/home/index");
require("./modules/customer/index");
require("./modules/checkout/index");
/**
 * main.js
 *
 * This is the single entry point for the entire application.
 * The Browserify build process starts here and follows all imports.
 */

// Import the main logic for the spei module.
// SPEI module entry point
// Authentication module entry point
// Home module entry point
// Customer module entry point
// Checkout Orders module entry point
// Import any other primary modules here in the future.

console.log("✅ Main application entry point (main.js) loaded.");

},{"./modules/auth/index":9,"./modules/checkout/index":14,"./modules/customer/index":21,"./modules/home/index":28,"./modules/spei/index":34}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authApi = void 0;
var _apiClient = require("../../../core/api/api.client.js");
/**
 * auth.api.js
 *
 * This file handles the raw API calls for authentication endpoints.
 */

var authApi = exports.authApi = {
  /**
   * Sends user credentials via Basic Authentication to the login endpoint.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>} A direct jQuery Ajax promise, as this call doesn't use standard _request.
   */
  login: function login(email, password) {
    var credentials = btoa("".concat(email, ":").concat(password)); // Base64 encode
    return $.ajax({
      url: "".concat(_apiClient.apiClient.OAUTH_BASE_URL, "/login"),
      // Your login endpoint
      method: 'POST',
      headers: {
        'Authorization': "Basic ".concat(credentials) // Basic Auth header
      }
    });
  },
  /**
   * Sends the refresh token as a Bearer token to get a new access token.
   * NOTE: This is primarily called by the apiClient's refresh logic.
   * @param {string} refreshToken
   * @returns {Promise<any>} A direct jQuery Ajax promise.
   */
  refresh: function refresh(refreshToken) {
    return $.ajax({
      url: "".concat(_apiClient.apiClient.OAUTH_BASE_URL, "/token/refresh"),
      // Your refresh endpoint
      method: 'POST',
      headers: {
        'Authorization': "Bearer ".concat(refreshToken)
      }
    });
  }
};

},{"../../../core/api/api.client.js":2}],8:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authService = void 0;
var _authApi = require("../data/auth.api.js");
var _jwtDecode = require("jwt-decode");
var _userProfileModel = require("../models/user-profile.model.js");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * auth.service.js
 *
 * This file handles the business logic for authentication, such as
 * storing and clearing tokens.
 */ // Import the jwt-decode library
// Import the new UserProfile class

var USER_PROFILE_KEY = 'userProfile';
var authService = exports.authService = {
  /**
   * Attempts to log in the user and stores tokens upon success.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>} True on successful login, false otherwise.
   */
  login: function () {
    var _login = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
      var response, rawProfileData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _authApi.authApi.login(email, password);
          case 3:
            response = _context.sent;
            console.log(response);
            // Assuming your API response is { message: "SUCCESS", data: { accessToken, refreshToken }, error: null }
            if (!(response && response.data && response.message === "SUCCESS")) {
              _context.next = 11;
              break;
            }
            // Store tokens securely in localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            // Store user profile data
            rawProfileData = {
              name: response.data.name,
              email: response.data.email,
              active: response.data.active,
              roles: response.data.roles
            };
            localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(rawProfileData));
            return _context.abrupt("return", true);
          case 11:
            console.error("Login failed:", (response === null || response === void 0 ? void 0 : response.error) || "Unknown error");
            return _context.abrupt("return", false);
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.error("Login API call failed:", _context.t0);
            // Handle specific HTTP errors (e.g., 401 Unauthorized)
            if (!(_context.t0.status === 401)) {
              _context.next = 20;
              break;
            }
            return _context.abrupt("return", false);
          case 20:
            return _context.abrupt("return", false);
          case 21:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 15]]);
    }));
    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }
    return login;
  }(),
  /**
   * Logs the user out by clearing stored tokens.
   */
  logout: function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('dashboardSummaryCache');
    localStorage.removeItem(USER_PROFILE_KEY); // Clear user profile data
    // Redirect to login page. Ensure this path is correct for your setup.
    window.location.href = '/auth/login.html';
  },
  /**
   * Retrieves the currently logged-in user's profile.
   * @returns {UserProfile|null} The UserProfile object, or null if not found.
   */
  getUserProfile: function getUserProfile() {
    var profileString = localStorage.getItem(USER_PROFILE_KEY);
    if (!profileString) {
      return null;
    }
    try {
      var rawProfile = JSON.parse(profileString);
      return new _userProfileModel.UserProfile(rawProfile); // Instantiate the UserProfile class
    } catch (e) {
      console.error("Error parsing user profile from localStorage:", e);
      this.logout(); // Corrupted profile data, force logout
      return null;
    }
  },
  /**
   * Checks if a user is currently authenticated by verifying both the presence
   * of an access token and the validity (expiration) of the refresh token.
   * @returns {boolean} True if authenticated, false otherwise.
   */
  isAuthenticated: function isAuthenticated() {
    console.log("Checking authentication status.");
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');
    var userProfile = localStorage.getItem(USER_PROFILE_KEY); // Check for profile too

    if (!accessToken || !refreshToken || !userProfile) {
      console.log("No access or refresh token found.");
      this.logout();
      return false; // No tokens present
    }
    try {
      console.log("Tokens to decode:", refreshToken);
      // Decode the refresh token to check its expiration
      var decodedRefreshToken = (0, _jwtDecode.jwtDecode)(refreshToken);

      // JWT `exp` claim is in seconds, Date.now() is in milliseconds
      var currentTime = Date.now() / 1000;
      if (decodedRefreshToken.exp < currentTime) {
        console.log("Refresh token expired. User is not authenticated.");
        // If the refresh token is expired, we can't renew the session, so force logout.
        this.logout();
        return false;
      }
      console.log("Access and refresh tokens found and refresh token is valid.");
      return true; // Tokens are present and refresh token is not expired
    } catch (error) {
      // This catches errors like malformed tokens
      console.error("Error decoding refresh token or invalid token format:", error);
      this.logout(); // Corrupted token, force logout
      return false;
    }
  }
};

},{"../data/auth.api.js":7,"../models/user-profile.model.js":10,"jwt-decode":1}],9:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _authService = require("./domain/auth.service.js");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * src/modules/auth/index.js
 *
 * This file handles the client-side logic for the authentication pages,
 * primarily the login form submission.
 */
$(document).ready(function () {
  // --- Global Authentication Guard ---
  // If we are on a page that is NOT the login page and the user is NOT authenticated,
  // redirect them to the login page.
  var isLoginPage = window.location.pathname.includes('auth/login.html'); // Ensure this path matches your login page
  if (!isLoginPage && !_authService.authService.isAuthenticated()) {
    console.log("not loged in making redirection.");
    _authService.authService.logout(); // This will clear any partial tokens and redirect
    return; // Stop further execution for unauthenticated users
  }

  // Only run this logic on the login page
  var loginForm = $('#login-form');
  if (loginForm.length > 0) {
    // Password visibility toggle
    $("[data-password]").on("click", function () {
      if ($(this).attr("data-password") == "false") {
        $(this).attr("data-password", "true");
        $(this).closest(".input-group-merge").find("input").attr("type", "text");
      } else {
        $(this).attr("data-password", "false");
        $(this).closest(".input-group-merge").find("input").attr("type", "password");
      }
    });

    // Remember Me functionality
    var emailInput = $('#email');
    var rememberMeCheckbox = $('#checkbox-signin');
    var rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      emailInput.val(rememberedEmail);
      rememberMeCheckbox.prop('checked', true);
    }
    loginForm.on('submit', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var email, password, errorAlert, submitButton, loginSuccess;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); // Prevent traditional form submission

              if (rememberMeCheckbox.is(':checked')) {
                localStorage.setItem('rememberedEmail', emailInput.val());
              } else {
                localStorage.removeItem('rememberedEmail');
              }
              email = $('#email').val(); // Ensure your HTML input has id="email"
              password = $('#password').val(); // Ensure your HTML input has id="password"
              errorAlert = $('#login-error-alert'); // Element to display errors
              submitButton = $('#login-submit-button'); // Ensure your HTML button has id="login-submit-button"
              // Disable button and show loading state
              submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Logging In...');
              errorAlert.hide().text(''); // Clear previous errors
              _context.next = 10;
              return _authService.authService.login(email, password);
            case 10:
              loginSuccess = _context.sent;
              if (loginSuccess) {
                // On success, redirect to the dashboard
                window.location.href = '/index.html'; // Or your main dashboard page
              } else {
                // On failure, show an error message
                errorAlert.text('Login failed. Please check your credentials or try again later.').show();
                // Re-enable the button
                submitButton.prop('disabled', false).text('Log In');
              }
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    // No return needed here, as this is the only logic in this file
    return;
  }

  // handle logout
  var logoutBtn = $('#logout-btn');
  if (logoutBtn.length > 0) {
    logoutBtn.on('click', function (e) {
      e.preventDefault();
      _authService.authService.logout(); // This will clear tokens and redirect to login
    });
  }
  var logoutBtnProfile = $('#logout-btn-profile');
  if (logoutBtnProfile.length > 0) {
    logoutBtnProfile.on('click', function (e) {
      console.log("logout button clicked.");
      e.preventDefault();
      _authService.authService.logout(); // This will clear tokens and redirect to login
    });
  }
});

},{"./domain/auth.service.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfile = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * src/modules/auth/user-profile.model.js
 *
 * Defines the UserProfile class, representing the domain model for
 * the currently authenticated user's profile data.
 */
var UserProfile = exports.UserProfile = /*#__PURE__*/function () {
  /**
   * @param {object} rawData - The raw user profile object from authentication response.
   * @param {string} rawData.name
   * @param {string} rawData.email
   * @param {boolean} rawData.active
   * @param {string[]} rawData.roles
   */
  function UserProfile(_ref) {
    var name = _ref.name,
      email = _ref.email,
      active = _ref.active,
      roles = _ref.roles;
    _classCallCheck(this, UserProfile);
    /** @type {string} */
    this.name = name;
    /** @type {string} */
    this.email = email;
    /** @type {boolean} */
    this.active = active;
    /** @type {string[]} */
    this.roles = roles || [];
  }

  /**
   * Checks if the user has a specific role.
   * @param {string} roleName - The name of the role to check (e.g., 'ADMIN', 'VIEWER').
   * @returns {boolean}
   */
  return _createClass(UserProfile, [{
    key: "hasRole",
    value: function hasRole(roleName) {
      return this.roles.includes(roleName.toUpperCase());
    }

    /**
     * Checks if the user is an admin.
     * @returns {boolean}
     */
  }, {
    key: "isAdmin",
    value: function isAdmin() {
      return this.hasRole('ADMIN');
    }

    /**
     * Returns the user's full name.
     * @returns {string}
     */
  }, {
    key: "getFullName",
    value: function getFullName() {
      return this.name; // Assuming 'name' already contains the full name
    }
  }]);
}();

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutApi = void 0;
var _apiClient = require("../../../core/api/api.client.js");
/**
 * spei.api.js
 *
 * This file uses the centralized apiClient to make specific requests
 * for the SPEI module. It no longer contains any direct ajax calls.
 */

var checkoutApi = exports.checkoutApi = {
  /**
   * Fetches a paginated list of Checkout Orders Catalog Items.
   * @param {number} page The page number to fetch (0-indexed).
   * @param {number} pageSize The number of items per page.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getCatalog: function getCatalog(_ref) {
    var page = _ref.page,
      pageSize = _ref.pageSize;
    if (page == null) {
      page = 0;
    }
    if (pageSize == null) {
      pageSize = 10; // Default page size if not provided
    }
    var params = new URLSearchParams({
      page: page,
      page_size: pageSize
    });
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/checkout/catalog?").concat(params.toString());
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  },
  /**
   * Fetches a paginated list of Checkout Orders.
   * @param {number} page The page number to fetch (0-indexed).
   * @param {number} pageSize The number of items per page.
   * @param filters {Object} An object containing filter parameters for the request. Optional
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getOrders: function getOrders(_ref2) {
    var page = _ref2.page,
      pageSize = _ref2.pageSize,
      filters = _ref2.filters;
    if (page == null) {
      page = 0;
    }
    if (pageSize == null) {
      pageSize = 10; // Default page size if not provided
    }
    var params = new URLSearchParams({
      page: page,
      page_size: pageSize
    });

    // Add filter parameters only if they have a value
    for (var key in filters) {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    }
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/checkout/orders?").concat(params.toString());
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  },
  /**
   * Fetches a single SPEI transaction by its ID.
   * @param {string} transactionId The ID of the transaction to fetch.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>}
   */
  getTransactionById: function getTransactionById(transactionId) {
    // FIX: Using the correct singular endpoint from your curl command.
    console.log("Fetching transaction details for ID:", transactionId);
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/spei/transaction/").concat(transactionId);
    console.log("Constructed endpoint:", endpoint);
    return _apiClient.apiClient.get(endpoint);
  }
};

},{"../../../core/api/api.client.js":2}],12:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutRepository = void 0;
var _checkoutApi = require("./checkout.api.js");
var _checkoutCatalog = require("../models/checkout-catalog.model");
var _checkoutOrder = require("../models/checkout-order.model");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * spei.repository.js
 *
 * This file serves as a repository for SPEI transaction data. It uses the
 * spei.api.js module to fetch data and translates it into domain models.
 */
var checkoutRepository = exports.checkoutRepository = {
  /**
   * Retrieves a paginated list of Checkout Orders Catalog Items.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<CheckoutCatalog[]>}
   */
  getCatalog: function () {
    var _getCatalog = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _checkoutApi.checkoutApi.getCatalog(params);
          case 2:
            response = _context.sent;
            if (!(response.success && response.data && Array.isArray(response.data))) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", response.data.map(function (rawData) {
              return new _checkoutCatalog.CheckoutCatalog(rawData);
            }));
          case 7:
            if (!response.success) {
              console.error('Failed to retrieve catalogs from repository:', response.error.message);
            } else {
              console.error('API response.data is not in the expected array format:', response.data);
            }
            return _context.abrupt("return", []);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getCatalog(_x) {
      return _getCatalog.apply(this, arguments);
    }
    return getCatalog;
  }(),
  /**
   * Retrieves a paginated list of Checkout Orders.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<CheckoutOrder[]>}
   */
  getOrders: function () {
    var _getOrders = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _checkoutApi.checkoutApi.getOrders(params);
          case 2:
            response = _context2.sent;
            if (!(response.success && response.data && Array.isArray(response.data))) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", response.data.map(function (rawData) {
              return new _checkoutOrder.CheckoutOrder(rawData);
            }));
          case 7:
            if (!response.success) {
              console.error('Failed to retrieve orders from repository:', response.error.message);
            } else {
              console.error('API response.data is not in the expected array format:', response.data);
            }
            return _context2.abrupt("return", []);
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getOrders(_x2) {
      return _getOrders.apply(this, arguments);
    }
    return getOrders;
  }()
};

},{"../models/checkout-catalog.model":15,"../models/checkout-order.model":16,"./checkout.api.js":11}],13:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutService = void 0;
var _checkoutRepository = require("../data/checkout.repository.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * checkout.service.js
 *
 * This is the core business logic layer for the Checkout feature.
 * It uses the repository to fetch fully formed domain models and then applies
 * business rules, calculations, and transformations.
 */
var checkoutService = exports.checkoutService = {
  /**
   * Fetches paginated and filtered transaction models from the repository.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<import('./checkout-catalog.model.js').CheckoutCatalog[]>}
   */
  getCatalog: function () {
    var _getCatalog = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _checkoutRepository.checkoutRepository.getCatalog(params);
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getCatalog(_x) {
      return _getCatalog.apply(this, arguments);
    }
    return getCatalog;
  }(),
  /**
   * Fetches paginated and filtered order models from the repository.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<import('./checkout-order.model.js').CheckoutOrder[]>}
   */
  getOrders: function () {
    var _getOrders = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _checkoutRepository.checkoutRepository.getOrders(params);
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getOrders(_x2) {
      return _getOrders.apply(this, arguments);
    }
    return getOrders;
  }(),
  // /**
  //  * Fetches details for a single transaction.
  //  * @param {string} transactionId The ID of the transaction.
  //  * @returns {Promise<import('./spei-transaction.model.js').SpeiTransaction|null>}
  //  */
  // getTransactionDetails: async function (transactionId) {
  //     return await checkoutRepository.getTransactionById(transactionId);
  // },

  /**
   * Sorts an array of items locally.
   */
  sortData: function sortData(items, sortBy, sortOrder) {
    // Create a new array to avoid modifying the original
    var sortedItems = _toConsumableArray(items);
    sortedItems.sort(function (a, b) {
      var valA = a[sortBy];
      var valB = b[sortBy];

      // Handle different data types for proper sorting
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedItems;
  },
  /**
   * Fetches all filtered transactions (for export) and converts them to CSV format.
   * @param {object} catalog - The current transactions to export
   * @returns {Promise<string>} A promise resolving with the CSV string.
   */
  exportCatalogToCsv: function () {
    var _exportCatalogToCsv = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(catalog) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", this._convertCatalogToCsv(catalog));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function exportCatalogToCsv(_x3) {
      return _exportCatalogToCsv.apply(this, arguments);
    }
    return exportCatalogToCsv;
  }(),
  /**
   * Converts an array of Catalog objects into a CSV string.
   * @param {CheckoutCatalog[]} catalog - The transactions to convert.
   * @returns {string} The CSV formatted string.
   * @private
   */
  _convertCatalogToCsv: function _convertCatalogToCsv(catalog) {
    if (!catalog || catalog.length === 0) {
      return "No data to export.";
    }

    // Define CSV headers and corresponding data properties
    var headers = ["Operator Id", "Sku ID", "Title", "Amount"];
    var properties = ["operatorId", "skuId", "title", "amount"];
    var csvContent = headers.join(',') + '\n';
    catalog.forEach(function (tx) {
      var row = properties.map(function (prop) {
        var value = tx[prop];
        if (value instanceof Date) {
          value = value.toLocaleString(); // Format Date objects
        } else if (typeof value === 'number') {
          value = value.toFixed(2); // Format numbers
        } else if (value === null || value === undefined) {
          value = ''; // Handle null/undefined
        } else {
          value = String(value).replace(/"/g, '""'); // Escape double quotes
          if (value.includes(',') || value.includes('\n')) {
            value = "\"".concat(value, "\""); // Quote if contains commas or newlines
          }
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });
    return csvContent;
  },
  /**
   * Fetches all filtered transactions (for export) and converts them to CSV format.
   * @param {CheckoutOrder[]} orders - The orders to export.
   * @returns {Promise<string>} A promise resolving with the CSV string.
   */
  exportOrdersToCsv: function () {
    var _exportOrdersToCsv = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(orders) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", this._convertOrdersToCsv(orders));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function exportOrdersToCsv(_x4) {
      return _exportOrdersToCsv.apply(this, arguments);
    }
    return exportOrdersToCsv;
  }(),
  /**
   * Converts an array of CheckoutOrder objects into a CSV string.
   * @param {CheckoutOrder[]} orders - The orders to convert.
   * @returns {string} The CSV formatted string.
   * @private
   */
  _convertOrdersToCsv: function _convertOrdersToCsv(orders) {
    if (!orders || orders.length === 0) {
      return "No data to export.";
    }

    // Define CSV headers and corresponding data properties
    var headers = ["Token", "Operator Id", "Sku ID", "Amount", "Reference", "External Reference", "Customer ID", "Status", "Created At", "Description"];
    var properties = ["token", "operatorId", "skuId", "amount", "reference", "externalReference", "customerId", "status", "createdAt", "description"];
    var csvContent = headers.join(',') + '\n';
    orders.forEach(function (tx) {
      var row = properties.map(function (prop) {
        var value = tx[prop];
        if (value instanceof Date) {
          value = value.toLocaleString(); // Format Date objects
        } else if (typeof value === 'number') {
          value = value.toFixed(2); // Format numbers
        } else if (value === null || value === undefined) {
          value = ''; // Handle null/undefined
        } else {
          value = String(value).replace(/"/g, '""'); // Escape double quotes
          if (value.includes(',') || value.includes('\n')) {
            value = "\"".concat(value, "\""); // Quote if contains commas or newlines
          }
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });
    return csvContent;
  }
};

},{"../data/checkout.repository.js":12}],14:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _checkoutService = require("./domain/checkout.service.js");
var _checkoutUi = require("./ui/checkout.ui.js");
var _file = require("../../core/utils/file.utils");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
$(document).ready(function () {
  console.log("Loaded this checkout module.");

  // --- Logic for the Dashboard Widget (remains the same) ---
  if ($('#checkout-home-widget-container').length > 0) {
    var loadRecentOrders = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, transactions;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _checkoutUi.checkoutUi.showLoader();
              _context.prev = 1;
              params = {
                page: 0,
                pageSize: 4
              };
              _context.next = 5;
              return _checkoutService.checkoutService.getOrders(params);
            case 5:
              transactions = _context.sent;
              _checkoutUi.checkoutUi.renderOrders(transactions);
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.error("Error loading recent transactions:", _context.t0);
            case 12:
              _context.prev = 12;
              _checkoutUi.checkoutUi.hideLoader();
              return _context.finish(12);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 9, 12, 15]]);
      }));
      return function loadRecentOrders() {
        return _ref.apply(this, arguments);
      };
    }();
    loadRecentOrders();
  }

  // --- Logic for the Full Catalog Page with Local Sorting and "Load More" ---
  if ($('#checkout-catalog-page').length > 0) {
    // Default sort direction
    // let currentFilters = {}; // New state for filters
    /**
     * Takes the master list of transactions, sorts it, and updates the UI.
     */
    var sortAndRenderCatalog = function sortAndRenderCatalog() {
      var sortedData = _checkoutService.checkoutService.sortData(allCatalog, currentSortBy, currentSortOrder);
      // Replace the entire table content with the newly sorted full list
      _checkoutUi.checkoutUi.renderCatalog(sortedData, false);
      _checkoutUi.checkoutUi.updateSortIcons(currentSortBy, currentSortOrder);
    };
    /**
     * Fetches the next page of data, adds it to the master list, and re-renders.
     */
    var loadMoreCatalogs = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var isNewFilter,
          _allCatalog,
          params,
          newCatalogs,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              isNewFilter = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
              _checkoutUi.checkoutUi.showLoader();
              if (isNewFilter) {
                currentPage = 0;
                allCatalog = []; // Reset the list for a new filter
              }
              _context2.prev = 3;
              params = {
                page: currentPage,
                pageSize: pageSize
              };
              _context2.next = 7;
              return _checkoutService.checkoutService.getCatalog(params);
            case 7:
              newCatalogs = _context2.sent;
              // const newTransactions = await speiService.getProcessedTransactions(currentPage, pageSize);

              // Add the new items to our master list
              (_allCatalog = allCatalog).push.apply(_allCatalog, _toConsumableArray(newCatalogs));

              // Re-sort and re-render the entire list based on the current sort state
              sortAndRenderCatalog();

              // Show/hide the "Load More" button based on if we received a full page of data
              _checkoutUi.checkoutUi.updateLoadMoreButton(newCatalogs.length === pageSize);
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              console.error("Error loading more transactions:", _context2.t0);
            case 16:
              _context2.prev = 16;
              _checkoutUi.checkoutUi.hideLoader();
              return _context2.finish(16);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 13, 16, 19]]);
      }));
      return function loadMoreCatalogs() {
        return _ref2.apply(this, arguments);
      };
    }(); // --- Event Listeners ---
    // Apply a new filter
    // $('#spei-apply-filter-button').on('click', function() {
    //     const field = $('#spei-new-filter-field').val();
    //     const value = $('#spei-new-filter-value').val();
    //
    //     if (value) {
    //         currentFilters[field] = value;
    //         checkoutUi.renderFilterTags(currentFilters);
    //         checkoutUi.clearFilterInputs();
    //         loadMoreTransactions(true); // Load with new filter
    //     }
    // });
    // Remove a filter tag
    // $('#spei-filter-tags-container').on('click', '.remove-filter', function(e) {
    //     e.preventDefault();
    //     const keyToRemove = $(this).data('filter-key');
    //     delete currentFilters[keyToRemove];
    //     checkoutUi.renderFilterTags(currentFilters);
    //     loadMoreTransactions(true); // Reload with updated filters
    // });
    // --- Event Listener for Column Header Clicks ---
    // --- State Management for the page ---
    var allCatalog = []; // Holds the full list of transactions loaded so far
    var currentPage = 0;
    var pageSize = 10;
    var currentSortBy = 'createdAt'; // Default sort column
    var currentSortOrder = 'desc';
    $('th.sortable').on('click', function () {
      var newSortBy = $(this).data('sort');
      if (currentSortBy === newSortBy) {
        // If clicking the same column, just toggle the direction
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // If clicking a new column, set it and default to ascending order
        currentSortBy = newSortBy;
        currentSortOrder = 'asc';
      }

      // Re-sort the existing data we already have, without fetching from the API
      sortAndRenderCatalog();
    });

    // --- Event Listener for Load More Button ---
    $('#checkout-catalog-load-more').on('click', function () {
      currentPage++;
      loadMoreCatalogs();
    });

    // Handle clicking on a table row to navigate to details
    // $('#spei-transactions-tbody').on('click', 'tr.clickable-row', function() {
    //     const transactionId = $(this).data('id');
    //     if (transactionId) {
    //         window.location.href = `/spei/spei-transaction-details.html?id=${transactionId}`;
    //     }
    // });

    // FIX: Event listener for Export Button
    $('#checkout-catalog-export-csv-button').on('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var button, csvContent, filename;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            button = $(this);
            button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Exporting...');
            _context3.prev = 2;
            _context3.next = 5;
            return _checkoutService.checkoutService.exportCatalogToCsv(allCatalog);
          case 5:
            csvContent = _context3.sent;
            filename = "checkout_catalog_".concat(new Date().toISOString().split('T')[0], ".csv");
            _file.fileUtils.downloadFile(csvContent, filename, 'text/csv');
            _context3.next = 14;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            console.error("Error during CSV export:", _context3.t0);
            // Optionally show an error message to the user
            alert("Failed to export data. Please try again.");
          case 14:
            _context3.prev = 14;
            button.prop('disabled', false).html('<i class="uil uil-download-alt me-1"></i> Export to CSV');
            return _context3.finish(14);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[2, 10, 14, 17]]);
    })));

    // --- Initial Load for the first page of transactions ---
    loadMoreCatalogs();
  }

  // --- Logic for the Full Orders Page with Local Sorting and "Load More" ---
  if ($('#checkout-orders-page').length > 0) {
    // New state for filters
    /**
     * Takes the master list of transactions, sorts it, and updates the UI.
     */
    var sortAndRenderOrders = function sortAndRenderOrders() {
      var sortedData = _checkoutService.checkoutService.sortData(allOrders, currentOrdersSortBy, currentOrdersSortOrder);
      // Replace the entire table content with the newly sorted full list
      _checkoutUi.checkoutUi.renderOrders(sortedData, false);
      _checkoutUi.checkoutUi.updateSortIcons(currentOrdersSortBy, currentOrdersSortOrder);
    };
    /**
     * Fetches the next page of data, adds it to the master list, and re-renders.
     */
    var loadMoreOrders = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var isNewFilter,
          _allOrders,
          params,
          newOrders,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              isNewFilter = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
              _checkoutUi.checkoutUi.showLoader();
              if (isNewFilter) {
                currentOrdersPage = 0;
                allOrders = []; // Reset the list for a new filter
              }
              _context4.prev = 3;
              params = {
                page: currentOrdersPage,
                pageSize: ordersPageSize,
                filters: currentOrdersFilters
              };
              _context4.next = 7;
              return _checkoutService.checkoutService.getOrders(params);
            case 7:
              newOrders = _context4.sent;
              // Add the new items to our master list
              (_allOrders = allOrders).push.apply(_allOrders, _toConsumableArray(newOrders));

              // Re-sort and re-render the entire list based on the current sort state
              sortAndRenderOrders();

              // Show/hide the "Load More" button based on if we received a full page of data
              _checkoutUi.checkoutUi.updateLoadMoreButton(newOrders.length === ordersPageSize, true);
              _context4.next = 16;
              break;
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](3);
              console.error("Error loading more transactions:", _context4.t0);
            case 16:
              _context4.prev = 16;
              _checkoutUi.checkoutUi.hideLoader();
              return _context4.finish(16);
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 13, 16, 19]]);
      }));
      return function loadMoreOrders() {
        return _ref4.apply(this, arguments);
      };
    }(); // --- Event Listeners ---
    // Apply a new filter
    // --- State Management for the page ---
    var allOrders = []; // Holds the full list of transactions loaded so far
    var currentOrdersPage = 0;
    var ordersPageSize = 10;
    var currentOrdersSortBy = 'createdAt'; // Default sort column
    var currentOrdersSortOrder = 'desc'; // Default sort direction
    var currentOrdersFilters = {};
    $('#checkout-order-apply-filter-button').on('click', function () {
      var field = $('#checkout-order-new-filter-field').val();
      var value = $('#checkout-order-new-filter-value').val();
      if (value) {
        currentOrdersFilters[field] = value;
        console.log("Current filters", currentOrdersFilters);
        _checkoutUi.checkoutUi.renderFilterTags(currentOrdersFilters);
        _checkoutUi.checkoutUi.clearFilterInputs();
        loadMoreOrders(true); // Load with new filter
      }
    });

    // Remove a filter tag
    $('#checkout-order-filter-tags-container').on('click', '.remove-filter', function (e) {
      e.preventDefault();
      var keyToRemove = $(this).data('filter-key');
      delete currentOrdersFilters[keyToRemove];
      _checkoutUi.checkoutUi.renderFilterTags(currentOrdersFilters);
      loadMoreOrders(true); // Reload with updated filters
    });

    // --- Event Listener for Column Header Clicks ---
    $('th.sortable').on('click', function () {
      var newSortBy = $(this).data('sort');
      if (currentOrdersSortBy === newSortBy) {
        // If clicking the same column, just toggle the direction
        currentOrdersSortOrder = currentOrdersSortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // If clicking a new column, set it and default to ascending order
        currentOrdersSortBy = newSortBy;
        currentOrdersSortOrder = 'asc';
      }

      // Re-sort the existing data we already have, without fetching from the API
      sortAndRenderOrders();
    });

    // --- Event Listener for Load More Button ---
    $('#checkout-order-load-more').on('click', function () {
      currentOrdersPage++;
      loadMoreOrders();
    });

    // Handle clicking on a table row to navigate to details
    // $('#spei-transactions-tbody').on('click', 'tr.clickable-row', function() {
    //     const transactionId = $(this).data('id');
    //     if (transactionId) {
    //         window.location.href = `/spei/spei-transaction-details.html?id=${transactionId}`;
    //     }
    // });

    // Event listener for Export Button
    $('#checkout-order-export-csv-button').on('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var button, csvContent, filename;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            button = $(this);
            button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Exporting...');
            _context5.prev = 2;
            _context5.next = 5;
            return _checkoutService.checkoutService.exportOrdersToCsv(allOrders);
          case 5:
            csvContent = _context5.sent;
            filename = "checkout_orders_".concat(new Date().toISOString().split('T')[0], ".csv");
            _file.fileUtils.downloadFile(csvContent, filename, 'text/csv');
            _context5.next = 14;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](2);
            console.error("Error during CSV export:", _context5.t0);
            // Optionally show an error message to the user
            alert("Failed to export data. Please try again.");
          case 14:
            _context5.prev = 14;
            button.prop('disabled', false).html('<i class="uil uil-download-alt me-1"></i> Export to CSV');
            return _context5.finish(14);
          case 17:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[2, 10, 14, 17]]);
    })));

    // --- Initial Load for the first page of transactions ---
    loadMoreOrders();
  }

  // --- Logic for the Transaction Details Page ---
  // if ($('#spei-transaction-details-page').length > 0) {
  //
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const transactionId = urlParams.get('id');
  //     let webhooksCache = []; // Cache the webhooks to avoid re-fetching
  //
  //     if (!transactionId) {
  //         window.location.href = '/spei/spei-transactions.html';
  //         return;
  //     }
  //
  //     async function loadTransactionDetails() {
  //         try {
  //             const result = await checkoutService.getTransactionDetails(transactionId);
  //             if (result) {
  //                 const { transaction, webhooks } = result;
  //                 webhooksCache = webhooks;
  //                 checkoutUi.renderTransactionDetails(transaction);
  //                 checkoutUi.renderWebhooksTable(webhooks);
  //             } else {
  //                 $('#spei-transaction-details-page').html('<div class="alert alert-danger">Transaction not found or an error occurred.</div>');
  //             }
  //         } catch (error) {
  //             console.error("Error loading transaction details:", error);
  //             $('#spei-transaction-details-page').html('<div class="alert alert-danger">An unexpected error occurred while loading details.</div>');
  //         }
  //     }
  //
  //     // Event listener for clicking on a webhook row to show the modal
  //     $('#webhooks-tbody').on('click', '.webhook-row', function() {
  //         const webhookId = $(this).data('id');
  //         const selectedWebhook = webhooksCache.find(wh => wh.id === webhookId);
  //         if (selectedWebhook) {
  //             checkoutUi.showWebhookDetailsModal(selectedWebhook);
  //         }
  //     });
  //
  //     loadTransactionDetails();
  // }
});

},{"../../core/utils/file.utils":5,"./domain/checkout.service.js":13,"./ui/checkout.ui.js":17}],15:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckoutCatalog = void 0;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
/**
 * checkout-catalog.model.js
 *
 * This file defines the CheckoutCatalog class, which represents the core
 * domain model for the checkout catalog. It encapsulates the properties
 * and any related business logic for the checkout catalog.
 * * This class is responsible for mapping raw data from the API to a clean,
 * usable object for the rest of the application.
 */
var CheckoutCatalog = exports.CheckoutCatalog = /*#__PURE__*/_createClass(
/**
 * @param {object} rawData - The raw catalog object from the repository.
 * @param {number} rawData.operator_id
 * @param {string} rawData.sku_id
 * @param {string} rawData.title
 * @param {number} rawData.amount
 */
function CheckoutCatalog(_ref) {
  var id = _ref.id,
    operator_id = _ref.operator_id,
    sku_id = _ref.sku_id,
    title = _ref.title,
    amount = _ref.amount;
  _classCallCheck(this, CheckoutCatalog);
  /** @type {number} */
  this.operatorId = operator_id;
  /** @type {number} */
  this.skuId = sku_id;
  /** @type {string} */
  this.title = title;
  /** @type {string} */
  this.amount = amount;
});

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckoutOrder = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents a Checkout Order.
 */
var CheckoutOrder = exports.CheckoutOrder = /*#__PURE__*/function () {
  /**
   * @param {object} dto - The raw data object (Data Transfer Object) from the API.
   */
  function CheckoutOrder() {
    var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CheckoutOrder);
    /**
     * The unique token for the order.
     * @type {string|null}
     */
    this.token = dto.token || null;

    /**
     * The ID of the operator.
     * @type {number|null}
     */
    this.operatorId = dto.operator_id || null;

    /**
     * The ID of the SKU.
     * @type {number|null}
     */
    this.skuId = dto.sku_id || null;

    /**
     * The order amount, parsed as a number.
     * @type {number}
     */
    this.amount = parseFloat(dto.amount) || 0;

    /**
     * The primary reference number for the order.
     * @type {string}
     */
    this.reference = dto.reference || '';

    /**
     * An optional external reference.
     * @type {string|null}
     */
    this.externalReference = dto.external_reference || null;

    /**
     * The ID of the customer, if associated.
     * @type {number|null}
     */
    this.customerId = dto.customer_id || null;

    /**
     * The status of the order (e.g., "NOT_COMPLETED").
     * @type {string}
     */
    this.status = dto.status || 'UNKNOWN';

    /**
     * The date the order was created, as a JavaScript Date object.
     * @type {Date|null}
     */
    this.createdAt = dto.created_at ? new Date(dto.created_at) : null;

    /**
     * A description of the order.
     * @type {string}
     */
    this.description = dto.description || '';
  }

  /**
   * Checks if the order is still pending.
   * @returns {boolean}
   */
  return _createClass(CheckoutOrder, [{
    key: "isPending",
    value: function isPending() {
      return this.status === 'NOT_COMPLETED';
    }

    /**
     * Checks if the order was completed successfully.
     * Note: You might need to adjust the status string 'COMPLETED' based on your API.
     * @returns {boolean}
     */
  }, {
    key: "isCompleted",
    value: function isCompleted() {
      return this.status === 'COMPLETED';
    }

    /**
     * Returns the order amount formatted as a currency string.
     * @param {string} [locale='es-PA'] - The locale for formatting (e.g., 'en-US'). Defaults to Panama.
     * @param {string} [currency='USD'] - The currency code (e.g., 'MXN').
     * @returns {string} The formatted currency string.
     */
  }, {
    key: "getFormattedAmount",
    value: function getFormattedAmount() {
      var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'es-PA';
      var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'USD';
      return this.amount.toLocaleString(locale, {
        style: 'currency',
        currency: currency
      });
    }

    /**
     * Returns the creation date formatted as a readable string.
     * @param {string} [locale='es-PA'] - The locale for formatting. Defaults to Panama.
     * @returns {string} The formatted date string.
     */
  }, {
    key: "getFormattedDate",
    value: function getFormattedDate() {
      var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'es-MX';
      if (!this.createdAt) {
        return 'N/A';
      }
      return this.createdAt.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    /**
     * A static factory method to create an instance from a raw DTO.
     * @param {object} dto - The full raw JSON object from the API.
     * @returns {CheckoutOrder}
     */
  }, {
    key: "getDisplayStatus",
    value:
    /**
     * A business logic method to determine a user-friendly status and color.
     * @returns {{text: string, colorClass: string}} An object with the status text and a corresponding Bootstrap color class.
     */
    function getDisplayStatus() {
      switch (this.status) {
        case 'SUCCESS':
          return {
            text: 'Completed',
            colorClass: 'success'
          };
        case 'NOT_COMPLETED':
          return {
            text: 'Pending',
            colorClass: 'warning'
          };
        case 'FAILED':
          return {
            text: 'Failed',
            colorClass: 'danger'
          };
        case 'PENDING':
          return {
            text: 'Pending',
            colorClass: 'warning'
          };
        default:
          return {
            text: this.status,
            colorClass: 'secondary'
          };
      }
    }
  }], [{
    key: "fromDTO",
    value: function fromDTO(dto) {
      return new CheckoutOrder(dto);
    }
  }]);
}();

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutUi = void 0;
var _checkoutCatalogModel = require("../models/checkout-catalog.model.js");
/**
 * spei.ui.js
 *
 * This file manages all DOM manipulations for the SPEI feature.
 */

var checkoutUi = exports.checkoutUi = {
  elements: {
    // Catalogs
    catalogTableBody: '#checkout-catalog-tbody',
    loader: '#checkout-loader',
    loadMoreButton: '#checkout-catalog-load-more',
    sortableHeaders: 'th.sortable',
    // Orders
    ordersTableBody: '#checkout-order-transactions-tbody',
    ordersLoadMoreButton: '#checkout-order-load-more',
    filterTagsContainer: '#checkout-order-filter-tags-container',
    newFilterField: '#checkout-order-new-filter-field',
    newFilterValue: '#checkout-order-new-filter-value'
  },
  showLoader: function showLoader() {
    $(this.elements.loader).show();
  },
  hideLoader: function hideLoader() {
    $(this.elements.loader).hide();
  },
  /**
   * Renders the checkout catalog into the table body.
   * @param catalog {CheckoutCatalog[]} - The array of CheckoutCatalog objects to render.
   * @param append {boolean} - Whether to append to the existing table or replace it.
   */
  renderCatalog: function renderCatalog(catalog) {
    var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var tableBody = $(this.elements.catalogTableBody);
    if (!append) {
      tableBody.empty();
    }
    if (catalog.length === 0 && !append) {
      this.renderEmptyState();
      return;
    }
    catalog.forEach(function (tx) {
      var rowHtml = "\n                <tr style=\"cursor: pointer;\">\n                  <td><span class=\"font-monospace\">".concat(tx.operatorId, "</span></td>\n                  <td><span class=\"font-monospace\">").concat(tx.skuId, "</span></td>\n                  <td>").concat(tx.title, "</td>\n                  <td>").concat(tx.amount, "</td>\n                </tr>\n            ");
      tableBody.append(rowHtml);
    });
  },
  /**
   * Renders the checkout catalog into the table body.
   * @param orders {CheckoutOrder[]} - The array of CheckoutCatalog objects to render.
   * @param append {boolean} - Whether to append to the existing table or replace it.
   */
  renderOrders: function renderOrders(orders) {
    var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var tableBody = $(this.elements.ordersTableBody);
    if (!append) {
      tableBody.empty();
    }
    if (orders.length === 0 && !append) {
      this.renderEmptyState();
      return;
    }
    orders.forEach(function (tx) {
      var displayStatus = tx.getDisplayStatus();
      var rowHtml = "\n                <tr style=\"cursor: pointer;\">\n                  <td><span class=\"font-monospace\">".concat(tx.token, "</span></td>\n                  <td>").concat(tx.operatorId, "</></td>\n                  <td>").concat(tx.skuId, "</td>\n                  <td>").concat(tx.reference, "</td>\n                  <td>").concat(tx.externalReference, "</td>\n                  <td><span class=\"badge bg-").concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span></td>\n                  <td>").concat(tx.getFormattedDate(), "</td>\n                </tr>\n            ");
      tableBody.append(rowHtml);
    });
  },
  /**
   * Renders the active filter tags into their container.
   * @param {object} filters - The current filter state object.
   */
  renderFilterTags: function renderFilterTags(filters) {
    var container = $(this.elements.filterTagsContainer);
    container.empty();
    for (var key in filters) {
      if (filters[key]) {
        var prettyKey = key.replace('_', ' ').replace(/\b\w/g, function (l) {
          return l.toUpperCase();
        });
        var tagHtml = "\n                    <span class=\"badge bg-secondary me-1 fs-6\">\n                        ".concat(prettyKey, ": ").concat(filters[key], "\n                        <a href=\"#\" class=\"text-white ms-1 remove-filter\" data-filter-key=\"").concat(key, "\">\xD7</a>\n                    </span>\n                ");
        container.append(tagHtml);
      }
    }
  },
  /**
   * Clears the input fields in the "Add Filter" dropdown.
   */
  clearFilterInputs: function clearFilterInputs() {
    $(this.elements.newFilterValue).val('');
  },
  updateLoadMoreButton: function updateLoadMoreButton(hasMore) {
    var orders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var elementRef = orders ? this.elements.ordersLoadMoreButton : this.elements.loadMoreButton;
    var button = $(elementRef);
    if (hasMore) {
      button.show();
    } else {
      button.hide();
    }
  },
  renderEmptyState: function renderEmptyState() {
    var emptyHtml = "\n            <tr>\n                <td colspan=\"5\" class=\"text-center p-4\">\n                    <p class=\"mb-0\">No SPEI transactions found.</p>\n                </td>\n            </tr>\n        ";
    $(this.elements.tableBody).html(emptyHtml);
  },
  updateSortIcons: function updateSortIcons(sortBy, sortOrder) {
    $(this.elements.sortableHeaders).each(function () {
      var header = $(this);
      var icon = header.find('i');
      icon.removeClass('uil-sort-amount-up uil-sort-amount-down').addClass('uil-sort');
      if (header.data('sort') === sortBy) {
        if (sortOrder === 'asc') {
          icon.removeClass('uil-sort').addClass('uil-sort-amount-up');
        } else {
          icon.removeClass('uil-sort').addClass('uil-sort-amount-down');
        }
      }
    });
  },
  /**
   * Populates the details page with data from a transaction object.
   * @param {SpeiTransaction} transaction The transaction object.
   */
  renderTransactionDetails: function renderTransactionDetails(transaction) {
    if (!transaction) return;
    var displayStatus = transaction.getDisplayStatus();

    // --- Helper function to set text and remove placeholder ---
    var populateField = function populateField(selector, value) {
      $(selector).text(value).removeClass('placeholder-glow').empty().text(value);
    };
    var populateHtml = function populateHtml(selector, value) {
      $(selector).html(value).removeClass('placeholder-glow');
    };

    // Payer Info
    populateField('#payer-name', transaction.payerName);
    populateField('#payer-rfc', transaction.payerRfc);
    populateField('#payer-clabe', transaction.payerClabe);
    populateField('#payer-institution', transaction.payerInstitution);

    // Beneficiary Info
    populateField('#beneficiary-name', transaction.beneficiaryName);
    populateField('#beneficiary-rfc', transaction.beneficiaryRfc);
    populateField('#beneficiary-clabe', transaction.beneficiaryClabe);

    // Transaction Status Card
    populateField('#details-id', transaction.id);
    populateField('#details-tracking-key', transaction.trackingKey);
    populateField('#details-type', transaction.transactionType);
    populateField('#details-amount', transaction.getFormattedAmount());
    populateHtml('#details-status', "<span class=\"badge bg-".concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span>"));

    // Additional Details
    populateField('#details-payment-concept', transaction.paymentConcept);
    populateField('#details-numeric-reference', transaction.numericReference);
    populateField('#details-customer-tx-id', transaction.customerTransactionId);
    populateField('#details-customer-id', transaction.customerId);
    populateField('#details-created-at', transaction.createdAt.toLocaleString());
    populateField('#details-updated-at', transaction.updatedAt.toLocaleString());
  },
  /**
   * Renders a list of webhook notifications into the table.
   * @param {WebhookNotification[]} webhooks
   */
  renderWebhooksTable: function renderWebhooksTable(webhooks) {
    var tableBody = $('#webhooks-tbody');
    tableBody.empty();
    if (!webhooks || webhooks.length === 0) {
      tableBody.html('<tr><td colspan="5" class="text-center">No webhooks found for this transaction.</td></tr>');
      return;
    }
    webhooks.forEach(function (wh) {
      var displayStatus = wh.getDisplayStatus();
      var rowHtml = "\n                <tr class=\"webhook-row\" data-id=\"".concat(wh.id, "\" style=\"cursor: pointer;\">\n                    <td>").concat(wh.id, "</td>\n                    <td>").concat(wh.eventTypeDescription, "</td>\n                    <td><span class=\"badge bg-").concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span></td>\n                    <td>").concat(wh.attempts, "</td>\n                    <td>").concat(wh.firstSentAt ? wh.firstSentAt.toLocaleString() : 'N/A', "</td>\n                </tr>\n            ");
      tableBody.append(rowHtml);
    });
  },
  /**
   * Populates and shows the webhook details modal.
   * @param {WebhookNotification} webhook
   */
  showWebhookDetailsModal: function showWebhookDetailsModal(webhook) {
    if (!webhook) return;
    $('#modal-request-id').text(webhook.requestId || 'N/A');
    $('#modal-notification-code').text(webhook.notificationCode || 'N/A');
    $('#modal-detail-code').text(webhook.detailCode || 'N/A');
    $('#modal-failed-reason').text(webhook.detailFailedReason || 'N/A');
    $('#modal-failed-message').text(webhook.detailFailedMessage || 'N/A');

    // Format and display the metadata JSON
    var metadataString = webhook.metadata ? JSON.stringify(webhook.metadata, null, 2) : 'No metadata.';
    $('#modal-metadata').text(metadataString);

    // Use the Bootstrap 5 JS API to show the modal
    var modal = new bootstrap.Modal(document.getElementById('webhook-details-modal'));
    modal.show();
  }
};

},{"../models/checkout-catalog.model.js":15}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerApi = void 0;
var _apiClient = require("../../../core/api/api.client.js");
/**
 * customer.api.js
 *
 * This file uses the centralized apiClient to make specific requests
 * for the Customer module. It no longer contains any direct ajax calls.
 */

var customerApi = exports.customerApi = {
  /**
   * Fetches the full customers lists that belongs to the authenticated account.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getCustomers: function getCustomers() {
    var endpoint = "".concat(_apiClient.apiClient.USERS_BASE_URL, "/customer");
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  },
  /**
   * Fetches a specific customer by their ID.
   * @param customerId {number} The ID of the customer to fetch.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getCustomerById: function getCustomerById(customerId) {
    var endpoint = "".concat(_apiClient.apiClient.USERS_BASE_URL, "/customer/by-id/").concat(customerId);
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  }
};

},{"../../../core/api/api.client.js":2}],19:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerRepository = void 0;
var _customerApi = require("./customer.api.js");
var _customerMinifiedModel = require("../models/customer-minified.model.js");
var _customerDetails = require("../models/customer-details.model");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var customerRepository = exports.customerRepository = {
  /**
   * Retrieves a list of CustomerMinified objects.
   * @returns {Promise<CustomerMinified[]>} A promise that resolves with an array of CustomerMinified instances.
   */
  getAllCustomers: function () {
    var _getAllCustomers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, _response$error;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _customerApi.customerApi.getCustomers();
          case 2:
            response = _context.sent;
            if (!(response.success && response.data && response.data.customers && Array.isArray(response.data.customers))) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", response.data.customers.map(function (rawData) {
              return new _customerMinifiedModel.CustomerMinified(rawData);
            }));
          case 7:
            console.error('Failed to retrieve customers from repository:', ((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.message) || 'Unexpected response format.');
            return _context.abrupt("return", []);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getAllCustomers() {
      return _getAllCustomers.apply(this, arguments);
    }
    return getAllCustomers;
  }(),
  /**
   * Fetches a specific customer by their ID.
   * @param customerId {number} The ID of the customer to fetch.
   * @returns {Promise<void>}
   */
  getCustomerById: function () {
    var _getCustomerById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(customerId) {
      var response, _response$error2;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _customerApi.customerApi.getCustomerById(customerId);
          case 2:
            response = _context2.sent;
            if (!(response.success && response.data)) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", new _customerDetails.CustomerDetails.fromDTO(response.data));
          case 7:
            console.error('Failed to retrieve customer by ID:', ((_response$error2 = response.error) === null || _response$error2 === void 0 ? void 0 : _response$error2.message) || 'Unexpected response format.');
            throw new Error('Customer not found or invalid response format.');
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getCustomerById(_x) {
      return _getCustomerById.apply(this, arguments);
    }
    return getCustomerById;
  }()
};

},{"../models/customer-details.model":22,"../models/customer-minified.model.js":23,"./customer.api.js":18}],20:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerService = void 0;
var _customerRepository = require("../data/customer.repository.js");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var customerService = exports.customerService = {
  /**
   * Fetches all customer profiles.
   * @returns {Promise<import('../customer-minified.model.js').CustomerMinified[]>}
   */
  getCustomers: function () {
    var _getCustomers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _customerRepository.customerRepository.getAllCustomers();
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getCustomers() {
      return _getCustomers.apply(this, arguments);
    }
    return getCustomers;
  }(),
  /**
   * Fetches a specific customer details by their ID.
   * @param customerId {number} The ID of the customer to fetch.
   * @returns {Promise<import('../customer-details.model.js').CustomerDetails>}
   */
  getCustomerById: function () {
    var _getCustomerById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(customerId) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _customerRepository.customerRepository.getCustomerById(customerId);
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getCustomerById(_x) {
      return _getCustomerById.apply(this, arguments);
    }
    return getCustomerById;
  }(),
  /**
   * Fetches all filtered customers (for export) and converts them to CSV format.
   * @param {object} allCustomers - The current customers to export
   * @returns {Promise<string>} A promise resolving with the CSV string.
   */
  exportCustomersToCsv: function () {
    var _exportCustomersToCsv = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(allCustomers) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", this._convertToCsv(allCustomers));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function exportCustomersToCsv(_x2) {
      return _exportCustomersToCsv.apply(this, arguments);
    }
    return exportCustomersToCsv;
  }(),
  /**
   * Converts an array of CustomerMinified objects into a CSV string.
   * @param {CustomerMinified[]} customers - The transactions to convert.
   * @returns {string} The CSV formatted string.
   * @private
   */
  _convertToCsv: function _convertToCsv(customers) {
    if (!customers || customers.length === 0) {
      return "No data to export.";
    }

    // Define CSV headers and corresponding data properties
    var headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Document", "Status"];
    var properties = ["id", "firstName", "lastName", "email", "createdAt", "document", "customerStatus"];
    var csvContent = headers.join(',') + '\n';
    customers.forEach(function (tx) {
      var row = properties.map(function (prop) {
        var value = tx[prop];
        if (value instanceof Date) {
          value = value.toLocaleString(); // Format Date objects
        } else if (typeof value === 'number') {
          value = value.toFixed(2); // Format numbers
        } else if (value === null || value === undefined) {
          value = ''; // Handle null/undefined
        } else {
          value = String(value).replace(/"/g, '""'); // Escape double quotes
          if (value.includes(',') || value.includes('\n')) {
            value = "\"".concat(value, "\""); // Quote if contains commas or newlines
          }
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });
    return csvContent;
  }
};

},{"../data/customer.repository.js":19}],21:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _customer = require("./domain/customer.service");
var _customerUi = require("./ui/customer.ui.js");
var _file = require("../../core/utils/file.utils");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
$(document).ready(function () {
  console.log("Loaded this customer module.");
  if ($('#customers-list-page').length > 0) {
    // Holds the full list of customers loaded so far
    // If the table is already initialized, destroy it first
    var loadCustomers = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var append,
          customers,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              append = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
              _customerUi.customerUI.showLoader();
              _context.prev = 2;
              console.log("Loading customers...");
              _context.next = 6;
              return _customer.customerService.getCustomers();
            case 6:
              customers = _context.sent;
              allCustomers = append ? allCustomers.concat(customers) : customers;
              _customerUi.customerUI.renderCustomers(allCustomers, append);
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              console.error("Error loading customers:", _context.t0);
            case 14:
              _context.prev = 14;
              _customerUi.customerUI.hideLoader();
              return _context.finish(14);
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 11, 14, 17]]);
      }));
      return function loadCustomers() {
        return _ref.apply(this, arguments);
      };
    }();
    var allCustomers = [];
    $('#customers-export-csv-button').on('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var button, csvContent, filename;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            button = $(this);
            button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Exporting...');
            _context2.prev = 2;
            _context2.next = 5;
            return _customer.customerService.exportCustomersToCsv(allCustomers);
          case 5:
            csvContent = _context2.sent;
            filename = "customers_".concat(new Date().toISOString().split('T')[0], ".csv");
            _file.fileUtils.downloadFile(csvContent, filename, 'text/csv');
            _context2.next = 14;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.error("Error during CSV export:", _context2.t0);
            // Optionally show an error message to the user
            alert("Failed to export data. Please try again.");
          case 14:
            _context2.prev = 14;
            button.prop('disabled', false).html('<i class="uil uil-download-alt me-1"></i> Export to CSV');
            return _context2.finish(14);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[2, 10, 14, 17]]);
    })));

    // --- Row Click Event Handler ---
    // Listen for clicks on the table's body, targeting 'tr' elements
    $('#products-datatable tbody').on('click', 'tr', function () {
      // 'this' refers to the clicked <tr> element
      var customerId = $(this).data('id');

      // Ensure we got a valid ID before navigating
      if (customerId) {
        console.log("Navigating to details for customer ID: ".concat(customerId));

        // Construct the URL with the customer ID as a query parameter

        // Navigate to the new page
        window.location.href = "/customer/customer-details.html?id=".concat(customerId);
      }
    });
    loadCustomers();
  }

  // --- Logic for the Transaction Details Page ---
  if ($('#customer-details-page').length > 0) {
    var loadCustomerDetails = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var customer;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _customer.customerService.getCustomerById(customerId);
            case 3:
              customer = _context3.sent;
              if (customer) {
                _customerUi.customerUI.renderCustomerDetails(customer);
              } else {
                $('#customer-details-page').html('<div class="alert alert-danger">Customer not found or an error occurred.</div>');
              }
              _context3.next = 11;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.error("Error loading customer details:", _context3.t0);
              $('#customer-details-page').html('<div class="alert alert-danger">An error occurred while loading customer details.</div>');
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      return function loadCustomerDetails() {
        return _ref3.apply(this, arguments);
      };
    }();
    var urlParams = new URLSearchParams(window.location.search);
    var customerId = urlParams.get('id');
    if (!customerId) {
      window.location.href = '/customer/customers.html';
      return;
    }
    loadCustomerDetails();
  }
});

},{"../../core/utils/file.utils":5,"./domain/customer.service":20,"./ui/customer.ui.js":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerDetails = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Represents the detailed information for a single customer.
 */
var CustomerDetails = exports.CustomerDetails = /*#__PURE__*/function () {
  /**
   * @param {object} dto - The data transfer object from the backend API.
   */
  function CustomerDetails() {
    var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CustomerDetails);
    /**
     * The unique identifier for the customer.
     * @type {number|null}
     */
    this.id = dto.customer_id || null;

    /**
     * The status of the API response.
     * @type {string}
     */
    this.status = dto.status || '';

    /**
     * The customer's current status (e.g., "Active", "Inactive").
     * @type {string}
     */
    this.customerStatus = dto.customer_status || 'Inactive';

    /**
     * The customer's first name.
     * @type {string}
     */
    this.firstName = dto.customer_firstname || '';

    /**
     * The customer's last name.
     * @type {string}
     */
    this.lastName = dto.customer_lastname || '';

    /**
     * The customer's email address.
     * @type {string}
     */
    this.email = dto.email || '';

    /**
     * The customer's phone number.
     * @type {number|null}
     */
    this.phone = dto.phone || null;

    /**
     * The customer's identification document number.
     * @type {string|null}
     */
    this.document = dto.document || null;

    /**
     * The primary SPEI CLABE account number for the customer.
     * @type {string|null}
     */
    this.speiClabe = dto.spei_clabe || null;

    /**
     * An array of alternate SPEI CLABE account numbers.
     * @type {string[]}
     */
    this.speiAlias = dto.spei_alias || [];

    /**
     * The customer's reference number for cash deposits.
     * @type {string|null}
     */
    this.cashReference = dto.cash_reference || null;

    /**
     * Alternate reference(s) for cash deposits.
     * @type {any|null}
     */
    this.cashAlias = dto.cash_alias || null;

    /**
     * The request ID associated with the API call.
     * @type {string|null}
     */
    this.requestId = dto.request_id || null;
  }

  /**
   * Gets the full name of the customer.
   * @returns {string} The customer's first and last name.
   */
  return _createClass(CustomerDetails, [{
    key: "getFullName",
    value: function getFullName() {
      return "".concat(this.firstName, " ").concat(this.lastName).trim();
    }

    /**
     * Checks if the customer's status is "Active".
     * @returns {boolean} True if the customer is active.
     */
  }, {
    key: "isActive",
    value: function isActive() {
      return this.customerStatus === 'Active';
    }

    /**
     * Checks if the customer has any SPEI accounts configured.
     * @returns {boolean} True if a primary or alias SPEI account exists.
     */
  }, {
    key: "hasSpeiAccounts",
    value: function hasSpeiAccounts() {
      return !!this.speiClabe || this.speiAlias.length > 0;
    }

    /**
     * Creates a CustomerDetails instance from a backend DTO.
     * @param {object} dto - The raw data from the API.
     * @returns {CustomerDetails} An instance of the CustomerDetails class.
     */
  }], [{
    key: "fromDTO",
    value: function fromDTO(dto) {
      return new CustomerDetails(dto);
    }
  }]);
}();

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerMinified = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * src/modules/customer/customer-minified.model.js
 *
 * Defines the CustomerMinified class, representing a simplified
 * view of customer data as returned by the customers list endpoint.
 */
var CustomerMinified = exports.CustomerMinified = /*#__PURE__*/function () {
  /**
   * @param {object} rawData - The raw customer object from the API response.
   * @param {number} rawData.id
   * @param {string} rawData.firstname
   * @param {string} rawData.lastname
   * @param {string} rawData.email
   * @param {number} rawData.phone
   * @param {string} rawData.document
   * @param {string} rawData.customer_status
   */
  function CustomerMinified(_ref) {
    var id = _ref.id,
      firstname = _ref.firstname,
      lastname = _ref.lastname,
      email = _ref.email,
      phone = _ref.phone,
      document = _ref.document,
      customer_status = _ref.customer_status;
    _classCallCheck(this, CustomerMinified);
    /** @type {number} */
    this.id = id;
    /** @type {string} */
    this.firstName = firstname;
    /** @type {string} */
    this.lastName = lastname;
    /** @type {string} */
    this.email = email;
    /** @type {number} */
    this.phone = phone;
    /** @type {string} */
    this.document = document;
    /** @type {string} */
    this.customerStatus = customer_status;
  }

  /**
   * Gets the full name of the customer.
   * @returns {string}
   */
  return _createClass(CustomerMinified, [{
    key: "getFullName",
    value: function getFullName() {
      return "".concat(this.firstName, " ").concat(this.lastName).trim();
    }

    /**
     * Checks if the customer is active.
     * @returns {boolean}
     */
  }, {
    key: "isActive",
    value: function isActive() {
      return this.customerStatus === 'Active';
    }
  }]);
}();

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerUI = void 0;
var _customerMinified = require("../models/customer-minified.model");
var customerUI = exports.customerUI = {
  elements: {
    tableBody: '#customer-list-tbody',
    loader: '#customer-table-loader',
    dataTable: '#products-datatable'
  },
  showLoader: function showLoader() {
    $(this.elements.loader).show();
  },
  hideLoader: function hideLoader() {
    $(this.elements.loader).hide();
  },
  /**
   * Renders the customer list into the table body.
   * @param customers {CustomerMinified[]}
   * @param append
   */
  renderCustomers: function renderCustomers(customers) {
    var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (customers.length === 0 && !append) {
      this.renderEmptyState();
      return;
    }
    var tableBody = $(this.elements.tableBody);
    if (!append) {
      tableBody.empty();
    }

    // If the table is already initialized, destroy it first
    if ($.fn.DataTable.isDataTable(this.elements.dataTable)) {
      $(this.elements.dataTable).DataTable().destroy();
    }

    // Initialize DataTables with the fetched data
    $(this.elements.dataTable).DataTable({
      data: customers,
      // Pass the array of customer objects directly
      columns: [{
        data: 'id'
      }, {
        data: 'firstName'
      }, {
        data: 'lastName'
      }, {
        data: 'email'
      }, {
        data: 'phone',
        render: function render(data) {
          // Use a render function for conditional display
          return data || 'N/A';
        }
      }, {
        data: 'document',
        render: function render(data) {
          return data || 'N/A';
        }
      }, {
        data: 'customerStatus',
        // Or use the isActive property
        render: function render(data, type, row) {
          // Assuming your CustomerMinified model has an isActive() method
          // Note: You might need to adjust this depending on your model structure
          var isActive = row.isActive ? row.isActive() : data === 'Active'; // Make it robust
          var badgeClass = isActive ? 'success' : 'danger';
          return "<span class=\"badge bg-".concat(badgeClass, "\">").concat(data, "</span>");
        }
      }],
      // Add other DataTables options here
      responsive: true,
      // Make rows clickable
      createdRow: function createdRow(row, data, dataIndex) {
        $(row).addClass('clickable-row').attr('data-id', data.id).css('cursor', 'pointer');
      }
    });
  },
  /**
   * Renders the customer details onto the details page.
   * @param {CustomerDetails} customer - The customer details object.
   */
  renderCustomerDetails: function renderCustomerDetails(customer) {
    if (!customer) {
      // Optionally show an error message if no customer is found
      $('#details-skeleton-loader').hide();
      $('#customer-details-content').html('<div class="alert alert-danger">Could not load customer details.</div>').show();
      return;
    }
    $('#details-skeleton-loader').hide(); // HIDE SKELETON on success
    $('#customer-details-content').fadeIn();

    // --- Helper function to populate a field with text ---
    var populateField = function populateField(selector, value) {
      var textValue = value || 'N/A'; // Use 'N/A' for any null or empty values
      $(selector).text(textValue);
    };

    // --- Populate Summary Card (Right Column) ---
    populateField('#summary-name', customer.getFullName());
    populateField('#summary-email', customer.email);

    // Handle the status badge
    var statusBadge = $('#summary-status-badge');
    statusBadge.text(customer.customerStatus);
    // Remove previous color classes and add the correct one
    statusBadge.removeClass('bg-success bg-danger');
    if (customer.isActive()) {
      statusBadge.addClass('bg-success');
    } else {
      statusBadge.addClass('bg-danger');
    }

    // --- Populate General Information Card (Left Column) ---
    populateField('#detail-id', customer.id);
    populateField('#detail-fullname', customer.getFullName());
    populateField('#detail-email', customer.email);
    populateField('#detail-phone', customer.phone);
    populateField('#detail-document', customer.document);

    // --- Populate SPEI Payment Details Card ---
    populateField('#detail-spei-clabe', customer.speiClabe);

    // Handle the SPEI Alias list
    var speiAliasList = $('#detail-spei-alias-list');
    speiAliasList.empty(); // Clear any previous list items
    if (customer.speiAlias && customer.speiAlias.length > 0) {
      customer.speiAlias.forEach(function (alias) {
        speiAliasList.append("<li>".concat(alias, "</li>"));
      });
    } else {
      speiAliasList.append('<li>N/A</li>');
    }

    // --- Populate Cash Payment Details Card ---
    populateField('#detail-cash-reference', customer.cashReference);
    populateField('#detail-cash-alias', customer.cashAlias);

    // --- Hide loader and show the content ---
    $('#details-loader').hide();
    $('#customer-details-content').fadeIn(); // Use fadeIn for a smoother effect
  }
};

},{"../models/customer-minified.model":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeApi = void 0;
var _apiClient = require("../../../core/api/api.client.js");
/**
 * @file home.api.js
 *
 * This file uses the centralized apiClient to make specific requests
 * for the Home module. It no longer contains any direct ajax calls.
 */

var homeApi = exports.homeApi = {
  /**
   * Fetches the dashboard data for the authenticated user.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getDashboardData: function getDashboardData() {
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/summary");
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  }
};

},{"../../../core/api/api.client.js":2}],26:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeRepository = void 0;
var _homeApi = require("./home.api.js");
var _dashboardSummaryModel = require("../models/dashboard-summary.model.js");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var homeRepository = exports.homeRepository = {
  /**
   * Retrieves the dashboard summary data, utilizing a 5-minute cache in localStorage.
   * @returns {Promise<DashboardSummary>} A promise that resolves with the dashboard data.
   */
  getDashboardData: function () {
    var _getDashboardData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var CACHE_KEY, CACHE_DURATION_MS, cachedItemStr, cachedItem, cacheAge, response, newItemToCache, _response$error;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            CACHE_KEY = 'dashboardSummaryCache';
            CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes in milliseconds
            // 1. Try to retrieve data from the cache first
            cachedItemStr = localStorage.getItem(CACHE_KEY);
            if (!cachedItemStr) {
              _context.next = 18;
              break;
            }
            _context.prev = 4;
            cachedItem = JSON.parse(cachedItemStr);
            cacheAge = Date.now() - cachedItem.timestamp; // 2. Check if the cache is still valid (less than 5 minutes old)
            if (!(cacheAge < CACHE_DURATION_MS)) {
              _context.next = 12;
              break;
            }
            console.log('Returning dashboard summary from cache.');
            // If valid, use the cached data and skip the API call
            return _context.abrupt("return", _dashboardSummaryModel.DashboardSummary.fromDTO(cachedItem.data));
          case 12:
            console.log('Cache is stale. Fetching fresh data.');
          case 13:
            _context.next = 18;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            console.error('Failed to parse cache. Fetching fresh data.', _context.t0);
          case 18:
            // 3. If cache is empty or stale, fetch from the API
            console.log('Fetching new dashboard summary from API.');
            _context.prev = 19;
            _context.next = 22;
            return _homeApi.homeApi.getDashboardData();
          case 22:
            response = _context.sent;
            if (!(response.success && response.data)) {
              _context.next = 29;
              break;
            }
            // 4. On successful fetch, store the new data and timestamp in the cache
            newItemToCache = {
              timestamp: Date.now(),
              data: response.data // Store the raw data from the API
            };
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(newItemToCache));
              console.log('Dashboard summary has been cached.');
            } catch (e) {
              console.error('Failed to write to localStorage. Caching is likely disabled or full.', e);
            }

            // Return the newly fetched data
            return _context.abrupt("return", _dashboardSummaryModel.DashboardSummary.fromDTO(response.data));
          case 29:
            // Handle API error response
            console.error('Failed to retrieve dashboard data:', ((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.message) || 'Unexpected response format.');
            throw new Error('Dashboard data not found or invalid response format.');
          case 31:
            _context.next = 37;
            break;
          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](19);
            // Handle network or other fetch errors
            console.error('An error occurred during the API call:', _context.t1);
            // Re-throw the error so the calling function can handle it (e.g., show an error message)
            throw _context.t1;
          case 37:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4, 15], [19, 33]]);
    }));
    function getDashboardData() {
      return _getDashboardData.apply(this, arguments);
    }
    return getDashboardData;
  }()
};

},{"../models/dashboard-summary.model.js":29,"./home.api.js":25}],27:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeService = void 0;
var _home = require("../data/home.repository");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var homeService = exports.homeService = {
  /**
   * Retrieves the dashboard data for the authenticated user.
   * @returns {Promise<DashboardSummary>} A promise that resolves with the dashboard summary.
   */
  getDashboardData: function () {
    var _getDashboardData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _home.homeRepository.getDashboardData();
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error('Error fetching dashboard data:', _context.t0);
            throw _context.t0;
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }));
    function getDashboardData() {
      return _getDashboardData.apply(this, arguments);
    }
    return getDashboardData;
  }()
};

},{"../data/home.repository":26}],28:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _homeUi = require("./ui/home.ui.js");
var _authService = require("../auth/domain/auth.service.js");
var _home = require("./domain/home.service");
var _customer = require("../customer/domain/customer.service");
var _customer2 = require("../customer/ui/customer.ui");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
$(document).ready(function () {
  // Render the top bar user profile on the home page.
  if ($('#user-profile-home').length > 0) {
    var user = _authService.authService.getUserProfile();
    if (user) {
      _homeUi.homeUI.renderTopBarUserProfile(user);
    } else {
      console.error("No user profile data found.");
    }
  }

  // Renders the user profile section on the user profile page.
  if ($('#user-profile-page').length > 0) {
    var _user = _authService.authService.getUserProfile();
    if (_user) {
      _homeUi.homeUI.renderUserProfile(_user);
    } else {
      console.error("No user profile data found.");
    }
  }
  if ($('#spei-dashboard-page').length > 0) {
    // Load the dashboard data when the page is ready
    var loadSpeiDashboardData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var dashboardData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _home.homeService.getDashboardData();
            case 3:
              dashboardData = _context.sent;
              if (dashboardData) {
                _homeUi.homeUI.renderSpeiDashboardSummary(dashboardData);
                $('#dashboard-skeleton-loader').hide();
                $('#dashboard-content').fadeIn();
              } else {
                $('#dashboard-skeleton-loader').hide();
                $('#dashboard-content').html("\n            <div class=\"alert alert-danger\" role=\"alert\">\n                <i class=\"mdi mdi-block-helper me-2\"></i>\n                Could not load dashboard data. Please try again later.\n            </div>\n        ").show();
              }
              _context.next = 12;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error("Error loading dashboard data:", _context.t0);
              $('#dashboard-skeleton-loader').hide();
              $('#dashboard-content').html("\n            <div class=\"alert alert-danger\" role=\"alert\">\n                <i class=\"mdi mdi-block-helper me-2\"></i>\n                Could not load dashboard data. Please try again later.\n            </div>\n        ").show();
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      return function loadSpeiDashboardData() {
        return _ref.apply(this, arguments);
      };
    }();
    loadSpeiDashboardData();
  }
  if ($('#checkout-dashboard-page').length > 0) {
    // Load the dashboard data when the page is ready
    var _loadSpeiDashboardData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var dashboardData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _home.homeService.getDashboardData();
            case 3:
              dashboardData = _context2.sent;
              if (dashboardData) {
                _homeUi.homeUI.renderCheckoutDashboardSummary(dashboardData);
                $('#dashboard-skeleton-loader').hide();
                $('#dashboard-content').fadeIn();
              } else {
                $('#dashboard-skeleton-loader').hide();
                $('#dashboard-content').html("\n            <div class=\"alert alert-danger\" role=\"alert\">\n                <i class=\"mdi mdi-block-helper me-2\"></i>\n                Could not load dashboard data. Please try again later.\n            </div>\n        ").show();
              }
              _context2.next = 12;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error("Error loading dashboard data:", _context2.t0);
              $('#dashboard-skeleton-loader').hide();
              $('#dashboard-content').html("\n            <div class=\"alert alert-danger\" role=\"alert\">\n                <i class=\"mdi mdi-block-helper me-2\"></i>\n                Could not load dashboard data. Please try again later.\n            </div>\n        ").show();
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      return function _loadSpeiDashboardData() {
        return _ref2.apply(this, arguments);
      };
    }();
    _loadSpeiDashboardData();
  }
  $('#send-support-email').on('click', function (e) {
    console.log("Support email button clicked.");
    // This will open the user's default email client
    // with the 'To' field pre-filled.
    e.preventDefault();
    window.location.href = 'mailto:support@test.com';
  });
});

},{"../auth/domain/auth.service.js":8,"../customer/domain/customer.service":20,"../customer/ui/customer.ui":24,"./domain/home.service":27,"./ui/home.ui.js":30}],29:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionSummary = exports.TransactionBreakdown = exports.TimeSeriesSummary = exports.SpeiTransactionSummary = exports.DashboardSummary = exports.DailyVolume = exports.DailyCount = exports.CustomerSummary = void 0;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
/**
 * @typedef {object} DailyDataPoint
 * @property {string} date
 * @property {number} count
 */
/**
 * @typedef {object} DailyVolumeDataPoint
 * @property {string} date
 * @property {number} count
 * @property {number} amount
 */
/**
 * Represents the breakdown of transactions by status.
 */
var TransactionBreakdown = exports.TransactionBreakdown = /*#__PURE__*/_createClass(
/**
 * @param {object} dto - The raw data object for the breakdown.
 */
function TransactionBreakdown() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, TransactionBreakdown);
  /** @type {number} */
  this.succeeded = dto.succeeded || 0;
  /** @type {number} */
  this.failed = dto.failed || 0;
  /** @type {number} */
  this.pending = dto.pending || 0;
});
/**
 * Represents the summary for a type of transaction (e.g., SPEI or Checkout).
 */
var SpeiTransactionSummary = exports.SpeiTransactionSummary = /*#__PURE__*/_createClass(
/**
 * @param {object} dto - The raw data object for the transaction summary.
 */
function SpeiTransactionSummary() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, SpeiTransactionSummary);
  /** @type {number} */
  this.totalCount = dto.totalCount || 0;
  /** @type {number} */
  this.totalAmount = dto.totalAmount || 0;
  /** @type {number} */
  this.countChangePercentage = dto.countChangePercentage || 0;
  /** @type {number} */
  this.amountChangePercentage = dto.amountChangePercentage || 0;
  /** @type {number} */
  this.averageValue = dto.averageValue || 0;
  /** @type {number} */
  this.successRatePercentage = dto.successRatePercentage || 0;
  /** @type {number} */
  this.actualBalance = dto.actualBalance || 0.0;
  /** @type {string} */
  this.accountClabe = dto.accountClabe || "N/A";
  /** @type {TransactionBreakdown} */
  this.breakdown = new TransactionBreakdown(dto.breakdown);
});
/**
 * Represents the summary for a type of transaction (e.g., SPEI or Checkout).
 */
var TransactionSummary = exports.TransactionSummary = /*#__PURE__*/_createClass(
/**
 * @param {object} dto - The raw data object for the transaction summary.
 */
function TransactionSummary() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, TransactionSummary);
  /** @type {number} */
  this.totalCount = dto.totalCount || 0;
  /** @type {number} */
  this.totalAmount = dto.totalAmount || 0;
  /** @type {number} */
  this.countChangePercentage = dto.countChangePercentage || 0;
  /** @type {number} */
  this.amountChangePercentage = dto.amountChangePercentage || 0;
  /** @type {number} */
  this.averageValue = dto.averageValue || 0;
  /** @type {number} */
  this.successRatePercentage = dto.successRatePercentage || 0;
  /** @type {TransactionBreakdown} */
  this.breakdown = new TransactionBreakdown(dto.breakdown);
});
/**
 * Represents the summary for customer data.
 */
var CustomerSummary = exports.CustomerSummary = /*#__PURE__*/_createClass(
/**
 * @param {object} dto - The raw data object for the customer summary.
 */
function CustomerSummary() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, CustomerSummary);
  /** @type {number} */
  this.totalCount = dto.totalCount || 0;
  /** @type {number} */
  this.newLast30Days = dto.newLast30Days || 0;
  /** @type {number} */
  this.newLastWeek = dto.newLastWeek || 0;
  /** @type {number} */
  this.weeklyGrowthPercentage = dto.weeklyGrowthPercentage || 0;
});
/**
 * Represents a single day's data point with a count.
 */
var DailyCount = exports.DailyCount = /*#__PURE__*/_createClass(
/**
 * @param {DailyDataPoint} dto
 */
function DailyCount() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, DailyCount);
  /** @type {string} */
  this.date = dto.date || '';
  /** @type {number} */
  this.count = dto.count || 0;
});
/**
 * Represents a single day's data point with count and amount.
 */
var DailyVolume = exports.DailyVolume = /*#__PURE__*/_createClass(
/**
 * @param {DailyVolumeDataPoint} dto
 */
function DailyVolume() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, DailyVolume);
  /** @type {string} */
  this.date = dto.date || '';
  /** @type {number} */
  this.count = dto.count || 0;
  /** @type {number} */
  this.amount = dto.amount || 0;
});
/**
 * Represents the time series data for charts.
 */
var TimeSeriesSummary = exports.TimeSeriesSummary = /*#__PURE__*/_createClass(
/**
 * @param {object} dto - The raw data object for the time series.
 */
function TimeSeriesSummary() {
  var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, TimeSeriesSummary);
  /** @type {DailyVolume[]} */
  this.dailyTransactionVolume = (dto.dailyTransactionVolume || []).map(function (item) {
    return new DailyVolume(item);
  });

  /** @type {DailyCount[]} */
  this.dailyNewCustomers = (dto.dailyNewCustomers || []).map(function (item) {
    return new DailyCount(item);
  });

  /** @type {DailyVolume[]} */
  this.dailyCheckoutOrders = (dto.dailyCheckoutOrders || []).map(function (item) {
    return new DailyVolume(item);
  });
});
/**
 * The main class representing the entire dashboard summary response.
 * This is the primary class you will instantiate.
 */
var DashboardSummary = exports.DashboardSummary = /*#__PURE__*/function () {
  /**
   * @param {object} dto - The full raw JSON object from the API.
   */
  function DashboardSummary() {
    var dto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, DashboardSummary);
    /** @type {SpeiTransactionSummary} */
    this.speiTransactions = new SpeiTransactionSummary(dto.speiTransactions);

    /** @type {CustomerSummary} */
    this.customers = new CustomerSummary(dto.customers);

    /** @type {TransactionSummary} */
    this.checkoutOrders = new TransactionSummary(dto.checkoutOrders);

    /** @type {TimeSeriesSummary} */
    this.timeSeries = new TimeSeriesSummary(dto.timeSeries);
  }

  /**
   * A static factory method to create an instance from a raw DTO.
   * @param {object} dto - The full raw JSON object from the API.
   * @returns {DashboardSummary}
   */
  return _createClass(DashboardSummary, null, [{
    key: "fromDTO",
    value: function fromDTO(dto) {
      return new DashboardSummary(dto);
    }
  }]);
}();

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeUI = void 0;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var homeUI = exports.homeUI = {
  elements: {
    userProfileTopBarName: '#user-profile-topbar-name',
    userProfileTopBarEmail: '#user-profile-topbar-email',
    userProfileName: '#profile-name',
    userProfileEmail: '#profile-email',
    userProfileStatus: '#profile-status',
    userProfileRoles: '#profile-roles',
    //     Dashboard Elements
    //    -- SPEI Transactions Elements
    dashSpeiQty: "#dash-spei-qty",
    dashSpeiQtyChangePercent: "#dash-spei-qty-change-percent",
    dashSpeiQtyChangeContainer: "#dash-spei-qty-change-container",
    dashSpeiQtyChangeIcon: "#dash-spei-qty-change-icon",
    dashSpeiAmount: "#dash-spei-amount",
    dashSpeiAmountChangePercent: "#dash-spei-amount-change-percent",
    dashSpeiAmountChangeContainer: "#dash-spei-amount-change-container",
    dashSpeiAmountChangeIcon: "#dash-spei-amount-change-icon",
    dashSpeiAverage: "#dash-spei-average",
    dashSpeiSuccessRate: "#dash-spei-success-rate",
    dashSpeiAccountBalance: "#dash-spei-account-balance",
    dashSpeiAccountCLABE: "#dash-spei-account-clabe",
    //    -- CHECKOUT Order Elements
    dashCheckoutQty: "#dash-checkout-qty",
    dashCheckoutQtyChangePercent: "#dash-checkout-qty-change-percent",
    dashCheckoutQtyChangeContainer: "#dash-checkout-qty-change-container",
    dashCheckoutQtyChangeIcon: "#dash-checkout-qty-change-icon",
    dashCheckoutAmount: "#dash-checkout-amount",
    dashCheckoutAmountChangePercent: "#dash-checkout-amount-change-percent",
    dashCheckoutAmountChangeContainer: "#dash-checkout-amount-change-container",
    dashCheckoutAmountChangeIcon: "#dash-checkout-amount-change-icon",
    dashCheckoutAverage: "#dash-checkout-average",
    dashCheckoutSuccessRate: "#dash-checkout-success-rate",
    //     -- Customer Elements
    dashCustomerQty: "#dash-customer-qty",
    dashCustomerChangePercent: "#dash-customer-change-percent",
    dashCustomerChangeContainer: "#dash-customer-change-container",
    dashCustomerChangeIcon: "#dash-customer-change-icon"
  },
  /**
   * Renders the user profile section on the home page.
   * @param user {UserProfile} The user profile object containing user details.
   */
  renderTopBarUserProfile: function renderTopBarUserProfile(user) {
    if (!user) {
      console.error("No user profile data provided.");
      return;
    }

    // Update the user profile name and email in the UI
    $(this.elements.userProfileTopBarName).text(user.name || 'N/A');
    $(this.elements.userProfileTopBarEmail).text(user.email || 'N/A');

    // Optionally, you can add more user details here
  },
  renderUserProfile: function renderUserProfile(user) {
    if (!user) {
      console.error("No user profile data provided.");
      return;
    }
    $(this.elements.userProfileName).text(user.name || 'N/A');
    $(this.elements.userProfileEmail).text(user.email || 'N/A');

    // Render status with a badge
    if (user.active) {
      $(this.elements.userProfileStatus).html('<span class="badge bg-success">Active</span>');
    } else {
      $(this.elements.userProfileStatus).html('<span class="badge bg-danger">Inactive</span>');
    }

    // Render roles
    $(this.elements.userProfileRoles).text(user.roles.join(', ') || 'N/A');
  },
  /**
   * Renders the dashboard summary section on the home page.
   * @param summary {DashboardSummary} The dashboard summary object containing summary details.
   */
  renderSpeiDashboardSummary: function renderSpeiDashboardSummary(summary) {
    // SPEI Transactions
    var speiData = summary.speiTransactions;

    // 1. Spei Qty
    $(this.elements.dashSpeiQty).text(speiData.totalCount || 'N/A');
    $(this.elements.dashSpeiQtyChangePercent).text("".concat(Math.abs(speiData.countChangePercentage).toFixed(2), "%"));
    var changeContainerSpeiQtyEl = $(this.elements.dashSpeiQtyChangeContainer);
    var changeIconSpeiQtyEl = $(this.elements.dashSpeiQtyChangeIcon);
    changeContainerSpeiQtyEl.removeClass('text-success text-danger');
    changeIconSpeiQtyEl.removeClass('mdi-arrow-up-bold mdi-arrow-down-bold');
    if (speiData.countChangePercentage >= 0) {
      changeContainerSpeiQtyEl.addClass('text-success');
      changeIconSpeiQtyEl.addClass('mdi-arrow-up-bold');
    } else {
      changeContainerSpeiQtyEl.addClass('text-danger');
      changeIconSpeiQtyEl.addClass('mdi-arrow-down-bold');
    }

    // 2. Spei Amount
    $(this.elements.dashSpeiAmount).text("$".concat(Math.abs(speiData.totalAmount).toFixed(2)));
    $(this.elements.dashSpeiAmountChangePercent).text("".concat(Math.abs(speiData.amountChangePercentage).toFixed(2), "%"));
    var changeContainerSpeiAmountEl = $(this.elements.dashSpeiAmountChangeContainer);
    var changeIconSpeiAmountEl = $(this.elements.dashSpeiAmountChangeIcon);
    changeContainerSpeiAmountEl.removeClass('text-success text-danger');
    changeIconSpeiAmountEl.removeClass('mdi-arrow-up-bold mdi-arrow-down-bold');
    if (speiData.countChangePercentage >= 0) {
      changeContainerSpeiAmountEl.addClass('text-success');
      changeIconSpeiAmountEl.addClass('mdi-arrow-up-bold');
    } else {
      changeContainerSpeiAmountEl.addClass('text-danger');
      changeIconSpeiAmountEl.addClass('mdi-arrow-down-bold');
    }

    // 3. Average & Success Rate
    $(this.elements.dashSpeiAverage).text("$".concat(Math.abs(speiData.averageValue).toFixed(2)));
    $(this.elements.dashSpeiSuccessRate).text("".concat(Math.abs(speiData.successRatePercentage).toFixed(2), "%"));

    // --- Populate SPEI Transactions Breakdown Chart ---
    if (summary.speiTransactions && summary.speiTransactions.breakdown) {
      this._renderSpeiBreakdownChart(summary.speiTransactions.breakdown);
    }

    // --- Populate Daily Transaction Volume Chart ---
    if (summary.timeSeries && summary.timeSeries.dailyTransactionVolume) {
      this._renderTransactionVolumeChart(summary.timeSeries.dailyTransactionVolume);
    }

    // --- Populate Daily Transaction Volume Chart ---
    if (speiData.actualBalance) {
      $(this.elements.dashSpeiAccountBalance).text("$".concat(Math.abs(speiData.actualBalance).toFixed(2)));
    }

    // --- Populate Daily Transaction Volume Chart ---
    if (speiData.accountClabe) {
      $(this.elements.dashSpeiAccountCLABE).text(speiData.accountClabe || 'N/A');
    }
  },
  /**
   * Renders the dashboard summary section on the home page.
   * @param summary {DashboardSummary} The dashboard summary object containing summary details.
   */
  renderCheckoutDashboardSummary: function renderCheckoutDashboardSummary(summary) {
    // SPEI Transactions
    var checkoutData = summary.checkoutOrders;

    // 1. checkout Qty
    $(this.elements.dashCheckoutQty).text(checkoutData.totalCount || 'N/A');
    $(this.elements.dashCheckoutQtyChangePercent).text("".concat(Math.abs(checkoutData.countChangePercentage).toFixed(2), "%"));
    var changeContainerCheckoutQtyEl = $(this.elements.dashCheckoutQtyChangeContainer);
    var changeIconCheckoutQtyEl = $(this.elements.dashCheckoutQtyChangeIcon);
    changeContainerCheckoutQtyEl.removeClass('text-success text-danger');
    changeIconCheckoutQtyEl.removeClass('mdi-arrow-up-bold mdi-arrow-down-bold');
    if (checkoutData.countChangePercentage >= 0) {
      changeContainerCheckoutQtyEl.addClass('text-success');
      changeIconCheckoutQtyEl.addClass('mdi-arrow-up-bold');
    } else {
      changeContainerCheckoutQtyEl.addClass('text-danger');
      changeIconCheckoutQtyEl.addClass('mdi-arrow-down-bold');
    }

    // 2. Checkout Amount
    $(this.elements.dashCheckoutAmount).text("$".concat(Math.abs(checkoutData.totalAmount).toFixed(2)));
    $(this.elements.dashCheckoutAmountChangePercent).text("".concat(Math.abs(checkoutData.amountChangePercentage).toFixed(2), "%"));
    var changeContainerCheckoutAmountEl = $(this.elements.dashCheckoutAmountChangeContainer);
    var changeIconCheckoutAmountEl = $(this.elements.dashCheckoutAmountChangeIcon);
    changeContainerCheckoutAmountEl.removeClass('text-success text-danger');
    changeIconCheckoutAmountEl.removeClass('mdi-arrow-up-bold mdi-arrow-down-bold');
    if (checkoutData.countChangePercentage >= 0) {
      changeContainerCheckoutAmountEl.addClass('text-success');
      changeIconCheckoutAmountEl.addClass('mdi-arrow-up-bold');
    } else {
      changeContainerCheckoutAmountEl.addClass('text-danger');
      changeIconCheckoutAmountEl.addClass('mdi-arrow-down-bold');
    }

    // 3. Average & Success Rate
    $(this.elements.dashCheckoutAverage).text("$".concat(Math.abs(checkoutData.averageValue).toFixed(2)));
    $(this.elements.dashCheckoutSuccessRate).text("".concat(Math.abs(checkoutData.successRatePercentage).toFixed(2), "%"));

    // --- Populate SPEI Transactions Breakdown Chart ---
    if (summary.checkoutOrders && summary.checkoutOrders.breakdown) {
      this._renderSpeiBreakdownChart(summary.checkoutOrders.breakdown);
    }

    // --- Populate Daily Transaction Volume Chart ---
    if (summary.timeSeries && summary.timeSeries.dailyCheckoutOrders) {
      this._renderTransactionVolumeChart(summary.timeSeries.dailyCheckoutOrders);
    }
  },
  /**
   * Renders the SPEI transaction breakdown donut chart and its custom legend.
   * @param {TransactionBreakdown} breakdown - The breakdown object from the summary.
   */
  _renderSpeiBreakdownChart: function _renderSpeiBreakdownChart(breakdown) {
    // --- 1. Chart Data and Configuration ---
    var seriesData = [breakdown.succeeded, breakdown.failed, breakdown.pending];
    var labels = ['Exitosas', 'Fallidas', 'Pendientes'];

    // Match these colors to your theme and legend
    // From data-colors: #727cf5 (primary), #0acf97 (success), #fa5c7c (danger)
    var colors = ['#0acf97', '#fa5c7c', '#727cf5'];
    var options = {
      chart: {
        height: 320,
        type: 'donut'
      },
      series: seriesData,
      legend: {
        show: false // We are using a custom HTML legend
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      labels: labels,
      colors: colors
    };
    var chartContainer = document.querySelector("#average-sales");
    if (chartContainer) {
      // Clear previous chart before rendering a new one
      chartContainer.innerHTML = '';
      var chart = new ApexCharts(chartContainer, options);
      chart.render();
    }

    // --- 2. Custom Legend Population ---
    var legendContainer = $('.chart-widget-list');
    legendContainer.empty(); // Clear existing legend items

    var legendData = [{
      label: 'Exitosas',
      value: breakdown.succeeded,
      colorClass: 'success'
    }, {
      label: 'Fallidas',
      value: breakdown.failed,
      colorClass: 'danger'
    }, {
      label: 'Pendientes',
      value: breakdown.pending,
      colorClass: 'primary'
    }];
    legendData.forEach(function (item) {
      var legendHtml = "\n                <p>\n                    <i class=\"mdi mdi-square text-".concat(item.colorClass, "\"></i> ").concat(item.label, "\n                    <span class=\"float-end\">").concat(item.value.toLocaleString('en-US'), "</span>\n                </p>\n            ");
      legendContainer.append(legendHtml);
    });
  },
  /**
   * Renders the daily transaction volume line chart for the last 7 days.
   * @param {DailyVolume[]} dailyData - An array of the last 7 days of transaction volume.
   */
  _renderTransactionVolumeChart: function _renderTransactionVolumeChart(dailyData) {
    if (!dailyData || dailyData.length === 0) {
      return; // Don't render the chart if there's no data
    }

    // --- 1. Update the "Transacciones Hoy" overlay ---
    // The first item in the array is today's data
    var todayData = dailyData[0];
    var formattedTodayAmount = todayData.amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD' // Change to your desired currency if needed
    });
    $('.dash-item-overlay h5').text("Transacciones Hoy: ".concat(formattedTodayAmount));

    // --- 2. Prepare Data for the Chart ---
    // The data comes in reverse chronological order, so we reverse it for the chart's x-axis.
    var chartData = _toConsumableArray(dailyData).reverse();

    // Create labels for the x-axis (e.g., "19 Jun")
    var chartLabels = chartData.map(function (item) {
      var date = new Date(item.date);
      // Adding a day to account for potential timezone offset issues with UTC dates
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString('es-PA', {
        day: 'numeric',
        month: 'short'
      });
    });

    // Create the series data for the y-axis (the amounts)
    var seriesData = chartData.map(function (item) {
      return item.amount.toFixed(2);
    });

    // --- 3. Chart Configuration ---
    var options = {
      chart: {
        height: 341,
        type: 'line',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: true,
          top: 20,
          left: 0,
          blur: 6,
          color: '#4250f7',
          opacity: 0.2
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      series: [{
        name: 'Monto',
        data: seriesData
      }],
      xaxis: {
        categories: chartLabels,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function formatter(val) {
            return "$" + val.toLocaleString('en-US');
          }
        }
      },
      tooltip: {
        y: {
          formatter: function formatter(val) {
            return "$" + val.toLocaleString('en-US');
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 20,
          right: 20
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#727cf5"] // From data-colors attribute in the HTML
    };
    var chartContainer = document.querySelector("#revenue-chart");
    if (chartContainer) {
      // Clear previous chart before rendering a new one
      chartContainer.innerHTML = '';
      var chart = new ApexCharts(chartContainer, options);
      chart.render();
    }
  }
};

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speiApi = void 0;
var _apiClient = require("../../../core/api/api.client.js");
/**
 * spei.api.js
 *
 * This file uses the centralized apiClient to make specific requests
 * for the SPEI module. It no longer contains any direct ajax calls.
 */

var speiApi = exports.speiApi = {
  /**
   * Fetches a paginated list of SPEI transactions.
   * @param {number} page The page number to fetch (0-indexed).
   * @param {number} pageSize The number of items per page.
   * @param filters {Object} An object containing filter parameters for the request. Optional
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>} A promise that resolves with a standardized ApiResponse object.
   */
  getTransactions: function getTransactions(_ref) {
    var page = _ref.page,
      pageSize = _ref.pageSize,
      filters = _ref.filters;
    if (page == null) {
      page = 0;
    }
    if (pageSize == null) {
      pageSize = 10; // Default page size if not provided
    }
    var params = new URLSearchParams({
      page: page,
      page_size: pageSize
    });

    // Add filter parameters only if they have a value
    for (var key in filters) {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    }
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/spei/transaction?").concat(params.toString());
    // Construct the URL with pagination query parameters
    return _apiClient.apiClient.get(endpoint);
  },
  /**
   * Fetches a single SPEI transaction by its ID.
   * @param {string} transactionId The ID of the transaction to fetch.
   * @returns {Promise<import('../../../core/api/api.client.js').ApiResponse>}
   */
  getTransactionById: function getTransactionById(transactionId) {
    // FIX: Using the correct singular endpoint from your curl command.
    console.log("Fetching transaction details for ID:", transactionId);
    var endpoint = "".concat(_apiClient.apiClient.TRANSACTION_BASE_URL, "/spei/transaction/").concat(transactionId);
    console.log("Constructed endpoint:", endpoint);
    return _apiClient.apiClient.get(endpoint);
  }
};

},{"../../../core/api/api.client.js":2}],32:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speiRepository = void 0;
var _speiApi = require("./spei.api.js");
var _speiTransactionModel = require("../models/spei-transaction.model.js");
var _webhookNotification = require("../models/webhook-notification.model");
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * spei.repository.js
 *
 * This file serves as a repository for SPEI transaction data. It uses the
 * spei.api.js module to fetch data and translates it into domain models.
 */
var speiRepository = exports.speiRepository = {
  /**
   * Retrieves a paginated and filtered list of SPEI transactions.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<SpeiTransaction[]>}
   */
  getTransactions: function () {
    var _getTransactions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _speiApi.speiApi.getTransactions(params);
          case 2:
            response = _context.sent;
            if (!(response.success && response.data && Array.isArray(response.data))) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", response.data.map(function (rawData) {
              return new _speiTransactionModel.SpeiTransaction(rawData);
            }));
          case 7:
            if (!response.success) {
              console.error('Failed to retrieve transactions from repository:', response.error.message);
            } else {
              console.error('API response.data is not in the expected array format:', response.data);
            }
            return _context.abrupt("return", []);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getTransactions(_x) {
      return _getTransactions.apply(this, arguments);
    }
    return getTransactions;
  }(),
  /**
   * Retrieves a single transaction and its related webhooks.
   * @param {string} transactionId The ID of the transaction to fetch.
   * @returns {Promise<{transaction: SpeiTransaction, webhooks: WebhookNotification[]}|null>}
   */
  getTransactionById: function () {
    var _getTransactionById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(transactionId) {
      var response, transaction, webhooks, _response$error;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _speiApi.speiApi.getTransactionById(transactionId);
          case 2:
            response = _context2.sent;
            if (!(response.success && response.data)) {
              _context2.next = 10;
              break;
            }
            transaction = new _speiTransactionModel.SpeiTransaction(response.data);
            webhooks = []; // Check for the nested webhooks array and map it to the model
            if (response.data.webhooks && Array.isArray(response.data.webhooks)) {
              webhooks = response.data.webhooks.map(function (wh) {
                return new _webhookNotification.WebhookNotification(wh);
              });
            }
            return _context2.abrupt("return", {
              transaction: transaction,
              webhooks: webhooks
            });
          case 10:
            console.error('Failed to retrieve transaction by ID:', (_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.message);
            return _context2.abrupt("return", null);
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getTransactionById(_x2) {
      return _getTransactionById.apply(this, arguments);
    }
    return getTransactionById;
  }()
};

},{"../models/spei-transaction.model.js":35,"../models/webhook-notification.model":36,"./spei.api.js":31}],33:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speiService = void 0;
var _speiRepository = require("../data/spei.repository.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * spei.service.js
 *
 * This is the core business logic layer for the SPEI feature.
 * It uses the repository to fetch fully formed domain models and then applies
 * business rules, calculations, and transformations.
 */
var speiService = exports.speiService = {
  /**
   * Fetches paginated transaction models from the repository.
   * @param {number} page The page number to fetch.
   * @param {number} pageSize The number of items per page.
   * @returns {Promise<{transactions: import('./spei-transaction.model.js').SpeiTransaction[], pagination: object}>} A promise resolving with models and pagination info.
   */
  getProcessedTransactions: function () {
    var _getProcessedTransactions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(page, pageSize) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _speiRepository.speiRepository.getTransactions(page, pageSize);
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getProcessedTransactions(_x, _x2) {
      return _getProcessedTransactions.apply(this, arguments);
    }
    return getProcessedTransactions;
  }(),
  /**
   * Fetches paginated and filtered transaction models from the repository.
   * @param {object} params - Contains page, pageSize, and filters.
   * @returns {Promise<import('./spei-transaction.model.js').SpeiTransaction[]>}
   */
  getTransactions: function () {
    var _getTransactions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _speiRepository.speiRepository.getTransactions(params);
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getTransactions(_x3) {
      return _getTransactions.apply(this, arguments);
    }
    return getTransactions;
  }(),
  /**
   * Fetches details for a single transaction.
   * @param {string} transactionId The ID of the transaction.
   * @returns {Promise<import('./spei-transaction.model.js').SpeiTransaction|null>}
   */
  getTransactionDetails: function () {
    var _getTransactionDetails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(transactionId) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _speiRepository.speiRepository.getTransactionById(transactionId);
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function getTransactionDetails(_x4) {
      return _getTransactionDetails.apply(this, arguments);
    }
    return getTransactionDetails;
  }(),
  /**
   * Sorts an array of transactions locally.
   * @param {import('./spei-transaction.model.js').SpeiTransaction[]} transactions - The array of transactions to sort.
   * @param {string} sortBy - The property to sort by (e.g., 'amount', 'createdAt').
   * @param {string} sortOrder - The direction to sort ('asc' or 'desc').
   * @returns {import('./spei-transaction.model.js').SpeiTransaction[]} The sorted array of transactions.
   */
  sortTransactions: function sortTransactions(transactions, sortBy, sortOrder) {
    // Create a new array to avoid modifying the original
    var sortedTransactions = _toConsumableArray(transactions);
    sortedTransactions.sort(function (a, b) {
      var valA = a[sortBy];
      var valB = b[sortBy];

      // Handle different data types for proper sorting
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedTransactions;
  },
  /**
   * Calculates the total amount of all completed transactions.
   * This function now works with the methods on the SpeiTransaction model.
   * @returns {Promise<number>} The total amount.
   */
  calculateTotalCompletedAmount: function () {
    var _calculateTotalCompletedAmount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var transactions;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.getProcessedTransactions();
          case 2:
            transactions = _context4.sent;
            return _context4.abrupt("return", transactions.filter(function (tx) {
              return tx.isSuccessful();
            }) // Use the model's method
            .reduce(function (total, tx) {
              return total + tx.amount;
            }, 0));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function calculateTotalCompletedAmount() {
      return _calculateTotalCompletedAmount.apply(this, arguments);
    }
    return calculateTotalCompletedAmount;
  }(),
  /**
   * Fetches all filtered transactions (for export) and converts them to CSV format.
   * @param {object} allTransactions - The current transactions to export
   * @returns {Promise<string>} A promise resolving with the CSV string.
   */
  exportTransactionsToCsv: function () {
    var _exportTransactionsToCsv = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(allTransactions) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", this._convertToCsv(allTransactions));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function exportTransactionsToCsv(_x5) {
      return _exportTransactionsToCsv.apply(this, arguments);
    }
    return exportTransactionsToCsv;
  }(),
  /**
   * Converts an array of SpeiTransaction objects into a CSV string.
   * @param {SpeiTransaction[]} transactions - The transactions to convert.
   * @returns {string} The CSV formatted string.
   * @private
   */
  _convertToCsv: function _convertToCsv(transactions) {
    if (!transactions || transactions.length === 0) {
      return "No data to export.";
    }

    // Define CSV headers and corresponding data properties
    var headers = ["ID", "Tracking Key", "Beneficiary Name", "Amount", "Date", "Status", "Payer Name", "Payer RFC", "Payer CLABE", "Payer Institution", "Beneficiary RFC", "Beneficiary CLABE", "Payment Concept", "Numeric Reference", "Transaction Type", "Customer Transaction ID", "Customer ID", "Created At", "Updated At"];
    var properties = ["id", "trackingKey", "beneficiaryName", "amount", "createdAt", "status", "payerName", "payerRfc", "payerClabe", "payerInstitution", "beneficiaryRfc", "beneficiaryClabe", "paymentConcept", "numericReference", "transactionType", "customerTransactionId", "customerId", "createdAt", "updatedAt"];
    var csvContent = headers.join(',') + '\n';
    transactions.forEach(function (tx) {
      var row = properties.map(function (prop) {
        var value = tx[prop];
        if (value instanceof Date) {
          value = value.toLocaleString(); // Format Date objects
        } else if (typeof value === 'number') {
          value = value.toFixed(2); // Format numbers
        } else if (value === null || value === undefined) {
          value = ''; // Handle null/undefined
        } else {
          value = String(value).replace(/"/g, '""'); // Escape double quotes
          if (value.includes(',') || value.includes('\n')) {
            value = "\"".concat(value, "\""); // Quote if contains commas or newlines
          }
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });
    return csvContent;
  }
};

},{"../data/spei.repository.js":32}],34:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _speiService = require("./domain/spei.service.js");
var _speiUi = require("./ui/spei.ui.js");
var _file = require("../../core/utils/file.utils");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
$(document).ready(function () {
  console.log("Loaded this spei module.");

  // --- Logic for the Dashboard Widget (remains the same) ---
  if ($('#spei-home-widget-container').length > 0) {
    var loadRecentTransactions = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, transactions;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _speiUi.speiUI.showLoader();
              _context.prev = 1;
              params = {
                page: 0,
                pageSize: 4
              };
              _context.next = 5;
              return _speiService.speiService.getTransactions(params);
            case 5:
              transactions = _context.sent;
              _speiUi.speiUI.renderTransactions(transactions);
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.error("Error loading recent transactions:", _context.t0);
            case 12:
              _context.prev = 12;
              _speiUi.speiUI.hideLoader();
              return _context.finish(12);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 9, 12, 15]]);
      }));
      return function loadRecentTransactions() {
        return _ref.apply(this, arguments);
      };
    }(); // Handle clicking on a table row to navigate to details
    $('#spei-transactions-tbody').on('click', 'tr.clickable-row', function () {
      var transactionId = $(this).data('id');
      if (transactionId) {
        window.location.href = "/spei/spei-transaction-details.html?id=".concat(transactionId);
      }
    });
    loadRecentTransactions();
  }

  // --- Logic for the Full Transactions Page with Local Sorting and "Load More" ---
  if ($('#spei-transactions-page').length > 0) {
    // New state for filters
    /**
     * Takes the master list of transactions, sorts it, and updates the UI.
     */
    var sortAndRender = function sortAndRender() {
      var sortedData = _speiService.speiService.sortTransactions(allTransactions, currentSortBy, currentSortOrder);
      // Replace the entire table content with the newly sorted full list
      _speiUi.speiUI.renderTransactions(sortedData, false);
      _speiUi.speiUI.updateSortIcons(currentSortBy, currentSortOrder);
    };
    /**
     * Fetches the next page of data, adds it to the master list, and re-renders.
     */
    var loadMoreTransactions = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var isNewFilter,
          _allTransactions,
          params,
          newTransactions,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              isNewFilter = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
              _speiUi.speiUI.showLoader();
              if (isNewFilter) {
                currentPage = 0;
                allTransactions = []; // Reset the list for a new filter
              }
              _context2.prev = 3;
              params = {
                page: currentPage,
                pageSize: pageSize,
                filters: currentFilters
              };
              _context2.next = 7;
              return _speiService.speiService.getTransactions(params);
            case 7:
              newTransactions = _context2.sent;
              // const newTransactions = await speiService.getProcessedTransactions(currentPage, pageSize);

              // Add the new items to our master list
              (_allTransactions = allTransactions).push.apply(_allTransactions, _toConsumableArray(newTransactions));

              // Re-sort and re-render the entire list based on the current sort state
              sortAndRender();

              // Show/hide the "Load More" button based on if we received a full page of data
              _speiUi.speiUI.updateLoadMoreButton(newTransactions.length === pageSize);
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              console.error("Error loading more transactions:", _context2.t0);
            case 16:
              _context2.prev = 16;
              _speiUi.speiUI.hideLoader();
              return _context2.finish(16);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 13, 16, 19]]);
      }));
      return function loadMoreTransactions() {
        return _ref2.apply(this, arguments);
      };
    }(); // --- Event Listeners ---
    // Apply a new filter
    // --- State Management for the page ---
    var allTransactions = []; // Holds the full list of transactions loaded so far
    var currentPage = 0;
    var pageSize = 10;
    var currentSortBy = 'createdAt'; // Default sort column
    var currentSortOrder = 'desc'; // Default sort direction
    var currentFilters = {};
    $('#spei-apply-filter-button').on('click', function () {
      var field = $('#spei-new-filter-field').val();
      var value = $('#spei-new-filter-value').val();
      if (value) {
        currentFilters[field] = value;
        _speiUi.speiUI.renderFilterTags(currentFilters);
        _speiUi.speiUI.clearFilterInputs();
        loadMoreTransactions(true); // Load with new filter
      }
    });

    // Remove a filter tag
    $('#spei-filter-tags-container').on('click', '.remove-filter', function (e) {
      e.preventDefault();
      var keyToRemove = $(this).data('filter-key');
      delete currentFilters[keyToRemove];
      _speiUi.speiUI.renderFilterTags(currentFilters);
      loadMoreTransactions(true); // Reload with updated filters
    });

    // --- Event Listener for Column Header Clicks ---
    $('th.sortable').on('click', function () {
      var newSortBy = $(this).data('sort');
      if (currentSortBy === newSortBy) {
        // If clicking the same column, just toggle the direction
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // If clicking a new column, set it and default to ascending order
        currentSortBy = newSortBy;
        currentSortOrder = 'asc';
      }

      // Re-sort the existing data we already have, without fetching from the API
      sortAndRender();
    });

    // --- Event Listener for Load More Button ---
    $('#spei-load-more').on('click', function () {
      currentPage++;
      loadMoreTransactions();
    });

    // Handle clicking on a table row to navigate to details
    $('#spei-transactions-tbody').on('click', 'tr.clickable-row', function () {
      var transactionId = $(this).data('id');
      if (transactionId) {
        window.location.href = "/spei/spei-transaction-details.html?id=".concat(transactionId);
      }
    });

    // FIX: Event listener for Export Button
    $('#spei-export-csv-button').on('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var button, csvContent, filename;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            button = $(this);
            button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Exporting...');
            _context3.prev = 2;
            _context3.next = 5;
            return _speiService.speiService.exportTransactionsToCsv(allTransactions);
          case 5:
            csvContent = _context3.sent;
            filename = "spei_transactions_".concat(new Date().toISOString().split('T')[0], ".csv");
            _file.fileUtils.downloadFile(csvContent, filename, 'text/csv');
            _context3.next = 14;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            console.error("Error during CSV export:", _context3.t0);
            // Optionally show an error message to the user
            alert("Failed to export data. Please try again.");
          case 14:
            _context3.prev = 14;
            button.prop('disabled', false).html('<i class="uil uil-download-alt me-1"></i> Export to CSV');
            return _context3.finish(14);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[2, 10, 14, 17]]);
    })));

    // --- Initial Load for the first page of transactions ---
    loadMoreTransactions();
  }

  // --- Logic for the Transaction Details Page ---
  if ($('#spei-transaction-details-page').length > 0) {
    var loadTransactionDetails = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var result, transaction, webhooks;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _speiService.speiService.getTransactionDetails(transactionId);
            case 3:
              result = _context4.sent;
              if (result) {
                transaction = result.transaction, webhooks = result.webhooks;
                webhooksCache = webhooks;
                _speiUi.speiUI.renderTransactionDetails(transaction);
                _speiUi.speiUI.renderWebhooksTable(webhooks);
              } else {
                $('#spei-transaction-details-page').html('<div class="alert alert-danger">Transaction not found or an error occurred.</div>');
              }
              _context4.next = 11;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              console.error("Error loading transaction details:", _context4.t0);
              $('#spei-transaction-details-page').html('<div class="alert alert-danger">An unexpected error occurred while loading details.</div>');
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      return function loadTransactionDetails() {
        return _ref4.apply(this, arguments);
      };
    }(); // Event listener for clicking on a webhook row to show the modal
    var urlParams = new URLSearchParams(window.location.search);
    var transactionId = urlParams.get('id');
    var webhooksCache = []; // Cache the webhooks to avoid re-fetching

    if (!transactionId) {
      window.location.href = '/spei/spei-transactions.html';
      return;
    }
    $('#webhooks-tbody').on('click', '.webhook-row', function () {
      var webhookId = $(this).data('id');
      var selectedWebhook = webhooksCache.find(function (wh) {
        return wh.id === webhookId;
      });
      if (selectedWebhook) {
        _speiUi.speiUI.showWebhookDetailsModal(selectedWebhook);
      }
    });
    loadTransactionDetails();
  }
});

},{"../../core/utils/file.utils":5,"./domain/spei.service.js":33,"./ui/spei.ui.js":37}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeiTransaction = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * spei-transaction.model.js
 *
 * This file defines the SpeiTransaction class, which represents the core
 * domain model for a single SPEI transaction. It encapsulates the properties
 * and any related business logic for a transaction.
 * This class is responsible for mapping raw data from the API to a clean,
 * usable object for the rest of the application.
 */
var SpeiTransaction = exports.SpeiTransaction = /*#__PURE__*/function () {
  /**
   * @param {object} rawData - The raw transaction object from the repository.
   * @param {number} rawData.id
   * @param {string} rawData.date_of_transaction
   * @param {string} rawData.tracking_key
   * @param {string} rawData.amount
   * @param {string} rawData.status
   * @param {string} rawData.payer_name
   * @param {string} rawData.payer_rfc
   * @param {string} rawData.payer_clabe
   * @param {string} rawData.payer_institution
   * @param {string} rawData.beneficiary_name
   * @param {string} rawData.beneficiary_rfc
   * @param {string} rawData.beneficiary_clabe
   * @param {string} rawData.payment_concept
   * @param {string} rawData.numeric_reference
   * @param {string} rawData.transaction_type
   * @param {string} rawData.customer_transaction_id
   * @param {number} rawData.customer_id
   * @param {string} rawData.created_at
   * @param {string} rawData.updated_at
   */
  function SpeiTransaction(_ref) {
    var id = _ref.id,
      date_of_transaction = _ref.date_of_transaction,
      tracking_key = _ref.tracking_key,
      amount = _ref.amount,
      status = _ref.status,
      payer_name = _ref.payer_name,
      payer_rfc = _ref.payer_rfc,
      payer_clabe = _ref.payer_clabe,
      payer_institution = _ref.payer_institution,
      beneficiary_name = _ref.beneficiary_name,
      beneficiary_rfc = _ref.beneficiary_rfc,
      beneficiary_clabe = _ref.beneficiary_clabe,
      payment_concept = _ref.payment_concept,
      numeric_reference = _ref.numeric_reference,
      transaction_type = _ref.transaction_type,
      customer_transaction_id = _ref.customer_transaction_id,
      customer_id = _ref.customer_id,
      created_at = _ref.created_at,
      updated_at = _ref.updated_at;
    _classCallCheck(this, SpeiTransaction);
    /** @type {number} */
    this.id = id;
    /** @type {string} */
    this.dateOfTransaction = date_of_transaction;
    /** @type {string} */
    this.trackingKey = tracking_key;
    /** @type {number} */
    this.amount = parseFloat(amount);
    /** @type {string} */
    this.status = status;
    /** @type {string} */
    this.payerName = payer_name;
    /** @type {string} */
    this.payerRfc = payer_rfc;
    /** @type {string} */
    this.payerClabe = payer_clabe;
    /** @type {string} */
    this.payerInstitution = payer_institution;
    /** @type {string} */
    this.beneficiaryName = beneficiary_name;
    /** @type {string} */
    this.beneficiaryRfc = beneficiary_rfc;
    /** @type {string} */
    this.beneficiaryClabe = beneficiary_clabe;
    /** @type {string} */
    this.paymentConcept = payment_concept;
    /** @type {string} */
    this.numericReference = numeric_reference;
    /** @type {string} */
    this.transactionType = transaction_type;
    /** @type {string} */
    this.customerTransactionId = customer_transaction_id;
    /** @type {number} */
    this.customerId = customer_id;
    /** @type {Date} */
    this.createdAt = new Date(created_at);
    /** @type {Date} */
    this.updatedAt = new Date(updated_at);
  }

  /**
   * A simple business logic method example.
   * @returns {boolean} True if the transaction was successful.
   */
  return _createClass(SpeiTransaction, [{
    key: "isSuccessful",
    value: function isSuccessful() {
      return this.status === 'SUCCESS';
    }

    /**
     * Example of a computed property to get a formatted amount string.
     * @returns {string} A formatted amount string (e.g., "$410.00").
     */
  }, {
    key: "getFormattedAmount",
    value: function getFormattedAmount() {
      if (isNaN(this.amount)) {
        return '$0.00';
      }
      return "$".concat(this.amount.toFixed(2));
    }

    /**
     * A business logic method to determine a user-friendly status and color.
     * @returns {{text: string, colorClass: string}} An object with the status text and a corresponding Bootstrap color class.
     */
  }, {
    key: "getDisplayStatus",
    value: function getDisplayStatus() {
      switch (this.status) {
        case 'SUCCESS':
          return {
            text: 'Completed',
            colorClass: 'success'
          };
        case 'PENDING':
          return {
            text: 'Pending',
            colorClass: 'warning'
          };
        case 'FAILED':
          return {
            text: 'Failed',
            colorClass: 'danger'
          };
        case 'RETURNED':
          return {
            text: 'Returned',
            colorClass: 'info'
          };
        default:
          return {
            text: this.status,
            colorClass: 'secondary'
          };
      }
    }
  }]);
}();

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebhookNotification = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * webhook-notification.model.js
 *
 * Defines the WebhookNotification class, representing the domain model for
 * a single webhook notification record related to a transaction.
 */
var WebhookNotification = exports.WebhookNotification = /*#__PURE__*/function () {
  /**
   * @param {object} rawData - The raw webhook object from the API.
   */
  function WebhookNotification(_ref) {
    var id = _ref.id,
      request_id = _ref.request_id,
      attempts = _ref.attempts,
      first_sent_at = _ref.first_sent_at,
      status = _ref.status,
      scheduled_for_sending_at = _ref.scheduled_for_sending_at,
      event_type = _ref.event_type,
      event_type_description = _ref.event_type_description,
      notification_code = _ref.notification_code,
      transaction_id = _ref.transaction_id,
      detail_id = _ref.detail_id,
      detail_code = _ref.detail_code,
      detail_name = _ref.detail_name,
      detail_status = _ref.detail_status,
      detail_failed_reason = _ref.detail_failed_reason,
      detail_failed_message = _ref.detail_failed_message,
      detail_amount = _ref.detail_amount,
      metadata = _ref.metadata,
      created_at = _ref.created_at,
      updated_at = _ref.updated_at;
    _classCallCheck(this, WebhookNotification);
    this.id = id;
    this.requestId = request_id;
    this.attempts = attempts;
    this.firstSentAt = first_sent_at ? new Date(first_sent_at) : null;
    this.status = status;
    this.scheduledForSendingAt = scheduled_for_sending_at ? new Date(scheduled_for_sending_at) : null;
    this.eventType = event_type;
    this.eventTypeDescription = event_type_description;
    this.notificationCode = notification_code;
    this.transactionId = transaction_id;
    this.detailId = detail_id;
    this.detailCode = detail_code;
    this.detailName = detail_name;
    this.detailStatus = detail_status;
    this.detailFailedReason = detail_failed_reason;
    this.detailFailedMessage = detail_failed_message;
    this.detailAmount = detail_amount;
    // Safely parse metadata JSON string
    try {
      this.metadata = metadata ? JSON.parse(metadata) : null;
    } catch (e) {
      this.metadata = {
        raw: metadata
      }; // Store raw string if parsing fails
    }
    this.createdAt = new Date(created_at);
    this.updatedAt = new Date(updated_at);
  }

  /**
   * A business logic method to determine a user-friendly status and color.
   * @returns {{text: string, colorClass: string}}
   */
  return _createClass(WebhookNotification, [{
    key: "getDisplayStatus",
    value: function getDisplayStatus() {
      return this.status === 1 ? {
        text: 'Sent',
        colorClass: 'success'
      } : {
        text: 'Pending',
        colorClass: 'warning'
      };
    }
  }]);
}();

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speiUI = void 0;
var _speiTransactionModel = require("../models/spei-transaction.model.js");
/**
 * spei.ui.js
 *
 * This file manages all DOM manipulations for the SPEI feature.
 */

var speiUI = exports.speiUI = {
  elements: {
    tableBody: '#spei-transactions-tbody',
    loader: '#spei-table-loader',
    loadMoreButton: '#spei-load-more',
    sortableHeaders: 'th.sortable',
    // Filter elements
    filterTagsContainer: '#spei-filter-tags-container',
    newFilterField: '#spei-new-filter-field',
    newFilterValue: '#spei-new-filter-value'
  },
  showLoader: function showLoader() {
    $(this.elements.loader).show();
  },
  hideLoader: function hideLoader() {
    $(this.elements.loader).hide();
  },
  renderTransactions: function renderTransactions(transactions) {
    var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var tableBody = $(this.elements.tableBody);
    if (!append) {
      tableBody.empty();
    }
    if (transactions.length === 0 && !append) {
      this.renderEmptyState();
      return;
    }
    transactions.forEach(function (tx) {
      var displayStatus = tx.getDisplayStatus();
      var rowHtml = "\n                <tr class=\"clickable-row\" data-id=\"".concat(tx.id, "\" style=\"cursor: pointer;\">\n                  <td><span class=\"font-monospace\">").concat(tx.id, "</span></td>\n                  <td><span class=\"font-monospace\">").concat(tx.trackingKey, "</span></td>\n                  <td>").concat(tx.beneficiaryClabe, "</td>\n                  <td>").concat(tx.getFormattedAmount(), "</td>\n                  <td>").concat(tx.createdAt.toLocaleDateString(), "</td>\n                  <td><span class=\"badge bg-").concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span></td>\n                </tr>\n            ");
      tableBody.append(rowHtml);
    });
  },
  /**
   * Renders the active filter tags into their container.
   * @param {object} filters - The current filter state object.
   */
  renderFilterTags: function renderFilterTags(filters) {
    var container = $(this.elements.filterTagsContainer);
    container.empty();
    for (var key in filters) {
      if (filters[key]) {
        var prettyKey = key.replace('_', ' ').replace(/\b\w/g, function (l) {
          return l.toUpperCase();
        });
        var tagHtml = "\n                    <span class=\"badge bg-secondary me-1 fs-6\">\n                        ".concat(prettyKey, ": ").concat(filters[key], "\n                        <a href=\"#\" class=\"text-white ms-1 remove-filter\" data-filter-key=\"").concat(key, "\">\xD7</a>\n                    </span>\n                ");
        container.append(tagHtml);
      }
    }
  },
  /**
   * Clears the input fields in the "Add Filter" dropdown.
   */
  clearFilterInputs: function clearFilterInputs() {
    $(this.elements.newFilterValue).val('');
  },
  updateLoadMoreButton: function updateLoadMoreButton(hasMore) {
    var button = $(this.elements.loadMoreButton);
    if (hasMore) {
      button.show();
    } else {
      button.hide();
    }
  },
  renderEmptyState: function renderEmptyState() {
    var emptyHtml = "\n            <tr>\n                <td colspan=\"5\" class=\"text-center p-4\">\n                    <p class=\"mb-0\">No SPEI transactions found.</p>\n                </td>\n            </tr>\n        ";
    $(this.elements.tableBody).html(emptyHtml);
  },
  updateSortIcons: function updateSortIcons(sortBy, sortOrder) {
    $(this.elements.sortableHeaders).each(function () {
      var header = $(this);
      var icon = header.find('i');
      icon.removeClass('uil-sort-amount-up uil-sort-amount-down').addClass('uil-sort');
      if (header.data('sort') === sortBy) {
        if (sortOrder === 'asc') {
          icon.removeClass('uil-sort').addClass('uil-sort-amount-up');
        } else {
          icon.removeClass('uil-sort').addClass('uil-sort-amount-down');
        }
      }
    });
  },
  /**
   * Populates the details page with data from a transaction object.
   * @param {SpeiTransaction} transaction The transaction object.
   */
  renderTransactionDetails: function renderTransactionDetails(transaction) {
    if (!transaction) return;
    var displayStatus = transaction.getDisplayStatus();

    // --- Helper function to set text and remove placeholder ---
    var populateField = function populateField(selector, value) {
      $(selector).text(value).removeClass('placeholder-glow').empty().text(value);
    };
    var populateHtml = function populateHtml(selector, value) {
      $(selector).html(value).removeClass('placeholder-glow');
    };

    // Payer Info
    populateField('#payer-name', transaction.payerName);
    populateField('#payer-rfc', transaction.payerRfc);
    populateField('#payer-clabe', transaction.payerClabe);
    populateField('#payer-institution', transaction.payerInstitution);

    // Beneficiary Info
    populateField('#beneficiary-name', transaction.beneficiaryName);
    populateField('#beneficiary-rfc', transaction.beneficiaryRfc);
    populateField('#beneficiary-clabe', transaction.beneficiaryClabe);

    // Transaction Status Card
    populateField('#details-id', transaction.id);
    populateField('#details-tracking-key', transaction.trackingKey);
    populateField('#details-type', transaction.transactionType);
    populateField('#details-amount', transaction.getFormattedAmount());
    populateHtml('#details-status', "<span class=\"badge bg-".concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span>"));

    // Additional Details
    populateField('#details-payment-concept', transaction.paymentConcept);
    populateField('#details-numeric-reference', transaction.numericReference);
    populateField('#details-customer-tx-id', transaction.customerTransactionId);
    populateField('#details-customer-id', transaction.customerId);
    populateField('#details-created-at', transaction.createdAt.toLocaleString());
    populateField('#details-updated-at', transaction.updatedAt.toLocaleString());
  },
  /**
   * Renders a list of webhook notifications into the table.
   * @param {WebhookNotification[]} webhooks
   */
  renderWebhooksTable: function renderWebhooksTable(webhooks) {
    var tableBody = $('#webhooks-tbody');
    tableBody.empty();
    if (!webhooks || webhooks.length === 0) {
      tableBody.html('<tr><td colspan="5" class="text-center">No webhooks found for this transaction.</td></tr>');
      return;
    }
    webhooks.forEach(function (wh) {
      var displayStatus = wh.getDisplayStatus();
      var rowHtml = "\n                <tr class=\"webhook-row\" data-id=\"".concat(wh.id, "\" style=\"cursor: pointer;\">\n                    <td>").concat(wh.id, "</td>\n                    <td>").concat(wh.eventTypeDescription, "</td>\n                    <td><span class=\"badge bg-").concat(displayStatus.colorClass, "\">").concat(displayStatus.text, "</span></td>\n                    <td>").concat(wh.attempts, "</td>\n                    <td>").concat(wh.firstSentAt ? wh.firstSentAt.toLocaleString() : 'N/A', "</td>\n                </tr>\n            ");
      tableBody.append(rowHtml);
    });
  },
  /**
   * Populates and shows the webhook details modal.
   * @param {WebhookNotification} webhook
   */
  showWebhookDetailsModal: function showWebhookDetailsModal(webhook) {
    if (!webhook) return;
    $('#modal-request-id').text(webhook.requestId || 'N/A');
    $('#modal-notification-code').text(webhook.notificationCode || 'N/A');
    $('#modal-detail-code').text(webhook.detailCode || 'N/A');
    $('#modal-failed-reason').text(webhook.detailFailedReason || 'N/A');
    $('#modal-failed-message').text(webhook.detailFailedMessage || 'N/A');

    // Format and display the metadata JSON
    var metadataString = webhook.metadata ? JSON.stringify(webhook.metadata, null, 2) : 'No metadata.';
    $('#modal-metadata').text(metadataString);

    // Use the Bootstrap 5 JS API to show the modal
    var modal = new bootstrap.Modal(document.getElementById('webhook-details-modal'));
    modal.show();
  }
};

},{"../models/spei-transaction.model.js":35}]},{},[6])

