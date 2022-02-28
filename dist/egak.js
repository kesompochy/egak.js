/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/renderer/shader_sources/fragment_shader_source.glsl":
/*!*****************************************************************!*\
  !*** ./src/renderer/shader_sources/fragment_shader_source.glsl ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#version 300 es\r\nprecision highp float;\r\n\r\nin vec2 v_texcoord;\r\n\r\nuniform sampler2D u_texture;\r\n\r\nuniform float u_opacity;\r\n\r\nout vec4 outColor;\r\n\r\nvoid main() {\r\n   outColor = texture(u_texture, v_texcoord) * vec4(1, 1, 1, u_opacity);\r\n}");

/***/ }),

/***/ "./src/renderer/shader_sources/vertex_shader_source.glsl":
/*!***************************************************************!*\
  !*** ./src/renderer/shader_sources/vertex_shader_source.glsl ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#version 300 es\r\n \r\nin vec2 a_position;\r\nin vec2 a_texcoord;\r\n \r\nuniform mat3 u_transformation;\r\n \r\nout vec2 v_texcoord;\r\n \r\nvoid main() {\r\n   v_texcoord = a_texcoord;\r\n\r\n   gl_Position = vec4((u_transformation * vec3(a_position, 1)).xy, 0, 1);\r\n}");

/***/ }),

/***/ "./src/app/application.ts":
/*!********************************!*\
  !*** ./src/app/application.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultResolution = void 0;
var renderer_1 = __importDefault(__webpack_require__(/*! ../renderer/renderer */ "./src/renderer/renderer.ts"));
var container_1 = __importDefault(__webpack_require__(/*! ../display/container */ "./src/display/container.ts"));
var loader_1 = __importDefault(__webpack_require__(/*! ./loader */ "./src/app/loader.ts"));
var AppDefaultOption = {
    width: 300,
    height: 150,
    canvas: document.createElement('canvas'),
    autoStyleCanvas: false,
};
exports.defaultResolution = {
    x: 1, y: 1
};
var App = /** @class */ (function () {
    function App(options) {
        this.baseContainer = new container_1.default();
        this.loader = new loader_1.default();
        options = Object.assign(AppDefaultOption, options);
        var width = options.width, height = options.height, canvas = options.canvas, autoStyleCanvas = options.autoStyleCanvas;
        this.canvas = canvas;
        if (autoStyleCanvas) {
            this.canvas.style.width = "".concat(width, "px");
            this.canvas.style.height = "".concat(height, "px");
        }
        this.screenSize = { width: width, height: height };
        this.renderer = new renderer_1.default({ canvas: canvas, width: this.screenSize.width, height: this.screenSize.height });
        this.resolution = exports.defaultResolution;
        this.resolution.x = this.canvas.width / this.screenSize.width;
        this.resolution.y = this.canvas.height / this.screenSize.height;
    }
    Object.defineProperty(App.prototype, "width", {
        set: function (value) {
            this.screenSize.width = value;
            this.resolution.x = this.canvas.width / this.screenSize.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(App.prototype, "height", {
        set: function (value) {
            this.screenSize.height = value;
            this.resolution.y = this.canvas.height / this.screenSize.height;
        },
        enumerable: false,
        configurable: true
    });
    App.prototype.loopRender = function () {
        this.renderer.clear(233, 233, 233);
        this.baseContainer.render(this.renderer);
        this.renderer.flush();
        requestAnimationFrame(this.loopRender.bind(this));
    };
    App.prototype.start = function () {
        requestAnimationFrame(this.loopRender.bind(this));
    };
    return App;
}());
exports["default"] = App;


/***/ }),

/***/ "./src/app/loader.ts":
/*!***************************!*\
  !*** ./src/app/loader.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Loader = /** @class */ (function () {
    function Loader() {
        this.resources = new Map();
        this.tasks = [];
        this._loadThen = function () { };
    }
    Loader.prototype.addImage = function (id, src) {
        var promise = this._promiseLoadingImage(id, src);
        this.tasks.push(promise);
        return this;
    };
    Loader.prototype.loadAll = function () {
        var _this = this;
        Promise.all(this.tasks)
            .then(function () { _this._loadThen(); });
    };
    Loader.prototype._promiseLoadingImage = function (id, src) {
        var _this = this;
        var img = new Image();
        img.src = src;
        var promise = new Promise(function (resolve) {
            img.addEventListener('load', function () {
                _this.resources.set(id, img);
                resolve(img);
            });
        });
        return promise;
    };
    Loader.prototype.loadThen = function (func) {
        this._loadThen = func;
    };
    Loader.prototype.get = function (id) {
        var resources = this.resources;
        if (resources.has(id)) {
            return this.resources.get(id);
        }
        else {
            throw new Error("there is no texture named '".concat(id, "."));
        }
    };
    return Loader;
}());
exports["default"] = Loader;


/***/ }),

