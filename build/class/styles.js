import { styles } from "../enums/styles";
import IOError from "./io_error";
var Styles = (function () {
    function Styles(options, identifiers) {
        this.containerStyle = document.head;
        this.identifiers = identifiers;
        this.options = options;
        this.arrayIdentifiers = [
            this.identifiers.all,
            this.identifiers.video,
            this.identifiers.container,
            this.identifiers.top,
            this.identifiers.middle,
            this.identifiers.bottom,
            this.identifiers.icons,
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
        this.applyAllStyles("".concat(this.identifiers.video, ", #").concat(this.identifiers.container, ", #").concat(this.identifiers.top, ", #").concat(this.identifiers.middle, ", #").concat(this.identifiers.bottom));
        this.applyVideoStyles(this.identifiers.video);
        this.applyContainerStyles("#".concat(this.identifiers.container));
        this.applyTopStyles("#".concat(this.identifiers.top));
        this.applyMiddleStyles("#".concat(this.identifiers.middle));
        this.applyBottomStyles("#".concat(this.identifiers.bottom));
        this.applyIconsStyles("#".concat(this.identifiers.icons));
    };
    Styles.prototype.applyAllStyles = function (identifierElement) {
        var stylesMap = {
            'margin': '0',
            'padding': '0',
            'box-sizing': 'inherit',
            'text-shadow': 'none',
            'direction': 'ltr',
        };
        this.setStyles(styles.all, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyVideoStyles = function (identifierElement) {
        var stylesMap = {
            'display': 'block',
            'width': '100%',
            'height': '100%',
            'z-index': '-99',
            'background-color': 'black',
        };
        this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyContainerStyles = function (identifierElement) {
        var stylesMap = {
            'position': 'relative',
            'display': 'block',
            'max-width': '100%',
            'min-width': '240px',
            'height': 'fit-content',
        };
        this.setStyles(styles.container, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyTopStyles = function (identifierElement) {
        var stylesMap = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'top': '0',
            'z-index': '99',
            'flex-direction': 'row',
            'justify-content': 'center',
            'background-color': '#FF000080',
        };
        this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyMiddleStyles = function (identifierElement) {
        var stylesMap = {
            'position': 'absolute',
            'display': 'block',
            'width': '4rem',
            'height': '4rem',
            'top': '50%',
            'left': '50%',
            'z-index': '99',
            'background': this.options.colorActive,
            'color': 'inherit',
            'border': 'none',
            'padding': '0',
            'font': 'inherit',
            'cursor': 'pointer',
            'outline': 'inherit',
            'touch-action': 'manipulation',
            'border-radius': '100%',
        };
        this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyBottomStyles = function (identifierElement) {
        var stylesMap = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'bottom': '0',
            'z-index': '99',
            'flex-direction': 'row',
            'justify-content': 'center',
            'background-color': '#0000FF80',
        };
        this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyIconsStyles = function (identifierElement) {
        var stylesMap = {
            'width': '3rem',
            'height': '3rem',
            'margin': 'auto',
            'fill': this.options.colorInactive,
        };
        this.setStyles(styles.icons, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.parseStyles = function (styleId, styleMap, compatibility) {
        if (compatibility === void 0) { compatibility = true; }
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
