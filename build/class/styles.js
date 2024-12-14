var Styles = (function () {
    function Styles(options, identifiersId, identifiersClass, actions) {
        var _this = this;
        this.allStyles = '';
        this.indexStyles = 99;
        this.classAll = function () {
            var stylesMap = {
                'margin': '0',
                'padding': '0',
                'box-sizing': 'inherit',
                'text-shadow': 'none',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.all), stylesMap));
        };
        this.classButtons = function () {
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
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.buttons), stylesMap));
        };
        this.classIcons = function () {
            var stylesMap = {
                'display': 'block',
                'margin': 'auto',
                'fill': _this.options.colorInactive,
                'width': '2rem',
                'height': '2rem',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.icons), stylesMap));
        };
        this.applyVideo = function () {
            var stylesMap = {
                'display': 'block',
                'width': '100%',
                'height': '100%',
                'z-index': "-".concat(_this.indexStyles),
                'background-color': _this.options.backgroundColor,
            };
            _this.addStyles(_this.parseStyles(_this.options.apply, stylesMap));
        };
        this.idContainer = function () {
            var stylesMap = {
                'position': 'relative',
                'display': 'block',
                'max-width': '100%',
                'min-width': '240px',
                'height': 'fit-content',
                'cursor': 'default',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.container), stylesMap));
        };
        this.idTop = function () {
            var stylesMap = {
                'position': 'absolute',
                'display': 'block',
                'width': '100%',
                'height': 'fit-content',
                'right': '0',
                'left': '0',
                'top': '0',
                'z-index': _this.indexStyles.toString(),
                'padding': '1rem',
                'background': 'linear-gradient(to bottom, black, transparent)',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top), stylesMap));
        };
        this.idMiddle = function () {
            var stylesMap = {
                'position': 'absolute',
                'width': '3rem',
                'height': '3rem',
                'top': '50%',
                'left': '50%',
                'z-index': _this.indexStyles.toString(),
                'transform': 'translate(-50%, -50%)',
                'background': _this.options.colorActive,
                'border-radius': '100%',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.middle), stylesMap));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.middle), [
                { attribute: 'height', valueMax: '2.7rem', valueMiddle: '2.5rem', valueMin: '2.3rem', },
            ]));
        };
        this.idBottom = function () {
            var stylesMap = {
                'position': 'absolute',
                'display': 'flex',
                'width': '100%',
                'height': 'fit-content',
                'right': '0',
                'left': '0',
                'bottom': '0',
                'z-index': _this.indexStyles.toString(),
                'padding': '1rem',
                'background': 'linear-gradient(to top, black, transparent)',
                'flex-direction': 'row',
                'justify-content': 'space-between',
                'align-items': 'center',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom), stylesMap));
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom, " button"), {
                'margin': '0 0.2rem 0 0.2rem',
            }));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.bottom, " button"), [
                { attribute: 'margin', valueMax: '0 0.2rem 0 0.2rem', valueMiddle: '0 0.1rem 0 0.1rem', valueMin: '0 0.1rem 0 0.1rem', },
            ]));
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.currentTime, ", #").concat(_this.actions.durationTime), {
                'margin': '0 0.3rem 0 0.3rem',
            }));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.currentTime, ", #").concat(_this.actions.durationTime), [
                { attribute: 'margin', valueMax: '0 0.3rem 0 0.3rem', valueMiddle: '0 0.2rem 0 0.2rem', valueMin: '0 0.1rem 0 0.1rem', },
            ]));
        };
        this.actionsTime = function () {
            var stylesMap = {
                'font-family': 'inherit',
                'font-size': '1rem',
                'font-weight': 'bold',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.durationTime, ", #").concat(_this.actions.currentTime), stylesMap));
        };
        this.actionsRangerProguessContainer = function () {
            var stylesMap = {
                'position': 'relative',
                'display': 'block',
                'width': '100%',
                'height': '0.4rem',
                'background': '#CBCBCB',
                'border-radius': '1rem',
                'cursor': 'pointer',
                'overflow': 'visible',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer), stylesMap));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer), [
                { attribute: 'height', valueMax: '0.3rem', valueMiddle: '0.3rem', valueMin: '0.2rem', },
            ]));
        };
        this.actionsRangerProguess = function () {
            var stylesMap = {
                'position': 'absolute',
                'top': '0',
                'bottom': '0',
                'left': '0',
                'display': 'block',
                'width': '0%',
                'height': '100%',
                'border-radius': '1rem',
                'background': _this.options.colorActive,
                'cursor': 'pointer',
                'pointer-events': 'none',
                'transition': 'width 0.1s linear',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguess), stylesMap));
        };
        this.actionsRangerProguessPoint = function () {
            var stylesMap = {
                'position': 'absolute',
                'display': 'block',
                'top': '0',
                'bottom': '0',
                'transform': 'translate(0%, -30%)',
                'left': '0%',
                'width': '1.2rem',
                'height': '1.2rem',
                'background': _this.options.colorInactive,
                'border-radius': '100%',
                'cursor': 'pointer',
                'pointer-events': 'none',
                'z-index': _this.indexStyles.toString(),
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessPoint), stylesMap));
        };
        this.buildFading = function () {
            var stylesMap = {
                'transition': 'opacity 0.3s ease, visibility 0.3s ease',
                'opacity': '1',
                'visibility': 'visible',
                'overflow': 'visible',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top, ", #").concat(_this.identifiersId.middle, ", #").concat(_this.identifiersId.bottom), stylesMap));
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.fading), {
                'opacity': '0 !important',
                'visibility': 'hidden !important',
                'overflow': 'hidden !important',
            }));
        };
        this.buildCursorHide = function () {
            var stylesMap = {
                'cursor': 'none !important',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.cursorHide), stylesMap));
        };
        this.buildStylesCompatibility = function (attribute, value) {
            var styleString = '';
            if (true) {
                styleString += "-moz-".concat(attribute, ": ").concat(value, ";");
                styleString += "-ms-".concat(attribute, ": ").concat(value, ";");
                styleString += "-o-".concat(attribute, ": ").concat(value, ";");
            }
            styleString += "".concat(attribute, ": ").concat(value, ";");
            return styleString;
        };
        this.options = options;
        this.identifiersId = identifiersId;
        this.identifiersClass = identifiersClass;
        this.actions = actions;
    }
    Styles.prototype.build = function () {
        this.buildClass();
        this.buildId();
        this.applyVideo();
        this.buildActions();
        this.buildFading();
        this.buildCursorHide();
        this.setStyles();
    };
    Styles.prototype.buildClass = function () {
        this.classAll();
        this.classButtons();
        this.classIcons();
    };
    Styles.prototype.buildId = function () {
        this.idContainer();
        this.idTop();
        this.idMiddle();
        this.idBottom();
    };
    Styles.prototype.buildActions = function () {
        this.actionsTime();
        this.actionsRangerProguessContainer();
        this.actionsRangerProguess();
        this.actionsRangerProguessPoint();
    };
    Styles.prototype.parseStyles = function (styleId, styleMap) {
        var styleString = '';
        styleString += "".concat(styleId, " {");
        for (var key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                styleString += this.buildStylesCompatibility(key, styleMap[key]);
            }
        }
        styleString += '}';
        return styleString;
    };
    Styles.prototype.parseStylesMedia = function (styleId, extra) {
        var styleString = '';
        extra.forEach(function (property) {
            styleString += "@media (max-width: 480px) {";
            styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMax, "; }");
            styleString += "}";
            styleString += "@media (max-width: 360px) {";
            styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMiddle, "; }");
            styleString += "}";
            styleString += "@media (max-width: 240px) {";
            styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMin, "; }");
            styleString += "}";
        });
        return styleString;
    };
    Styles.prototype.addStyles = function (stringStyle) {
        this.allStyles += stringStyle;
    };
    Styles.prototype.setStyles = function () {
        var headElement = document.head;
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = this.allStyles;
        headElement.appendChild(style);
    };
    return Styles;
}());
export default Styles;
