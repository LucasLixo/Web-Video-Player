import IOError from "../class/io_error";
var Controls = (function () {
    function Controls(elementContainer, elementVideo, options, actions, iconsPath) {
        var _this = this;
        var _a;
        this.buildConfig = function () {
            _this.elementVideo.removeAttribute('controls');
            _this.elementVideo.controls = false;
            _this.elementVideo.currentTime = _this.controls.current;
        };
        this.buildPlayPause = function () {
            var buttonsPlayPause = document.querySelectorAll('button[action="' + "".concat(_this.actions.playPause) + '"]');
            if (buttonsPlayPause.length === 0) {
                new IOError("Is empty Play/Pause.");
                return;
            }
            function handlePlayPause(videoElement) {
                if (videoElement.paused) {
                    videoElement.play();
                }
                else {
                    videoElement.pause();
                }
            }
            ;
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
                handlePlayPause(_this.elementVideo);
            });
            buttonsPlayPause.forEach(function (button) {
                button.addEventListener('click', function () {
                    handlePlayPause(_this.elementVideo);
                });
            });
        };
        this.buildFullscreen = function () {
            var buttonFullscreen = document.querySelector('button[action="' + "".concat(_this.actions.fullscreen) + '"]');
            var svgFullscreen = buttonFullscreen.querySelector('svg > path');
            buttonFullscreen.addEventListener('click', function () {
                if (!_this.controls.fullscreen) {
                    _this.controls.fullscreen = true;
                    if (_this.elementContainer.requestFullscreen) {
                        _this.elementContainer.requestFullscreen();
                    }
                    else if (_this.elementContainer.mozRequestFullScreen) {
                        _this.elementContainer.mozRequestFullScreen();
                    }
                    else if (_this.elementContainer.webkitRequestFullScreen) {
                        _this.elementContainer.webkitRequestFullScreen();
                    }
                    else if (_this.elementContainer.msRequestFullscreen) {
                        _this.elementContainer.msRequestFullscreen();
                    }
                    svgFullscreen.setAttribute('d', _this.iconsPath.fullscreenOn);
                }
                else {
                    _this.controls.fullscreen = false;
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
                    svgFullscreen.setAttribute('d', _this.iconsPath.fullscreenOff);
                }
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
            var svgVolume = buttonVolume.querySelector('svg > path');
            buttonVolume.addEventListener('click', function () {
                if (_this.elementVideo.muted || _this.elementVideo.volume === 0) {
                    _this.elementVideo.muted = false;
                    _this.elementVideo.volume = 1.0;
                    svgVolume.setAttribute('d', _this.iconsPath.volumeOn);
                }
                else {
                    _this.elementVideo.muted = true;
                    _this.elementVideo.volume = 0.0;
                    svgVolume.setAttribute('d', _this.iconsPath.volumeOff);
                }
            });
        };
        this.buildRangerVolume = function () { };
        this.buildDurationTime = function () {
            var durationTime = document.querySelector('p[action="' + "".concat(_this.actions.durationTime) + '"]');
            durationTime.innerHTML = _this.controls.durationTime;
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
            var rangerProguess = document.querySelector('div[action="' + "".concat(_this.actions.rangerProguess) + '"]');
            var rangerProguessPoint = document.querySelector('div[action="' + "".concat(_this.actions.rangerProguessPoint) + '"]');
            _this.elementVideo.addEventListener('timeupdate', function () {
                var currentTime = _this.elementVideo.currentTime;
                var duration = _this.elementVideo.duration;
                var progressPercentage = (currentTime / duration) * 100;
                rangerProguess.setAttribute('style', "width: ".concat(progressPercentage, "%;"));
                rangerProguessPoint.setAttribute('style', "left: calc(".concat(progressPercentage, "% - 1%);"));
            });
        };
        this.elementContainer = elementContainer;
        this.elementVideo = elementVideo;
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
        this.buildPlayPause();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildRangerVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        this.buildRangerProguess();
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
