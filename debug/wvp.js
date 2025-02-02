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

// build/class/controls.js
var Controls = function() {
  function Controls2(elementContainer, elementVideo, identifiersId, identifiersClass, options, actions, iconsPath) {
    var _this = this;
    var _a;
    this.buildConfig = function() {
      _this.myElements.video.removeAttribute("controls");
      _this.myElements.video.controls = false;
      _this.myElements.video.currentTime = _this.controls.current;
      _this.myElements.video.setAttribute("playsinline", "");
      _this.myElements.video.setAttribute("preload", "auto");
      _this.myElements.video.setAttribute("controlslist", "nodownload noremoteplayback");
      _this.myElements.video.addEventListener("contextmenu", function(event) {
        event.preventDefault();
      });
      if (_this.controls.playing) {
        _this.myElements.video.setAttribute("autoplay", "");
      } else {
        _this.myElements.video.removeAttribute("autoplay");
      }
      if (!_this.controls.volume) {
        _this.myElements.video.setAttribute("muted", "");
      } else {
        _this.myElements.video.removeAttribute("muted");
      }
      _this.myElements.video.onloadedmetadata = function() {
        var _a2;
        _this.controls.durationTime = _this.formatTime((_a2 = _this.myElements.video.duration) !== null && _a2 !== void 0 ? _a2 : 0);
        _this.controls.duration = _this.myElements.video.duration;
      };
    };
    this.buildFading = function() {
      var allContainers = [
        _this.myElements.id.top,
        _this.myElements.id.middle,
        _this.myElements.id.bottom
      ];
      var hideTimeout = null;
      var hideControls = function() {
        if (!_this.myElements.video.paused) {
          allContainers.forEach(function(container) {
            container.classList.add(_this.identifiersClass.fading);
            _this.myElements.id.container.classList.add(_this.identifiersClass.cursorHide);
          });
        }
      };
      var showControls = function() {
        allContainers.forEach(function(container) {
          container.classList.remove(_this.identifiersClass.fading);
          _this.myElements.id.container.classList.remove(_this.identifiersClass.cursorHide);
        });
        if (hideTimeout)
          clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideControls, 2500);
      };
      _this.myElements.id.container.addEventListener("mouseleave", function() {
        hideControls();
      });
      _this.myElements.id.container.addEventListener("mousemove", function() {
        showControls();
      });
      showControls();
    };
    this.buildPlayPause = function() {
      if (_this.myElements.actions.playPause.length === 0) {
        new io_error_default("Is empty Play/Pause.");
        return;
      }
      _this.myElements.video.addEventListener("pause", function() {
        _this.controls.playing = false;
        _this.myElements.actions.playPause.forEach(function(button) {
          var svgPath = button.querySelector("svg > path");
          if (svgPath) {
            svgPath.setAttribute("d", _this.iconsPath.play);
          }
        });
      });
      _this.myElements.video.addEventListener("play", function() {
        _this.controls.playing = true;
        _this.myElements.actions.playPause.forEach(function(button) {
          var svgPath = button.querySelector("svg > path");
          if (svgPath) {
            svgPath.setAttribute("d", _this.iconsPath.pause);
          }
        });
      });
      _this.myElements.video.addEventListener("click", function() {
        _this.playPauseListener();
      });
      _this.myElements.actions.playPause.forEach(function(button) {
        button.addEventListener("click", function() {
          _this.playPauseListener();
        });
      });
    };
    this.buildFullscreen = function() {
      _this.myElements.actions.fullscreen.addEventListener("click", function() {
        _this.fullscreenListener();
      });
    };
    this.buildPictureInPicture = function() {
      _this.myElements.actions.pictureInPicture.addEventListener("click", function() {
        if (_this.myElements.video.requestPictureInPicture) {
          _this.myElements.video.requestPictureInPicture();
        }
      });
    };
    this.buildVolume = function() {
      _this.myElements.actions.volume.addEventListener("click", function() {
        _this.volumeListener();
      });
    };
    this.buildRangerVolume = function() {
    };
    this.buildDurationTime = function() {
      _this.myElements.video.addEventListener("loadeddata", function() {
        var _a2, _b;
        _this.controls.durationTime = _this.formatTime((_a2 = _this.myElements.video.duration) !== null && _a2 !== void 0 ? _a2 : 0);
        _this.controls.duration = (_b = _this.myElements.video.duration) !== null && _b !== void 0 ? _b : 0;
        _this.myElements.actions.durationTime.innerHTML = _this.controls.durationTime;
      });
    };
    this.buildCurrentTime = function() {
      _this.myElements.video.addEventListener("timeupdate", function() {
        var _a2, _b;
        _this.controls.currentTime = _this.formatTime((_a2 = _this.myElements.video.currentTime) !== null && _a2 !== void 0 ? _a2 : 0);
        _this.controls.current = (_b = _this.myElements.video.currentTime) !== null && _b !== void 0 ? _b : 0;
        _this.proguess = _this.controls.current / _this.controls.duration * 100;
        _this.rangerProguessProguessListener();
        _this.myElements.actions.rangerProguessInput.value = _this.proguess.toString();
        _this.myElements.actions.currentTime.innerHTML = _this.controls.currentTime;
      });
    };
    this.buildRangerProguess = function() {
      _this.myElements.actions.rangerProguessInput.oninput = function() {
        _this.proguess = parseInt(_this.myElements.actions.rangerProguessInput.value, 10);
        _this.rangerProguessProguessListener();
        _this.myElements.video.currentTime = _this.proguess / 100 * _this.controls.duration;
      };
    };
    this.buildObserver = function() {
      document.addEventListener("keydown", function(event) {
        switch (event.key) {
          case "ArrowLeft":
            _this.myElements.video.currentTime = Math.max(0, Math.min(_this.controls.duration, _this.myElements.video.currentTime - 10));
            break;
          case " ":
            _this.playPauseListener();
            break;
          case "ArrowRight":
            _this.myElements.video.currentTime = Math.max(0, Math.min(_this.controls.duration, _this.myElements.video.currentTime + 10));
            break;
          case "ArrowDown":
            break;
          case "ArrowUp":
            break;
          case "f":
            _this.fullscreenListener();
            break;
          case "p":
            if (_this.myElements.video.requestPictureInPicture) {
              _this.myElements.video.requestPictureInPicture();
            }
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
            var newTime = percentage / 100 * _this.controls.duration;
            _this.myElements.video.currentTime = newTime;
            _this.controls.currentTime = _this.formatTime(newTime);
            _this.controls.current = newTime;
            break;
        }
      });
    };
    this.myElements = {
      video: elementVideo,
      id: {
        container: elementContainer,
        top: document.getElementById(identifiersId.top),
        middle: document.getElementById(identifiersId.middle),
        bottom: document.getElementById(identifiersId.bottom)
      },
      actions: {
        playPause: document.querySelectorAll('button[action="' + "".concat(actions.playPause) + '"]'),
        fullscreen: document.querySelector('button[action="' + "".concat(actions.fullscreen) + '"]'),
        pictureInPicture: document.querySelector('button[action="' + "".concat(actions.pictureInPicture) + '"]'),
        volume: document.querySelector('button[action="' + "".concat(actions.volume) + '"]'),
        rangerVolumeContainer: document.getElementById(actions.rangerVolumeContainer),
        rangerVolumeInput: document.getElementById(actions.rangerVolumeInput),
        rangerVolumeProguess: document.getElementById(actions.rangerVolumeProguess),
        durationTime: document.querySelector('p[action="' + "".concat(actions.durationTime) + '"]'),
        currentTime: document.querySelector('p[action="' + "".concat(actions.currentTime) + '"]'),
        rangerProguessContainer: document.getElementById(actions.rangerProguessContainer),
        rangerProguessInput: document.getElementById(actions.rangerProguessInput),
        rangerProguessProguess: document.getElementById(actions.rangerProguessProguess)
      },
      svg: {
        fullscreen: null,
        playPause: null,
        pictureInPicture: null,
        volume: null
      }
    };
    this.myElements.svg = {
      fullscreen: this.myElements.actions.fullscreen.querySelector("svg > path"),
      playPause: null,
      pictureInPicture: null,
      volume: this.myElements.actions.volume.querySelector("svg > path")
    };
    this.proguess = 0;
    this.identifiersClass = identifiersClass;
    this.iconsPath = iconsPath;
    this.controls = {
      playing: options.settings.autoplay,
      fullscreen: false,
      pictureInPicture: false,
      volume: !options.settings.muted,
      rangerVolume: options.settings.muted ? 0 : 1,
      durationTime: this.formatTime((_a = this.myElements.video.duration) !== null && _a !== void 0 ? _a : 0),
      currentTime: this.formatTime(0),
      duration: this.myElements.video.duration,
      current: 0
    };
    this.build();
  }
  Controls2.prototype.build = function() {
    this.buildConfig();
    this.buildFading();
    this.buildPlayPause();
    this.buildFullscreen();
    this.buildPictureInPicture();
    this.buildVolume();
    this.buildRangerVolume();
    this.buildDurationTime();
    this.buildCurrentTime();
    this.buildRangerProguess();
    this.buildObserver();
  };
  Controls2.prototype.playPauseListener = function() {
    if (this.myElements.video.paused) {
      this.myElements.video.play();
    } else {
      this.myElements.video.pause();
    }
  };
  Controls2.prototype.rangerProguessProguessListener = function() {
    if (this.proguess < 25) {
      this.myElements.actions.rangerProguessProguess.setAttribute("style", "width: ".concat(this.proguess + 0.5, "%;"));
      return;
    }
    if (this.proguess > 45) {
      this.myElements.actions.rangerProguessProguess.setAttribute("style", "width: ".concat(this.proguess - 0.5, "%;"));
      return;
    }
    this.myElements.actions.rangerProguessProguess.setAttribute("style", "width: ".concat(this.proguess, "%;"));
  };
  Controls2.prototype.volumeListener = function() {
    if (this.myElements.video.muted || this.myElements.video.volume === 0) {
      this.myElements.svg.volume.setAttribute("d", this.iconsPath.volumeOn);
      this.myElements.video.muted = false;
      this.myElements.video.volume = 1;
    } else {
      this.myElements.svg.volume.setAttribute("d", this.iconsPath.volumeOff);
      this.myElements.video.muted = true;
      this.myElements.video.volume = 0;
    }
  };
  Controls2.prototype.fullscreenListener = function() {
    if (!this.controls.fullscreen) {
      this.controls.fullscreen = true;
      if (this.myElements.id.container.requestFullscreen) {
        this.myElements.id.container.requestFullscreen();
      } else if (this.myElements.id.container.mozRequestFullScreen) {
        this.myElements.id.container.mozRequestFullScreen();
      } else if (this.myElements.id.container.webkitRequestFullScreen) {
        this.myElements.id.container.webkitRequestFullScreen();
      } else if (this.myElements.id.container.msRequestFullscreen) {
        this.myElements.id.container.msRequestFullscreen();
      }
      this.myElements.svg.fullscreen.setAttribute("d", this.iconsPath.fullscreenOn);
    } else {
      this.controls.fullscreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.myElements.svg.fullscreen.setAttribute("d", this.iconsPath.fullscreenOff);
    }
  };
  Controls2.prototype.formatTime = function(seconds) {
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
  return Controls2;
}();
var controls_default = Controls;

