import IOError from "./io_error";
var IOElements = (function () {
    function IOElements(options, identifiersClass, identifiersId, tagVideo) {
        this.iconsPath = {
            fullscreenOn: 'M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z',
            fullscreenOff: 'M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z',
            pause: 'M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z',
            play: 'M320-200v-560l440 280-440 280Z',
            pictureInPicture: 'M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z',
            volumeOn: 'M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z',
            volumeOff: 'M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z',
        };
        this.options = options;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.tagVideo = tagVideo;
        this.tagContainter = document.createElement('div');
        this.build();
    }
    IOElements.prototype.build = function () {
        this.tagContainter.setAttribute('id', this.identifiersId.container);
        if (this.tagVideo.parentElement == null) {
            new IOError('this.tagVideo.parentElement is null');
        }
        this.tagVideo.parentElement.insertBefore(this.tagContainter, this.tagVideo);
        this.tagContainter.appendChild(this.tagVideo);
    };
    IOElements.prototype.name = function () {
    };
    return IOElements;
}());
export default IOElements;
