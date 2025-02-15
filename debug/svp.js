// build/class/io_error.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var IOError = function(_super) {
  __extends(IOError2, _super);
  function IOError2(message) {
    var _this = _super.call(this, message) || this;
    console.error(message);
    _this.name = "Error";
    return _this;
  }
  return IOError2;
}(Error);
var io_error_default = IOError;

// build/class/io_elements.js
var IOElements = function() {
  function IOElements2(indentifersOptions, identifiersClass, identifiersId, identifiersActions, identifiersIcons, elementVideo) {
    this.elementContainter = document.createElement("div");
    this.indentifersOptions = indentifersOptions;
    this.identifiersClass = identifiersClass;
    this.identifiersId = identifiersId;
    this.identifiersActions = identifiersActions;
    this.identifiersIcons = identifiersIcons;
    this.elementVideo = elementVideo;
    this.build();
  }
  IOElements2.prototype.build = function() {
    this.elementContainter.setAttribute("id", this.identifiersId.container);
    if (this.elementVideo.parentElement == null) {
      new io_error_default("this.elementVideo.parentElement is null");
    }
    this.elementVideo.parentElement.insertBefore(this.elementContainter, this.elementVideo);
    this.elementContainter.appendChild(this.elementVideo);
    this.buildTop();
    this.buildMiddle();
    this.buildBottom();
  };
  IOElements2.prototype.buildTop = function() {
    var elementTop = document.createElement("div");
    elementTop.setAttribute("id", this.identifiersId.top);
    this.elementContainter.appendChild(elementTop);
    if (true) {
      elementTop.innerHTML = "";
    }
  };
  IOElements2.prototype.buildMiddle = function() {
    var elementMiddle = document.createElement("button");
    elementMiddle.setAttribute("id", this.identifiersId.middle);
    elementMiddle.setAttribute("class", this.identifiersClass.buttons);
    elementMiddle.setAttribute("action", this.identifiersActions.playPause);
    this.elementContainter.appendChild(elementMiddle);
    elementMiddle.innerHTML = this.buildIcon(this.identifiersIcons.play);
  };
  IOElements2.prototype.buildBottom = function() {
    var elementBottom = document.createElement("div");
    elementBottom.setAttribute("id", this.identifiersId.bottom);
    this.elementContainter.appendChild(elementBottom);
    var buttonPlayPause = document.createElement("button");
    buttonPlayPause.setAttribute("class", this.identifiersClass.buttons);
    buttonPlayPause.setAttribute("action", this.identifiersActions.playPause);
    buttonPlayPause.innerHTML = this.buildIcon(this.identifiersIcons.play);
    elementBottom.appendChild(buttonPlayPause);
    var pCurrent = document.createElement("p");
    pCurrent.setAttribute("action", this.identifiersActions.currentTime);
    elementBottom.appendChild(pCurrent);
    var divRangerProguessContainer = document.createElement("div");
    divRangerProguessContainer.setAttribute("action", this.identifiersActions.rangerProguessContainer);
    elementBottom.appendChild(divRangerProguessContainer);
    var divRangerProguessInput = document.createElement("input");
    divRangerProguessInput.setAttribute("action", this.identifiersActions.rangerProguessInput);
    divRangerProguessInput.setAttribute("type", "range");
    divRangerProguessInput.setAttribute("value", "0");
    divRangerProguessInput.setAttribute("min", "0");
    divRangerProguessInput.setAttribute("max", "100");
    divRangerProguessContainer.appendChild(divRangerProguessInput);
    var divRangerProguessDiv = document.createElement("div");
    divRangerProguessDiv.setAttribute("action", this.identifiersActions.rangerProguessDiv);
    divRangerProguessContainer.appendChild(divRangerProguessDiv);
    var pDuration = document.createElement("p");
    pDuration.setAttribute("action", this.identifiersActions.durationTime);
    elementBottom.appendChild(pDuration);
    var buttonVolume = document.createElement("button");
    buttonVolume.setAttribute("class", this.identifiersClass.buttons);
    buttonVolume.setAttribute("action", this.identifiersActions.volume);
    buttonVolume.innerHTML = this.buildIcon(this.identifiersIcons.volumeOn);
    elementBottom.appendChild(buttonVolume);
    var buttonPictureInPicture = document.createElement("button");
    buttonPictureInPicture.setAttribute("class", this.identifiersClass.buttons);
    buttonPictureInPicture.setAttribute("action", this.identifiersActions.pictureInPicture);
    buttonPictureInPicture.innerHTML = this.buildIcon(this.identifiersIcons.pictureInPicture);
    elementBottom.appendChild(buttonPictureInPicture);
    var buttonFullscreen = document.createElement("button");
    buttonFullscreen.setAttribute("class", this.identifiersClass.buttons);
    buttonFullscreen.setAttribute("action", this.identifiersActions.fullscreen);
    buttonFullscreen.innerHTML = this.buildIcon(this.identifiersIcons.fullscreenOff);
    elementBottom.appendChild(buttonFullscreen);
  };
  IOElements2.prototype.buildIcon = function(pathIcon) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="'.concat(this.identifiersClass.icons, '"><path d="').concat(pathIcon, '" /></svg>');
  };
  return IOElements2;
}();
var io_elements_default = IOElements;

