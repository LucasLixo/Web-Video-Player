# [Web-Video-Player](Web-Video-Player.js)

<img src="fastlane/screenshot/screenshot (1).jpg" align="center">

Web Video Player is a lightweight and customizable app that allows you to easily display and control videos on your web page. With its intuitive interface and seamless integration, you can effortlessly enhance your website with video content.
It uses the `<video>` tag and requires the `jQuery JavaScript v3.7.0` library to function correctly.

## Advantages

- `Responsive video display`: The player provides a responsive video display area that adapts to different screen sizes, ensuring an optimal viewing experience on various devices.

- `Playback controls`: Easily control video playback with built-in controls, including play, pause, volume adjustment, seeking, and fullscreen mode.

- `Autoplay`: Configure videos to start playing automatically when the page loads, capturing visitors' attention and providing a seamless viewing experience.

- `Aspect ratio selection`: Choose from a variety of predefined aspect ratios or set a custom ratio to ensure videos display correctly without distortion.

- `Customizable appearance`: Customize the player's appearance by modifying CSS styles to match your website's design and branding.

## [Usage](Example/Index.html)

- To use the Web Video Player in your web application, simply include the provided HTML code and ensure that the jQuery JavaScript v3.7.0 library is properly linked. Then, adjust the configuration options to meet your specific requirements.

- Web Video Player simplifies the process of embedding videos on your website, allowing you to engage your audience and provide visually appealing content effortlessly.

- To use the web video player in your web application, follow these steps:

- Keyboard mapping:
    
    | Press (Key)   | Action (Key)          |
    | ------------- | --------------------- |
    |`←`            | `(-10) Seconds`       |
    |`Space`        | `Pause / Play`        |
    |`→`            | `(+10) Seconds`       |
    |`↓`            | `(-20%) Volume`       |
    |`↑`            | `(+20%) Volume`       |
    |`F`            | `Fullscreen`          |
    |`P`            | `Picture-in-Picture`  |
    |`M`            | `Mute`                |
    |`0-9`          | `0% - 90% In Video`   |

1. Include the jQuery library in your HTML file. You can download the jQuery library from the official website or use a CDN. Here’s an example using the CDN:

    ```html
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    ```

2. Add the following HTML code to your web page where you want the video player to appear:

    ```html
    <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
        <source src="video.mp4" type="video/mp4">
    </video>
    ```

- In the example above, the `aspect-ratio` is set to `16:9`, with controls and autoplay options enabled.

- Being:
  
    | Aspect    | Size (Pixels)   | Quality       |
    | --------- | --------------- | ------------- |
    |`0:0`      | `100%`          | `Undefined`   |
    |`4:3`      | `1024:768`      | `SD`          |
    |`16:9`     | `1280:720`      | `HD`          |
    |`3:2`      | `1080:720`      | `HD`          |
    |`5:4`      | `1350:1080`     | `HD`          |
    |`7:5`      | `2100:1200`     | `QHD`         |

- Note: If there’s no `aspect ratio`, the width and height will be set to `100%`, and you'll need a `div` containing the video with the desired theme.

    ```html
    <div style="width: 100%; height: 480px;">
        <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
            <source src="video.mp4" type="video/mp4">
        </video>
    </div>
    ```

3. Include the required JavaScript code to initialize the video player. You can place this code in a separate JavaScript file or directly in your HTML file:

    ```js
    $(document).ready(function() {
        // Initialize the video player
        $('#JsMedia').jsVideoPlayer();
    });
    ```

4. Make sure to have the `video.mp4` file available at the specified path and that the file is compatible with the `<video>` tag.

5. Open your web page in a browser, and you should see the video player with the specified video playing.

## Settings

1. The web video player offers several configuration options that you can customize to suit your needs. Here are some available options:
2. aspect ratio: specifies the video’s aspect ratio. You can choose from predefined ratios like 4:3, 16:9, etc., or set a custom ratio.
3. controls: determines whether the video player's controls will be displayed. Set to true to show controls or false to hide them.
4. autoplay: specifies whether the video should start playing automatically when the page loads. Set to true for autoplay or false to disable it.
5. You can modify the configuration options by adjusting the HTML code of the video element. For example:

## Dependencies

[jQuery JavaScript Library v3.7.0](https://jquery.com/download/)  
Make sure to include the jQuery library before using the web video player.

## [License](LICENSE)

[![GitHub](https://img.shields.io/github/license/LucasLixo/Web-Video-Player?style=for-the-badge)](https://github.com/LucasLixo/Web-Video-Player/blob/main/LICENSE)

<div align="right">
<table><td>
<a href="#start-of-content">👆 Scroll up</a>
</td></table>
</div>
