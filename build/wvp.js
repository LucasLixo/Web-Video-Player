"./interfaces/options";
import Elements from "./class/elements";
import Styles from "./class/styles";
var WVP = (function () {
    function WVP(apply, options) {
        var _a, _b, _c, _d;
        if (options == undefined) {
            options = {};
        }
        this.options = {
            apply: apply,
            colorInactive: (_a = options['colorInactive']) !== null && _a !== void 0 ? _a : '#FFFFFF',
            colorActive: (_b = options['colorActive']) !== null && _b !== void 0 ? _b : '#007AFF',
            autoplay: (_c = options['autoplay']) !== null && _c !== void 0 ? _c : true,
            muted: (_d = options['muted']) !== null && _d !== void 0 ? _d : true,
        };
        this.identifiers = {
            all: 'wvp_all',
            video: apply,
            container: 'wvp__container',
            top: 'wvp__top',
            middle: 'wvp__middle',
            bottom: 'wvp__bottom',
            icons: 'wvp__icon',
        };
        this.styles = new Styles(this.options, this.identifiers);
        this.elements = new Elements(this.options, this.identifiers);
        this.init();
    }
    Object.defineProperty(WVP.prototype, "colorInactive", {
        get: function () {
            return this.options.colorInactive;
        },
        set: function (value) {
            if (this.options.colorInactive == value)
                return;
            this.options.colorInactive = value;
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
        },
        enumerable: false,
        configurable: true
    });
    WVP.prototype.init = function () {
        this.styles.build();
    };
    return WVP;
}());
