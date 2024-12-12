"use strict";
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
var IOError = (function (_super) {
    __extends(IOError, _super);
    function IOError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "Error";
        return _this;
    }
    return IOError;
}(Error));
var styles;
(function (styles) {
    styles[styles["styles"] = 0] = "styles";
    styles[styles["video"] = 1] = "video";
    styles[styles["container"] = 2] = "container";
    styles[styles["buttonsTop"] = 3] = "buttonsTop";
    styles[styles["buttonsMiddle"] = 4] = "buttonsMiddle";
    styles[styles["buttonsBottom"] = 5] = "buttonsBottom";
})(styles || (styles = {}));
var reloaders;
(function (reloaders) {
    reloaders[reloaders["styles"] = 0] = "styles";
    reloaders[reloaders["aspectRatio"] = 1] = "aspectRatio";
    reloaders[reloaders["videos"] = 2] = "videos";
})(reloaders || (reloaders = {}));
var WVP = (function () {
    function WVP(apply, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (options == undefined) {
            options = {};
        }
        this.options = {
            apply: apply,
            aspectRatio: {
                horizontal: parseInt(((_a = options['aspectRatio']) !== null && _a !== void 0 ? _a : '16:9').split(':')[0]),
                vertical: parseInt(((_b = options['aspectRatio']) !== null && _b !== void 0 ? _b : '16:9').split(':')[1]),
            },
            colorInactive: (_c = options['colorInactive']) !== null && _c !== void 0 ? _c : '#007AFF',
            colorActive: (_d = options['colorActive']) !== null && _d !== void 0 ? _d : '#FFFFFF',
            compatibility: (_e = options['compatibility']) !== null && _e !== void 0 ? _e : false,
            autoplay: (_f = options['autoplay']) !== null && _f !== void 0 ? _f : true,
            muted: (_g = options['muted']) !== null && _g !== void 0 ? _g : true,
        };
        this.identifiers = {
            styles: "styles-".concat(this.randomHash(18)),
            container: "container-".concat(this.randomHash(15)),
            buttonsTop: "top-".concat(this.randomHash(21)),
            buttonsMiddle: "middle-".concat(this.randomHash(18)),
            buttonsBottom: "bottom-".concat(this.randomHash(18)),
        };
        console.log(this.identifiers);
        this.init([
            reloaders.styles,
            reloaders.aspectRatio,
            reloaders.videos,
        ]);
    }
    Object.defineProperty(WVP.prototype, "aspectRatio", {
        get: function () {
            return "".concat(this.options.aspectRatio.horizontal, ":").concat(this.options.aspectRatio.vertical);
        },
        set: function (value) {
            var tempAspectRatio = {
                horizontal: parseInt(value.split(':')[0]),
                vertical: parseInt(value.split(':')[1]),
            };
            if (this.options.aspectRatio == tempAspectRatio)
                return;
            this.options.aspectRatio = tempAspectRatio;
            this.init([
                reloaders.aspectRatio,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WVP.prototype, "colorInactive", {
        get: function () {
            return this.options.colorInactive;
        },
        set: function (value) {
            if (this.options.colorInactive == value)
                return;
            this.options.colorInactive = value;
            this.init([
                reloaders.styles,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WVP.prototype, "colorActive", {
        get: function () {
            return this.options.colorActive;
        },
        set: function (value) {
            if (this.options.colorActive == value)
                return;
            this.options.colorActive = value;
            this.init([
                reloaders.styles,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WVP.prototype, "compatibility", {
        get: function () {
            return this.options.compatibility;
        },
        set: function (value) {
            if (this.options.compatibility == value)
                return;
            this.options.compatibility = value;
            this.init([
                reloaders.styles,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WVP.prototype, "autoplay", {
        get: function () {
            return this.options.autoplay;
        },
        set: function (value) {
            if (this.options.autoplay == value)
                return;
            this.options.autoplay = value;
            this.init([
                reloaders.videos,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WVP.prototype, "muted", {
        get: function () {
            return this.options.muted;
        },
        set: function (value) {
            if (this.options.muted == value)
                return;
            this.options.muted = value;
            this.init([
                reloaders.videos,
            ]);
        },
        enumerable: false,
        configurable: true
    });
    WVP.prototype.randomHash = function (length) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };
    WVP.prototype.getStyles = function (styleId, styleMap) {
        var styleString;
        styleString = "#".concat(styleId, " {");
        for (var key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (this.options.compatibility) {
                    styleString += "-moz-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-ms-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-o-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-webkit-".concat(key, ": ").concat(styleMap[key], ";");
                }
                styleString += "".concat(key, ": ").concat(styleMap[key], ";");
            }
        }
        styleString += '}';
        return styleString;
    };
    WVP.prototype.setStyles = function (elementStyle, stringStyle) {
        elementStyle.innerHTML += stringStyle;
    };
    WVP.prototype.applyAspectRatio = function () {
        var stylesMap = {};
        var elementContainer = document.getElementById(this.identifiers.container);
        var totalWidth = elementContainer.parentElement.offsetWidth;
        var totalHeight = totalWidth * this.options.aspectRatio.vertical / this.options.aspectRatio.horizontal;
        var differenceHeight = totalHeight - window.innerHeight;
        if (differenceHeight > 0) {
            totalWidth = totalWidth - differenceHeight;
            totalHeight = totalHeight - differenceHeight;
        }
        stylesMap['width'] = "".concat(totalWidth, "px");
        var elementStyle = document.getElementById(this.identifiers.styles);
        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsTop, stylesMap));
        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsBottom, stylesMap));
        stylesMap['top'] = "calc(".concat(totalHeight / 2, "px - 3rem);");
        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsMiddle, stylesMap));
        delete stylesMap['top'];
        stylesMap['height'] = "".concat(totalHeight, "px");
        this.setStyles(elementStyle, this.getStyles(this.identifiers.container, stylesMap));
    };
    WVP.prototype.generateStyles = function () {
        var _this = this;
        var elementHead = document.head;
        var elementStyles = document.createElement('style');
        elementStyles.setAttribute('type', 'text/css');
        elementStyles.setAttribute('id', this.identifiers.styles);
        elementHead.appendChild(elementStyles);
        var applyStyles = function (style, idElementStyle) {
            var stylesMap = {};
            switch (style) {
                case styles.container:
                    stylesMap['position'] = "relative";
                    stylesMap['display'] = "flex";
                    stylesMap['flex-direction'] = "column";
                    break;
                case styles.video:
                    stylesMap['position'] = "absolute";
                    stylesMap['display'] = "block";
                    stylesMap['width'] = "100%";
                    stylesMap['height'] = "100%";
                    stylesMap['z-index'] = "-99";
                    stylesMap['background-color'] = "black";
                    break;
                case styles.buttonsTop:
                case styles.buttonsMiddle:
                case styles.buttonsBottom:
                    stylesMap['position'] = "absolute";
                    stylesMap['display'] = "flex";
                    stylesMap['right'] = "0";
                    stylesMap['left'] = "0";
                    stylesMap['z-index'] = "99";
                    stylesMap['flex-direction'] = "row";
                    stylesMap['justify-content'] = "center";
                    stylesMap['width'] = "100%";
                    if (style === styles.buttonsTop) {
                        stylesMap['background-color'] = "#FF000080";
                        stylesMap['top'] = "0";
                        stylesMap['align-items'] = "flex-end";
                        stylesMap['min-height'] = "2rem";
                        stylesMap['max-height'] = "6rem";
                    }
                    else if (style === styles.buttonsMiddle) {
                        stylesMap['background-color'] = "#00FF0080";
                        stylesMap['align-items'] = "center";
                        stylesMap['height'] = "6rem";
                    }
                    else if (style === styles.buttonsBottom) {
                        stylesMap['background-color'] = "#0000FF80";
                        stylesMap['bottom'] = "0";
                        stylesMap['align-items'] = "flex-start";
                        stylesMap['min-height'] = "2rem";
                        stylesMap['max-height'] = "6rem";
                    }
                    break;
            }
            _this.setStyles(elementStyles, _this.getStyles(idElementStyle, stylesMap));
        };
        applyStyles(styles.video, this.options.apply);
        applyStyles(styles.container, this.identifiers.container);
        applyStyles(styles.buttonsTop, this.identifiers.buttonsTop);
        applyStyles(styles.buttonsMiddle, this.identifiers.buttonsMiddle);
        applyStyles(styles.buttonsBottom, this.identifiers.buttonsBottom);
    };
    WVP.prototype.init = function (reloader) {
        var elementsVideo = document.querySelectorAll(this.options.apply);
        if (elementsVideo == null)
            return;
        for (var index = 0; index < reloader.length; index++) {
            var load = reloader[index];
            switch (load) {
                case reloaders.styles:
                    this.generateStyles();
                    break;
                case reloaders.aspectRatio:
                    this.applyAspectRatio();
                    break;
                case reloaders.videos:
                    break;
            }
        }
        for (var index = 0; index < elementsVideo.length; index++) {
            var elementVideo = elementsVideo[index];
            console.log(elementVideo.getAttribute(''));
        }
    };
    return WVP;
}());
