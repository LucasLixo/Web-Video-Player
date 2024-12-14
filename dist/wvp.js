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
  function Controls2(elementContainer, elementVideo, options, actions, iconsPath) {
    var _this = this;
    var _a;
    this.buildConfig = function() {
      _this.elementVideo.removeAttribute("controls");
      _this.elementVideo.controls = false;
      _this.elementVideo.currentTime = _this.controls.current;
    };
    this.buildPlayPause = function() {
      var buttonsPlayPause = document.querySelectorAll('button[action="' + "".concat(_this.actions.playPause) + '"]');
      if (buttonsPlayPause.length === 0) {
        new io_error_default("Is empty Play/Pause.");
        return;
      }
      function handlePlayPause(videoElement) {
        if (videoElement.paused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }
      ;
      _this.elementVideo.addEventListener("pause", function() {
        _this.controls.playing = false;
        buttonsPlayPause.forEach(function(button) {
          var svgPath = button.querySelector("svg > path");
          if (svgPath) {
            svgPath.setAttribute("d", _this.iconsPath.play);
          }
        });
      });
      _this.elementVideo.addEventListener("play", function() {
        _this.controls.playing = true;
        buttonsPlayPause.forEach(function(button) {
          var svgPath = button.querySelector("svg > path");
          if (svgPath) {
            svgPath.setAttribute("d", _this.iconsPath.pause);
          }
        });
      });
      _this.elementVideo.addEventListener("click", function() {
        handlePlayPause(_this.elementVideo);
      });
      buttonsPlayPause.forEach(function(button) {
        button.addEventListener("click", function() {
          handlePlayPause(_this.elementVideo);
        });
      });
    };
    this.buildFullscreen = function() {
      var buttonFullscreen = document.querySelector('button[action="' + "".concat(_this.actions.fullscreen) + '"]');
      var svgFullscreen = buttonFullscreen.querySelector("svg > path");
      buttonFullscreen.addEventListener("click", function() {
        if (!_this.controls.fullscreen) {
          _this.controls.fullscreen = true;
          if (_this.elementContainer.requestFullscreen) {
            _this.elementContainer.requestFullscreen();
          } else if (_this.elementContainer.mozRequestFullScreen) {
            _this.elementContainer.mozRequestFullScreen();
          } else if (_this.elementContainer.webkitRequestFullScreen) {
            _this.elementContainer.webkitRequestFullScreen();
          } else if (_this.elementContainer.msRequestFullscreen) {
            _this.elementContainer.msRequestFullscreen();
          }
          svgFullscreen.setAttribute("d", _this.iconsPath.fullscreenOn);
        } else {
          _this.controls.fullscreen = false;
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          svgFullscreen.setAttribute("d", _this.iconsPath.fullscreenOff);
        }
      });
    };
    this.buildPictureInPicture = function() {
      var buttonPictureInPicture = document.querySelector('button[action="' + "".concat(_this.actions.pictureInPicture) + '"]');
      buttonPictureInPicture.addEventListener("click", function() {
        if (_this.elementVideo.requestPictureInPicture) {
          _this.elementVideo.requestPictureInPicture();
        }
      });
    };
    this.buildVolume = function() {
      var buttonVolume = document.querySelector('button[action="' + "".concat(_this.actions.volume) + '"]');
      var svgVolume = buttonVolume.querySelector("svg > path");
      buttonVolume.addEventListener("click", function() {
        if (_this.elementVideo.muted || _this.elementVideo.volume === 0) {
          _this.elementVideo.muted = false;
          _this.elementVideo.volume = 1;
          svgVolume.setAttribute("d", _this.iconsPath.volumeOn);
        } else {
          _this.elementVideo.muted = true;
          _this.elementVideo.volume = 0;
          svgVolume.setAttribute("d", _this.iconsPath.volumeOff);
        }
      });
    };
    this.buildRangerVolume = function() {
    };
    this.buildDurationTime = function() {
      var durationTime = document.querySelector('p[action="' + "".concat(_this.actions.durationTime) + '"]');
      durationTime.innerHTML = _this.controls.durationTime;
    };
    this.buildCurrentTime = function() {
      var currentTime = document.querySelector('p[action="' + "".concat(_this.actions.currentTime) + '"]');
      _this.elementVideo.addEventListener("timeupdate", function() {
        var _a2, _b;
        _this.controls.currentTime = _this.formatTime((_a2 = _this.elementVideo.currentTime) !== null && _a2 !== void 0 ? _a2 : 0);
        _this.controls.current = (_b = _this.elementVideo.currentTime) !== null && _b !== void 0 ? _b : 0;
        currentTime.innerHTML = _this.controls.currentTime;
      });
    };
    this.buildRangerProguess = function() {
      var rangerProguess = document.querySelector('div[action="' + "".concat(_this.actions.rangerProguess) + '"]');
      var rangerProguessPoint = document.querySelector('div[action="' + "".concat(_this.actions.rangerProguessPoint) + '"]');
      _this.elementVideo.addEventListener("timeupdate", function() {
        var currentTime = _this.elementVideo.currentTime;
        var duration = _this.elementVideo.duration;
        var progressPercentage = currentTime / duration * 100;
        rangerProguess.setAttribute("style", "width: ".concat(progressPercentage, "%;"));
        rangerProguessPoint.setAttribute("style", "left: calc(".concat(progressPercentage, "% - 1%);"));
      });
    };
    this.elementContainer = elementContainer;
    this.elementVideo = elementVideo;
    this.actions = actions;
    this.iconsPath = iconsPath;
    this.controls = {
      playing: options.autoplay,
      fullscreen: false,
      pictureInPicture: false,
      volume: !options.muted,
      rangerVolume: options.muted ? 0 : 1,
      durationTime: this.formatTime((_a = this.elementVideo.duration) !== null && _a !== void 0 ? _a : 0),
      currentTime: this.formatTime(0),
      duration: this.elementVideo.duration,
      current: 0
    };
    this.build();
  }
  Controls2.prototype.build = function() {
    this.buildConfig();
    this.buildPlayPause();
    this.buildFullscreen();
    this.buildPictureInPicture();
    this.buildVolume();
    this.buildRangerVolume();
    this.buildDurationTime();
    this.buildCurrentTime();
    this.buildRangerProguess();
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
      if (_this.options.top != null) {
        elementTop.innerHTML = _this.options.top;
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
        new controls_default(elementContainer, elementVideo, _this.options, _this.actions, _this.iconsPath);
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
    elementBottom.appendChild(pCurrent);
  };
  Elements2.prototype.buildRangerProguess = function(elementBottom) {
    var divRangerProguessContainer = document.createElement("div");
    divRangerProguessContainer.setAttribute("id", this.actions.rangerProguessContainer);
    elementBottom.appendChild(divRangerProguessContainer);
    var divRangerProguess = document.createElement("div");
    divRangerProguess.setAttribute("id", this.actions.rangerProguess);
    divRangerProguess.setAttribute("action", this.actions.rangerProguess);
    divRangerProguessContainer.appendChild(divRangerProguess);
    var divRangerProguessPoint = document.createElement("div");
    divRangerProguessPoint.setAttribute("id", this.actions.rangerProguessPoint);
    divRangerProguessPoint.setAttribute("action", this.actions.rangerProguessPoint);
    divRangerProguessContainer.appendChild(divRangerProguessPoint);
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
        "background": "transparent"
      };
      _this.addStyles(_this.parseStyles(".".concat(_this.identifiersClass.buttons), stylesMap));
    };
    this.classIcons = function() {
      var stylesMap = {
        "display": "block",
        "margin": "auto",
        "fill": _this.options.colorInactive,
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
        "background-color": _this.options.backgroundColor
      };
      _this.addStyles(_this.parseStyles(_this.options.apply, stylesMap));
    };
    this.idContainer = function() {
      var stylesMap = {
        "position": "relative",
        "display": "block",
        "max-width": "100%",
        "min-width": "240px",
        "height": "fit-content"
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
        "background": "linear-gradient(to bottom, black, transparent)"
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
        "background": _this.options.colorActive,
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
        "background": "linear-gradient(to top, black, transparent)",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-items": "center"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom), stylesMap));
      _this.addStyles(_this.parseStyles("#".concat(_this.identifiersId.bottom, " button, #").concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.currentTime), {
        "margin": "0 0.2rem 0 0.2rem"
      }));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.identifiersId.bottom, " button, #").concat(_this.actions.rangerProguessContainer, ", #").concat(_this.actions.durationTime), [
        { attribute: "margin", valueMax: "0 0.2rem 0 0.2rem", valueMiddle: "0 0.1rem 0 0.1rem", valueMin: "0 0.1rem 0 0.1rem" }
      ]));
    };
    this.actionsTime = function() {
      var stylesMap = {
        "font-family": "inherit",
        "font-size": "1rem",
        "font-weight": "bold"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.durationTime, ", #").concat(_this.actions.currentTime), stylesMap));
    };
    this.actionsRangerProguessContainer = function() {
      var stylesMap = {
        "position": "relative",
        "display": "block",
        "width": "100%",
        "height": "0.5rem",
        "background": "#CBCBCB",
        "border-radius": "1rem",
        "cursor": "pointer",
        "overflow": "visible"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessContainer), stylesMap));
      _this.addStyles(_this.parseStylesMedia("#".concat(_this.actions.rangerProguessContainer), [
        { attribute: "height", valueMax: "0.4rem", valueMiddle: "0.3rem", valueMin: "0.2rem" }
      ]));
    };
    this.actionsRangerProguess = function() {
      var stylesMap = {
        "position": "absolute",
        "top": "0",
        "bottom": "0",
        "left": "0",
        "display": "block",
        "width": "33%",
        "height": "100%",
        "border-radius": "1rem",
        "background": _this.options.colorActive,
        "cursor": "pointer",
        "pointer-events": "none",
        "transition": "width 0.1s linear"
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguess), stylesMap));
    };
    this.actionsRangerProguessPoint = function() {
      var stylesMap = {
        "position": "absolute",
        "display": "block",
        "top": "0",
        "bottom": "0",
        "transform": "translate(0%, -25%)",
        "left": "calc(33% - 1%)",
        "width": "1.2rem",
        "height": "1.2rem",
        "background": _this.options.colorInactive,
        "border-radius": "100%",
        "cursor": "pointer",
        "pointer-events": "none",
        "z-index": _this.indexStyles.toString()
      };
      _this.addStyles(_this.parseStyles("#".concat(_this.actions.rangerProguessPoint), stylesMap));
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
    this.actionsRangerProguess();
    this.actionsRangerProguessPoint();
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
    var _a, _b, _c, _d, _e, _f;
    if (options == void 0) {
      options = {};
    }
    this.options = {
      apply: apply,
      backgroundColor: (_a = options["backgroundColor"]) !== null && _a !== void 0 ? _a : "transparent",
      colorInactive: (_b = options["colorInactive"]) !== null && _b !== void 0 ? _b : "#FFFFFF",
      colorActive: (_c = options["colorActive"]) !== null && _c !== void 0 ? _c : "#007AFF",
      autoplay: (_d = options["autoplay"]) !== null && _d !== void 0 ? _d : true,
      muted: (_e = options["muted"]) !== null && _e !== void 0 ? _e : true,
      top: (_f = options["top"]) !== null && _f !== void 0 ? _f : null
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
      icons: "wvp__icons"
    };
    this.actions = {
      playPause: "wvp__button__play_pause",
      fullscreen: "wvp__button__fullscreen",
      pictureInPicture: "wvp__button__picture_in_picture",
      volume: "wvp__button__volume",
      rangerVolumeContainer: "wvp__button__ranger_volume_container",
      rangerVolume: "wvp__button__ranger_volume",
      rangerVolumePoint: "wvp__button__ranger_volume_point",
      durationTime: "wvp__button__duration_time",
      currentTime: "wvp__button__current_time",
      rangerProguessContainer: "wvp__button__ranger_proguess_container",
      rangerProguess: "wvp__button__ranger_proguess",
      rangerProguessPoint: "wvp__button__ranger_proguess_point"
    };
    this.elements = new elements_default(this.options, this.identifiersId, this.identifiersClass, this.actions);
    this.styles = new styles_default(this.options, this.identifiersId, this.identifiersClass, this.actions);
    this.init();
  }
  Object.defineProperty(WVP2.prototype, "backgroundColor", {
    get: function() {
      return this.options.backgroundColor;
    },
    set: function(value) {
      if (this.options.backgroundColor == value)
        return;
      this.options.backgroundColor = value;
      new io_error_default("Error backgroundColor(); not suport!");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "colorInactive", {
    get: function() {
      return this.options.colorInactive;
    },
    set: function(value) {
      if (this.options.colorInactive == value)
        return;
      this.options.colorInactive = value;
      new io_error_default("Error colorInactive(); not suport!");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "colorActive", {
    get: function() {
      return this.options.colorActive;
    },
    set: function(value) {
      if (this.options.colorActive == value)
        return;
      this.options.colorActive = value;
      new io_error_default("Error colorActive(); not suport!");
    },
    enumerable: false,
    configurable: true
  });
  WVP2.prototype.init = function() {
    this.elements.build();
    this.styles.build();
  };
  return WVP2;
}();
