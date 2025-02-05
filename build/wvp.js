import IOError from "./class/io_error";
import Elements from "./class/elements";
import Styles from "./class/styles";
var WVP = (function () {
    function WVP(apply, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
        var optionsClear = {
            settings: {},
            show: {},
            style: {},
        };
        if (!apply) {
            new IOError("Error apply(); not defined!");
        }
        if (options) {
            Object.keys(options).forEach(function (key) {
                var value = options[key];
                if (value !== null && value !== "") {
                    optionsClear[key] = value;
                }
            });
        }
        this.options = {
            apply: apply,
            settings: {
                autoplay: (_b = (_a = optionsClear.settings) === null || _a === void 0 ? void 0 : _a.autoplay) !== null && _b !== void 0 ? _b : true,
                muted: (_d = (_c = optionsClear.settings) === null || _c === void 0 ? void 0 : _c.muted) !== null && _d !== void 0 ? _d : false,
            },
            show: {
                titleTop: (_f = (_e = optionsClear.show) === null || _e === void 0 ? void 0 : _e.titleTop) !== null && _f !== void 0 ? _f : false,
                playPause: (_h = (_g = optionsClear.show) === null || _g === void 0 ? void 0 : _g.playPause) !== null && _h !== void 0 ? _h : true,
                playPauseCenter: (_k = (_j = optionsClear.show) === null || _j === void 0 ? void 0 : _j.playPauseCenter) !== null && _k !== void 0 ? _k : true,
                fullscreen: (_m = (_l = optionsClear.show) === null || _l === void 0 ? void 0 : _l.fullscreen) !== null && _m !== void 0 ? _m : true,
                pictureInPicture: (_p = (_o = optionsClear.show) === null || _o === void 0 ? void 0 : _o.pictureInPicture) !== null && _p !== void 0 ? _p : true,
                volume: (_r = (_q = optionsClear.show) === null || _q === void 0 ? void 0 : _q.volume) !== null && _r !== void 0 ? _r : true,
                rangerVolume: (_t = (_s = optionsClear.show) === null || _s === void 0 ? void 0 : _s.rangerVolume) !== null && _t !== void 0 ? _t : true,
                durationTime: (_v = (_u = optionsClear.show) === null || _u === void 0 ? void 0 : _u.durationTime) !== null && _v !== void 0 ? _v : true,
                currentTime: (_x = (_w = optionsClear.show) === null || _w === void 0 ? void 0 : _w.currentTime) !== null && _x !== void 0 ? _x : true,
                rangerProguess: (_z = (_y = optionsClear.show) === null || _y === void 0 ? void 0 : _y.rangerProguess) !== null && _z !== void 0 ? _z : true,
            },
            style: {
                titleTag: (_1 = (_0 = optionsClear.style) === null || _0 === void 0 ? void 0 : _0.titleTag) !== null && _1 !== void 0 ? _1 : null,
                backgroundColor: (_3 = (_2 = optionsClear.style) === null || _2 === void 0 ? void 0 : _2.backgroundColor) !== null && _3 !== void 0 ? _3 : "#000000",
                colorInactive: (_5 = (_4 = optionsClear.style) === null || _4 === void 0 ? void 0 : _4.colorInactive) !== null && _5 !== void 0 ? _5 : "#FFFFFF",
                colorActive: (_7 = (_6 = optionsClear.style) === null || _6 === void 0 ? void 0 : _6.colorActive) !== null && _7 !== void 0 ? _7 : "#007AFF",
                shadow: (_9 = (_8 = optionsClear.style) === null || _8 === void 0 ? void 0 : _8.shadow) !== null && _9 !== void 0 ? _9 : true,
            },
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
            rangerVolumeInput: 'wvp__button__ranger_volume_input',
            rangerVolumeProguess: 'wvp__button__ranger_volume_proguess',
            durationTime: 'wvp__button__duration_time',
            currentTime: 'wvp__button__current_time',
            rangerProguessContainer: 'wvp__button__ranger_proguess_container',
            rangerProguessInput: 'wvp__button__ranger_proguess_input',
            rangerProguessProguess: 'wvp__button__ranger_proguess_proguess',
        };
        this.elements = new Elements(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.styles = new Styles(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.init();
    }
    WVP.prototype.init = function () {
        this.elements.build();
        this.styles.build();
    };
    return WVP;
}());