/***/ "./src/display/abstract_display_object.ts":
/*!************************************************!*\
  !*** ./src/display/abstract_display_object.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var AbstractDisplayObject = /** @class */ (function () {
    function AbstractDisplayObject() {
        this.position = { x: 0, y: 0 };
        this._opacity = 1;
        this.scale = { x: 1, y: 1, set: function (value) {
                this.x = value;
                this.y = value;
            }
        };
        this.rotation = 0;
    }
    Object.defineProperty(AbstractDisplayObject.prototype, "opacity", {
        get: function () {
            return this._opacity;
        },
        set: function (value) {
            this._opacity = Math.min(Math.max(value, 0), 1);
        },
        enumerable: false,
        configurable: true
    });
    return AbstractDisplayObject;
}());
exports["default"] = AbstractDisplayObject;


/***/ }),

/***/ "./src/display/container.ts":
/*!**********************************!*\
  !*** ./src/display/container.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var abstract_display_object_1 = __importDefault(__webpack_require__(/*! ./abstract_display_object */ "./src/display/abstract_display_object.ts"));
var m3 = __importStar(__webpack_require__(/*! ../matrix */ "./src/matrix/index.ts"));
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        _this.anchor = { x: 0, y: 0 };
        _this.transform = m3.identity();
        _this.parentTransform = m3.identity();
        _this.parentOpacity = 1;
        _this.parent = undefined;
        _this.renderingFunc = function (renderer) { };
        _this.children = [];
        return _this;
    }
    Container.prototype.render = function (renderer) {
        this.transform = this.calculateTransform();
        this.parentTransform = this.calculateParentTransform();
        this.parentOpacity = this.calculateParentOpacity();
        this.renderingFunc(renderer);
        var children = this.children;
        for (var i = 0, len = children.length; i < len; i++) {
            children[i].render(renderer);
        }
    };
    Container.prototype.addChild = function (obj) {
        this.children.push(obj);
        obj.parent = this;
        return this;
    };
    Container.prototype.calculateTransform = function () {
        var position = m3.translation(this.position.x, this.position.y);
        var scaling = m3.scaling(this.scale.x, this.scale.y);
        var rotation = m3.rotation(this.rotation);
        var anchor = m3.translation(-this.anchor.x, -this.anchor.y);
        var transform = m3.someMultiply(position, rotation, scaling, anchor);
        return transform;
    };
    Container.prototype.calculateParentTransform = function () {
        if (this.parent) {
            return m3.multiply(this.parent.parentTransform, this.parent.transform);
        }
        else {
            return m3.identity();
        }
    };
    Container.prototype.calculateParentOpacity = function () {
        if (this.parent) {
            return this.parent.parentOpacity * this.parent.opacity;
        }
        else {
            return 1;
        }
    };
    Object.defineProperty(Container.prototype, "x", {
        get: function () {
            return this.position.x;
        },
        set: function (value) {
            this.position.x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "y", {
        get: function () {
            return this.position.y;
        },
        set: function (value) {
            this.position.y = value;
        },
        enumerable: false,
        configurable: true
    });
    return Container;
}(abstract_display_object_1.default));
exports["default"] = Container;


/***/ }),

/***/ "./src/display/sprite.ts":
/*!*******************************!*\
  !*** ./src/display/sprite.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var container_1 = __importDefault(__webpack_require__(/*! ./container */ "./src/display/container.ts"));
