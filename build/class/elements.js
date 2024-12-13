import IOError from "./io_error";
import Controls from "./controls";
var Elements = (function () {
    function Elements(options, identifiers, buttons) {
        this.options = options;
        this.identifiers = identifiers;
        this.buttons = buttons;
        this.iconsPath = {
            pause: 'M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z',
            play: 'M320-200v-560l440 280-440 280Z',
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
            elementContainer.setAttribute('id', _this.identifiers.container);
            parentElement.insertBefore(elementContainer, elementVideo);
            elementContainer.appendChild(elementVideo);
            _this.buildTop(elementContainer);
            _this.buildMiddle(elementContainer);
            _this.buildBottom(elementContainer);
            try {
                new Controls(elementVideo, { buttons: _this.buttons, pathIcons: _this.iconsPath, autoplay: _this.options.autoplay, muted: _this.options.muted, });
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
        elementMiddle.innerHTML = this.buildIcon(this.iconsPath.play, '2rem');
    };
    Elements.prototype.buildBottom = function (elementContainer) {
        var elementBottom = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiers.bottom);
        elementContainer.appendChild(elementBottom);
    };
    Elements.prototype.buildIcon = function (pathIcon, size) {
        var icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"".concat(size, "\" viewBox=\"0 -960 960 960\" width=\"").concat(size, "\" id=\"").concat(this.identifiers.icons, "\">");
        icon += "<path d=\"".concat(pathIcon, "\" />");
        icon += '</svg>';
        return icon;
    };
    return Elements;
}());
export default Elements;