// build/class/io_controllers.js
var IOControllers = function() {
  function IOControllers2(indentifersOptions, identifiersClass, identifiersId, identifiersActions, identifiersIcons, elementVideo) {
    this.controlsValue = {
      current: "00:00",
      currentTime: 0,
      duration: "00:00",
      durationTime: 0,
      playing: false,
      fullscreen: false,
      proguess: 0
    };
    this.indentifersOptions = indentifersOptions;
    this.identifiersClass = identifiersClass;
    this.identifiersId = identifiersId;
    this.identifiersActions = identifiersActions;
    this.identifiersIcons = identifiersIcons;
    this.elementVideo = elementVideo;
    this.controlsElements = {
      container: document.getElementById(this.identifiersId.container),
      top: document.getElementById(this.identifiersId.top),
      middle: document.getElementById(this.identifiersId.middle),
      bottom: document.getElementById(this.identifiersId.bottom),
      playPause: document.querySelectorAll('button[action="'.concat(this.identifiersActions.playPause, '"]')),
      fullscreen: document.querySelector('button[action="'.concat(this.identifiersActions.fullscreen, '"]')),
      volume: document.querySelector('button[action="'.concat(this.identifiersActions.volume, '"]')),
      currentTime: document.querySelector('p[action="'.concat(this.identifiersActions.currentTime, '"]')),
      durationTime: document.querySelector('p[action="'.concat(this.identifiersActions.durationTime, '"]')),
      pictureInPicture: document.querySelector('button[action="'.concat(this.identifiersActions.pictureInPicture, '"]')),
      rangerProguessContainer: document.querySelector('div[action="'.concat(this.identifiersActions.rangerProguessContainer, '"]')),
      rangerProguessInput: document.querySelector('input[action="'.concat(this.identifiersActions.rangerProguessInput, '"]')),
      rangerProguessDiv: document.querySelector('div[action="'.concat(this.identifiersActions.rangerProguessDiv, '"]'))
    };
    this.build();
  }
  IOControllers2.prototype.build = function() {
    this.buildBlockRightClick();
    this.buildPrepareVideo();
    this.buildFading();
    this.buildPlayPause();
    this.buildRangerProguess();
    this.buildFullscreen();
    this.buildPictureInPicture();
    this.buildVolume();
    this.buildDurationTime();
    this.buildCurrentTime();
    this.buildObserver();
  };
  IOControllers2.prototype.buildBlockRightClick = function() {
    this.elementVideo.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    this.controlsElements.container.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    this.controlsElements.top.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    this.controlsElements.middle.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    this.controlsElements.bottom.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
  };
  IOControllers2.prototype.buildPrepareVideo = function() {
    this.elementVideo.removeAttribute("controls");
    this.elementVideo.removeAttribute("height");
    this.elementVideo.removeAttribute("width");
    this.elementVideo.controls = false;
    this.elementVideo.currentTime = this.indentifersOptions.currentTime;
    this.elementVideo.setAttribute("playsinline", "");
    this.elementVideo.setAttribute("preload", "auto");
    this.elementVideo.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    this.elementVideo.setAttribute("disableremoteplayback", "");
    this.elementVideo.setAttribute("disabledownload", "");
    if (this.indentifersOptions.autoplay) {
      this.elementVideo.setAttribute("autoplay", "");
    } else {
      this.elementVideo.removeAttribute("autoplay");
    }
  };
  IOControllers2.prototype.buildFading = function() {
    var _this = this;
    var allContainers = [
      this.controlsElements.top,
      this.controlsElements.middle,
      this.controlsElements.bottom
    ];
    var hideTimeout = null;
    var hideControls = function() {
      if (!_this.elementVideo.paused) {
        allContainers.forEach(function(container) {
          container.classList.add(_this.identifiersClass.fading);
          _this.controlsElements.container.classList.add(_this.identifiersClass.hide);
        });
      }
    };
    var showControls = function() {
      allContainers.forEach(function(container) {
        container.classList.remove(_this.identifiersClass.fading);
        _this.controlsElements.container.classList.remove(_this.identifiersClass.hide);
      });
      if (hideTimeout)
        clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hideControls, 2500);
    };
    this.controlsElements.container.addEventListener("mouseleave", function() {
      hideControls();
    });
    this.controlsElements.container.addEventListener("mousemove", function() {
      showControls();
    });
    showControls();
  };
  ;
  IOControllers2.prototype.buildPlayPause = function() {
    var _this = this;
    this.elementVideo.addEventListener("pause", function() {
      _this.controlsValue.playing = false;
      _this.controlsElements.playPause.forEach(function(button) {
        var svgPath = button.querySelector("svg > path");
        if (svgPath != null) {
          svgPath.setAttribute("d", _this.identifiersIcons.play);
        } else {
          new io_error_default("svgPath is not exist");
        }
      });
    });
    this.elementVideo.addEventListener("play", function() {
      _this.controlsValue.playing = true;
      _this.controlsElements.playPause.forEach(function(button) {
        var svgPath = button.querySelector("svg > path");
        if (svgPath != null) {
          svgPath.setAttribute("d", _this.identifiersIcons.pause);
        } else {
          new io_error_default("svgPath is not exist");
        }
      });
    });
    this.elementVideo.addEventListener("click", function() {
      _this.playPauseListener();
    });
    this.controlsElements.playPause.forEach(function(button) {
      button.addEventListener("click", function() {
        _this.playPauseListener();
      });
    });
  };
  IOControllers2.prototype.buildRangerProguess = function() {
    var _this = this;
    this.controlsElements.rangerProguessInput.oninput = function() {
      _this.controlsValue.proguess = parseInt(_this.controlsElements.rangerProguessInput.value, 10);
      _this.rangerProguessDivListener();
      _this.elementVideo.currentTime = _this.controlsValue.proguess / 100 * _this.controlsValue.durationTime;
      console.log("buildRangerProguess(): $proguess: ".concat(_this.controlsValue.proguess, ";"));
    };
  };
  IOControllers2.prototype.buildFullscreen = function() {
    var _this = this;
    this.controlsElements.fullscreen.addEventListener("click", function() {
      _this.fullscreenListener();
    });
  };
  IOControllers2.prototype.buildPictureInPicture = function() {
    var _this = this;
    this.controlsElements.pictureInPicture.addEventListener("click", function() {
      _this.pictureInPictureListener();
    });
  };
  IOControllers2.prototype.buildVolume = function() {
    var _this = this;
    this.controlsElements.volume.addEventListener("click", function() {
      _this.volumeListener();
    });
  };
  IOControllers2.prototype.buildDurationTime = function() {
    var _this = this;
    this.elementVideo.addEventListener("loadeddata", function() {
      var _a, _b;
      _this.controlsValue.duration = _this.formatTime((_a = _this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0);
      _this.controlsValue.durationTime = (_b = _this.elementVideo.duration) !== null && _b !== void 0 ? _b : 0;
      _this.controlsElements.durationTime.innerHTML = _this.controlsValue.current;
    });
  };
  IOControllers2.prototype.buildCurrentTime = function() {
    var _this = this;
    this.elementVideo.addEventListener("timeupdate", function() {
      var _a, _b;
      _this.controlsValue.proguess = _this.controlsValue.currentTime / _this.controlsValue.durationTime * 100;
      _this.rangerProguessDivListener();
      _this.controlsElements.rangerProguessInput.setAttribute("value", _this.controlsValue.proguess.toString());
      _this.controlsValue.currentTime = (_a = _this.elementVideo.currentTime) !== null && _a !== void 0 ? _a : 0;
      _this.controlsElements.currentTime.innerHTML = _this.controlsValue.current = _this.formatTime((_b = _this.elementVideo.currentTime) !== null && _b !== void 0 ? _b : 0);
      console.log("buildCurrentTime(): $proguess: ".concat(_this.controlsValue.proguess, ";"));
    });
  };
  IOControllers2.prototype.buildObserver = function() {
    var _this = this;
    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "ArrowLeft":
          _this.elementVideo.currentTime = Math.max(0, Math.min(_this.controlsValue.durationTime, _this.elementVideo.currentTime - 10));
          break;
        case " ":
          _this.playPauseListener();
          break;
        case "ArrowRight":
          _this.elementVideo.currentTime = Math.max(0, Math.min(_this.controlsValue.durationTime, _this.elementVideo.currentTime + 10));
          break;
        case "ArrowDown":
          break;
        case "ArrowUp":
          break;
        case "f":
          _this.fullscreenListener();
          break;
        case "p":
          _this.pictureInPictureListener();
          break;
        case "m":
          _this.volumeListener();
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          var percentage = parseInt(event.key) * 10;
          var newTime = percentage / 100 * _this.controlsValue.durationTime;
          _this.elementVideo.currentTime = newTime;
          _this.controlsValue.current = _this.formatTime(newTime);
          _this.controlsValue.currentTime = newTime;
          break;
      }
    });
  };
  ;
  IOControllers2.prototype.playPauseListener = function() {
    if (this.elementVideo.paused) {
      this.elementVideo.play();
      return;
    }
    this.elementVideo.pause();
  };
  IOControllers2.prototype.fullscreenListener = function() {
    if (!this.controlsValue.fullscreen) {
      this.controlsValue.fullscreen = true;
      if (this.controlsElements.container.requestFullscreen) {
        this.controlsElements.container.requestFullscreen();
      } else if (this.controlsElements.container.mozRequestFullScreen) {
        this.controlsElements.container.mozRequestFullScreen();
      } else if (this.controlsElements.container.webkitRequestFullScreen) {
        this.controlsElements.container.webkitRequestFullScreen();
      } else if (this.controlsElements.container.msRequestFullscreen) {
        this.controlsElements.container.msRequestFullscreen();
      }
      this.controlsElements.fullscreen.querySelector("svg > path").setAttribute("d", this.identifiersIcons.fullscreenOn);
    } else {
      this.controlsValue.fullscreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.controlsElements.fullscreen.querySelector("svg > path").setAttribute("d", this.identifiersIcons.fullscreenOff);
    }
  };
  IOControllers2.prototype.pictureInPictureListener = function() {
    if (this.elementVideo.requestPictureInPicture) {
      this.elementVideo.requestPictureInPicture();
    }
  };
  IOControllers2.prototype.volumeListener = function() {
    if (this.elementVideo.muted || this.elementVideo.volume === 0) {
      this.controlsElements.volume.querySelector("svg > path").setAttribute("d", this.identifiersIcons.volumeOn);
      this.elementVideo.muted = false;
      this.elementVideo.volume = 1;
    } else {
      this.controlsElements.volume.querySelector("svg > path").setAttribute("d", this.identifiersIcons.volumeOff);
      this.elementVideo.muted = true;
      this.elementVideo.volume = 0;
    }
  };
  IOControllers2.prototype.rangerProguessDivListener = function() {
    var progress = this.controlsValue.proguess;
    if (progress < 25) {
      this.controlsElements.rangerProguessDiv.style.width = "".concat(progress + 0.5, "%");
      return;
    }
    if (progress > 45) {
      this.controlsElements.rangerProguessDiv.style.width = "".concat(progress - 0.5, "%");
      return;
    }
    this.controlsElements.rangerProguessDiv.style.width = "".concat(progress, "%");
  };
  IOControllers2.prototype.formatTime = function(seconds) {
    function padZero(number) {
      return (number < 10 ? "0" : "") + number;
    }
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor(seconds % 3600 / 60);
    var secondsLeft = Math.floor(seconds % 60);
    if (hours > 0) {
      return padZero(hours) + ":" + padZero(minutes) + ":" + padZero(secondsLeft);
    }
    return padZero(minutes) + ":" + padZero(secondsLeft);
  };
  return IOControllers2;
}();
var io_controllers_default = IOControllers;

