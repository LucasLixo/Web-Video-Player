var Styles = (function () {
    function Styles(options, identifiersId, identifiersClass, actions) {
        var _this = this;
        this.allStyles = '';
        this.indexStyles = 99;
        this.stylesTemp = {};
        this.classAll = function () {
            _this.stylesTemp = {
                'margin': '0',
                'padding': '0',
                'box-sizing': 'inherit',
                'text-shadow': 'none',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.all), _this.stylesTemp));
        };
        this.classButtons = function () {
            _this.stylesTemp = {
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
                'background-color': 'transparent',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.buttons), _this.stylesTemp));
        };
        this.classIcons = function () {
            _this.stylesTemp = {
                'display': 'block',
                'margin': 'auto',
                'fill': _this.options.style.colorInactive,
                'width': '2rem',
                'height': '2rem',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.icons), _this.stylesTemp));
        };
        this.applyVideo = function () {
            _this.stylesTemp = {
                'display': 'block',
                'width': '100%',
                'height': '100%',
                'z-index': "-".concat(_this.indexStyles),
                'background-color': _this.options.style.backgroundColor,
            };
            _this.addStyles(_this.parseStyles(_this.options.apply, _this.stylesTemp));
        };
        this.idContainer = function () {
            _this.stylesTemp = {
                'position': 'relative',
                'display': 'block',
                'max-width': '100%',
                'min-width': '240px',
                'height': 'fit-content',
                'cursor': 'default',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.container), _this.stylesTemp));
        };
        this.idTop = function () {
            _this.stylesTemp = {
                'position': 'absolute',
                'display': 'block',
                'width': '100%',
                'height': 'fit-content',
                'right': '0',
                'left': '0',
                'top': '0',
                'z-index': _this.indexStyles.toString(),
                'padding': '1rem',
                'background-image': 'linear-gradient(to bottom, #00000080, transparent)',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top), _this.stylesTemp));
        };
        this.idMiddle = function () {
            _this.stylesTemp = {
                'position': 'absolute',
                'width': '3rem',
                'height': '3rem',
                'top': '50%',
                'left': '50%',
                'z-index': _this.indexStyles.toString(),
                'transform': 'translate(-50%, -50%)',
                'background-color': _this.options.style.colorActive,
                'border-radius': '100%',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.middle), _this.stylesTemp));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.middle), [
                { attribute: 'height', valueMax: '2.7rem', valueMiddle: '2.5rem', valueMin: '2.3rem', },
            ]));
        };
        this.idBottom = function () {
            _this.stylesTemp = {
                'position': 'absolute',
                'display': 'flex',
                'width': '100%',
                'height': 'fit-content',
                'right': '0',
                'left': '0',
                'bottom': '0',
                'z-index': _this.indexStyles.toString(),
                'padding': '1rem',
                'background-image': 'linear-gradient(to top, #00000080, transparent)',
                'flex-direction': 'row',
                'justify-content': 'space-between',
                'align-items': 'center',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom), _this.stylesTemp));
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
            _this.stylesTemp = {
                'font-family': 'inherit',
                'font-size': '1rem',
                'font-weight': 'bold',
                'color': _this.options.style.colorInactive,
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.durationTime, ", #").concat(_this.actions.currentTime), _this.stylesTemp));
        };
        this.actionsRangerProguessContainer = function () {
            _this.stylesTemp = {
                'position': 'relative',
                'display': 'block',
                'width': '100%',
                'height': 'auto',
                'background-color': 'transparent',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer), _this.stylesTemp));
            _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer), [
                { attribute: 'height', valueMax: '0.3rem', valueMiddle: '0.3rem', valueMin: '0.2rem', },
            ]));
        };
        this.actionsRangerProguessInput = function () {
            _this.stylesTemp = {
                'appearance': 'none',
                'border': 'none',
                'cursor': 'pointer',
                'width': '100%',
                'height': 'auto',
                'background-color': 'transparent',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput), _this.stylesTemp));
            _this.stylesTemp = {
                'appearance': 'none',
                'border': 'none',
                'width': '100%',
                'height': '0.5rem',
                'background-color': _this.options.style.colorInactive,
                'border-radius': '0.8rem',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput, "::-webkit-slider-runnable-track"), _this.stylesTemp));
            _this.stylesTemp = {
                'appearance': 'none',
                'border': 'none',
                'width': '0.9rem',
                'height': '0.9rem',
                'background-color': _this.options.style.colorActive,
                'border-radius': '50%',
                'margin-top': '-0.2rem',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput, "::-webkit-slider-thumb"), _this.stylesTemp));
        };
        this.actionsRangerProguessProguess = function () {
            _this.stylesTemp = {
                'position': 'absolute',
                'display': 'block',
                'top': '0',
                'left': '0',
                'width': '0%',
                'height': '0.5rem',
                'margin-top': '0.6rem',
                'border-top-left-radius': '0.8rem',
                'border-bottom-left-radius': '0.8rem',
                'border-top-right-radius': '0',
                'border-bottom-right-radius': '0',
                'background-color': _this.options.style.colorActive,
                'pointer-events': 'none',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessProguess), _this.stylesTemp));
        };
        this.buildFading = function () {
            _this.stylesTemp = {
                'transition': 'opacity 0.3s ease, visibility 0.3s ease',
                'opacity': '1',
                'visibility': 'visible',
                'overflow': 'visible',
            };
            _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top, ", #").concat(_this.identifiersId.middle, ", #").concat(_this.identifiersId.bottom), _this.stylesTemp));
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.fading), {
                'opacity': '0 !important',
                'visibility': 'hidden !important',
                'overflow': 'hidden !important',
            }));
        };
        this.buildCursorHide = function () {
            _this.stylesTemp = {
                'cursor': 'none !important',
            };
            _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.cursorHide), _this.stylesTemp));
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
        this.actionsRangerProguessInput();
        this.actionsRangerProguessProguess();
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
