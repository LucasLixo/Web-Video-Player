var Styles = (function () {
    function Styles(identifiers) {
        this.containerStyle = document.body;
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
    };
    Styles.prototype.rebuild = function () {
        for (var index = 0; index < this.arrayIdentifiers.length; index++) {
            var identifier = this.arrayIdentifiers[index];
            var styleElement = document.querySelector('style[key="' + identifier + '"]');
            styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
        }
        this.build();
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
    Styles.prototype.setStyles = function (stringStyle) {
    };
    Styles.prototype.addStyles = function (watchStyle, stringStyle) {
    };
    return Styles;
}());
export default Styles;
