const AspectRatio01 = ['4:3', '1024:768', 'SD'];
const AspectRatio02 = ['16:9', '1280:720', 'HD'];
const AspectRatio03 = ['3:2', '1080:720', 'HD'];
const AspectRatio04 = ['5:4', '1350:1080', 'HD'];
const AspectRatio05 = ['7:5', '2100:1200', 'QHD'];
const AspectRatio06 = ['0:0', 100, 'Undefine'];
const NameVideo = 'Web-Video-Player';
const TagVideo = '#' + NameVideo;
const Hash = [
    'vPPxgeodnPE5',
    'O6vLffQMusav',
    '8KK6hIv0iLX1',
    'ujp6BG4tAOTA',
    'jHnt65EQdHWX',
    'utwzm8x573k3',
    'H3JnVc6eqVuo',
    '9yBZ5xN1ncZb',
    'TWeRhDPrh7C6',
    'L0LnKkIKjuvv',
    'HU915IjaEeSG',
    'bfJ7uqIwpIJI',
    'EGYpcwEVZwo8',
    'oXoZrIsBGeSm',
    'ohv05yk3gQZv',
    '9OwoQoGWJSzY',
    'hlPc7rEBp20X',
    't46SAPB9CjhS',
];
const HashButton = [
    'lj9KScOumvcU',
    'A1b2C3d4E5f6',
    'G7h8I9j0K1l2',
    'M3n4O5p6Q7r8',
    'S9t0U1v2W3x4',
    'Y5z6a7B8c9D0',
    'E1F2g3H4I5j6',
    'K7L8m9N0O1P2',
    'Q3R4s5T6U7v8',
    'W9X0y1Z2a3B4',
    'C5d6E7f8G9h0',
    'EVEfqlSr0x3W',
    'LWc6iYcUqWeN',
    'UgFRb6YhJqxw',
    'qQjTq9QhyRzM',
    'kOS3135nfXes',
    'K18rFaNeLOPd',
    'I1J2k3L4M5n6',
];
const IconButton = {
    'Fullscreen': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z"/></svg>',
    'Fullscreen-Off': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z"/></svg>',
    'Forward10': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Zm-33 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z"/></svg>',
    'Forward30': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M281 746v-50h121v-56h-82v-49h82v-57H281v-49h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V534h-71v162Zm-79 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z"/></svg>',
    'Replay10': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Z"/></svg>',
    'Replay30': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM281 746v-50h121v-55h-82v-50h82v-56H281v-50h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V535h-71v161Z"/></svg>',
    'Pause': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M370 736h60V416h-60v320Zm160 0h60V416h-60v320Zm-50 240q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>',
    'Play': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="m383 746 267-170-267-170v340Zm97 230q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>',
    'Picture-in-Picture': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"/></svg>',
    'Volume-Up': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z"/></svg>',
    'Volume-Off': '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" style="height: 100%; width: 100%;"><path fill="white" d="M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z"/></svg>',
}
let Aspect, Ratio, quality;
$(document).ready(function () {
    $(TagVideo).removeAttr('controls');
    const VideoParams = $(TagVideo).get(0);
    VideoParams.volume = 1;
    /* VideoParams.pause(); */
    let AspectRatio = $(TagVideo).attr('aspect-ratio');
    switch (AspectRatio) {
        case AspectRatio01[0]:
            Aspect = AspectRatio01[0];
            Ratio = AspectRatio01[1].split(':');
            quality = AspectRatio01[2];
            break;
        case AspectRatio02[0]:
            Aspect = AspectRatio02[0];
            Ratio = AspectRatio02[1].split(':');
            quality = AspectRatio02[2];
            break;
        case AspectRatio03[0]:
            Aspect = AspectRatio03[0];
            Ratio = AspectRatio03[1];
            quality = AspectRatio03[2];
            break;
        case AspectRatio04[0]:
            Aspect = AspectRatio04[0];
            Ratio = AspectRatio04[1].split(':');
            quality = AspectRatio04[2];
            break;
        case AspectRatio05[0]:
            Aspect = AspectRatio05[0];
            Ratio = AspectRatio05[1].split(':');
            quality = AspectRatio05[2];
            break;
        default:
            Aspect = AspectRatio06[0];
            Ratio = AspectRatio06[1];
            quality = AspectRatio06[2];
            break;
    }
    if (Ratio == 100) {
        var RatioWidth = '100%'
        var RatioHeight = '100%'
    } else {
        var RatioWidth = Ratio[0] + 'px';
        var RatioHeight = Ratio[1] + 'px';
    }
    const VideoContainer = '#' + Hash[0];
    const VideoContent = '#' + Hash[1];
    $(TagVideo).wrap('<div id="' + Hash[0] + '"></div>');
    $(VideoContainer).append('<div id="' + Hash[1] + '"></div>');
    $(VideoContainer + ' *').css({
        'font-family': 'system-ui',
    });
    $(VideoContainer).css({
        'width': RatioWidth,
        'height': RatioHeight,
        'background': 'black',
        'position': 'relative',
        'display': 'flex',
        'align-items': 'center',
    });
    $(TagVideo).css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'z-index': '0',
    });
    $(VideoContent).css({
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'z-index': '1',
        'color': '#f0f0f0',
    });
    const DivControls01 = '#' + Hash[2];
    $(VideoContent).append('<div id="' + Hash[2] + '"></div>');
    $(DivControls01).css({
        'width': '100%',
        'height': '20%',
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
    });
    var VideoElement = document.getElementById(NameVideo);
    var VideoPath = VideoElement.currentSrc;
    var VideoName = (VideoPath.substring(VideoPath.lastIndexOf('/') + 1)).split('.');
    $(DivControls01).append('<div id="' + Hash[5] + '"></div>');
    const DivControls01Div01 = '#' + Hash[5];
    $(DivControls01Div01).css({
        'width': '20%',
        'height': '100%',
        'padding': '15px',
    });
    $(DivControls01Div01).append('<span id="' + Hash[7] + '"></span>');
    $('#' + Hash[7]).css({
        'font-size': 'larger',
        'text-transform': 'capitalize',
    });
    document.getElementById(Hash[7]).textContent = VideoName[0];
    $(DivControls01Div01).append('<sup id="' + Hash[8] + '"></sup>');
    $('#' + Hash[8]).css({
        'font-size': 'medium',
        'text-transform': 'lowercase',
    });
    document.getElementById(Hash[8]).textContent = VideoName[1];
    const DivControls01Div02 = '#' + Hash[6];
    $(DivControls01).append('<div id="' + Hash[6] + '"></div>');
    $(DivControls01Div02).css({
        'width': '80%',
        'height': '100%',
        'display': 'flex',
        'flex-direction': 'row-reverse',
        'padding': '15px',
    });
    $(DivControls01Div02).append('<div id="' + HashButton[0] + '"></div>');
    $(DivControls01Div02 + ' #' + HashButton[0]).css({
        'width': '35px',
        'height': '35px',
        'margin-left': '10px',
        'cursor': 'pointer',
    });
    $(DivControls01Div02 + ' #' + HashButton[0]).append(IconButton['Fullscreen']);
    const fullscreen = document.getElementById(Hash[1]);
    const BTNfullscreen = document.getElementById(HashButton[0]);

    BTNfullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            fullscreen.requestFullscreen();
            fullscreen.classList.add('fullscreen');
            $(DivControls01Div02 + ' #' + HashButton[0]).empty();
            $(DivControls01Div02 + ' #' + HashButton[0]).append(IconButton['Fullscreen-Off']);
        } else {
            document.exitFullscreen();
            fullscreen.classList.remove('fullscreen');
            $(DivControls01Div02 + ' #' + HashButton[0]).empty();
            $(DivControls01Div02 + ' #' + HashButton[0]).append(IconButton['Fullscreen']);
        }
    });
    $(DivControls01Div02).append('<div id="' + HashButton[1] + '"></div>');
    $(DivControls01Div02 + ' #' + HashButton[1]).css({
        'width': '35px',
        'height': '35px',
        'margin-left': '10px',
        'cursor': 'pointer',
    });
    $(DivControls01Div02 + ' #' + HashButton[1]).append(IconButton['Picture-in-Picture']);
    const BTNPip = document.getElementById(HashButton[1]);
    const JsTagVideo = document.querySelector(TagVideo);

    BTNPip.addEventListener('click', async () => {
        try {
            await JsTagVideo.requestPictureInPicture();
        } catch (error) {
            console.log('Error:', error);
        }
    });
    $(DivControls01Div02).append('<div id="' + HashButton[2] + '"></div>');
    $(DivControls01Div02 + ' #' + HashButton[2]).css({
        'min-width': '125px',
        'height': '35px',
        'margin-left': '10px',
        'cursor': 'pointer',
        'display': 'flex',
        'flex-direction': 'row',
    });
    $(DivControls01Div02 + ' #' + HashButton[2]).append('<div id="' + HashButton[3] + '"></div>');
    $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).css({
        'width': '35px',
        'height': '35px',
    });
    $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).append(IconButton['Volume-Up']);
    $(DivControls01Div02 + ' #' + HashButton[2]).append('<input id="' + Hash[9] + '" type="range" min="0" max="1" step="0.1" value="1"></input>');
    const VolumeRange = document.getElementById(Hash[9]);
    VolumeRange.addEventListener('input', () => {
        if (VolumeRange.value == 0) {
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).empty();
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).append(IconButton['Volume-Off']);
            VolumeRange.value = VolumeRange.getAttribute('min');
        } else {
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).empty();
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).append(IconButton['Volume-Up']);
        }
        JsTagVideo.volume = VolumeRange.value;
    });
    const ClickVolume = document.getElementById(HashButton[3]);
    ClickVolume.addEventListener('click', function () {
        if (VolumeRange.value == 0) {
            VolumeRange.value = 1;
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).empty();
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).append(IconButton['Volume-Up']);
            VolumeRange.value = VolumeRange.getAttribute('max');
        } else {
            VolumeRange.value = 0;
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).empty();
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).append(IconButton['Volume-Off']);
            VolumeRange.value = VolumeRange.getAttribute('min');
        }
        JsTagVideo.volume = VolumeRange.value;
    });
    $(DivControls01Div02).append('<div id="' + HashButton[4] + '"></div>');
    $(DivControls01Div02 + ' #' + HashButton[4]).css({
        'width': 'auto',
        'height': '25px',
        'cursor': 'default',
        'border': '2px solid white',
        'border-radius': '5px',
        'color': 'white',
        'text-align': 'center',
        'padding': '0 2px',
        'margin-top': '5px',
    });
    $(DivControls01Div02 + ' #' + HashButton[4]).text(quality);
    const DivControls02 = '#' + Hash[3];
    $(VideoContent).append('<div id="' + Hash[3] + '"></div>');
    $(DivControls02).css({
        'width': '100%',
        'height': '50%',
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-evenly',
    });
    $(DivControls02).append('<div id="' + HashButton[5] + '"></div>');
    $(DivControls02).append('<div id="' + HashButton[6] + '"></div>');
    $(DivControls02).append('<div id="' + HashButton[7] + '"></div>');
    $(DivControls02).append('<div id="' + HashButton[8] + '"></div>');
    $(DivControls02).append('<div id="' + HashButton[9] + '"></div>');
    $(
        DivControls02 + ' #' + HashButton[5] + ', ' +
        DivControls02 + ' #' + HashButton[6] + ', ' +
        DivControls02 + ' #' + HashButton[7] + ', ' +
        DivControls02 + ' #' + HashButton[8] + ', ' +
        DivControls02 + ' #' + HashButton[9]
    ).css({
        'width': '75px',
        'height': '75px',
        'cursor': 'pointer',
    });
    $(DivControls02 + ' #' + HashButton[5]).append(IconButton['Replay30']);
    const Replay30 = document.getElementById(HashButton[5]);
    Replay30.addEventListener('click', function () {
        let currentTime = JsTagVideo.currentTime;
        currentTime -= 30;
        JsTagVideo.currentTime = currentTime;
    });
    $(DivControls02 + ' #' + HashButton[6]).append(IconButton['Replay10']);
    const Replay10 = document.getElementById(HashButton[6]);
    Replay10.addEventListener('click', function () {
        let currentTime = JsTagVideo.currentTime;
        currentTime -= 10;
        JsTagVideo.currentTime = currentTime;
    });
    $(DivControls02 + ' #' + HashButton[7]).append(IconButton['Pause']);
    const BTNPlay = document.getElementById(HashButton[7]);
    BTNPlay.addEventListener('click', function () {
        if (JsTagVideo.paused) {
            $(DivControls02 + ' #' + HashButton[7]).empty();
            $(DivControls02 + ' #' + HashButton[7]).append(IconButton['Pause']);
            JsTagVideo.play();
        } else {
            $(DivControls02 + ' #' + HashButton[7]).empty();
            $(DivControls02 + ' #' + HashButton[7]).append(IconButton['Play']);
            JsTagVideo.pause();
        }
    });
    $(DivControls02 + ' #' + HashButton[8]).append(IconButton['Forward10']);
    const Forward10 = document.getElementById(HashButton[8]);
    Forward10.addEventListener('click', function () {
        let currentTime = JsTagVideo.currentTime;
        currentTime += 10;
        JsTagVideo.currentTime = currentTime;
    });
    $(DivControls02 + ' #' + HashButton[9]).append(IconButton['Forward30']);
    const Forward30 = document.getElementById(HashButton[9]);
    Forward30.addEventListener('click', function () {
        let currentTime = JsTagVideo.currentTime;
        currentTime += 30;
        JsTagVideo.currentTime = currentTime;
    });
    const DivControls03 = '#' + Hash[4];
    $(VideoContent).append('<div id="' + Hash[4] + '"></div>');
    $(DivControls03).css({
        'width': '100%',
        'height': '30%',
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
    });
    $(DivControls03).append('<div id="' + Hash[10] + '"></div>');
    $(DivControls03).append('<div id="' + Hash[11] + '"></div>');
    $('#' + Hash[10] + ', #' + Hash[11]).css({
        'width': '100%',
        'height': '50%',
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
    });
    $('#' + Hash[11]).append('<span id="' + Hash[12] + '"></span>');
    $('#' + Hash[11]).append('<div id="' + Hash[13] + '"></div>');
    $('#' + Hash[11]).append('<span id="' + Hash[14] + '"></span>');
    var SpanTimeCurrent = $('#' + Hash[12]);
    var SpanTimeTotal = $('#' + Hash[14]);
    $('#' + Hash[12] + ', #' + Hash[14]).css({
        'margin': 'auto',
        'font-size': 'larger',
        'text-transform': 'capitalize',
        'font-weight': 'bold',
    });
    VideoParams.addEventListener('timeupdate', function () {
        var TimeCurrent = FormatTime(VideoParams.currentTime);
        var TimeTotal = FormatTime(VideoParams.duration);
        SpanTimeCurrent.text(TimeCurrent);
        SpanTimeTotal.text(TimeTotal);
    });

    function FormatTime(time) {
        var minute = Math.floor(time / 60);
        var second = Math.floor(time % 60);
        return PadZero(minute) + ':' + PadZero(second);
    }

    function PadZero(number) {
        return number.toString().padStart(2, '0');
    }
    var ProgressBarContent = $('#' + Hash[13]);
    $(ProgressBarContent).css({
        'width': '90%',
        'height': '10%',
        'margin-top': '0.3%',
        'border-radius': '5px',
        'background': '#ffffff3d',
        'cursor': 'pointer',
    });
    $(ProgressBarContent).append('<div id="' + Hash[15] + '"></div>');
    var ProgressBar = $('#' + Hash[15]);
    $(ProgressBar).css({
        'height': '100%',
        'background': '#005CC8',
        'border-radius': '5px',
        'position': 'relative',
    });
    VideoParams.addEventListener('timeupdate', function () {
        var progresso = (VideoParams.currentTime / VideoParams.duration) * 100;
        ProgressBar.css('width', progresso + '%');
    });
    ProgressBarContent.click(function (e) {
        var PosicaoX = e.pageX - $(this).offset().left;
        var WidthTotal = $(this).width();
        var TimeClick = (PosicaoX / WidthTotal) * VideoParams.duration;
        VideoParams.currentTime = TimeClick;
    });
    $(ProgressBar).append('<span id="' + Hash[16] + '"></span>');
    var SpanTimeBar = $('#' + Hash[16]);
    $(SpanTimeBar).css({
        'position': 'absolute',
        /* 'right': '0px', */
        'font-weight': 'bold',
        'font-size': 'large',
        'top': '-40px',
        'background': '#000000b3',
        'padding': '3px 5px',
        'border-radius': '5px',
    });
    $(ProgressBar).append('<span id="' + Hash[17] + '"></span>');
    $('#' + Hash[17]).css({
        'background': '#005CC8',
        'position': 'absolute',
        'right': '-7px',
        'top': '-3px',
        'border-radius': '100%',
        'width': '15px',
        'height': '15px',
    });
    ProgressBarContent.mousemove(function (e) {
        var WidthTotal2 = ProgressBarContent.width();
        var PosicaoX2 = e.pageX - ProgressBarContent.offset().left;
        var TimeClick2 = (PosicaoX2 / WidthTotal2) * VideoParams.duration;

        var TimeCurrent2 = FormatTime(TimeClick2);
        SpanTimeBar.text(TimeCurrent2);
        SpanTimeBar.css('left', (PosicaoX2 - 27) + 'px');
        SpanTimeBar.show();
    });
    ProgressBarContent.mouseleave(function () {
        SpanTimeBar.hide();
    });
    var TimeOpacity = 3;
    function InitTimeOpacity() {
        timeout = setTimeout(function () {
            $(VideoContent).css({
                'opacity': '0',
                'cursor': 'none',
            });
        }, TimeOpacity * 1000);
    }
    InitTimeOpacity();
    $(VideoContent).on('mousemove', function () {
        $(VideoContent).css({
            'opacity': '1',
            'cursor': 'default',
        });

        clearTimeout(timeout);
        InitTimeOpacity();
    });
    $('#' + HashButton[6]).attr('title', 'Press (←)');
    $('#' + HashButton[7]).attr('title', 'Press (Space)');
    $('#' + HashButton[8]).attr('title', 'Press (→)');
    $(DivControls01Div02 + ' #' + HashButton[0]).attr('title', 'Press (F)');
    $(DivControls01Div02 + ' #' + HashButton[1]).attr('title', 'Press (P)');
    $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).attr('title', 'Press (M)');
    $(document).on('keydown', function (event) {
        if (event.which === 37) {
            $(DivControls02 + ' #' + HashButton[6]).trigger('click');
        } else if (event.which === 32) {
            $(DivControls02 + ' #' + HashButton[7]).trigger('click');
        } else if (event.which === 39) {
            $(DivControls02 + ' #' + HashButton[8]).trigger('click');
        } else if (event.which === 70) {
            $(DivControls01Div02 + ' #' + HashButton[0]).trigger('click');
        } else if (event.which === 80) {
            $(DivControls01Div02 + ' #' + HashButton[1]).trigger('click');
        } else if (event.which === 77) {
            $(DivControls01Div02 + ' #' + HashButton[2] + ' #' + HashButton[3]).trigger('click');
        } else if (event.which === 38) {
            var RangeValue = parseFloat($('#' + Hash[9]).val());
            $('#' + Hash[9]).val(RangeValue + 0.2);
        } else if (event.which === 40) {
            var RangeValue = parseFloat($('#' + Hash[9]).val());
            $('#' + Hash[9]).val(RangeValue - 0.2);
        } else if (event.which >= 48 && event.which <= 57) {
            var KeyDown = event.which - 48;
            var TimeTotal2 = VideoParams.duration;
            var TimeDesire = KeyDown * 10;
            var TimeSecondes = (TimeDesire / 100) * TimeTotal2;
            VideoParams.currentTime = TimeSecondes;
        }
    });
});