var m3 = __importStar(__webpack_require__(/*! ../matrix */ "./src/matrix/index.ts"));
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(texture) {
        var _this = _super.call(this) || this;
        _this.transform = m3.identity();
        _this.renderingFunc = function (renderer) {
            renderer.renderSprite(_this);
        };
        if (texture)
            _this.texture = texture;
        return _this;
    }
    return Sprite;
}(container_1.default));
exports["default"] = Sprite;


/***/ }),

/***/ "./src/display/text.ts":
/*!*****************************!*\
  !*** ./src/display/text.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextStyle = void 0;
var sprite_1 = __importDefault(__webpack_require__(/*! ./sprite */ "./src/display/sprite.ts"));
var texture_1 = __importDefault(__webpack_require__(/*! ../texture/texture */ "./src/texture/texture.ts"));
var application_1 = __webpack_require__(/*! ../app/application */ "./src/app/application.ts");
var TextStyle = /** @class */ (function () {
    function TextStyle() {
        this.font = 'sans-serif';
        this.fontSize = 20;
        this.fill = '0x000000';
    }
    return TextStyle;
}());
exports.TextStyle = TextStyle;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(text, style, resolution) {
        if (resolution === void 0) { resolution = application_1.defaultResolution; }
        var _this = _super.call(this) || this;
        _this._text = "";
        _this._canvas = document.createElement('canvas');
        _this._resolution = { x: 1, y: 1 };
        _this._text = text || '';
        _this._style = style || new TextStyle();
        _this._style.font = (style === null || style === void 0 ? void 0 : style.font) || 'sans-serif';
        _this._resolution = resolution;
        _this.drawCanvas();
        var texture = new texture_1.default(_this._canvas, 'NEAREST');
        _this.texture = texture;
        return _this;
    }
    Text.prototype.drawCanvas = function () {
        var canvas = this._canvas;
        var cxt = canvas.getContext('2d');
        var style = this._style;
        var text = this._text;
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 2;
        canvas.height = 2;
        cxt.font = "".concat(style.fontSize, "px ").concat(style.font);
        cxt.textBaseline = 'top';
        var textData = cxt.measureText(text);
        var textWidth = textData.width;
        var textHeight = textData.actualBoundingBoxDescent - textData.actualBoundingBoxAscent;
        canvas.width = textWidth * this._resolution.x;
        canvas.height = textHeight * this._resolution.y;
        cxt.scale(this._resolution.x, this._resolution.y);
        cxt.font = "".concat(style.fontSize, "px ").concat(style.font);
        cxt.textBaseline = 'top';
        cxt.fillStyle = style.fill;
        cxt.fillText(text, 0, 0);
        this.scale.x = 1 / this._resolution.x;
        this.scale.y = 1 / this._resolution.y;
    };
    Object.defineProperty(Text.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
            this.drawCanvas();
            this.texture.updated = false;
        },
        enumerable: false,
        configurable: true
    });
    return Text;
}(sprite_1.default));
exports["default"] = Text;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = exports.Container = exports.Texture = exports.Sprite = exports.App = void 0;
var application_1 = __importDefault(__webpack_require__(/*! ./app/application */ "./src/app/application.ts"));
exports.App = application_1.default;
var sprite_1 = __importDefault(__webpack_require__(/*! ./display/sprite */ "./src/display/sprite.ts"));
exports.Sprite = sprite_1.default;
var texture_1 = __importDefault(__webpack_require__(/*! ./texture/texture */ "./src/texture/texture.ts"));
exports.Texture = texture_1.default;
var container_1 = __importDefault(__webpack_require__(/*! ./display/container */ "./src/display/container.ts"));
exports.Container = container_1.default;
var text_1 = __importDefault(__webpack_require__(/*! ./display/text */ "./src/display/text.ts"));
exports.Text = text_1.default;


/***/ }),