// build/class/elements.js
var Elements = function() {
  function Elements2(options, identifiersId, identifiersClass, actions) {
    var _this = this;
    this.buildTop = function(elementContainer) {
      var elementTop = document.createElement("div");
      elementTop.setAttribute("id", _this.identifiersId.top);
      elementContainer.appendChild(elementTop);
      if (_this.options.style.titleTag != null) {
        elementTop.innerHTML = _this.options.style.titleTag;
      }
    };
    this.buildMiddle = function(elementContainer) {
      var elementMiddle = document.createElement("button");
      elementMiddle.setAttribute("id", _this.identifiersId.middle);
      elementMiddle.setAttribute("class", _this.identifiersClass.buttons);
      elementMiddle.setAttribute("action", _this.actions.playPause);
      elementContainer.appendChild(elementMiddle);
      elementMiddle.innerHTML = _this.buildIcon(_this.iconsPath.play);
    };
    this.buildBottom = function(elementContainer) {
      var elementBottom = document.createElement("div");
      elementBottom.setAttribute("id", _this.identifiersId.bottom);
      elementContainer.appendChild(elementBottom);
      _this.buildPlayPause(elementBottom);
      _this.buildCurrent(elementBottom);
      _this.buildRangerProguess(elementBottom);
      _this.buildDuration(elementBottom);
      _this.buildVolume(elementBottom);
      _this.buildPictureInPicture(elementBottom);
      _this.buildFullscren(elementBottom);
    };
    this.options = options;
    this.identifiersId = identifiersId;
    this.identifiersClass = identifiersClass;
    this.actions = actions;
    this.iconsPath = {
      fullscreenOn: "M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z",
      fullscreenOff: "M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z",
      pause: "M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z",
      play: "M320-200v-560l440 280-440 280Z",
      pictureInPicture: "M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z",
      volumeOn: "M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z",
      volumeOff: "M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z"
    };
  }
  Elements2.prototype.build = function() {
    var _this = this;
    var elementVideos = document.querySelectorAll(this.options.apply);
    if (elementVideos.length === 0) {
      return;
    }
    elementVideos.forEach(function(elementVideo) {
      var parentElement = elementVideo.parentElement;
      if (parentElement == null) {
        new io_error_default("Error parentElement is null");
      }
      var elementContainer = document.createElement("div");
      elementContainer.setAttribute("id", _this.identifiersId.container);
      parentElement.insertBefore(elementContainer, elementVideo);
      elementContainer.appendChild(elementVideo);
      _this.buildTop(elementContainer);
      _this.buildMiddle(elementContainer);
      _this.buildBottom(elementContainer);
      try {
        new controls_default(elementContainer, elementVideo, _this.identifiersId, _this.identifiersClass, _this.options, _this.actions, _this.iconsPath);
      } catch (error) {
        new io_error_default("Error build Controls: ".concat(error));
      }
    });
  };
  Elements2.prototype.buildPlayPause = function(elementBottom) {
    var buttonPlayPause = document.createElement("button");
    buttonPlayPause.setAttribute("class", this.identifiersClass.buttons);
    buttonPlayPause.setAttribute("action", this.actions.playPause);
    buttonPlayPause.innerHTML = this.buildIcon(this.iconsPath.play);
    elementBottom.appendChild(buttonPlayPause);
  };
  Elements2.prototype.buildCurrent = function(elementBottom) {
    var pCurrent = document.createElement("p");
    pCurrent.setAttribute("id", this.actions.currentTime);
    pCurrent.setAttribute("action", this.actions.currentTime);
    pCurrent.innerHTML = "00:00";
    elementBottom.appendChild(pCurrent);
  };
  Elements2.prototype.buildRangerProguess = function(elementBottom) {
    var divRangerProguessContainer = document.createElement("div");
    divRangerProguessContainer.setAttribute("id", this.actions.rangerProguessContainer);
    elementBottom.appendChild(divRangerProguessContainer);
    var divRangerProguessInput = document.createElement("input");
    divRangerProguessInput.setAttribute("id", this.actions.rangerProguessInput);
    divRangerProguessInput.setAttribute("type", "range");
    divRangerProguessInput.setAttribute("value", "0");
    divRangerProguessInput.setAttribute("min", "0");
    divRangerProguessInput.setAttribute("max", "100");
    divRangerProguessContainer.appendChild(divRangerProguessInput);
    var divRangerProguessProguess = document.createElement("div");
    divRangerProguessProguess.setAttribute("id", this.actions.rangerProguessProguess);
    divRangerProguessContainer.appendChild(divRangerProguessProguess);
  };
  Elements2.prototype.buildDuration = function(elementBottom) {
    var pDuration = document.createElement("p");
    pDuration.setAttribute("id", this.actions.durationTime);
    pDuration.setAttribute("action", this.actions.durationTime);
    elementBottom.appendChild(pDuration);
  };
  Elements2.prototype.buildVolume = function(elementBottom) {
    var buttonVolume = document.createElement("button");
    buttonVolume.setAttribute("class", this.identifiersClass.buttons);
    buttonVolume.setAttribute("action", this.actions.volume);
    buttonVolume.innerHTML = this.buildIcon(this.iconsPath.volumeOn);
    elementBottom.appendChild(buttonVolume);
  };
  Elements2.prototype.buildPictureInPicture = function(elementBottom) {
    var buttonPictureInPicture = document.createElement("button");
    buttonPictureInPicture.setAttribute("class", this.identifiersClass.buttons);
    buttonPictureInPicture.setAttribute("action", this.actions.pictureInPicture);
    buttonPictureInPicture.innerHTML = this.buildIcon(this.iconsPath.pictureInPicture);
    elementBottom.appendChild(buttonPictureInPicture);
  };
  Elements2.prototype.buildFullscren = function(elementBottom) {
    var buttonFullscreen = document.createElement("button");
    buttonFullscreen.setAttribute("class", this.identifiersClass.buttons);
    buttonFullscreen.setAttribute("action", this.actions.fullscreen);
    buttonFullscreen.innerHTML = this.buildIcon(this.iconsPath.fullscreenOff);
    elementBottom.appendChild(buttonFullscreen);
  };
  Elements2.prototype.buildIcon = function(pathIcon) {
    var icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="'.concat(this.identifiersClass.icons, '">');
    icon += '<path d="'.concat(pathIcon, '" />');
    icon += "</svg>";
    return icon;
  };
  return Elements2;
}();
var elements_default = Elements;

