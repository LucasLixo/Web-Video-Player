"./interfaces/options";

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
  function Controls2(elementContainer, elementVideo, options) {
    this.formatTime = function(seconds) {
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
    this.elementContainer = elementContainer;
    this.elementVideo = elementVideo;
    this.buttons = options.buttons;
    this.pathIcons = options.pathIcons;
    this.controls = {
      playing: options.autoplay,
      fullscreen: false,
      pictureInPicture: false,
      volume: !options.muted,
      rangerVolume: options.muted ? 0 : 1,
      rangerProguess: 0,
      duration: this.formatTime(0),
      currentTime: 0
    };
    this.elementVideo.removeAttribute("controls");
    elementVideo.controls = false;
    this.controls.duration = this.formatTime(this.elementVideo.duration);
    this.elementVideo.currentTime = this.controls.currentTime;
    this.togglePlayPause();
    this.duration();
    this.rangerVolume();
    this.toggleVolume();
    this.pictureInPicture();
    this.fullscreen();
  }
  Controls2.prototype.togglePlayPause = function() {
    var _this = this;
    var buttonsPlayPause = document.querySelectorAll('button[key="' + "".concat(this.buttons.playPause) + '"]');
    if (buttonsPlayPause.length === 0) {
      new io_error_default("Is empty Play/Pause.");
      return;
    }
    var handlePlayPause = function(videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    };
    this.elementVideo.addEventListener("pause", function() {
      _this.controls.playing = false;
      buttonsPlayPause.forEach(function(button) {
        var svgPath = button.querySelector("svg > path");
        if (svgPath) {
          svgPath.setAttribute("d", _this.pathIcons.play);
        }
      });
    });
    this.elementVideo.addEventListener("play", function() {
      _this.controls.playing = true;
      buttonsPlayPause.forEach(function(button) {
        var svgPath = button.querySelector("svg > path");
        if (svgPath) {
          svgPath.setAttribute("d", _this.pathIcons.pause);
        }
      });
    });
    this.elementVideo.addEventListener("click", function() {
      handlePlayPause(_this.elementVideo);
    });
    buttonsPlayPause.forEach(function(button) {
      button.addEventListener("click", function() {
        handlePlayPause(_this.elementVideo);
      });
    });
  };
  Controls2.prototype.duration = function() {
    var pDuration = document.querySelector('p[key="' + "".concat(this.buttons.duration) + '"]');
    pDuration.innerHTML = this.controls.duration;
  };
  Controls2.prototype.rangerVolume = function() {
    var _this = this;
    var rangerProguess = document.querySelector('div[key="' + "".concat(this.buttons.volume) + '"]');
    var rangerProguessPoint = document.querySelector('div[key="' + "".concat(this.buttons.volume) + '"]');
    this.elementVideo.addEventListener("timeupdate", function() {
      var currentTime = _this.elementVideo.currentTime;
      var duration = _this.elementVideo.duration;
      var progressPercentage = currentTime / duration * 100;
      rangerProguess.setAttribute("style", "width: ".concat(progressPercentage, "%;"));
      rangerProguessPoint.setAttribute("style", "left: calc(".concat(progressPercentage, "% - 1%);"));
      _this.controls.currentTime = currentTime;
      _this.controls.rangerProguess = progressPercentage;
    });
  };
  Controls2.prototype.toggleVolume = function() {
    var _this = this;
    var buttonVolume = document.querySelector('button[key="' + "".concat(this.buttons.volume) + '"]');
    var svgVolume = buttonVolume.querySelector("svg > path");
    buttonVolume.addEventListener("click", function() {
      if (_this.elementVideo.muted || _this.elementVideo.volume === 0) {
        _this.elementVideo.muted = false;
        _this.elementVideo.volume = 1;
        svgVolume.setAttribute("d", _this.pathIcons.volumeOn);
      } else {
        _this.elementVideo.muted = true;
        _this.elementVideo.volume = 0;
        svgVolume.setAttribute("d", _this.pathIcons.volumeOff);
      }
    });
  };
  Controls2.prototype.pictureInPicture = function() {
    var _this = this;
    var buttonPictureInPicture = document.querySelector('button[key="' + "".concat(this.buttons.pictureInPicture) + '"]');
    buttonPictureInPicture.addEventListener("click", function() {
      if (_this.elementVideo.requestPictureInPicture) {
        _this.elementVideo.requestPictureInPicture();
      }
    });
  };
  Controls2.prototype.fullscreen = function() {
    var _this = this;
    var buttonFullscreen = document.querySelector('button[key="' + "".concat(this.buttons.fullscreen) + '"]');
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
        svgFullscreen.setAttribute("d", _this.pathIcons.fullscreenOn);
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
        svgFullscreen.setAttribute("d", _this.pathIcons.fullscreenOff);
      }
    });
  };
  return Controls2;
}();
var controls_default = Controls;