/***/ "./src/matrix/index.ts":
/*!*****************************!*\
  !*** ./src/matrix/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.identity = exports.someMultiply = exports.multiply = exports.rotation = exports.translation = exports.scaling = exports.projection = void 0;
function projection(width, height) {
    return [
        2 / width, 0, 0,
        0, -2 / height, 0,
        -1, 1, 1
    ];
}
exports.projection = projection;
function scaling(x, y) {
    return [
        x, 0, 0,
        0, y, 0,
        0, 0, 1
    ];
}
exports.scaling = scaling;
;
function translation(x, y) {
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ];
}
exports.translation = translation;
function rotation(angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    return [
        cos, -sin, 0,
        sin, cos, 0,
        0, 0, 1
    ];
}
exports.rotation = rotation;
function multiply(a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];
    return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
    ];
}
exports.multiply = multiply;
function someMultiply() {
    var mat = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mat[_i] = arguments[_i];
    }
    var tmp = mat[0];
    for (var i = 0, len = mat.length - 1; i < len; i++) {
        tmp = multiply(tmp, mat[i + 1]);
    }
    return tmp;
}
exports.someMultiply = someMultiply;
function identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
}
exports.identity = identity;


/***/ }),

/***/ "./src/renderer/glutils/alpha.ts":
/*!***************************************!*\
  !*** ./src/renderer/glutils/alpha.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enableAlpha = void 0;
function enableAlpha(gl) {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}
exports.enableAlpha = enableAlpha;


/***/ }),

/***/ "./src/renderer/glutils/buffer.ts":
/*!****************************************!*\
  !*** ./src/renderer/glutils/buffer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRectangleIndices = exports.createLinkedVertexBuffer = void 0;
function createBuffer(gl, type, ary) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, ary, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}
function createLinkedVertexBuffer(gl, program, positionAttribName, coordAttribName) {
    var positionAttribLocation = gl.getAttribLocation(program, positionAttribName);
    var texcoordAttribLocation = gl.getAttribLocation(program, coordAttribName);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(texcoordAttribLocation);
    var positionSize = 2;
    var textureSize = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = Float32Array.BYTES_PER_ELEMENT * (positionSize + textureSize);
    var offset = Float32Array.BYTES_PER_ELEMENT * positionSize;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttribLocation, positionSize, type, normalize, stride, 0);
    gl.vertexAttribPointer(texcoordAttribLocation, textureSize, type, normalize, stride, offset);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vertexBuffer;
}
exports.createLinkedVertexBuffer = createLinkedVertexBuffer;
function createRectangleIndices(gl) {
    var indices = new Uint16Array([0, 1, 2,
        1, 3, 2]);
    var indexBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);
    return indexBuffer;
}
exports.createRectangleIndices = createRectangleIndices;


/***/ }),

/***/ "./src/renderer/glutils/canvas.ts":
/*!****************************************!*\
  !*** ./src/renderer/glutils/canvas.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resizeCanvas = exports.clearCanvas = void 0;
function clearCanvas(gl, color) {
    var colorByte = 256;
    var r = color.r / colorByte;
    var g = color.g / colorByte;
    var b = color.b / colorByte;
    var a = color.a === undefined ? 1 : color.a;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
exports.clearCanvas = clearCanvas;
function resizeCanvas(gl, resolution) {
    var canvas = gl.canvas;
    var styleWidth = canvas.clientWidth;
    var styleHeight = canvas.clientHeight;
    canvas.width = styleWidth * resolution;
    canvas.height = styleHeight * resolution;
    gl.viewport(0, 0, canvas.width, canvas.height);
}
exports.resizeCanvas = resizeCanvas;


/***/ }),

