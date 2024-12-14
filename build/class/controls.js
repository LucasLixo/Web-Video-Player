import IOError from "../class/io_error";
var Controls = (function () {
    function Controls(elementContainer, elementVideo, identifiersId, identifiersClass, options, actions, iconsPath) {
        var _this = this;
        var _a;
        this.buildConfig = function () {
            _this.elementVideo.removeAttribute('controls');
            _this.elementVideo.controls = false;
            _this.elementVideo.currentTime = _this.controls.current;
            _this.elementVideo.setAttribute('playsinline', '');
            _this.elementVideo.setAttribute('controlslist', 'nodownload noremoteplayback');
            _this.elementVideo.addEventListener('contextmenu', function (event) {
                event.preventDefault();
            });
            if (_this.controls.playing) {
                _this.elementVideo.setAttribute('autoplay', '');
            }
            else {
                _this.elementVideo.removeAttribute('autoplay');
            }
            if (!_this.controls.volume) {
                _this.elementVideo.setAttribute('muted', '');
            }
            else {
                _this.elementVideo.removeAttribute('muted');
            }
            _this.elementVideo.onloadedmetadata = function () {
                var _a;
                _this.controls.durationTime = _this.formatTime((_a = _this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0);
                _this.controls.duration = _this.elementVideo.duration;
            };
        };
        this.buildFading = function () {
            var allContainers = [
                document.getElementById(_this.identifiersId.top),
                document.getElementById(_this.identifiersId.middle),
                document.getElementById(_this.identifiersId.bottom),
            ];
            var hideTimeout = null;
            var hideControls = function () {
                if (!_this.elementVideo.paused) {
                    allContainers.forEach(function (container) {
                        container.classList.add(_this.identifiersClass.fading);
                        _this.elementContainer.classList.add(_this.identifiersClass.cursorHide);
                    });
                }
            };
            var showControls = function () {
                allContainers.forEach(function (container) {
                    container.classList.remove(_this.identifiersClass.fading);
                    _this.elementContainer.classList.remove(_this.identifiersClass.cursorHide);
                });
                if (hideTimeout)
                    clearTimeout(hideTimeout);
                hideTimeout = setTimeout(hideControls, 2500);
            };
            _this.elementContainer.addEventListener('mousemove', function () {
                showControls();
            });
            showControls();
        };
        this.buildPlayPause = function () {
            var buttonsPlayPause = document.querySelectorAll('button[action="' + "".concat(_this.actions.playPause) + '"]');
            if (buttonsPlayPause.length === 0) {
                new IOError("Is empty Play/Pause.");
                return;
            }
            _this.elementVideo.addEventListener('pause', function () {
                _this.controls.playing = false;
                buttonsPlayPause.forEach(function (button) {
                    var svgPath = button.querySelector('svg > path');
                    if (svgPath) {
                        svgPath.setAttribute('d', _this.iconsPath.play);
                    }
                });
            });
            _this.elementVideo.addEventListener('play', function () {
                _this.controls.playing = true;
                buttonsPlayPause.forEach(function (button) {
                    var svgPath = button.querySelector('svg > path');
                    if (svgPath) {
                        svgPath.setAttribute('d', _this.iconsPath.pause);
                    }
                });
            });
            _this.elementVideo.addEventListener('click', function () {
                _this.playPauseListener();
            });
            buttonsPlayPause.forEach(function (button) {
                button.addEventListener('click', function () {
                    _this.playPauseListener();
                });
            });
        };
        this.buildFullscreen = function () {
            var buttonFullscreen = document.querySelector('button[action="' + "".concat(_this.actions.fullscreen) + '"]');
            buttonFullscreen.addEventListener('click', function () {
                _this.fullscreenListener();
            });
        };
        this.buildPictureInPicture = function () {
            var buttonPictureInPicture = document.querySelector('button[action="' + "".concat(_this.actions.pictureInPicture) + '"]');
            buttonPictureInPicture.addEventListener('click', function () {
                if (_this.elementVideo.requestPictureInPicture) {
                    _this.elementVideo.requestPictureInPicture();
                }
            });
        };
        this.buildVolume = function () {
            var buttonVolume = document.querySelector('button[action="' + "".concat(_this.actions.volume) + '"]');
            buttonVolume.addEventListener('click', function () {
                _this.volumeListener();
            });
        };
        this.buildRangerVolume = function () { };
        this.buildDurationTime = function () {
            var durationTime = document.querySelector('p[action="' + "".concat(_this.actions.durationTime) + '"]');
            _this.elementVideo.addEventListener('loadeddata', function () {
                var _a, _b;
                _this.controls.durationTime = _this.formatTime((_a = _this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0);
                _this.controls.duration = (_b = _this.elementVideo.duration) !== null && _b !== void 0 ? _b : 0;
                durationTime.innerHTML = _this.controls.durationTime;
            });
        };
        this.buildCurrentTime = function () {
            var currentTime = document.querySelector('p[action="' + "".concat(_this.actions.currentTime) + '"]');
            _this.elementVideo.addEventListener('timeupdate', function () {
                var _a, _b;
                _this.controls.currentTime = _this.formatTime((_a = _this.elementVideo.currentTime) !== null && _a !== void 0 ? _a : 0);
                _this.controls.current = (_b = _this.elementVideo.currentTime) !== null && _b !== void 0 ? _b : 0;
                currentTime.innerHTML = _this.controls.currentTime;
            });
        };
        this.buildRangerProguess = function () {
            var rangerProguessContainer = document.getElementById(_this.actions.rangerProguessContainer);
            var rangerProguess = document.getElementById(_this.actions.rangerProguess);
            var rangerProguessPoint = document.getElementById(_this.actions.rangerProguessPoint);
            _this.elementVideo.addEventListener('timeupdate', function () {
                var currentTime = _this.elementVideo.currentTime;
                var duration = _this.elementVideo.duration;
                var progressPercentage = (currentTime / duration) * 100;
                rangerProguess.setAttribute('style', "width: ".concat(progressPercentage, "%;"));
                rangerProguessPoint.setAttribute('style', "left: calc(".concat(progressPercentage, "% - 1%);"));
            });
            rangerProguessContainer.addEventListener('click', function (event) {
                var rect = rangerProguessContainer.getBoundingClientRect();
                var clickX = event.clientX - rect.left;
                var width = rect.width;
                var percentage = (clickX / width) * 100;
                var newTime = (_this.controls.duration * percentage) / 100;
                _this.elementVideo.currentTime = newTime;
                _this.controls.currentTime = _this.formatTime(newTime);
                _this.controls.current = newTime;
            });
        };
        this.buildObserver = function () {
            document.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case 'ArrowLeft':
                        _this.elementVideo.currentTime = Math.max(0, Math.min(_this.elementVideo.duration, _this.elementVideo.currentTime - 10));
                        break;
                    case ' ':
                        _this.playPauseListener();
                        break;
                    case 'ArrowRight':
                        _this.elementVideo.currentTime = Math.max(0, Math.min(_this.elementVideo.duration, _this.elementVideo.currentTime + 10));
                        break;
                    case 'ArrowDown':
                        break;
                    case 'ArrowUp':
                        break;
                    case 'f':
                        _this.fullscreenListener();
                        break;
                    case 'p':
                        if (_this.elementVideo.requestPictureInPicture) {
                            _this.elementVideo.requestPictureInPicture();
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
                        _this.elementVideo.currentTime = newTime;
                        _this.controls.currentTime = _this.formatTime(newTime);
                        _this.controls.current = newTime;
                        break;
                }
            });
        };
        this.elementContainer = elementContainer;
        this.elementVideo = elementVideo;
        this.identifiersId = identifiersId;
        this.identifiersClass = identifiersClass;
        this.actions = actions;
        this.iconsPath = iconsPath;
        this.controls = {
            playing: options.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.muted,
            rangerVolume: options.muted ? 0.0 : 1.0,
            durationTime: this.formatTime((_a = this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0),
            currentTime: this.formatTime(0),
            duration: this.elementVideo.duration,
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
        if (this.elementVideo.paused) {
            this.elementVideo.play();
        }
        else {
            this.elementVideo.pause();
        }
    };
    ;
    Controls.prototype.volumeListener = function () {
        var buttonVolume = document.querySelector('button[action="' + "".concat(this.actions.volume) + '"]');
        var svgVolume = buttonVolume.querySelector('svg > path');
        if (this.elementVideo.muted || this.elementVideo.volume === 0) {
            svgVolume.setAttribute('d', this.iconsPath.volumeOn);
            this.elementVideo.muted = false;
            this.elementVideo.volume = 1.0;
        }
        else {
            svgVolume.setAttribute('d', this.iconsPath.volumeOff);
            this.elementVideo.muted = true;
            this.elementVideo.volume = 0.0;
        }
    };
    Controls.prototype.fullscreenListener = function () {
        var buttonFullscreen = document.querySelector('button[action="' + "".concat(this.actions.fullscreen) + '"]');
        var svgFullscreen = buttonFullscreen.querySelector('svg > path');
        if (!this.controls.fullscreen) {
            this.controls.fullscreen = true;
            if (this.elementContainer.requestFullscreen) {
                this.elementContainer.requestFullscreen();
            }
            else if (this.elementContainer.mozRequestFullScreen) {
                this.elementContainer.mozRequestFullScreen();
            }
            else if (this.elementContainer.webkitRequestFullScreen) {
                this.elementContainer.webkitRequestFullScreen();
            }
            else if (this.elementContainer.msRequestFullscreen) {
                this.elementContainer.msRequestFullscreen();
            }
            svgFullscreen.setAttribute('d', this.iconsPath.fullscreenOn);
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
            svgFullscreen.setAttribute('d', this.iconsPath.fullscreenOff);
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