// build/class/styles.js
var Styles = function() {
  function Styles2(options, identifiersId, identifiersClass, actions) {
    var _this = this;
    this.allStyles = "";
    this.indexStyles = 99;
    this.classAll = function() {
      var stylesMap = {
        "margin": "0",
        "padding": "0",
        "box-sizing": "inherit",
        "text-shadow": "none"
      };
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.all), stylesMap));
    };
    this.classButtons = function() {
      var stylesMap = {
        "display": "block",
        "color": "inherit",
        "border": "none",
        "padding": "0",
        "margin": "0",
        "font": "inherit",
        "cursor": "pointer",
        "outline": "inherit",
        "touch-action": "manipulation",
        "flex-shrink": "0",
        "background-color": "transparent"
      };
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.buttons), stylesMap));
    };
    this.classIcons = function() {
      var stylesMap = {
        "display": "block",
        "margin": "auto",
        "fill": _this.options.style.colorInactive,
        "width": "2rem",
        "height": "2rem"
      };
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.icons), stylesMap));
    };
    this.applyVideo = function() {
      var stylesMap = {
        "display": "block",
        "width": "100%",
        "height": "100%",
        "z-index": "-".concat(_this.indexStyles),
        "background-color": _this.options.style.backgroundColor
      };
      _this.addStyles(_this.parseStyles(_this.options.apply, stylesMap));
    };
    this.idContainer = function() {
      var stylesMap = {
        "position": "relative",
        "display": "block",
        "max-width": "100%",
        "min-width": "240px",
        "height": "fit-content",
        "cursor": "default"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.container), stylesMap));
    };
    this.idTop = function() {
      var stylesMap = {
        "position": "absolute",
        "display": "block",
        "width": "100%",
        "height": "fit-content",
        "right": "0",
        "left": "0",
        "top": "0",
        "z-index": _this.indexStyles.toString(),
        "padding": "1rem",
        "background-image": "linear-gradient(to bottom, #00000080, transparent)"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top), stylesMap));
    };
    this.idMiddle = function() {
      var stylesMap = {
        "position": "absolute",
        "width": "3rem",
        "height": "3rem",
        "top": "50%",
        "left": "50%",
        "z-index": _this.indexStyles.toString(),
        "transform": "translate(-50%, -50%)",
        "background-color": _this.options.style.colorActive,
        "border-radius": "100%"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.middle), stylesMap));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.middle), [
        { attribute: "height", valueMax: "2.7rem", valueMiddle: "2.5rem", valueMin: "2.3rem" }
      ]));
    };
    this.idBottom = function() {
      var stylesMap = {
        "position": "absolute",
        "display": "flex",
        "width": "100%",
        "height": "fit-content",
        "right": "0",
        "left": "0",
        "bottom": "0",
        "z-index": _this.indexStyles.toString(),
        "padding": "1rem",
        "background-image": "linear-gradient(to top, #00000080, transparent)",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-items": "center"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom), stylesMap));
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom, " button"), {
        "margin": "0 0.2rem 0 0.2rem"
      }));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.bottom, " button"), [
        { attribute: "margin", valueMax: "0 0.2rem 0 0.2rem", valueMiddle: "0 0.1rem 0 0.1rem", valueMin: "0 0.1rem 0 0.1rem" }
      ]));
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.currentTime, ", #").concat(_this.actions.durationTime), {
        "margin": "0 0.3rem 0 0.3rem"
      }));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.currentTime, ", #").concat(_this.actions.durationTime), [
        { attribute: "margin", valueMax: "0 0.3rem 0 0.3rem", valueMiddle: "0 0.2rem 0 0.2rem", valueMin: "0 0.1rem 0 0.1rem" }
      ]));
    };
    this.actionsTime = function() {
      var stylesMap = {
        "font-family": "inherit",
        "font-size": "1rem",
        "font-weight": "bold",
        "color": _this.options.style.colorInactive
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.durationTime, ", #").concat(_this.actions.currentTime), stylesMap));
    };
    this.actionsRangerProguessContainer = function() {
      var stylesMap = {
        "position": "relative",
        "display": "block",
        "width": "100%",
        "height": "auto",
        "background-color": "transparent"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer), stylesMap));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer), [
        { attribute: "height", valueMax: "0.3rem", valueMiddle: "0.3rem", valueMin: "0.2rem" }
      ]));
    };
    this.actionsRangerProguessInput = function() {
      var stylesMap = {
        "appearance": "none",
        "border": "none",
        "cursor": "pointer",
        "width": "100%",
        "height": "auto",
        "background-color": "transparent"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput), stylesMap));
      var stylesMap = {
        "appearance": "none",
        "border": "none",
        "width": "100%",
        "height": "0.6rem",
        "background-color": _this.options.style.colorInactive,
        "border-radius": "0.8rem"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput, "::-webkit-slider-runnable-track"), stylesMap));
      var stylesMap = {
        "appearance": "none",
        "border": "none",
        "width": "1rem",
        "height": "1rem",
        "background-color": _this.options.style.colorActive,
        "border-radius": "50%",
        "margin-top": "-0.2rem"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessInput, "::-webkit-slider-thumb"), stylesMap));
    };
    this.actionsRangerProguessProguess = function() {
      var stylesMap = {
        "position": "absolute",
        "display": "block",
        "top": "0",
        "left": "0",
        "width": "0%",
        "height": "0.6rem",
        "margin-top": "0.5rem",
        "border-top-left-radius": "0.8rem",
        "border-bottom-left-radius": "0.8rem",
        "border-top-right-radius": "0",
        "border-bottom-right-radius": "0",
        "background-color": _this.options.style.colorActive,
        "pointer-events": "none"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessProguess), stylesMap));
    };
    this.buildFading = function() {
      var stylesMap = {
        "transition": "opacity 0.3s ease, visibility 0.3s ease",
        "opacity": "1",
        "visibility": "visible",
        "overflow": "visible"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.top, ", #").concat(_this.identifiersId.middle, ", #").concat(_this.identifiersId.bottom), stylesMap));
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.fading), {
        "opacity": "0 !important",
        "visibility": "hidden !important",
        "overflow": "hidden !important"
      }));
    };
    this.buildCursorHide = function() {
      var stylesMap = {
        "cursor": "none !important"
      };
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.cursorHide), stylesMap));
    };
    this.buildStylesCompatibility = function(attribute, value) {
      var styleString = "";
      if (true) {
        styleString += "-moz-".concat(attribute, ": ").concat(value, ";");
        styleString += "-ms-".concat(attribute, ": ").concat(value, ";");
        styleString += "-o-".concat(attribute, ": ").concat(value, ";");
      }
      styleString += "".concat(attribute, ": ").concat(value, ";");
      return styleString;
    };
    this.options = options;
    this.identifiersId = identifiersId;
    this.identifiersClass = identifiersClass;
    this.actions = actions;
  }
  Styles2.prototype.build = function() {
    this.buildClass();
    this.buildId();
    this.applyVideo();
    this.buildActions();
    this.buildFading();
    this.buildCursorHide();
    this.setStyles();
  };
  Styles2.prototype.buildClass = function() {
    this.classAll();
    this.classButtons();
    this.classIcons();
  };
  Styles2.prototype.buildId = function() {
    this.idContainer();
    this.idTop();
    this.idMiddle();
    this.idBottom();
  };
  Styles2.prototype.buildActions = function() {
    this.actionsTime();
    this.actionsRangerProguessContainer();
    this.actionsRangerProguessInput();
    this.actionsRangerProguessProguess();
  };
  Styles2.prototype.parseStyles = function(styleId, styleMap) {
    var styleString = "";
    styleString += "".concat(styleId, " {");
    for (var key in styleMap) {
      if (styleMap.hasOwnProperty(key)) {
        styleString += this.buildStylesCompatibility(key, styleMap[key]);
      }
    }
    styleString += "}";
    return styleString;
  };
  Styles2.prototype.parseStylesMedia = function(styleId, extra) {
    var styleString = "";
    extra.forEach(function(property) {
      styleString += "@media (max-width: 480px) {";
      styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMax, "; }");
      styleString += "}";
      styleString += "@media (max-width: 360px) {";
      styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMiddle, "; }");
      styleString += "}";
      styleString += "@media (max-width: 240px) {";
      styleString += "".concat(styleId, " { ").concat(property.attribute, ": ").concat(property.valueMin, "; }");
      styleString += "}";
    });
    return styleString;
  };
  Styles2.prototype.addStyles = function(stringStyle) {
    this.allStyles += stringStyle;
  };
  Styles2.prototype.setStyles = function() {
    var headElement = document.head;
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = this.allStyles;
    headElement.appendChild(style);
  };
  return Styles2;
}();
var styles_default = Styles;

