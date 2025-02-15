<div align="center">

<!-- <img width="" src="fastlane/Icon.png" width=160 height=160 align="center"> -->

# Web Video Player

## Video Player for Web

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/LucasLixo/Web-Video-Player?color=black&label=Stable&logo=github)](https://github.com/LucasLixo/Web-Video-Player/releases/latest/)
[![GitHub all releases](https://img.shields.io/github/downloads/LucasLixo/Web-Video-Player/total?label=Downloads&logo=github)](https://github.com/LucasLixo/Web-Video-Player/releases/)
[![GitHub Repo stars](https://img.shields.io/github/stars/LucasLixo/Web-Video-Player?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIC05NjAgOTYwIDk2MCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Im0zNTQtMjQ3IDEyNi03NiAxMjYgNzctMzMtMTQ0IDExMS05Ni0xNDYtMTMtNTgtMTM2LTU4IDEzNS0xNDYgMTMgMTExIDk3LTMzIDE0M1pNMjMzLTgwbDY1LTI4MUw4MC01NTBsMjg4LTI1IDExMi0yNjUgMTEyIDI2NSAyODggMjUtMjE4IDE4OSA2NSAyODEtMjQ3LTE0OUwyMzMtODBabTI0Ny0zNTBaIiBzdHlsZT0iZmlsbDogcmdiKDI0NSwgMjI3LCA2Nik7Ii8%2BCjwvc3ZnPg%3D%3D&color=%23f8e444)](https://github.com/LucasLixo/Web-Video-Player/stargazers)
[![Telegram Channel](https://img.shields.io/badge/Telegram-LucasLixo-blue?style=flat&logo=telegram)](https://t.me/LukasAngo)

&nbsp;&nbsp;| &nbsp;&nbsp;
<a href="https://raw.githubusercontent.com/LucasLixo/Web-Video-Player/refs/heads/main/dist/svp.css">wvp.css</a>
&nbsp;&nbsp;| &nbsp;&nbsp;
<a href="https://raw.githubusercontent.com/LucasLixo/Web-Video-Player/refs/heads/main/dist/svp.js">wvp.js</a>
&nbsp;&nbsp;| &nbsp;&nbsp;

</div>

## 📖 Features

- Fast
- Native tags
- Maximum compatibility with javascript 'es2015'

### How to use?

- [Example in example/index.html](./example/index.html)
  - Styles

```html
  <link rel="stylesheet" href="../dist/wvp.css" type="text/css">
```
  - Javascript

```html
  <script src="../dist/wvp.js" type="application/javascript"></script>
  <script type="application/javascript" defer>
    document.addEventListener('DOMContentLoaded', function () {
      const simpleVideoPlayer = new WVP({
        /* Options default (Options) */
        autoplay: false,    // Autoplay video
        volume: 1.0,        // 0.0 - 1.0
        currentTime: 0,     // Initial time in seconds
      });
    });
  </script>
```

## 📱 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="./fastlane/Screenshots (1).png" alt="Screenshot 1" style="margin: 1px;" width="99%" />
</div>

## ⬇️ Download

- Download the latest stable version from [GitHub releases](https://github.com/LucasLixo/Web-Video-Player/releases/latest)
  - Install the [pre-release](https://github.com/LucasLixo/Web-Video-Player/releases/) versions to help us test out new features & changes

## 💬 Contact

Join our [Telegram Channel](https://t.me/LukasAngo) 

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=LucasLixo/Web-Video-Player&type=Timeline)](https://star-history.com/#LucasLixo/Web-Video-Player&Timeline)

## 📃 License

[![GitHub](https://img.shields.io/github/license/LucasLixo/Web-Video-Player?style=for-the-badge)](https://github.com/LucasLixo/Web-Video-Player/blob/main/LICENSE)

## 🧱 [Credits](./package.json)

>[!Warning]
>
>autoprefixer,
>cssnano,
>esbuild,
>postcss,
>postcss-cli,
>postcss-import,
>typescript.

<div align="right">
<table><td>
<a href="#start-of-content">👆 Scroll to top</a>
</td></table>
</div>