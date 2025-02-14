import IOError from "./class/io_error";
import IOElements from "./class/io_elements";
var SVP = (function () {
    function SVP(options) {
        var _a, _b, _c, _d;
        this.optionsDefault = {
            settings: {
                autoplay: false,
            },
            video: {
                volume: 70,
            }
        };
        this.identifiersClass = {
            all: 'svp_all',
            buttons: 'svp__buttons',
            icons: 'svp__icons',
            fading: 'svp__fading',
            hide: 'svp__hide',
        };
        this.identifiersId = {
            container: 'svp__container',
            video: 'svp',
            top: 'svp__top',
            middle: 'svp__middle',
            bottom: 'svp__bottom',
        };
        this.options = {
            settings: {
                autoplay: (_b = (_a = options === null || options === void 0 ? void 0 : options.settings) === null || _a === void 0 ? void 0 : _a.autoplay) !== null && _b !== void 0 ? _b : this.optionsDefault.settings.autoplay,
            },
            video: {
                volume: (_d = (_c = options === null || options === void 0 ? void 0 : options.video) === null || _c === void 0 ? void 0 : _c.volume) !== null && _d !== void 0 ? _d : this.optionsDefault.video.volume,
            }
        };
        if (this.options == undefined) {
            new IOError("Options undefinded");
        }
        this.tagVideo = document.getElementById(this.identifiersId.video);
        if (this.tagVideo == undefined) {
            new IOError("Tag Video undefinded");
        }
        this.build();
    }
    SVP.prototype.build = function () {
        new IOElements(this.options, this.identifiersClass, this.identifiersId, this.tagVideo);
    };
    return SVP;
}());