// build/class/elements.js
var Elements = function() {
  function Elements2(options, identifiers, buttons) {
    this.options = options;
    this.identifiers = identifiers;
    this.buttons = buttons;
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
      var elementContainer = document.createElement("div");
      var parentElement = elementVideo.parentElement;
      if (parentElement == null) {
        new io_error_default("Error parentElement is null");
      }
      elementVideo.addEventListener("contextmenu", function(event) {
        return event.preventDefault();
      });
      elementContainer.setAttribute("id", _this.identifiers.container);
      parentElement.insertBefore(elementContainer, elementVideo);
      elementContainer.appendChild(elementVideo);
      _this.buildTop(elementContainer);
      _this.buildMiddle(elementContainer);
      _this.buildBottom(elementContainer);
      try {
        new controls_default(elementContainer, elementVideo, { buttons: _this.buttons, pathIcons: _this.iconsPath, autoplay: _this.options.autoplay, muted: _this.options.muted });
      } catch (error) {
        new io_error_default("Error build Controls: ".concat(error));
      }
    });
  };
  Elements2.prototype.buildTop = function(elementContainer) {
    var elementTop = document.createElement("div");
    elementTop.setAttribute("id", this.identifiers.top);
    elementContainer.appendChild(elementTop);
    if (this.options.top != null) {
      elementTop.innerHTML = this.options.top;
    }
  };
  Elements2.prototype.buildMiddle = function(elementContainer) {
    var elementMiddle = document.createElement("button");
    elementMiddle.setAttribute("id", this.identifiers.middle);
    elementMiddle.setAttribute("class", this.identifiers.buttons);
    elementMiddle.setAttribute("key", this.buttons.playPause);
    elementContainer.appendChild(elementMiddle);
    elementMiddle.innerHTML = this.buildIcon(this.iconsPath.play);
  };
  Elements2.prototype.buildBottom = function(elementContainer) {
    var elementBottom = document.createElement("div");
    elementBottom.setAttribute("id", this.identifiers.bottom);
    elementContainer.appendChild(elementBottom);
    var buttonPlayPause = document.createElement("button");
    buttonPlayPause.setAttribute("class", this.identifiers.buttons);
    buttonPlayPause.setAttribute("key", this.buttons.playPause);
    buttonPlayPause.innerHTML = this.buildIcon(this.iconsPath.play);
    elementBottom.appendChild(buttonPlayPause);
    var divRangerVolume = document.createElement("div");
    divRangerVolume.setAttribute("id", this.identifiers.rangerVolume);
    elementBottom.appendChild(divRangerVolume);
    var divRangerProguess = document.createElement("div");
    divRangerProguess.setAttribute("id", this.identifiers.rangerProguess);
    divRangerProguess.setAttribute("key", this.buttons.rangerProguess);
    divRangerVolume.appendChild(divRangerProguess);
    var divRangerProguessPoint = document.createElement("div");
    divRangerProguessPoint.setAttribute("id", this.identifiers.rangerProguessPoint);
    divRangerProguessPoint.setAttribute("key", this.buttons.rangerProguessPoint);
    divRangerVolume.appendChild(divRangerProguessPoint);
    var buttonDuration = document.createElement("p");
    buttonDuration.setAttribute("class", this.identifiers.duration);
    buttonDuration.setAttribute("key", this.buttons.duration);
    elementBottom.appendChild(buttonDuration);
    var buttonVolume = document.createElement("button");
    buttonVolume.setAttribute("class", this.identifiers.buttons);
    buttonVolume.setAttribute("key", this.buttons.volume);
    buttonVolume.innerHTML = this.buildIcon(this.iconsPath.volumeOn);
    elementBottom.appendChild(buttonVolume);
    var buttonPictureInPicture = document.createElement("button");
    buttonPictureInPicture.setAttribute("class", this.identifiers.buttons);
    buttonPictureInPicture.setAttribute("key", this.buttons.pictureInPicture);
    buttonPictureInPicture.innerHTML = this.buildIcon(this.iconsPath.pictureInPicture);
    elementBottom.appendChild(buttonPictureInPicture);
    var buttonFullscreen = document.createElement("button");
    buttonFullscreen.setAttribute("class", this.identifiers.buttons);
    buttonFullscreen.setAttribute("key", this.buttons.fullscreen);
    buttonFullscreen.innerHTML = this.buildIcon(this.iconsPath.fullscreenOff);
    elementBottom.appendChild(buttonFullscreen);
  };
  Elements2.prototype.buildIcon = function(pathIcon) {
    var icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" id="'.concat(this.identifiers.icons, '">');
    icon += '<path d="'.concat(pathIcon, '" />');
    icon += "</svg>";
    return icon;
  };
  return Elements2;
}();
var elements_default = Elements;

