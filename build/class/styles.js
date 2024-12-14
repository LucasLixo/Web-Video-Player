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
            this.identifiers.duration,
            this.identifiers.rangerVolume,
            this.identifiers.icons,
            this.identifiers.buttons,
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
        this.applyAllStyles();
        this.applyVideoStyles();
        this.applyContainerStyles();
        this.applyTopStyles();
        this.applyMiddleStyles();
        this.applyBottomStyles();
        this.applyDurationStyles();
        this.applyRangerVolumeStyles();
        this.applyRangerProguessStyles();
        this.applyRangerProguessPointStyles();
        this.applyIconsStyles();
        this.applyButtonStyles();
    };
    Styles.prototype.applyAllStyles = function () {
        var identifierElement = "".concat(this.identifiers.video, ", #").concat(this.identifiers.container, ", #").concat(this.identifiers.top, ", #").concat(this.identifiers.middle, ", #").concat(this.identifiers.bottom);
        var stylesMap = {
            'margin': '0',
            'padding': '0',
            'box-sizing': 'inherit',
            'text-shadow': 'none',
            'direction': 'ltr',
        };
        this.setStyles(styles.all, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyVideoStyles = function () {
        var identifierElement = this.identifiers.video;
        var stylesMap = {
            'display': 'block',
            'width': '100%',
            'height': '100%',
            'z-index': '-99',
            'background-color': this.options.backgroundColor,
        };
        this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyContainerStyles = function () {
        var identifierElement = "#".concat(this.identifiers.container);
        var stylesMap = {
            'position': 'relative',
            'display': 'block',
            'max-width': '100%',
            'min-width': '240px',
            'height': 'fit-content',
        };
        this.setStyles(styles.container, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyTopStyles = function () {
        var identifierElement = "#".concat(this.identifiers.top);
        var stylesMap = {
            'position': 'absolute',
            'display': 'block',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'top': '0',
            'z-index': '99',
            'padding': '1rem',
            'background': 'linear-gradient(to bottom, black, transparent)',
        };
        this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyMiddleStyles = function () {
        var identifierElement = "#".concat(this.identifiers.middle);
        var stylesMap = {
            'position': 'absolute',
            'width': '3rem',
            'height': '3rem',
            'top': '50%',
            'left': '50%',
            'z-index': '99',
            'transform': 'translate(-50%, -50%)',
            'background': this.options.colorActive,
            'border-radius': '100%',
        };
        this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));
        this.addStyles(styles.middle, this.parseStyles("".concat(identifierElement), {
            'height': '2.7rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));
        this.addStyles(styles.middle, this.parseStyles("".concat(identifierElement), {
            'height': '2.5rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    };
    Styles.prototype.applyBottomStyles = function () {
        var identifierElement = "#".concat(this.identifiers.bottom);
        var stylesMap = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'bottom': '0',
            'z-index': '99',
            'padding': '1rem',
            'background': 'linear-gradient(to top, black, transparent)',
            'flex-direction': 'row',
            'justify-content': 'space-between',
            'align-items': 'center',
        };
        this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
        this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement), {
            'height': '1.7rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));
        this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement), {
            'height': '1.5rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
        this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
            'margin-left': '0.3rem',
            'margin-right': '0.3rem',
        }));
        this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
            'margin-left': '0.2rem',
            'margin-right': '0.2rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));
        this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
            'margin-left': '0.1rem',
            'margin-right': '0.1rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    };
    Styles.prototype.applyDurationStyles = function () {
        var identifierElement = "#".concat(this.identifiers.duration);
        var stylesMap = {
            'font-family': 'inherit',
            'font-size': '2.5rem',
            'font-weight': 'bold',
        };
        this.setStyles(styles.duration, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyRangerVolumeStyles = function () {
        var identifierElement = "#".concat(this.identifiers.rangerVolume);
        var stylesMap = {
            'position': 'relative',
            'display': 'block',
            'width': '100%',
            'height': '0.5rem',
            'background': '#CBCBCB',
            'border-radius': '1rem',
            'cursor': 'pointer',
            'overflow': 'visible',
        };
        this.setStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
        this.addStyles(styles.rangerVolume, this.parseStyles("".concat(identifierElement), {
            'height': '0.4rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));
        this.addStyles(styles.rangerVolume, this.parseStyles("".concat(identifierElement), {
            'height': '0.3rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    };
    Styles.prototype.applyRangerProguessStyles = function () {
        var identifierElement = "#".concat(this.identifiers.rangerProguess);
        var stylesMap = {
            'position': 'absolute',
            'top': '0',
            'bottom': '0',
            'left': '0',
            'display': 'block',
            'width': '33%',
            'height': '100%',
            'border-radius': '1rem',
            'background': this.options.colorActive,
            'cursor': 'pointer',
            'pointer-events': 'none',
            'transition': 'width 0.1s linear',
        };
        this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyRangerProguessPointStyles = function () {
        var identifierElement = "#".concat(this.identifiers.rangerProguessPoint);
        var stylesMap = {
            'position': 'absolute',
            'display': 'block',
            'top': '0',
            'bottom': '0',
            'transform': 'translate(0%, -25%)',
            'left': 'calc(33% - 1%)',
            'width': '1.2rem',
            'height': '1.2rem',
            'background': this.options.colorInactive,
            'border-radius': '100%',
            'cursor': 'pointer',
            'pointer-events': 'none',
            'z-index': '99',
        };
        this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyButtonStyles = function () {
        var identifierElement = ".".concat(this.identifiers.buttons);
        var stylesMap = {
            'display': 'block',
            'color': 'inherit',
            'border': 'none',
            'padding': '0',
            'margin': '0',
            'font': 'inherit',
            'cursor': 'pointer',
            'outline': 'inherit',
            'touch-action': 'manipulation',
            'flex-shrink': '0',
            'background': 'transparent',
        };
        this.setStyles(styles.buttons, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.applyIconsStyles = function () {
        var identifierElement = "#".concat(this.identifiers.icons);
        var stylesMap = {
            'display': 'block',
            'margin': 'auto',
            'fill': this.options.colorInactive,
            'width': '2rem',
            'height': '2rem',
        };
        this.setStyles(styles.icons, this.parseStyles(identifierElement, stylesMap));
    };
    Styles.prototype.parseStyles = function (styleId, styleMap, extra) {
        var styleString = '';
        if (extra) {
            styleString += extra.before;
        }
        styleString += "".concat(styleId, " {");
        for (var key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (true) {
                    styleString += "-moz-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-ms-".concat(key, ": ").concat(styleMap[key], ";");
                    styleString += "-o-".concat(key, ": ").concat(styleMap[key], ";");
                }
                styleString += "".concat(key, ": ").concat(styleMap[key], ";");
            }
        }
        styleString += '}';
        if (extra) {
            styleString += extra.after;
        }
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
