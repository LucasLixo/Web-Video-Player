# [Web-Video-Player](Web-Video-Player.js)
Web Video Player é um aplicativo leve e personalizável que permite exibir e controlar facilmente vídeos em sua página da web. Com sua interface intuitiva e integração perfeita, você pode facilmente aprimorar seu site com conteúdo de vídeo.
E permite exibir e controlar vídeos em sua página da web. Ele usa a tag `<video>` e requer a biblioteca `jQuery JavaScript v3.7.0` para funcionar corretamente.

## Features

- `Exibição de vídeo responsiva`: O player oferece uma área de exibição de vídeo responsiva que se adapta a diferentes tamanhos de tela, garantindo uma experiência de visualização ideal em vários dispositivos.

- `Controles de reprodução`: Controle facilmente a reprodução de vídeo com controles integrados, incluindo reprodução, pausa, ajuste de volume, busca e modo de tela cheia.

- `Reprodução automática`: Configure os vídeos para começarem a ser reproduzidos automaticamente quando a página carrega, capturando a atenção dos visitantes e proporcionando uma experiência de visualização perfeita.

- `Seleção de proporção de aspecto`: Escolha entre uma variedade de proporções predefinidas ou defina uma proporção personalizada para garantir que os vídeos sejam exibidos corretamente e sem distorção.

- `Aparência personalizável`: Personalize a aparência do player modificando os estilos CSS para combinar com o design e a marca do seu site.

## [Usage](Example/Index.html)

- Para usar o Web Video Player em seu aplicativo web, basta incluir o código HTML fornecido e garantir que a biblioteca jQuery JavaScript v3.7.0 esteja devidamente vinculada. Em seguida, ajuste as opções de configuração para atender aos seus requisitos específicos.

- O Web Video Player simplifica o processo de integração de vídeos em seu site, permitindo envolver seu público e fornecer conteúdo visual atraente sem esforço.

- Para usar o reprodutor de vídeo da web em seu aplicativo da web, siga estas etapas:

- Mapeamento de teclado:
    
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

1. Inclua a biblioteca jQuery em seu arquivo HTML. Você pode baixar a biblioteca jQuery do site oficial ou usar um CDN. Aqui está um exemplo usando o CDN:

    ```html
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>

2. Adicione o seguinte código HTML à sua página da web onde deseja que o player de vídeo apareça:

    ```html
    <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
        <source src="video.mp4" type="video/mp4">
    </video>

- No exemplo acima, a `aspect-ratio` está definida como `16:9` e os controles e as opções de reprodução automática estão ativados.

- Being:
  
    | Aspect    | Size (Pixels)   | Quality       |
    | --------- | --------------- | ------------- |
    |`0:0`      | `100%`          | `Undefined`   |
    |`4:3`      | `1024:768`      | `SD`          |
    |`16:9`     | `1280:720`      | `HD`          |
    |`3:2`      | `1080:720`      | `HD`          |
    |`5:4`      | `1350:1080`     | `HD`          |
    |`7:5`      | `2100:1200`     | `QHD`         |

- Nota: Se não houver `proporção`, a largura e altura serão definidas para `100%` e você precisará de um `div` contendo o vídeo com o tema desejado.

    ```html
    <div style="width: 100%; height: 480px;">
        <video id="Web-Video-Player" aspect-ratio="16:9" controls autoplay>
            <source src="video.mp4" type="video/mp4">
        </video>
    </div>

3. Inclua o código JavaScript necessário para inicializar o player de vídeo. Você pode colocar esse código em um arquivo JavaScript separado ou diretamente no seu arquivo HTML:

    ```js
    $(document).ready(function() {
        // Initialize the video player
        $('#JsMedia').jsVideoPlayer();
    });

4. Certifique-se de ter o arquivo video.mp4 disponível no caminho especificado e de que o arquivo seja compatível com a tag <video>.

5. Abra sua página da web em um navegador e você deverá ver o player de vídeo com o vídeo especificado sendo reproduzido.

## Configurações

1. O reprodutor de vídeo da web oferece diversas opções de configuração que você pode personalizar de acordo com suas necessidades. Aqui estão algumas das opções disponíveis:
2. proporção: especifica a proporção do vídeo. Você pode escolher entre proporções predefinidas, como 4:3, 16:9, etc., ou definir uma proporção personalizada.
3. controles: determina se os controles do player de vídeo serão exibidos. Defina como verdadeiro para mostrar os controles ou falso para ocultá-los.
4. reprodução automática: especifica se o vídeo deve começar a ser reproduzido automaticamente quando a página for carregada. Defina como verdadeiro para reprodução automática ou falso para desativar a reprodução automática.
5. Você pode modificar as opções de configuração ajustando o código HTML do elemento de vídeo. Por exemplo:

## Dependências

[jQuery JavaScript Library v3.7.0](https://jquery.com/download/)
Certifique-se de incluir a biblioteca jQuery antes de usar o reprodutor de vídeo da web.

## [Licença](LICENSE)

- Este projeto está licenciado sob a `GNU Affero General Public License v3.0`.
