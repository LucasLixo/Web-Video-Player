"./interfaces/options";
import Elements from "./class/elements";
import Styles from "./class/styles";
var WVP = (function () {
    function WVP(apply, options) {
        var _a, _b, _c, _d, _e, _f;
        if (options == undefined) {
            options = {};
        }
        this.options = {
            apply: apply,
            backgroundColor: (_a = options['backgroundColor']) !== null && _a !== void 0 ? _a : 'transparent',
            colorInactive: (_b = options['colorInactive']) !== null && _b !== void 0 ? _b : '#FFFFFF',
            colorActive: (_c = options['colorActive']) !== null && _c !== void 0 ? _c : '#007AFF',
            autoplay: (_d = options['autoplay']) !== null && _d !== void 0 ? _d : true,
            muted: (_e = options['muted']) !== null && _e !== void 0 ? _e : true,
            top: (_f = options['top']) !== null && _f !== void 0 ? _f : null,
        };
        this.identifiers = {
            all: 'wvp_all',
            video: apply,
            container: 'wvp__container',
            top: 'wvp__top',
            middle: 'wvp__middle',
            bottom: 'wvp__bottom',
            duration: 'wvp__duration',
            rangerVolume: 'wvp__ranger_volume',
            rangerProguess: 'wvp__ranger_proguess',
            rangerProguessPoint: 'wvp__ranger_proguess_point',
            icons: 'wvp__icons',
            buttons: 'wvp__buttons'
        };
        this.buttons = {
            playPause: 'wvp__button__play_pause',
            fullscreen: 'wvp__button__fullscreen',
            pictureInPicture: 'wvp__button__picture_in_picture',
            volume: 'wvp__button__volume',
            duration: 'wvp__button__duration',
            rangerVolume: 'wvp__button__ranger_volume',
            rangerProguess: 'wvp__button__ranger_proguess',
            rangerProguessPoint: 'wvp__button__ranger_proguess_point',
        };
        this.styles = new Styles(this.options, this.identifiers);
        this.elements = new Elements(this.options, this.identifiers, this.buttons);
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
        this.elements.build();
    };
    return WVP;
}());
