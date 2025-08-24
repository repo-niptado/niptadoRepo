"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ "node:tty":
/*!***************************!*\
  !*** external "node:tty" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:tty");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rakesh_Documents_projectNiptado5Aug25_niptado_apps_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/rakesh/Documents/projectNiptado5Aug25/niptado/apps/frontend/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rakesh_Documents_projectNiptado5Aug25_niptado_apps_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZS50cyZhcHBEaXI9JTJGVXNlcnMlMkZyYWtlc2glMkZEb2N1bWVudHMlMkZwcm9qZWN0TmlwdGFkbzVBdWcyNSUyRm5pcHRhZG8lMkZhcHBzJTJGZnJvbnRlbmQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcmFrZXNoJTJGRG9jdW1lbnRzJTJGcHJvamVjdE5pcHRhZG81QXVnMjUlMkZuaXB0YWRvJTJGYXBwcyUyRmZyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNzRDtBQUNuSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLz8xMDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9yYWtlc2gvRG9jdW1lbnRzL3Byb2plY3ROaXB0YWRvNUF1ZzI1L25pcHRhZG8vYXBwcy9mcm9udGVuZC9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvcmFrZXNoL0RvY3VtZW50cy9wcm9qZWN0TmlwdGFkbzVBdWcyNS9uaXB0YWRvL2FwcHMvZnJvbnRlbmQvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/../../node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFDTyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/../../node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/../../node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lib/prisma */ \"(rsc)/../../shared/lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/../../node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"defaultsecret\";\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            // When signing in, enrich the token with user info and a backend token\n            if (user) {\n                // Ensure we always have a stable id on the token\n                token.id = user.id || token.sub;\n                token.email = user.email ?? token.email;\n                token.name = user.name ?? token.name;\n                token.picture = user.image ?? token.picture;\n                const idForSign = token.id || token.sub;\n                const emailForSign = token.email || undefined;\n                const backendToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n                    id: idForSign,\n                    email: emailForSign\n                }, JWT_SECRET, {\n                    expiresIn: \"7d\"\n                });\n                token.backendToken = backendToken;\n            }\n            // Backfill backendToken for existing sessions where it might be missing\n            if (!token.backendToken) {\n                try {\n                    const idForSign = token.id || token.sub;\n                    const emailForSign = token.email || undefined;\n                    if (idForSign) {\n                        token.backendToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n                            id: idForSign,\n                            email: emailForSign\n                        }, JWT_SECRET, {\n                            expiresIn: \"7d\"\n                        });\n                    }\n                } catch (e) {\n                    console.error(\"Failed to backfill backendToken:\", e);\n                }\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                const idFromToken = token.id || token.sub;\n                session.user.id = idFromToken;\n                session.user.email = token.email;\n                session.user.name = token.name;\n                session.user.image = token.picture;\n                // Add backend token to session shape for client access\n                session.user.backendToken = token.backendToken;\n            }\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            console.log(\"NextAuth redirect callback:\", {\n                url,\n                baseUrl\n            });\n            // Handle Google OAuth callback - always redirect to home page\n            if (url.includes(\"/api/auth/callback/google\") || url.includes(\"google\")) {\n                console.log(\"Google OAuth detected, redirecting to home page\");\n                return baseUrl + \"/\";\n            }\n            // If a callbackUrl was specified and it's the home page, use it\n            if (url === baseUrl + \"/\" || url === baseUrl) {\n                console.log(\"Home page callback detected\");\n                return baseUrl + \"/\";\n            }\n            // Allows relative callback URLs\n            if (url.startsWith(\"/\")) return `${baseUrl}${url}`;\n            // Allows callback URLs on the same origin\n            if (url.startsWith(baseUrl)) return url;\n            // Default to home page for any other case\n            console.log(\"Defaulting to home page redirect\");\n            return baseUrl + \"/\";\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBZ0U7WUFDaEUsSUFBSUQsUUFBUUMsVUFBVSxPQUFPRCxRQUFRQyxTQUFTO2dCQUM1Q0wsUUFBUU0sR0FBRyxDQUFDO2dCQUNaLE9BQU9ELFVBQVU7WUFDbkI7WUFFQSxnQ0FBZ0M7WUFDaEMsSUFBSUQsSUFBSUksVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLEVBQUVILFFBQVEsRUFBRUQsSUFBSSxDQUFDO1lBRWxELDBDQUEwQztZQUMxQyxJQUFJQSxJQUFJSSxVQUFVLENBQUNILFVBQVUsT0FBT0Q7WUFFcEMsMENBQTBDO1lBQzFDSixRQUFRTSxHQUFHLENBQUM7WUFDWixPQUFPRCxVQUFVO1FBQ25CO0lBQ0Y7QUFDRixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlXCI7XG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXJcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7IFxuXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcImRlZmF1bHRzZWNyZXRcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCEsXG4gICAgfSksXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL1wiLCAvLyBSZWRpcmVjdCB0byBob21lIHBhZ2UgZm9yIHNpZ24gaW5cbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgLy8gV2hlbiBzaWduaW5nIGluLCBlbnJpY2ggdGhlIHRva2VuIHdpdGggdXNlciBpbmZvIGFuZCBhIGJhY2tlbmQgdG9rZW5cbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhIHN0YWJsZSBpZCBvbiB0aGUgdG9rZW5cbiAgICAgICAgdG9rZW4uaWQgPSAodXNlciBhcyBhbnkpLmlkIHx8ICh0b2tlbiBhcyBhbnkpLnN1YjtcbiAgICAgICAgdG9rZW4uZW1haWwgPSB1c2VyLmVtYWlsID8/IHRva2VuLmVtYWlsO1xuICAgICAgICB0b2tlbi5uYW1lID0gdXNlci5uYW1lID8/IHRva2VuLm5hbWU7XG4gICAgICAgIHRva2VuLnBpY3R1cmUgPSAodXNlciBhcyBhbnkpLmltYWdlID8/IHRva2VuLnBpY3R1cmU7XG5cbiAgICAgICAgY29uc3QgaWRGb3JTaWduID0gKHRva2VuLmlkIGFzIHN0cmluZykgfHwgKCh0b2tlbiBhcyBhbnkpLnN1YiBhcyBzdHJpbmcpO1xuICAgICAgICBjb25zdCBlbWFpbEZvclNpZ24gPSAodG9rZW4uZW1haWwgYXMgc3RyaW5nKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGJhY2tlbmRUb2tlbiA9IGp3dC5zaWduKFxuICAgICAgICAgIHsgaWQ6IGlkRm9yU2lnbiwgZW1haWw6IGVtYWlsRm9yU2lnbiB9LFxuICAgICAgICAgIEpXVF9TRUNSRVQsXG4gICAgICAgICAgeyBleHBpcmVzSW46IFwiN2RcIiB9XG4gICAgICAgICk7XG4gICAgICAgICh0b2tlbiBhcyBhbnkpLmJhY2tlbmRUb2tlbiA9IGJhY2tlbmRUb2tlbjtcbiAgICAgIH1cblxuICAgICAgLy8gQmFja2ZpbGwgYmFja2VuZFRva2VuIGZvciBleGlzdGluZyBzZXNzaW9ucyB3aGVyZSBpdCBtaWdodCBiZSBtaXNzaW5nXG4gICAgICBpZiAoISh0b2tlbiBhcyBhbnkpLmJhY2tlbmRUb2tlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGlkRm9yU2lnbiA9ICh0b2tlbi5pZCBhcyBzdHJpbmcpIHx8ICgodG9rZW4gYXMgYW55KS5zdWIgYXMgc3RyaW5nKTtcbiAgICAgICAgICBjb25zdCBlbWFpbEZvclNpZ24gPSAodG9rZW4uZW1haWwgYXMgc3RyaW5nKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKGlkRm9yU2lnbikge1xuICAgICAgICAgICAgKHRva2VuIGFzIGFueSkuYmFja2VuZFRva2VuID0gand0LnNpZ24oXG4gICAgICAgICAgICAgIHsgaWQ6IGlkRm9yU2lnbiwgZW1haWw6IGVtYWlsRm9yU2lnbiB9LFxuICAgICAgICAgICAgICBKV1RfU0VDUkVULFxuICAgICAgICAgICAgICB7IGV4cGlyZXNJbjogXCI3ZFwiIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBiYWNrZmlsbCBiYWNrZW5kVG9rZW46XCIsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgY29uc3QgaWRGcm9tVG9rZW4gPSAodG9rZW4gYXMgYW55KS5pZCB8fCAodG9rZW4gYXMgYW55KS5zdWI7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IGlkRnJvbVRva2VuIGFzIHN0cmluZztcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmVtYWlsID0gKHRva2VuIGFzIGFueSkuZW1haWwgYXMgc3RyaW5nO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkubmFtZSA9ICh0b2tlbiBhcyBhbnkpLm5hbWUgYXMgc3RyaW5nO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaW1hZ2UgPSAodG9rZW4gYXMgYW55KS5waWN0dXJlIGFzIHN0cmluZztcblxuICAgICAgICAvLyBBZGQgYmFja2VuZCB0b2tlbiB0byBzZXNzaW9uIHNoYXBlIGZvciBjbGllbnQgYWNjZXNzXG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5iYWNrZW5kVG9rZW4gPSAodG9rZW4gYXMgYW55KS5iYWNrZW5kVG9rZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuXG4gICAgYXN5bmMgcmVkaXJlY3QoeyB1cmwsIGJhc2VVcmwgfSkge1xuICAgICAgY29uc29sZS5sb2coJ05leHRBdXRoIHJlZGlyZWN0IGNhbGxiYWNrOicsIHsgdXJsLCBiYXNlVXJsIH0pO1xuICAgICAgXG4gICAgICAvLyBIYW5kbGUgR29vZ2xlIE9BdXRoIGNhbGxiYWNrIC0gYWx3YXlzIHJlZGlyZWN0IHRvIGhvbWUgcGFnZVxuICAgICAgaWYgKHVybC5pbmNsdWRlcygnL2FwaS9hdXRoL2NhbGxiYWNrL2dvb2dsZScpIHx8IHVybC5pbmNsdWRlcygnZ29vZ2xlJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0dvb2dsZSBPQXV0aCBkZXRlY3RlZCwgcmVkaXJlY3RpbmcgdG8gaG9tZSBwYWdlJyk7XG4gICAgICAgIHJldHVybiBiYXNlVXJsICsgJy8nO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJZiBhIGNhbGxiYWNrVXJsIHdhcyBzcGVjaWZpZWQgYW5kIGl0J3MgdGhlIGhvbWUgcGFnZSwgdXNlIGl0XG4gICAgICBpZiAodXJsID09PSBiYXNlVXJsICsgJy8nIHx8IHVybCA9PT0gYmFzZVVybCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSG9tZSBwYWdlIGNhbGxiYWNrIGRldGVjdGVkJyk7XG4gICAgICAgIHJldHVybiBiYXNlVXJsICsgJy8nO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBbGxvd3MgcmVsYXRpdmUgY2FsbGJhY2sgVVJMc1xuICAgICAgaWYgKHVybC5zdGFydHNXaXRoKFwiL1wiKSkgcmV0dXJuIGAke2Jhc2VVcmx9JHt1cmx9YDtcbiAgICAgIFxuICAgICAgLy8gQWxsb3dzIGNhbGxiYWNrIFVSTHMgb24gdGhlIHNhbWUgb3JpZ2luXG4gICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoYmFzZVVybCkpIHJldHVybiB1cmw7XG4gICAgICBcbiAgICAgIC8vIERlZmF1bHQgdG8gaG9tZSBwYWdlIGZvciBhbnkgb3RoZXIgY2FzZVxuICAgICAgY29uc29sZS5sb2coJ0RlZmF1bHRpbmcgdG8gaG9tZSBwYWdlIHJlZGlyZWN0Jyk7XG4gICAgICByZXR1cm4gYmFzZVVybCArICcvJztcbiAgICB9LFxuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJHb29nbGVQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsImNsaWVudElkIiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJ0b2tlbiIsInVzZXIiLCJpZCIsInN1YiIsImVtYWlsIiwibmFtZSIsInBpY3R1cmUiLCJpbWFnZSIsImlkRm9yU2lnbiIsImVtYWlsRm9yU2lnbiIsInVuZGVmaW5lZCIsImJhY2tlbmRUb2tlbiIsInNpZ24iLCJleHBpcmVzSW4iLCJlIiwiY29uc29sZSIsImVycm9yIiwiaWRGcm9tVG9rZW4iLCJyZWRpcmVjdCIsInVybCIsImJhc2VVcmwiLCJsb2ciLCJpbmNsdWRlcyIsInN0YXJ0c1dpdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/../../shared/lib/prisma.ts":
/*!**********************************!*\
  !*** ../../shared/lib/prisma.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"(rsc)/../../node_modules/@prisma/client/default.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vc2hhcmVkL2xpYi9wcmlzbWEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0JBQWdCO0FBQzhCO0FBRTlDLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsU0FDWEYsZ0JBQWdCRSxNQUFNLElBQ3RCLElBQUlILHdEQUFZQSxDQUFDO0lBQ2ZJLEtBQUs7UUFBQztLQUFRO0FBQ2hCLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uLi8uLi9zaGFyZWQvbGliL3ByaXNtYS50cz9kNmYzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9wcmlzbWEudHNcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogW1wicXVlcnlcIl0sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../shared/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/semver","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/jsonwebtoken","vendor-chunks/oauth","vendor-chunks/jws","vendor-chunks/@panva","vendor-chunks/@prisma","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/prisma","vendor-chunks/safe-buffer","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/cookie","vendor-chunks/buffer-equal-constant-time","vendor-chunks/@next-auth"], () => (__webpack_exec__("(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakesh%2FDocuments%2FprojectNiptado5Aug25%2Fniptado%2Fapps%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();