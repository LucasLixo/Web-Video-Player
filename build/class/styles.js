import { styles } from "../enums/styles";
import IOError from "./io_error";
var Styles = (function () {
    function Styles(aspectRatio, identifiers) {
        var _this = this;
        this.applyAspectRatio = function () {
            var stylesMap = {};
            var elementContainer = document.getElementById(_this.identifiers.container);
            if (elementContainer == null)
                throw new IOError("Error");
            var totalWidth = elementContainer.parentElement.offsetWidth;
            var totalHeight = totalWidth * _this.aspectRatio.vertical / _this.aspectRatio.horizontal;
            var differenceHeight = totalHeight - window.innerHeight;
            if (differenceHeight > 0) {
                totalWidth = totalWidth - differenceHeight;
                totalHeight = totalHeight - differenceHeight;
            }
            stylesMap['width'] = "".concat(totalWidth, "px");
            _this.addStyles(styles.buttonsTop, _this.getStyles("#".concat(_this.identifiers.buttonsTop), stylesMap));
            _this.addStyles(styles.buttonsBottom, _this.getStyles("#".concat(_this.identifiers.buttonsBottom), stylesMap));
            stylesMap['top'] = "calc(".concat(totalHeight / 2, "px - 3rem);");
            _this.addStyles(styles.buttonsMiddle, _this.getStyles("#".concat(_this.identifiers.buttonsMiddle), stylesMap));
            delete stylesMap['top'];
            stylesMap['height'] = "".concat(totalHeight, "px");
            _this.addStyles(styles.container, _this.getStyles("#".concat(_this.identifiers.container), stylesMap));
        };
        this.containerStyle = document.head;
        this.aspectRatio = aspectRatio;
        this.identifiers = identifiers;
        this.arrayIdentifiers = [
            this.identifiers.video,
            this.identifiers.container,
            this.identifiers.buttonsTop,
            this.identifiers.buttonsMiddle,
            this.identifiers.buttonsBottom,
        ];
    }
    Styles.prototype.build = function () {
        for (var index = 0; index < this.arrayIdentifiers.length; index++) {
            var identifier = this.arrayIdentifiers[index];
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('key', identifier);
            this.containerStyle.appendChild(style);
        }
        this.applyDefaultStyles(styles.video, this.identifiers.video);
        this.applyDefaultStyles(styles.container, "#".concat(this.identifiers.container));
        this.applyDefaultStyles(styles.buttonsTop, "#".concat(this.identifiers.buttonsTop));
        this.applyDefaultStyles(styles.buttonsMiddle, "#".concat(this.identifiers.buttonsMiddle));
        this.applyDefaultStyles(styles.buttonsBottom, "#".concat(this.identifiers.buttonsBottom));
        this.applyAspectRatio();
    };
    Styles.prototype.rebuild = function () {
        for (var index = 0; index < this.arrayIdentifiers.length; index++) {
            var identifier = this.arrayIdentifiers[index];
            var styleElement = document.querySelector('style[key="' + identifier + '"]');
            if (styleElement == null) {
                new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
            }
            styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
        }
        this.build();
    };
    Styles.prototype.applyDefaultStyles = function (style, identifierElement) {
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
        this.setStyles(style, this.getStyles(identifierElement, stylesMap));
    };
    Styles.prototype.getStyles = function (styleId, styleMap, compatibility) {
        if (compatibility === void 0) { compatibility = false; }
        var styleString;
        styleString = "".concat(styleId, " {");
        for (var key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (compatibility) {
                    styleString += "-moz-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-ms-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-o-".concat(key, ": ").concat(styleMap[key], ";");
                }
                styleString += "".concat(key, ": ").concat(styleMap[key], ";");
            }
        }
        styleString += '}';
        return styleString;
    };
    Styles.prototype.setStyles = function (watchStyle, stringStyle) {
        var identifier = this.arrayIdentifiers[watchStyle];
        var styleElement = document.querySelector('style[key="' + identifier + '"]');
        if (styleElement == null) {
            new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
        }
        styleElement.innerHTML = stringStyle;
    };
    Styles.prototype.addStyles = function (watchStyle, stringStyle) {
        var identifier = this.arrayIdentifiers[watchStyle];
        var styleElement = document.querySelector('style[key="' + identifier + '"]');
        if (styleElement == null) {
            new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
        }
        styleElement.innerHTML += stringStyle;
    };
    return Styles;
}());
export default Styles;
