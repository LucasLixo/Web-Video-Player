import IOError from "./io_error";
var IOElements = (function () {
    function IOElements(indentifersOptions, identifiersClass, identifiersId, identifiersActions, identifiersIcons, elementVideo) {
        this.elementContainter = document.createElement('div');
        this.indentifersOptions = indentifersOptions;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.identifiersActions = identifiersActions;
        this.identifiersIcons = identifiersIcons;
        this.elementVideo = elementVideo;
        this.build();
    }
    IOElements.prototype.build = function () {
        this.elementContainter.setAttribute('id', this.identifiersId.container);
        if (this.elementVideo.parentElement == null) {
            new IOError('this.elementVideo.parentElement is null');
        }
        this.elementVideo.parentElement.insertBefore(this.elementContainter, this.elementVideo);
        this.elementContainter.appendChild(this.elementVideo);
        this.buildTop();
        this.buildMiddle();
        this.buildBottom();
    };
    IOElements.prototype.buildTop = function () {
        var elementTop = document.createElement('div');
        elementTop.setAttribute('id', this.identifiersId.top);
        this.elementContainter.appendChild(elementTop);
        if (true) {
            elementTop.innerHTML = '';
        }
    };
    IOElements.prototype.buildMiddle = function () {
        var elementMiddle = document.createElement('button');
        elementMiddle.setAttribute('id', this.identifiersId.middle);
        elementMiddle.setAttribute('class', this.identifiersClass.buttons);
        elementMiddle.setAttribute('action', this.identifiersActions.playPause);
        this.elementContainter.appendChild(elementMiddle);
        elementMiddle.innerHTML = this.buildIcon(this.identifiersIcons.play);
    };
    IOElements.prototype.buildBottom = function () {
        var elementBottom = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiersId.bottom);
        this.elementContainter.appendChild(elementBottom);
        var buttonPlayPause = document.createElement('button');
        buttonPlayPause.setAttribute('class', this.identifiersClass.buttons);
        buttonPlayPause.setAttribute('action', this.identifiersActions.playPause);
        buttonPlayPause.innerHTML = this.buildIcon(this.identifiersIcons.play);
        elementBottom.appendChild(buttonPlayPause);
        var pCurrent = document.createElement('p');
        pCurrent.setAttribute('action', this.identifiersActions.currentTime);
        elementBottom.appendChild(pCurrent);
        var divRangerProguessContainer = document.createElement('div');
        divRangerProguessContainer.setAttribute('action', this.identifiersActions.rangerProguessContainer);
        elementBottom.appendChild(divRangerProguessContainer);
        var divRangerProguessInput = document.createElement('input');
        divRangerProguessInput.setAttribute('action', this.identifiersActions.rangerProguessInput);
        divRangerProguessInput.setAttribute('type', 'range');
        divRangerProguessInput.setAttribute('value', '0');
        divRangerProguessInput.setAttribute('min', '0');
        divRangerProguessInput.setAttribute('max', '100');
        divRangerProguessContainer.appendChild(divRangerProguessInput);
        var divRangerProguessDiv = document.createElement('div');
        divRangerProguessDiv.setAttribute('action', this.identifiersActions.rangerProguessDiv);
        divRangerProguessContainer.appendChild(divRangerProguessDiv);
        var pDuration = document.createElement('p');
        pDuration.setAttribute('action', this.identifiersActions.durationTime);
        elementBottom.appendChild(pDuration);
        var buttonVolume = document.createElement('button');
        buttonVolume.setAttribute('class', this.identifiersClass.buttons);
        buttonVolume.setAttribute('action', this.identifiersActions.volume);
        buttonVolume.innerHTML = this.buildIcon(this.identifiersIcons.volumeOn);
        elementBottom.appendChild(buttonVolume);
        var buttonPictureInPicture = document.createElement('button');
        buttonPictureInPicture.setAttribute('class', this.identifiersClass.buttons);
        buttonPictureInPicture.setAttribute('action', this.identifiersActions.pictureInPicture);
        buttonPictureInPicture.innerHTML = this.buildIcon(this.identifiersIcons.pictureInPicture);
        elementBottom.appendChild(buttonPictureInPicture);
        var buttonFullscreen = document.createElement('button');
        buttonFullscreen.setAttribute('class', this.identifiersClass.buttons);
        buttonFullscreen.setAttribute('action', this.identifiersActions.fullscreen);
        buttonFullscreen.innerHTML = this.buildIcon(this.identifiersIcons.fullscreenOff);
        elementBottom.appendChild(buttonFullscreen);
    };
    IOElements.prototype.buildIcon = function (pathIcon) {
        return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" class=\"".concat(this.identifiersClass.icons, "\"><path d=\"").concat(pathIcon, "\" /></svg>");
    };
    return IOElements;
}());
export default IOElements;
