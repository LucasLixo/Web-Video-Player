var Controls = (function () {
    function Controls(elementVideo, index, buttons) {
        this.elementVideo = elementVideo;
        this.buttons = buttons;
        elementVideo.removeAttribute('controls');
        elementVideo.addEventListener('loadedmetadata', function () {
            elementVideo.controls = false;
        });
        this.buttons.playPause.addEventListener('click', this.togglePlayPause);
        console.log('init');
    }
    Controls.prototype.togglePlayPause = function () {
        if (this.elementVideo.paused) {
            this.elementVideo.play();
        }
        else {
            this.elementVideo.pause();
        }
        console.log('togglePlayPause');
    };
    return Controls;
}());
export default Controls;
