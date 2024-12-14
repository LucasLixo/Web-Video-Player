# [Web-Video-Player](Web-Video-Player.js)

<img src="fastlane/screenshot/screenshot (1).png" align="center">

The WVP (Web Video Player) is a lightweight, independent HTML5 video player that provides full functionality without relying on any internet connection or external libraries. It is compatible with various browser prefixes including -o-, -moz-, and -ms-. This player is built using TypeScript and compiled down to JavaScript ES5 for maximum compatibility. It allows users to control video playback and has additional features such as custom colors, fullscreen mode, and picture-in-picture support.

## [Usage](example/Index.html)

- To integrate the WVP player into your project, include the following script tag in your HTML file:

```js
<script type="application/javascript" src="../dist/wvp.js"></script>
<script type="application/javascript" defer>
    document.addEventListener('DOMContentLoaded', function () {
        const webVideoPlayer = new WVP('#video', {
            backgroundColor: 'black',    // Custom background color
            colorInactive: '',           // Inactive icon color
            colorActive: '',             // Active progress bar and button color
            autoplay: false,             // Autoplay the video (default: false)
            muted: false,                // Mute the video (default: false)
            top: '<p>Title</p>',         // Content to display at the top of the video (can be null for no header)
        });
    });
</script>
```

## Parameters

- `Element Selector` (Required):
    - The first argument in the WVP constructor is the selector for the video element (e.g., '#video').
    - The player works with multiple video tags on the same page by using querySelectorAll.


- `Options` (Optional): You can customize the following options for the video player:

    - backgroundColor: Sets the background color of the player container.
    - Default: black
    - colorInactive: Sets the color of the inactive icons.
    - Default: '' (no color specified)
    - colorActive: Sets the color of the active progress bar and buttons.
    - Default: '' (no color specified)
    - autoplay: If set to true, the video will start automatically when the page loads.
    - Default: false
    - muted: If set to true, the video will be muted by default.
    - Default: false
    - top: Defines the content displayed at the top of the video player (header).
    - Default: null (no header)
    - You can pass any HTML content as the value (e.g., <p>Title</p>). The content will be positioned absolutely at the top of the player.

## Advantages

- `File Size`: 33.1KB (compiled JavaScript).

- Keyboard mapping:
    
    | Press (Key)   | Action (Key)          |
    | ------------- | --------------------- |
    |`←`            | `(-10) Seconds`       |
    |`Space`        | `Pause / Play`        |
    |`→`            | `(+10) Seconds`       |
    |`F`            | `Fullscreen`          |
    |`P`            | `Picture-in-Picture`  |
    |`M`            | `Mute`                |
    |`0-9`          | `0% - 90% In Video`   |

- `No Dependencies`: The player does not rely on any external libraries or internet connection.

- `Cross-Browser Compatibility`: Supports browsers with -o-, -moz-, and -ms- prefixes for maximum compatibility.

- `Autoplay and Mute`: Customize whether the video should autoplay and be muted by default.

- `Customizable Colors`: Define custom colors for inactive icons and active progress bars and buttons.

- `Multiple Video Support`: Can handle multiple video elements on the same page via querySelectorAll.

## [Example](example/Index.html)

```js
<script type="application/javascript" src="../dist/wvp.js"></script>
<script type="application/javascript" defer>
    document.addEventListener('DOMContentLoaded', function () {
        new WVP('.video' /* Supports multiple videos */, {
            backgroundColor: 'black',
            colorInactive: 'gray',
            colorActive: 'blue',
            autoplay: true,
            muted: false,
            top: '<h2>My Custom Video Header</h2>',
        });
    });
</script>
```

## Browser Support

- The WVP player is designed to work on the latest versions of major browsers, including:
    - Chrome
    - Firefox
    - Safari
    - Edge
    - Opera
- The player includes CSS vendor prefixes (-o-, -moz-, -ms-) to ensure compatibility with a wide range of browsers.

## Conclusion

- WVP (Web Video Player) is a lightweight, standalone video player that supports modern browsers and provides easy customization and control via JavaScript. Whether you are building a simple page or a complex web app, WVP ensures a smooth and feature-rich video experience without the need for additional dependencies.

## [License](LICENSE)

[![GitHub](https://img.shields.io/github/license/LucasLixo/Web-Video-Player?style=for-the-badge)](https://github.com/LucasLixo/Web-Video-Player/blob/main/LICENSE)

<div align="right">
<table><td>
<a href="#start-of-content">👆 Scroll up</a>
</td></table>
</div>
