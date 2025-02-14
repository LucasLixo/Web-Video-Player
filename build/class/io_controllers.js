var IOControllers = (function () {
    function IOControllers(options, identifiersClass, identifiersId, identifiersActions, identifiersIcons, elementVideo) {
        this.controlsValue = {
            current: '00:00',
            currentTime: 0,
            duration: '00:00',
            durationTime: 0,
        };
        this.options = options;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.identifiersActions = identifiersActions;
        this.identifiersIcons = identifiersIcons;
        this.elementVideo = elementVideo;
        this.controlsElements = {
            currentTime: document.querySelector("p[action=\"".concat(this.identifiersActions.currentTime, "\"]")),
            durationTime: document.querySelector("p[action=\"".concat(this.identifiersActions.durationTime, "\"]")),
        };
        this.build();
    }
    IOControllers.prototype.build = function () {
        this.buildPrepareVideo();
        this.buildPrepareVideoTime();
    };
    IOControllers.prototype.buildPrepareVideo = function () {
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.removeAttribute('height');
        this.elementVideo.removeAttribute('width');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.options.currentTime;
        this.elementVideo.setAttribute('playsinline', '');
        this.elementVideo.setAttribute('preload', 'auto');
        this.elementVideo.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
        this.elementVideo.setAttribute('disablepictureinpicture', '');
        this.elementVideo.setAttribute('disableremoteplayback', '');
        this.elementVideo.setAttribute('disabledownload', '');
        this.elementVideo.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
        if (this.options.autoplay) {
            this.elementVideo.setAttribute('autoplay', '');
        }
        else {
            this.elementVideo.removeAttribute('autoplay');
        }
    };
    IOControllers.prototype.buildPrepareVideoTime = function () {
        var _this = this;
        this.elementVideo.onloadedmetadata = function () {
            var _a;
            _this.controlsElements.currentTime.innerHTML = _this.controlsValue.current;
            _this.controlsValue.durationTime = _this.elementVideo.duration;
            _this.controlsValue.duration = _this.formatTime((_a = _this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0);
            _this.controlsElements.durationTime.innerHTML = _this.controlsValue.duration;
        };
    };
    IOControllers.prototype.formatTime = function (seconds) {
        function padZero(number) {
            return (number < 10 ? '0' : '') + number;
        }
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var secondsLeft = Math.floor(seconds % 60);
        if (hours > 0) {
            return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(secondsLeft);
        }
        return padZero(minutes) + ':' + padZero(secondsLeft);
    };
    return IOControllers;
}());
export default IOControllers;