// build/enums/styles.js
var styles;
(function(styles2) {
  styles2[styles2["all"] = 0] = "all";
  styles2[styles2["video"] = 1] = "video";
  styles2[styles2["container"] = 2] = "container";
  styles2[styles2["top"] = 3] = "top";
  styles2[styles2["middle"] = 4] = "middle";
  styles2[styles2["bottom"] = 5] = "bottom";
  styles2[styles2["duration"] = 6] = "duration";
  styles2[styles2["rangerVolume"] = 7] = "rangerVolume";
  styles2[styles2["buttons"] = 8] = "buttons";
  styles2[styles2["icons"] = 9] = "icons";
})(styles || (styles = {}));

// build/class/styles.js
var Styles = function() {
  function Styles2(options, identifiers) {
    this.containerStyle = document.head;
    this.identifiers = identifiers;
    this.options = options;
    this.arrayIdentifiers = [
      this.identifiers.all,
      this.identifiers.video,
      this.identifiers.container,
      this.identifiers.top,
      this.identifiers.middle,
      this.identifiers.bottom,
      this.identifiers.duration,
      this.identifiers.rangerVolume,
      this.identifiers.icons,
      this.identifiers.buttons
    ];
  }
  Styles2.prototype.build = function() {
    for (var index = 0; index < this.arrayIdentifiers.length; index++) {
      var identifier = this.arrayIdentifiers[index];
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("key", identifier);
      this.containerStyle.appendChild(style);
    }
    this.applyAllStyles();
    this.applyVideoStyles();
    this.applyContainerStyles();
    this.applyTopStyles();
    this.applyMiddleStyles();
    this.applyBottomStyles();
    this.applyDurationStyles();
    this.applyRangerVolumeStyles();
    this.applyRangerProguessStyles();
    this.applyRangerProguessPointStyles();
    this.applyIconsStyles();
    this.applyButtonStyles();
  };
  Styles2.prototype.applyAllStyles = function() {
    var identifierElement = "".concat(this.identifiers.video, ", #").concat(this.identifiers.container, ", #").concat(this.identifiers.top, ", #").concat(this.identifiers.middle, ", #").concat(this.identifiers.bottom);
    var stylesMap = {
      "margin": "0",
      "padding": "0",
      "box-sizing": "inherit",
      "text-shadow": "none",
      "direction": "ltr"
    };
    this.setStyles(styles.all, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyVideoStyles = function() {
    var identifierElement = this.identifiers.video;
    var stylesMap = {
      "display": "block",
      "width": "100%",
      "height": "100%",
      "z-index": "-99",
      "background-color": this.options.backgroundColor
    };
    this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyContainerStyles = function() {
    var identifierElement = "#".concat(this.identifiers.container);
    var stylesMap = {
      "position": "relative",
      "display": "block",
      "max-width": "100%",
      "min-width": "240px",
      "height": "fit-content"
    };
    this.setStyles(styles.container, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyTopStyles = function() {
    var identifierElement = "#".concat(this.identifiers.top);
    var stylesMap = {
      "position": "absolute",
      "display": "block",
      "width": "100%",
      "height": "fit-content",
      "right": "0",
      "left": "0",
      "top": "0",
      "z-index": "99",
      "padding": "1rem",
      "background": "linear-gradient(to bottom, black, transparent)"
    };
    this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyMiddleStyles = function() {
    var identifierElement = "#".concat(this.identifiers.middle);
    var stylesMap = {
      "position": "absolute",
      "width": "3rem",
      "height": "3rem",
      "top": "50%",
      "left": "50%",
      "z-index": "99",
      "transform": "translate(-50%, -50%)",
      "background": this.options.colorActive,
      "border-radius": "100%"
    };
    this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));
    this.addStyles(styles.middle, this.parseStyles("".concat(identifierElement), {
      "height": "2.7rem"
    }, {
      before: "@media (max-width: 480px) {",
      after: "}"
    }));
    this.addStyles(styles.middle, this.parseStyles("".concat(identifierElement), {
      "height": "2.5rem"
    }, {
      before: "@media (max-width: 360px) {",
      after: "}"
    }));
  };
  Styles2.prototype.applyBottomStyles = function() {
    var identifierElement = "#".concat(this.identifiers.bottom);
    var stylesMap = {
      "position": "absolute",
      "display": "flex",
      "width": "100%",
      "height": "fit-content",
      "right": "0",
      "left": "0",
      "bottom": "0",
      "z-index": "99",
      "padding": "1rem",
      "background": "linear-gradient(to top, black, transparent)",
      "flex-direction": "row",
      "justify-content": "space-between",
      "align-items": "center"
    };
    this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
    this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement), {
      "height": "1.7rem"
    }, {
      before: "@media (max-width: 480px) {",
      after: "}"
    }));
    this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement), {
      "height": "1.5rem"
    }, {
      before: "@media (max-width: 360px) {",
      after: "}"
    }));
    this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
      "margin-left": "0.3rem",
      "margin-right": "0.3rem"
    }));
    this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
      "margin-left": "0.2rem",
      "margin-right": "0.2rem"
    }, {
      before: "@media (max-width: 480px) {",
      after: "}"
    }));
    this.addStyles(styles.bottom, this.parseStyles("".concat(identifierElement, " button, ").concat(identifierElement, " p"), {
      "margin-left": "0.1rem",
      "margin-right": "0.1rem"
    }, {
      before: "@media (max-width: 360px) {",
      after: "}"
    }));
  };
  Styles2.prototype.applyDurationStyles = function() {
    var identifierElement = "#".concat(this.identifiers.duration);
    var stylesMap = {
      "font-family": "inherit",
      "font-size": "2.5rem",
      "font-weight": "bold"
    };
    this.setStyles(styles.duration, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyRangerVolumeStyles = function() {
    var identifierElement = "#".concat(this.identifiers.rangerVolume);
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
    this.setStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
    this.addStyles(styles.rangerVolume, this.parseStyles("".concat(identifierElement), {
      "height": "0.4rem"
    }, {
      before: "@media (max-width: 480px) {",
      after: "}"
    }));
    this.addStyles(styles.rangerVolume, this.parseStyles("".concat(identifierElement), {
      "height": "0.3rem"
    }, {
      before: "@media (max-width: 360px) {",
      after: "}"
    }));
  };
  Styles2.prototype.applyRangerProguessStyles = function() {
    var identifierElement = "#".concat(this.identifiers.rangerProguess);
    var stylesMap = {
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "display": "block",
      "width": "33%",
      "height": "100%",
      "border-radius": "1rem",
      "background": this.options.colorActive,
      "cursor": "pointer",
      "pointer-events": "none",
      "transition": "width 0.1s linear"
    };
    this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyRangerProguessPointStyles = function() {
    var identifierElement = "#".concat(this.identifiers.rangerProguessPoint);
    var stylesMap = {
      "position": "absolute",
      "display": "block",
      "top": "0",
      "bottom": "0",
      "transform": "translate(0%, -25%)",
      "left": "calc(33% - 1%)",
      "width": "1.2rem",
      "height": "1.2rem",
      "background": this.options.colorInactive,
      "border-radius": "100%",
      "cursor": "pointer",
      "pointer-events": "none",
      "z-index": "99"
    };
    this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyButtonStyles = function() {
    var identifierElement = ".".concat(this.identifiers.buttons);
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
    this.setStyles(styles.buttons, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyIconsStyles = function() {
    var identifierElement = "#".concat(this.identifiers.icons);
    var stylesMap = {
      "display": "block",
      "margin": "auto",
      "fill": this.options.colorInactive,
      "width": "2rem",
      "height": "2rem"
    };
    this.setStyles(styles.icons, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.parseStyles = function(styleId, styleMap, extra) {
    var styleString = "";
    if (extra) {
      styleString += extra.before;
    }
    styleString += "".concat(styleId, " {");
    for (var key in styleMap) {
      if (styleMap.hasOwnProperty(key)) {
        if (true) {
          styleString += "-moz-".concat(key, ": ").concat(styleMap[key], ";");
          styleString += "-ms-".concat(key, ": ").concat(styleMap[key], ";");
          styleString += "-o-".concat(key, ": ").concat(styleMap[key], ";");
        }
        styleString += "".concat(key, ": ").concat(styleMap[key], ";");
      }
    }
    styleString += "}";
    if (extra) {
      styleString += extra.after;
    }
    return styleString;
  };
  Styles2.prototype.setStyles = function(watchStyle, stringStyle) {
    var identifier = this.arrayIdentifiers[watchStyle];
    var styleElement = document.querySelector('style[key="' + identifier + '"]');
    if (styleElement == null) {
      new io_error_default('Error: style[key="' + identifier + "\"] doesn't exist!");
    }
    styleElement.innerHTML = stringStyle;
  };
  Styles2.prototype.addStyles = function(watchStyle, stringStyle) {
    var identifier = this.arrayIdentifiers[watchStyle];
    var styleElement = document.querySelector('style[key="' + identifier + '"]');
    if (styleElement == null) {
      new io_error_default('Error: style[key="' + identifier + "\"] doesn't exist!");
    }
    styleElement.innerHTML += stringStyle;
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
    this.identifiers = {
      all: "wvp_all",
      video: apply,
      container: "wvp__container",
      top: "wvp__top",
      middle: "wvp__middle",
      bottom: "wvp__bottom",
      duration: "wvp__duration",
      rangerVolume: "wvp__ranger_volume",
      rangerProguess: "wvp__ranger_proguess",
      rangerProguessPoint: "wvp__ranger_proguess_point",
      icons: "wvp__icons",
      buttons: "wvp__buttons"
    };
    this.buttons = {
      playPause: "wvp__button__play_pause",
      fullscreen: "wvp__button__fullscreen",
      pictureInPicture: "wvp__button__picture_in_picture",
      volume: "wvp__button__volume",
      duration: "wvp__button__duration",
      rangerVolume: "wvp__button__ranger_volume",
      rangerProguess: "wvp__button__ranger_proguess",
      rangerProguessPoint: "wvp__button__ranger_proguess_point"
    };
    this.styles = new styles_default(this.options, this.identifiers);
    this.elements = new elements_default(this.options, this.identifiers, this.buttons);
    this.init();
  }
  Object.defineProperty(WVP2.prototype, "colorInactive", {
    get: function() {
      return this.options.colorInactive;
    },
    set: function(value) {
      if (this.options.colorInactive == value)
        return;
      this.options.colorInactive = value;
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
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "autoplay", {
    get: function() {
      return this.options.autoplay;
    },
    set: function(value) {
      if (this.options.autoplay == value)
        return;
      this.options.autoplay = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "muted", {
    get: function() {
      return this.options.muted;
    },
    set: function(value) {
      if (this.options.muted == value)
        return;
      this.options.muted = value;
    },
    enumerable: false,
    configurable: true
  });
  WVP2.prototype.init = function() {
    this.styles.build();
    this.elements.build();
  };
  return WVP2;
}();