// build/svp.js
var SVP = function() {
  function SVP2(options) {
    var _a, _b, _c;
    this.optionsDefault = {
      autoplay: false,
      volume: 70,
      currentTime: 0
    };
    this.identifiersClass = {
      all: "svp__all",
      buttons: "svp__buttons",
      icons: "svp__icons",
      fading: "svp__fading",
      hide: "svp__hide"
    };
    this.identifiersId = {
      container: "svp__container",
      top: "svp__top",
      middle: "svp__middle",
      bottom: "svp__bottom"
    };
    this.identifiersActions = {
      playPause: "svp__action__play__pause",
      fullscreen: "svp__action__fullscreen",
      volume: "svp__action__volume",
      durationTime: "svp__action__duration__time",
      currentTime: "svp__action__current__time",
      pictureInPicture: "svp__action__picture__in__picture",
      rangerProguessContainer: "wvp__action__ranger__proguess__container",
      rangerProguessInput: "wvp__action__ranger__proguess__input",
      rangerProguessDiv: "wvp__action__ranger__proguess__div"
    };
    this.indentifersIcons = {
      fullscreenOn: "M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z",
      fullscreenOff: "M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z",
      pause: "M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z",
      play: "M320-200v-560l440 280-440 280Z",
      pictureInPicture: "M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z",
      volumeOn: "M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z",
      volumeOff: "M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z"
    };
    this.options = {
      autoplay: (_a = options === null || options === void 0 ? void 0 : options.autoplay) !== null && _a !== void 0 ? _a : this.optionsDefault.autoplay,
      volume: (_b = options === null || options === void 0 ? void 0 : options.volume) !== null && _b !== void 0 ? _b : this.optionsDefault.volume,
      currentTime: (_c = options === null || options === void 0 ? void 0 : options.currentTime) !== null && _c !== void 0 ? _c : this.optionsDefault.currentTime
    };
    if (this.options == void 0) {
      new io_error_default("Options undefinded");
    }
    this.tagVideos = document.querySelectorAll('video[plugin="svp"]');
    if (this.tagVideos == void 0) {
      new io_error_default("Tag Video undefinded");
    }
    this.build();
  }
  SVP2.prototype.build = function() {
    var _this = this;
    this.tagVideos.forEach(function(elementVideo) {
      new io_elements_default(_this.options, _this.identifiersClass, _this.identifiersId, _this.identifiersActions, _this.indentifersIcons, elementVideo);
      new io_controllers_default(_this.options, _this.identifiersClass, _this.identifiersId, _this.identifiersActions, _this.indentifersIcons, elementVideo);
    });
  };
  return SVP2;
}();
//# sourceMappingURL=svp.js.map
