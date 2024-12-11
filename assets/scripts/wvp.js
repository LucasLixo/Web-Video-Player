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
try {
    var styles = void 0;
    (function (styles) {
        styles[styles["video"] = 0] = "video";
        styles[styles["container"] = 1] = "container";
        styles[styles["buttonsTop"] = 2] = "buttonsTop";
        styles[styles["buttonsMiddle"] = 3] = "buttonsMiddle";
        styles[styles["buttonsBottom"] = 4] = "buttonsBottom";
    })(styles || (styles = {}));
    var Utils_1 = (function () {
        function Utils() {
        }
        Utils.prototype.randomHash = function (length) {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var result = "";
            for (var i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };
        Utils.prototype.getStyles = function (stylesMap) {
            var stylesString = '';
            for (var key in stylesMap) {
                if (stylesMap.hasOwnProperty(key)) {
                    stylesString += "".concat(key, ": ").concat(stylesMap[key], ";");
                }
            }
            return stylesString;
        };
        return Utils;
    }());
    var Elements_1 = (function () {
        function Elements() {
            this.utils = new Utils_1();
        }
        Elements.prototype.applyStyles = function (style, idElementStyle) {
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
                    stylesMap['z-index'] = "-999";
                    stylesMap['background-color'] = "black";
                    break;
                case styles.buttonsTop:
                case styles.buttonsMiddle:
                case styles.buttonsBottom:
                    stylesMap['position'] = "absolute";
                    stylesMap['display'] = "flex";
                    stylesMap['height'] = "6rem";
                    stylesMap['right'] = "0";
                    stylesMap['left'] = "0";
                    stylesMap['z-index'] = "999";
                    if (style === styles.buttonsTop) {
                        stylesMap['background-color'] = "#FF000080";
                        stylesMap['top'] = "0";
                    }
                    else if (style === styles.buttonsMiddle) {
                        stylesMap['background-color'] = "#00FF0080";
                        stylesMap['bottom'] = "0";
                    }
                    else if (style === styles.buttonsBottom) {
                        stylesMap['background-color'] = "#0000FF80";
                        stylesMap['bottom'] = "0";
                    }
                    break;
            }
            var elementStyled = document.getElementById(idElementStyle);
            if (elementStyled == null)
                throw new IOError("Error");
            if (elementStyled && elementStyled.parentElement) {
                elementStyled.setAttribute('style', this.utils.getStyles(stylesMap));
            }
        };
        Elements.prototype.applyAspectRatio = function (identifier, aspect) {
            var stylesMap = {};
            var elementContainer = document.getElementById(identifier.container);
            if (elementContainer == null)
                throw new IOError("Error");
            var totalWidth = elementContainer.parentElement.offsetWidth;
            var totalHeight = totalWidth * aspect.vertical / aspect.horizontal;
            while (totalHeight > window.innerHeight) {
                totalWidth -= 1;
                totalHeight = totalWidth * aspect.vertical / aspect.horizontal;
            }
            stylesMap['width'] = "".concat(totalWidth, "px");
            var elementTop = document.getElementById(identifier.buttonsTop);
            if (elementTop == null)
                throw new IOError("Error");
            elementTop.setAttribute('style', elementTop.getAttribute('style') + this.utils.getStyles(stylesMap));
            var elementMiddle = document.getElementById(identifier.buttonsMiddle);
            if (elementMiddle == null)
                throw new IOError("Error");
            elementMiddle.setAttribute('style', elementMiddle.getAttribute('style') + this.utils.getStyles(stylesMap) + "top: calc(".concat(totalHeight / 2, "px - 3rem);"));
            var elementBottom = document.getElementById(identifier.buttonsBottom);
            if (elementBottom == null)
                throw new IOError("Error");
            elementBottom.setAttribute('style', elementBottom.getAttribute('style') + this.utils.getStyles(stylesMap));
            stylesMap['height'] = "".concat(totalHeight, "px");
            elementContainer.setAttribute('style', elementContainer.getAttribute('style') + this.utils.getStyles(stylesMap));
        };
        return Elements;
    }());
    document.addEventListener('DOMContentLoaded', function () {
        var utils = new Utils_1();
        var elements = new Elements_1();
        var intIdentifiers = {
            video: 'WVP',
            container: "c-".concat(utils.randomHash(26)),
            buttonsTop: "bt-".concat(utils.randomHash(26)),
            buttonsMiddle: "bm-".concat(utils.randomHash(26)),
            buttonsBottom: "bb-".concat(utils.randomHash(26)),
        };
        var elementVideo = document.getElementById(intIdentifiers.video);
        if (elementVideo == null)
            throw new IOError("Error");
        elementVideo.removeAttribute('controls');
        elementVideo.addEventListener('loadedmetadata', function () {
            elementVideo.controls = false;
        });
        var elementContainer = document.createElement('div');
        if (elementVideo.parentElement) {
            elementContainer.setAttribute('id', intIdentifiers.container);
            elementVideo.parentElement.insertBefore(elementContainer, elementVideo);
            elementContainer.appendChild(elementVideo);
        }
        elements.applyStyles(styles.video, intIdentifiers.video);
        var stringAspectRatio = elementVideo.getAttribute('aspect-ratio') || '16:9';
        var aspectRatio = {
            horizontal: parseInt(stringAspectRatio.split(':')[0]),
            vertical: parseInt(stringAspectRatio.split(':')[1]),
        };
        var colorInactive = elementVideo.getAttribute('color-inactive') || '#007AFF';
        var colorActive = elementVideo.getAttribute('color-active') || '#FFFFFF';
        elements.applyStyles(styles.container, intIdentifiers.container);
        var elementTop = document.createElement('div');
        elementContainer.appendChild(elementTop);
        if (elementTop.parentElement) {
            elementTop.setAttribute('id', intIdentifiers.buttonsTop);
        }
        elements.applyStyles(styles.buttonsTop, intIdentifiers.buttonsTop);
        var elementMiddle = document.createElement('div');
        elementContainer.appendChild(elementMiddle);
        if (elementMiddle.parentElement) {
            elementMiddle.setAttribute('id', intIdentifiers.buttonsMiddle);
        }
        elements.applyStyles(styles.buttonsMiddle, intIdentifiers.buttonsMiddle);
        var elementBottom = document.createElement('div');
        elementContainer.appendChild(elementBottom);
        if (elementBottom.parentElement) {
            elementBottom.setAttribute('id', intIdentifiers.buttonsBottom);
        }
        elements.applyStyles(styles.buttonsBottom, intIdentifiers.buttonsBottom);
        elements.applyAspectRatio(intIdentifiers, aspectRatio);
        elementVideo.volume = 0;
        elementVideo.play();
    });
}
catch (error) {
    console.error(error);
}
