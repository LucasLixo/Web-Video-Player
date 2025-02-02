import IOError from "../class/io_error";
var Controls = (function () {
    function Controls(elementContainer, elementVideo, identifiersId, identifiersClass, options, actions, iconsPath) {
        var _this = this;
        var _a;
        this.buildConfig = function () {
            _this.myElements.video.removeAttribute('controls');
            _this.myElements.video.controls = false;
            _this.myElements.video.currentTime = _this.controls.current;
            _this.myElements.video.setAttribute('playsinline', '');
            _this.myElements.video.setAttribute('preload', 'auto');
            _this.myElements.video.setAttribute('controlslist', 'nodownload noremoteplayback');
            _this.myElements.video.addEventListener('contextmenu', function (event) {
                event.preventDefault();
            });
            if (_this.controls.playing) {
                _this.myElements.video.setAttribute('autoplay', '');
            }
            else {
                _this.myElements.video.removeAttribute('autoplay');
            }
            if (!_this.controls.volume) {
                _this.myElements.video.setAttribute('muted', '');
            }
            else {
                _this.myElements.video.removeAttribute('muted');
            }
            _this.myElements.video.onloadedmetadata = function () {
                var _a;
                _this.controls.durationTime = _this.formatTime((_a = _this.myElements.video.duration) !== null && _a !== void 0 ? _a : 0);
                _this.controls.duration = _this.myElements.video.duration;
            };
        };
        this.buildFading = function () {
            var allContainers = [
                _this.myElements.id.top,
                _this.myElements.id.middle,
                _this.myElements.id.bottom,
            ];
            var hideTimeout = null;
            var hideControls = function () {
                if (!_this.myElements.video.paused) {
                    allContainers.forEach(function (container) {
                        container.classList.add(_this.identifiersClass.fading);
                        _this.myElements.id.container.classList.add(_this.identifiersClass.cursorHide);
                    });
                }
            };
            var showControls = function () {
                allContainers.forEach(function (container) {
                    container.classList.remove(_this.identifiersClass.fading);
                    _this.myElements.id.container.classList.remove(_this.identifiersClass.cursorHide);
                });
                if (hideTimeout)
                    clearTimeout(hideTimeout);
                hideTimeout = setTimeout(hideControls, 2500);
            };
            _this.myElements.id.container.addEventListener('mouseleave', function () {
                hideControls();
            });
            _this.myElements.id.container.addEventListener('mousemove', function () {
                showControls();
            });
            showControls();
        };
        this.buildPlayPause = function () {
            if (_this.myElements.actions.playPause.length === 0) {
                new IOError("Is empty Play/Pause.");
                return;
            }
            _this.myElements.video.addEventListener('pause', function () {
                _this.controls.playing = false;
                _this.myElements.actions.playPause.forEach(function (button) {
                    var svgPath = button.querySelector('svg > path');
                    if (svgPath) {
                        svgPath.setAttribute('d', _this.iconsPath.play);
                    }
                });
            });
            _this.myElements.video.addEventListener('play', function () {
                _this.controls.playing = true;
                _this.myElements.actions.playPause.forEach(function (button) {
                    var svgPath = button.querySelector('svg > path');
                    if (svgPath) {
                        svgPath.setAttribute('d', _this.iconsPath.pause);
                    }
                });
            });
            _this.myElements.video.addEventListener('click', function () {
                _this.playPauseListener();
            });
            _this.myElements.actions.playPause.forEach(function (button) {
                button.addEventListener('click', function () {
                    _this.playPauseListener();
                });
            });
        };
        this.buildFullscreen = function () {
            _this.myElements.actions.fullscreen.addEventListener('click', function () {
                _this.fullscreenListener();
            });
        };
        this.buildPictureInPicture = function () {
            _this.myElements.actions.pictureInPicture.addEventListener('click', function () {
                if (_this.myElements.video.requestPictureInPicture) {
                    _this.myElements.video.requestPictureInPicture();
                }
            });
        };
        this.buildVolume = function () {
            _this.myElements.actions.volume.addEventListener('click', function () {
                _this.volumeListener();
            });
        };
        this.buildRangerVolume = function () { };
        this.buildDurationTime = function () {
            _this.myElements.video.addEventListener('loadeddata', function () {
                var _a, _b;
                _this.controls.durationTime = _this.formatTime((_a = _this.myElements.video.duration) !== null && _a !== void 0 ? _a : 0);
                _this.controls.duration = (_b = _this.myElements.video.duration) !== null && _b !== void 0 ? _b : 0;
                _this.myElements.actions.durationTime.innerHTML = _this.controls.durationTime;
            });
        };
        this.buildCurrentTime = function () {
            _this.myElements.video.addEventListener('timeupdate', function () {
                var _a, _b;
                _this.controls.currentTime = _this.formatTime((_a = _this.myElements.video.currentTime) !== null && _a !== void 0 ? _a : 0);
                _this.controls.current = (_b = _this.myElements.video.currentTime) !== null && _b !== void 0 ? _b : 0;
                _this.proguess = (_this.controls.current / _this.controls.duration) * 100;
                _this.rangerProguessProguessListener();
                _this.myElements.actions.rangerProguessInput.value = _this.proguess.toString();
                _this.myElements.actions.currentTime.innerHTML = _this.controls.currentTime;
            });
        };
        this.buildRangerProguess = function () {
            _this.myElements.actions.rangerProguessInput.oninput = function () {
                _this.proguess = parseInt(_this.myElements.actions.rangerProguessInput.value, 10);
                _this.rangerProguessProguessListener();
                _this.myElements.video.currentTime = (_this.proguess / 100) * _this.controls.duration;
            };
        };
        this.buildObserver = function () {
            document.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case 'ArrowLeft':
                        _this.myElements.video.currentTime = Math.max(0, Math.min(_this.controls.duration, _this.myElements.video.currentTime - 10));
                        break;
                    case ' ':
                        _this.playPauseListener();
                        break;
                    case 'ArrowRight':
                        _this.myElements.video.currentTime = Math.max(0, Math.min(_this.controls.duration, _this.myElements.video.currentTime + 10));
                        break;
                    case 'ArrowDown':
                        break;
                    case 'ArrowUp':
                        break;
                    case 'f':
                        _this.fullscreenListener();
                        break;
                    case 'p':
                        if (_this.myElements.video.requestPictureInPicture) {
                            _this.myElements.video.requestPictureInPicture();
                        }
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
                        var newTime = (percentage / 100) * _this.controls.duration;
                        _this.myElements.video.currentTime = newTime;
                        _this.controls.currentTime = _this.formatTime(newTime);
                        _this.controls.current = newTime;
                        break;
                }
            });
        };
        this.myElements = {
            video: elementVideo,
            id: {
                container: elementContainer,
                top: document.getElementById(identifiersId.top),
                middle: document.getElementById(identifiersId.middle),
                bottom: document.getElementById(identifiersId.bottom),
            },
            actions: {
                playPause: document.querySelectorAll('button[action="' + "".concat(actions.playPause) + '"]'),
                fullscreen: document.querySelector('button[action="' + "".concat(actions.fullscreen) + '"]'),
                pictureInPicture: document.querySelector('button[action="' + "".concat(actions.pictureInPicture) + '"]'),
                volume: document.querySelector('button[action="' + "".concat(actions.volume) + '"]'),
                rangerVolumeContainer: document.getElementById(actions.rangerVolumeContainer),
                rangerVolumeInput: document.getElementById(actions.rangerVolumeInput),
                rangerVolumeProguess: document.getElementById(actions.rangerVolumeProguess),
                durationTime: document.querySelector('p[action="' + "".concat(actions.durationTime) + '"]'),
                currentTime: document.querySelector('p[action="' + "".concat(actions.currentTime) + '"]'),
                rangerProguessContainer: document.getElementById(actions.rangerProguessContainer),
                rangerProguessInput: document.getElementById(actions.rangerProguessInput),
                rangerProguessProguess: document.getElementById(actions.rangerProguessProguess),
            },
            svg: {
                fullscreen: null,
                playPause: null,
                pictureInPicture: null,
                volume: null,
            },
        };
        this.myElements.svg = {
            fullscreen: this.myElements.actions.fullscreen.querySelector('svg > path'),
            playPause: null,
            pictureInPicture: null,
            volume: this.myElements.actions.volume.querySelector('svg > path'),
        };
        this.proguess = 0;
        this.identifiersClass = identifiersClass;
        this.iconsPath = iconsPath;
        this.controls = {
            playing: options.settings.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.settings.muted,
            rangerVolume: options.settings.muted ? 0.0 : 1.0,
            durationTime: this.formatTime((_a = this.myElements.video.duration) !== null && _a !== void 0 ? _a : 0),
            currentTime: this.formatTime(0),
            duration: this.myElements.video.duration,
            current: 0,
        };
        this.build();
    }
    Controls.prototype.build = function () {
        this.buildConfig();
        this.buildFading();
        this.buildPlayPause();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildRangerVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        this.buildRangerProguess();
        this.buildObserver();
    };
    Controls.prototype.playPauseListener = function () {
        if (this.myElements.video.paused) {
            this.myElements.video.play();
        }
        else {
            this.myElements.video.pause();
        }
    };
    Controls.prototype.rangerProguessProguessListener = function () {
        if (this.proguess < 25) {
            this.myElements.actions.rangerProguessProguess.setAttribute('style', "width: ".concat(this.proguess + 0.5, "%;"));
            return;
        }
        if (this.proguess > 45) {
            this.myElements.actions.rangerProguessProguess.setAttribute('style', "width: ".concat(this.proguess - 0.5, "%;"));
            return;
        }
        this.myElements.actions.rangerProguessProguess.setAttribute('style', "width: ".concat(this.proguess, "%;"));
    };
    Controls.prototype.volumeListener = function () {
        if (this.myElements.video.muted || this.myElements.video.volume === 0) {
            this.myElements.svg.volume.setAttribute('d', this.iconsPath.volumeOn);
            this.myElements.video.muted = false;
            this.myElements.video.volume = 1.0;
        }
        else {
            this.myElements.svg.volume.setAttribute('d', this.iconsPath.volumeOff);
            this.myElements.video.muted = true;
            this.myElements.video.volume = 0.0;
        }
    };
    Controls.prototype.fullscreenListener = function () {
        if (!this.controls.fullscreen) {
            this.controls.fullscreen = true;
            if (this.myElements.id.container.requestFullscreen) {
                this.myElements.id.container.requestFullscreen();
            }
            else if (this.myElements.id.container.mozRequestFullScreen) {
                this.myElements.id.container.mozRequestFullScreen();
            }
            else if (this.myElements.id.container.webkitRequestFullScreen) {
                this.myElements.id.container.webkitRequestFullScreen();
            }
            else if (this.myElements.id.container.msRequestFullscreen) {
                this.myElements.id.container.msRequestFullscreen();
            }
            this.myElements.svg.fullscreen.setAttribute('d', this.iconsPath.fullscreenOn);
        }
        else {
            this.controls.fullscreen = false;
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
            this.myElements.svg.fullscreen.setAttribute('d', this.iconsPath.fullscreenOff);
        }
    };
    Controls.prototype.formatTime = function (seconds) {
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
    return Controls;
}());
export default Controls;
