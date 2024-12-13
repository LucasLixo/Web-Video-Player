var Controls = (function () {
    function Controls(elementVideo, options) {
        this.elementVideo = elementVideo;
        this.buttons = options.buttons;
        this.pathIcons = options.pathIcons;
        this.constrols = {
            isPlaying: options.autoplay,
            volume: options.muted ? 0 : 70,
        };
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.addEventListener('loadedmetadata', function () {
            elementVideo.controls = false;
        });
        console.log('this.togglePlayPause();');
        this.togglePlayPause();
    }
    Controls.prototype.togglePlayPause = function () {
        var _this = this;
        var buttonPlayPause = document.querySelector('button[key="' + "".concat(this.buttons.playPause) + '"]');
        var svgPlayPause = buttonPlayPause.querySelector('svg > path');
        var thisEvent = function (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
                _this.constrols.isPlaying = true;
                svgPlayPause.setAttribute('d', _this.pathIcons.pause);
            }
            else {
                videoElement.pause();
                _this.constrols.isPlaying = false;
                svgPlayPause.setAttribute('d', _this.pathIcons.play);
            }
        };
        this.elementVideo.addEventListener('click', function (event) {
            thisEvent(_this.elementVideo);
        });
        buttonPlayPause.addEventListener('click', function (event) {
            thisEvent(_this.elementVideo);
        });
    };
    return Controls;
}());
export default Controls;
