var Elements = (function () {
    function Elements(options, identifiers) {
        this.options = options;
        this.identifiers = identifiers;
        this.init();
    }
    Elements.prototype.init = function () {
        var _this = this;
        var elementVideos = document.querySelectorAll(this.options.apply);
        if (elementVideos.length === 0) {
            return;
        }
        elementVideos.forEach(function (elementVideo) {
            elementVideo.removeAttribute('controls');
            elementVideo.addEventListener('loadedmetadata', function () {
                elementVideo.controls = false;
            });
            var elementContainer = document.createElement('div');
            var parentElement = elementVideo.parentElement;
            if (parentElement) {
                elementContainer.setAttribute('id', _this.identifiers.container);
                parentElement.insertBefore(elementContainer, elementVideo);
                elementContainer.appendChild(elementVideo);
                _this.buildButtonsTop(elementContainer);
                _this.buildButtonsMiddle(elementContainer);
                _this.buildButtonsBottom(elementContainer);
            }
        });
    };
    Elements.prototype.buildButtonsTop = function (elementContainer) {
        var elementTop = document.createElement('div');
        elementTop.setAttribute('id', this.identifiers.buttonsTop);
        elementContainer.appendChild(elementTop);
    };
    Elements.prototype.buildButtonsMiddle = function (elementContainer) {
        var elementMiddle = document.createElement('div');
        elementMiddle.setAttribute('id', this.identifiers.buttonsMiddle);
        elementContainer.appendChild(elementMiddle);
    };
    Elements.prototype.buildButtonsBottom = function (elementContainer) {
        var elementBottom = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiers.buttonsBottom);
        elementContainer.appendChild(elementBottom);
    };
    return Elements;
}());
export default Elements;