/***/ "./src/renderer/glutils/index.ts":
/*!***************************************!*\
  !*** ./src/renderer/glutils/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUniformLocation = exports.resizeCanvas = exports.clearCanvas = exports.enableAlpha = exports.uploadTexture = exports.createTexture = exports.createLinkedVertexBuffer = exports.createRectangleIndices = exports.createProgram = void 0;
var program_1 = __webpack_require__(/*! ./program */ "./src/renderer/glutils/program.ts");
Object.defineProperty(exports, "createProgram", ({ enumerable: true, get: function () { return program_1.createProgram; } }));
var buffer_1 = __webpack_require__(/*! ./buffer */ "./src/renderer/glutils/buffer.ts");
Object.defineProperty(exports, "createLinkedVertexBuffer", ({ enumerable: true, get: function () { return buffer_1.createLinkedVertexBuffer; } }));
Object.defineProperty(exports, "createRectangleIndices", ({ enumerable: true, get: function () { return buffer_1.createRectangleIndices; } }));
var texture_1 = __webpack_require__(/*! ./texture */ "./src/renderer/glutils/texture.ts");
Object.defineProperty(exports, "createTexture", ({ enumerable: true, get: function () { return texture_1.createTexture; } }));
Object.defineProperty(exports, "uploadTexture", ({ enumerable: true, get: function () { return texture_1.uploadTexture; } }));
var alpha_1 = __webpack_require__(/*! ./alpha */ "./src/renderer/glutils/alpha.ts");
Object.defineProperty(exports, "enableAlpha", ({ enumerable: true, get: function () { return alpha_1.enableAlpha; } }));
var canvas_1 = __webpack_require__(/*! ./canvas */ "./src/renderer/glutils/canvas.ts");
Object.defineProperty(exports, "clearCanvas", ({ enumerable: true, get: function () { return canvas_1.clearCanvas; } }));
Object.defineProperty(exports, "resizeCanvas", ({ enumerable: true, get: function () { return canvas_1.resizeCanvas; } }));
var uniform_1 = __webpack_require__(/*! ./uniform */ "./src/renderer/glutils/uniform.ts");
Object.defineProperty(exports, "getUniformLocation", ({ enumerable: true, get: function () { return uniform_1.getUniformLocation; } }));


/***/ }),

/***/ "./src/renderer/glutils/program.ts":
/*!*****************************************!*\
  !*** ./src/renderer/glutils/program.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProgram = void 0;
function createShader(gl, type, src) {
    var shader = gl.createShader(type);
    if (!shader) {
        throw new Error('failed to create a shader');
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    return shader;
}
function createLinkedProgram(gl) {
    var shaders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        shaders[_i - 1] = arguments[_i];
    }
    var program = gl.createProgram();
    if (!program) {
        throw new Error('failed to create program');
    }
    for (var i = 0, len = shaders.length; i < len; i++) {
        gl.attachShader(program, shaders[i]);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    return program;
}
function createProgram(gl, vSource, fSource) {
    var vShader = createShader(gl, gl.VERTEX_SHADER, vSource);
    var fShader = createShader(gl, gl.FRAGMENT_SHADER, fSource);
    var program = createLinkedProgram(gl, vShader, fShader);
    return program;
}
exports.createProgram = createProgram;


/***/ }),

/***/ "./src/renderer/glutils/texture.ts":
/*!*****************************************!*\
  !*** ./src/renderer/glutils/texture.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uploadTexture = exports.createTexture = void 0;
function createTexture(gl, param) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[param]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[param]);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}
exports.createTexture = createTexture;
function uploadTexture(gl, texture, img) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}
exports.uploadTexture = uploadTexture;


/***/ }),

/***/ "./src/renderer/glutils/uniform.ts":
/*!*****************************************!*\
  !*** ./src/renderer/glutils/uniform.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUniformLocation = void 0;
function getUniformLocation(gl, program, uniformName) {
    return gl.getUniformLocation(program, uniformName);
}
exports.getUniformLocation = getUniformLocation;


/***/ }),

/***/ "./src/renderer/renderer.ts":
/*!**********************************!*\
  !*** ./src/renderer/renderer.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var vertex_shader_source_glsl_1 = __importDefault(__webpack_require__(/*! ./shader_sources/vertex_shader_source.glsl */ "./src/renderer/shader_sources/vertex_shader_source.glsl"));