// build/wvp.js
var WVP = function() {
  function WVP2(apply, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
    var optionsClear = {
      settings: {},
      show: {},
      style: {}
    };
    if (!apply) {
      new io_error_default("Error apply(); not defined!");
    }
    if (options) {
      Object.keys(options).forEach(function(key) {
        var value = options[key];
        if (value !== null && value !== "") {
          optionsClear[key] = value;
        }
      });
    }
    this.options = {
      apply: apply,
      settings: {
        autoplay: (_b = (_a = optionsClear.settings) === null || _a === void 0 ? void 0 : _a.autoplay) !== null && _b !== void 0 ? _b : true,
        muted: (_d = (_c = optionsClear.settings) === null || _c === void 0 ? void 0 : _c.muted) !== null && _d !== void 0 ? _d : false
      },
      show: {
        titleTop: (_f = (_e = optionsClear.show) === null || _e === void 0 ? void 0 : _e.titleTop) !== null && _f !== void 0 ? _f : false,
        playPause: (_h = (_g = optionsClear.show) === null || _g === void 0 ? void 0 : _g.playPause) !== null && _h !== void 0 ? _h : true,
        playPauseCenter: (_k = (_j = optionsClear.show) === null || _j === void 0 ? void 0 : _j.playPauseCenter) !== null && _k !== void 0 ? _k : true,
        fullscreen: (_m = (_l = optionsClear.show) === null || _l === void 0 ? void 0 : _l.fullscreen) !== null && _m !== void 0 ? _m : true,
        pictureInPicture: (_p = (_o = optionsClear.show) === null || _o === void 0 ? void 0 : _o.pictureInPicture) !== null && _p !== void 0 ? _p : true,
        volume: (_r = (_q = optionsClear.show) === null || _q === void 0 ? void 0 : _q.volume) !== null && _r !== void 0 ? _r : true,
        rangerVolume: (_t = (_s = optionsClear.show) === null || _s === void 0 ? void 0 : _s.rangerVolume) !== null && _t !== void 0 ? _t : true,
        durationTime: (_v = (_u = optionsClear.show) === null || _u === void 0 ? void 0 : _u.durationTime) !== null && _v !== void 0 ? _v : true,
        currentTime: (_x = (_w = optionsClear.show) === null || _w === void 0 ? void 0 : _w.currentTime) !== null && _x !== void 0 ? _x : true,
        rangerProguess: (_z = (_y = optionsClear.show) === null || _y === void 0 ? void 0 : _y.rangerProguess) !== null && _z !== void 0 ? _z : true
      },
      style: {
        titleTag: (_1 = (_0 = optionsClear.style) === null || _0 === void 0 ? void 0 : _0.titleTag) !== null && _1 !== void 0 ? _1 : null,
        backgroundColor: (_3 = (_2 = optionsClear.style) === null || _2 === void 0 ? void 0 : _2.backgroundColor) !== null && _3 !== void 0 ? _3 : "#000000",
        colorInactive: (_5 = (_4 = optionsClear.style) === null || _4 === void 0 ? void 0 : _4.colorInactive) !== null && _5 !== void 0 ? _5 : "#FFFFFF",
        colorActive: (_7 = (_6 = optionsClear.style) === null || _6 === void 0 ? void 0 : _6.colorActive) !== null && _7 !== void 0 ? _7 : "#007AFF",
        shadow: (_9 = (_8 = optionsClear.style) === null || _8 === void 0 ? void 0 : _8.shadow) !== null && _9 !== void 0 ? _9 : true
      }
    };
    this.identifiersId = {
      container: "wvp__container",
      top: "wvp__top",
      middle: "wvp__middle",
      bottom: "wvp__bottom"
    };
    this.identifiersClass = {
      all: "wvp_all",
      buttons: "wvp__buttons",
      icons: "wvp__icons",
      fading: "wvp__fading",
      cursorHide: "wvp__cursor_hide"
    };
    this.actions = {
      playPause: "wvp__button__play_pause",
      fullscreen: "wvp__button__fullscreen",
      pictureInPicture: "wvp__button__picture_in_picture",
      volume: "wvp__button__volume",
      rangerVolumeContainer: "wvp__button__ranger_volume_container",
      rangerVolumeInput: "wvp__button__ranger_volume_input",
      rangerVolumeProguess: "wvp__button__ranger_volume_background",
      durationTime: "wvp__button__duration_time",
      currentTime: "wvp__button__current_time",
      rangerProguessContainer: "wvp__button__ranger_proguess_container",
      rangerProguessInput: "wvp__button__ranger_proguess_input",
      rangerProguessProguess: "wvp__button__ranger_proguess_background"
    };
    this.elements = new elements_default(this.options, this.identifiersId, this.identifiersClass, this.actions);
    this.styles = new styles_default(this.options, this.identifiersId, this.identifiersClass, this.actions);
    this.init();
  }
  WVP2.prototype.init = function() {
    this.elements.build();
    this.styles.build();
  };
  return WVP2;
}();
//# sourceMappingURL=wvp.js.map
