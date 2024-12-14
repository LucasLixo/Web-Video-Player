import IOError from "./io_error";
var Controls = (function () {
    function Controls(elementContainer, elementVideo, options) {
        this.formatTime = function (seconds) {
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
        this.elementContainer = elementContainer;
        this.elementVideo = elementVideo;
        this.buttons = options.buttons;
        this.pathIcons = options.pathIcons;
        this.controls = {
            playing: options.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.muted,
            rangerVolume: options.muted ? 0.0 : 1.0,
            rangerProguess: 0,
            duration: this.formatTime(0),
            currentTime: 0,
        };
        this.elementVideo.removeAttribute('controls');
        elementVideo.controls = false;
        this.controls.duration = this.formatTime(this.elementVideo.duration);
        this.elementVideo.currentTime = this.controls.currentTime;
        this.togglePlayPause();
        this.duration();
        this.rangerVolume();
        this.toggleVolume();
        this.pictureInPicture();
        this.fullscreen();
    }
    Controls.prototype.togglePlayPause = function () {
        var _this = this;
        var buttonsPlayPause = document.querySelectorAll('button[key="' + "".concat(this.buttons.playPause) + '"]');
        if (buttonsPlayPause.length === 0) {
            new IOError("Is empty Play/Pause.");
            return;
        }
        var handlePlayPause = function (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
            }
            else {
                videoElement.pause();
            }
        };
        this.elementVideo.addEventListener('pause', function () {
            _this.controls.playing = false;
            buttonsPlayPause.forEach(function (button) {
                var svgPath = button.querySelector('svg > path');
                if (svgPath) {
                    svgPath.setAttribute('d', _this.pathIcons.play);
                }
            });
        });
        this.elementVideo.addEventListener('play', function () {
            _this.controls.playing = true;
            buttonsPlayPause.forEach(function (button) {
                var svgPath = button.querySelector('svg > path');
                if (svgPath) {
                    svgPath.setAttribute('d', _this.pathIcons.pause);
                }
            });
        });
        this.elementVideo.addEventListener('click', function () {
            handlePlayPause(_this.elementVideo);
        });
        buttonsPlayPause.forEach(function (button) {
            button.addEventListener('click', function () {
                handlePlayPause(_this.elementVideo);
            });
        });
    };
    Controls.prototype.duration = function () {
        var pDuration = document.querySelector('p[key="' + "".concat(this.buttons.duration) + '"]');
        pDuration.innerHTML = this.controls.duration;
    };
    Controls.prototype.rangerVolume = function () {
        var _this = this;
        var rangerProguess = document.querySelector('div[key="' + "".concat(this.buttons.volume) + '"]');
        var rangerProguessPoint = document.querySelector('div[key="' + "".concat(this.buttons.volume) + '"]');
        this.elementVideo.addEventListener('timeupdate', function () {
            var currentTime = _this.elementVideo.currentTime;
            var duration = _this.elementVideo.duration;
            var progressPercentage = (currentTime / duration) * 100;
            rangerProguess.setAttribute('style', "width: ".concat(progressPercentage, "%;"));
            rangerProguessPoint.setAttribute('style', "left: calc(".concat(progressPercentage, "% - 1%);"));
            _this.controls.currentTime = currentTime;
            _this.controls.rangerProguess = progressPercentage;
        });
    };
    Controls.prototype.toggleVolume = function () {
        var _this = this;
        var buttonVolume = document.querySelector('button[key="' + "".concat(this.buttons.volume) + '"]');
        var svgVolume = buttonVolume.querySelector('svg > path');
        buttonVolume.addEventListener('click', function () {
            if (_this.elementVideo.muted || _this.elementVideo.volume === 0) {
                _this.elementVideo.muted = false;
                _this.elementVideo.volume = 1.0;
                svgVolume.setAttribute('d', _this.pathIcons.volumeOn);
            }
            else {
                _this.elementVideo.muted = true;
                _this.elementVideo.volume = 0.0;
                svgVolume.setAttribute('d', _this.pathIcons.volumeOff);
            }
        });
    };
    Controls.prototype.pictureInPicture = function () {
        var _this = this;
        var buttonPictureInPicture = document.querySelector('button[key="' + "".concat(this.buttons.pictureInPicture) + '"]');
        buttonPictureInPicture.addEventListener('click', function () {
            if (_this.elementVideo.requestPictureInPicture) {
                _this.elementVideo.requestPictureInPicture();
            }
        });
    };
    Controls.prototype.fullscreen = function () {
        var _this = this;
        var buttonFullscreen = document.querySelector('button[key="' + "".concat(this.buttons.fullscreen) + '"]');
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
                svgFullscreen.setAttribute('d', _this.pathIcons.fullscreenOn);
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
                svgFullscreen.setAttribute('d', _this.pathIcons.fullscreenOff);
            }
        });
    };
    return Controls;
}());
export default Controls;