var fragment_shader_source_glsl_1 = __importDefault(__webpack_require__(/*! ./shader_sources/fragment_shader_source.glsl */ "./src/renderer/shader_sources/fragment_shader_source.glsl"));
var glutils = __importStar(__webpack_require__(/*! ./glutils */ "./src/renderer/glutils/index.ts"));
var m3 = __importStar(__webpack_require__(/*! ../matrix */ "./src/matrix/index.ts"));
var defaultOptions = {
    canvas: undefined,
    width: 300,
    height: 150
};
var uniformPrefix = 'u_';
var Renderer = /** @class */ (function () {
    function Renderer(options) {
        this.resolution = window.devicePixelRatio || 1;
        Object.assign(defaultOptions, options);
        var canvas = defaultOptions.canvas, width = defaultOptions.width, height = defaultOptions.height;
        this.canvas = canvas || document.createElement('canvas');
        this._screenSize = { width: width, height: height };
        this.gl = this.canvas.getContext('webgl2');
        var gl = this.gl;
        this.resizeCanvas();
        glutils.enableAlpha(gl);
        var program = glutils.createProgram(gl, vertex_shader_source_glsl_1.default, fragment_shader_source_glsl_1.default);
        this._program = program;
        this._indexBuffer = glutils.createRectangleIndices(gl);
        this._vertexBuffer = glutils.createLinkedVertexBuffer(gl, program, 'a_position', 'a_texcoord');
        this._transformUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix + 'transformation');
        this._opacityUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix + 'opacity');
        this._textureUniformLocation = glutils.getUniformLocation(gl, program, uniformPrefix + 'texture');
    }
    Renderer.prototype.clear = function (r, g, b, a) {
        glutils.clearCanvas(this.gl, { r: r, g: g, b: b, a: a });
    };
    Renderer.prototype.resizeCanvas = function () {
        glutils.resizeCanvas(this.gl, this.resolution);
    };
    Renderer.prototype.flush = function () {
        this.gl.flush();
    };
    Renderer.prototype.updateTexture = function (texture) {
        glutils.uploadTexture(this.gl, texture.glTexture, texture.originalImage);
        texture.updated = true;
    };
    Renderer.prototype.renderSprite = function (sprite) {
        if (!sprite.texture) {
            return;
        }
        var texture = sprite.texture;
        if (!texture.glTexture) {
            texture.glTexture = glutils.createTexture(this.gl, texture.scaleMode);
        }
        if (!texture.originalImage) {
            return;
        }
        if (!sprite.texture.updated) {
            this.updateTexture(sprite.texture);
        }
        var baseTexture = texture.glTexture;
        var textureSize = { w: texture.width, h: texture.height };
        var gl = this.gl;
        var textureUniformLocation = this._textureUniformLocation;
        gl.useProgram(this._program);
        var textureUnitID = 0;
        gl.uniform1i(textureUniformLocation, textureUnitID);
        gl.activeTexture(gl.TEXTURE0 + textureUnitID);
        gl.bindTexture(gl.TEXTURE_2D, baseTexture);
        var projection = m3.projection(this._screenSize.width, this._screenSize.height);
        var transformation = m3.someMultiply(projection, sprite.parentTransform, sprite.transform);
        gl.uniformMatrix3fv(this._transformUniformLocation, false, transformation);
        var opacity = sprite.opacity;
        var worldOpacity = sprite.parentOpacity;
        var wholeOpacity = worldOpacity * opacity;
        gl.uniform1f(this._opacityUniformLocation, wholeOpacity);
        var vertexBuffer = this._vertexBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var vertices = [
            0, 0,
            0, 0,
            0, textureSize.h,
            0, 1,
            textureSize.w, 0,
            1, 0,
            textureSize.w, textureSize.h,
            1, 1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        var indexBuffer = this._indexBuffer;
        var size = 6;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    return Renderer;
}());
exports["default"] = Renderer;


/***/ }),

/***/ "./src/texture/texture.ts":
/*!********************************!*\
  !*** ./src/texture/texture.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Texture = /** @class */ (function () {
    function Texture(originalImage, scaleMode) {
        if (scaleMode === void 0) { scaleMode = 'LINEAR'; }
        this.width = 1;
        this.height = 1;
        this.updated = false;
        this.scaleMode = 'LINEAR';
        this.originalImage = originalImage;
        this.scaleMode = scaleMode;
        this.width = originalImage.width;
        this.height = originalImage.height;
    }
    return Texture;
}());
exports["default"] = Texture;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=egak.js.map