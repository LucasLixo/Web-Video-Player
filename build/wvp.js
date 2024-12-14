import IOError from "./class/io_error";
import Elements from "./class/elements";
import Styles from "./class/styles";
var WVP = (function () {
    function WVP(apply, options) {
        var _a, _b, _c, _d, _e, _f;
        var optionsClear = {};
        if (options != undefined) {
            Object.keys(options).forEach(function (key) {
                var value = options[key];
                if (value !== null && value !== '') {
                    optionsClear[key] = value;
                }
            });
        }
        this.options = {
            apply: apply,
            backgroundColor: (_a = optionsClear['backgroundColor']) !== null && _a !== void 0 ? _a : 'transparent',
            colorInactive: (_b = optionsClear['colorInactive']) !== null && _b !== void 0 ? _b : '#FFFFFF',
            colorActive: (_c = optionsClear['colorActive']) !== null && _c !== void 0 ? _c : '#007AFF',
            autoplay: (_d = optionsClear['autoplay']) !== null && _d !== void 0 ? _d : true,
            muted: (_e = optionsClear['muted']) !== null && _e !== void 0 ? _e : false,
            top: (_f = optionsClear['top']) !== null && _f !== void 0 ? _f : null,
        };
        this.identifiersId = {
            container: 'wvp__container',
            top: 'wvp__top',
            middle: 'wvp__middle',
            bottom: 'wvp__bottom',
        };
        this.identifiersClass = {
            all: 'wvp_all',
            buttons: 'wvp__buttons',
            icons: 'wvp__icons',
            fading: 'wvp__fading',
            cursorHide: 'wvp__cursor_hide',
        };
        this.actions = {
            playPause: 'wvp__button__play_pause',
            fullscreen: 'wvp__button__fullscreen',
            pictureInPicture: 'wvp__button__picture_in_picture',
            volume: 'wvp__button__volume',
            rangerVolumeContainer: 'wvp__button__ranger_volume_container',
            rangerVolume: 'wvp__button__ranger_volume',
            rangerVolumePoint: 'wvp__button__ranger_volume_point',
            durationTime: 'wvp__button__duration_time',
            currentTime: 'wvp__button__current_time',
            rangerProguessContainer: 'wvp__button__ranger_proguess_container',
            rangerProguess: 'wvp__button__ranger_proguess',
            rangerProguessPoint: 'wvp__button__ranger_proguess_point',
        };
        this.elements = new Elements(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.styles = new Styles(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.init();
    }
    Object.defineProperty(WVP.prototype, "backgroundColor", {
        get: function () {
            return this.options.backgroundColor;
        },
        set: function (value) {
            if (this.options.backgroundColor == value)
                return;
            this.options.backgroundColor = value;
            new IOError('Error backgroundColor(); not suport!');
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
            new IOError('Error colorInactive(); not suport!');
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
            new IOError('Error colorActive(); not suport!');
        },
        enumerable: false,
        configurable: true
    });
    WVP.prototype.init = function () {
        this.elements.build();
        this.styles.build();
    };
    return WVP;
}());
