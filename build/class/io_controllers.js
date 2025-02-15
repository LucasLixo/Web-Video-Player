import IOError from "./io_error";
var IOControllers = (function () {
    function IOControllers(indentifersOptions, identifiersClass, identifiersId, identifiersActions, identifiersIcons, elementVideo) {
        this.controlsValue = {
            current: '00:00',
            currentTime: 0,
            duration: '00:00',
            durationTime: 0,
            playing: false,
            fullscreen: false,
            proguess: 0,
        };
        this.indentifersOptions = indentifersOptions;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.identifiersActions = identifiersActions;
        this.identifiersIcons = identifiersIcons;
        this.elementVideo = elementVideo;
        this.controlsElements = {
            container: document.getElementById(this.identifiersId.container),
            top: document.getElementById(this.identifiersId.top),
            middle: document.getElementById(this.identifiersId.middle),
            bottom: document.getElementById(this.identifiersId.bottom),
            playPause: document.querySelectorAll("button[action=\"".concat(this.identifiersActions.playPause, "\"]")),
            fullscreen: document.querySelector("button[action=\"".concat(this.identifiersActions.fullscreen, "\"]")),
            volume: document.querySelector("button[action=\"".concat(this.identifiersActions.volume, "\"]")),
            currentTime: document.querySelector("p[action=\"".concat(this.identifiersActions.currentTime, "\"]")),
            durationTime: document.querySelector("p[action=\"".concat(this.identifiersActions.durationTime, "\"]")),
            pictureInPicture: document.querySelector("button[action=\"".concat(this.identifiersActions.pictureInPicture, "\"]")),
            rangerProguessContainer: document.querySelector("div[action=\"".concat(this.identifiersActions.rangerProguessContainer, "\"]")),
            rangerProguessInput: document.querySelector("input[action=\"".concat(this.identifiersActions.rangerProguessInput, "\"]")),
            rangerProguessDiv: document.querySelector("div[action=\"".concat(this.identifiersActions.rangerProguessDiv, "\"]")),
        };
        this.build();
    }
    IOControllers.prototype.build = function () {
        this.buildBlockRightClick();
        this.buildPrepareVideo();
        this.buildFading();
        this.buildPlayPause();
        this.buildRangerProguess();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        this.buildObserver();
    };
    IOControllers.prototype.buildBlockRightClick = function () {
        this.elementVideo.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
        this.controlsElements.container.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
        this.controlsElements.top.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
        this.controlsElements.middle.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
        this.controlsElements.bottom.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    };
    IOControllers.prototype.buildPrepareVideo = function () {
        var _this = this;
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.removeAttribute('height');
        this.elementVideo.removeAttribute('width');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.indentifersOptions.currentTime;
        this.elementVideo.setAttribute('playsinline', '');
        this.elementVideo.setAttribute('preload', 'auto');
        this.elementVideo.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
        this.elementVideo.setAttribute('disableremoteplayback', '');
        this.elementVideo.setAttribute('disabledownload', '');
        if (this.indentifersOptions.autoplay) {
            this.elementVideo.setAttribute('autoplay', '');
        }
        else {
            this.elementVideo.removeAttribute('autoplay');
        }
        this.elementVideo.currentTime = this.indentifersOptions.currentTime;
        this.elementVideo.volume = this.indentifersOptions.volume;
        this.elementVideo.addEventListener('loadedmetadata', function () {
            if (_this.indentifersOptions.autoplay) {
                _this.elementVideo.play();
            }
            else {
                _this.elementVideo.pause();
            }
        });
    };
    IOControllers.prototype.buildFading = function () {
        var _this = this;
        var allContainers = [
            this.controlsElements.top,
            this.controlsElements.middle,
            this.controlsElements.bottom,
        ];
        var hideTimeout = null;
        var hideControls = function () {
            if (!_this.elementVideo.paused) {
                allContainers.forEach(function (container) {
                    container.classList.add(_this.identifiersClass.fading);
                    _this.controlsElements.container.classList.add(_this.identifiersClass.hide);
                });
            }
        };
        var showControls = function () {
            allContainers.forEach(function (container) {
                container.classList.remove(_this.identifiersClass.fading);
                _this.controlsElements.container.classList.remove(_this.identifiersClass.hide);
            });
            if (hideTimeout)
                clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideControls, 2500);
        };
        this.controlsElements.container.addEventListener('mouseleave', function () {
            hideControls();
        });
        this.controlsElements.container.addEventListener('mousemove', function () {
            showControls();
        });
        showControls();
    };
    ;
    IOControllers.prototype.buildPlayPause = function () {
        var _this = this;
        this.elementVideo.addEventListener('pause', function () {
            _this.controlsValue.playing = false;
            _this.controlsElements.playPause.forEach(function (button) {
                var svgPath = button.querySelector('svg > path');
                if (svgPath != null) {
                    svgPath.setAttribute('d', _this.identifiersIcons.play);
                }
                else {
                    new IOError('svgPath is not exist');
                }
            });
        });
        this.elementVideo.addEventListener('play', function () {
            _this.controlsValue.playing = true;
            _this.controlsElements.playPause.forEach(function (button) {
                var svgPath = button.querySelector('svg > path');
                if (svgPath != null) {
                    svgPath.setAttribute('d', _this.identifiersIcons.pause);
                }
                else {
                    new IOError('svgPath is not exist');
                }
            });
        });
        this.elementVideo.addEventListener('click', function () {
            _this.playPauseListener();
        });
        this.controlsElements.playPause.forEach(function (button) {
            button.addEventListener('click', function () {
                _this.playPauseListener();
            });
        });
    };
    IOControllers.prototype.buildRangerProguess = function () {
        var _this = this;
        this.controlsElements.rangerProguessInput.oninput = function () {
            _this.controlsValue.proguess = parseInt(_this.controlsElements.rangerProguessInput.value, 10);
            _this.rangerProguessDivListener();
            _this.elementVideo.currentTime = (_this.controlsValue.proguess / 100) * _this.controlsValue.durationTime;
        };
    };
    IOControllers.prototype.buildFullscreen = function () {
        var _this = this;
        this.controlsElements.fullscreen.addEventListener('click', function () {
            _this.fullscreenListener();
        });
    };
    IOControllers.prototype.buildPictureInPicture = function () {
        var _this = this;
        this.controlsElements.pictureInPicture.addEventListener('click', function () {
            _this.pictureInPictureListener();
        });
    };
    IOControllers.prototype.buildVolume = function () {
        var _this = this;
        this.controlsElements.volume.addEventListener('click', function () {
            _this.volumeListener();
        });
    };
    IOControllers.prototype.buildDurationTime = function () {
        var _this = this;
        this.elementVideo.addEventListener('loadedmetadata', function () {
            var _a, _b;
            _this.controlsValue.duration = _this.formatTime((_a = _this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0);
            _this.controlsValue.durationTime = (_b = _this.elementVideo.duration) !== null && _b !== void 0 ? _b : 0;
            _this.controlsElements.durationTime.innerHTML = _this.controlsValue.current;
        });
    };
    IOControllers.prototype.buildCurrentTime = function () {
        var _this = this;
        this.elementVideo.addEventListener('timeupdate', function () {
            var _a, _b;
            _this.controlsValue.current = _this.formatTime((_a = _this.elementVideo.currentTime) !== null && _a !== void 0 ? _a : 0);
            _this.controlsValue.currentTime = (_b = _this.elementVideo.currentTime) !== null && _b !== void 0 ? _b : 0;
            _this.controlsValue.proguess = (_this.controlsValue.currentTime / _this.controlsValue.durationTime) * 100;
            _this.rangerProguessDivListener();
            _this.controlsElements.rangerProguessInput.value = _this.controlsValue.proguess.toString();
            _this.controlsElements.currentTime.innerHTML = _this.controlsValue.current;
        });
    };
    IOControllers.prototype.buildObserver = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    _this.elementVideo.currentTime = Math.max(0, Math.min(_this.controlsValue.durationTime, _this.elementVideo.currentTime - 10));
                    break;
                case ' ':
                    _this.playPauseListener();
                    break;
                case 'ArrowRight':
                    _this.elementVideo.currentTime = Math.max(0, Math.min(_this.controlsValue.durationTime, _this.elementVideo.currentTime + 10));
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowUp':
                    break;
                case 'f':
                    _this.fullscreenListener();
                    break;
                case 'p':
                    _this.pictureInPictureListener();
                    break;
                case 'm':
                    _this.volumeListener();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    var percentage = parseInt(event.key) * 10;
                    var newTime = (percentage / 100) * _this.controlsValue.durationTime;
                    _this.elementVideo.currentTime = newTime;
                    _this.controlsValue.current = _this.formatTime(newTime);
                    _this.controlsValue.currentTime = newTime;
                    break;
            }
        });
    };
    ;
    IOControllers.prototype.playPauseListener = function () {
        if (this.elementVideo.paused) {
            this.elementVideo.play();
            return;
        }
        this.elementVideo.pause();
    };
    IOControllers.prototype.fullscreenListener = function () {
        if (!this.controlsValue.fullscreen) {
            this.controlsValue.fullscreen = true;
            if (this.controlsElements.container.requestFullscreen) {
                this.controlsElements.container.requestFullscreen();
            }
            else if (this.controlsElements.container.mozRequestFullScreen) {
                this.controlsElements.container.mozRequestFullScreen();
            }
            else if (this.controlsElements.container.webkitRequestFullScreen) {
                this.controlsElements.container.webkitRequestFullScreen();
            }
            else if (this.controlsElements.container.msRequestFullscreen) {
                this.controlsElements.container.msRequestFullscreen();
            }
            this.controlsElements.fullscreen.querySelector('svg > path').setAttribute('d', this.identifiersIcons.fullscreenOn);
        }
        else {
            this.controlsValue.fullscreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.controlsElements.fullscreen.querySelector('svg > path').setAttribute('d', this.identifiersIcons.fullscreenOff);
        }
    };
    IOControllers.prototype.pictureInPictureListener = function () {
        if (this.elementVideo.requestPictureInPicture) {
            this.elementVideo.requestPictureInPicture();
        }
    };
    IOControllers.prototype.volumeListener = function () {
        if (this.elementVideo.muted || this.elementVideo.volume == 0.0) {
            this.controlsElements.volume.querySelector('svg > path').setAttribute('d', this.identifiersIcons.volumeOn);
            this.elementVideo.muted = false;
            this.elementVideo.volume = 1.0;
        }
        else {
            this.controlsElements.volume.querySelector('svg > path').setAttribute('d', this.identifiersIcons.volumeOff);
            this.elementVideo.muted = true;
            this.elementVideo.volume = 0.0;
        }
    };
    IOControllers.prototype.rangerProguessDivListener = function () {
        var progress = this.controlsValue.proguess;
        if (progress < 25) {
            this.controlsElements.rangerProguessDiv.style.width = "".concat(progress + 0.5, "%");
            return;
        }
        if (progress > 45) {
            this.controlsElements.rangerProguessDiv.style.width = "".concat(progress - 0.5, "%");
            return;
        }
        this.controlsElements.rangerProguessDiv.style.width = "".concat(progress, "%");
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
