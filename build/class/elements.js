import IOError from "./io_error";
import Controls from "./controls";
var Elements = (function () {
    function Elements(options, identifiers, buttons) {
        this.options = options;
        this.identifiers = identifiers;
        this.buttons = buttons;
        this.iconsPath = {
            fullscreenOn: 'M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z',
            fullscreenOff: 'M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z',
            pause: 'M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z',
            play: 'M320-200v-560l440 280-440 280Z',
            pictureInPicture: 'M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z',
            volumeOn: 'M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z',
            volumeOff: 'M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z',
        };
    }
    Elements.prototype.build = function () {
        var _this = this;
        var elementVideos = document.querySelectorAll(this.options.apply);
        if (elementVideos.length === 0) {
            return;
        }
        elementVideos.forEach(function (elementVideo) {
            var elementContainer = document.createElement('div');
            var parentElement = elementVideo.parentElement;
            if (parentElement == null) {
                new IOError("Error parentElement is null");
            }
            elementVideo.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
            elementContainer.setAttribute('id', _this.identifiers.container);
            parentElement.insertBefore(elementContainer, elementVideo);
            elementContainer.appendChild(elementVideo);
            _this.buildTop(elementContainer);
            _this.buildMiddle(elementContainer);
            _this.buildBottom(elementContainer);
            try {
                new Controls(elementContainer, elementVideo, { buttons: _this.buttons, pathIcons: _this.iconsPath, autoplay: _this.options.autoplay, muted: _this.options.muted, });
            }
            catch (error) {
                new IOError("Error build Controls: ".concat(error));
            }
        });
    };
    Elements.prototype.buildTop = function (elementContainer) {
        var elementTop = document.createElement('div');
        elementTop.setAttribute('id', this.identifiers.top);
        elementContainer.appendChild(elementTop);
        if (this.options.top != null) {
            elementTop.innerHTML = this.options.top;
        }
    };
    Elements.prototype.buildMiddle = function (elementContainer) {
        var elementMiddle = document.createElement('button');
        elementMiddle.setAttribute('id', this.identifiers.middle);
        elementMiddle.setAttribute('class', this.identifiers.buttons);
        elementMiddle.setAttribute('key', this.buttons.playPause);
        elementContainer.appendChild(elementMiddle);
        elementMiddle.innerHTML = this.buildIcon(this.iconsPath.play);
    };
    Elements.prototype.buildBottom = function (elementContainer) {
        var elementBottom = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiers.bottom);
        elementContainer.appendChild(elementBottom);
        var buttonPlayPause = document.createElement('button');
        buttonPlayPause.setAttribute('class', this.identifiers.buttons);
        buttonPlayPause.setAttribute('key', this.buttons.playPause);
        buttonPlayPause.innerHTML = this.buildIcon(this.iconsPath.play);
        elementBottom.appendChild(buttonPlayPause);
        var divRangerVolume = document.createElement('div');
        divRangerVolume.setAttribute('id', this.identifiers.rangerVolume);
        elementBottom.appendChild(divRangerVolume);
        var divRangerProguess = document.createElement('div');
        divRangerProguess.setAttribute('id', this.identifiers.rangerProguess);
        divRangerProguess.setAttribute('key', this.buttons.rangerProguess);
        divRangerVolume.appendChild(divRangerProguess);
        var divRangerProguessPoint = document.createElement('div');
        divRangerProguessPoint.setAttribute('id', this.identifiers.rangerProguessPoint);
        divRangerProguessPoint.setAttribute('key', this.buttons.rangerProguessPoint);
        divRangerVolume.appendChild(divRangerProguessPoint);
        var buttonDuration = document.createElement('p');
        buttonDuration.setAttribute('class', this.identifiers.duration);
        buttonDuration.setAttribute('key', this.buttons.duration);
        elementBottom.appendChild(buttonDuration);
        var buttonVolume = document.createElement('button');
        buttonVolume.setAttribute('class', this.identifiers.buttons);
        buttonVolume.setAttribute('key', this.buttons.volume);
        buttonVolume.innerHTML = this.buildIcon(this.iconsPath.volumeOn);
        elementBottom.appendChild(buttonVolume);
        var buttonPictureInPicture = document.createElement('button');
        buttonPictureInPicture.setAttribute('class', this.identifiers.buttons);
        buttonPictureInPicture.setAttribute('key', this.buttons.pictureInPicture);
        buttonPictureInPicture.innerHTML = this.buildIcon(this.iconsPath.pictureInPicture);
        elementBottom.appendChild(buttonPictureInPicture);
        var buttonFullscreen = document.createElement('button');
        buttonFullscreen.setAttribute('class', this.identifiers.buttons);
        buttonFullscreen.setAttribute('key', this.buttons.fullscreen);
        buttonFullscreen.innerHTML = this.buildIcon(this.iconsPath.fullscreenOff);
        elementBottom.appendChild(buttonFullscreen);
    };
    Elements.prototype.buildIcon = function (pathIcon) {
        var icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" id=\"".concat(this.identifiers.icons, "\">");
        icon += "<path d=\"".concat(pathIcon, "\" />");
        icon += '</svg>';
        return icon;
    };
    return Elements;
}());
export default Elements;
