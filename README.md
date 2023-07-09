# [Web-Video-Player](Web-Video-Player.js) `(Under development)`

![ImageWebVideoPlayer01](https://github.com/LucasLixo/LucasLixo/assets/104840846/9a7a9b3d-2dea-432c-94b3-272674b5648b)

Web Video Player is a lightweight, customizable application that allows you to easily display and control videos on your webpage. With its intuitive interface and seamless integration, you can easily enhance your website with video content.
And it lets you display and control videos on your webpage. It uses the `<video>` tag and requires the `jQuery JavaScript v3.7.0` library to work correctly.

## Features

- `Responsive Video Display`: The player provides a responsive video display area that adapts to different screen sizes, ensuring optimal viewing experience on various devices.

- `Playback Controls`: Easily control video playback with built-in controls, including play, pause, volume adjustment, seeking, and fullscreen mode.

- `Autoplay`: Configure videos to automatically start playing when the page loads, capturing visitors' attention and providing a seamless viewing experience.

- `Aspect Ratio Selection`: Choose from a range of predefined aspect ratios or set a custom aspect ratio to ensure videos are displayed correctly without distortion.

- `Customizable Appearance`: Customize the player's appearance by modifying CSS styles to match your website's design and branding.

## [Usage](Example/Index.html)

- To use the Web Video Player in your web application, simply include the provided HTML code and ensure that the jQuery JavaScript Library v3.7.0 is properly linked. Then, adjust the configuration options to meet your specific requirements.

- The Web Video Player simplifies the process of integrating videos into your website, allowing you to engage your audience and deliver compelling visual content effortlessly.

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

1. Include the jQuery library in your HTML file. You can download the jQuery library from the official website or use a CDN. Here's an example using the CDN:

    ```html
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>

2. Add the following HTML code to your web page where you want the video player to appear:

    ```html
    <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
        <source src="video.mp4" type="video/mp4">
    </video>

- In the above example, the `aspect-ratio` is set to `16:9`, and both the controls and autoplay options are enabled.

- Being:
  
    | Aspect    | Size (Pixels)   | Quality       |
    | --------- | --------------- | ------------- |
    |`0:0`      | `100%`          | `Undefined`   |
    |`4:3`      | `1024:768`      | `SD`          |
    |`16:9`     | `1280:720`      | `HD`          |
    |`3:2`      | `1080:720`      | `HD`          |
    |`5:4`      | `1350:1080`     | `HD`          |
    |`7:5`      | `2100:1200`     | `QHD`         |

- Note: If there is no `aspect-ratio`, the width and height will be set to `100%` and you will need a `div` containing the video with the desired theme.

    ```html
    <div style="width: 100%; height: 480px;">
        <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
            <source src="video.mp4" type="video/mp4">
        </video>
    </div>

3. Include the necessary JavaScript code to initialize the video player. You can place this code in a separate JavaScript file or directly in your HTML file:

    ```js
    $(document).ready(function() {
        // Initialize the video player
        $('#JsMedia').jsVideoPlayer();
    });

4. Make sure you have the video.mp4 file available at the specified path and that the file is compatible with the <video> tag.

5. Open your web page in a browser, and you should see the video player with the specified video playing.

## Configuration

1. The web video player provides several configuration options that you can customize according to your needs. Here are some of the available options:
2. aspect-ratio: Specifies the aspect ratio of the video. You can choose from predefined aspect ratios such as 4:3, 16:9, etc., or set a custom aspect ratio.
3. controls: Determines whether the video player controls are displayed. Set to true to show the controls, or false to hide them.
4. autoplay: Specifies whether the video should automatically start playing when the page loads. Set to true for autoplay, or false to disable autoplay.
5. You can modify the configuration options by adjusting the HTML code for the video element. For example:

## Dependencies

[jQuery JavaScript Library v3.7.0](https://jquery.com/download/)
Please make sure to include the jQuery library before using the web video player.

## [License](LICENSE.txt)

- This project is licensed under the `GNU Affero General Public License v3.0`.
